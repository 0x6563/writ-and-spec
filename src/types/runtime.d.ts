import { Page, Locator, Response } from "playwright";
import type { AST } from "./ast.ts";
import type { Context as ContextClass } from '../runtime/context';
export namespace Runtime {
    namespace Expression {
        type Node = AST.Expression.Node | AST.Expression.Range | AST.Expression.Fragment.Step;
    }

    type Value = { type: 'value'; value: Runtime.NativeValue };

    type NativeValue =
        | string | number | boolean | null
        | Runtime.NativeValue[]
        | { [key: string]: Runtime.NativeValue }
        | ((...args: Runtime.NativeValue[]) => Runtime.NativeValue | Promise<Runtime.NativeValue>);


    type Context = ContextClass;
    
    interface Browser {
        tab: () => Promise<Runtime.BrowserInterface>;
        close: () => Promise<void>;
    }

    interface BrowserInterface {
        tab: () => Promise<Runtime.BrowserInterface>;
        session: () => Promise<Runtime.BrowserInterface>;
        locator: (selector: string) => Runtime.BrowserInterface;
        locatorAll: (selector: string) => Promise<Runtime.BrowserInterface[]>;
        click: (selector: string, options?: Parameters<Locator['click']>[0]) => Promise<void>;
        dblclick: (selector: string) => Promise<void>;
        hover: (selector: string) => Promise<void>;
        fill: (selector: string, value: string) => Promise<void>;
        dragAndDrop: (source: string, target: string) => Promise<void>;
        setInputFiles: (selector: string, files: Parameters<Locator['setInputFiles']>[0]) => Promise<void>;
        setViewportSize: (size: { width: number; height: number }) => Promise<void>;
        goto: (url: string, options?: Parameters<Page['goto']>[1]) => Promise<Response | null>;
        goBack: () => Promise<Response | null>;
        goForward: () => Promise<Response | null>;
        reload: () => Promise<Response | null>;
        close: (type?: 'tab' | 'session') => Promise<void>;
        evaluate: Page['evaluate'];
        keyboard: { press: (key: string) => Promise<void> };
    }
}

