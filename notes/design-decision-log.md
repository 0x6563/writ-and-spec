# Writ&Spec Language Design Decision Log

Chronological record of design decisions, debates, reversals, and the reasoning behind each. Written to preserve context for future conversations without re-litigating settled ground.

---

## Starting Point

The project began as a high-level language for Playwright browser automation, targeting three audiences: QA analysts without a dev background, developers wanting readable tests, and developers writing tests others can read. The north star: a test script should read like notes you'd send in an email.

Grammar Well (an existing open-source parser generator in npm, supporting Earley and LR0) was chosen as the implementation foundation, giving full control over the grammar without fighting parser limitations.

---

## Verb Set

**Initial list:** `click`, `type`, `scroll`, `navigate`, `wait`, `hover`, `drag`, `drop`, `focus`, `blur`, `press`, `upload`, `clear`, `find`, `screenshot`, `download`

**`check` and `select` — rejected.** The instinct was to keep `click` as the unified verb and trust the runtime to handle element type context (checkboxes, radio buttons, select options). The argument for dedicated verbs was idempotency — `check` implies "ensure this is checked" rather than "toggle" — but the simplicity argument won. `click` handles all three by context.

**`switch` for tabs — rejected.** The concern was that `switch` as a global context hijack creates hidden side effects — you'd have to read the whole file to know what context you're in. It's the `goto` problem for context management. Instead, `within` was extended to accept tab references, making context always locally visible.

**`read` and `count` as standalone verbs — eventually removed.** Initially added for extracting text and counting elements, these were later replaced by property access on refs (`.text`, `.length`, possessive form). See Property Access section.

**`intercept` — removed.** Initially considered for network mocking, replaced by `when network request/response` event handlers with a JS escape hatch for complex logic. The event handler model is more composable.

**`assert` / `expect` — rejected.** These carry xUnit baggage and feel like inherited conventions. `verify` was chosen instead — it describes what's actually happening (recording a result to a results set) without implying the error-throwing behavior those words carry from other frameworks.

---

## Scoping — `with` → `within`

Early design used `with` for context scoping. Renamed to `within` because it reads more naturally in plain English and was less likely to be confused with Python/Ruby's `with`.

**Key design decisions:**
- `within` sets the default context for a block. Single statement bodies work without braces; multiple statements require `{}`. This is consistent across `if`, `while`, `until`, `for` — one rule everywhere.
- The implicit root context is always the first page. `within` is temporary — context restores when the block closes.
- `in` as an inline suffix overrides context for a single action and chains left-to-right: `click $(.btn) in $(.modal) in $(.overlay)`

**The `in` chain direction debate:** Right-to-left matches how people speak ("in the modal, in the overlay, click the button") but left-to-right is easier to parse unambiguously and matches the verb-first reading order of the rest of the language. Left-to-right won.

---

## Selectors

Initially considered friendly alternatives to CSS/XPath (text matching, role-based, label-based, ordinal). Decided against inventing a new selector syntax — the institutional knowledge behind CSS and XPath is impossible to compete with, and the goal was handrails not a replacement selector engine. Friendly syntax left as a future consideration with a deliberately blunt note in the spec.

**Selector fencing — parens → `$()`:**  
Selectors were first wrapped in `()` for unambiguous parsing. Then realized `click(.btn)` looks like a function call. Changed to `$()` — already burned into every developer's muscle memory from jQuery and browser devtools, and the `$` prefix makes selectors visually distinct from variables and keywords. Non-devs learn it as "the thing that points at something on the page."

---

## Statement Termination

Long debate with no clean resolution for a while. Options considered:

- `.` — collides with object/property access
- `;` — "looks like code, not human notes"
- `,` — reserved as separator in `verify all { }` and `for` range syntax  
- Whitespace sensitivity — rejected outright
- Soft wrap — "a curse from hell, I refuse to allow it to be used in any discussion of my language design"
- Verb-as-terminator — breaks when variable names appear at the start of continuation lines
- `...` line continuation — allows multi-line statements without a terminator character

**Resolution:** `...` as a suffix continuation marker. The lexer treats `...` and surrounding whitespace as nothing, joining the lines into a continuous token stream. Newline without `...` is always a statement terminator.

**Later revision — `...` removed:** When `$()` was introduced for selectors, the grammar became unambiguous enough that a bare word before `$()` can only be a modifier profile, never a new statement. The rule became: a new statement starts with a keyword or assignment. A line starting with anything else continues the previous statement. This eliminated the need for `...` entirely.

