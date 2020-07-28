# ps4jb

This is a full chain exploit for PS4 firmware 6.72. Basically this is TheFlow's POC together with PS4-specific kROP & kernel patches. [Mira](https://github.com/OpenOrbis/mira-project) is used as a HEN payload.

## Building from source

To build from source, clone this repository recursively, and run these commands:

```
cd src
make
```

You will get a fresh copy of the binary build in `src/build/`.

Dependencies: `python3`, `gcc`, `ROPgadget`. Note: Mira is not being built from source

## Adding your own payloads

`miraldr.c` loads 65536 bytes at address stored in JS variable `mira_blob` into RWX memory and jumps to it. At this point only the minimal patches (amd64_syscall, mmap, mprotect, kexec) are applied (i.e. the process is still "sandboxed"). Normally `mira_blob` contains MiraLoader.

`mira_blob_2_len` bytes at `mira_blob_2` are sent to `127.0.0.1:9021` in a background thread. If `mira_blob` contains MiraLoader this will be run in the same way but with the full patchset applied & already jailbroken.

## Credits

* [Fire30](https://github.com/Fire30/bad_hoist) for the WebKit exploit
* [TheFlow](https://hackerone.com/reports/826026) for the kernel exploit
* [Rui Ueyama](https://github.com/rui314/8cc) and [shinh](https://github.com/shinh/ELVM) for the 8cc compiler
