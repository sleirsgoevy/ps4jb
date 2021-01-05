#ifdef __PS4__
#define _BSD_SOURCE
extern int errno;
#define errno not_errno
#define pthread_t not_pthread_t
#include <sys/thr.h>
#else
#define _GNU_SOURCE
#include <pthread.h>
#endif
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/ucontext.h>
#include <signal.h>
#include <errno.h>
#include <sys/mman.h>
#include "dbg.h"

#ifdef __PS4__
#undef errno
#undef pthread_t
#define PAGE_SIZE 16384ull
#else
#define PAGE_SIZE 4096ull
#endif

static int hex2int(char c)
{
    if(c >= 'a' && c <= 'f')
        return c - 'a' + 10;
    else if(c >= 'A' && c <= 'F')
        return c - 'A' + 10;
    else
        return c - '0';
}

static char int2hex(int c)
{
    if(c >= 10)
        return c + 'A' - 10;
    else
        return c + '0';
}

static int gdb_socket, pipe_r, pipe_w;

typedef unsigned char pkt_opaque[1];

static int wait_for_packet(pkt_opaque o)
{
    unsigned char c = 0;
    while(c != '$')
        if(read(gdb_socket, &c, 1) != 1)
            return -1;
    o[0] = 0;
    return 0;
}

static int pkt_getchar(pkt_opaque o)
{
    unsigned char c;
    if(read(gdb_socket, &c, 1) != 1)
        return -1;
    if(c == '#')
    {
        unsigned char cc[2];
        if(read(gdb_socket, cc, 1) != 1 || read(gdb_socket, cc+1, 1) != 1)
            return -1;
        int cs = hex2int(cc[0]) << 4 | hex2int(cc[1]);
        if(cs != o[0])
            return -1;
        unsigned char ack = '+';
        if(write(gdb_socket, &ack, 1) != 1)
            return -1;
        return -2;
    }
    o[0] += c;
    return c;
}

static int skip_to_end(pkt_opaque o)
{
    int q;
    do
    {
        if((q = pkt_getchar(o)) == -1)
            return -1;
    }
    while(q != -2);
    return 0;
}

#ifdef PKT_NO_BUFFERING

static int start_packet(pkt_opaque o)
{
    unsigned char c = '$';
    if(write(gdb_socket, &c, 1) != 1)
        return -1;
    o[0] = 0;
    return 0;
}

static int pkt_puts(pkt_opaque o, unsigned char* s, int l)
{
    unsigned char* cur = s;
    int ll = l;
    while(ll)
    {
        int chk = write(gdb_socket, cur, ll);
        if(chk <= 0)
            return -1;
        cur += chk;
        ll -= chk;
    }
    for(int i = 0; i < l; i++)
        o[0] += s[i];
    return 0;
}

static int end_packet(pkt_opaque o)
{
    unsigned char c[3] = {'#', int2hex(o[0] >> 4), int2hex(o[0] & 15)};
    if(pkt_puts(o, c, 3))
        return -1;
    unsigned char ack;
    if(read(gdb_socket, &ack, 1) != 1 || ack != '+')
        return -1;
    return 0;
}

#else

static unsigned char* pkt_buf = 0;
size_t pkt_len = 0;
size_t pkt_cap = 0;

