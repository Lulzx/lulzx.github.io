# Tiny commits

My average commit is 15 lines. Some are 3. Rarely more than 50.

Each commit does one thing. Rename a variable. Fix a bug. Add a function. Not "refactor auth module." That's five commits pretending to be one.

I used to save up a whole afternoon and dump it in one hash. The message was a shrug. The diff was a weather system. I could not revert the rename without also reverting the bugfix. I could not ship the bugfix without dragging the half-finished rename onto main. So I sat on all of it until Friday, then asked someone to "take a look."

## What one thing means

A commit is one sentence I could put in a changelog. If the sentence needs an "and," I am holding two commits. Rename the variable. Then change the call sites, if that is a second thought. Then add the function. Then wire it. Four hashes. Four ways back.

I do not always see the slices at the start. I make a mess in the working tree, then I cut it with `git add -p`. Hunk by hunk. This hunk is the rename. That hunk is the new branch in the parser. The leftover is still dirty, and that is fine. The leftover is tomorrow's commit, or tonight's after dinner.

The message has to stand alone. Future me will grep for a word and land on this hash. If the message is "wip" or "fixes," the hash is a brick. If the message says what changed and why the old way hurt, the log is a map.

## Why the size

Small commits make `git bisect` useful. When a bug appears, I can binary search through commits and find it in minutes. If each commit is 500 lines, bisect tells me the bug is somewhere in these 500 lines. Thanks for nothing.

A 15-line commit is a save point. I bank the insight. I reset hard if the next hour goes nowhere. I cherry-pick the bugfix onto main while the feature branch is still ugly. I revert one hash without a surgical rebase. Mixed commits steal all of that. The revert becomes a rewrite.

Merge conflicts get smaller too. One reason the hunk exists. I can see what this side was trying to do. A 400-line conflict is two people who both "cleaned up" the same file for different reasons.

## Review

Small commits also make code review possible. I can review a 10-line diff in 30 seconds. I can review a 500-line diff in... actually I can't. Nobody can. They just skim and approve. The comments land on style because style is visible. The logic hole in the third file stays.

A stack of tiny commits can still be one PR. The reviewer can walk the hashes like chapters. Or they can read the whole diff if it still fits on a screen. I do not confuse "one PR" with "one commit." The PR is the conversation. The commits are the record.

I stop adding to a commit when I cannot hold the whole change in my head at once. That is usually well under 50 lines. Sometimes it is 3. A three-line commit that deletes a bad branch is a complete thought. Padding it with an unrelated tidy would only make the thought harder to find.

Write the smallest commit that makes sense on its own. Then write the next one.
