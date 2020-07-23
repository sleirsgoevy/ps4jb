import os

os.system('yasm inline.asm')

with open('inline', 'rb') as file: data = file.read()

for i in range(0, len(data), 8):
    print('*(unsigned long long*)(page_rw+%d) = __builtin_gadget_addr("dq 0x%x");'%(i, int.from_bytes(data[i:i+8], 'little')))
