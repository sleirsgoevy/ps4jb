all: payload.bin

clean:
	rm payload.elf payload.bin

../lib/lib.a:
	cd ../lib; make

payload.elf: ../lib/lib.a main.c
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a main.c -Wl,-gc-sections -o payload.elf

payload.bin: payload.elf
	objcopy payload.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload.bin
	file payload.bin | fgrep -q 'payload.bin: DOS executable (COM)'
