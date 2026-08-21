# npm install regret

I used to `npm install` everything. Need to pad a string? Package. Parse a date? Package. Check if a number is even? Believe it or not, package.

Then I would open `node_modules` and find 800 folders for a project that sends emails.

## The audit

The turning point was a security audit. I had to explain every dependency. Why do we need this? What does it do? Can we trust the maintainer? I could not answer for half of them. I had installed packages I had never read a single line of.

One line in `package.json` is not one folder. It is a tree. The tree has its own trees. Each folder has a person on the other end with a password, a token, a laptop. I had been nodding at a list I could not recite.

The tiny ones were the worst. A check for even. A pad. A wrapper around a one-line native method. Those are the packages that get a new maintainer on a Tuesday and a `postinstall` on Wednesday. I had no reason to pull them except that typing `n % 2` felt like I was wasting time.

## What I write

Now I default to writing it myself. Most things I need are 20-50 lines. A pad. A date format I actually use. A retry loop. A small router. I can read all of it on a train. When it breaks I know which file to open.

Copying twenty lines into the repo is cheaper than depending on them. The copy does not grow a new script. It does not change because someone two hops away published `1.0.1`. It does not run on install. It sits there and does the one job.

I still add packages. Crypto. Compression. Database drivers. Those are the ones where a mistake of mine would be worse than a stranger's code I have actually read. I add them on purpose. I pin the version. I commit the lockfile and I install from it. A floating range is a stranger choosing my next Tuesday.

## What changed

My `node_modules` went from 800 folders to about 30. Builds got faster. Deploys got smaller. The audit question became answerable. I can walk the tree in an afternoon and say what each name is for.

I upgrade slowly. A new version is a new text I have not read. I wait a bit and I read the diff if the package sits on a path that handles money, auth, or install. A sudden jump in file size, a new lifecycle script, a maintainer swap with no note: those are stop conditions. I do not merge them to keep the bot green.

The 20-line helper is mine. The pinned driver is a choice I can still explain. The other 770 folders were a habit I mistook for speed.
