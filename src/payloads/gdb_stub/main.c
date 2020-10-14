#include "dbg.h"
#include <sys/thr.h>

int main(void)
{
    dbg_enter();
    thr_exit(0);
}
