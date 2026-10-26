import { Browser } from "./browser";
import { CallExpression } from "typescript";
import type { Runtime } from "../types/runtime.ts";
import { TestSuite } from "./test-suite.ts";

export class Context {
    parent?: Context;
    browser: Browser;
    variables: { [key: string]: ScopeVariable };
    callstack: CallStackItem[];
    suite: TestSuite[];
    lifecycles: ContextLifecycle = { initialize: [], destroy: [] };

    constructor(parent: ContextConfig | Context) {
        this.parent = 'getScopeVariable' in parent ? parent : undefined;
        this.suite = parent.suite;
        this.callstack = parent.callstack;
        this.browser = parent.browser;
        this.variables = { ...parent.variables };
    }

    registerLifecycle(lifecycle: keyof ContextLifecycle, action: LifecycleAction) {
        this.lifecycles[lifecycle].push(action);
    }

    async destroy() {
        for (const action of this.lifecycles.destroy) {
            await action();
        }
    }

    defineVariable(name: string, value: Runtime.Value) {
        this.variables[name] = { value };
    }

    getVariable(key: string): any {
        return this.getScopeVariable(key)?.value;
    }
    setVariable(key: string, value: Runtime.Value) {
        if (key in this.variables) {
            this.variables[key].value = value;
        } else {
            this.defineVariable(key, value);
        }
    }

    getScopeVariable(key: string): ScopeVariable | undefined {
        return ((this.variables[key] || this.parent?.getVariable(key)));
    }

    fork() {
        return new Context(this);
    }

    static async Root(browser: Browser) {
        const context = new Context({ suite: [], callstack: [], variables: {}, browser });
        context.defineVariable('this', { type: 'value', value: await browser.tab() as any });
        context.defineVariable('is', { type: 'value', value: {} });
        context.defineVariable('has', { type: 'value', value: {} });
        return context;
    }

}

interface ContextConfig {
    browser: Browser;
    variables: { [key: string]: ScopeVariable };
    callstack: CallStackItem[];
    suite: TestSuite[];
}

export class CallStackItem {
    node: CallExpression;
    constructor(call: CallExpression) {
        this.node = call;
    }
}


export interface ScopeVariable {
    value: Runtime.Value;
}

interface ContextLifecycle {
    initialize: LifecycleAction[];
    destroy: LifecycleAction[];
}

type LifecycleAction = (() => Promise<void> | void);