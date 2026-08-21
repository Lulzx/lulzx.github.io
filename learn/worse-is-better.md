# Ship it ugly

The first version of everything I've shipped was embarrassing.

My first Telegram bot was 200 lines of spaghetti Python with hardcoded strings. It worked. People used it. I cleaned it up later.

My first Rust CLI was a single `main.rs` with no error handling. It worked. I used it daily. I refactored it later.

This website was a plain HTML page with no CSS for a week. It worked. You're reading the better version. But the ugly version came first.

## What ugly is allowed to be

Ugly can be incomplete. One command. One chat. One page. The happy path in a straight line. Missing flags. Hardcoded strings I will hate in a month. A function that does too much because I do not yet know the joints.

Ugly cannot be a lie. The bot has to answer. The CLI has to do the job I open a terminal for. The page has to be readable. If the core path is wrong, I am not shipping early. I am shipping broken, and then I learn the wrong lesson when people bounce. Incomplete teaches me what they needed next. Broken teaches me they cannot trust me.

I pick the simplicity I can actually type. A single file. A loop. Errors printed and ignored, for a week, on a tool only I run. I do not pick a framework that makes the first day look like a finished product. That kind of polish is a costume. It hides that I still do not know which feature matters.

The implementation has to stay small enough to throw away. If the first version needs a schema migration plan, I have already decided it is permanent. Permanent is how ugly becomes a prison. I want ugly that I can delete in an afternoon once I know the real shape.

## What I wait for

I wait for contact. A person uses the bot. I use the CLI the next morning without groaning. Someone reads the page. Contact is the only signal that tells me which part of the mess is load-bearing. Until then I am decorating a guess.

I've watched people spend months "getting it right" before showing anyone. They burn out or lose interest. The project dies in a private repo, perfect and unseen. The types were right. The folders were right. Nobody ever filed the one complaint that would have named the product.

I know that delay. The longer I wait, the more the first look has to justify the wait. That is a terrible deal to offer a stranger, and a worse one to offer myself at 1am.

## When I stop polishing

If nobody cares, I stop. I just saved myself months of polishing something nobody wanted. The 200-line bot earned a cleanup because people kept talking to it. The CLI earned error handling because I kept running it. The site earned CSS because I kept opening it. Effort follows use. Use does not follow a mood board.

If they care, I make it less ugly in the order of pain. The string that broke. The crash I hit twice. The layout I could not read on my phone. I do not start with a rewrite of the parts that never came up. Completeness can wait. Consistency can wait. The next cut is the one I can feel.

I still have a floor. I will not ship a secret. I will not ship a tool that destroys data with no warning. Ugly is a sloppy kitchen I can cook in. The rest of the embarrassment is a draft. Drafts get users. Users tell me which sentence to write next.
