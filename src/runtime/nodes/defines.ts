import type { AST } from '../../types/ast';
import type { Runtime } from '../../types/runtime';

export const Defines = {
    'function': async function (context: Runtime.Context, statement: AST.Statement.Define.NativeFunction | AST.Statement.Define.JavaScriptFunction) {
        throw new Error('TODO: define function');
    },
    'behavior': async function (context: Runtime.Context, statement: AST.Statement.Define.Behavior) {
        throw new Error('TODO: define behavior');
    },
};

export function ExecuteDefine(context: Runtime.Context, statement: AST.Statement.Define.Node) {
    const handler = (Defines as Record<string, Function>)[statement.kind];
    if (!handler)
        throw new Error(`Unknown define kind: ${statement.kind}`);
    return handler(context, statement);
}
