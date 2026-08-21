# Types are the first draft

I write the types before I write the logic.

A type signature is a compressed specification. This one does most of the talking:

```
fn parse(input: &str) -> Result<Version, ParseError>
```

It takes a string. It might fail. When it succeeds, I get a `Version`, not another string I have to treat carefully. When it fails, I get a reason. No comment does that in fewer characters. Unlike a comment, the compiler checks it. It cannot drift. It cannot lie.

## Check once, keep the proof

The useful move is to turn a loose value into a tight one at the edge, and then refuse to carry the loose one any further. A function that looks at a list, throws if it is empty, and returns nothing has checked something and then thrown the knowledge away. The next function still receives a list that might be empty. It will check again, or it will pretend, or it will blow up later on a path I already handled.

A function that takes the same list and returns a `Version` (or a non-empty list, or an email, or a parsed config) has spent the check on a type. After that, the rest of the program can stop asking. I parse at the boundary. Inside, I work with values that cannot be the bad case. If I later remove the check, the return type has to change, and every caller lights up.

Wide types leak work. `string` and `any` and a json blob mean every function re-learns the rules. The same "is this present" guard shows up again because I never minted a type that made absence impossible. The type was the missing comment, and also the missing test.

## What TypeScript took from me

TypeScript made me feel this in my hands. Coming from JavaScript, adding types felt like busywork. Then I stopped having an entire class of bugs. Functions called with the wrong argument. Properties read off `undefined`. A switch that forgot a case. Narrowing that would not let me into a branch unless the value could actually be there.

I still open a `.ts` file and write the types first. The structs, the unions, the function heads. If the types will not compose, the logic will not either. I would rather find that in the signatures than halfway through a pile of conditionals that exist to paper over a shape I never decided.

## What they will not do

Types will not catch a wrong formula. They will not notice that I sorted the list in the wrong direction. They will not save me from a business rule I misunderstood. Those stay on me, and on tests that actually run the path.

They catch the rest. The impossible state. The missing field. The call that used to work when everything was a dict. That is enough. It leaves my attention for the part the compiler cannot see.

When I am stuck I go back to the signature. If `parse` can return a bare `Version`, I have promised a world that does not exist. I put the `Result` back. The body gets easier after the promise is honest.
