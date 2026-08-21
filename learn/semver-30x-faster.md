# semver, but 30x faster

Every `npm install` parses version strings. Thousands of them. Installing preact alone calls `semver` 21,000 times. One package.

The `semver` package has 150 million weekly downloads. And it is doing way more work than it needs to. A parse walks a regex, allocates an object, splits prerelease tags, and throws if the string is ugly. That is the right work for a string you have never seen. It is the wrong work for `1.0.0` the twenty thousandth time in the same install.

## The dumb idea

Version numbers aren't random. React is at 18. Node is at 22. Most packages never pass major version 50. The input space is small and almost still. So I precomputed all of them.

```
const cache = Object.create(null);
for (let M = 0; M < 50; M++)
  for (let m = 0; m < 50; m++)
    for (let p = 0; p < 20; p++)
      cache[M+'.'+m+'.'+p] = {major: M, minor:m, patch:p};
```

50,000 objects. Allocated once, at load. Now parsing `1.0.0` is a hash lookup on a string the engine already interned. No regex. No split. No new object on the hot path. The miss still goes through a real parser for the weird ones, the build numbers, the `1.0.0-beta.8`. Those are rare. The install is made of the common ones.

`Object.create(null)` matters. A normal object has a prototype chain. A lookup for a name that happens to exist on that chain is a surprise. A null-prototype map is just the keys I put there.

## Then compile the ranges

`^1.2.3` always means the same thing. The caret does not depend on the version you will test later. So compile it once to a closure:

```
(M, m, p, pr) => !pr && M === 1 && ((m-2)||(p-3)) >= 0
```

Next time you check any version against `^1.2.3`, it is four integers and some arithmetic. No range string. No walk of comparators. The predicate is the range. A satisfy call in an install is this function against a cache hit. That is why 21,000 calls stop being a tax.

## What I tried that lost

Hash arrays were slower than V8's internals. I packed majors and minors into integer slots and indexed them myself. The engine already turns a hot string key on a stable object into something close to a field access. My extra hash paid a constant the runtime had already deleted. I threw the arrays out.

A fast-path parser for short numeric versions added a branch and a walk before the cache lookup. The cache was already the fast path. The extra work ran on every call, including the ones the table already knew. I deleted it.

Gut said both of those should win. The clock said no. I keep the bench next to the code. If a change does not move the number, it does not ship.

## Result

**208 million** parses per second. 35x faster. 6.4 kB gzipped. Zero dependencies.

The 35x comes from refusing the regex on the strings that show up. The 6.4 kB is the table plus the compiler plus the fallback. No tree of helpers. The 150 million weekly downloads are 150 million chances to do this work the slow way. I wanted the common case to be a lookup and a few integer compares.

[github.com/Lulzx/pico-semver](https://github.com/Lulzx/pico-semver)
