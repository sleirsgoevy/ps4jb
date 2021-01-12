#include <sys/types.h>
#include <stdarg.h>
#include <unistd.h>
#include <fcntl.h>

typedef unsigned char pkt_opaque[1];

typedef struct srv_opaque
{
    unsigned long long offset;
    unsigned long long len;
    int nonempty;
} srv_opaque[1];

void serve_genfn_start(pkt_opaque, srv_opaque, int);
int serve_genfn_emit(pkt_opaque, srv_opaque, const char*, unsigned long long);
void serve_genfn_end(pkt_opaque, srv_opaque);

asm("kexec:\nmov $11, %rax\nmov %rcx, %r10\nsyscall\nret");
void kexec(void*, void*);

unsigned long long k_xfast_syscall()
{
    unsigned int a, c = 0xc0000082;
    unsigned long long d;
    asm volatile("rdmsr":"=a"(a),"=d"(d):"c"(c));
    return d << 32 | a;
}

unsigned long long k_read64(unsigned long long ptr)
{
    return *(volatile unsigned long long*)ptr;
}

unsigned long long k_read8(unsigned long long ptr)
{
    return *(volatile unsigned char*)ptr;
}

int read_mem(void*, unsigned long long, int);

unsigned long long u_read64(unsigned long long ptr)
{
    unsigned long long ans = 0;
    read_mem(&ans, ptr, 8);
    return ans;
}

unsigned long long u_read8(unsigned long long ptr)
{
    unsigned char ans = 0;
    read_mem(&ans, ptr, 1);
    return ans;
}

asm("k_curthread:\nmov %gs:0, %rax\nret");
extern char k_curthread[];

void k_call(void* td, unsigned long long** uap)
{
    uap[1][0] = ((unsigned long long(*)(unsigned long long, unsigned long long, unsigned long long, unsigned long long, unsigned long long, unsigned long long))uap[1][0])(uap[1][1], uap[1][2], uap[1][3], uap[1][4], uap[1][5], uap[1][6]);
}

unsigned long long kcall(void* fn, ...)
{
    va_list v;
    va_start(v, fn);
    unsigned long long args[7];
    args[0] = (unsigned long long)fn;
    args[1] = va_arg(v, unsigned long long);
    args[2] = va_arg(v, unsigned long long);
    args[3] = va_arg(v, unsigned long long);
    args[4] = va_arg(v, unsigned long long);
    args[5] = va_arg(v, unsigned long long);
    args[6] = va_arg(v, unsigned long long);
    va_end(v);
    kexec(k_call, args);
    return args[0];
}

#ifndef __7_02__
#define kernel_offset_xfast_syscall 0x1c0
#define kernel_offset_allproc 0x22bbe80
#define kernel_offset_vmspace_acquire_ref 0x44cb90
#define kernel_offset_vmspace_free 0x44c9c0
#define kernel_offset_printf 0x123280
#else
#define kernel_offset_xfast_syscall 0x1c0
#define kernel_offset_allproc 0x1b48318
#define kernel_offset_vmspace_acquire_ref 0x25f9f0
#define kernel_offset_vmspace_free 0x25f820
#define kernel_offset_printf 0xbc730
#endif
#define kprintf(...) //kcall((void*)(kcall(k_xfast_syscall) - kernel_offset_xfast_syscall + kernel_offset_printf), __VA_ARGS__)

off_t kstrncpy(char* dst, unsigned long long src, size_t sz)
{
    off_t i = 0;
    while(i < sz && (dst[i] = u_read8(src + i)))
        i++;
    return i;
}

int strcmp(const char* a, const char* b)
{
    while(*a && *a == *b)
    {
        a++;
        b++;
    }
    return *a - *b;
}

int randomized_path(unsigned long long, char*, size_t*);

