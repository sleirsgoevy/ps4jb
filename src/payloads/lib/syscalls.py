def get_syscalls():
    ans = {}
    with open('../../8cc/build/syscall_names.txt') as file:
        for line in file:
            line = line.strip()
            if not line: continue
            line = line.split()
            assert line[0] == 'var' and line[1].endswith('_addr') and line[2] == '=' and line[3].startswith('sys_') and line[3].endswith('_addr;')
            ans[line[1][:-5]] = int(line[3][4:-6])
    return ans

print('section .text')
print('use64')
print()

for idx, name in sorted((j, i) for i, j in get_syscalls().items()):
    print('global', name)
    print(name+':')
    print('mov rax,', idx)
    print('mov r10, rcx')
    print('syscall')
    print('jc set_err')
    print('ret')
    print()

print('set_err:')
print('mov [rel errno], eax')
print('xor rax, rax')
print('dec rax')
print('ret')
print()

print('section .bss')
print('global errno')
print('errno resw 1')
