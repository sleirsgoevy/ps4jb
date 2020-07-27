// https://gist.github.com/flatz/1055a8d7819c8478db1b464842582c9c
#include <sys/types.h>
#include <stddef.h>

struct module_segment
{
    uint64_t addr;
    uint32_t size;
    uint32_t flags;
};

struct module_info_ex
{
    size_t st_size;
    char name[256];
    int id;
    uint32_t tls_index;
    uint64_t tls_init_addr;
    uint32_t tls_init_size;
    uint32_t tls_size;
    uint32_t tls_offset;
    uint32_t tls_align;
    uint64_t init_proc_addr;
    uint64_t fini_proc_addr;
    uint64_t reserved1;
    uint64_t reserved2;
    uint64_t eh_frame_hdr_addr;
    uint64_t eh_frame_addr;
    uint32_t eh_frame_hdr_size;
    uint32_t eh_frame_size;
    struct module_segment segments[4];
    uint32_t segment_count;
    uint32_t ref_count;
};

long long dynlib_load_prx(const char*, int, int*, int);
int dynlib_get_info_ex(int, int, struct module_info_ex*);
long long dynlib_dlsym(int, const char*, void**);

void* dlopen_ex(const char* path, int mode /*ignored*/, void* data, size_t data_len)
{
    int handle = 0;
    if(dynlib_load_prx(path, 0, &handle, 0))
        return 0;
    struct module_info_ex mi;
    mi.st_size = sizeof(mi);
    if(dynlib_get_info_ex(handle, 0, &mi))
        return 0;
    if(mi.ref_count < 2)
        ((int(*)(size_t, void*))mi.init_proc_addr)(data_len, data);
    return (void*)(long long)handle;
}

void* dlopen(const char* path, int mode)
{
    return dlopen_ex(path, mode, NULL, 0);
}

void* dlsym(void* handle, const char* name)
{
    void* addr = 0;
    dynlib_dlsym((int)(long long)handle, name, &addr);
    return addr;
}
