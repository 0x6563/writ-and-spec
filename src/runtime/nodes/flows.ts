import type { AST } from '../../types/ast';
import type { Runtime } from '../../types/runtime';
import { RunBlock, IsTruthy, Value } from '../shared.ts';
import { ResolveExpression } from './expressions.ts';

export const Flows = {
    'if': async function (context: Runtime.Context, statement: AST.Flow.If) {
        if (await IsTruthy(context, statement.data.condition))
            await RunBlock(context, statement.data.block);
        else if (statement.data.else)
            await RunBlock(context, statement.data.else);
    },
    'while': async function (context: Runtime.Context, statement: AST.Flow.While) {
        while (await IsTruthy(context, statement.data.condition))
            await RunBlock(context, statement.data.block);
    },
    'until': async function (context: Runtime.Context, statement: AST.Flow.Until) {
        while (!(await IsTruthy(context, statement.data.condition)))
            await RunBlock(context, statement.data.block);
    },
    'for': async function (context: Runtime.Context, statement: AST.Flow.For) {
        if (statement.data.iterable.type == 'expression' && statement.data.iterable.kind == 'range') {
            const { from, to, step } = (await ResolveExpression(context, statement.data.iterable)).value as { from: number; to: number; step: number };
            for (let i = from; step > 0 ? i <= to : i >= to; i += step)
                await RunBlock(context, statement.data.block, { [statement.data.value]: Value(i) });
            return;
        }

        const iterable = (await ResolveExpression(context, statement.data.iterable)).value;
        if (Array.isArray(iterable)) {
            for (let index = 0; index < iterable.length; index++) {
                const variables: Record<string, ReturnType<typeof Value>> = { [statement.data.value]: Value(iterable[index]) };
                if (statement.data.key)
                    variables[statement.data.key] = Value(index);
                await RunBlock(context, statement.data.block, variables);
            }
            return;
        }
        if (typeof iterable == 'object' && iterable !== null) {
            for (const key in iterable) {
                const variables: Record<string, ReturnType<typeof Value>> = { [statement.data.value]: Value(iterable[key]) };
                if (statement.data.key)
                    variables[statement.data.key] = Value(key);
                await RunBlock(context, statement.data.block, variables);
            }
            return;
        }
        throw new Error('Cannot iterate this value');
    },
};

export function ExecuteFlow(context: Runtime.Context, statement: AST.Flow.Node) {
    const handler = (Flows as Record<string, Function>)[statement.kind];
    if (!handler)
        throw new Error(`Unknown flow kind: ${statement.kind}`);
    return handler(context, statement);
}
