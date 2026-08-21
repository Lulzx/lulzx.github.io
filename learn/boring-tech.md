# Pick boring technology

PostgreSQL. Redis. A Linux server. That is the stack for most of what I will ever ship. I keep saying it like a joke. I mean it as a budget.

I spent years chasing new databases. Tried CockroachDB, FaunaDB, SurrealDB. Each one had a compelling pitch. Multi-region this, no-ops that, a query language that would finally feel like the app. Each one had weird edge cases nobody documented because nobody had hit them yet. I hit them, with no page to steal.

## What boring actually buys

PostgreSQL has been hit with everything. Every edge case is written down. Every weird behavior has a thread from 2014. I used to hear that as dull. I hear it now as a list of ways the thing has already failed, in public, with a workaround. I can list the main ways it will let me down before I put data in it. That is the whole prize.

New software always has two piles of ignorance. Things I know I do not know, like what happens at 100% CPU. Things I do not even know to look for, like a stats file that pauses the world. Both piles exist in old software too. The new pile is just larger, and I will find it on a Saturday, with users waiting, with no thread to steal an answer from.

New technology is someone else's unfinished experiment. I am volunteering to be their QA team. Sometimes that is the work. A database company should live on that edge. I am usually trying to ship a product. The product already spends the attention I have.

## The check before I add a thing

Attention is scarce. I get a small budget for things that are weird, new, or hard. If I spend it on the store, I do not have it for the thing customers can see. I try to keep the budget for the product and let everything under it stay dull.

Before I add a piece of stack, I try to solve the job with what I already run. The honest answer is almost never "we cannot." It is "we can, and it will be uglier for a while." Uglier for a while is cheaper than a second database I have to monitor, back up, and explain to the next person. If the real itch is that I want to use the new thing, I stop. Wanting a tool is not a problem the product has.

The mix matters as much as any one choice. Adding a language that does the same job as the one I already have is an easy no. Adding another place that stores data feels different in the body, so I have talked myself into it more than once. It is still another thing that can fall over at 3am. The long cost of keeping a system up is larger than the inconvenience of building on a slightly worse fit.

## When I still pick the new one

I do add new things. I add them when the current stack makes the job expensive in a way I can write down, and when I am willing to move the old path over or accept two systems for a named stretch of time. I do not add a cache because a talk made caching look clean. I add it because I can point at the query and the clock.

I still reach for PostgreSQL first. I still put Redis in front when I actually need a fast shared scratchpad. I still put it on a Linux box I can ssh into. The dullness is the point. I want the failure to be a kind I have already seen.
