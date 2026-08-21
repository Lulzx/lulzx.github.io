# Cache it

The fastest computation is the one you don't do.

My semver library is fast because it precomputes. My bots are fast because they cache user data. This website is fast because there is nothing to compute at all. Three shapes. Same move. Do the work once, keep the answer, hand it back.

## When the input barely moves

I have replaced n log n sorts with hash lookups more times than I can count. Not because I am clever. Because the data did not change often enough to justify lining it up again.

A lookup table is a cache you fill before anyone asks. Version strings live in a tiny box. Most majors never pass 50. I allocate the common ones at startup and parsing `1.0.0` becomes a key in a map. No regex. No walk. The answer was already sitting there.

User data in the bots is the same idea with a shorter life. Look the user up once. Keep the row. The next messages do not ask the database who this is.

This site is the extreme case. Files on disk. No render. No query. The cache is the page.

## What belongs in the box

Cache the result of work that is expensive, asked often, and slow to change. Skip the rest. A value that is different on every request is a second copy of the source with extra steps.

Keep the box small. A small cache is a list you can dump and read. When something is wrong you can stare at the keys and see the lie. A big cache is a second system you do not understand.

Name the key after the input. If two inputs share a key, you will serve the wrong answer and blame the CPU. If one input fans out into five keys, you will forget to clear four of them.

## How it goes stale

A cache with no plan for death is a bug with a head start. I keep three rules close.

Make invalidation explicit. When the input changes, delete the key in the same place you write the new value. If a write path forgets to clear, the old answer lives until something else happens to kick it out.

Keep TTLs short. A timer is a backstop, not a strategy. It bounds how long a missed delete can hurt. I pick the longest lie I can live with for that kind of data, then cut it down. A listing can be a minute late. A balance cannot.

Eviction is a capacity decision. Invalidation is a truth decision. When memory is full the policy throws away whatever it likes, including entries that are still true. That is not the same as deciding an entry is wrong. Mix them in your head and you will tune the wrong knob.

A stale cache is worse than no cache. The miss is slow and honest. The hit is fast and wrong. People trust the fast answer.

## When everyone misses at once

A popular key expires. A handful of requests arrive in the same breath. All of them miss. All of them recompute. The database you were protecting takes a punch it did not need.

I recompute those keys on the write, not on the pile-up. If I have to expire, I expire on a timer I control, not at the traffic peak. Compute once. Store the result. Serve it until the input changes. If you cannot name the moment the input changes, you are not ready to keep the answer.
