# Story

Here's a weird thing I only noticed recently: almost everything I believe about software, I learned on computers that could barely run software.

That turns out to be a great education, the way learning to swim in cold, choppy water is a great education. A slow machine is brutally honest. It shows you exactly what a program costs, priced in seconds of your actual life. A fast machine quietly pays the bill and lets you go on believing everything is free.

This is how I got from typing cheat codes on someone else's computer (2010, extremely serious business) to building compilers, GPU kernels, and simulated nervous systems. Along the way there's a test I failed twice, a stretch with no computer at all, a year of building things I didn't believe in, and three months where I wrote nothing.

If you draw the path, it zigzags. But squint at it and the same few ideas keep showing up at every stop. Four of them, to be exact, which is either a deep pattern or a sign that I only know four ideas. Possibly both.

So here's the plan. Every time one of those ideas shows up for the first time, I'll write it on an index card. Every time it comes back, I'll point at it. At the end we'll count, and you can decide whether this is a life or a very long loop.

## Someone else's computer

The first computer I remember using wasn't mine, which was the perfect setup: all of the wonder, none of the responsibility.

It was 2010. I was at a friend of a friend's house, and on the screen was Grand Theft Auto: Vice City. At some point he leaned over, typed a random word on the keyboard while the game was running, and this happened:

A car. Out of nowhere. Engine running, ready to drive. I stared at it like it had broken a law of physics, and in a sense, it had.

**His physics, not mine.**

Something rewired in my head that day, because a cheat code leaks a secret about the world you're looking at. **There are two sets of rules.**

There's the surface set, the ones the game shows you: to get a car, go find one (or steal one, like everybody else). And underneath there's the real set, where a car is just an object sitting in the program's memory, and the program can put that object anywhere, anytime, if the right word gets typed.

I didn't have any of that vocabulary. I was a kid watching a car fall out of the sky. But I walked away with a feeling: typing the right words can change a world, and I would like to know more words, please.

Which gets us our first index card.

> **Rule #1: There are two sets of rules.** The ones you are shown, and the ones actually running. Go learn the second set. *(found: 2010, under a falling car)*

### The missing variable

Around the same age, my brain was running a very simple model of how the world works. If you want a thing, and you're smart about getting it, you mostly get it. *Effort plus intelligence equals stuff.*

Then data started showing up that didn't fit. I kept meeting kids who were (and I say this with all the confidence of a child doing peer evaluation) no smarter than me, who had exactly the things I wanted. The difference wasn't effort. The difference was that their families could just buy the things.

Written down, that's obvious. As a kid it's a genuine plot twist. It means your little equation is missing its biggest variable, and nobody at school ever writes that variable on the board.

### The question machine

Meanwhile, at school, I was not what you'd call a good student. I was more of a small, distractible question machine. My main academic activity was pointing at words and asking what they meant.

Once I spotted the word *hyperlink* sitting in a menu in Microsoft Excel, and it bothered me that I was using a program packed with words I couldn't define. So I asked my computer teacher. She told me. That was the whole shape of my early learning:

Then in 2011 a friend accidentally upgraded my operating system.

He showed me that he studied on his own, at home, before anyone had taught the material in class. Until that moment I believed, in my bones, that learning worked like a car: nothing moves until a teacher shows up and turns the key.

So I tried it, and suddenly I had my first good year at school. Strong in English, Hindi, and French. Strong in music (the music teacher treated me like I was better than the rest of the class, and I was in no hurry to correct her). Even good at mathematics, though to be fair that was mostly arithmetic at that point.

I never stopped doing that friend's trick. Almost everything later in this post, the compilers, the GPU kernels, all of it, is just self-study pointed at scarier material.

### Furniture for a room I'd never seen

In 2012 my cousin introduced me to HTML. My setup was extremely professional: his computer, his book, and me hovering nearby writing pages in Notepad++ while he prepared to become a web developer.

I also tried to learn PHP at the same time, which mostly involved not knowing what PHP did. I spent a long, long time trying to install Zend Server, following setup steps toward a destination I couldn't picture at all.

What I didn't know is that this is the normal first phase of learning almost any tool. Phase one is copying the motions in total confusion. The understanding shows up later, uninvited, and explains what your hands were doing the whole time.

### Well water

And copying really was the whole method. I built almost nothing from scratch. I'd find a website I liked, open its source, and steal bits of it. I took templates from sites like W3Layouts and SourceCodester, which I adored, and which loaded at the speed of continental drift.

That's because of how I got online: a Nokia phone, connected to the computer over Bluetooth with Nokia PC Suite, sipping data through its GPRS connection. When the internet arrives that slowly, you stop treating it like air and start treating it like well water.

You go fetch exactly what you need, carry it home, save it, and work offline. And in that world, View Source became my first real textbook, because every web page secretly ships with a complete explanation of how it was made.

