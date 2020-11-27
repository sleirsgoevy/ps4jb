#include "dbg.h"
#include <sys/thr.h>
#include <sys/mman.h>
#include <sys/types.h>

void k_get_td(void* td, void*** uap)
{
    uap[1][0] = td;
}

void kexec(void*, void*);

void* get_td(void)
{
    void* ans;
    kexec(k_get_td, &ans);
    return ans;
}

void* malloc(size_t sz)
{
    return mmap(0, sz, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
}

int main(void)
{
    dbg_enter();
    thr_exit(0);
}
