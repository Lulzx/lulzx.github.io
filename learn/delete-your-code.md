# Delete it

The best commit I made last month was 400 lines of deletions.

There was a feature nobody used. I checked the analytics. Zero hits in 90 days. I deleted it. The codebase got simpler. The tests got faster. One less thing to maintain.

I almost left it. The code still compiled. The tests still passed. Removing it meant touching a route, a template, a flag, a couple of helpers that only existed for that path. The honest reason I hesitated was loss. I wrote that feature. Deleting it felt like admitting the bet was wrong. The analytics did not care. Zero is zero.

## How I know it's dead

A hit count is the cleanest signal I have. Zero in 90 days is enough for a page, a command, a cron. I also grep for callers. I watch the logs for a name I am about to kill. If something still ticks, I go read the tick before I touch the files. A "dead" helper that runs on boot is not dead. It is load-bearing and badly named.

Flags are a graveyard. A flag that has been on for everyone for two releases is not a flag. It is an `if true`. I delete the false branch, then the flag, then the config key. Same for config that describes a version we no longer ship. Same for comments that narrate a function I rewrote last year. Comments rot faster than code because nobody compiles them.

Unreachable code is easier. The editor already greys it out. Unused imports too. I do not wait for a grand cleanup to take those. They go in the same PR as the change that orphaned them, or they go in the next deletion pass.

## We might need this

I tell myself that a lot. I will not. And if I do, it's in git. The real fear is that I will not be able to *find* it. A deleted file does not show up in grep of HEAD. So I search the history. `git log -G` with a function name. `git log -- path/that/died.ts`. The commit that removed it is a bookmark. I can restore a file from that hash in a minute. The times I skipped deletion, the need never arrived.

When I am unsure, I do not yank the code on a Friday and walk away. I hide the entry point first. Comment the route. Turn the flag off. Leave the files for a watch window that covers a normal week. If nothing screams, the files go. If something screams, I learned a dependency I did not have in my head. That is cheaper than a surprise outage and cheaper than keeping the museum open.

## The pass

I do a deletion pass every few months. Dead code. Unused imports. Config for features that shipped three versions ago. Comments that describe code that's been rewritten twice since. I pick a corner of the repo and walk it the way I walk a diff. What is this for. Who calls it. When did it last move.

The pass is easier when the code was easy to delete in the first place. A feature behind one door. A helper that does not reach into three other packages. Tight coupling is how a 40-line feature becomes a 400-line deletion, and also how I talk myself out of starting.

Every line I delete is a line that can't have bugs. A line that can't confuse the next person. A line that doesn't slow down the tests or the index. I still write more than I delete. The pass is how I keep that from being the only direction the repo knows.
