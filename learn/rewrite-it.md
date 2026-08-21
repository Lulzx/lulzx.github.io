# The second version

I rewrite things a lot. Not because the first version is bad. Because I understand the problem now.

The first time you build something, you're learning the domain. You make wrong abstractions. You over-engineer some parts and under-engineer others. You can't know the right design until you've built the wrong one.

The rewrite starts informed. I already paid for the wrong map.

## Three versions

I rewrote my search engine three times. Version one: Python, slow, wrong data structures. I was discovering what a query even was, what I needed to store, what I could throw away. The code grew the shape of that confusion. Version two: Node.js, faster, better architecture, still wrong in subtle ways. I had the nouns right and the memory wrong. Version three: Rust, correct, fast, half the code of version one. The half is the point. I deleted the machinery I had invented to paper over the first two mistakes.

Each pass I could name what the last one got wrong. Wrong structure. Wrong runtime. Wrong amount of code. If I had not been able to name it, I would have been rewriting for a mood. A mood is how you get a fourth version that is just the third with new names.

## When I don't

Ugly is not a reason. Ugly is often a scar. A weird branch, a defensive copy, a check that looks paranoid. Those lines were paid for by a failure I have already forgotten. If I throw the file away because I cannot stand to read it, I throw the failures away too. I will meet them again, in the same order, with more confidence and less memory.

I also don't rewrite when I can move one seam. A slow function can become a faster function. A tangled module can grow an interface and shrink behind it. The rest of the program keeps running. Users keep their habits. I keep the tests that already know the old promises. A full rewrite pauses all of that. I am now estimating a product I already shipped, and I will be wrong about the corners.

The check I use: is the current shape a ceiling, or is it a mess on top of a shape that still works. Wrong data structures were a ceiling. I could not make the Python engine honest by renaming files. A messy folder is not a ceiling. A messy folder is a week of moving things with the lights on.

## What I keep

I keep the cases. The queries that failed. The files that timed out. The input I did not think was legal. Those go in a list next to the new code. If the new engine cannot eat the old list, it is not finished. Speed and taste do not count until the old promises hold.

Cutover is a measurement, not a birthday. If I cannot say what better means in a number or a failing test, I am about to ship a story. The old engine earned its keep. The new one has to beat it at the same job.

I do not dump every lesson in as a feature. The second version wants to be complete. Complete is how it gets larger than the first while claiming to be wiser. I only carry the constraints I can still feel. The rest can wait until they hurt again.

Don't rewrite for fun. Rewrite when you can name what the first version got wrong, and the new one is smaller because of it. That is the software I trust. I had to build the other kind to get there.
