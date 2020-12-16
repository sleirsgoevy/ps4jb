#include <ps4/mmap.h>
#include <printf/printf.h>
#include <librop/pthread_create.h>
#include <librop/extcall.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stddef.h>
#include <unistd.h>
#include <time.h>

void* sender_thread(void* _)
{
    char* mira_blob_2 = __builtin_gadget_addr("$(window.mira_blob_2||0)");
    int mira_blob_2_len = __builtin_gadget_addr("$(window.mira_blob_2_len||0)");
    if(!mira_blob_2)
        return NULL;
    nanosleep("\2\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0", NULL);
    int q = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_addr = {.s_addr = 0x100007f}, // inet_aton(127.0.0.1)
        .sin_port = 0x3d23, // htons(9021)
    };
    connect(q, &addr, sizeof(addr));
    char* x = mira_blob_2;
    int l = mira_blob_2_len;
    while(l)
    {
        int chk = write(q, x, l);
        if(chk <= 0)
            break;
        x += chk;
        l -= chk;
    }
    close(q);
    return NULL;
}

int main()
{
    if(setuid(0))
        return 1; //jailbreak failed or not run yet
    char* mapping = mmap(NULL, 65536, PROT_READ|PROT_WRITE|PROT_EXEC, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0);
    char* mira_blob = __builtin_gadget_addr("$(window.mira_blob||0)");
    if(mira_blob)
    {
        for(int i = 0; i < 65536; i++)
            mapping[i] = mira_blob[i];
    }
    else
    {
        int q = socket(AF_INET, SOCK_STREAM, 0);
        struct sockaddr_in addr = {
            .sin_family = AF_INET,
            .sin_addr = {.s_addr = 0},
            .sin_port = 0x3c23, // htons(9020)
        };
        bind(q, &addr, sizeof(addr));
        listen(q, 1);
        q = accept(q, NULL, NULL);
        char* x = mapping;
        int l = 65536;
        while(l)
        {
            int chk = read(q, x, l);
            if(chk <= 0)
                break;
            x += chk;
            l -= chk;
        }
    }
    int sender[512];
    pthread_create(sender, NULL, sender_thread, NULL);
    rop_call_funcptr(mapping);
    return 0;
}