(Rule #1 again.) You just have to be willing to read someone else's markup line by line. Which, at GPRS speeds, you have plenty of time to do. (Notice the shape: the page you're shown, and the markup actually running it.)

### The Pentium 4

By 2013 there was a computer at home: a very slow Pentium 4, which was less a tool than a set of terms and conditions. Everything happened on its schedule.

I played Age of Empires II for hours. I played Max Payne and a big pile of old DOS games. I messed with mods for GTA and made little Flash animations. And I downloaded the books I desperately wanted to learn from, big O'Reilly volumes on HTML, CSS, PHP, and JavaScript, and then sat there watching Adobe Reader fail to render their pages.

A book about how to make pages, on a computer that couldn't open pages.

In those years I used the computer the way you use a calculator: switch it on for one purpose, do the thing, switch it off, go live your life. The idea that a person would just be online all day, every day, as a default state of being, hadn't arrived yet.

Opening a heavy program on that machine was a full sensory event. The fan spun up like it was preparing for takeoff. The cursor froze. The disk made frantic little sounds. *You could hear software load.*

Now think about what two different kids learn from two different machines:

|  | A kid with a fast computer | A kid with a slow computer |
| --- | --- | --- |
| Clicks an icon | Window appears. Magic. | Fan, freeze, disk noises, eventually a window |
| A background updater is | Invisible | A personal enemy |
| A careless megabyte is | Nothing | Seconds of his life he is not getting back |
| Concludes | Programs are free | Every program has a price, paid in waiting |

At the time I didn't experience any of this as a lesson. I experienced it as: this computer is bad and I would like a better one. But it installed something that's still running in me today, like a tiny background process of my own.

I think of him as the Accountant.

Before I ask what a piece of software does, the Accountant asks what it costs to run. Most people almost never need that question, because their machines pay the bill silently. On a Pentium 4, you ask it every single day, out loud, at the screen.

> **Rule #2: Everything sends a bill.** Every program costs something. Fast machines pay it quietly. Slow machines read it out loud. *(found: 2013, on a Pentium 4)*

## The test

In 2014 I joined an institute about two kilometres from home.

Two kilometres is nothing to me now. I walk it without thinking. Back then it was officially The Far Away Place, the farthest I'd ever been allowed to go on my own. Going there meant that, for the first time, my own safety outside the house was my job.

The reason that year worked was the teacher. He did something sneaky: instead of just pouring information into me, he installed habits. Take notes like you're thinking on paper. Prepare every topic as if someone is about to cross-examine you on it.

So I started setting question papers for myself, and I took it seriously. That habit matters more than it sounds.

When you write a question, you're forced to find the exact spot where a topic can be misunderstood: the trapdoor. When you answer one, you only have to find a path through. Same topic, opposite ends, and the writer's end teaches you more.

### The shoes

In 2015 I started coaching classes with the energy of a person about to take over the world.

I would love to report that the world-taking went well.

**It did not.**

The first couple of months were fine, and then the enjoyment drained out. I was socially anxious around the other students, and tired in a way sleep didn't fix, because the commute was a daily expedition: miles on foot in hot summer heat to get there, and miles back.

I still spent my time around the teachers, asking them things, partly because I had questions and partly because teachers were easier to be around. My school physics teacher was superb, and watching him taught me something I only had words for much later: **clear communication and stubborn optimism from a teacher can change the list of things a student believes he's allowed to attempt.**

I hated chemistry. I want that on the record. I hated it with everything I had.

But I loved solving problems. Mathematics, which was hard for me, got whole weeks of my life, just practising questions and basically nothing else. The focus reached levels where I sometimes forgot to comb my hair, and at least once I arrived having forgotten my shoes.

I present the shoes as a data point. Draw your own graph. Actually, here, I'll draw it:

### A room with a guest list

So why would a kid pour himself into subjects like that? The obvious answer is ambition, and ambition is real. But it's only half the story.

The other half: **subjects were the one place where the rules stayed put.** Physics didn't care where I was from. A mathematics problem didn't quietly recalibrate itself based on my accent or my name. A chess problem gave back exactly the attention I put into it. No more, no less.

Out in the human world, the rules seemed to change depending on who you were, which is a confusing and exhausting way to live. Inside a subject: same rules, every day, for everyone.

So I spent more and more time inside my own head. From the outside it probably looked like a boy who really liked learning, and that was true. It was also the one room where I got to control the guest list.

### Leaving inward

There's a trick you learn when you're in a situation you can't physically leave. You leave in the other direction.

**Inward.**

Your eyes stay open. Your mouth still produces answers when spoken to. But the part of you that pays attention moves to a quieter neighbourhood, and whatever is happening to you arrives late and muffled, like news about somebody else.

I got good at this trick. Then I got so good at it that I stopped noticing I was doing it, the way you stop noticing you're breathing. Years later I'd catch myself watching my own life like a film about a stranger: fully aware of the plot, weirdly unable to feel any of it.

And there's a second piece of kid logic that pairs with this one. When a child is hurting and nobody explains why, the child writes his own explanation, and it almost always points at himself.

That sounds like a bug. It's actually a strategy. Look at the two theories a kid has available:

Self-blame is the only theory that comes with a to-do list. Blaming yourself hurts. It also hands you instructions.

**That's why I carried it around for so long.**

### The Door

And then there was the test.

I won't name it, because you already know the genre: the one examination everyone around you describes as The Door, the single entrance into a completely different life. I believed them. My family believed them. Money that couldn't easily be spared got spent. Years went in.

And I failed it.

**Twice.**

The subjects I loved didn't ride in and save me, and looking back, the reason is almost funny in its simplicity:

Loving a subject, and performing in it on one fixed morning, in one fixed format, under one fixed clock, are two different skills. The test only ever measured the second one. Nobody had mentioned that.

For a while after the second failure I considered not continuing at all, and I mean that in the largest sense.

I stayed.

If you want a single dramatic reason, there isn't one, and I've stopped being embarrassed about that. Part of it was stubbornness. Part of it was a plain, animal curiosity about what happens next.

**At that age, it turns out, that was enough.**

### A guess wearing a suit

Here's the conclusion I eventually crawled to, slowly, over years. The test was making a much bigger claim than any test can honestly make. It wasn't just reporting a score. It was issuing a verdict on what a person was worth attempting.

A test can measure how well someone takes that test, on that day, in that format. Everything past that is inference, and in my case it was a lousy inference wearing a suit.

So the question became: if that measurement is broken, what would a better one look like? The answer I landed on was almost embarrassingly direct. **Make actual things. Put them in front of strangers.** Let the strangers judge the thing in front of them, which they will, because they know nothing about your numbers.

I stopped waiting to be measured correctly by the official measuring machine, and started producing evidence of a different kind. The first pieces were small enough to be embarrassing.

Good. Small and real beats large and hypothetical, every time.

> **Rule #3: Check the claim.** A measurement can only claim what it measured. Small, real evidence beats large, hypothetical promises. *(found: 2016, after the test)*

## Programming on a phone

The next part of the plan had a small logistical problem: I wanted to program, and I didn't have a computer.

What I had was a phone.

**So, phone it was.**

This turns out to be a great way to find out which parts of programming are essential and which parts are furniture.

In 2017 I started writing Telegram bots on that phone. The first one replied to messages with random quotes. It took about an hour to build, and it shipped through a state-of-the-art pipeline:

SSH from the phone into a $5 server. Type `python bot.py`. Press enter. That was the entire DevOps department.

Now, a bot is a funny kind of program, because its whole job is to keep existing after you stop paying attention to it. You put the phone down, you go to sleep, and the bot is supposed to sit there being a bot.

Lovely idea. Right up until reality gets involved, because **processes die**.

Mine died at 3am. From timeouts. From garbage input sent by creative strangers. From running out of memory. And every time, there I was, half asleep, fixing production code on the same tiny screen I'd written it on.

Do that enough times and the question you're asking starts to mutate.

My answer was to move everything important out of the process. The queue of work, the cache, the log of what already happened: all of it lives on disk, outside any single run.

Now when the process dies at 3am, the damage report says: restart it. The new process wakes up, reads the log to find out where its predecessor dropped everything, picks the work back up, and nobody loses a night of messages.

**The process became replaceable. The state became the thing you protect.**

> **Rule #4: Processes die. Protect the state.** Assume the thing will crash. Keep what matters outside it, so the next run picks up where this one fell. *(found: 2017, 3am, on a phone)*

I didn't know it then, but that 3am lesson was going to follow me for years. Keep an eye on this card. It comes back near the end of the post wearing much fancier clothes.

## Four gigabytes

Later I got a ThinkPad E480 with 4 GB of RAM. I want to do the math out loud, because the math is the whole story.

If the operating system eats about 2 GB just sitting there existing, that leaves roughly 2 GB for the browser, the editor, and whatever you're actually trying to build.

(Rule #2 again.) So I moved to Linux. People assume that kind of switch is about philosophy or taste. Mine was about arithmetic. I needed those gigabytes back, and Linux was willing to negotiate.

Here's something I've come to believe: necessity is a much stricter teacher than curiosity.

I cycled through one Linux distribution after another. I stripped out services I didn't need, then sat watching memory numbers in a terminal like a day trader, checking what each removal bought me.

Somewhere in there I learned how an operating system is actually put together, using my favourite method: take pieces out and see what complains.

I also switched to a tiling window manager, and my whole screen became exactly three panes: the file I was editing, the test output, and my notes.

> *What's a tiling window manager?* It arranges windows so they never overlap. Each new window takes a share of the screen and the others shrink to make room. You stop dragging windows around and start deciding how many things you're looking at.

That sounds like a preference. It worked like a discipline. Three panes meant three things in my head at a time. If a change couldn't fit into three panes, that was the machine gently informing me I was doing two jobs at once, and doing both of them worse.

So the ThinkPad's big lesson was about invitations. Every tool you install is a guest you invite onto the machine, and in software, guests are easy to invite and remarkably hard to evict. Each one wants a little memory, a little screen, a little of your attention. Forever.

On a machine with memory to burn, you never notice the guests piling up. On 4 GB, you notice every single one, by name, because they're all standing in your kitchen.

## Search before it had a name

A humbling, useful discovery from this period: a Linux laptop and a $5 server are, together, enough for one person to build and run real things, start to finish. No permission slip required.

So for the next few years, that's what I did. A long series of small systems that had to actually work, because real people were on the other end, and real people are undefeated at one particular sport.

In 2018 I rewrote my Python bots in Node.js, and met nested callbacks, a phenomenon I can only describe as architectural quicksand.

Each callback looks innocent when you write it. Sure, put this inside that. And this inside that. Then one day you zoom out and your code is a staircase marching off the right edge of the screen, and your errors are quietly falling through the gaps between the steps, never to be seen again.

Nobody designs that mess on purpose. It accumulates one reasonable decision at a time, which is how most messes in life happen.

### Meaning becomes geography

Between 2019 and 2020, something pulled me sideways into information retrieval, which is the unglamorous name for a beautiful idea: how do you find the thing you *mean* inside a giant pile of things?

I indexed Telegram archives in [discover](https://github.com/Lulzx/discover), built a quiet little book search interface in [shoten](https://github.com/Lulzx/shoten), and started playing with vectors, embeddings, and nearest-neighbour search in [sentence-similarity-search](https://github.com/Lulzx/sentence-similarity-search). This was before the whole industry started calling this stuff AI, so to me it just looked like common sense wearing math.

Here's the idea, and it's genuinely simple:

Your pile of text becomes a map. A question becomes a location on it. The answers are whatever's standing nearby. I never really got over how neat that is.

> *How do you find the nearest point fast?* With a structure called HNSW, for hierarchical navigable small world. It builds a stack of graphs over the points, sparse at the top and dense at the bottom. A search starts at the top and takes long hops toward the query, then drops a layer and takes shorter ones.

Alongside the search experiments I ran automated Telegram deal and price-tracking pipelines, and these came with a specific kind of pressure: real traffic. Real traffic has one defining personality trait. It does not pause politely while you fix things.

(Rule #4 again.) So the phone-era rule came back, this time with actual consequences attached: state lives outside the process, a restart picks up exactly where the last run stopped, and a crash is an inconvenience instead of a small funeral.

## Three quiet months

In 2021 I burned out and wrote nothing for three months.

I wish I had an interesting dispatch from inside those months, some dramatic before and after. Honestly, the most accurate report is: it was quiet, and then I came back clearer.

A full stop does do one useful thing, though. When you slow down gradually, you can drift back into work on pure momentum, like a shopping cart rolling across a parking lot. When you stop completely, the momentum is gone, and to restart you have to pick each thing back up, one at a time, on purpose.

And when you're standing there looking at everything you dropped, you realize some of it can just stay on the floor. It was never yours. You were carrying it because you had never once put everything down.

## The detour

In 2023 I picked up Rust to rewrite my command-line tools.

Rust's reputation for being difficult is earned, but the difficulty has a very specific shape. Most languages are like a friend who says: go ahead, build the thing, we'll figure out the problems when they explode. Rust is a building inspector who lives in your editor and won't let the first version compile until you answer some questions.

Most languages let you discover those answers in production, at 3am, in front of an audience. Rust makes you settle them at your desk, in daylight, like an adult.

Given my history with 3am, I considered this an excellent trade.

### Following the map

Then in 2024 I ran an experiment on myself. For once, I'd do what you're supposed to do: the standard, sensible, everyone-on-the-internet-agrees playbook. On paper, all of it was smart. All of it was where the energy and the money supposedly were.

| The 2024 playbook | Tried it? | Cared? |
| --- | --- | --- |
| Nuxt and Vercel AI wrappers | yes | no |
| Content-repurposing pipelines | yes | no |
| Autonomous agent templates | yes | no |
| DeFi liquidation bots | yes | no |
| Smart-contract bug bounties | yes | the bugs, yes. More on that in a second. |

(The bounties, for the record, ran through [immunefi-cli](https://github.com/Lulzx/immunefi-cli).)

The experiment worked perfectly, in the sense that it produced a very clear result:

**I did not care about any of it.**

That was useful information, the way a failed experiment is useful: it tells you where the treasure is *not* buried.

Gluing heavy JavaScript stacks onto other people's remote APIs felt fragile, because every layer belonged to someone else and could change or vanish at any moment.

And it felt hollow, because on the days it worked, I couldn't point at the screen and say: that part, that part is mine.

The work that did feel real that year came from the opposite direction. Finding an actual replay bug in a protocol meant sitting down with the raw source and checking every invariant myself, line by line, no shortcuts.

(Rule #1 again.) It asked for exactly what keeping a bot alive at 3am had asked for years earlier: you don't get to treat anything as a black box. Not the protocol, not the process, not your own assumptions.

And it hit me that this was what I'd been looking for the whole time. **I want work where I'm expected, required even, to understand all of it.**

Which sounds like a nice preference, until you notice it quietly rules out most of the modern software industry.

## Opening the boxes

So I stopped building wrappers on top of other people's boxes and started doing the opposite: opening them.

You know the boxes I mean. The big, sealed, official pieces of infrastructure everyone treats as finished and slightly sacred, like you're not really supposed to ask what's inside.

I developed one test for any tool that felt bloated or mysterious. **If I threw away all the framework around this thing, how many lines would the actual mechanism take?** Not the product. The mechanism.

The answer, over and over, was: way fewer than I expected. Here's the picture I carry around now:

At the center of most software is a small, bright idea, something genuinely clever that fits on an index card. Around it, like rings around a tree, are years of accumulated everything else: compatibility layers, configuration options, special cases for situations you'll personally never meet.

All of that outer material serves somebody. I'm not saying it shouldn't exist. I'm saying that if your goal is to understand the thing, you're allowed to set the rings aside and look at the center. And the center, very often, fits in a single file you can read in one sitting.

### Compilers

Compilers were the first boxes I pried open, because compilers had the biggest reputation for being magic.

I wrote a C compiler from first principles in [sectorc](https://github.com/Lulzx/sectorc), a Zig implementation of the interaction-calculus runtime in [hvm](https://github.com/Lulzx/hvm), self-hosting compilers for [Arturo](https://github.com/Lulzx/arturo-compiler), [J](https://github.com/Lulzx/tacitj), and [Bend 2](https://github.com/Lulzx/bendc), a tracing JIT for Wren in [WrenJIT](https://github.com/Lulzx/WrenJIT), an array-scheduling operating system in [tacit](https://github.com/Lulzx/tacit), and minimal virtual machines for Erlang's BEAM ([beam.zig](https://github.com/Lulzx/beam.zig)) and TON ([zig-tvm](https://github.com/Lulzx/zig-tvm)).

Yes, that's a lot of boxes. Once you start it's hard to stop. It's bubble wrap for a very specific kind of nerd.

And here's the anticlimactic secret: a compiler looks like magic right up until you write one. Then it looks like a series of translations, each one small and boring enough to check by hand.

### Neural networks

Machine learning got the same treatment, because if anything on Earth wears a bigger magic costume than compilers right now, it's neural networks.

I wrote reverse-mode automatic differentiation on plain NumPy in [nabla](https://github.com/Lulzx/nabla), a neural network in roughly 600 lines of Zig in [nn.zig](https://github.com/Lulzx/nn.zig), and a fast BPE tokenizer core in Rust in [blaze-bpe](https://github.com/Lulzx/blaze-bpe). Strip a neural network down to the studs like that and the mystery evaporates. What's left standing there is:

Multiplication, addition, and the chain rule from calculus, run backwards. That's the whole animal.

### Files

Then I turned to the most boring-sounding category of all, everyday files, which is exactly why it was interesting.

[tinypdf](https://github.com/Lulzx/tinypdf) creates real PDFs in under 400 lines of TypeScript with zero dependencies. [zpdf](https://github.com/Lulzx/zpdf) does zero-copy SIMD text extraction in Zig. [zs3](https://github.com/Lulzx/zs3) is S3 storage with no dependencies, and [walsync](https://github.com/Lulzx/walsync) streams SQLite write-ahead logs across machines.

PDFs! The file format everyone assumes requires a corporation and a subscription. *Under 400 lines.*

### The printer

Then the box-opening habit escaped the computer and got into physical hardware, which is where it stops being a philosophy and starts being a personality trait.

I bought a Brother HL-L2440DW laser printer, looked at its driver situation, and thought: how hard can the actual mechanism be? So I reverse-engineered its compressed 1-bit raster format and wrote a 400-line C program ([brother-hl-l2440dw](https://github.com/Lulzx/brother-hl-l2440dw)) that prints over raw TCP, no Brother driver involved.

Because here's what a printer driver actually is, under all that official-ness: a format. Rows of black and white dots, compressed a particular way, sent down a wire in a particular order. That's it.

(Rule #1 again.) Once you know the format, the driver is a short program one person can write and, more importantly, one person can understand all the way through. A lot of intimidating infrastructure is just a format wearing a suit and hoping you won't ask questions.

The same pattern kept firing. Fighting a dead programmer on an AI-Thinker ESP32-CAM, I wrote self-contained MJPEG streaming firmware ([esp32-cam-web-streamer](https://github.com/Lulzx/esp32-cam-web-streamer)) that serves video straight to any browser on the local network. No cloud account. No app. No phoning a server on another continent just so I can see a camera that's in my own house.

And when I wanted a 3D-printed part to fit an irregular opening on the first print instead of the fourth, I built [reality-fit](https://github.com/Lulzx/reality-fit), which goes from a 10-second webcam scan next to a paper marker to a fitted mesh.

**Small irritations. Small mechanisms. No middlemen.**

Zoom out and every one of these projects started with the same tiny splinter: a tool that wanted more from me than the job required. More dependencies, more accounts, more trust, more megabytes. And every time I actually checked, the job underneath was smaller than the tool wrapped around it.

I don't think that pattern will ever stop being true, which means I have a hobby for life.

## The copy tax

In 2024 I moved my daily work onto Apple Silicon, and it quietly deleted one of the oldest taxes in computing.

Picture the traditional setup. Your CPU and your GPU live in two different houses, each with its own memory. Every time the GPU needs to work on something, the data has to pack a suitcase, cross the street, get processed, and cross back.

That round trip is the copy tax, and for years everyone paid it because that was the geography. Unified memory changes the geography: the CPU and GPU share one pool of RAM. Same house, same fridge. Which means a 14-inch laptop can hold model weights and run work that used to need a rented remote server, and the data never has to travel anywhere.

> *Why the copy matters so much* On a typical desktop the GPU has its own memory, and anything it works on has to be copied there first. For a large model the weights alone can be bigger than that separate memory.

(Rule #2 again.) The Accountant in my head sat straight up, because this is exactly the shape of assumption I was trained to poke. A lot of received wisdom in computing is just old hardware facts that nobody re-checked after the hardware changed. Everyone kept saying certain work needs a cluster.

Needs it *why*, exactly? Because it needed it in 2016?

That's not a law of physics. That's an expired observation.

(Rule #3 again.) So I checked, in the most direct way available: try the forbidden thing and watch what happens.

I built a CUDA compiler and runtime for Apple Silicon GPUs in [cuda-metal](https://github.com/Lulzx/cuda-metal). Metal GPUs don't have hardware double precision, which sounds like a deal-breaker until you emulate it, which I did in [VF64-metal](https://github.com/Lulzx/VF64-metal).

> *How do you fake a double?* Hold one double as the unevaluated sum of two single-precision floats, a high part and a low part, and write arithmetic that carries the rounding error of each operation into the low part. Each double operation costs several float operations, but it runs on hardware with no doubles at all.

Once that door was open, serious scientific software started walking through it: GROMACS ([gromacs-metal](https://github.com/Lulzx/gromacs-metal)), WarpX plasma simulations ([warpx-metal](https://github.com/Lulzx/warpx-metal)), PeleLMeX combustion ([pele-metal](https://github.com/Lulzx/pele-metal)), and Box3D physics ([box3d-metal](https://github.com/Lulzx/box3d-metal)), all running on the M-series GPU inside a laptop.

**A laptop. The cluster turned out to be optional, which nobody had mentioned.**

Language and speech models got the same interrogation. I wrote fused Metal kernels in Zig with no Python and no PyTorch in the loop ([tiny-kernel](https://github.com/Lulzx/tiny-kernel)), ran a 2-bit 27B model locally at 20 tokens per second ([bonsai-mlx](https://github.com/Lulzx/bonsai-mlx)), and then pushed the idea to its extreme: full speech recognition ([phonon-web](https://github.com/Lulzx/phonon-web)) and a language model ([barunlm-35m-browser](https://github.com/Lulzx/barunlm-35m-browser)) running entirely inside the browser, on WebGPU and WebAssembly.

A browser tab. The place where you check the weather is now running a speech recognizer.

And notice how this is the exact photographic negative of the 2024 wrapper year:

|  | The wrapper year | Now |
| --- | --- | --- |
| Where it runs | On someone else's server | On my machine |
| Where the data goes | To their API | Nowhere |
| When their API has a bad Tuesday | It dies | Nothing happens |
| How much of it is mine | Hard to say | All of it |

The copy tax was never just about copies. It was about how much of your own work you actually own.

## Where the work is going

After enough years of opening boxes, my questions changed subjects. It stopped being only about how small a mechanism could be, and started being about what's even worth building mechanisms for.

When I look at what I'm working on now, I see three threads braided together. Let me untangle them.

### Learning that can be checked

Thread one is a suspicion about how learning should work.

The current fashion is brute force: make the model bigger, feed it more internet, spend more money, and out pops something smart-ish that will also, cheerfully and with total confidence, invent a plausible-sounding lie right to your face.

I keep staring at that picture and thinking there has to be a less insane route. So I've been exploring learning through compression, search, and proof instead of scale.

The intuition fits in two sentences. **If a learner is forced to compress what it sees, it can't cheat by memorizing, because memorizing costs too many bits.** To get smaller, it has to find the actual pattern.

> *Scoring a model in bits* Minimum Description Length scores a model by the bits needed to write down the model plus the bits needed to write down the data using that model. A model that memorizes is long. A model that's too simple leaves the data expensive to encode. The shortest total wins.

(Rule #3 again.) And if an answer arrives with a proof attached, something a machine can check, you don't need to trust whoever produced it. Trust gets replaced by checking, and checking scales in a way trust never will.

So, concrete experiments. In [solon](https://github.com/Lulzx/solon) I built a language learner around Minimum Description Length, with no transformer, no gradients, and no backpropagation, to see how far pure compression can walk on its own when data is scarce. In [supsearch](https://github.com/Lulzx/supsearch), [ontogenesis](https://github.com/Lulzx/ontogenesis), and [progen](https://github.com/Lulzx/progen), program synthesis engines solve benchmarks and invent their own reusable lambda-calculus vocabulary without calling a language model at all. It's like watching a mind invent words because it got tired of spelling everything out.

And in [gavel](https://github.com/Lulzx/gavel), reinforcement learning policies are scored by Bend's proof checker instead of a learned reward model. A learned reward model can be gamed, flattered, and fooled. A proof checker can't.

That same obsession with checkable truth runs through [open-magnetar](https://github.com/Lulzx/open-magnetar), a post-quantum RV64I zero-knowledge VM over binary fields that uses only standard hashes, and [claim-wire](https://github.com/Lulzx/claim-wire), an incremental compiler that treats every number in a Markdown document as a typed build target, traceable back to the exact run that produced it.

That last one might be my favourite expression of the whole thread, because think about how weird our current situation is. In a program, every value has a paper trail. In a document, a number can just appear, fully formed, with no parents and no history, and everyone nods.

A number in a document should be exactly as checkable as a function in a program. Anything less is typography asking for trust.

### Biology and physics as programs

Thread two starts with a question that sounds like science fiction and is actually an engineering plan: *what happens if you compile a living thing into code?*

Not metaphorically. Literally take a biological or physical system, turn it into a runnable, differentiable simulation, then treat it the way programmers treat programs. Run it. Inspect it. Change one variable and see what breaks.

The biggest poke so far is [fly-brain](https://github.com/Lulzx/fly-brain): the complete connectome of a fruit fly, all 165,122 neurons and 104 million synapses of it, running as a spiking brain inside a physics-simulated fly body. In a browser.

Sit with that for a second. An entire animal's wiring diagram, alive-ish, in a browser tab. And it lets you ask a question that's easy to state and very hard to answer any other way: how much of what a fly does comes purely from the wiring, and how much needs extra rules that live outside the graph?

You can't ask the fly. Well, you can, but:

The worms got it next. In [worm-sim](https://github.com/Lulzx/worm-sim), [occam-worm](https://github.com/Lulzx/occam-worm), and [molecular-compiler](https://github.com/Lulzx/molecular-compiler), connectomes and molecular profiles of *C. elegans* are compiled into differentiable simulations that hunt for compact local neural update rules: small, simple laws that can predict how real animals, ones the model has never seen, will respond when you intervene.

And the compile-the-world instinct keeps spreading: whole *E. coli* cells ([life-sim](https://github.com/Lulzx/life-sim)), magnetic nozzles and tokamak plasma ([helicon](https://github.com/Lulzx/helicon), [driftmap](https://github.com/Lulzx/driftmap), [plasma-tsu-tomo](https://github.com/Lulzx/plasma-tsu-tomo)), drone swarms navigating without GPS ([skein](https://github.com/Lulzx/skein)), urban microclimates ([urbancool-jax](https://github.com/Lulzx/urbancool-jax)), and the slow death of lithium-ion batteries ([BatteryUDE.jl](https://github.com/Lulzx/BatteryUDE.jl)).

(Rule #1 again.) Different systems, same move: turn it into a program, then interrogate the program. It's the cheat code again, in a lab coat. Underneath the animal you can see, there's a set of rules actually running it.

### Agents inside deterministic walls

Thread three is about autonomous software, and it's basically my 2017 phone lesson coming back for its final form.

I build agent environments ([helium](https://github.com/Lulzx/helium), [carry-terminal](https://github.com/Lulzx/carry-terminal), [mimo-build](https://github.com/Lulzx/mimo-build)), capability sandboxes ([caplock](https://github.com/Lulzx/caplock)), declarative deployment engines ([alchemy-celld](https://github.com/Lulzx/alchemy-celld)), and self-running media and commerce pipelines. Every one of them obeys the same law, adjusted for a new kind of citizen:

**Never let a probabilistic step hold state or custody.**

The thing that improvises doesn't get to be the thing that remembers, and it definitely doesn't get to be the thing that decides. Because here's the realization that ties this whole post in a knot:

A language model is, operationally, a bot process at 3am. It'll usually do the right thing. Sometimes it won't, and you won't be awake when that happens, and it'll be very confident while doing the wrong thing. Which is worse than a crash in some ways, because at least a crash is honest.

So the architecture writes itself: **the model proposes, deterministic code decides.**

Deterministic code owns the log ([memo](https://github.com/Lulzx/memo)), the grammar ([typed-inference](https://github.com/Lulzx/typed-inference)), the permissions, and the verification gate at the door. When the model is wrong, and it will be wrong, the wrongness stops at the gate, the damage stays small, and the log sits there afterward calmly explaining what happened, like a flight recorder that has seen some things.

(Rule #4 again.) Same lesson as the phone. Bigger bot. Higher stakes. Same rule.

## Coming back

At some point in the middle of all this building, I started walking.

I don't mean metaphorically, and I don't mean a lap around the block to clear my head. I mean actual, literal walking: across cities, up mountains, over state lines, mostly alone, for years. The [photographs in the gallery](/gallery/) are the leftovers.

For a long time I told myself I was looking for something specific out there, and maybe I was. But I think I understand it better now. A huge part of the point was the motion itself.

I'd spent a childhood in rooms I couldn't leave. As an adult I apparently needed a large amount of evidence, gathered on foot, town by town, that I could leave any room, any place, whenever I wanted, under my own power, with nobody able to call me back.

Some facts you can be told. This one I had to prove to myself a few hundred times. The walls had stopped being walls, and my feet were the peer review.

Mountains turn out to be excellent company for this, mostly because they want absolutely nothing from you. A mountain doesn't care where you're from. It doesn't care how you did on an exam in 2016. And silence at altitude isn't a prize handed out for good performance. It's just there, for whoever is willing to walk up into it.

(Rule #2 again.) This was genuinely new information for my nervous system. I'd mostly known good things as conditional things, rewards at the end of a measurement. Out there I learned that some good things are unconditional, for the dumbest and most beautiful reason possible: nobody is in charge of distributing them.

### Empty, or away

In certain places, with certain plants, I also got brief, strange access to the part of myself that had learned to leave the room from the inside. The doors I'd built years earlier for protection, back in Part 2, opened a little, and I finally got to look at what had been behind them the whole time.

I'd always assumed it was something broken, some damaged machinery I'd need to apologize for.

**It wasn't.**

Behind the doors was someone mostly intact, who had simply been waiting a very long time.

That gave me a distinction I think about constantly: **I had not been empty. I had been away.** From the outside the two look identical. They're completely different problems with completely different solutions, and confusing them had quietly cost me years.

(Rule #4 again.) And if you've been keeping track of the index cards, you might notice something. For years I ran like a process that kept going away and coming back. Through all of it, the state behind the doors was intact. It had been sitting there the whole time, waiting for someone to come back and read the log.

### No montage

Feeling has been coming back since then, and I want to describe the pace honestly, because this is the part of stories like this that usually gets a montage.

**There is no montage.**

It's slow, and it's unreliable. Some days I still watch my own life from a slight distance, like the film is playing in the next room. Other days something completely ordinary, a meal, a road, a person laughing at something stupid, lands at full volume, and I notice I'm actually here for it. The noticing itself feels brand new.

Someone loves me now, which my older internal software has strong opinions about. The part of me that concluded long ago that I was unlovable is very old, very confident, and updates its beliefs approximately never.

**But she stays. And she stays.**

And evidence has this annoying property where it accumulates even in brains that are actively resisting it. So I've started handling that old conclusion the way I handle any other claim in my work:

**Show me the data.**

(Rule #3 again.) It was drawn from a tiny sample, by a child, under terrible conditions. In any other context I would have thrown out a result like that years ago. It should never have been carried this far without being checked.

### The same story

Here's where the two halves of this post turn out to be one story.

I spent years building ways out. Out of rooms. Out of a test's verdict. Out of other people's software. Out of other people's definitions of what my work was supposed to be.

Building a way back in, into my own life, on purpose, at full volume, is harder than any of those projects, mostly for one annoying reason: I can't do it from behind glass. There's no View Source for this one.

But the good news, and I do think it's good news, is that the method transfers. Here are all four cards again, pointed at the last project:

- **Rule #1: There are two sets of rules.** Learn its actual rules, not the ones you were handed. (showed up 5 times)
- **Rule #2: Everything sends a bill.** Start with whatever machine is in front of you, however slow it is. (showed up 4 times)
- **Rule #3: Check the claim.** Make something small and real, and let it be judged. (showed up 4 times)
- **Rule #4: Processes die. Protect the state.** Then make the next thing, picking up where the last one stopped. (showed up 4 times)

That method got a kid with a GPRS connection and a borrowed computer all the way to simulated nervous systems. I have time to learn this one the same way.

And I am, at this point, extremely good at building. When you zoom all the way out, this is just one more thing being built.

One last piece of bookkeeping. I opened this site's repository in September 2017 with the description "My website to tell my story," which, credit where due, was accurate advertising from a guy whose entire deployment pipeline at the time was typing `python bot.py` on a phone. The machines got faster. The problems moved from cheat codes and copied HTML all the way to compilers, GPU kernels, and whole-brain connectomes. But the bias stayed exactly where a slow Pentium 4 installed it sometime around 2013: keep the footprint small, read the source, and own the whole stack, from the bytes up.
