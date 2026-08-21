# Ship small, ship often

The fastest teams I've worked with shipped the smallest changes. A 30-line diff is easy to review, easy to test, easy to revert if it breaks. A 3000-line diff is a prayer.

I used to batch things up. I'll ship all of this together when it's ready. It was never ready. The pile grew a refactor, a half-done feature, a bug I noticed in passing. When I finally pushed, something always broke, and I couldn't tell which part did it. The revert was a coin flip. I sat in the logs guessing.

Now I ship constantly. Multiple times a day sometimes. Each change does one thing. If it breaks, I know exactly what and exactly why.

## One thing

One thing means one reason the diff exists. A flag flipped. A function added. A query tightened. The error handling for that function waits for the next change. The rename I spotted waits too. The urge is always to do more while I am already in the file. That is how a 30-line ship becomes a 300-line one, and then I am back to guessing.

I write the extra ideas down. A line in a notes file. A comment on the PR. Then I leave them. The next ship can pick one up. If the extra idea is actually required for this change to work, then it was never extra. It was part of the one thing. I was lying to myself about the size.

The check is simple. Can I describe the change in one short sentence without an "and"? If I need the "and," I have two ships taped together.

## After it lands

A small ship is cheap to watch. I look at the thing it touched. The endpoint, the log line, the page. I wait long enough that a real request would have hit it. If the signal is wrong I revert that commit. I do not stack a hotfix on a guess. Revert first. Then think.

The 3000-line ship cannot do this. There is no one signal. Five things moved. Two of them might be fine. The revert undoes the good with the bad, so nobody wants to revert, so we patch forward in the dark.

Frequent ships also teach the pipe. If I only deploy on Fridays after a long branch, deploy itself is the event. People hover. Someone has a rollback doc open. Deploy should be boring. If it's exciting, you're doing it wrong.

Boring means I have done this today already. The tests ran. The same command ran. The same host took the file. Nothing in the ritual is special because this particular change feels big. If a change needs a special ritual, I split it until it doesn't.

## What I refuse to mix

A feature and a refactor in the same diff. A behavior change and a formatting pass. A migration and the code that needs it, unless they truly cannot live apart. Mixed diffs fail in mixed ways. The review becomes a vibe check. Later, when something is wrong, the history points at a blob.

I used to think going faster meant packing more into each step. The teams that looked slow in the morning, one small PR after another, were the ones still shipping at 4pm. The teams with one giant branch had a war room and a frozen main.

Small is safe because the blast is small. One file. One behavior. One way back. I still feel the pull to batch until ready. Ready is a feeling. Shipped is a fact.
