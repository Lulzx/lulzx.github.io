# Story

Most of what I believe about software I learned on machines that were too small for it. A small machine shows you what a program costs. A big one lets you forget.

This is how I got from a slow Pentium 4 to compilers, GPU kernels, and simulated nervous systems. It was less of a straight line than that sentence suggests. There was a stretch with no computer, a year of building things I didn't believe in, and three months where I wrote nothing. But the same few ideas kept coming back, and they showed up first on the smallest hardware.

## A slow computer

The first computer I grew up with was a very slow Pentium 4. Opening a heavy program meant listening to the fan spin up and watching the cursor stall while the disk thrashed. You could hear software load.

A kid with a fast computer learns that programs are free. You click, and a window appears. A kid with a slow one learns that every program has a price, and that you pay it in seconds of waiting. Every extra process, every background updater, and every careless megabyte showed up as time I didn't get back.

I didn't think of that as a lesson at the time. I thought the computer was bad. But it left a habit I still have. Before I ask what a piece of software does, I ask what it costs to run. Most people rarely need to ask that question. On a machine like that one, you ask it every day.

## Programming on a phone

For a while after that I didn't have a computer at all. When you want to program and you don't have a computer, you find out what you can do with what you have. I had a phone.

In 2017 I started writing Telegram bots on it. The first one replied to messages with random quotes and took about an hour to put together. I deployed it from the phone by SSH-ing into a $5 server and typing `python bot.py`. That was the whole deployment pipeline.

A bot on a server keeps running after you put the phone down. That is the point of it, and it is also where the trouble starts, because processes die. Mine died at 3am from timeouts, from garbage input, and from running out of memory. I fixed them on the same small screen I wrote them on.

Do that enough times and the question changes. At first you ask how to keep the process alive. Eventually you ask what should happen when it dies, and that turns out to be the more useful question. My answer was to keep the queue, the cache, and the log outside any single run. Then a crash costs a restart. The new process reads where the old one stopped and picks the work back up, and nobody loses a night of messages.

I've been relearning that rule at larger scales ever since. It shows up again at the end of this story, attached to software much bigger than a quote bot.

## Four gigabytes

Later I got a ThinkPad E480 with 4 GB of RAM. If the operating system ate two gigabytes at idle, that left two for the browser, the editor, and whatever I was trying to build. So I moved to Linux. The choice came from arithmetic more than taste.

Necessity is a stricter teacher than curiosity, because it doesn't let you stop when you get bored. I went through one Linux distribution after another. I stripped out services I didn't need and watched memory numbers in a terminal to see what each change bought me. I learned how an operating system is put together by taking pieces of one out.

I also switched to a tiling window manager.[^1] Mine held three panes: the file I was editing, the test output, and my notes. The layout turned into a discipline. If a change couldn't fit in three panes, I was probably doing two jobs at once.

What the ThinkPad taught me was to check what a tool costs before inviting it onto the machine. Tools are easy to install and hard to evict. Each one wants a little memory and a little of the screen, and on 4 GB you notice every one of them.

## Search before it had a name

A Linux laptop and a $5 server turn out to be enough to build things one person can run end to end. I spent the next few years doing that.

In 2018 I rewrote my Python bots in Node.js and learned what nested callbacks do to a codebase. Each callback looks harmless when you write it. Then you look up and the code is a staircase heading off the right edge of the screen, and errors fall through the gaps between the steps.

