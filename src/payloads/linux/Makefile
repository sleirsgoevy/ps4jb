all: payload.bin payload-702.bin payload-3gb.bin payload-702-3gb.bin

clean:
	rm -f payload.elf payload.bin payload-702.elf payload-702.bin payload-3gb.elf payload-3gb.bin payload-702-3gb.elf payload-702-3gb.bin

../lib/lib.a:
	cd ../lib; make

payload.elf: ../lib/lib.a main.c ps4-kexec/kexec.bin
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a main.c -Wl,-gc-sections -o payload.elf

payload.bin: payload.elf
	objcopy payload.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload.bin
	file payload.bin | fgrep -q 'payload.bin: DOS executable (COM)'

payload-702.elf: ../lib/lib.a main.c ps4-kexec/kexec.bin
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__7_02__ main.c -Wl,-gc-sections -o payload-702.elf

payload-702.bin: payload-702.elf
	objcopy payload-702.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload-702.bin
	file payload-702.bin | fgrep -q 'payload-702.bin: DOS executable (COM)'

payload-3gb.elf: ../lib/lib.a main.c ps4-kexec/kexec.bin
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -DVRAM_GB_DEFAULT=3 main.c -Wl,-gc-sections -o payload-3gb.elf

payload-3gb.bin: payload-3gb.elf
	objcopy payload-3gb.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload-3gb.bin
	file payload-3gb.bin | fgrep -q 'payload-3gb.bin: DOS executable (COM)'

payload-702-3gb.elf: ../lib/lib.a main.c ps4-kexec/kexec.bin
	gcc -isystem ../../8cc/freebsd-headers -nostdinc -nostdlib -fno-stack-protector -static ../lib/lib.a -D__7_02__ -DVRAM_GB_DEFAULT=3 main.c -Wl,-gc-sections -o payload-702-3gb.elf

payload-702-3gb.bin: payload-702-3gb.elf
	objcopy payload-702-3gb.elf --only-section .text --only-section .data --only-section .bss --only-section .rodata -O binary payload-702-3gb.bin
	file payload-702-3gb.bin | fgrep -q 'payload-702-3gb.bin: DOS executable (COM)'

ps4-kexec/kexec.bin:
	cd ps4-kexec; make
