# Seven years of Telegram bots

I started building Telegram bots in 2017 because I was bored. Wrote one that replied to messages with random quotes. Took maybe an hour.

That was the first one that stayed running.

Seven years later, some of my bots handle millions of messages a day. I have learned more about building reliable systems from those bots than from any job or course. The hard parts never lived in the reply handler. They lived in everything that had to keep working after the process died.

## Push, not ask

Webhooks, not polling. Polling is you calling Telegram on a loop asking if anything new showed up. Fine on a laptop. Fine for a quote bot. One process, outbound only, no public URL. Also one process forever. A second poller on the same token gets a conflict and the first one is a single point of failure. While you wait for the next loop, the user is already gone.

Webhooks flip the direction. You give Telegram an HTTPS URL. A message arrives, they POST it to you. Idle traffic is nothing. You can put more than one box behind the URL. The work starts the moment the user hits send.

The trade is that you now have a public endpoint, a certificate, and a promise to answer quickly. If you do not return OK in time, they try again. The same update can land twice. Sending the reply twice is a new message, not a no-op. You have to remember which updates you already answered. At-least-once is the contract. Exactly-once is a story you tell yourself.

## The work sits outside the request

After the push, the rest is the same stuff that makes any system stay up. Queue the update. Ack the webhook. Process async. Cache anything you would otherwise ask for on every message. Log the raw payload, the decision, and the send. Rate limits are real. One chat will 429 you if you talk too fast. A group has a tighter ceiling. A broadcast will sit in the queue and drip out, or it will eat the process.

The queue, the cache, and the log have to live outside a single run. Restart the box and the in-memory version of all three is gone. The bot that survives is the one that can pick the queue back up and know which updates it already answered.

## Failure is the job

Bots fail constantly. The API times out. Users send garbage. Your server runs out of memory at 3am. You learn to build for failure because you have no choice. A crash that recovers and replays the queue is better than a process that never dies and quietly drops a night of messages. I apply this to everything I build now.

Most of what I know about distributed systems, I learned from a chat bot. Who is allowed to call whom. What you ack. What you retry. What you refuse to do twice. What you write down so the next process is not guessing.