---

## Modifiers

The design problem: modifiers like "type slowly" need to attach to verbs, but selectors and modifiers can be visually ambiguous without delimiters. Several approaches considered:

**Parens prefix — `(slowly) type $(.field) "value"`:** Initially landed here. Parens before the verb are unambiguous — can't be a selector, can't be a function call at the verb position. Click direction keywords (`left`, `right`, `middle`, `double`) sit as bare words between the parens and the verb.

**Later revision — bare word adverbs:** Once `$()` was established as the unambiguous selector fence, a bare word before `$()` can only be a modifier. This let modifiers drop the parens entirely.

**Modifier position — three options weighed:**
- `behavior action value` (`slowly type "value" in $(.field)`) — ruled out. Statement boundaries are detected purely by "does this line start with a keyword or assignment"; a behavior name is a user-defined bare word, not a keyword, so the parser can't tell a fronted modifier apart from a continuation line without lexer feedback (the C `typedef` problem) — exactly the kind of complexity `...` continuation was dropped to avoid.
- `action behavior value` (`type slowly "value" in $(.field)`) — one universal rule, scans fast, but ungrammatical for any verb with a direct object — a manner adverb can't split a verb from its object in English ("type slowly the password" is broken the same way "eat slowly the apple" is).
- `action value behavior` (`type "value" slowly in $(.field)`) — modifier lands right after the verb's own value/target, before any preposition. Reads naturally and stays a fixed distance from the verb no matter how long a trailing `in` chain gets — unlike parking the modifier at the very end of the statement, which drifts arbitrarily far from the verb it modifies as `in X in Y in Z` chains grow.

**Final: `action value behavior`.** Modifier immediately after the verb's own value/target, before `to`/`in`:

```
type "value" slowly in $(.field)
drag $(.card) smoothly to $(.target)
double click $(.btn) slowly
```

Verbs with no value of their own (`scroll`) keep the modifier right after the verb — there's no object to place it after. Click's own qualifier (`left`/`right`/`middle`/`double`) stays fused immediately before `click`; it's a compound-verb qualifier, not a behavior modifier.

**Interval and movement as named profiles:** Rather than opinionated keywords like `slow`, modifiers are named profiles defined by the developer:

```
interval slowly {
    speed = 200ms
    noise = 100ms
    jitter = 50ms
}

movement smoothly {
    movementJitter = 10px
    timingJitter = 50ms
}
```

Movement also supports a JS function form for full custom path calculation returning `[{ x, y, ms }, ...]`.

**Interval only applies to double click and type** (verbs with subactions). Movement applies to any verb involving cursor travel.

**`=` for properties inside interval/movement blocks:** Initially discussed using `:` as delimiter, then settled on `=` for consistency with the rest of the language's assignment model.

---

## Event Listeners — `when`

Replaced `intercept` and resolved the non-deterministic tab/popup problem. The key insight was needing a declarative "whenever this happens, do this" mechanism that doesn't block the main flow.

`on` was considered but rejected — it has an event-emitter/programmatic feel. `when` is plain English and reads like a policy rather than a hook.

**Channels and events model:** Events are organized into channels — a channel is a source of events, like a topic you subscribe to.

| Channel | Events |
|---------|--------|
| `tab` | `opened`, `closed` |
| `popup` | `opened`, `closed` |
| `dialog` | `opened`, `closed` |
| `download` | `started`, `completed` |
| `network` | `request`, `response` |
| `navigation` | `back`, `forward`, `url`, `hash` |

**`when` vs `next`:** `when` is continuous — stays subscribed until deleted. `next` is one-shot — fires once then unsubscribes. `next` is used inside `wait until` and tab/popup captures, not as a standalone statement.

**`now when`:** Registers a listener at the exact declaration point rather than hoisting to block start. The default `when` inside a `run {}` block is hoisted; `now when` is for timing-critical cases.

**`when` inside `run {}` blocks:** Hoisted to block start, override global handlers for the duration of the block, deregistered when the block ends. Global handlers resume after. If someone needs specific popup handling they wrap in `run {}` and the local handler takes precedence within that scope.

---

## Tab and Popup Captures

Several syntaxes considered:

