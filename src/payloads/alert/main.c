void* dlopen(const char*, int);
void* dlsym(void*, const char*);

int main()
{
    void* handle = dlopen("/system/common/lib/libSceSysUtil.sprx", 0);
    int(*sceSysUtilSendSystemNotificationWithText)(int, const char*) = dlsym(handle, "sceSysUtilSendSystemNotificationWithText");
    sceSysUtilSendSystemNotificationWithText(222, "jopa");
    return 0;
}
