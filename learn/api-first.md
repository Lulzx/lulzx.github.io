# Start with the interface

Before I write any implementation, I write the function signature. The API. The interface. The boundary between what it does and how it does it.

If the interface is clean, the body usually follows. I can see the types, the names, the error path, and the insides have a place to land. If the interface is awkward, no amount of clever code inside will fix it. Callers will still pass seven arguments in the right mood. They will still call step two before step one. They will still read the comment I wrote because the signature would not speak.

## The part I keep

I have thrown away entire implementations and kept the interface unchanged. The callers never knew. That is the point. The interface is the contract. Everything else is negotiable.

I treat that as a test. If I cannot swap the body without touching the call sites, the insides crawled out. The file handle that the caller still has to close. The map that the caller has to fill in a secret order. The boolean that only means something if you read the other module.

When I am unsure, I write the call site first, against a function that does not exist yet. I write the sentence I want to say. If the sentence needs a preamble, or a cleanup block, or a comment that says "do not call this twice," the boundary is still wrong. I change the names and the arguments until the call reads like a decision I actually want to make.

## Where the rot lives

Most bad code is not bad inside functions. It is bad at the boundaries. Functions that take seven parameters. Methods that do three things. APIs that require you to call things in a specific order. I have written all three when I started from a body I already liked and then exposed whatever variables I had lying around.

Seven parameters usually mean I never named the clump. Three jobs in one method mean I never split the contract. A required order means the object has a secret life, and the type will let you talk to it while it is only half built. I fix those at the edge. I wrap the clump. I split the method. I make the half-built state unnameable, so there is no function to call too early.

A comment that explains how to call something is a signature that failed. I used to add the comment. Now I treat it as a failing test of the boundary. The words belong in the names and the types, where a caller cannot skip them.

## When I start the body

I start the body when the call sites look boring. One or two arguments. A result I can match on. No leftover "and then remember to." At that point the implementation is a private problem. I can be sloppy in there for a day. I can replace it on the next day. The people on the other side of the function do not come with me.

This is also how I know a piece of work wants this shape. If I cannot write the signature without inventing the algorithm, I do not understand the job yet. I stay at the boundary. I write another fake call. I delete an argument. I rename the return. The insides can wait. They have always been the cheap part.
