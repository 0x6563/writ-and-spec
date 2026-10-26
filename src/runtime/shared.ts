import type { AST } from '../types/ast.ts';
import type { Runtime } from '../types/runtime.ts';
import { ExecuteStatement } from './nodes/statements.ts';
import { ResolveExpression } from './nodes/expressions.ts';

export function Value(value: Runtime.NativeValue): Runtime.Value {
    return { type: 'value', value };
}

export async function RunBlock(context: Runtime.Context, block: AST.Fragment.Block, variables?: Record<string, Runtime.Value>) {
    const scope = context.fork();
    if (variables)
        for (const name in variables)
            scope.defineVariable(name, variables[name]);
    for (const statement of block.data.hoisted)
        await ExecuteStatement(scope, statement);
    for (const statement of block.data.statements)
        await ExecuteStatement(scope, statement);

    await scope.destroy();
}

export async function IsTruthy(context: Runtime.Context, condition: AST.Expression.Node | AST.Statement.Verify): Promise<boolean> {
    if (condition.type === 'verify')
        throw new Error('A verify condition is not implemented yet');
    return !!(await ResolveExpression(context, condition));
}
