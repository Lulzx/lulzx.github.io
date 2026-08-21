# Less code

I keep coming back to this: the best code is the code I didn't write.

If this line doesn't need to exist, it shouldn't.

Every line I add is a line I have to maintain. A line that can break. A line someone else has to read and understand. Including future me, who will have forgotten why it's there. The line is doing work today. It is also a bill that arrives every time I touch the file, run the tests, or explain the system.

## What I actually do

Before I add a feature, I try to remove one. Before I add a file, I check if an existing one can hold it. Before I add a dependency, I look at how many lines it would take to write myself. Usually fewer than I think.

The order matters. If I add first, the new thing justifies itself by existing. I start protecting it. I write tests for a path nobody asked for. I name a module after a guess. Removal after that is a fight with my own last week.

My site is one HTML file. My CLI tools compile to single binaries. My libraries have zero runtime dependencies. Not because I'm trying to prove something. Because every time I've done it the other way, I've regretted it. The extra package had a release I did not want. The extra service had a failure I did not need. The extra file had a loop of imports I then had to undo.

I ask the same three questions on every PR I open, including my own. Does this line need to exist for the behavior I want. Can an old line already do it. If I delete this in six months, what else comes with it. If the last answer is "half the package," I have built a trap.

## Easy to take off

The code I keep has a door. A feature behind one route. A helper that does not reach into three crates. A config key that only one binary reads. When the bet is wrong I can pull the door off and the house still stands. Code that is cleverly reused across everything is code I will never delete. I will only decorate it.

I used to chase reuse. One function, many callers, a proud little graph. Then I needed to change one caller and the others came with it. Now I let two short copies live until the third one appears and the shape is obvious. Duplication is cheap. A wrong shared core is a root I cannot pull.

Layers help when they hide a mess I do not want to see. They hurt when they hide a mess I need to see. I flatten anything I cannot explain in one sentence. The sentence has to name a job, not a pattern.

## The hard part

Removing is harder than adding. Always. Your brain wants to solve problems by creating things. A new file feels like progress. A red diff feels like loss. I have to sit with that feeling long enough to remember the last time a fat module slowed me down.

The stop condition is not zero features. It is a file I can hold in my head. I know what every function is for. I know which ones I would keep if the product shrank tomorrow. The projects I'm most proud of are the ones where I looked at the code and thought there's nothing left to take away. That look does not last. The next feature will try to stay. The habit is the look, done again.