- `click $(.btn) opens tab as reportTab` — result at end, hurts scannability
- `reportTab = click $(.btn) opens tab` — better but `opens tab` feels like AutoHotkey
- `tab from click $(.btn)` — initially felt terse and underbaked, later adopted

**`new tab from` → `REF from ACTION`:** The `new tab from` wrapper was dropped. The pattern is `REF from ACTION` where `REF` is the type of reference produced (`tab`, `popup`, `download`). Terse, reads plainly, and the name stays first. `new tab` (blank tab, no associated action) is unchanged.

**`next` as awaitable:** `next CHANNEL EVENT` is a first-class awaitable — the non-deterministic form where the triggering action is unknown or irrelevant.

**`wait until next` is statement-only.** `result = wait until next network response` was considered but dropped. Everything in Writ&Spec is implicitly awaited, so `wait` adds nothing in an assignment context — `result = next network response` is sufficient and consistent. `wait until next EVENT` remains valid as a standalone fire-and-forget statement.

**Final decision:**
```
reportTab = tab from click $(.btn)              // reference produced by a known action
previewWindow = popup from click $(.btn)
file = download from click $(.btn)
tab3 = next tab opened                          // awaitable — next tab regardless of cause
result = next network response                  // capture without wait until
```

Three capturable reference types: `tab`, `popup`, `download` — the only things an action produces that you need to hold as a named reference.

**`new tab from when tab opened` — removed.** A live reference is a variable whose value depends on external events that may have occurred anywhere earlier in the script — the same name can point to a different tab depending on when it's read, making it impossible to reason about locally. Dropped to avoid fostering that pattern. Open to revisiting if a compelling use case emerges.

---

## `define` — Universal Definition Keyword

All definitions (`function`, `js`, `interval`, `movement`) collapsed into a single `define` keyword. Reasons:

- `define` is a verb — fits the language's verb-first design
- Signals "this is a declaration" to the hoisting system without special-casing
- `interval NAME {}` and `movement NAME {}` as top-level keywords were unnecessary — they're just namespaced definitions

**Shape:** `define [NAMESPACE] [CONTEXT] [LANG] NAME(args) {}`

Three orthogonal axes:
- `LANG` — `function` (Writ&Spec body) or `js` (JavaScript body). Declares the language of the definition body.
- `CONTEXT` — `browser` (optional). Bakes execution environment into the definition. Named functions with `browser` are called the same way at the call site — `run NAME` — the runtime uses the context from the definition. `in browser` at the call site is for anonymous blocks only.
- `NAMESPACE` — `behavior`, or `is.`/`has.` via dot notation on the name.

All combinations are valid. `define browser function NAME(){}` means Writ&Spec statements translated for browser execution.

**Hoisting:** Definitions are hoisted — can be used anywhere in the file. If definitions reference each other, they must appear in declaration order relative to each other.

**`this` convention:** Always set by the runtime — never passed as an argument. In `after`/`before` blocks `this` is the event payload. In the main flow `this` is the current page or `within` context.

**Open gap — call-site interactivity:** a function's context is captured at its *definition* site (closure, staying that way), so it has no way to reach the tab/session/browser active at its *call* site. Current direction is `within current tab { }` / `within current session { }` (siblings of `new tab`/`new session`) inside the definition, granting function authors access to the call site. Call-site syntax (`run x() in this`/`in here`) is also still considered, for symmetry, letting consumers run a function against their own current context — but there's hesitation about giving `in` special-case handling to override a descendant call statement's context. Either way, it needs a dynamic side-channel, separate from closures and regular variables, not yet designed.

**Anonymous JS blocks:** `run in browser js { }` for quick browser-context execution. `run in TAB_REF js { }` for a specific tab. No variable injection in anonymous blocks. If injection is needed, use a named `js` function with explicit args.

## `behavior` — Unified Timing and Movement Profiles

`interval` and `movement` were serving the same purpose — humanizing actions. Collapsed into `behavior`.

**Config form:** `define behavior NAME = { key: value, ... }` — object literal syntax with `:`, comma-delimited.

**Callable form:** `define behavior js NAME(args) {}` for dynamic profiles that need args or browser context (e.g. viewport-aware path calculation: `define browser behavior js NAME(args) {}`).

**Runtime behavior:** Applies relevant properties per verb — timing properties for `type`/`double click`, path properties for `drag`/`hover`, both where applicable.

**Future:** Inheritance between behavior profiles (one extending another via spread or similar) is deferred.

