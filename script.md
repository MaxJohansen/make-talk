# make

Hello, my name is Mads and I'm here to talk to you about the make tool.
If you have any questions about anything during this talk, please feel free to ask!

make is a simple build tool that has been around in some form or another since 1976. It was originally used to manage the piecemeal compilation of large programs, which was an absolute necessity back when computing resources were far less abundant than they are today.

The way it was designed, however, makes it useful to this day. Its basic functionality is simply to create files by following rules. When you tell make what you want it will try to find a rule that fits, ensure that the requirements are met and then execute the commands for that rule to create your file.

Why do we need automation, I hear you cry? Don't be a fool, Mads, I can just type in the commands perfectly every time! My shell has a history feature, you complete buffoon! Because automating repetitive tasks is what we *do*, friends! It's the best feeling in the world. It protects us from forgetting a step in a long build process, it helps us communicate our intent if we're working in a team and it's more robust than your average shell script.

There are tons of other build tools that build on the ideas of make, many of them are even named after it: bake, cake, fake, rake, snaaaake (just kidding about that last one)

So even if you don't think you'll use make in the 'real world', most of the concepts will carry over.

*click*

So what can we put in a Makefile? Let's start by examining the building blocks that we can use.
- The most important things are rules. These match "targets" with the commands that will create them. The rules also contain a list of the prerequisites that the commands will use as their input.
- Macros, which some call variables. The thing with macros is that they expand when they are evaluated instead of when they are assigned, so they're not quite variables in the sense that you may know them. For our purposes we'll just treat them as variables and you can read up on them if you want to know more.
- Comments, for when you need to clarify some arcane details of your build process.
- Directives. These are for more advanced use cases, like conditional compilation or including other Makefiles into your own. We won't be exploring these today, but you should know that they exist.

Now I don't know about you, but I usually need an example or two to understand a new concept. So let's look at this example Makefile I've made to demonstrate some of the things we've just seen.

*click*

First up we can see a macro treated as a simple variable. This assigns a value to the macro FOO just like you'd expect.

Next is just a simple comment, they work exactly like you'd expect: anything following a hash sign is ignored. If you need to use a hash sign, you can escape it with a backslash just like you would in most other programming languages.

The comment tells us that this is the main target, but how does it know this? What a terrible comment. The reason this is the main target is fairly simple: it's because it's the first rule in the Makefile. It's like my father used to say: first to the møll gets kjøtt on the køll. There are other ways to specify the main target, but most users simply follow the rule and put their main target first.

Here comes the main attraction: a rule.

*down*

This rule is for a target named 'cake' and it depends on the files 'eggs' and 'sugar'. Yes, I know this would make for a _terrible_ cake. These are just example names and I was hungry when I wrote this. The way make resolves these dependencies is remarkably simple: it uses timestamps. If 'cake' already exists, but the timestamps on 'eggs' indicate that it is newer than 'cake', then make knows that 'cake' is outdated and needs to be baked again.

*down*

Once make has fulfilled these prerequisites, it will run the commands defined under the rule. It's important to point out that the commands _must_ be indented with tabs, not spaces! There are workarounds that let you use whatever indentation character you'd like, but most people just get used to using tabs in this one special case.

Notice the command that's prefixed with an at-symbol? Normally when make runs commands, it prints them as its running them so it looks like you typed them yourself. In this case, however, the command itself is 'echo' which will simply print whatever we tell it, resulting in double output. Prefixing it with an at-symbol silences the print from make, which means that we only see the actual output from 'echo'.

*down*

The next two rules are much like the first one, except they do not have any dependencies. By the way, if you've never seen the 'touch' command before, it is used to update the timestamps on the files you pass it as arguments. If the file does not exist, it is created. This is a common way to create an empty file in a UNIX system.

Now let's try to run make with this Makefile to see what happens.

*click*
*down*

*down*
This example is run in a folder containing nothing but the aforementioned Makefile.

*down*
*down*

As we can see, running make has produced some output. The first four lines are from when make satisfies the prerequisites for the 'cake' target. It went looking for 'eggs' and noticed that it didn't exist, so it went ahead and ran the rule for creating eggs. Notice that the 'echo' does not show up, but the 'touch' command does. We could silence the touch command if we only wanted the pretty output from this rule. Make did the same thing for 'sugar'.

Once it had those two things, it ran the commands for the cake target: it echoed its readiness for cake, ran 'ls' and showed us the output and then it created cake. the final line of output demonstrates the expansion of the variable 'FOO' into its value 'bar'.

*down*

Now if we run 'ls' we can see that we've got 'cake' as well as the files that were created by the other two targets.

*down*

If we run make again, it will check the timestamps for 'cake' and its dependencies, see that 'cake' is  newer than its dependencies which means that they have not changed since the last time 'cake' was created and simply report that there is nothing to do.

So that's all well and good, let's see if we can make this work for a "real" project. I put air quotes around that because even this example is far too simple to need make, but bear with me here.

*click*

In our case study we'll be creating, what else, an hello world application. We're software engineers though, so we've separated the helloing functionality into a library which I have called 'hello'.

*click*

It consists of a C source file and a header file which defines the "API".

