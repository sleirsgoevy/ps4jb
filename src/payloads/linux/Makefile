all: payload.bin

clean:
	rm payload.elf payload.bin

../lib/lib.a:
	cd ../lib; make

payload.elf: ../lib/lib.a main.c ps4-kexec/kexec.bin
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a main.c -Wl,-gc-sections -o payload.elf

payload.bin: payload.elf
	objcopy payload.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload.bin
	file payload.bin | fgrep -q 'payload.bin: DOS executable (COM)'

ps4-kexec/kexec.bin:
	cd ps4-kexec; make
