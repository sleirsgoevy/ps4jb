all: payload.bin payload-702.bin payload-unk.bin gdbstub.bin gdbstub-int.bin gdbstub-lib.bin gdbstub-lib-702.bin

clean:
	rm -f payload.elf payload.bin payload-702.elf payload-702.bin payload-unk.elf payload-unk.bin gdbstub.elf gdbstub.bin gdbstub-int.elf gdbstub-int.bin gdbstub-lib.elf gdbstub-lib.bin gdbstub-lib-702.elf gdbstub-lib-702.bin

../lib/lib.a:
	cd ../lib; make

payload.elf: ../lib/lib.a dbg.c ps4libs.c main.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__PS4__ -DPS4LIBS dbg.c main.c ps4libs.c -o payload.elf

payload.bin: payload.elf
	objcopy payload.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary payload.bin
	file payload.bin | fgrep -q 'payload.bin: DOS executable (COM)'

payload-702.elf: ../lib/lib.a dbg.c ps4libs.c main.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__PS4__ -DPS4LIBS -D__7_02__ dbg.c main.c ps4libs.c -o payload-702.elf

payload-702.bin: payload-702.elf
	objcopy payload-702.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary payload-702.bin
	file payload-702.bin | fgrep -q 'payload-702.bin: DOS executable (COM)'

payload-unk.elf: ../lib/lib.a dbg.c ps4libs.c main.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__PS4__ dbg.c main.c -o payload-unk.elf

payload-unk.bin: payload-unk.elf
	objcopy payload-unk.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary payload-unk.bin
	file payload-unk.bin | fgrep -q 'payload-unk.bin: DOS executable (COM)'

gdbstub.elf: ../lib/lib.a dbg.c _end.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB dbg.c _end.c -Wl,-gc-sections -o gdbstub.elf

gdbstub.bin: gdbstub.elf
	objcopy gdbstub.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub.bin
	file gdbstub.bin | fgrep -q 'gdbstub.bin: DOS executable (COM)'

gdbstub-int.elf: ../lib/lib.a dbg.c _end.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB -DINTERRUPTER_THREAD dbg.c _end.c -Wl,-gc-sections -o gdbstub-int.elf

gdbstub-int.bin: gdbstub-int.elf
	objcopy gdbstub-int.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub-int.bin
	file gdbstub-int.bin | fgrep -q 'gdbstub-int.bin: DOS executable (COM)'

gdbstub-lib.elf: ../lib/lib.a dbg.c ps4libs.c _end.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB -DINTERRUPTER_THREAD -DPS4LIBS dbg.c ps4libs.c _end.c -Wl,-gc-sections -o gdbstub-lib.elf

gdbstub-lib.bin: gdbstub-lib.elf
	objcopy gdbstub-lib.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub-lib.bin
	file gdbstub-lib.bin | fgrep -q 'gdbstub-lib.bin: DOS executable (COM)'

gdbstub-lib-702.elf: ../lib/lib.a dbg.c ps4libs.c _end.c
	gcc -g -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__PS4__ -Ddbg_enter=main -DBLOB -DINTERRUPTER_THREAD -DPS4LIBS -D__7_02__ dbg.c ps4libs.c _end.c -Wl,-gc-sections -o gdbstub-lib-702.elf

gdbstub-lib-702.bin: gdbstub-lib-702.elf
	objcopy gdbstub-lib-702.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata --set-section-flags .bss=alloc,load,contents -O binary gdbstub-lib-702.bin
	file gdbstub-lib-702.bin | fgrep -q 'gdbstub-lib-702.bin: DOS executable (COM)'
