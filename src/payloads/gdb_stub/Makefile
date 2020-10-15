all: payload.bin gdbstub.bin gdbstub-int.bin gdbstub-lib.bin

clean:
	rm -f payload.elf payload.bin gdbstub.elf gdbstub.bin gdbstub-int.elf gdbstub-int.bin gdbstub-lib.elf gdbstub-lib.bin

../lib/lib.a:
	cd ../lib; make

payload.elf: ../lib/lib.a dbg.c main.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__PS4__ -DPS4LIBS dbg.c main.c ps4libs.c -o payload.elf

payload.bin: payload.elf
	objcopy payload.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary payload.bin

gdbstub.elf: ../lib/lib.a dbg.c _end.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB dbg.c _end.c -Wl,-gc-sections -o gdbstub.elf

gdbstub.bin: gdbstub.elf
	objcopy gdbstub.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub.bin

gdbstub-int.elf: ../lib/lib.a dbg.c _end.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB -DINTERRUPTER_THREAD dbg.c _end.c -Wl,-gc-sections -o gdbstub-int.elf

gdbstub-int.bin: gdbstub-int.elf
	objcopy gdbstub-int.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub-int.bin

gdbstub-lib.elf: ../lib/lib.a dbg.c ps4libs.c _end.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB -DINTERRUPTER_THREAD -DPS4LIBS dbg.c ps4libs.c _end.c -Wl,-gc-sections -o gdbstub-lib.elf

gdbstub-lib.bin: gdbstub-lib.elf
	objcopy gdbstub-lib.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub-lib.bin
