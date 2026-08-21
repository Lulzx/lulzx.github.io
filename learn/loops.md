# Loops

You should not be prompting coding agents anymore. You should be designing loops that prompt them.

I was late to that. For a long time I treated the agent like a very fast junior. I asked for a plan. I read it. I said do part one. Then part two. I spun up another agent for review and copied the feedback back by hand. I was the loop. I carried the context, decided the order, made sure nothing fell through. It worked. It did not scale with me.

The first version I tried was almost a joke. A goal file, a progress file, and a while loop that started a fresh agent every time the last one exited. Same prompt. Clean context. The only memory was on disk: the code, the git log, a short note about what already failed. That is the whole trick. The model forgets. The repo does not.

It was exciting. It was also a mess. Error rate went up fast. There was no isolation, no checker that was not also the writer, and no real record of what mattered. Cool demo. Not much shipping.

## What a loop is

A loop is a small system that finds the work, hands it out, checks it, writes down what is done, and decides the next thing. The model is a function that system calls. You design the system once. After that you are not sitting in the chair for every turn.

Inside each beat the shape is always the same. The agent acts. It looks at what came back. It measures that against the goal. It either continues or it stops. I design the loop. I decide what good means.

Not every task wants this. The ones that do are the ones you already repeat often enough to pay the design cost, the ones where done can be a check you can actually run, and the ones whose output is worth the tokens. If you cannot write the stop condition, you do not have a loop. You have a machine that will keep spending.

## How it wakes up

A one-off run is not a loop. Something that is not you has to start the next beat.

Sometimes that is a short timer: watch the logs, check a health signal, scan for drift. Sometimes it is a clock: every morning, look at yesterday's failures. Sometimes it is an event: a push, a red CI job, a comment on a PR. Sometimes it is a goal that keeps going until a condition is true, then halts.

Interval, schedule, hook, until-done. Pick the one that matches the work. Do not run a forever loop on a job that should fire once when something changes.

## The pieces that actually matter

Running the agent again is the cheap part. The rest lives outside any single model call.

**A heartbeat.** Cron, a webhook, a hook on commit, a timer in whatever tool you use. Without this it is just one manual run.

**Isolation.** A git worktree or a per-thread checkout. Once this change lives in its own directory, you stop caring if the agent makes a mess there. Other work is not blocked. Two agents writing the same files at the same time will either overwrite each other or spend the night fighting a merge.

**Memory that survives the call.** Write the plan to a file you can read on your phone at 3am. Keep a progress log. Commit. The next iteration reads the repo, not a bloated transcript. If you keep appending the same conversation, quality drops and the bill grows with every turn. Fresh context is the point. A new instance does not talk itself into the last mistake.

**Skills and rules written down once.** The conventions. The "we never do X because of that one incident." The checklist for a good PR here. Put it in a file the agent is told to read. An agent that starts cold will fill any hole in your intent with a confident guess. You stop paying the explain-the-whole-project tax on every iteration.

**A verifier that is not the writer.** The model that just edited the code is the worst possible judge of whether the edit is correct. Split them. A second agent, a different model, or a fresh pass that only checks explicit conditions: tests pass, lint clean, matches the spec in the plan file. The thing that decides we are done should not be the thing that did the work. Maker and checker.

**Connectors to the real world.** The loop is only useful if it can open the PR, leave a comment, update the issue, run the deploy command, or send the message when it is done. A loop that only talks to the filesystem can describe the next step. A loop that can act in your actual environment can take it.

## A small loop

Every night a heartbeat runs on this repo. It calls a small triage skill that looks at open issues and recent commits, writes a short markdown summary, and for anything small and safe it opens an isolated worktree, lets an agent make the change, runs the trivial checks that exist, and opens a draft PR with the plan file attached. I get a notification. Most nights nothing happens. When something does, the diff is small and I can review it in a minute.

I did not write a prompt for "go look at issues." I wrote the heartbeat, the skill file, the rule that changes must be tiny, and the stop condition. The loop does the rest.

## A larger one

The one that really landed for me was bigger than one PR. I had a chunk of work that was clearly three or four stacked changes. I asked the agent to break it into plans as HTML files. Then I sent one message: spin up a thread to implement the first plan and file the PR, spin a review thread when the PR appears, put that review thread into a loop that watches for comments and addresses them until it gets approvals, merge when green, pull main, and start the next chunk.

It made a diagram. It used a heartbeat attached to the monitoring thread. It did the work. I went to sleep. I woke up with four stacked, heavily reviewed PRs ready. It was not fully autonomous and I am not claiming it was. I still set the goal and the definition of done. But the handoff between the pieces and the comment chasing happened without me copy-pasting.

That was the taste. Now I look for other places where the same shape applies.

## What is still on you

The loop does not remove the engineer. It removes the part of the job that was mostly drudgery.

You still choose the goal. You still write the stop condition that actually matters for this project. You still read enough of the output to keep your understanding current. You still apply taste. A loop multiplies whatever judgment you put in the rubric. If that judgment is thin, you ship thin work faster.

Three things get worse if you treat the loop as a way to stop thinking.

The first is the gap between the code that exists and the code you understand. The loop can fill a repo overnight. Your picture of the system does not update unless you read. When something breaks at 2am, that gap is the whole problem.

The second is unwritten intent. Why this approach, why not that one, what good means here. If that lives only in your head, the loop will invent a version of it and then optimize for the invention.

The third is a loop that does not halt. Set a ceiling on iterations. Kill the run when the last few passes stop changing anything. Cap the spend. Without those the run can keep spending after the work has stopped moving.

Verification is the price of walking away. If the checker is weak, the loop just produces more confident mistakes. Two people can build the same loop and get opposite results. One uses it to move faster on work they already understand. The other uses it to avoid understanding the work at all. The loop does not know the difference. You do.

## How to start

Pick one repetitive thing you already do by hand. Triage failures. Keep a dependency up to date. Apply a standard refactor. Write the success criteria first and put them in a file next to the code. Give the agent a worktree or a branch that cannot collide with anything live. Add one explicit review or test gate. Run the loop while you are still watching the output. Only then let the heartbeat own the night.

Write the rules down before you are tired of explaining them. The first version of the SKILL.md or AGENTS.md will be wrong. That is fine. You edit the rules the same way you edit any other code.

Start small. One loop. Make it boring. Make it reliable. Then notice what else is now obvious to automate the same way.

## Same principles as everything else

This is not a new religion. It is the same ideas that make the rest of the work on this site work. External state over in-memory magic. Isolation so things can fail safely. Written rules instead of tribal knowledge. A verifier that is not the implementor. Boring tools that stay out of the way. Delete what you can. Keep the leverage and the ownership.

The agents are not going to design the loops for you yet in a way you would trust for real work. You still have to do that. But once the loop exists, a lot of the prompting disappears. You stop being the pager. You become the person who writes the system that pages the agents.
