# Rust rewired my brain

I picked up Rust in 2023 expecting a language. I got a way of thinking.

The borrow checker keeps asking one question: *who owns this data?* I had never asked that before. In Python and JavaScript the answer was easy. Who cares. The garbage collector will figure it out. In Rust I have to know. Each value has one owner. There is only one at a time. When the owner leaves scope, the value is dropped. I can lend it, mutably to one place or shared to many, and I cannot do both at once.

## What the no is pointing at

At first the compiler felt like a hall monitor. I would write the shape I was used to, a graph of objects that all point at each other and mutate when they feel like it, and the compiler would refuse. I cloned things to make it shut up. I wrapped things so two owners could pretend to share. The code compiled and I had learned nothing.

The useful fight is the one that makes me redraw the data. If two functions both need to change the same buffer, the design never decided who is in charge of the buffer. Once I pick an owner, the rest of the function gets shorter. The compiler was naming a blur I had been living with.

I still reach for an explicit copy when I actually need two values. I still share when the lifetime is honestly shared. Those are decisions now. They used to be the default, hidden behind a runtime that cleaned up after me.

## The question travels

Now I think about ownership in every language. When I write TypeScript I notice when I pass an object into two places and both of them write to it. When I design an API I ask who closes the file, who frees the connection, who is allowed to mutate the record after the call returns. The type system over there will not stop me. The question still saves me a week of "who touched this."

Cleanup is the same question with a clock on it. If I open a handle, someone has to shut it. If that someone is "whoever goes out of scope last," I want that written down, even in Python, even if the language will not check me. I used to leave that to luck and a finalizer I never read.

## Getting used to no

Rust also made me comfortable with the compiler saying no. In dynamic languages I discover the mistake when a request hits the bad path. In Rust the compiler catches the path I did not run. At first this felt slow. I would spend an afternoon on a program that would have "worked" in Python, meaning it would have run until the aliasing showed up in production.

The slowness moved. I pay it at the keyboard. I do not pay it later, on a path I never ran, when two writers both thought they owned the value. After enough of those nos, I start writing in the shape the checker wants. I stop fighting. The program gets a spine before it gets a body.

I still write TypeScript and Python when they are the right tool. I write them differently than I used to. I name the owner out loud. I get suspicious when two writers share a value. I treat a type error as a cheap no, and I miss it when the language cannot say it.
