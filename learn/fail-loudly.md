# Crash, don't hide

The worst bugs are the ones that do not crash.

A null pointer exception at 3am is annoying but simple. I get a stack trace. I find the line. I fix it. A function that silently returns wrong data can run for weeks before anyone notices. By then the damage is in the database, in the cache, in the emails we already sent. The original lie is gone. I am debugging a neighborhood.

## Early and loud

I write code that crashes early. If something is wrong, I want to know in the same breath. Not in a log file nobody reads. Not as a subtle inconsistency that looks like a real value. A loud, obvious failure, close to the line that broke the rule.

Early is the when. Loud is the how. I have shipped both halves alone and gotten nothing. A process that dies and writes a line to a file I never open is still silent. A dashboard that turns red two weeks after the bad write is loud about the wrong moment. I want the signal at the first bad input, on a channel a person will actually see: a red test, a stack trace, an alert that names the field.

A crash is a gift. It tells me what went wrong, where, and when. A dead process usually does less harm than a crippled one that keeps writing. I will take the 3am page over a quiet week of numbers that were already fiction.

## What I refuse to guess

I assert the things I am assuming. I validate at the boundary, where the data still has a sender I can blame. If a function receives a shape it does not expect, it panics, or it returns an error that cannot be mistaken for success. I do not "handle" it by guessing what the caller meant.

Guessing is how silent damage starts. An empty list from a down database looks like "there are no rows." A missing field defaulted to zero looks like a real zero. A `catch` that logs and continues looks like resilience. It is a factory for plausible lies. If I catch something, I either fix the cause or I let the failure keep traveling. I do not invent a value so the rest of the function can run.

Config is the cheap version of the same rule. I want the process to die at boot when a URL is missing or a retry policy is a typo. I do not want the first paying request to discover it. The blast radius of a refused start is one deploy. The blast radius of a default is every write after.

## Where I do not crash the user

A user-facing page that dies on every ugly payload is loud at the wrong person. Inside, I still fail hard: exception, metric, alert. Outside, I can retry, or show a stale tile, or refuse the action without taking the whole app down. The rule is the same. Do not pretend nothing happened. Do not write the bad data through so the screen can stay pretty.

Loud signals rot if I fire too many of them. An alert channel that cries all day becomes another log file. I keep the checks few and close to an invariant I actually mean. Then I let them be rude.

The check I keep coming back to is simple. If this is wrong, will I hear about it before it has children? If the answer is no, the handler is a mute.