Between 2019 and 2020 I got pulled into information retrieval. I indexed Telegram archives in [discover](https://github.com/Lulzx/discover), built a quiet book search interface in [shoten](https://github.com/Lulzx/shoten), and experimented with vectors, embeddings, and HNSW nearest-neighbor search[^2] in [sentence-similarity-search](https://github.com/Lulzx/sentence-similarity-search). This was before the rest of the industry started calling that kind of work AI. To me it looked like the obvious way to find things. Turn each piece of text into a point. When someone asks a question, turn the question into a point too, and look for its nearest neighbors.

Alongside the search tools I built automated Telegram deal and price-tracking pipelines that had to stay up under real traffic. Real traffic keeps arriving while you're fixing things. So the rule from the phone came back with more weight behind it. State lived outside the process, and a restart picked up where the last run stopped.

## Three quiet months

In 2021 I burned out and wrote nothing for three months.

There isn't much to report from inside those months. What I can say is that I came back clearer.

A gap like that does one useful thing. When you stop completely, you can't drift back into work on momentum. You have to pick each thing up again on purpose, and some things you leave where they fell.

## The detour

In 2023 I picked up Rust to rewrite my command-line tools. Rust has a reputation for being hard, and the hardness has a specific shape. Before the first happy path would build, the compiler made me name the owner of each value, the error each call could return, and how long each reference lived. Most languages let you discover those things in production. Rust makes you settle them at your desk. After years of fixing bots at 3am, that seemed like a good trade.

Then in 2024 I tried doing what you're supposed to do. I tested the standard startup and agency playbook: Nuxt and Vercel AI wrappers, content-repurposing pipelines, autonomous agent templates, DeFi liquidation bots, and smart-contract bug bounties with [immunefi-cli](https://github.com/Lulzx/immunefi-cli).

It was useful in the way a failed experiment is useful. It showed me what I cared about by showing me what I didn't. Gluing heavy JavaScript stacks onto remote APIs felt fragile and hollow. Fragile, because every layer belonged to someone else and could change under me. Hollow, because when it worked I couldn't point to the part that was mine.

The work that felt real that year was the other kind. Finding a real replay bug in a protocol meant reading the raw source and checking every invariant myself. Keeping a bot alive at 3am had asked the same of me years earlier. Neither lets you treat anything as a black box, and that turned out to be what I liked. I want work where I'm expected to understand all of it.

## Opening the boxes

Once I stopped writing wrappers, I started opening the boxes I'd been told to treat as finished infrastructure. I used one test. Whenever a tool felt bloated or opaque, I asked how many lines the actual mechanism would take if I threw away the framework around it.

The answer was usually far fewer than I expected. The core idea of most software is small. What makes it big is everything that grows around the idea: compatibility layers, configuration, options for cases you'll never hit. Those are real needs for somebody. But if you want to understand the thing, you can set them aside, and what's left often fits in one file.

Compilers were the first boxes I opened. I wrote a C compiler from first principles in [sectorc](https://github.com/Lulzx/sectorc), a Zig implementation of the interaction-calculus runtime in [hvm](https://github.com/Lulzx/hvm), self-hosting compilers for [Arturo](https://github.com/Lulzx/arturo-compiler), [J](https://github.com/Lulzx/tacitj), and [Bend 2](https://github.com/Lulzx/bendc), a tracing JIT for Wren in [WrenJIT](https://github.com/Lulzx/WrenJIT), an array-scheduling operating system in [tacit](https://github.com/Lulzx/tacit), and minimal virtual machines for Erlang's BEAM ([beam.zig](https://github.com/Lulzx/beam.zig)) and TON ([zig-tvm](https://github.com/Lulzx/zig-tvm)).

A compiler looks like magic until you write one. Then it looks like a series of translations, each simple enough to check by hand.

Machine learning got the same treatment. I wrote reverse-mode automatic differentiation on plain NumPy in [nabla](https://github.com/Lulzx/nabla), a neural network in roughly 600 lines of Zig in [nn.zig](https://github.com/Lulzx/nn.zig), and a fast BPE tokenizer core in Rust in [blaze-bpe](https://github.com/Lulzx/blaze-bpe). Strip a neural network down that far and the mystery goes away. What's left is multiplication, addition, and the chain rule run backwards.

Everyday files were next. [tinypdf](https://github.com/Lulzx/tinypdf) creates real PDFs in under 400 lines of TypeScript with zero dependencies. [zpdf](https://github.com/Lulzx/zpdf) does zero-copy SIMD text extraction in Zig. [zs3](https://github.com/Lulzx/zs3) is S3 storage with no dependencies, and [walsync](https://github.com/Lulzx/walsync) streams SQLite write-ahead logs across machines.

Then hardware. When I bought a Brother HL-L2440DW laser printer, I reverse-engineered its compressed 1-bit raster format and wrote a 400-line C program ([brother-hl-l2440dw](https://github.com/Lulzx/brother-hl-l2440dw)) that prints over raw TCP without Brother's driver.

A printer driver feels like part of the furniture. Underneath it there's a format: rows of black and white dots, compressed and sent down a socket. Once you know the format, the driver is a short program.

When I fought a dead programmer on an AI-Thinker ESP32-CAM, I wrote self-contained MJPEG streaming firmware ([esp32-cam-web-streamer](https://github.com/Lulzx/esp32-cam-web-streamer)) that serves video straight to any browser on the local network, with no cloud account. When I wanted a 3D-printed part to fit an irregular opening on the first print, I built [reality-fit](https://github.com/Lulzx/reality-fit). It goes from a 10-second webcam scan next to a paper marker to a fitted mesh.

Every one of these started with the same small irritation: a tool that wanted more from me than the job required. And every time, the job turned out to be smaller than the tool.

## The copy tax

In 2024 I moved my daily work onto Apple Silicon. On my old setups every GPU workload paid a copy tax. Data crossed the bus to the GPU, got processed, and crossed back. Unified memory means the CPU and GPU share one pool of RAM,[^3] so a 14-inch laptop could hold model weights and run passes that used to require a remote server.

The reflex from the 4 GB ThinkPad came right back. People assume certain work needs a cluster. Often that assumption is an old hardware fact nobody went back to check.

So I checked. I built a CUDA compiler and runtime for Apple Silicon GPUs in [cuda-metal](https://github.com/Lulzx/cuda-metal). Metal GPUs lack hardware double precision, so I emulated it in [VF64-metal](https://github.com/Lulzx/VF64-metal).[^4] That opened the door to scientific solvers: GROMACS ([gromacs-metal](https://github.com/Lulzx/gromacs-metal)), WarpX plasma simulations ([warpx-metal](https://github.com/Lulzx/warpx-metal)), PeleLMeX combustion ([pele-metal](https://github.com/Lulzx/pele-metal)), and Box3D physics ([box3d-metal](https://github.com/Lulzx/box3d-metal)), all on the M-series GPU.

For language and speech models, I wrote fused Metal kernels in Zig with no Python or PyTorch ([tiny-kernel](https://github.com/Lulzx/tiny-kernel)), ran a 2-bit 27B model locally at 20 tokens per second ([bonsai-mlx](https://github.com/Lulzx/bonsai-mlx)), and pushed full speech recognition ([phonon-web](https://github.com/Lulzx/phonon-web)) and a language model ([barunlm-35m-browser](https://github.com/Lulzx/barunlm-35m-browser)) entirely into the browser over WebGPU and WebAssembly.

A speech recognizer in a browser tab is the inverse of the wrappers from 2024. The audio stays on the machine, and nothing depends on someone else's server staying up.

## Where the work is going

After rebuilding compilers, virtual machines, and GPU kernels, the questions I care about shifted. Three threads run through almost everything I'm building now.

### Learning that can be checked

The first is learning through compression, search, and proof instead of brute-force scale. Scaling a transformer is expensive, and an unverified model will cheerfully invent a plausible lie. Those two problems point the same way. A learner that has to compress what it sees has to find the pattern, because memorizing costs too many bits.[^5] And an answer that comes with something a machine can check doesn't need you to trust whoever produced it.

In [solon](https://github.com/Lulzx/solon), I built a language learner around Minimum Description Length with no transformer, no gradients, and no backpropagation, to test how far pure compression goes when data is scarce. In [supsearch](https://github.com/Lulzx/supsearch), [ontogenesis](https://github.com/Lulzx/ontogenesis), and [progen](https://github.com/Lulzx/progen), program synthesis engines solve benchmarks and invent reusable lambda-calculus vocabulary without calling a language model. In [gavel](https://github.com/Lulzx/gavel), reinforcement learning policies are scored by Bend's proof checker rather than by a learned reward model that can be gamed.

The same insistence on machine-checked truth runs through [open-magnetar](https://github.com/Lulzx/open-magnetar), a post-quantum RV64I zero-knowledge VM over binary fields that uses only standard hashes, and [claim-wire](https://github.com/Lulzx/claim-wire), an incremental compiler that treats every number in a Markdown document as a typed build target traceable to the run that produced it. A number in a document should be as checkable as a function in a program.

### Biology and physics as programs

The second thread is compiling living and physical systems into runnable, differentiable code. Once you have a fast simulator and exact gradients, you can treat biology and physics like programs. You can run them, inspect them, and change one thing to see what happens.

In [fly-brain](https://github.com/Lulzx/fly-brain), the complete connectome of a fruit fly, 165,122 neurons and 104 million synapses, runs as a spiking brain inside a physics-simulated body in the browser. The question it asks is easy to state. Which behaviours come from the wiring diagram alone, and which need rules from outside the graph?

In [worm-sim](https://github.com/Lulzx/worm-sim), [occam-worm](https://github.com/Lulzx/occam-worm), and [molecular-compiler](https://github.com/Lulzx/molecular-compiler), connectomes and molecular profiles of *C. elegans* are compiled into differentiable simulations to search for compact local neural update rules that predict causal responses in animals the model hasn't seen. The same first-principles simulation work extends to whole *E. coli* cells ([life-sim](https://github.com/Lulzx/life-sim)), magnetic nozzles and tokamak plasma ([helicon](https://github.com/Lulzx/helicon), [driftmap](https://github.com/Lulzx/driftmap), [plasma-tsu-tomo](https://github.com/Lulzx/plasma-tsu-tomo)), GPS-denied drone swarms ([skein](https://github.com/Lulzx/skein)), urban microclimates ([urbancool-jax](https://github.com/Lulzx/urbancool-jax)), and lithium-ion battery degradation ([BatteryUDE.jl](https://github.com/Lulzx/BatteryUDE.jl)).

### Agents inside deterministic walls

The third thread is autonomous software guarded by hard deterministic boundaries. I build agent environments ([helium](https://github.com/Lulzx/helium), [carry-terminal](https://github.com/Lulzx/carry-terminal), [mimo-build](https://github.com/Lulzx/mimo-build)), capability sandboxes ([caplock](https://github.com/Lulzx/caplock)), declarative deployment engines ([alchemy-celld](https://github.com/Lulzx/alchemy-celld)), and self-running media and commerce pipelines. They all follow the rule I learned on my phone in 2017, adjusted for a new kind of process: never let a probabilistic step hold state or custody.

A language model has a lot in common with a bot process at 3am. It will usually do the right thing. Sometimes it won't, and you won't be awake when that happens. So the model proposes and deterministic code decides. Deterministic code owns the log ([memo](https://github.com/Lulzx/memo)), the grammar ([typed-inference](https://github.com/Lulzx/typed-inference)), the permissions, and the verification gate. When the model is wrong, the damage stops at the gate, and the log still says exactly what happened.

I opened this site's repository in September 2017 with the description "My website to tell my story." The machines got faster since then. The problems moved from quote bots on a phone screen to compilers, GPU kernels, and whole-brain connectomes. The bias stayed where the Pentium 4 put it: keep the footprint small, read the source, and own the stack from the bytes up.

## Notes

[^1]: A tiling window manager arranges windows so they never overlap. Each new window takes a share of the screen and the others shrink to make room. You stop dragging windows around and start deciding how many things you're looking at.

[^2]: HNSW stands for hierarchical navigable small world. It builds a stack of graphs over the points, sparse at the top and dense at the bottom. A search starts at the top and takes long hops toward the query, then drops a layer and takes shorter ones.

[^3]: On a typical desktop the GPU has its own memory, and anything it works on has to be copied there first. For a large model the weights alone can be bigger than that separate memory.

[^4]: The trick is to hold one double as the unevaluated sum of two single-precision floats, a high part and a low part, and to write arithmetic that carries the rounding error of each operation into the low part. Each double operation costs several float operations, but it runs on hardware with no doubles at all.

[^5]: Minimum Description Length scores a model by the bits needed to write down the model plus the bits needed to write down the data using that model. A model that memorizes is long. A model that's too simple leaves the data expensive to encode. The shortest total wins.
