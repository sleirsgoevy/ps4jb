var malloc_nogc = [];
function malloc(sz)
{
    let arr = new Uint8Array(sz);
    malloc_nogc.push(arr);
    return read_ptr_at(addrof(arr)+0x10);
}
