# Names are interfaces

I spend more time naming things than writing the code inside them.

A function called `processData` tells me nothing. A function called `parseVersionString` tells me everything. The second one does not need a comment. The first one needs a paragraph, and even then I will open the body the next time I see the call. The name is what the call site has. If the name is empty, every reader pays the full cost of the function again.

## What a name has to carry

A good name is compression. It packs the job into a few characters so I can keep the body closed. I already do this with loops and maps. I do not reread `forEach` to remember it walks a list. I want my own functions to work the same way. A chunk I can hold. A debt I do not reopen.

The compression is lossy. English is fuzzier than the code. The work is choosing what must survive the squeeze. Most naming fights I have sat in are one of two losses. The verb is slightly wrong, so people argue `assign` versus `link` versus `apply`. Or the name dropped a part of the job, and the dropped part is the part that bites you later.

A name that needs `and` in it is already a warning. `linkUserAndEnableDownloadsAndSetChargeDate` is honest, and honesty that long means the function is doing three jobs. I cannot compress three jobs without lying. I split the function until each name fits in the mouth.

`handleStuff` and `doThings` and `processData` are the other failure. They compress away everything. I have to open the body. The name used a slot and gave me nothing back.

## Rename is cheap

I rename things constantly. It is free. It does not change behavior. It changes whether I can hold the program at midnight, when my brain is half off and the stack trace is the only map I have. A wrong name sends me into the wrong file. A right name puts me on the line.

I used to treat a first name as permanent because renaming felt like fussing. Then I noticed how much time I spent re-deriving what `manager` meant in this folder. The rename is one commit. The confusion is every visit after that.

I rename at the call site first. I write the name I wish I could call, then I make the function match. If the wish-name will not settle, I do not start the body. The insides will only freeze a blur.

## When the name will not come

If I cannot name something clearly, I do not understand it well enough yet. The struggle is a design signal. I am missing the job, or I have glued two jobs together, or I have not decided what the function is allowed to ignore.

I sit with a scratch name and a few call sites. I try the name in a sentence: this function does X to Y and returns Z. If I cannot finish the sentence without waving my hands, I am looking at a pile. I split the pile, or I write the ugly version in one place until the shape shows up. A bad name shipped early is harder to kill than a long function I still know is temporary.
