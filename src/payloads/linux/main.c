#include <sys/types.h>
#include <stddef.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <signal.h>
#include <sys/thr.h>
#include <time.h>

#define syscall_offset 0x1c0
#define printf_offset 0x123280
#define kmem_alloc_offset 0x250730
#define kernel_map_offset 0x220dfc0

asm("ps4kexec:\n.incbin \"ps4-kexec/kexec.bin\"\nps4kexec_end:\n");

extern char ps4kexec[];
extern char ps4kexec_end[];

void kexec(void* f, void* u);

unsigned long long get_syscall(void)
{
    unsigned int eax, ecx, edx;
    ecx = 0xc0000082;
    asm volatile("rdmsr":"=a"(eax),"=d"(edx):"c"(ecx));
    return ((unsigned long long)edx) << 32 | eax;
}

void kernel_main()
{
    unsigned long long kernel_base = get_syscall() - syscall_offset;
    unsigned long long early_printf = kernel_base + printf_offset;
    unsigned long long kmem_alloc = kernel_base + kmem_alloc_offset;
    unsigned long long kernel_map = kernel_base + kernel_map_offset;
    char* new_ps4_kexec = ((char*(*)(unsigned long long, unsigned long long))kmem_alloc)(*(unsigned long long*)kernel_map, ps4kexec_end-ps4kexec);
    for(int i = 0; ps4kexec + i != ps4kexec_end; i++)
        new_ps4_kexec[i] = ps4kexec[i];
    ((void(*)(void*, void*))new_ps4_kexec)((void*)early_printf, NULL);
}

asm("kexec_load:\nmov %rcx, %r10\nmov $153, %rax\nsyscall\nret");

int kexec_load(char* kernel, unsigned long long kernel_size, char* initrd, unsigned long long initrd_size, char* cmdline);

int read_file(char* path, char** ptr, unsigned long long* sz)
{
    int fd = open(path, O_RDONLY);
    if(fd < 0)
        return -1;
    *sz = lseek(fd, 0, SEEK_END);
    *ptr = mmap(NULL, *sz, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
    char* p = *ptr;
    unsigned long long l = *sz;
    lseek(fd, 0, SEEK_SET);
    while(l)
    {
        unsigned long long chk = read(fd, p, l);
        if(chk <= 0)
            return -1;
        p += chk;
        l -= chk;
    }
    close(fd);
    return 0;
}

int evf_open(char*);
void evf_cancel(int, unsigned long long, unsigned long long);
void evf_close(int);

void reboot_thread(void* _)
{
    nanosleep((const struct timespec*)"\1\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0", NULL);
    int evf = evf_open("SceSysCoreReboot");
    evf_cancel(evf, 0x4000, 0);
    evf_close(evf);
    kill(1, SIGUSR1);
}

void* dlopen(const char*, int);
void* dlsym(void*, const char*);

void alert(const char* msg)
{
    static int(*sceSysUtilSendSystemNotificationWithText)(int, const char*);
    if(!sceSysUtilSendSystemNotificationWithText)
    {
        void* handle = dlopen("/system/common/lib/libSceSysUtil.sprx", 0);
        sceSysUtilSendSystemNotificationWithText = dlsym(handle, "sceSysUtilSendSystemNotificationWithText");
    }
    sceSysUtilSendSystemNotificationWithText(222, msg);
}

int main()
{
    struct sigaction sa = {
        .sa_handler = SIG_IGN,
        .sa_flags = 0,
    };
    // note: overriding SIGSTOP and SIGKILL requires a kernel patch
    sigaction(SIGSTOP, &sa, NULL);
    sigaction(SIGTERM, &sa, NULL);
    sigaction(SIGKILL, &sa, NULL);
    char* kernel;
    unsigned long long kernel_size;
    char* initrd;
    unsigned long long initrd_size;
#define L(name, where, wheresz)\
    if(read_file("/user/system/boot/" name, where, wheresz)\
    && read_file("/mnt/usb0/" name, where, wheresz)\
    && read_file("/mnt/usb1/" name, where, wheresz))\
    {\
        alert("Failed to load file: " name ".\nPaths checked:\n/user/system/boot/" name "\n/mnt/usb0/" name "\n/mnt/usb1/" name);\
        return 1;\
    }
    L("bzImage", &kernel, &kernel_size);
    L("initramfs.cpio.gz", &initrd, &initrd_size);
    char* cmdline = "panic=0 clocksource=tsc radeon.dpm=0 console=tty0 console=ttyS0,115200n8 "
                    "console=uart8250,mmio32,0xd0340000 video=HDMI-A-1:1920x1080-24@60 "
                    "consoleblank=0 net.ifnames=0 drm.debug=0";
    kexec(kernel_main, (void*)0);
    long x, y;
    struct thr_param thr = {
        .start_func = reboot_thread,
        .arg = NULL,
        .stack_base = mmap(NULL, 16384, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0),
        .stack_size = 16384,
        .tls_base = NULL,
        .tls_size = 0,
        .child_tid = &x,
        .parent_tid = &y,
        .flags = 0,
        .rtp = NULL
    };
    thr_new(&thr, sizeof(thr));
    kexec_load(kernel, kernel_size, initrd, initrd_size, cmdline);
    for(;;);
}
