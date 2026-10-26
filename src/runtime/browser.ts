import { chromium } from 'playwright';
import type { Browser as BrowserKind, Locator, Page } from 'playwright';
import type { Runtime } from '../types/runtime';

export class Browser implements Runtime.Browser {
    browser: Promise<BrowserKind>;
    constructor() {
        this.browser = chromium.launch({ headless: false });
    }

    async tab() {
        return BrowserInterface((await (await this.browser).newPage()).locator(':root'));
    } 
    async close() {
        return (await this.browser).close();

    }
}


export function BrowserInterface(locator: Locator): Runtime.BrowserInterface {

    return {
        async tab() {
            return BrowserInterface((await locator.page().context().newPage()).locator(':root'));
        },
        async session() {
            return BrowserInterface((await (await locator.page().context().browser()!.newContext()).newPage()).locator(':root'));
        },
        locator(selector: string) {
            return BrowserInterface(locator.locator(selector));
        },
        async locatorAll(selector: string) {
            return (await locator.locator(selector).all()).map(v => BrowserInterface(v));
        },
        click(selector: string, options?: Parameters<Locator['click']>[0]) {
            return locator.locator(selector).click(options);
        },
        dblclick(selector: string) {
            return locator.locator(selector).dblclick();
        },
        hover(selector: string) {
            return locator.locator(selector).hover();
        },
        fill(selector: string, value: string) {
            return locator.locator(selector).fill(value);
        },
        dragAndDrop(source: string, target: string) {
            return locator.locator(source).dragTo(locator.locator(target));
        },
        setInputFiles(selector: string, files: Parameters<Locator['setInputFiles']>[0]) {
            return locator.locator(selector).setInputFiles(files);
        },
        setViewportSize(size: { width: number; height: number }) {
            return locator.page().setViewportSize(size);
        },
        goto(url: string, options?: Parameters<Page['goto']>[1]) {
            return locator.page().goto(url, options);
        },
        goBack() {
            return locator.page().goBack();
        },
        goForward() {
            return locator.page().goForward();
        },
        reload() {
            return locator.page().reload();
        },
        async close(type: 'tab' | 'session' = 'tab') {
            if (type == 'tab')
                return locator.page().close();
            if (type == 'session')
                return locator.page().context().close();
        },
        evaluate: locator.page().evaluate.bind(locator.page()),
        keyboard: {
            press(key: string) {
                return locator.page().keyboard.press(key);
            },
        },
    };
}