## Custom State Functions — `is.` / `has.` Dot Notation

`is` and `has` use dot notation on the function name rather than a namespace token before the lang keyword. `define is function visible(){}` would be ambiguous and doesn't read naturally. Dot notation keeps `is`/`has` as grammar-clean keywords at usage sites (`$(.el) is visible`) while still supporting namespaced definitions (`define browser js is.admin(){}`).

`is`/`has` custom states can now be defined directly as `define browser js is.NAME(){}` rather than wrapping `run in tab js {}` inside a native function — the browser context is declared at the definition.

---

## Custom State Functions — `is.` and `has.` Namespaces

Initially: any function returning a boolean could be used as a state condition, looked up by name. `is admin` → look up function `admin()`.

**Revised:** `is` and `has` are namespaces extended through function definitions. Prevents naming collisions and makes the intent explicit at definition time — you're extending the state vocabulary, not just writing a utility function:

```
function is.admin() {
    return run in tab js {
        return this.classList.contains("admin-user")
    }
}

function has.permission(level) {
    return run in tab js {
        return this.dataset.permissions.includes(level)
    }
}
```

`is` and `has` are read-only objects — only writable through `function is.x` and `function has.x` definitions.

---

## Execution — `run`, `load`, `use`

**Early model:** Two keywords — `run` (isolated) and `use` (inherits listeners and timeout from enclosing scope).

**Problem:** `use` was doing double duty — "execute in browser page context" AND "inherit enclosing context." These are different things.

**Revised model:**

- `run` — isolated execution, no inherited listeners or timeout. Safe default.
- `load` / `load globally` — executes a function and attaches its listeners and afters to current or global scope. Returns a context object.
- `run in tab NAME|js{}` — execute in browser page context

**`use` retired entirely.** Context word `in tab` placed before the function name/block for visual clarity at the top of potentially long blocks.

**`load globally` vs alternatives:** Considered `in global`, `in root`, `in main`, `in session`. `globally` won as an adverb — consistent with other modifiers (`slowly`, `smoothly`).

**Context object:**
```
context.handlers     // unified dictionary of all registered handlers — event listeners and afters
context.value        // function return value
```

**`when` and `now when` inside blocks:** `when` is hoisted to block start and deregistered at block end. `now when` registers at the exact declaration point.

---

## `try` — Error Swallowing

Added as a complement to `run`. Same shape — `try { }` — but swallows errors rather than propagating them. Optional `when error { }` handler inside the block; without it errors are silently discarded.

```
try {
    click $(.might-not-exist)

    when error {
        log "element not found, continuing"
    }
}
```

`when error` follows the same hoisting rules as other `when` handlers inside blocks.

---

## Execution Control

**Early model:** `error "message"` (fatal if uncaught), `error "message" and exit` (always fatal, bypasses catch), `exit` (clean stop). Also briefly considered a full logging suite (`log`, `warn`, `error`, `debug`) before recognizing that was reinventing console logging.

**Intermediate revision:** `error` retired. Replaced by `fail` (catchable throw), `abort` (uncatchable, always exits 1), `exit [N]` (clean stop with code).

**Final model:** `fail` and `abort` removed. Exception-as-flow-control is an antipattern even for developers — `fail` was a `try`/catch gate that belonged in neither the script layer nor infrastructure. Execution control split into two distinct concerns:

**Errors** — unexpected execution failures. The runtime throws them, `try { ... after error { } }` handles them. `must` escalates a catchable error to suite-level failure.

**Authored termination:**
- `stop suite` — stop current suite, mark failed. Sibling and parent suites continue.
- `stop app` — stop the entire run. Exits with code 1.
- `dev exit(N)` — stop with specific exit code. CI and tooling integration only. Not expected in script-layer suites.

`dev` is a built-in invocation keyword (parallel to `run`) scoped to a fixed set of developer tools. Fixed namespace — not user-extensible. Other tools: `dev trace()`, `dev throw()`.

---

## Statement Joins — removed

**Original problem:** Chaining `log` before a terminal (`log "context", fail`) needed a join syntax. `,` was chosen as a sequential unconditional join, `or` as a conditional join.

**Removed entirely.** Statement joins were trying to code-golf `if` statements and introduced grammar ambiguity with `,` already used in `for` destructuring, range steps, `all`/`any` blocks, and function arguments. The use cases don't justify the complexity:

