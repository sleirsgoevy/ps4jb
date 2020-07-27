#include "dbg.h"

int main(void)
{
    dbg_enter();
    int a = 0, b = 1;
    for(;;)
    {
        int c = a;
        a = b;
        b += c;
    }
}
