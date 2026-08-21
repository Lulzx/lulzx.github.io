# The M1 broke my assumptions

In 2024 I started porting ML models to Apple Silicon using MLX-Swift. I expected it to be a compromise. Run models locally, sure, but slowly.

It wasn't slow.

## One pool of RAM

Unified memory is the whole trick. The GPU and the CPU share the same RAM. On the old cloud box every tensor had a trip. Write it on the host. Copy it over the bus. Compute. Copy it back. The copies were the day.

On the laptop there is nothing to copy. The weights sit in memory. The GPU reads them. The CPU can touch the same bytes. The KV cache grows in the same pool. MLX-Swift is built for that layout. You do not stage a buffer for a device that already shares the room. You just use it.

A 14-inch laptop running inference faster than my old cloud GPU setup. I kept waiting for the catch. The catch is capacity, not speed. The model has to fit. If it fits, the machine is already working.

## Decode is a shuffle

Generating a token is cheap math and an expensive walk through the weights. You load the whole model to write one word, then you do it again. The math finishes. The walk does not. That is why a small draft helps.

I ported speculative decoding first. A small network guesses a handful of tokens. The big model checks them in one pass instead of one pass per token. Same answer. Fewer walks. On a machine where the walk is the tax, that is the gain.

Then a reasoning model. Then an OCR pipeline. Each time I expected to hit a wall. Each time the wall was not there. Memory was the wall, when it showed up. A model that does not fit does not get faster with a better kernel. It just spills, or it refuses.

## The data stays here

The models run locally. No API calls. No waiting on a queue in another country. No sending a private page, a photo, a chunk of mail to a box I do not hold the keys for.

That changed what I was willing to run. OCR on a document I would not upload. A reasoning pass on notes that are not public. A draft of text that is still mine. The laptop is fast enough that I stopped making the trade I used to make: send it away, get the answer, hope the log is quiet. The only network the job needs is the one that fetched the weights once.

I had a sentence I repeated for years. Real ML needs a data center. I was measuring the wrong thing. I needed hardware that could hold the weights and software that knew the memory was shared. The 14-inch machine had both. I just had to stop shipping the work out of the room.
