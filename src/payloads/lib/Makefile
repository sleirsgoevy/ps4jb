all: lib.a

clean:
	rm lib.a *.o syscalls.asm

dl.o: dl.c
	gcc -c -isystem ../../8cc/freebsd-headers -nostdinc -fno-stack-protector dl.c -o dl.o

crt.o: crt.asm
	yasm -f elf64 crt.asm

syscalls.o: syscalls.asm
	yasm -f elf64 syscalls.asm

syscalls.asm: syscalls.py
	python3 syscalls.py > syscalls.asm

lib.a: crt.o dl.o syscalls.o
	ld -r crt.o dl.o syscalls.o -o lib.a
