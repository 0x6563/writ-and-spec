# Writ&Spec Language Spec

## Philosophy

Most browser automation is written by developers and understood by no one else. Scripts become a black box — difficult to review, difficult to challenge, and impossible to hand off. Writ&Spec changes that.

Scripts written in Writ&Spec are readable by the people closest to the product — QA analysts, product owners, stakeholders — without requiring any programming knowledge. A script should be self-evident: someone unfamiliar with the codebase should be able to read it and confirm whether it reflects the correct behavior.

It still allows escaping into the programmatic layer, but only where necessary. Complex logic lives in developer-owned functions that are imported and called by name. The script itself stays plain. This also makes AI-assisted authoring practical — AI can write the script, and a human can verify it without needing to understand how it works under the hood.

Infrastructure — functions, behavior profiles, JS — lives in a separate layer maintained by developers. Test steps are owned by whoever is closest to the product.

---

## How Statements Are Shaped

The language is unambiguous English with a minimal number of sigils for structure. Other languages have leaned on information density — combinations of tokens, delimiters, and symbols to express complex things concisely. Here, brackets and sigils are only used where the alternative is lengthy prose or genuine ambiguity. Everything else is plain English.

Because the language prioritises unambiguity it isn't open-ended natural language — there is a defined set of instructions, structured consistently so there is no need to follow dozens of different sentence patterns.

The majority of instructions follow one structure:

```
VERB [REFERENCE] [MODIFIER] (TO|IN) SUBJECT [IN SUBJECT ...]
```

```
type "hello" slowly in $(.search)
drag $(.card) smoothly to $(.column)
scroll slowly to $(.footer) in $(.sidebar)
navigate to vars.baseUrl in reportTab
find $(a) in $(.nav) in $(.header)
```

Verbs are imperative — "click", "type", "drag" — so statements read as direct instructions. Modifiers are idiomatic adverbs that slot naturally right after the value or target the verb acts on, before any preposition that follows — this keeps the modifier next to the verb it belongs to no matter how long an `in` chain trails after it. Verbs with no value of their own, like `scroll`, take the modifier right after the verb instead. `to` points to a destination, `in` points to where you're working and chains left to right, narrowing scope further with each step.

`$()` marks a selector. `{}` marks a block. Everything else is plain English.

---

## Imports

Infrastructure — functions, behavior profiles, JS — can be defined at the bottom of a file or in a separate file and imported. Declaration order does not matter. All declarations are hoisted.

```
import "shared/functions"
import "shared/behaviors"

test suite "Login" {
    run login(vars.username, vars.password)
    verify "logged in" by $(.dashboard) is visible
}

// infrastructure at the bottom — hoisted automatically
define function login(email, password) {
    type email in $([name="email"])
    type password in $([name="password"])
    click $(.btn-submit)
}

define behavior slowly = {
    speed: 200ms,
    noise: 100ms,
    jitter: 50ms
}
```

---

## Selectors

There are three ways to reference an element, each with different resolution timing:

**Query selector** — a `$()`-wrapped CSS or XPath expression. Resolved fresh against the page every time it's used.

```
click $(.btn-primary)
click $(#submit)
click $([data-testid="login"])
click $(//button[@type="submit"])
```

**A `find` result** — `find` resolves a query selector once, at the point it runs, and returns a reference to that specific element. Later uses of the reference point at the same element found then, without re-querying the page.

```
modal = find $(.modal)
click modal
```

**A variable holding a query selector** — assigning a `$()` expression to a variable, without `find`, stores the selector itself rather than a resolved element. It resolves fresh on every use, the same as writing the `$()` inline.

```
modalSelector = $(.modal)
click modalSelector
```

> Simpler selector syntax TBD when simpler users come along.

---

## Action Verbs

### Navigation

#### `navigate`
```
navigate to "https://example.com"
navigate to vars.baseUrl
navigate to vars.baseUrl in tab2
navigate to "https://example.com" in reportTab
```

#### `back` / `forward` / `reload`
```
navigate back
navigate forward
navigate reload
```

---

### Interaction

#### `click`
Handles checkboxes, radio buttons, and select options by context. Accepts an optional click-type qualifier before the verb, and a behavior profile as a bare word adverb after the selector.
```
click $(SELECTOR)
left click $(SELECTOR)
right click $(SELECTOR)
middle click $(SELECTOR)
double click $(SELECTOR)
double click $(SELECTOR) slowly
click $(SELECTOR) smoothly
double click $(SELECTOR) smoothly slowly
```

#### `type`
Value first, modifier after value, `in` for destination selector.
```
type "value" in $(SELECTOR)
type vars.username in $(SELECTOR)
type "value" slowly in $(SELECTOR)
type vars.username slowly in $(SELECTOR)
```

#### `clear`
```
clear $(SELECTOR)
```

#### `press`
```
press Enter
press Tab
press Escape
press "Control+c"
```