- `log ..., fail` → two lines
- `log ..., abort` → two lines
- `verify ... or log ..., abort` → `if cant verify` block (see verify section)

**`or` is expression-only.** It links conditions in `if`, `while`, `until`, `any`/`all`, and `verify by` clauses. It does not link statements.

---

## `verify` and `must`

**Evolution of verify:**

Started as: `verify CONDITION as "label" or exit`

The label-after problem: you have to read the whole line to know what's being asserted. Scannability suffers.

Revised to label-first, `by` introduces the proof:
```
verify "dashboard visible"
by $(.dashboard) is visible
```

The two-line form — label on one line, `by` on the next — is the recommended style. Reads like structured documentation.

**`verify` split:** `verify` became purely a soft recorder — always continues regardless of pass/fail. `must` added as a universal hard requirement modifier:

```
must verify "submit enabled"
by $(.submit) isnt disabled

must click $(.submit)
must run login()
```

`must` works on any statement. If it fails, stops the current suite regardless of surrounding `try`. Without `must`, errors are catchable by `try`.

**`verify` returns boolean.** Records the result AND returns a boolean for use in `if` conditions. `cant verify` negates the check result — true when the check fails. This negates the result, not the condition itself (inverting the condition would change what is being tested).

```
if verify "login visible" by $(.login) is visible
    run loginFlow()

if cant verify "user visible" by $(.user) is visible {
    log $(.profile).html
    exit 2
}
```

`cant` follows the existing `isnt`/`hasnt` pattern — apostrophe dropped. `must verify` is for no-branch abort. `if cant verify` is for custom failure paths including exit codes.

**Things rejected:**
- `check` as soft assertion verb — unnecessary third verb
- `or abort` chaining on verify — statement joins removed entirely
- `else`/`otherwise` as failure branch on verify — superseded by `if cant verify`
- `on fail {}` block — less natural than `if cant verify`
- `result = verify ..., if result failed` — feels like code, obscures intent

---

## State Conditions

**`is` / `isnt` / `isn't`** — aliases. Same for `has` / `hasnt` / `hasn't`. Same pattern for `cant` — apostrophe dropped from `can't`, used as the negation of `verify` in `if cant verify`.

**Existence:** `exists` dropped as a postfix verb — inconsistent with everything else being `is ADJECTIVE`. `is missing` / `isn't missing` as the pair. `missing` was chosen over `absent` because "the element is missing" is how people actually say it.

**Full vocabulary:**
- `is visible`, `is hidden`, `is inview`, `is enabled`, `is disabled`, `is checked`, `is focused`, `is missing`
- `has text`, `has value`, `has class`, `has attribute`

**`is inview` vs `is on screen`:** `on screen` is two words, breaks the single-word pattern. `inview` chosen. The distinction from `is visible` was contested — "subtle, but if you're testing ADA..." An element can be `visibility: visible` but scrolled out of viewport, which is an accessibility violation.

---

## Property Access

Two syntactic forms, both supported:

```
item.text           // dot notation
item's text         // possessive
$(.price).attribute("data-value")
$(.price)'s attribute "data-value"    // yes, this is in the language
vars.user.name
vars's user's name   // deeply cursed, fully supported
```

The possessive form was described as having "a complete disregard for programming languages everywhere." It's unhinged enough to be memorable and draws attention to the language's plain English goals. `$(.price)'s` was specifically noted as potentially unconventional enough to draw hype.

**Property vocabulary:**
- Refs: `.text`, `.html`, `.value`, `.attribute("name")`, `.parent`, `.children`
- Collections: `.first`, `.last`, `.length`, `[index]`

**`get text from item` form:** Briefly considered as a verbose alternative for non-developers ("get text from" reads like instructions, `.text` reads like code). Decided to support dot notation and possessive only — two forms with different register, one concept.

**`then` piping — explored and abandoned:** Started as a way to chain scoped finds left-to-right. Evolved into filter/collect/map territory which was recognized as basically designing SQL. Abandoned — `find $(x) in $(a) in $(b)` already works.

---

## Iteration

**`each` → `for`:** Long debate. `each`, `loop each ... from`, `with each`, `loop items as item` all considered. Settled on `for` because `while`, `until`, `within` are all prepositions that set up a scoped condition — `for` fits exactly in that family. Iteration doesn't need a verb because the actions live inside the block.

**`key` magic word — added then removed:** Initially `key` was a reserved word containing the current index or property name. Replaced by explicit destructuring in the `for` statement — two variables get key and value:

