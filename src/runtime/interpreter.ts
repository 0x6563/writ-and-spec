import type { AST } from '../types/ast.ts';
import { Browser } from './browser.ts';
import { RunBlock } from './shared.ts';
import { Context } from './context.ts';

export async function Evaluate(script: AST.Script) {
    const browser = await new Browser();
    const context: Context = await Context.Root(browser);
    await RunBlock(context, script.block);
    browser.close();
}