#### `hover`
```
hover $(SELECTOR)
hover $(SELECTOR) slowly
```

#### `drag` / `drop`
`to` separates source from destination. Modifier after the source selector.
```
drag $(SELECTOR) to $(SELECTOR)
drag $(SELECTOR) smoothly to $(SELECTOR)
```

#### `focus` / `blur` / `unfocus`
`blur` and `unfocus` are aliases.
```
focus $(SELECTOR)
blur $(SELECTOR)
unfocus $(SELECTOR)
```

#### `scroll`
Always requires a destination. Accepts reserved location keywords or a selector. Modifier after verb, `in` for scope.

Reserved locations: `top`, `bottom`, `left`, `right`

```
scroll to $(SELECTOR)
scroll to $(SELECTOR) in $(SELECTOR)
scroll to bottom
scroll to bottom in $(.container)
scroll to top
scroll to left
scroll to right
scroll slowly to $(SELECTOR)
scroll slowly to bottom in $(.container)
```

---

### Finding and Observing

#### `find`
Resolves a reference to an element for reuse. Used directly or via assignment.
```
modal = find $(SELECTOR)
link = find $(a) in $(SELECTOR) in $(SELECTOR)
```

#### `find every`
Resolves all matching elements as a collection.
```
items = find every $(SELECTOR)
```

#### `verify`
Label first, `by` introduces the condition. Label is optional — falls back to condition source in the report. Supports single line or multi-line formatting.
```
verify $(.dashboard) is visible

verify "dashboard visible" by $(.dashboard) is visible

verify "dashboard visible"
by $(.dashboard) is visible

verify "authenticated state"
by all {
    $(.dashboard) is visible,
    $(.avatar) is visible
}

verify "any issue present"
by any {
    $(.error) is visible,
    $(.warning) is visible
}
```

#### `log`
Records a diagnostic message to the run log. Does not affect test results.
```
log "message"
log vars.value
log "value is " .. vars.x
```

---

### Lifecycle

#### `delete`
Remove a named event handler, after, timer, or DOM element.
```
delete handler
delete $(SELECTOR)
delete ref
```

---

### Page and Tab Management

#### `new tab`
Opens a new tab and returns a reference.
```
myTab = new tab
within myTab {
    navigate to "https://example.com"
}
```

#### `new session` / `new incognito`
Opens a new isolated browser context. No shared cookies, storage, or auth state. `session` is the canonical term, `incognito` is an alias.
```
guest = new session
guest = new incognito    // alias

within guest {
    navigate to vars.baseUrl
    verify "no session leak" by $(.dashboard) is missing
}
```

#### Tab, Popup, and Download Captures
Capture a reference produced by an action, or await the next occurrence of an event.

```
reportTab = tab from click $(SELECTOR)           // tab produced by this action
previewWindow = popup from click $(SELECTOR)
file = download from click $(SELECTOR)
tab3 = next tab opened                           // awaitable — next tab regardless of cause
```

#### `close`
```
close tab
close popup
```

#### `resize`
```
resize tab to 1280px 720px
resize tab to 1920px 1080px
```

---

### Utility

#### `wait until`
Blocking — suspends execution until a condition is met or an event fires.

```
wait until $(.result) is visible
wait until $(.spinner) is missing
wait slowly until $(.spinner) is missing
wait until next tab opened
wait until next tab closed
wait until next popup opened
wait until next network request
wait until next network response
wait until next download completed
wait until next navigation url
wait until next navigation hash
wait until next after expired
```

`wait until CONDITION` — polls until condition is true.
`wait until next CHANNEL EVENT` — `next` is a grammar token signalling that what follows is a channel event, not a condition. Suspends until the event fires, then continues. One shot — does not stay subscribed. Fires after all active listeners for that event have completed.

---

## Assignment

Left-hand assignment stores references, values, functions, and event handlers.

```
modal = find $(.modal)
items = find every $(.list-item)
reportTab = tab from click $(.open-report)
previewWindow = popup from click $(.preview)
tab3 = next tab opened
title = $(.heading).text
handler = after network response run handleResponse()
context = load setup()
```

---

## Property Access

Access properties of element refs, collections, and variables. Two equivalent forms:

### Dot Notation
```
item.text
item.value
item.html
item.parent
item.children
item.attribute("data-value")
items.first
items.last
items.length
items[0]
vars.user.name
```

### Possessive
```
item's text
item's value
item's html
item's parent
item's children
item's attribute "data-value"
$(.price)'s attribute "data-value"
$(.list)'s children
vars's user's name
```

### Element Ref Properties

| Property | Returns |
|----------|---------|
| `text` | Visible text content |
| `value` | Input or select value |
| `html` | Inner HTML |
| `parent` | Parent element ref |
| `children` | Array of child element refs |
| `attribute("name")` | Attribute value |

### Collection Properties

