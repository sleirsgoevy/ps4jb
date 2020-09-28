void kexec(void* fn);

asm("blob:\n.incbin \"module.bin\"\nblob_end:");

extern char blob[];
extern char blob_end[];

unsigned long long get_syscall()
{
    unsigned int eax, ecx = 0xc0000082, edx;
    asm volatile("rdmsr":"=a"(eax),"=d"(edx):"c"(ecx));
    return ((unsigned long long)edx)<<32|eax;
}

void load_start_module(void* td)
{
    unsigned long long kernel_base = get_syscall() - 0x1c0;
    unsigned long long kernel_map = *(unsigned long long*)(kernel_base + 0x220dfc0);
    void*(*kmem_alloc)(unsigned long long, unsigned long long) = (void*)(kernel_base + 0x250730);
    int(*copyin)(const void*, void*, unsigned long long) = (void*)(kernel_base + 0x3c17a0);
    char* buf = kmem_alloc(kernel_map, blob_end - blob);
    copyin(blob, buf, blob_end - blob);
    ((void(*)(void*))buf)(td);
}

int main()
{
    kexec(load_start_module);
    return 0;
}