*click*

The main program file is called main, because of course it is. The only thing it does is call the 'hello' function with the argument "world" and then loop through all of its command line arguments and passing them to the same 'hello' function. But this is not important for our example, so we'll move right along to...

*click*

Our Makefile. As we can see it's a lot like the previous one, but with some actual commands to create files from our source.

*down*

The rules still specify what we want...

*down*

And how to build it.

But what's that at the bottom there?

*down*

What does this target create? And if nothing depends on it, when is it run?

As we can see it doesn't create anything: on the contrary, it deletes all of the object files as well as the 'hello' file.

This is more of a helper target, a utility target if you will, that we can run from the commandline to clean up the files that the other targets generate. You can always run any target by specifying it on the command line. Simply running "make clean" will run this target and nothing else.

This is a very common target in Makefiles for a reason. It's great in case you wish to share this folder with someone, like when you're handing in your assignments or pushing to Github. Since the recipient can simply use the make command to generate these files from source, there's no reason to waste time giving them the ones you've generated. There's nothing special about your copies and in fact, it's considered messy and unprofessional to not clean your workspace before sharing it.

Now you basically know everything you need to start being productive with make, but I've got a few more tricks before I'll let you go. I want you to feel confident enough that you can start modifying the Makefiles provided with your assignments, improving them, customizing them to your needs.

One of the ways we can do this is to use more variables. This might be unlikely for any of your projects at this point, but for the sake of argument let's pretend that we wanted to switch compilers. You're tired of gcc, you want to use clang! Now sure, you could use a find-replace on your Makefile to substitute all instances of 'gcc' with 'clang'... but that's sort of error prone. What if you miss one?

*click*

Instead, let's use a variable for the compiler as well as the flags that we usually pass to it so that we can remove some duplication in our rules.

*down*

I've left a comment in this Makefile to show you how these variables will be expanded.

*down*

Now notice that I call this 'reduced repetition': surely repeating the variables is just as bad as repeating 'gcc -Wall'? No, because what I've actually removed is *knowledge*. While the macros are repeated, the knowledge that they represent, namely which compiler we use and what flags we pass, has been hidden behind a layer of indirection. The source of that knowledge now lives in a single place, making it easy to change in the future as our project changes and grows. The creators of make realized how handy this could be and actually gave us a bunch of other ways that we can reduce this kind of duplication, which we'll talk about in just a second, but first...

*down*

Remember that 'clean' target we mentioned earlier? And remember what I told you about how make decides whether or not it needs to rebuild a target? It simply checks timestamps. We aren't expecting a file named 'clean' to exist here, so in most cases this will just work... but what if someone were to create a file called clean? This target would stop working.

No one is likely to create a file named 'clean', but imagine having a target named 'test', for instance, that runs your unit tests. As you created more tests someone might come along and put these tests into a folder named 'test', and then where would you be? Whenever you tried to run your tests, make would see a folder named test which was newer than its dependencies (because it has no dependencies) and then simply skip the commands for the test target.

This is not what we wanted! Of course we can cheat and create another fake dependency called, say, 'fakes', that we would never build. If 'test' depends on 'fakes' and the rule for 'fakes' is empty, then the target 'test' will always be newer than its dependencies because the dependency does not exist. make will always run this rule. But then what happens when you create a folder called 'fakes' to store your fake test data? You've simply moved the problem, not solved it.

*down*

The special PHONY target is the correct way to solve this problem. Any dependencies of the PHONY target will not check for the existence of the target before running the rule. The rule will just run, no matter what.

*click*

All right, let's get back to variables. The creators of make knew how powerful variables could be, so they've provided us with several built-in and automatic variables that we can use to make our rules even more flexible.

There are a ton more than I can fit on this slide, but these cover 98% of the use cases I've seen. You can find the rest of them in the docs.

The name of the current target is handy, for instance, to ensure that we always create the right thing! If you update the target name but forget to update what gcc outputs, your target recipe will always run.

Let me show you what I mean.

*click*

This is the third version of our Makefile.

*down*

As you can see I've replaced the list of .o files that we feed to gcc with the dollarsign-hat variable and the name of the output file 'hello' with the dollarsign-at variable. The command looks far more arcane now, but we've learned all about automatic variables so we are no longer scared! Feel the power.

*down*

Now this is another interesting trick. This is called a pattern target, and it contains a wildcard. Whenever make wants to make a .o-file and it cannot find a more specific rule, it will fall back to checking pattern rules. In fact, for many of these older formats it already contains implicit rules! If you ask make for an .o file, even in a directory that doesn't have a Makefile, it will fall back to the implicit rule which says "look for a C file with the same name and run CC on it to produce an .o file". We could delete this entire rule and the Makefile would still work!

It wouldn't list the header file as a dependency, though, so you might run into some subtle bugs. We'll keep the target as it is. Note that we use the dollarsign-lessthan variable instead of dollarsign-hat: we do not want to pass the headerfile to the compiler.

I've hope this talk has helped you understand make and Makefiles a little better. There's a LOT of stuff I couldn't fit in this talk, so you should definitely look into the docs or at similar build tools if you'd like to automate more of your workflow.

Peace out!