| Property | Returns |
|----------|---------|
| `first` | First element ref |
| `last` | Last element ref |
| `length` | Number of elements |
| `[index]` | Element ref at index |

> `vars's user's name` is fully supported. You're welcome.

---

## Strings

### Plain Strings

Double quoted. `{` is always literal.

```
"Hello world"
"{ this is literal }"
```

### Concatenation

`..` joins strings. `+` is numeric arithmetic only.

```
"Hello " .. vars.username
"Page: " .. vars.page .. " of " .. vars.total
```

> Complex string manipulation belongs in a JS function.

> Template strings are deferred — fence syntax undecided.

---

## Values and Expressions

### Types

- **String** — `"value"`
- **Number** — `42`, `3.14`
- **Boolean** — `true`, `false`
- **Null** — `null`
- **Array** — `[1, 2, 3]`
- **Object** — `{ key: "value" }`

### Operators

```
+ - * /
< <= > >= == !=
```

### Logical Grouping

`any` and `all` for multi-condition expressions. Conditions are comma separated.

```
any {
    CONDITION,
    CONDITION,
    CONDITION
}

all {
    CONDITION,
    CONDITION
}
```

---

## Variables

`vars` is the reserved runtime variables object. Accessed via dot notation or possessive.

```
vars.username
vars.deadline
vars's baseUrl
```

User-defined names from assignment are bare words:

```
email = find $([name="email"])
title = $(.heading).text
```

---

## Prepositions

Two prepositions with distinct meanings used consistently throughout the language:

| Preposition | Meaning | Example |
|-------------|---------|---------|
| `in` | Scope — where to search or operate | `type "value" in $(SELECTOR)` |
| `to` | Destination — where something is going | `drag $(SELECTOR) to $(SELECTOR)`, `scroll to bottom` |

Reserved location keywords — `top`, `bottom`, `left`, `right` — can be used anywhere a destination selector is accepted:

```
scroll to bottom
scroll to top in $(.container)
```

Modifiers always appear immediately after the verb's value or target, before any preposition that follows. Verbs with no value of their own, like `scroll`, take the modifier right after the verb instead:

```
type "value" slowly in $(SELECTOR)
drag $(SELECTOR) smoothly to $(SELECTOR)
scroll slowly to $(SELECTOR) in $(SELECTOR)
```

---

## Statement Termination

Every statement begins with a keyword or an assignment. A new line that starts with a keyword or assignment begins a new statement. A new line that starts with anything else — a value, expression, or `$()` selector — is a continuation of the previous statement.

```
// single line
type vars.username in $([name="email"])

// multi-line — continuation lines do not start with a keyword or assignment
type vars.username
    in $([name="email"])

// expression continuation
if vars.count
    + vars.offset > 10
    click $(.load-more)
```

---

## Control Flow

### Implicit Context

The implicit root context is always the first page. `within` blocks are temporary — context returns to root when the block closes.

### `within`

Sets a default element, frame, tab, or page context.

Single statement — no brackets:

```
within $(.sidebar) click $(.dashboard-link)
```

Multiple statements — brackets required:

```
within $(.sidebar) {
    click $(.dashboard-link)
    click $(.settings-link)
}
```

### `in`

Inline suffix to override context for a single action. Chainable left-to-right.

```
click $(.submit) in $(.modal)
click $(.submit) in $(.form) in $(.modal)
```

Also used for scoped element traversal:

```
link = find $(a) in $(.nav) in $(.header)
```

### `if` / `else`

Brackets optional for single statements.

```
if $(.banner) is visible click $(.dismiss)

if $(.banner) is visible {
    click $(.dismiss)
} else {
    log "no banner"
}
```

### `while`

Repeat while condition is true. Brackets required for multiple statements. Single statement body can appear on the next line.

```
while $(.spinner) is visible
    click $(.retry)

while $(.spinner) is visible {
    click $(.retry)
    log "retrying"
}
```

### `until`

Repeat until condition becomes true. Inverse of `while`. Brackets required for multiple statements. Single statement body can appear on the next line.

```
until $(.result) is visible
    click $(.retry)

until $(.result) is visible {
    click $(.retry)
    log "waiting for result"
}
```

### `for`

Iterate over collections, objects, or ranges. Like `while`, `until`, and `within` — a preposition that sets up a scoped block. Single variable receives the value. Two variables receive key and value.

```
for item in items {
    click item
}

for key, value in vars.config {
    log key
    log value
}

for i in range 0 to 100 {
    log i
}

for i in range 0, +4 to 100 {
    log i
}

for i in range 100, -2 to 0 {
    log i
}
```

Nested iteration — use distinct variable names:

```
for section in sections {
    for i, link in section.children {
        log "Section " .. section .. " link " .. i
    }
}
```

Use `stop` to exit the loop early, `skip` to move to the next iteration:

```
for item in items {
    if item is hidden
        skip
    if item has class "done"
        stop
    click item
}
```

