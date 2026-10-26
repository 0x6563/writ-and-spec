# Writ&Spec Comprehensive Example

*Save as `.was`*

```
import "shared/functions"
import "shared/intervals"

--- note:
This file demonstrates every language construct.
Infrastructure is defined at the bottom and hoisted automatically.
Consumers only need to read the test suites at the top.
---

- note: runtime variables
vars.baseUrl = "https://example.com"
vars.username = "user@example.com"
vars.password = "secret"
vars.baseTimeout = 30s

- note: global event handlers
after popup opened close popup
after dialog opened click $(.dismiss)
after network response run handleResponse()

- note: continuous handler — assigned for later deletion
handler = after tab opened {
    within this {
        click $(.accept)
        close tab
    }
}

--- note:
Test Suites
All infrastructure is declared below and hoisted.
Consumers write and own this section.
---

test suite "Application" {

    test suite "Authentication" {

        test suite "Happy Path" {

            navigate to vars.baseUrl
            run login(vars.username, vars.password)

            must verify "authenticated state"
            by all {
                $(.dashboard) is visible,
                $(.avatar) is visible,
                $(.nav) is visible
            }

            - note: property access both forms
            title = $(.heading).text
            welcome = $(.welcome)'s text
            log "Page title is " .. title

            - note: state conditions
            verify "dashboard visible" by $(.dashboard) is visible
            verify "submit enabled" by $(.submit) isnt disabled
            verify "submit enabled — alias" by $(.submit) isn't disabled
            verify "banner in viewport" by $(.banner) is inview
            verify "no modal on load" by $(.modal) is missing
            verify "username set" by vars.username isn't missing

            - note: custom state functions
            verify "user is admin" by $(.user) is admin
            verify "can edit" by $(.btn) has permission "edit"

            - note: has / hasnt / hasn't
            verify $(.error) hasnt text "Invalid"
            verify $(.error) hasn't text "Invalid"
            verify $(.btn) hasnt class "disabled"
            verify $(.input) has value "user@example.com"

        }

        test suite "Error States" {

            navigate to vars.baseUrl
            run login(vars.username, "wrongpassword")

            verify "error shown" by $(.error-msg) is visible
            verify "correct error message"
            by $(.error-msg) has text "Invalid password"
            verify "can retry" by $(.btn-submit) is enabled

        }

        test suite "Session Isolation" {

            must run login(vars.username, vars.password)
            must verify "logged in"
            by $(.dashboard) is visible

            - note: new session is canonical, incognito is alias
            guest = new session
            within guest {
                navigate to vars.baseUrl
                verify "guest cannot see dashboard" by $(.dashboard) is missing
                verify "guest sees login form" by $(.login-form) is visible
                close tab
            }

            - note: incognito alias
            guest2 = new incognito
            within guest2 {
                navigate to vars.baseUrl
                verify "guest2 cannot see dashboard" by $(.dashboard) is missing
                close tab
            }

        }

    }

    test suite "Navigation" {

        - note: tab produced by action
        reportTab = tab from click $(.open-report)
        within reportTab {
            verify "report loaded" by $(.report-heading) is visible
            close tab
        }

        - note: popup produced by action
        previewWindow = popup from click $(.preview)
        within previewWindow {
            verify "preview loaded" by $(.preview-content) is visible
            close popup
        }

        - note: non-deterministic — capture next tab regardless of trigger
        - note: awaitable — next tab regardless of cause
        tab3 = next tab opened

        - note: new tab
        myTab = new tab
        within myTab {
            navigate to vars.baseUrl
            verify "home loaded" by $(.home) is visible
            close tab
        }

        - note: navigate in tab
        navigate to vars.baseUrl in reportTab

        - note: resize tab
        resize tab to 1280px 720px

        - note: browser history
        navigate to vars.baseUrl
        click $(.about-link)
        navigate back
        navigate forward
        navigate reload

        - note: wait for navigation events
        wait until next navigation url
        wait until next navigation hash

    }

    test suite "Forms" {

        navigate to vars.baseUrl

        - note: typing with interval modifier
        type "hello world" slowly in $([name="search"])

        - note: focus and press work together
        focus $([name="email"])
        press Tab
        focus $(.btn-submit)
        press Enter
        blur $(.btn-submit)
        unfocus $(.btn-submit)

        - note: click variants
        left click $(.btn)
        right click $(.context-menu-target)
        double click $(.expand)
        double click $(.expand) slowly

        - note: movement modifier
        hover $(.tooltip-target) smoothly
        drag $(.draggable) smoothly to $(.droptarget)

        - note: keyboard
        press Escape
        press "Control+c"

        - note: field operations
        clear $([name="search"])
        upload vars.filePath to $([type="file"])

        - note: scroll to selector or location
        scroll to $(.results)
        scroll to $(.results) in $(.container)
        scroll slowly to $(.results) in $(.container)
        scroll to bottom
        scroll to bottom in $(.container)
        scroll to top
        scroll to left
        scroll to right

        - note: within scoping
        within $(.modal) {
            type vars.username in $([name="email"])
            click $(.submit) in $(.form)
        }

        - note: scope for dynamic context switching — avoids within hell
        scope = $(.modal)
        type "value" in $([name="email"])
        click $(.submit)

        - note: save and restore scope within a within block
        within $(.modal) {
            prev = scope
            scope = $(.form)
            type "value" in $([name="email"])
            scope = prev
            click $(.close)
        }

        scope = null

        - note: scoped find via in
        link = find $(a) in $(.nav) in $(.header)
        verify "header nav link found" by link isn't missing

    }

    test suite "Collections" {

        items = find every $(.list-item)
        total = items.length
        log "Found " .. total .. " items"

        - note: within all for explicit iteration
        within every items {
            verify this is visible
        }

        - note: for over collection
        for item in items {
            verify "item visible" by item is visible
            log item.text
        }

        - note: for over range
        for i in range 0 to 10 {
            log i
        }

        - note: for over range with interval
        for i in range 0, +4 to 100 {
            log i
        }

        for i in range 100, -2 to 0 {
            log i
        }

        - note: for over object with key and value
        for key, value in vars.config {
            log key
            log value
        }

        - note: nested for
        sections = find every $(.section)
        for section in sections {
            links = find every $(a) in section
            for i, link in links {
                log "Section " .. section .. " link " .. i
            }
        }

        - note: stop and skip
        for item in items {
            if item is hidden
                skip
            if item has class "done"
                stop
            click item
        }

        - note: collection property access
        first = items.first
        last = items's last
        third = items[2]

    }

    test suite "Control Flow" {

        - note: if / else
        if $(.banner) is visible
            click $(.dismiss)

        if $(.modal) is visible {
            click $(.close)
        } else {
            log "no modal"
        }

        - note: while
        while $(.spinner) is visible
            click $(.retry)

        while $(.spinner) is visible {
            click $(.retry)
            log "retrying"
        }

        - note: until
        until $(.result) is visible
            click $(.retry)

        until $(.result) is visible {
            click $(.retry)
            log "waiting for result"
        }

        - note: wtil condition
        wait until $(.result) is visible
        wait until $(.spinner) is missing

        - note: wait until event
        wait until next download completed
        result = next network response

        - note: any / all
        if any {
            $(.error) is visible,
            $(.warning) is visible
        } log "something is wrong"

        if all {
            $(.dashboard) is visible,
            vars.token isn't missing
        } {
            log "fully authenticated"
        }

        - note: multi-line statement — continuation is any line not starting with keyword or assignment
        type vars.username
            in $([data-testid="email"])

        if vars.count
            + vars.offset > 10
            click $(.load-more)

    }

    test suite "Time Units" {

        - note: shorthand
        after 30s stop app
        after 1h 30m stop app
        after 2 hours 30 minutes run cleanup()

        - note: expressions
        after vars.baseTimeout * 2 stop app
        after vars.baseTimeout + 30s run notifySlowness()

    }

    test suite "Error Handling" {

        - note: run block with timeout and scoped handlers
        run {
            after 30s stop app

            after popup opened {
                click $(.special-accept)
                
                - note: global `after popup opened close popup` won't fire
                stop event 
            }

            now after dialog opened {
                click $(.ok)
            }

            click $(.submit)
        }

        - note: load with context management
        context = load init()
        context = load globally setupGlobalHandlers()

        - note: coexisting timeouts — first fires wins
        run {
            after 1m stop app

            context = load init()
            - note: init adds its own timeout, both exist independently

            delete context.handlers.initTimeout
            - note: removed init timeout, outer 60s still active

            delete context.handlers.popupHandler
        }

        - note: try with optional error handler
        try {
            click $(.might-not-exist)
        }

        try {
            click $(.might-not-exist)

            after error {
                log "element not found, continuing"
            }
        }

        - note: must — stops suite if statement fails
        must click $(.critical-btn)
        must run login(vars.username, vars.password)
        must verify "dashboard visible"
        by $(.dashboard) is visible

        - note: authored termination
        stop suite
        stop app
        dev exit(1)
        dev exit(2)

        - note: cant verify — branch on check failure
        if cant verify "dashboard visible" by $(.dashboard) is visible {
            log $(.error).html
            dev exit(2)
        }

        - note: log
        log "reached this point"
        log vars.username

    }

    test suite "JS Escape Hatch" {

        - note: anonymous js in browser context
        title = run in browser js {
            return document.title
        }

        token = run in browser js {
            return window.localStorage.getItem("token")
        }

        - note: run named function — context from definition, no in browser needed
        run handleResponse()

        - note: run named function with explicit args
        sidebar = find $(.sidebar)
        modal = find $(.modal)
        run handleLayout(sidebar, modal)

        - note: anonymous js in handler
        after network response {
            run in browser js {
                - note: this = response event
            }
        }

        - note: custom movement via js
        drag $(.item) customMove to $(.target)

    }

    test suite "Strings" {

        plain = "Hello world"
        greeting = "Hello " .. vars.username
        page = "Page: " .. vars.page .. " of " .. vars.total

    }

}

- note: cleanup
delete handler

--- note:
Infrastructure
Everything below is hoisted. Consumers do not need to read this section.
Developers and AI maintain this layer.
---

- note: native functions

define function login(email, password) {
    type email in $([name="email"])
    type password in $([name="password"])
    click $(.btn-submit)
}

define function checkDashboard() {
    verify "dashboard visible" by $(.dashboard) is visible
    verify "avatar visible" by $(.avatar) is visible
}

- note: custom state functions

define browser js is.admin() {
    return this.classList.contains("admin-user")
}

define browser js has.permission(level) {
    return this.dataset.permissions.includes(level)
}

- note: js definitions

define js handleResponse(page) {
    - note: this = event payload or current context
}

define js handleLayout(sidebar, modal) {
    - note: explicit args
}

- note: behavior profiles

define behavior slowly = {
    action: {
        delay:    { min: 10ms,  max: 50ms,  target: 30ms,  spread: 0.3, variation: 0.1 },
        interval: { min: 150ms, max: 350ms, target: 200ms, spread: 0.5, variation: 0.3 }
    },
    path: {
        width:    { min: 0px,   max: 30px,  target: 10px,  spread: 0.4, variation: 0.2 },
        speed:    { min: 200px, max: 800px, target: 400px, spread: 0.3, variation: 0.1 },
        transition: { curve: "ease-in-out" }
    }
}

define behavior fast = {
    action: {
        interval: { target: 20ms }
    }
}

define behavior js customPath(start, end) {
    - note: return [{ x, y, ms }, ...]
}
```
