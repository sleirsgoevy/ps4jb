import sys

print('window.mira_blob = malloc(65536);')
print('write_mem(window.mira_blob, %r);'%list(open(sys.argv[1], 'rb').read()))