### `scope` / `this`

`scope` and `this` are aliases for the same thing — the active context within the current `within` stack frame. Assigning to either updates the active context. Reading either returns the current context as an element reference.

`within` still handles frame lifecycle — when a `within` block closes, scope automatically restores to what it was before. `scope` lets you move around dynamically within a frame without manual stack management.

```
scope = $(.modal)           // set active context in current frame
type "value" in $([name="email"])
click $(.submit)

scope = null                // reset to root
```

Save and restore within a frame:

```
within $(.modal) {
    prev = scope            // save current frame scope
    scope = $(.form)        // move context within the frame
    type "value" in $([name="email"])

    scope = prev            // restore within same frame
    click $(.close)
}
// frame closes, scope automatically returns to pre-within context
```

As a stored reference — `scope` is just a variable:

```
modal = $(.modal)
form = $(.form)

scope = modal
type "value" in $([name="email"])

scope = form
click $(.submit)
```

`within` vs `scope`:

- `within` — known boundary, self-contained, automatic cleanup, visually clear
- `scope` — dynamic context switching within a frame, save/restore, loop-friendly

### `within every`

Explicitly iterates over a collection, running the block for each item. Distinct from `within` which scopes to a single element.

```
items = find every $(.list-item)
within every items {
    click $(.expand)
}
```

`within` without `every` always operates on a single element. Using `within every` makes iteration intent explicit and avoids debugging surprises.

---

## `verify`

Records a condition result and returns a boolean. Always continues — pass or fail. Label comes first as the claim, `by` introduces the condition as the proof. Without a label the condition source is used in the report.

```
verify $(.dashboard) is visible

verify "dashboard visible"
by $(.dashboard) is visible

verify "authenticated state"
by all {
    $(.dashboard) is visible,
    $(.avatar) is visible,
    $(.nav) is visible
}
```

The two-line form — label on one line, `by` on the next — is the recommended style. It reads like structured documentation and makes complex conditions easy to scan.

`verify` can only appear as a standalone statement, wrapped by `must`/`mustn't`, or as an `if` condition — not as a general sub-expression (inside an assignment, an array, arithmetic, and so on).

Because `verify` returns a boolean, it can be used directly in `if` for branching on the result. `can` is a superficial affirmative — identical to a bare `verify`, provided only for symmetry with `cant`/`can't`. `cant` and `can't` are aliases that negate the result — true when the check fails. This negates the check result, not the condition itself.

```
if verify "login visible" by $(.login) is visible
    run loginFlow()

if can verify "login visible" by $(.login) is visible
    run loginFlow()

if cant verify "user visible" by $(.user) is visible {
    log $(.profile).html
    dev exit(2)
}

if can't verify "user visible" by $(.user) is visible {
    log $(.profile).html
    dev exit(2)
}
```

## `must`

Requires a statement to succeed. If it fails, the current suite stops immediately. Works with any statement — `verify`, `click`, `run`, `navigate`, `find`, and others. Use `must verify` when no custom failure path is needed. Use `if cant verify` when you need to control what happens on failure.

```
must verify "submit enabled"
by $(.submit) isnt disabled

must click $(.submit)
must run login(vars.username, vars.password)
must navigate to vars.baseUrl
must find $(.modal)
must verify "authenticated state"
by all {
    $(.dashboard) is visible,
    $(.avatar) is visible
}
```

`mustn't` and `mustnt` are aliases for the inverse — the suite stops if the wrapped statement *succeeds* instead of fails. They compose with `verify`, `run`, and any action the same way `must` does:

```
mustn't verify "error banner visible"
by $(.error-banner) is visible

mustn't find $(.modal)
```

That's legal for any statement `must` accepts, but only reliably meaningful for `verify`, where "succeeded" is an unambiguous boolean. For an action or `run`, "succeeded" just means "didn't throw" — `mustn't find $(.modal)` parses and stops the suite if the element is found, but `mustn't click $(.btn)` doesn't express anything most scripts would actually want.

Without `must`, errors are catchable by `try`. With `must`, failure stops the current suite regardless of surrounding `try` blocks.

---

## State Conditions

Boolean predicates for use in `verify`, `if`, `while`, `until`, `any`/`all`.

### `is` / `isnt` / `isn't`

`isnt` and `isn't` are aliases.

| Condition | Meaning |
|-----------|---------|
| `is visible` | In DOM and not hidden by CSS |
| `is hidden` | In DOM but hidden |
| `is inview` | Visible and within the viewport |
| `is enabled` | Not disabled |
| `is disabled` | Disabled |
| `is checked` | Checkbox or radio is checked |
| `is focused` | Currently has focus |

### `has` / `hasnt` / `hasn't`

`hasnt` and `hasn't` are aliases.

