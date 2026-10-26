import type { AST } from '../../types/ast.ts';
import type { Runtime } from '../../types/runtime.ts';
import { ResolveExpression } from './expressions.ts';

export const Actions = {
    'click': async function (context: Runtime.Context, action: AST.Action.Click) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        if (action.data.button === 'double')
            await context.getVariable('this').dblclick(target);
        else
            await context.getVariable('this').click(target, { button: action.data.button });
    },
    'navigate': async function (context: Runtime.Context, action: AST.Action.NavigateTo | AST.Action.NavigateDirection) {
        if ('destination' in action.data) {
            const destination = (await ResolveExpression(context, action.data.destination)).value as string;
            await context.getVariable('this').goto(destination, { waitUntil: 'networkidle' });
        } else if (action.data.direction === 'back')
            await context.getVariable('this').goBack();
        else if (action.data.direction === 'forward')
            await context.getVariable('this').goForward();
        else if (action.data.direction === 'reload')
            await context.getVariable('this').reload();
    },
    'type': async function (context: Runtime.Context, action: AST.Action.Type) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        const content = (await ResolveExpression(context, action.data.content)).value as string;
        await context.getVariable('this').fill(target, content);
    },
    'hover': async function (context: Runtime.Context, action: AST.Action.Hover) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        await context.getVariable('this').hover(target);
    },
    'drag': async function (context: Runtime.Context, action: AST.Action.Drag) {
        const source = (await ResolveExpression(context, action.data.source)).value as string;
        const destination = (await ResolveExpression(context, action.data.destination)).value as string;
        await context.getVariable('this').dragAndDrop(source, destination);
    },
    'scroll': async function (context: Runtime.Context, action: AST.Action.Scroll) {
        if (typeof action.data.target === 'string') {
            await context.getVariable('this').evaluate((edge: any) => {
                if (edge === 'top')
                    window.scrollTo({ top: 0 });
                else if (edge === 'bottom')
                    window.scrollTo({ top: document.body.scrollHeight });
                else if (edge === 'left')
                    window.scrollTo({ left: 0 });
                else
                    window.scrollTo({ left: document.body.scrollWidth });
            }, action.data.target);
        } else {
            const target = (await ResolveExpression(context, action.data.target)).value as string;
            await context.getVariable('this').locator(target).scrollIntoViewIfNeeded();
        }
    },
    'find': async function (context: Runtime.Context, action: AST.Action.Find) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        return action.data.every ? context.getVariable('this').locator(target).all() : context.getVariable('this').locator(target);
    },
    'close': async function (context: Runtime.Context, action: AST.Action.Close) {
        if (action.data.target === 'tab')
            await context.getVariable('this').close();
        else
            throw new Error('Action "close popup" is not implemented yet');
    },
    'resize': async function (context: Runtime.Context, action: AST.Action.Resize) {
        const width = (await ResolveExpression(context, action.data.width)).value as number;
        const height = (await ResolveExpression(context, action.data.height)).value as number;
        await context.getVariable('this').setViewportSize({ width, height });
    },
    'upload': async function (context: Runtime.Context, action: AST.Action.Upload) {
        const file = (await ResolveExpression(context, action.data.file)).value as string;
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        await context.getVariable('this').setInputFiles(target, file);
    },
    'clear': async function (context: Runtime.Context, action: AST.Action.Simple) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        await context.getVariable('this').locator(target).clear();
    },
    'press': async function (context: Runtime.Context, action: AST.Action.Simple) {
        const key = (await ResolveExpression(context, action.data.target)).value as string;
        await context.getVariable('this').keyboard.press(key);
    },
    'focus': async function (context: Runtime.Context, action: AST.Action.Simple) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        await context.getVariable('this').locator(target).focus();
    },
    'blur': async function (context: Runtime.Context, action: AST.Action.Simple) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        await context.getVariable('this').locator(target).blur();
    },
    'unfocus': async function (context: Runtime.Context, action: AST.Action.Simple) {
        const target = (await ResolveExpression(context, action.data.target)).value as string;
        await context.getVariable('this').locator(target).blur();
    },
    'restart': async function (context: Runtime.Context, action: AST.Action.Simple) {
        throw new Error('Action "restart" is not implemented yet');
    },
};

export function ExecuteAction(context: Runtime.Context, action: AST.Action.Node) {
    const handler = (Actions as Record<string, Function>)[action.kind];
    if (!handler)
        throw new Error(`Unknown action kind: ${action.kind}`);
    return handler(context, action);
}
