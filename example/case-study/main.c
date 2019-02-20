#include <stdio.h>
#include "hello.h"

int main(int argc, char** argv)
{
    hello(NULL);
    while(argc-- > 1)
    {
        hello(argv[argc]);
    }
    return 0;
}