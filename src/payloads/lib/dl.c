long long dynlib_load_prx(const char*, int, int*, int);
long long dynlib_dlsym(int, const char*, void**);

void* dlopen(const char* path, int mode /*ignored*/)
{
    int handle = 0;
    dynlib_load_prx(path, 0, &handle, 0);
    return (void*)(long long)handle;
}

void* dlsym(void* handle, const char* name)
{
    void* addr = 0;
    dynlib_dlsym((int)(long long)handle, name, &addr);
    return addr;
}