int get_elf_offsets(const char* name, unsigned long long* addrs)
{
    size_t o = 0;
    while(name[o])
        o++;
    char path[o + sizeof("/0123456789/common/lib/")];
    for(size_t i = 0; i < sizeof("/system/common/lib/"); i++)
        path[i] = "/system/common/lib/"[i];
    for(size_t i = 0; i <= o; i++)
        path[i + sizeof("/system/common/lib/") - 1] = name[i];
    int fd = open(path, O_RDONLY);
    if(fd < 0) // sandboxed
    {
        char sandbox_path[11];
        size_t sz = 11;
        if(randomized_path(0, sandbox_path, &sz))
            return -1;
        path[0] = '/';
        for(size_t i = 0; i < 10; i++)
            path[i+1] = sandbox_path[i];
        for(size_t i = 0; i < sizeof("/common/lib/"); i++)
            path[i+11] = "/common/lib/"[i];
        for(size_t i = 0; i <= o; i++)
            path[i + sizeof("/0123456789/common/lib/") - 1] = name[i];
        fd = open(path, O_RDONLY);
        if(fd < 0)
            return -1;
    }
    unsigned long long shit[4];
    if(read(fd, shit, sizeof(shit)) != sizeof(shit))
    {
        close(fd);
        return -1;
    }
    off_t o2 = 0x20*((shit[3]&0xffff)+1);
    lseek(fd, o2, SEEK_SET);
    unsigned long long ehdr[8];
    if(read(fd, ehdr, sizeof(ehdr)) != sizeof(ehdr))
    {
        close(fd);
        return -1;
    }
    off_t phdr_offset = o2 + ehdr[4];
    int nphdr = ehdr[7] & 0xffff;
    unsigned long long lowest_addr = -1;
    unsigned long long dynamic = -1;
    lseek(fd, phdr_offset, SEEK_SET);
    for(int i = 0; i < nphdr; i++)
    {
        unsigned long long phdr[7];
        if(read(fd, phdr, sizeof(phdr)) != sizeof(phdr))
        {
            close(fd);
            return -1;
        }
        unsigned long long addr = phdr[2];
        int ptype = phdr[0] & 0xffffffff;
        if(ptype == 1)
        {
            if(addr < lowest_addr)
                lowest_addr = addr;
        }
        else if(ptype == 2)
            dynamic = addr;
    }
    close(fd);
    addrs[0] = lowest_addr;
    addrs[1] = dynamic;
    return 0;
}

int handle_lib(pkt_opaque o, srv_opaque p, const char* name, unsigned long long text_base)
{
    size_t l = 0;
    while(name[l])
        l++;
    unsigned long long ptrs[2];
    if(get_elf_offsets(name, ptrs))
        return -1;
    unsigned long long base = text_base - ptrs[0];
    unsigned long long dyn = base + ptrs[1];
    serve_genfn_emit(o, p, "<library name=\"", 15);
    serve_genfn_emit(o, p, name, l);
    char buf[] = "\" l_addr=\"0xXXXXXXXXXXXX\" lm=\"0\" l_ld=\"0xXXXXXXXXXXXX\"/>";
    for(int i = 0; i < 12; i++)
    {
        buf[i + 12] = "0123456789abcdef"[(base >> (44 - 4 * i)) & 15];
        buf[i + 41] = "0123456789abcdef"[(dyn >> (44 - 4 * i)) & 15];
    }
    serve_genfn_emit(o, p, buf, sizeof(buf) - 1);
    return 0;
}

void list_libs(pkt_opaque o)
{
    srv_opaque p;
    serve_genfn_start(o, p, 1);
    serve_genfn_emit(o, p, "<library-list-svr4 version=\"1.0\">", 33);
    unsigned long long proc = u_read64(kcall(k_curthread) + 8);
    unsigned long long vmspace = kcall((void*)(kcall(k_xfast_syscall) - kernel_offset_xfast_syscall + kernel_offset_vmspace_acquire_ref), proc);
    unsigned long long vm_entry = u_read64(vmspace);
    unsigned long long i = vm_entry;
    char data1[4097];
    char data2[4097];
    char* data1p = data1;
    char* data2p = data2;
    data1p[0] = 0;
    off_t prev1, prev2;
    while(i)
    {
        unsigned long long j = u_read64(i);
        if(j == vm_entry || !j)
            break;
        off_t start = u_read64(i+32);
        off_t end = u_read64(i+40);
        off_t of = kstrncpy(data2p, i+141, 4096);
        data2p[of] = 0;
        kprintf("#0x%llx 0x%llx %s\n", start, end, data2p);
        if(data2p[0] == 'l' && data2p[1] == 'i' && data2p[2] == 'b' && !strcmp(data2p + of - 5, ".sprx"))
        {
            if(strcmp(data2p, data1p))
            {
                if(data1p[0])
                {
                    kprintf("0x%llx 0x%llx %s\n", prev1, prev2, data1p);
                    handle_lib(o, p, data1p, prev1);
                }
                char* tmp = data1p;
                data1p = data2p;
                data2p = tmp;
            }
            prev1 = start;
            prev2 = end;
        }
        i = j;
    }
    if(data1p[0])
    {
        kprintf("0x%llx 0x%llx %s\n", prev1, prev2, data1p);
        handle_lib(o, p, data1p, prev1);
    }
    serve_genfn_emit(o, p, "</library-list-svr4>", 20);
    kcall((void*)(kcall(k_xfast_syscall) - kernel_offset_xfast_syscall + kernel_offset_vmspace_free), vmspace);
    serve_genfn_end(o, p);
}

static void k_set_budget(int** td, int** uap)
{
    int tmp = uap[1][0];
    uap[1][0] = td[1][701];
    td[1][701] = tmp;
}

void ps4_xchg_budget(int* bb)
{
    kexec(k_set_budget, bb);
}
