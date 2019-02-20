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
		printf("Hello, %s!\\n", name);
}

`

const helloh = `#ifndef __HELLO_H
#define __HELLO_H

void hello(char *name);

#endif
`

const dummy = `FOO = bar

# This is the main target
cake: eggs sugar
	@echo ">>> ready to create cake"
	ls
	touch cake
	@echo ">>> have a chocolate $(FOO)!"

eggs:
	@echo ">>> creating eggs..."
	touch eggs

sugar:
	@echo ">>> creating sugar..."
	touch sugar`

const first = `hello: main.o hello.o
	gcc -Wall main.o hello.o -o hello

main.o: main.c hello.h
	gcc -Wall -c main.c -o main.o

hello.o: hello.c hello.h
	gcc -Wall -c hello.c -o hello.o

clean:
	rm -f *.o hello`;

const second = `CC := gcc
CFLAGS := -Wall

hello: main.o hello.o
#	gcc   -Wall     main.o hello.o -o hello
	$(CC) $(CFLAGS) main.o hello.o -o hello

main.o: main.c hello.h
	$(CC) $(CFLAGS) -c main.c -o main.o

hello.o: hello.c hello.h
	$(CC) $(CFLAGS) -c hello.c -o hello.o

clean:
	rm -f *.o hello

.PHONY: clean`;

const third = `CC = gcc
CFLAGS = -Wall

hello: main.o hello.o
#	gcc   -Wall     main.o hello.o -o hello
	$(CC) $(CFLAGS) $^             -o $@

%.o: %.c hello.h
#	if % matched 'main'
#	gcc   -Wall     -c main.c -o main.o
	$(CC) $(CFLAGS) -c $<     -o $@

clean:
	rm -f *.o hello

.PHONY: clean`;

export {mainc, helloc, helloh, dummy, first, second, third};