| Condition | Meaning |
|-----------|---------|
| `has text "value"` | Text content matches |
| `has value "value"` | Input or select value matches |
| `has class "name"` | Has CSS class |
| `has attribute "name"` | Has attribute present |

### Existence

| Condition | Meaning |
|-----------|---------|
| `is missing` | Not in the DOM, or null variable |
| `isn't missing` | In the DOM, or non-null variable |

### Note on `is visible` vs `is inview`

`is visible` means rendered and not hidden by CSS. `is inview` means visible and within the viewport. The distinction matters for accessibility testing — an element can be visible in the DOM but scrolled out of the viewport.

### Custom State Functions

Custom states extend the `is` and `has` namespaces. Dot notation on the name keeps `is` and `has` as grammar-clean keywords — `define is function visible(){}` would be ambiguous.

`is`/`isnt`/`isn't` — element passed as `this`, no arguments:

```
define browser js is.admin() {
    return this.classList.contains("admin-user")
}

verify "user is admin" by $(.user) is admin
verify "user is not admin" by $(.user) isnt admin
verify "user is not admin" by $(.user) isn't admin
```

`has`/`hasnt`/`hasn't` — element passed as `this`, argument as first param:

```
define browser js has.permission(level) {
    return this.dataset.permissions.includes(level)
}

verify "can delete" by $(.btn) has permission "delete"
verify "cannot admin" by $(.btn) hasnt permission "admin"
verify "cannot admin" by $(.btn) hasn't permission "admin"
```

---

## Execution Control

### `stop suite`

Stops the current suite immediately and marks it failed. Sibling and parent suites continue.

```
stop suite
```

### `stop app`

Stops the entire run immediately. Exits with code 1.

```
stop app
```

### `dev exit(N)`

Stops the entire run with a specific exit code. For CI and tooling integration. Only meaningful in infrastructure — not expected in script-layer test suites.

```
dev exit(1)
dev exit(2)
```

## `dev`

Built-in invocation keyword for developer and tooling tools. Parallel to `run` but targets a fixed built-in namespace — not user-extensible. Not expected in script-layer test suites.

```
dev exit(1)         // stop with specific exit code
dev trace()         // emit diagnostic trace
dev throw()         // throw a catchable error — for use inside function definitions
```

`dev throw()` is the infrastructure equivalent of the old `fail` — available to developers writing functions that need to signal a catchable error. Not appropriate in the script layer.

---

## Execution — `run`, `try`, `load`

All three share the same shape:

```
(run|try|load) [in BROWSER|TAB_REF|globally] (NAME|js|javascript|{})
```

| Verb | Behavior | Returns |
|------|----------|---------|
| `run` | Isolated execution. No inherited listeners or scheduled afters. | value |
| `try` | Same as `run` but swallows errors. Optional `after error` handler. | value |
| `load` | Attaches listeners and timeout to current scope. | context object |

Named functions defined with `define browser ...` run in browser context automatically — no `in browser` needed at the call site. `in browser` at the call site is for anonymous JS blocks only. `in TAB_REF` targets a specific tab reference. `globally` (load only) attaches to the global scope.

### Examples

```
- note: run — isolated, done and gone
run login(vars.username, vars.password)
run handleResponse()
run in browser js { return document.title }
run in tab2 js { return window.scrollY }

- note: run block — isolated scope with handlers
run {
    after next 30s stop app

    after popup opened {
        click $(.special-accept)
    }

    click $(.submit)
}

- note: try — swallows errors silently
try {
    click $(.might-not-exist)
}

- note: try with error handler
try {
    click $(.might-not-exist)

    after error {
        log "element not found, continuing"
    }
}

- note: load — attaches to current scope, returns context
context = load init()
context = load globally init()

context.value                          // function return value
context.handlers                       // all registered handlers — event listeners and afters

delete context.handlers.heartbeat      // cancel a specific after
delete context.handlers.popupHandler   // remove a specific listener
```

### Coexisting Timeouts

Timeouts never overwrite — they coexist. First to fire wins.

```
run {
    after 60s stop app

    context = load init()     // init adds its own after — both race
    delete context.handlers.initTimeout    // cancel init after, outer 60s unaffected
}
```

### `after` / `before` inside blocks

`after` and `before` handlers inside a block are hoisted to block start, prepend to the handler list (taking higher priority than global handlers), and are deregistered when the block ends. Global handlers still fire unless `stop event` is called. Use `now after` / `now before` to register at the exact point of declaration instead.

---

## `after`, `after every`, and `new timer`

### `after`

Schedules an action after a duration. Non-blocking — execution continues immediately. Multiple `after` statements coexist independently.

```
after 30s stop app
after 1m run cleanup()
after 20s log "still running"
after 30s run in browser js { window.scrollTo(0, 0) }
after 30s {
    log $(.error).html
    stop app
}

- note: assignable for cancellation or restart
x = after 30s run cleanup()
delete x
restart x                       // resets duration back to full 30s
```