static int start_packet(pkt_opaque o)
{
    if(!pkt_cap)
    {
        pkt_buf = mmap(NULL, PAGE_SIZE, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
        pkt_cap = PAGE_SIZE;
    }
    pkt_buf[0] = '$';
    pkt_len = 1;
    o[0] = 0;
    return 0;
}

static int pkt_puts(pkt_opaque o, unsigned char* s, int l)
{
    size_t pkt_cap_2 = pkt_cap;
    while(pkt_len + l > pkt_cap_2)
        pkt_cap_2 <<= 1;
    if(pkt_cap_2 != pkt_cap)
    {
        unsigned char* pkt_buf_2 = mmap(NULL, pkt_cap_2, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
        for(size_t i = 0; i < pkt_len; i++)
            pkt_buf_2[i] = pkt_buf[i];
        munmap(pkt_buf, pkt_cap);
        pkt_buf = pkt_buf_2;
        pkt_cap = pkt_cap_2;
    }
    for(int i = 0; i < l; i++)
    {
        pkt_buf[pkt_len++] = s[i];
        o[0] += s[i];
    }
    return 0;
}

static int end_packet(pkt_opaque o)
{
    unsigned char c[3] = {'#', int2hex(o[0] >> 4), int2hex(o[0] & 15)};
    if(pkt_puts(o, c, 3))
        return -1;
    unsigned char* p = pkt_buf;
    size_t sz = pkt_len;
    while(sz > 0)
    {
        ssize_t chk = write(gdb_socket, p, sz);
        if(chk <= 0)
            return -1;
        sz -= chk;
        p += chk;
    }
    unsigned char ack;
    if(read(gdb_socket, &ack, 1) != 1 || ack != '+')
        return -1;
    return 0;
}

#endif

#define PKT_PUTS(o, s) pkt_puts(o, s, sizeof(s)-1)

static const char* commands[] = {
// must be sorted
    "?",
    "G",
    "H",
    "M",
    "c",
    "g",
    "m",
    "qAttached",
#ifdef __PS4__
    "qOffsets",
#endif
    "qSupported:",
#ifdef __PS4__
    "qXfer:exec-file:read:",
#endif
    "qXfer:features:read:target.xml:",
#ifdef __PS4__
#ifdef PS4LIBS
    "qXfer:libraries-svr4:read:",
#endif
#endif
    "s",
};

#ifdef __PS4__
extern char _start[];

static void reloc_commands()
{
    unsigned long long diff = ((unsigned long long)_start) - 0x401000;
    for(int i = 0; i < sizeof(commands) / sizeof(commands[0]); i++)
        commands[i] += diff;
}

#ifdef BLOB
extern char _end[];

static void mprotect_rwx()
{
    unsigned long long start = (unsigned long long)_start;
    unsigned long long end = (unsigned long long)_end;
    start &= ~(PAGE_SIZE-1);
    end = ((end - 1) | (PAGE_SIZE-1)) + 1;
    mprotect((void*)start, end-start, PROT_READ|PROT_WRITE|PROT_EXEC);
}
#endif
#endif

enum
{
    CMD_EOL = -3,
    CMD_ERROR = -2,
    CMD_UNKNOWN = -1,
// indexes into `commands`
    CMD_Q,
    CMD_G_WRITE,
    CMD_H,
    CMD_M_WRITE,
    CMD_C,
    CMD_G_READ,
    CMD_M_READ,
    CMD_Q_ATTACHED,
#ifdef __PS4__
    CMD_Q_OFFSETS,
#endif
    CMD_Q_SUPPORTED,
#ifdef __PS4__
    CMD_QXFER_EXEC_FILE,
#endif
    CMD_QXFER_TARGET_XML,
#ifdef __PS4__
#ifdef PS4LIBS
    CMD_QXFER_LIBRARIES,
#endif
#endif
    CMD_S,
};

static int match_packet(pkt_opaque o)
{
    int start = 0;
    int end = sizeof(commands) / sizeof(commands[0]);
    int idx = 0;
    for(;;)
    {
        if(!commands[start][idx]) // found a match
            return start;
        int c = pkt_getchar(o);
        if(c == -1)
            return CMD_ERROR;
        if(c == -2)
            return CMD_EOL;
        int l = start - 1;
        int r = end - 1;
        while(r - l > 1)
        {
            int m = (r + l + 1) / 2;
            if(commands[m][idx] < c)
                l = m; 
            else
                r = m;
        }
        start = l + 1;
        l = start;
        r = end;
        while(r - l > 1)
        {
            int m = (r + l) / 2;
            if(commands[m][idx] > c)
                r = m;
            else
                l = m;
        }
        end = r;
        if(commands[start][idx] != c)
            return CMD_UNKNOWN; // no match
        idx++;
    }
    //unreached
}

static int read_hex(pkt_opaque o, unsigned long long* q)
{
    *q = 0;
    for(;;)
    {
        int c = pkt_getchar(o);
        if((c >= '0' && c <= '9') || (c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f'))
            *q = (*q << 4) | hex2int(c);
        else
            return c;
    }
}

struct regs
{
    unsigned long long rax;
    unsigned long long rbx;
    unsigned long long rcx;
    unsigned long long rdx;
    unsigned long long rsi;
    unsigned long long rdi;
    unsigned long long rbp;
    unsigned long long rsp;
    unsigned long long r8;
    unsigned long long r9;
    unsigned long long r10;
    unsigned long long r11;
    unsigned long long r12;
    unsigned long long r13;
    unsigned long long r14;
    unsigned long long r15;
    unsigned long long rip;
    unsigned int eflags;
    unsigned int cs;
    unsigned int ss;
    unsigned int ds;
    unsigned int es;
    unsigned int fs;
    unsigned int gs;
};

struct trap_state
{
    int trap_signal;
    struct regs regs;
};

int read_mem(unsigned char* buf, unsigned long long addr, int sz)
{
    if(write(pipe_w, (const void*)addr, sz) != sz)
        return -errno;
    read(pipe_r, buf, sz);
    return 0;
}

static void mprotect_byte(unsigned long long addr)
{
    mprotect((void*)(addr &~ (PAGE_SIZE - 1)), PAGE_SIZE, PROT_READ|PROT_WRITE|PROT_EXEC);
}

static int write_mem(const unsigned char* buf, unsigned long long addr, int sz)
{
    write(pipe_w, buf, sz);
    if(read(pipe_r, (void*)addr, sz) != sz)
    {
        if(errno == EFAULT && sz == 1 && buf[0] == 0xcc) // sw breakpoint
        {
            mprotect_byte(addr);
            if(read(pipe_r, (void*)addr, 1) == 1)
                return 0;
        }
        int ans = -errno;
        char c;
        for(int i = 0; i < sz; i++)
            read(pipe_r, &c, 1);
        return ans;
    }
    return 0;
}

static int was_last_step;

void serve_string(pkt_opaque o, char* s, unsigned long long l, int has_annex)
{
    unsigned long long annex, start, len;
    if(has_annex)
        read_hex(o, &annex);
    read_hex(o, &start);
    read_hex(o, &len);
    if(start > l)
        start = l;
    if(len > l || start + len > l)
        len = l - start;
    start_packet(o);
    if(len == 0)
        PKT_PUTS(o, "l");
    else
    {
        PKT_PUTS(o, "m");
        pkt_puts(o, s+start, len);
    }
    end_packet(o);
}

typedef struct srv_opaque
{
    unsigned long long offset;
    unsigned long long len;
    int nonempty;
} srv_opaque[1];

void serve_genfn_start(pkt_opaque o, srv_opaque p, int has_annex)
{
    unsigned long long annex, start, len;
    if(has_annex)
        read_hex(o, &annex);
    read_hex(o, &start);
    read_hex(o, &len);
    start_packet(o);
    p->offset = start;
    p->len = len;
    p->nonempty = 0;
}

int serve_genfn_emit(pkt_opaque o, srv_opaque p, char* data, unsigned long long len)
{
    if(p->offset >= len)
    {
        p->offset -= len;
        return 0;
    }
    else
    {
        data += p->offset;
        len -= p->offset;
        p->offset = 0;
        if(len > p->len)
            len = p->len;
        if(len)
        {
            if(!p->nonempty)
            {
                p->nonempty = 1;
                PKT_PUTS(o, "m");
            }
            pkt_puts(o, data, len);
        }
        p->len -= len;
        return 1;
    }
}

void serve_genfn_end(pkt_opaque o, srv_opaque p)
{
    if(!p->nonempty)
        PKT_PUTS(o, "l");
    end_packet(o);
}

#ifdef __PS4__
#ifdef PS4LIBS
void list_libs(pkt_opaque o);
#endif
#endif

static void main_loop(struct trap_state* ts)
{
    pkt_opaque o;
    int stop_sig = ts->trap_signal?ts->trap_signal:SIGTRAP;
    char stop_reason[3] = {'T', int2hex(stop_sig >> 4), int2hex(stop_sig & 15)};
    if(ts->trap_signal)
    {
        start_packet(o);
        pkt_puts(o, stop_reason, 3);
        end_packet(o);
    }
    for(;;)
    {
        wait_for_packet(o);
        switch(match_packet(o))
        {
        case CMD_Q:
        {
            skip_to_end(o);
            start_packet(o);
            pkt_puts(o, stop_reason, 3);
            end_packet(o);
            break;
        }
        case CMD_Q_SUPPORTED:
            skip_to_end(o);
            start_packet(o);
            PKT_PUTS(o, "qXfer:features:read+"
#ifdef __PS4__
#ifndef BLOB
            ";qXfer:exec-file:read+"
#endif
#ifdef PS4LIBS
            ";qXfer:libraries-svr4:read+"
#endif
#endif
            );
            end_packet(o);
            break;
        case CMD_QXFER_TARGET_XML:
            serve_string(o, "<?xml version=\"1.0\"?>\n<!DOCTYPE target SYSTEM \"gdb-target.dtd\">\n<target>\n<architecture>i386:x86-64</architecture>\n<osabi>GNU/Linux</osabi>\n</target>\n", 149, 0);
            break;
        case CMD_H:
            skip_to_end(o);
            start_packet(o);
            PKT_PUTS(o, "OK");
            end_packet(o);
            break;
        case CMD_G_READ: // read gp regs
        {
            skip_to_end(o);
            unsigned char* regs = (unsigned char*)&ts->regs;
            char buf1[2 * sizeof(ts->regs)];
            char buf2[2 * (560 - sizeof(ts->regs))];
            for(int i = 0; i < sizeof(ts->regs); i++)
            {
                buf1[2*i] = int2hex(regs[i] >> 4);
                buf1[2*i+1] = int2hex(regs[i] & 15);
            }
            for(int i = 0; i < sizeof(buf2); i++)
                buf2[i] = 'x';
            start_packet(o);
            pkt_puts(o, buf1, sizeof(buf1));
            pkt_puts(o, buf2, sizeof(buf2));
            end_packet(o);
            break;
        }
        case CMD_G_WRITE: // write gp regs
        {
            unsigned char* regs = (unsigned char*)&ts->regs;
            for(int i = 0; i < sizeof(ts->regs); i++)
            {
                int a = hex2int(pkt_getchar(o));
                int b = hex2int(pkt_getchar(o));
                regs[i] = a << 4 | b;
            }
            skip_to_end(o);
            start_packet(o);
            PKT_PUTS(o, "OK");
            end_packet(o);
            break;
        }
        case CMD_M_READ: // read memory
        {
            unsigned char buf1[32], buf2[64];
            unsigned long long addr, size;
            read_hex(o, &addr);
            read_hex(o, &size);
            if(addr == 0xdeadbeefdeadbeefull)
                break; // no answer, this is intentional
            start_packet(o);
            while(size > 0)
            {
                int chk = (size > 32 ? 32 : size);
                if(read_mem(buf1, addr, chk))
                    break;
                for(int i = 0; i < chk; i++)
                {
                    buf2[2*i] = int2hex(buf1[i] >> 4);
                    buf2[2*i+1] = int2hex(buf1[i] & 15);
                }
                pkt_puts(o, buf2, 2*chk);
                addr += chk;
                size -= chk;
            }
            end_packet(o);
            break;
        }
        case CMD_M_WRITE: // write memory
        {
            unsigned char buf[32];
            unsigned long long addr, size;
            read_hex(o, &addr);
            read_hex(o, &size);
            int e = 0;
            while(size > 0)
            {
                int chk = (size > 32 ? 32 : size);
                for(int i = 0; i < chk; i++)
                {
                    int a = hex2int(pkt_getchar(o));
                    int b = hex2int(pkt_getchar(o));
                    buf[i] = a << 4 | b;
                }
                e = write_mem(buf, addr, chk);
                if(e)
                    break;
                addr += chk;
                size -= chk;
            }
            skip_to_end(o);
            start_packet(o);
            if(e)
            {
                e = -e;
                char qq[3] = {'E', int2hex((e >> 4) & 15), int2hex(e & 15)};
                pkt_puts(o, qq, 3);
            }
            else
                PKT_PUTS(o, "OK");
            end_packet(o);
            break;
        }
        case CMD_S: // singlestep
            ts->regs.eflags |= 256;
            was_last_step = 1;
        case CMD_C: // continue
            skip_to_end(o);
            start_packet(o);
            PKT_PUTS(o, "OK");
            end_packet(o);
            return;
        case CMD_Q_ATTACHED:
            skip_to_end(o);
            start_packet(o);
            PKT_PUTS(o, "0");
            end_packet(o);
            break;
#ifdef __PS4__
#ifndef BLOB // TODO: implement (how?)
        case CMD_QXFER_EXEC_FILE:
            serve_string(o, "payload.elf", 11, 1);
            break;
#endif
        case CMD_Q_OFFSETS:
        {
            skip_to_end(o);
            start_packet(o);
            unsigned long long base_addr = ((unsigned long long)_start);
#ifdef BLOB
            base_addr &= ~(PAGE_SIZE-1);
            char probe;
            while(!read_mem(&probe, base_addr, 1))
                base_addr -= PAGE_SIZE;
            base_addr += PAGE_SIZE;
#else
            base_addr -= 4096;
#endif
            char buf[24] = "TextSeg=";
            for(int i = 15; i >= 0; i--)
                buf[23-i] = int2hex((base_addr >> (4*i)) & 15);
            pkt_puts(o, buf, 24);
            end_packet(o);
            break;
        }
#ifdef PS4LIBS
        case CMD_QXFER_LIBRARIES:
            list_libs(o);
            break;
#endif
#endif
        default:
            skip_to_end(o);
        case CMD_EOL:
            start_packet(o);
            end_packet(o);
            break;
        }
    }
}

int in_signal_handler = 0;

#ifdef INTERRUPTER_THREAD

#ifdef __PS4__
// mock code, to make main code cleaner
// not "real" pthreads

typedef long pthread_t;

void pthread_create(long* p_tid, void* _2, void* f, void* arg)
{
    long x, y;
    static char* stack;
    if(!stack)
        stack = mmap(NULL, 65536, PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0);
    struct thr_param param = {
        .start_func = (void(*)(void*))f,
        .arg = arg,
        .stack_base = stack,
        .stack_size = 65536,
        .tls_base = NULL, // never used
        .tls_size = 0,
        .child_tid = &x,
        .parent_tid = p_tid,
        .flags = 0,
        .rtp = NULL,
    };
    thr_new(&param, sizeof(param));
}

long pthread_self()
{
    long ans = 0;
    thr_self(&ans);
    return ans;
}

#define pthread_kill thr_kill
#define pthread_detach(...)
#endif

void* interrupter_thread(void* o)
{
    pthread_t parent = (pthread_t)o;
    fd_set a, b;
    FD_ZERO(&a);
    FD_ZERO(&b);
    FD_SET(gdb_socket, &a);
    while(select(gdb_socket+1, &a, &b, &b, NULL) <= 0);
    if(!in_signal_handler)
        pthread_kill(parent, SIGINT);
#ifdef __PS4__
    thr_exit(0);
#endif
}

#endif

static void signal_handler(int signum, siginfo_t* idc, void* o_uc)
{
    while(__atomic_exchange_n(&in_signal_handler, 1, __ATOMIC_ACQUIRE));
    ucontext_t* uc = (ucontext_t*)o_uc;
#ifdef __PS4__
    mcontext_t* mc = (mcontext_t*)(((char*)&uc->uc_mcontext)+48); // wtf??
    if(signum == SIGTRAP && !was_last_step)
        mc->mc_rip--;
#else
    if(signum == SIGTRAP && !was_last_step)
        uc->uc_mcontext.gregs[REG_RIP]--;
#endif
    was_last_step = 0;
    struct trap_state ts = {
        .trap_signal = signum,
        .regs = {
#ifdef __PS4__
            .rax = mc->mc_rax,
            .rcx = mc->mc_rcx,
            .rdx = mc->mc_rdx,
            .rbx = mc->mc_rbx,
            .rsp = mc->mc_rsp,
            .rbp = mc->mc_rbp,
            .rsi = mc->mc_rsi,
            .rdi = mc->mc_rdi,
            .r8 = mc->mc_r8,
            .r9 = mc->mc_r9,
            .r10 = mc->mc_r10,
            .r11 = mc->mc_r11,
            .r12 = mc->mc_r12,
            .r13 = mc->mc_r13,
            .r14 = mc->mc_r14,
            .r15 = mc->mc_r15,
            .rip = mc->mc_rip,
            .eflags = mc->mc_rflags & ~256 /* singlestep */,
            .cs = mc->mc_cs,
            .ds = mc->mc_ds,
            .es = mc->mc_es,
            .ss = mc->mc_ss,
            .fs = mc->mc_fs,
            .gs = mc->mc_gs,
#else
            .rax = uc->uc_mcontext.gregs[REG_RAX],
            .rcx = uc->uc_mcontext.gregs[REG_RCX],
            .rdx = uc->uc_mcontext.gregs[REG_RDX],
            .rbx = uc->uc_mcontext.gregs[REG_RBX],
            .rsp = uc->uc_mcontext.gregs[REG_RSP],
            .rbp = uc->uc_mcontext.gregs[REG_RBP],
            .rsi = uc->uc_mcontext.gregs[REG_RSI],
            .rdi = uc->uc_mcontext.gregs[REG_RDI],
            .r8 = uc->uc_mcontext.gregs[REG_R8],
            .r9 = uc->uc_mcontext.gregs[REG_R9],
            .r10 = uc->uc_mcontext.gregs[REG_R10],
            .r11 = uc->uc_mcontext.gregs[REG_R11],
            .r12 = uc->uc_mcontext.gregs[REG_R12],
            .r13 = uc->uc_mcontext.gregs[REG_R13],
            .r14 = uc->uc_mcontext.gregs[REG_R14],
            .r15 = uc->uc_mcontext.gregs[REG_R15],
            .rip = uc->uc_mcontext.gregs[REG_RIP],
            .eflags = uc->uc_mcontext.gregs[REG_EFL] & ~256 /* singlestep */,
            .cs = uc->uc_mcontext.gregs[REG_CSGSFS] & 0xffff,
            .ds = 0xdeadbeef,
            .es = 0xdeadbeef,
            .ss = 0xdeadbeef,
            .fs = uc->uc_mcontext.gregs[REG_CSGSFS] >> 32 & 0xffff,
            .gs = uc->uc_mcontext.gregs[REG_CSGSFS] >> 16 & 0xffff,
#endif
        }
    };
    main_loop(&ts);
#ifdef __PS4__
    mc->mc_rax = ts.regs.rax;
    mc->mc_rcx = ts.regs.rcx;
    mc->mc_rdx = ts.regs.rdx;
    mc->mc_rbx = ts.regs.rbx;
    mc->mc_rsp = ts.regs.rsp;
    mc->mc_rbp = ts.regs.rbp;
    mc->mc_rsi = ts.regs.rsi;
    mc->mc_rdi = ts.regs.rdi;
    mc->mc_r8 = ts.regs.r8;
    mc->mc_r9 = ts.regs.r9;
    mc->mc_r10 = ts.regs.r10;
    mc->mc_r11 = ts.regs.r11;
    mc->mc_r12 = ts.regs.r12;
    mc->mc_r13 = ts.regs.r13;
    mc->mc_r14 = ts.regs.r14;
    mc->mc_r15 = ts.regs.r15;
    mc->mc_rip = ts.regs.rip;
    mc->mc_rflags = ts.regs.eflags;
#else
    uc->uc_mcontext.gregs[REG_RAX] = ts.regs.rax;
    uc->uc_mcontext.gregs[REG_RCX] = ts.regs.rcx;
    uc->uc_mcontext.gregs[REG_RDX] = ts.regs.rdx;
    uc->uc_mcontext.gregs[REG_RBX] = ts.regs.rbx;
    uc->uc_mcontext.gregs[REG_RSP] = ts.regs.rsp;
    uc->uc_mcontext.gregs[REG_RBP] = ts.regs.rbp;
    uc->uc_mcontext.gregs[REG_RSI] = ts.regs.rsi;
    uc->uc_mcontext.gregs[REG_RDI] = ts.regs.rdi;
    uc->uc_mcontext.gregs[REG_R8] = ts.regs.r8;
    uc->uc_mcontext.gregs[REG_R9] = ts.regs.r9;
    uc->uc_mcontext.gregs[REG_R10] = ts.regs.r10;
    uc->uc_mcontext.gregs[REG_R11] = ts.regs.r11;
    uc->uc_mcontext.gregs[REG_R12] = ts.regs.r12;
    uc->uc_mcontext.gregs[REG_R13] = ts.regs.r13;
    uc->uc_mcontext.gregs[REG_R14] = ts.regs.r14;
    uc->uc_mcontext.gregs[REG_R15] = ts.regs.r15;
    uc->uc_mcontext.gregs[REG_RIP] = ts.regs.rip;
    uc->uc_mcontext.gregs[REG_EFL] = ts.regs.eflags;
#endif
    __atomic_exchange_n(&in_signal_handler, 0, __ATOMIC_RELEASE);
#ifdef INTERRUPTER_THREAD
    pthread_t child;
    pthread_create(&child, NULL, interrupter_thread, (void*)pthread_self());
    pthread_detach(child);
#endif
}

static unsigned long long start_rip;

static void tmp_sigsegv(int sig, siginfo_t* idc, void* o_uc)
{
    ucontext_t* uc = (ucontext_t*)o_uc;
#ifdef __PS4__
    mcontext_t* mc = (mcontext_t*)(((char*)&uc->uc_mcontext)+48); // wtf??
    mc->mc_rip = start_rip;
#else
    uc->uc_mcontext.gregs[REG_RIP] = start_rip;
#endif
    struct sigaction siga = {
        .sa_sigaction = signal_handler,
        .sa_flags = SA_SIGINFO
    };
    sigaction(SIGSEGV, &siga, NULL);
    signal_handler(0, idc, o_uc);
}

void dbg_enter(void)
{
#ifdef __PS4__
#ifdef BLOB
    mprotect_rwx();
#endif
    reloc_commands();
#endif
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in sa = {
        .sin_family = AF_INET,
        .sin_addr = {.s_addr = 0},
        .sin_port = 0xd204,
    };
    int reuse = 1;
    setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &reuse, 4);
#ifdef __PS4__
#ifdef PS4LIBS
    void ps4_xchg_budget(int*);
    int budget = 2;
    ps4_xchg_budget(&budget);
#endif
#endif
    int brv = bind(sock, (struct sockaddr*)&sa, sizeof(sa));
#ifdef __PS4__
#ifdef PS4LIBS
    ps4_xchg_budget(&budget);
#endif
#endif
    if(brv)
        return;
    listen(sock, 1);
    gdb_socket = accept(sock, NULL, NULL);
    int nodelay = 1;
    setsockopt(gdb_socket, IPPROTO_TCP, TCP_NODELAY, &nodelay, sizeof(nodelay));
    int p[2];
    socketpair(AF_UNIX, SOCK_STREAM, 0, p);
    pipe_r = p[0];
    pipe_w = p[1];
    unsigned char plus;
    if(read(gdb_socket, &plus, 1) != 1 || plus != '+')
        return;
    struct sigaction siga = {
        .sa_sigaction = signal_handler,
        .sa_flags = SA_SIGINFO
    };
    sigaction(SIGTRAP, &siga, NULL);
    sigaction(SIGILL, &siga, NULL);
    sigaction(SIGBUS, &siga, NULL);
    sigaction(SIGINT, &siga, NULL);
    sigaction(SIGSYS, &siga, NULL);
    siga.sa_sigaction = tmp_sigsegv;
    sigaction(SIGSEGV, &siga, NULL);
    pkt_opaque o;
    // set debugger entry
    unsigned long long* rbp;
    asm("mov %%rbp, %0":"=r"(rbp));
    start_rip = rbp[1];
    rbp[1] = 0;
}
