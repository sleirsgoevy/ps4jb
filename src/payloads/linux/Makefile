all: payload.bin payload-702.bin

clean:
	rm payload.elf payload.bin

../lib/lib.a:
	cd ../lib; make

payload.elf: ../lib/lib.a main.c ps4-kexec/kexec.bin
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a main.c -Wl,-gc-sections -o payload.elf

payload.bin: payload.elf
	objcopy payload.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload.bin
	file payload.bin | fgrep -q 'payload.bin: DOS executable (COM)'

payload-702.elf: ../lib/lib.a main.c ps4-kexec/kexec.bin
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -static ../lib/lib.a -D__7_02__ main.c -Wl,-gc-sections -o payload-702.elf

payload-702.bin: payload-702.elf
	objcopy payload-702.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload-702.bin
	file payload-702.bin | fgrep -q 'payload-702.bin: DOS executable (COM)'

ps4-kexec/kexec.bin:
	cd ps4-kexec; make