`after` replaces `timeout`. The consequence is declared inline rather than wired through a handler.

`context.handlers` — unified dictionary of all registered handlers (event listeners and afters) attached by a `load`ed function.

### `after every`

Recurring interval — fires repeatedly until deleted. Same shape as `after`, `every` makes it repeat.

```
after every 30s run heartbeat()
after every 10s log "still running"
x = after every 30s run poll()
delete x                        // stops the interval
restart x                       // resets current cycle back to full duration
```

### `new timer`

A duration value that starts ticking from 0 when created. Just a number — no scope attachment, no surfacing in `context`. You own it entirely.

```
a = new timer
click $(.submit)
wait until $(.result) is visible
log "took " .. a
verify "submission under 2s" by a < 2s
restart a                       // resets to 0
```

### `restart`

Resets an `after` back to its full duration, or a `timer` back to 0.

```
restart x
restart a
```

---

## Event Listeners

### `after` / `before`

`after` and `before` declare event handlers. Declarations are non-blocking — registering a handler does not pause the main flow.

Multiple declarations on the same channel event append to an ordered list. When the event fires, the before list runs sequentially, the event completes, then the after list runs sequentially:

```
before b1 → before b2 → EVENT → after a1 → after a2 → ...
```

Default is **continuous** — stays subscribed until deleted. `next` makes it one-shot. `every` is explicit continuous, identical to bare.

```
- note: continuous (default)
after popup opened close popup
after dialog opened click $(.dismiss)
after network response run handleResponse()

- note: one-shot
after next popup opened click $(.accept)

- note: before — where the event supports interception
before tab closed run cleanup()
before navigation url log "navigating"

- note: assignable for deletion
handler = after tab opened {
    within this {
        click $(.accept)
        close tab
    }
}

delete handler
```

`after` and `before` with time — `next` or `every` converts a duration into an event:

```
after next 30s stop app              // fires once after 30s
after every 30s run heartbeat()   // fires every 30s
```

### Channels and Events

Events are organized into channels. A channel is a source of events — like a topic you subscribe to. Each channel carries specific events.

| Channel | Events |
|---------|--------|
| `tab` | `opened`, `closed` |
| `popup` | `opened`, `closed` |
| `dialog` | `opened`, `closed` |
| `download` | `started`, `completed` |
| `network` | `request`, `response` |
| `navigation` | `back`, `forward`, `url`, `hash` |
| `after` | `expired`, `cancelled`, `restarted` |

Not all channels support `before`. `before` is meaningful where an event can be intercepted before it completes — tab and popup closing, navigation. Filtering events (e.g. by URL or status) is done inside the handler body, not in the subscription syntax.

> Future consideration: filter syntax for `wait until next` to fine-tune event matching.

### `after` vs `wait until next`

- `after EVENT` — **continuous**. Non-blocking declaration. Fires every time, stays subscribed until deleted.
- `after next EVENT` — **one-shot**. Non-blocking declaration. Fires once then unsubscribes.
- `wait until next EVENT` — **blocking**. Suspends execution until the event fires. Runs after the after list completes.

### `stop event`

Stops propagation in the current handler. When called, no further handlers in the list fire for that event occurrence. Only meaningful inside `after` or `before` handler bodies.

```
after popup opened close popup              // global — fires unless propagation is stopped

run {
    after popup opened {
        click $(.special-accept)
        stop event                          // global handler won't fire for this occurrence
    }
    click $(.submit)
}
```

`stop event` is distinct from `stop`, which exits a `for`, `while`, or `until` loop. The two-word form is required — a `stop` inside a handler still means loop break, not propagation stop.

---

## `define`

Universal declaration keyword. Definitions are hoisted — they can be used anywhere in the file regardless of where they are declared. If a definition references another definition, it must appear after the one it references.

```
define [NAMESPACE] [CONTEXT] [LANG] NAME(args) {}
define NAMESPACE NAME = {}
```

| Component | Values | Notes |
|-----------|--------|-------|
| `NAMESPACE` | `behavior`, `is.`, `has.` | scopes the definition |
| `CONTEXT` | `browser` | execution environment — baked into definition |
| `LANG` | `function`, `js` | body language |

All components are optional and compose freely.

### Native functions

```
define function login(email, password) {
    type email in $([name="email"])
    type password in $([name="password"])
    click $(.btn-submit)
}

define function checkDashboard() {
    verify "dashboard visible" by $(.dashboard) is visible
    verify "avatar visible" by $(.avatar) is visible
}
```

### JS functions

`this` is always set by the runtime — never passed as an argument. In an `after`/`before` block `this` is the event payload. In the main flow `this` is the current page or `within` context.

```
define js handleResponse(page) {
    // this = event payload or current context
    // page = explicitly passed
}
```

### Browser-context functions

`browser` bakes the execution context into the definition. Call site does not repeat it — `run NAME` works regardless of where the function runs.

