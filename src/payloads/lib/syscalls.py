import urllib.request, http.client, html

def get_freebsd_syscalls():
    data = urllib.request.urlopen('https://raw.githubusercontent.com/freebsd/freebsd/stable/9/sys/kern/syscalls.master').read().decode('ascii')
    data = '\n'.join(i.strip() for i in data.split('\n') if not i.startswith(';')).replace('\\\n', ' ')
    assert data.startswith('$FreeBSD$\n')
    data = data[10:]
    ans = {}
    for i in data.split('\n'):
        i = i.strip()
        if not i or 'STD' not in i.split() or i.startswith('#include'): continue
        name = i.split('(', 1)[0].split()[-1]
        idx = int(i.split()[0])
        ans[idx] = name
    return ans

def get_sony_syscalls():
    cli = http.client.HTTPSConnection('www.psdevwiki.com')
    cli.request('GET', '/ps4/edit/Syscalls')
    r = cli.getresponse()
    data = html.unescape(r.read().decode('latin-1').split('<textarea ', 1)[1].split('</textarea>', 1)[0])
    ans = {}
    for i in data.split('\n'):
        if i.startswith('| '):
            try:
                syscno, fw, syscname, proto, notes = i[2:].split(' || ')
                syscno = int(syscno)
            except ValueError: continue
            if syscname.startswith('sys_'):
                ans[syscno] = syscname[4:]
    return ans

def get_syscalls():
    ans = {}
    ans.update(get_freebsd_syscalls())
    ans.update(get_sony_syscalls())
    ans[11] = 'kexec'
    return ans

print('section .text')
print('use64')
print()

for idx, name in sorted(get_syscalls().items()):
    if '#' in name: continue
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
