const mainc = `#include <stdio.h>
#include "hello.h"

int main(int argc, char** argv)
{
    hello(NULL);
    // Greet the commandline arguments in reverse order
    while(argc-- > 1)
    {
        hello(argv[argc]);
    }
    return 0;
}
`

const helloc = `#include <stdio.h>
#include "hello.h"

void hello(char *name)
{
    if (name == NULL) name = "world";
    printf("Hello, %s!\n", name);
}

`

const helloh = `#ifndef __HELLO_H
#define __HELLO_H

void hello(char *name);

#endif
`

const first = `hello: main.o hello.o
	gcc -Wall main.o hello.o -o hello

main.o: main.c hello.h
	gcc -Wall main.c -c

hello.o: hello.c hello.h
	gcc -Wall hello.c -c

clean:
	rm -f *.o hello`;
const second = `CC := gcc
CFLAGS := -Wall

hello: main.o hello.o
#   gcc   -Wall     main.o hello.o -o hello
    $(CC) $(CFLAGS) main.o hello.o -o hello

main.o: main.c hello.h
    $(CC) $(CFLAGS) main.c -c

hello.o: hello.c hello.h
    $(CC) $(CFLAGS) hello.c -c

clean:
    rm -f *.o hello
    
.PHONY: clean`;
const third = `CC = gcc
CFLAGS = -Wall

.PHONY: clean

hello: main.o hello.o
    $(CC) $(CFLAGS) $^ -o $@

%.o: %.c hello.h
    $(CC) $(CFLAGS) $< -c

clean:
    rm -f *.o hello
    
.PHONY: clean`;

export {mainc, helloc, helloh, first, second, third};