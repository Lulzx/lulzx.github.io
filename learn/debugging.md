# Debug by reading

When something breaks, I don't reach for the debugger. I read the code.

Not skim. Read. Start from the entry point. Follow the data. Ask: what did I *think* this does? What does it *actually* do? The bug lives in the gap between those two questions.

## Make it small first

A failure on a huge input is a bad place to think. Shrink it until the same wrong answer shows up on something you can hold. Half the file. One request. One row. If the small case is clean, the bug is in whatever the small case dropped, and you just learned that without opening a tool.

The crash is rarely the crime. Bad data walked through good functions and died somewhere polite. I start at the door the request used, not at the stack frame that finally complained. The path between those two is the map.

## One guess, one probe

I form a hypothesis I can kill. "This map is empty here." "This branch never runs." "The id that left the handler is not the id that hit the query." Then I add one log that will confirm or deny that sentence. Not five. One.

Five logs at once is fishing. You will see a mess of values and invent a story that fits all of them. One log answers one question. Then I read again with that answer in hand and pick the next cut. Binary search on the data, not a tour of every file.

I write the guess down if I have already been circling for a few minutes. Head memory drops the thing you already ruled out and you test it again. The note is ugly. It works.

## Three rounds

Three rounds of this solves most bugs. Read. Guess. One log. Repeat. By the third answer the gap has usually closed. The function I trusted was lying, or the input was not the shape I swore it was, or two names pointed at different rows.

The ones that survive three rounds are the interesting ones. Races. Two writers. A cache that served a value no write path still believes. Those need a tighter reproduction, or a debugger, or a look at what changed in the last commit. I still do not start there. I start when I can name the question the tool should answer.

## What the debugger is for

A debugger is a camera. It is excellent at showing you the room. It will not tell you why the furniture is wrong. If I attach it first I wander through frames and watch numbers flicker until I am tired. That feels like work. It is usually a delay on thinking.

I reach for it when the state is large and I already know which object is lying. Step through that object. Do not step through the program hoping the lie will wave.

Change one thing when you fix. If you tidy three functions and the test goes green, you do not know which edit mattered, and you will ship two of them by accident.

The tool that matters is a picture of the code that matches the code. If I have that, I barely need anything else. When I do not have it, reading is how I get it back.
