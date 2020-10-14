#include <stddef.h>

unsigned int offsets[] = {
    0x65959f,
    0x1bd81a8,
    0x1bd81ac,
    0x156a79a,
    0x156a7a2,
    0x15af79a,
    0x15af7a2,
    0x17ae79a,
    0x17ae7a2,
    0x1a8d76a,
    0x1a8d7ea,
    0x1b42796,
};

unsigned int tgt_ver = 0x09990000;

unsigned long long xfast_syscall()
{
    unsigned int a, d, c = 0xc0000082;
    asm volatile("rdmsr":"=a"(a),"=d"(d):"c"(c));
    return ((unsigned long long)d)<<32|a;
}

void kpayload()
{
    unsigned long long kernel_base = xfast_syscall() - 0x1c0;
    asm volatile("cli\nmov %cr0,%rax\nor $65536,%rax\nxor $65536,%rax\nmov %rax,%cr0");
    for(int i = 0; i < 3; i++)
        *(int*)(kernel_base + offsets[i]) = tgt_ver;
    asm volatile("mov %cr0,%rax\nor $65536,%rax\nmov %rax,%cr0\nsti");
}

void kexec(void*, void*);

int main()
{
    kexec(kpayload, NULL);
    return 0;
}
