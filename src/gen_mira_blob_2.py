import sys

data = list(open(sys.argv[1], 'rb').read())
print('window.mira_blob_2_len = %d'%len(data))
print('window.mira_blob_2 = malloc(window.mira_blob_2_len);')
print('write_mem(window.mira_blob_2, %r);'%data)