```
for item in items { }
for key, value in vars.config { }
for i in range 0 to 100 { }
for i in range 0, +4 to 100 { }
```

**Range step syntax — long debate:** `step`, `by`, `every N`, `skipping N`, `in steps of N`, `0(+3)`, `0+3` all considered and rejected. `step` was "too code-sounding," `by` was "too fragmented," others were too long or ambiguous with expressions. Comma interval notation won — `range 0, +4 to 100`. The `+`/`-` makes direction explicit, the comma is already used as a separator in other fenced contexts.

**`find all` → `find every`:** `all` reserved for logical AND in `verify all { }`. `every` for collection iteration — consistent with `within every items`.

**`stop` / `skip`:** Loop control. Plain English replacements for `break` / `continue`.

---

## `after`, `after every`, `new timer`

**`timeout` retired entirely.**

The problem with `timeout` as a statement: it's a noun acting as a verb. Multiple timeouts, inheritance across `load` calls, and naming all created complexity.

`after` as the replacement: declarative, consequence declared inline, multiple afters coexist and race independently:

```
after next 30s abort
after every 30s run heartbeat()
x = after every 30s run poll()
restart x
delete x
```

`after every` for recurring intervals. `restart` resets an `after` back to full duration (or a `timer` to 0).

**`new timer`:** A duration value that starts at 0 and counts up. Not scope-attached, not surfaced in `context.handlers`. You own it entirely.

**`context.handlers`:** Unified dictionary of all handlers registered by a `load`ed function — both event listeners and afters. Earlier candidates: `context.listeners` + `context.timers` (separate), `context.afters` (accurate but ugly), `context.scheduled`. Collapsed to `context.handlers` — plain English, works for both types, readable by non-developers.

---

## Event Propagation — `stop event`

Multiple `after`/`before` handlers can be registered for the same event. They run in order — block-scoped handlers prepend and fire first, global handlers follow. By default all handlers in the list fire for every occurrence.

`stop event` halts propagation: once called inside a handler, no further handlers in the list are invoked for that event occurrence.

```
after popup opened close popup              // global — fires unless propagation is stopped

run {
    after popup opened {                    // block-scoped — higher priority, fires first
        click $(.special-accept)
        stop event                          // global handler won't fire for this occurrence
    }
    click $(.submit)
}
```

**Block-scoped handler model — resolved:** Block `after`/`before` handlers prepend to the list (higher priority) and are deregistered at block end. They do not override or replace global handlers — global handlers remain in the list and fire unless explicitly stopped with `stop event`. This replaces the earlier "override for the duration of the block" wording.

**`stop` vs `stop event`:** `stop` exits a `for`, `while`, or `until` loop. `stop event` stops handler propagation. Two-word form required — `stop` alone is already loop control, and reusing it would be ambiguous when a loop body lives inside a handler.

**Things rejected:** `handled` (adjective, not a verb — language uses verbs and prepositions to start statements), `halt` / `absorb` / `claim` / `intercept` / `suppress` (all more obscure than the problem they solve). `stop event` is the literal description of the action.

---

## `scope` / `this`

Added to solve "within hell" — deeply nested `within` blocks when you need to switch context dynamically. `scope` and `this` are aliases that update the active context within the current `within` stack frame:

```
scope = $(.modal)
type "value" in $([name="email"])

prev = scope
scope = $(.form)
type "value" in $([name="email"])
scope = prev
```

`within` still earns its place for known boundaries and automatic cleanup. `scope` is for dynamic switching, save/restore, and loop-friendly context management.

---

## Navigate

`navigate back`, `navigate forward`, `navigate reload` — all navigation under one verb. Bare `back` and `forward` as standalone statements looked like variable references.

`navigate to URL in TAB` — `in` for tab targeting consistent with how `in` works everywhere else.

---

## Scroll

`scroll to $(SELECTOR)` — always requires a destination. Unary `scroll $(selector)` (scroll element to end) dropped.

Reserved location keywords: `top`, `bottom`, `left`, `right` usable as destinations.

`in` for container scoping:
```
scroll to $(.footer)
scroll to $(.footer) in $(.sidebar)
scroll slowly to $(.footer) in $(.sidebar)
```

---

## `new session` / `new incognito`

`session` is canonical, `incognito` is alias. The key use case: testing that logged-in user data doesn't leak to unauthenticated sessions — a real and important security test.

