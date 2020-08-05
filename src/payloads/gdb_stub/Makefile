all: payload.bin gdbstub.bin

clean:
	rm payload.elf payload.bin gdbstub.elf gdbstub.bin

../lib/lib.a:
	cd ../lib; make

payload.elf: ../lib/lib.a dbg.c main.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__PS4__ dbg.c main.c -o payload.elf

payload.bin: payload.elf
	objcopy payload.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary payload.bin

gdbstub.elf: ../lib/lib.a dbg.c _end.c
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB dbg.c _end.c -Wl,-gc-sections -o gdbstub.elf

gdbstub.bin: gdbstub.elf
	objcopy gdbstub.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub.bin
