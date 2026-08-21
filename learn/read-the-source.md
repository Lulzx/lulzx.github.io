# Read the source

I used to think building things was how you got good. Building is half of it. The other half is sitting in a working system and watching how it actually moves.

Not a post about the code. The code.

## What Redis taught me

I learned more from reading the Redis source than from any database course. About 50,000 lines of clear C. You can hold the shape of it. Every function does what its name says. The comments explain *why*.

A why comment is the gold. The calls are obvious. Increment here, free that, return. The comment is the part you cannot recover from the statements: the failure that happens if you skip the first call, the order that looks unnatural on purpose, the case that used to live at the bottom of the loop and broke people. Code tells you the path. The comment tells you which path was refused.

I start at the entry. `main`, the listen socket, the loop that waits for a connection. Then I pick one type and stay there. A hash. A string. How a command name becomes a function pointer. I do not open a random helper in the middle of a file and hope the plot appears. The plot is the data. Follow the bytes from the client to the structure that holds them.

Names that tell the truth drop the amount you have to keep in your head. When a function is called `lookupCommand` I can treat it as a door. I only walk through it when the door is the thing I came to understand.

## How I read when I am stuck

A tutorial compresses. It shows the happy path and hides the constraint that made the ugly branch exist. The source still has the constraint. The timeout. The buffer that gets reused. The case where a replica connects mid-write. That is the part I need when my own design is wobbling.

I do not read to collect tricks. I read to see the cycle. Where state lives when the function returns. What is allowed to fail. What the author refused to make clever. A small, boring structure that survived years of load teaches more than a diagram of a structure that never shipped.

When I cannot decide, I open a system that already made the decision and shipped it. How does this store expire a key without stalling the loop? How does this parser reject a bad line without allocating a tree? The answers are in files I can grep. Most things worth stealing a shape from are sitting in the open.

## The skill

Reading code is slower than writing a toy. The first hour feels like walking into a city without a map. Then a street repeats. Then a square. Then you know where the river is and you stop being lost.

I still write every day. I read more than I used to, on purpose. The programs I trust are the ones whose source I have sat with long enough that their next change would not surprise me.
