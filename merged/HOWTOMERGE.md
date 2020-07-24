# HOW TO MERGE JS FILES

- Install nodejs
- A nodejs stable version should be enough
- You can use [nvm](https://github.com/nvm-sh/nvm) to install a nodejs 
- Install [tercer](https://github.com/terser/terser) using this commnad ```npm install terser -g```
- The Folder ``merged`` should exist, if not, returns a error

### Use this command to merge the Jailbreak code
```
terser common/exploit.js common/helpers.js common/malloc.js common/rop.js common/syscalls.js common/syscalls2.js jb/c-code.js -c -m -o merged/jb_merged.js
```

### Use this command to merge the MIRA+HEN code
```
terser common/exploit.js common/helpers.js common/malloc.js common/rop.js common/syscalls.js common/syscalls2.js mira/mira.js mira/mira2.js mira/c-code.js -c -m -o merged/mira_merged.js
```

### Use this command to merge the NETCAT code
```
terser common/exploit.js common/helpers.js common/malloc.js common/rop.js common/syscalls.js common/syscalls2.js mira/c-code.js -c -m -o merged/netcat_merged.js
```

### If only want to merge the commons, use this command to merge the NETCAT code
```
terser common/exploit.js common/helpers.js common/malloc.js common/rop.js common/syscalls.js common/syscalls2.js -c -m -o merged/commons_merged.js
```

### You can use this command to minimify the JB Code and reduce its size (remove comments, line breaks and unnecessary spaces, merge all on one line, its optimice the reading process) JB ONLY
```
terser jb/c-code.js -c -m -o merged/jb_only_merged.js
```

### This is for MIRA+HEN ONLY
```
terser mira/mira.js mira/mira2.js mira/c-code.js -c -m -o merged/mira_only_merged.js
```

### This is for NETCAT ONLY
```
terser mira/c-code.js -c -m -o merged/netcat_only_merged.js
```