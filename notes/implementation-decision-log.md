# Writ&Spec Implementation Decision Log

Chronological record of runtime/AST architecture decisions, as distinct from the language design itself (see `design-decision-log.md`).

---

## Apostrophe Normalization

Apostrophe spellings (`can't`, `mustn't`, `isn't`, `hasn't`) are accepted as input but never produce a distinct AST kind — they normalize to the apostrophe-less form at parse time. Echoing the user's exact spelling back in error messages is planned via future token/source back-references, not built yet.

## Resolved Value Wrapper

Resolved expression values are wrapped once, only at the boundary between "already resolved" and "still needs resolving" — the wrapper doesn't need to survive recursively through nested containers like arrays and objects.

## Context Bootstrap

The root context has no parent, but construction normally copies state from one. Resolved with a dedicated bootstrap path that builds the root context's state from scratch instead. Forking copies the parent's state at that moment, which makes the parent-lookup fallback largely moot for anything already defined before the fork.

## `'this'`

Always bound to the current browser interface, set once at root bootstrap, and returned already unwrapped from a plain lookup.

## `is` / `has` Namespaces

Implemented as plain, initially-empty runtime objects rather than flat string-keyed storage. Custom state definitions are expected to assign directly into these namespace objects. Calling a state looks the function up by name and invokes it with the target bound as the calling context.

## Equality — Reference, Not Deep

Equality compares by reference, not deep structural comparison — two different arrays or objects with identical contents aren't equal unless they're the same object. Chosen to avoid the cost and ambiguity of recursive comparison; open to revisiting if a real use case demands it.

## `or` / `and` Return Booleans

Unlike JS, where `or`/`and` return whichever operand "won," ours always coerce to and return a plain boolean — the JS idiom is a programmer convention that reads as confusing to this language's non-programmer audience. `any`/`all` still short-circuit for real; `or`/`and` don't, since both sides are already resolved before the operator runs.

## Arithmetic Strictness

Every arithmetic operator throws on a non-numeric operand rather than coercing — extending the existing numeric-only `+` decision to all of them. Concatenation still coerces simple values to strings but throws for anything structural.

## Stack-Safe Resolution

Expression resolution and object-literal resolution both avoid growing the native call stack per nesting level, so arbitrarily deep expressions or object literals can't overflow it. Not fully closed yet — arrays containing nested objects still resolve recursively, so that path remains exposed. Worth revisiting alongside array support generally.

## Property Access / Spread — Objects Only

Both reading into and spreading a value currently only support plain objects — arrays throw explicitly rather than being silently mishandled. Deferred intentionally, to be extended together with array support generally.