```
define browser js handleResponse(page) {
    // runs in browser page context
}

define browser function login(email, password) {
    // Writ&Spec statements translated for browser execution
}
```

### Anonymous JS blocks

Anonymous blocks specify context at the call site:

```
run in browser js {
    return document.title
}

run in tab2 js {
    return window.scrollY
}
```

Inline in a handler:

```
after network response {
    run in browser js {
        - note: this = response event
    }
}
```

> Variable injection in anonymous blocks is not supported. Use a named `js` function with explicit arguments instead.

### Invocation

All named functions invoked with `run` (isolated) or `load` (attaches to current scope):

```
run login("user@example.com", "secret")
run handleResponse()
run handleLayout(sidebar, modal)
context = load login("user@example.com", "secret")
context = load handleResponse()
```

---

## Behavior

Named profiles that humanize action execution — controlling timing, mouse path, or both. Applied as bare word adverbs between the verb and selector. Since selectors are always `$()` delimited, a bare word before `$()` is always unambiguously a behavior profile reference.

### Config profile

All properties are optional and merged with runtime defaults.

```
define behavior slowly = {
    action: {
        delay:    { min: 10ms,  max: 50ms,  target: 30ms,  spread: 0.3, variation: 0.1 },
        interval: { min: 150ms, max: 350ms, target: 200ms, spread: 0.5, variation: 0.3 }
    },
    path: {
        delay:    { min: 0ms,   max: 100ms, target: 50ms,  spread: 0.2, variation: 0.1 },
        interval: { min: 8ms,   max: 16ms,  target: 12ms,  spread: 0.2, variation: 0.1 },
        width:    { min: 0px,   max: 30px,  target: 10px,  spread: 0.4, variation: 0.2 },
        speed:    { min: 200px, max: 800px, target: 400px, spread: 0.3, variation: 0.1 },
        transition: { curve: ease-in-out }
    }
}
```

Simple profiles only specify what they need:

```
define behavior fast = {
    action: {
        interval: { target: 20ms }
    }
}
```

#### Sections

**`action`** — discrete subactions: keystrokes, double-click gap, button press timing.

**`path`** — continuous mouse movement: drag, hover, click travel.

**`click`** / **`type`** — per-verb overrides of `action`. Use when typing rhythm should differ from click timing.

```
define behavior humanTypist = {
    action: {
        interval: { target: 200ms, spread: 0.4, variation: 0.3 }
    },
    type: {
        interval: { target: 160ms, spread: 0.5, variation: 0.4 }
    }
}
```

#### Distribution fields

All distribution fields are optional.

| Field | Meaning |
|-------|---------|
| `target` | Central / desired value |
| `min` | Hard floor |
| `max` | Hard ceiling |
| `spread` | How distributed values are across the min/max range |
| `variation` | How random values can be |

#### `transition`

Controls the velocity curve of mouse movement along a path.

```
transition: { curve: ease-in-out }
```

Standard curve names: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`.

> Weight and fuzzed transition values are a future consideration.

> Inheritance between behavior profiles is a future consideration — one profile extending another via spread or similar syntax.

### Callable profile

For dynamic profiles that compute path waypoints from arguments, or that need browser context (e.g. viewport dimensions):

```
define behavior js customPath(start, end) {
    // return [{ x, y, ms }, ...]
}

define browser behavior js smoothly(start, end) {
    // viewport-aware path calculation
    // return [{ x, y, ms }, ...]
}
```

### Usage

Referenced as a bare word adverb right after the verb's value or target selector. A profile can carry both `action` and `path` properties — the runtime applies whichever are relevant to the verb.

```
type "value" slowly in $([name="email"])
double click $(.btn) slowly
drag $(.item) slowly to $(.target)
hover $(.menu) slowly
double click $(.btn) smoothly slowly
```

### Click modifiers

Bare keywords before `click`. Not behavior profiles — these are action type qualifiers.

```
left click $(.btn)
right click $(.btn)
middle click $(.btn)
double click $(.btn)
```

---

## Units of Measurement

Units of measurement are numbers with an attached unit. They participate in expressions like any other value. Two families are supported — time and distance. Cross-family arithmetic (`1h + 10px`) is a runtime type error.

### Time

Base unit is `ms`. Mixed units resolve to the smallest unit present to avoid fractions — `1h + 30m` resolves to `90m`.

Shorthand and natural language forms are valid and can be mixed. Spaces between number and unit are allowed. Singular and plural are both valid. Order is not enforced.

| Unit | Shorthand | Natural Language |
|------|-----------|-----------------|
| Millisecond | `ms` | `millisecond`, `milliseconds` |
| Second | `s` | `second`, `seconds` |
| Minute | `m`, `min` | `minute`, `minutes` |
| Hour | `h`, `hr` | `hour`, `hours` |

```
400ms
400 ms
30 seconds
1h 30m
1 hour 30 minutes
2h 30m 15s 400ms
30s * 2
vars.baseTimeout + 30s
```

Time applies in:

- `after DURATION (stop|dev|run...|{})`
- Behavior profile properties — `speed`, `noise`, `jitter`

### Distance

Base unit is `px`. Physical units (`cm`, `mm`, `in`) are accepted and resolved at runtime against the browser context — resolution depends on the device's DPI and may vary.

| Unit | Shorthand | Notes |
|------|-----------|-------|
| Pixel | `px` | Base unit, always concrete |
| Centimetre | `cm` | Runtime resolved |
| Millimetre | `mm` | Runtime resolved |
| Inch | `in` | Runtime resolved |

```
10px
5cm
movementJitter = 10px
movementJitter = 1cm
```

> `em`, `rem`, `vw`, `vh` — future consideration.

Distance applies in:

- Behavior profile properties — `movementJitter`, `timingJitter`

---

## Comments

### Inline
Single line. The `- note:` prefix is visually distinct when scanning a file.
```
- note: quick inline comment
```

### Block
Multi-paragraph notes for documentation, context, or plain language descriptions. Everything between `--- note:` and `---` is a comment.

```
--- note:
This test verifies that a logged-in user can access the dashboard.

