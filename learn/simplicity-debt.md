# Complexity is debt

Every abstraction is a loan. I borrow a little simplicity now and pay complexity later. The payment is the extra name, the extra file, the extra hop through a function that only exists to hide the hop. I pay it every time I come back to the code, and every time someone else has to learn the map before they can change a line.

Sometimes the loan is worth it. A well-placed layer saves hours of copy-paste and keeps one rule in one place. Most of the ones I have added were early. I could already see four implementations. I built the factory first. I ended up with one. Now everyone has to understand the factory to reach the one thing that actually runs.

## What I count

I count abstractions the way I count dependencies. Each one has to justify staying. A dependency can sit unused in a lockfile and I will still feel it on upgrade day. An extra type, an extra interface, an extra manager class does the same thing to my head. If I cannot explain why this layer exists in one sentence, I flatten it.

The sentence has to name a job, not a hope. "This wraps the HTTP client so retries live in one place" is a job. "This will make it easy when we add more providers" is a hope. Hopes do not get a file.

## How a layer goes bad

The usual path is quiet. I see two similar blocks. I extract them and give the extract a name. The code looks cleaner. Time passes. A new case is almost the same. I feel I should keep the shared thing, so I add a flag. Then a second flag. Then a branch that only one caller takes. What used to be one idea is now a procedure that does slightly different things depending on who called it.

The existing code argues that it is necessary. It took time to write. It has tests. It has a name. The pressure is to add one more parameter and get on with the day. That is how I have grown functions I can no longer hold in my head. The callers still look tidy. The mess moved inside, where it compounds.

A useful check: if I am threading booleans through a shared function so each caller can get a slightly different path, the shared function is already the wrong shape. The sameness was visual. The jobs were different.

## Duplication I will live with

Three lines of duplicated code is better than one abstraction nobody understands. I can read three lines. I can change one copy without breaking the other. I can always abstract later, once I have seen the third copy and know which parts actually move together.

Two similar blocks are not always the same idea. One wants a display string. The other wants a filename. They can look alike for a week and still be different jobs. Leaving them duplicated is cheaper than teaching a helper to be both.

I wait. The first time I just write it. The second time I wince and leave it. The third time I look at all three and only then decide if they share a name. If I cannot find a name that does not include "and", I leave the copies. A name I cannot say is a layer I should not add.

## Walking it back

Un-abstracting is the part I used to skip. You cannot easily un-abstract if you wait until the layer has ten callers and a pile of flags. When I notice the flags, I paste the body back into each caller, delete the branches that caller never took, and look at what is left. Often the shared function was running different code for each site. After the inline, the next extract is obvious, or there is nothing to extract.

That feels like throwing work away. It is how I stop paying interest on a loan I should not have taken. I would rather have three honest copies than one clever name that lies about what happens next.