---

## Units of Measurement

Two families:

**Time:** `ms`, `s`/`second(s)`, `m`/`min`/`minute(s)`, `h`/`hr`/`hour(s)`. Chainable, order not enforced, spaces allowed, singular and plural both valid. Base unit `ms`. Mixed units resolve to smallest to avoid fractions. Duration values participate in expressions like any other value.

**Distance:** `px` (base, always concrete), `cm`/`mm`/`in` (runtime resolved against browser DPI). No days — absurd for browser automation.

---

## Comments

Two forms:
- `- note: inline comment` — single line. The dash prefix aids visual scanning.
- `--- note: ... ---` — multi-paragraph block for documentation.

The block form uses `---` as the fence. Unlike Markdown, the language owns this syntax entirely and doesn't need to reserve `---` for horizontal rules.

---

## Test Structure

`test suite "name" { }` — nested named groupings. No `test` wrapper, no lifecycle hooks (`before`, `after`). The philosophy: the language describes what happened and what the results were; scaffolding and teardowns are an ops concern handled outside the language.

`describe` rejected as "poor wording" and xUnit baggage. `suite` was considered. `test suite` as a two-word keyword won — reads as plain English, unambiguous, immediately understood by anyone.

---

## Reporting

Three events: `suite:start`, `suite:update`, `suite:end`.

`suite:update` carries the full results set at that point in time — undefined for anything not yet reached. The argument against: "that's a lot of data to continuously send." Counterargument: "I've never seen a test suite that had 100mb of test results."

**JSON shape:**
```json
{
  "name": "Login Flow",
  "type": "suite",
  "duration": { "relative": 1203, "absolute": 1203 },
  "results": [
    {
      "name": "dashboard visible",
      "type": "assertion",
      "success": true,
      "duration": { "relative": 342, "absolute": 567 },
      "error": null
    }
  ]
}
```

`duration.relative` — time since previous assertion or suite start.
`duration.absolute` — time since suite start.
`type: "assertion"` — not "verify" (avoids coupling to the keyword) and not "test" (conflicts with `test suite` mentally).

---

## String Concatenation

`..` is the string concatenation operator. `+` is reserved for numeric arithmetic only, avoiding the JS trap where `+` silently coerces types.

```
"Hello " .. vars.username
"Page: " .. vars.page .. " of " .. vars.total
```

**Template strings — deferred.** The `@"..."` fence was the original design but `@` was not a satisfying choice (`@` already used for keyword-tagging, and the fence/interpolation delimiter design needs more thought). Deferred until a better fence can be decided. `..` covers all practical cases in the meantime.

---

## Naming

The name search was extensive. Rejections included: Playbook ("terrible"), Well Read (too tied to Grammar Well family), Browser Cue (homonym Write/Writ), Writ Interfaces, Frontend Writ, Writ & Contract (legal SEO noise), many others.

The process: wanted something that said "readable browser automation" in two words, avoided themes that would saturate the whole platform with metaphor references, avoided made-up words ("cringe"), avoided 90s tax software adjectives (Easy, Simple, Quick, Friendly).

**Final:**
- Platform: **Writ&Spec**
- Package/repo: `writ-and-spec`
- File extension: `.was`

`.was` arrived naturally from the name — "Writ And Spec" — and was immediately noted to carry a quiet meaning: "this is what was supposed to happen." The extension landed in one exchange and wasn't questioned again.

`&` is branding only — invalid in package names, file paths, and import statements everywhere it matters technically.

---

## Open / Deferred

- **File management:** `download`, `upload`, `screenshot` in WIP section. Open questions around file as first-class reference, properties, and reporting integration.
- **`js function in tab` as definition-level context declaration:** Syntactic sugar for `return run in tab js {}` — declares at the definition that the entire function body runs in browser context. Semantics are clear (`this` = current page, same as `run in tab js`). Decision needed: is a first-class form worth the added syntax surface?
  ```
  // current
  function handleResponse() {
      return run in tab js { ... }
  }
  // proposed sugar
  js handleResponse(page) in tab { ... }
  ```
- **Simpler selector syntax:** Deliberately deferred. Spec note reads: "Simpler selector syntax TBD when simpler users come along."
- **Filter syntax for `wait until next`:** Future consideration, no syntax direction implied.
- **`em`/`rem`/`vw`/`vh` distance units:** Future consideration.
