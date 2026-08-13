# AGENTS.md

When the job is to rewrite a garden note after reading widely: take the ideas, leave the names.

The published note must read as if the author had always thought this. No citations. No "people say." No trace that anyone else was in the room.

## Locate the note

Notes live in more than one file. Edit all of them.

1. Static page: `learn/<id>.html`
2. Garden data: `notesData['<id>']` in `index.html` (`content` is the inner HTML of `<article>`)
3. SPA copies: `404.html` and `learn/index.html` must stay byte-identical to `index.html`

Words follow the same split: `words/<id>.html` plus `wordData` in `index.html`.

Do not invent lived scenes, numbers, or outcomes the author did not already claim. Keep first-person experiments. Update `tended` when the prose changes. Leave `planted` and `stage` alone unless asked. No em dashes in note or word copy. Site constraints that are not this method live in `PRODUCT.md`.

## Harvest

1. Read the current note all the way through. Mark what is lived (I did X, I woke up to Y) versus what is borrowed (names, quotes, "as so-and-so put it").
2. Read two or three sibling notes for register. Short sentences. First person. Concrete objects (files, diffs, PRs, worktrees). Headings that name the section, not a reveal.
3. Search and read primaries until the same mechanisms keep showing up. Stop collecting names. Keep collecting: the repeating cycle, the parts that have to live outside a single run, the failure modes, the stop conditions, the checks for whether the work even wants this shape.

A sentence that only stands if you keep a person's name, a product, or a coined label is not ready. Rewrite it until the mechanism is the sentence.

## Write

Put the harvested mechanisms in the author's mouth. Keep the lived parts. Cut the borrowed scaffolding.

The draft fails if it contains any of:

- A person, company, product, or paper used as authority
- A branded name for a practice the author can just describe
- A quote attributed to someone else
- Process leakage: "I researched," "I found," "the field," "everyone is saying," "as X put it"
- A closer that restates the last real point

The draft also fails if it drops a scene the author actually lived, or if it turns their night-shift anecdote into a generic example.

Voice checks: vary sentence length. One metaphor per idea, then drop it. Do not write "it is not X, it is Y." Do not rate the idea ("crucial," "the future"). Describe the thing.

## Ship

1. Write `learn/<id>.html` first, including title, description, and read time if the length changed.
2. Copy the `<article>` inner HTML into `notesData['<id>'].content`. Bump `tended`.
3. Copy `index.html` onto `404.html` and `learn/index.html`.
4. Grep the note (static and the `notesData` block) for leftover names and for "I found" / "research" / "as .* put it."
5. Open the static page and the garden route. Read it as a visitor. Check the sibling notes you did not edit still render.

A note is done when a stranger can read it and never ask who you were summarizing.
