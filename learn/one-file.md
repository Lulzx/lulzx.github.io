# One file is enough

This website is one HTML file. The CSS, the JavaScript, the data, the components, the router. All in one file.

People ask why. The answer: why not?

One file means no build step. No bundler config. No module resolution. No "it works on my machine." Open the file, it works. Deploy the file, it's live. The path from edit to browser is a save and a refresh. I can break the page and see the break in the same breath. I can host it anywhere that will serve a file.

## What I get

Search works. I grep one path. The theme variables sit above the markup that uses them. The note data sits above the function that renders a note. When a style is wrong I do not bounce between three folders guessing which import won. I scroll. The whole program is in the scrollback.

There's a weird pressure in web development to have a "proper" project structure. Fourteen config files before you write a line of code. A build pipeline that takes longer than the actual program. A `src` tree that exists so the bundler has something to chew. I have started projects that way and spent the first evening on the chewing. The page was still empty.

For a lot of projects, especially personal ones, none of that is necessary. I am not building a product with a hundred screens and a team of twelve. I am building a page that shows some text and links. One file handles that just fine. The router is a few functions. The data is an object. The CSS is a block at the top. If I need a second page I can still be in the same document.

A CLI can be one `main.rs` for a long time. A bot can be one Python file with a handler and a loop. The moment I split, I pay for imports, for a layout, for the question of where the next function lives. I pay that tax when the file is actually fighting me. Not on day one as a ritual.

## When I would split

A file wants to break when two parts change for different reasons. The notes and the theme are still one site, so they still live together. If I started generating images, or running a server that is not the page, that work would get its own door. Different deploy, different failure, different pace. That is a seam. I wait for the seam. I do not invent one because a tutorial had a `components/` folder.

A file also wants to break when I cannot follow a click. If I have to hold five scattered helpers in my head to see what a button does, the one-file bet has failed. Then I cut along the path I keep re-reading, not along type. All the CSS in one pile and all the JS in another is a split that usually makes the click harder. I would rather keep a feature in one stretch of the file, with a heading over it, until that stretch is a real program.

Two people in the same file will step on each other. This site is me. The conflict cost is zero. If that changes, the file can become two. Splitting later is a move. Splitting first is a guess I then have to maintain.

I'll add complexity when I need it. So far I haven't needed it. The test is still the same. Open the file. Does it work. Deploy the file. Is it live. The day those two sentences need a pipeline, I will build the pipeline for that day, and I will know why it exists.
