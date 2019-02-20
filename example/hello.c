#include <stdio.h>
#include "hello.h"

void hello(char *name)
{
		if(!name) name = "world";
    printf("Hello, %s!\n", name);
}