It covers the happy path only. Error states are covered in the
Authentication > Error States suite.

Written by QA team, reviewed by product.
---
```

Block notes can appear anywhere in a file — before a suite, between actions, at the top of an imported function file.

Two levels of comment intentionally — inline for quick annotation, block for documentation that deserves space.

---

## Test Structure

### `test suite`

Named grouping of actions and verifications. Nestable. No lifecycle hooks — setup and teardown are scaffolding concerns handled outside the language.

```
test suite "Login Flow" {

    test suite "Happy Path" {
        navigate to "https://example.com"
        type "user@example.com" in $([name="email"])
        type "secret" in $([name="password"])
        click $(.btn-submit)

        must verify "authenticated state"
        by all {
            $(.dashboard) is visible,
            $(.welcome-msg) has text "Welcome",
            $(.avatar) is visible
        }
    }

    test suite "Error States" {
        navigate to "https://example.com"
        type "user@example.com" in $([name="email"])
        type "wrong" in $([name="password"])
        click $(.btn-submit)

        verify "error message shown" by $(.error-msg) is visible
        verify "can retry" by $(.btn-submit) is enabled
    }

}
```

### Reporter Events

Three events with a consistent payload shape. `suite:update` and `suite:end` both carry the full results set — pending results are undefined.

| Event | Payload |
|-------|---------|
| `suite:start` | name, nesting depth |
| `suite:update` | current action, full results set (pending undefined) |
| `suite:end` | name, nesting depth, duration, full results set |

---

## Output Formats

### Text Table

```
Login Flow > Happy Path
| Assertion            | Success | Relative | Absolute | Error             |
|----------------------|---------|----------|----------|-------------------|
| form submitted       | true    | 567ms    | 567ms    |                   |
| dashboard visible    | true    | 342ms    | 909ms    |                   |
| error message shown  | false   | 89ms     | 998ms    | element not found |
```

### JSON

Consistent node shape throughout. `type` disambiguates suites from assertions.

```json
{
  "name": "Login Flow",
  "type": "suite",
  "duration": { "relative": 1203, "absolute": 1203 },
  "results": [
    {
      "name": "Happy Path",
      "type": "suite",
      "duration": { "relative": 890, "absolute": 890 },
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
  ]
}
```

**`duration.relative`** — time since previous assertion or suite start, in ms.
**`duration.absolute`** — time since suite start, in ms.
**`success`** — boolean.
**`error`** — null on success, error message string on failure.

---

## WIP: File Management

> Download, upload, and screenshot are not yet fully specced. The following open questions need to be resolved before these verbs are finalized.

### Open Questions

**File references** — is a downloaded file a first class reference? If so, what properties does it carry — `name`, `path`, `size`, `mimeType`?

**Upload** — does it accept a file reference from a previous download, or only a path string?

**Screenshot** — does it return a reference? How does it appear in reports — inline image, attachment, or link?

**Persistence** — are files attached to the nearest `verify` result, the suite, or explicitly attached by the author?

**Reporting** — does the reporter receive a dedicated `file` event, or are files metadata on existing events?

### Current Placeholder Syntax

```
- note: download
file = download

- note: upload
upload "path/to/file" to $(SELECTOR)
upload vars.filePath to $(SELECTOR)

- note: screenshot
screenshot
screenshot as "label"
screenshot $(SELECTOR)
screenshot $(SELECTOR) as "label"
```

---

## Project Naming

| | Name |
|-|------|
| Language | *(unnamed)* |
| Platform | Writ&Spec |
| Package / repo | `writ-and-spec` |
| File extension | `.was` |

*Open questions: simpler selector syntax for non-technical users*
