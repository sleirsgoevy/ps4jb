#include <signal.h>
#include <stddef.h>

asm(".p2align 4\nftp_blob:\n.incbin \"ftp.bin\"\n");

void ftp_blob(void);

int main()
{
    struct sigaction sa = {
        .sa_handler = SIG_IGN,
        .sa_flags = 0
    };
    sigaction(SIGPIPE, &sa, NULL);
    ftp_blob();
    return 0;
}
