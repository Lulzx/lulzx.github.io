# The 100-line rule

If a dependency is less than 100 lines of code, I write it myself.

I want 100 lines I understand completely more than 100 lines I don't. A package is those lines plus a name on a registry, a version range, a lockfile entry, a person who can unpublish, a publish token that can leak, and every package *that* package pulls in. I take the whole chain when I type the install command. I rarely want the chain.

Someone unpublished an 11-line pad helper. It prepended characters to a string in a loop. Builds failed across millions of projects. I could have written those 11 lines in 30 seconds. So could you. So could anyone. But 2.5 million projects depended on one person not deleting their npm package. The helper was never the hard part. The hard part was letting a registry own a loop.

## What I keep in the repo

I have a utils file in most of my projects. It has debounce, throttle, deep clone, a couple of string helpers. Maybe 80 lines total. I've never had a supply chain attack on my utils file. It does not update itself at 2am. It does not grow a transitive tree I have never opened. When it is wrong, the stack points at a function I can read without leaving the editor.

I copy the 20 lines I need, or I write them. I do not vendor a "utils kit" that also formats dates and parses query strings I will never touch. Extra helpers become extra surface. Someone will call the date formatter from a path I did not review, and then I own a calendar.

100 is a fence, not a religion. Some 40-line packages wrap a native module I cannot see. Some 90-line packages are a thin file on top of a tree of twenty others. I count what actually lands in `node_modules`, or I do not count. A pretty README is not the size of the risk.

## What I still install

I still take a dependency when the hard part is years of cases I have not lived. A TLS stack. A parser for a format with a graveyard of edge cases. Crypto I would get slightly wrong. Those lines are not 100. They are a career. Installing them is cheaper than pretending I can reproduce the scars.

I also install what the runtime already is. I do not rewrite `git`. I do not rewrite a database. The rule is for the glue I reach for out of habit, the one function that feels too small to type.

Even then I pin the version. I read the install tree. I ask whether I need the library or one function from it. One function is a candidate for the utils file. The whole library is a candidate for staying a library.

## The real test

The threshold isn't really 100 lines. It's: *can I understand every line of this?* If yes, I own it. If no, I think very hard about whether I need it. If I cannot explain what happens when the maintainer vanishes, I do not have a helper. I have a bet.

Owning the lines has a cost. I fix my own bugs. I do not get patches for free. That is the trade I want for debounce. It is a trade I refuse for a cipher. The rule is how I tell those two apart before the lockfile grows a life of its own.
