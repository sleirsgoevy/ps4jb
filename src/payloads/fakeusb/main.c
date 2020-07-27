#include <unistd.h>
#include <stdio.h>
#include <sys/mount.h>
#include <sys/stat.h>
#include <signal.h>

int main()
{
    mkdir("/user/home/fakeusb", 0777);
    unmount("/mnt/usb0", 0);
    rename("/mnt/usb0", "/mnt/usb0_real");
    symlink("/user/home/fakeusb", "/mnt/usb0");
    unmount("/mnt/usb1", 0);
    rename("/mnt/usb1", "/mnt/usb1_real");
    symlink("/user/home/fakeusb", "/mnt/usb1");
    return 0;
}
