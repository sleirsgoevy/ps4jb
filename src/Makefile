all: build/oldjb/c-code.js build/jb/c-code.js build/mira/mira.js build/mira/mira2.js build/mira/c-code.js build/fakeusb.js build/linux.js build/linux-3gb.js build/ftp.js build/todex.js build/spoofer.js build/ps4-hen-vtx.js copy_js

702: build/jb702/c-code.js build/mira702/c-code.js build/mira702/mira.js build/mira702/mira2.js build/ps4-hen-vtx-702.js build/linux702.js build/linux702-3gb.js copy_js

FORCE:

clean:
	rm -rf build inline inline_asm.c

8cc_setup:
	cd 8cc; make

8cc_setup_702:
	cd 8cc-702; make

build/oldjb/c-code.js: 8cc_setup oldkex.c
	mkdir -p build/oldjb
	8cc/8cc/python/rop-ps4-8cc /dev/stdout 8cc/librop/*.c printf_stub.c 8cc/ps4/*.c oldkex.c | python3 8cc/bad_hoist/rop/compiler.py /dev/stdin 8cc/bad_hoist/dumps/gadgets.txt > build/oldjb/c-code.js

build/jb/c-code.js: 8cc_setup kex.c inline_asm.c
	mkdir -p build/jb
	8cc/8cc/python/rop-ps4-8cc /dev/stdout 8cc/librop/*.c printf_stub.c 8cc/ps4/*.c kex.c | python3 8cc/bad_hoist/rop/compiler.py /dev/stdin 8cc/bad_hoist/dumps/gadgets.txt > build/jb/c-code.js

build/jb702/c-code.js: 8cc_setup_702 kex-702.c inline_asm_702.c
	mkdir -p build/jb702
	8cc-702/8cc/python/rop-ps4-8cc /dev/stdout 8cc-702/librop/*.c printf_stub.c 8cc-702/ps4/*.c kex-702.c | python3 8cc-702/bad_hoist/rop/compiler.py /dev/stdin 8cc-702/bad_hoist/dumps/gadgets.txt > build/jb702/c-code.js

inline_asm.c: inline.asm inline_asm.py
	python3 inline_asm.py inline > inline_asm.c

inline_asm_702.c: inline_702.asm inline_asm.py
	python3 inline_asm.py inline_702 > inline_asm_702.c

build/mira/c-code.js: 8cc_setup miraldr.c
	mkdir -p build/mira
	8cc/8cc/python/rop-ps4-8cc /dev/stdout 8cc/librop/*.c printf_stub.c 8cc/ps4/*.c miraldr.c | python3 8cc/bad_hoist/rop/compiler.py /dev/stdin 8cc/bad_hoist/dumps/gadgets.txt > build/mira/c-code.js

build/mira702/c-code.js: 8cc_setup_702 miraldr.c
	mkdir -p build/mira702
	8cc-702/8cc/python/rop-ps4-8cc /dev/stdout 8cc-702/librop/*.c printf_stub.c 8cc-702/ps4/*.c miraldr.c | python3 8cc-702/bad_hoist/rop/compiler.py /dev/stdin 8cc-702/bad_hoist/dumps/gadgets.txt > build/mira702/c-code.js

miraldr.bin:
	echo 'Place MiraLoader payload at miraldr.bin'
	false

miraldr702.bin:
	echo 'Place MiraLoader for FW 7.02 at miraldr702.bin'

mira.elf:
	echo 'Place Mira ELF at mira.elf'
	false

build/mira/mira.js: gen_mira_blob.py miraldr.bin
	mkdir -p build/mira
	python3 gen_mira_blob.py miraldr.bin > build/mira/mira.js

build/mira/mira2.js: gen_mira_blob_2.py mira.elf
	mkdir -p build/mira
	python3 gen_mira_blob_2.py mira.elf > build/mira/mira2.js

build/mira702/mira.js: gen_mira_blob.py miraldr702.bin
	mkdir -p build/mira702
	python3 gen_mira_blob.py miraldr702.bin > build/mira702/mira.js

build/mira702/mira2.js: gen_mira_blob_2.py mira702.elf
	mkdir -p build/mira702
	python3 gen_mira_blob_2.py mira702.elf > build/mira702/mira2.js

build/fakeusb.js: gen_mira_blob_2.py FORCE
	cd payloads/fakeusb; make
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/fakeusb/payload.bin > build/fakeusb.js

build/linux.js: gen_mira_blob_2.py FORCE
	cd payloads/linux; make
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/linux/payload.bin > build/linux.js

build/linux702.js: gen_mira_blob_2.py FORCE
	cd payloads/linux; make
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/linux/payload-702.bin > build/linux702.js

build/linux-3gb.js: gen_mira_blob_2.py FORCE
	cd payloads/linux; make
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/linux/payload-3gb.bin > build/linux-3gb.js

build/linux702-3gb.js: gen_mira_blob_2.py FORCE
	cd payloads/linux; make
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/linux/payload-702-3gb.bin > build/linux702-3gb.js

build/ftp.js: gen_mira_blob_2.py FORCE
	cd payloads/ftp; make
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/ftp/payload.bin > build/ftp.js

build/todex.js: gen_mira_blob_2.py ../todex.bin
	mkdir -p build
	python3 gen_mira_blob_2.py ../todex.bin > build/todex.js
	
build/spoofer.js: gen_mira_blob_2.py FORCE
	cd payloads/spoofer; make
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/spoofer/payload.bin > build/spoofer.js

build/ps4-hen-vtx.js: gen_mira_blob_2.py FORCE
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/ps4-hen-vtx/ps4-hen-vtx.bin > build/ps4-hen-vtx.js

build/ps4-hen-vtx-702.js: gen_mira_blob_2.py FORCE
	mkdir -p build
	python3 gen_mira_blob_2.py payloads/ps4-hen-vtx/702.bin > build/ps4-hen-vtx-702.js

copy_js:
	mkdir -p build/common
	cp 8cc/bad_hoist/exploit.js 8cc/bad_hoist/helpers.js 8cc/bad_hoist/malloc.js build/common/
	cp 8cc/bad_hoist/rop/rop.js build/common/
	cp 8cc/bad_hoist/dumps/syscalls.txt build/common/syscalls.js
	cp 8cc/build/syscall_names.txt build/common/syscalls2.js
	cp ../index.html ../jb.html ../mira.html ../netcat.html ../ftp.html ../fakeusb.html ../linux.html ../todex.html ../spoofer.html ../ps4-hen-vtx.html build/
	cp ../netcat702.html ../payload702.html ../index702.html ../702.js build/
	rm -f build/webkit-7.02 && ln -s ../../webkit-7.02 build/webkit-7.02
	cd build; python3 ../Patch.py
