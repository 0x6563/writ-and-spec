import type { AST } from '../../types/ast';
import type { Runtime } from '../../types/runtime';
import { ExecuteAction } from './actions.ts';
import { ExecuteDefine } from './defines.ts';
import { ExecuteFlow } from './flows.ts';
import { ResolveExpression, Helpers } from './expressions.ts';

// Keyed by the exact type/kind string it handles, same as Expressions —
// 'test-suite'/'event-listener'/'comment'/'verify'/'statement-expression' are
// keyed by StatementNode.type (they have no further kind, or are dispatched
// by kind within their own handler), everything else here is keyed by the
// kind under type "statement". 'action'/'define'/'flow' aren't here at all —
// those delegate to their own module's registry instead of a local handler.
export const Statements = {
    'test-suite': async function (context: Runtime.Context, statement: AST.Statement.TestSuite) {
        throw new Error('TODO: test-suite');
    },
    'event-listener': async function (context: Runtime.Context, statement: AST.Statement.EventListener.Node) {
        if (statement.kind == 'before')
            throw new Error('TODO: event-listener before');
        if (statement.kind == 'after')
            throw new Error('TODO: event-listener after');
    },
    'comment': async function (context: Runtime.Context, statement: AST.Statement.Comment.Node) { /* no-op */ },
    'verify': async function (context: Runtime.Context, statement: AST.Statement.Verify) {
        if (statement.kind == 'can')
            throw new Error('TODO: verify can');
        if (statement.kind == 'cant')
            throw new Error('TODO: verify cant');
    },
    'statement-expression': async function (context: Runtime.Context, statement: AST.StatementExpression.Node) {
        if (statement.kind == 'dom-subject')
            throw new Error('TODO: statement-expression dom-subject');
        if (statement.kind == 'browser-event-capture')
            throw new Error('TODO: statement-expression browser-event-capture');
    },

    'assignment': async function (context: Runtime.Context, statement: AST.Statement.Assignment) {
        const type = statement.data.value.type;
        if (type == 'statement')
            throw new Error('TODO: assignment statement');
        if (type == 'statement-expression')
            throw new Error('TODO: assignment statement-expression');
        if (type == 'event-listener')
            throw new Error('TODO: assignment event-listener');
        if (type == 'action')
            throw new Error('TODO: assignment action');

        const value = await ResolveExpression(context, statement.data.value);
        const target = statement.data.target;
        if (target.kind == 'reference') {
            context.setVariable(target.data.name, value);
            return;
        }

        const { container, key } = await Helpers.AccessorTarget(context, target);
        container[key] = value.value;
    },
    'stop': async function (context: Runtime.Context, statement: AST.Statement.FlowControl) {
        if (statement.data.target == undefined)
            throw new Error('TODO: stop');
        if (statement.data.target == 'suite')
            throw new Error('TODO: stop suite');
        if (statement.data.target == 'app')
            throw new Error('TODO: stop app');
        if (statement.data.target == 'event')
            throw new Error('TODO: stop event');
    },
    'skip': async function (context: Runtime.Context, statement: AST.Statement.FlowControl) {
        if (statement.data.target == undefined)
            throw new Error('TODO: skip');
        if (statement.data.target == 'suite')
            throw new Error('TODO: skip suite');
        if (statement.data.target == 'app')
            throw new Error('TODO: skip app');
        if (statement.data.target == 'event')
            throw new Error('TODO: skip event');
    },
    'try': async function (context: Runtime.Context, statement: AST.Statement.Try) {
        throw new Error('TODO: try');
    },
    // 'load' is only reachable as an Assignable, not a top-level Statement —
    // see LoadStatement below, called directly by name, not through this registry.
    'run': async function (context: Runtime.Context, statement: AST.Statement.Run) {
        return Statements.Runnable(context, statement.data.runnable);
    },
    'must': async function (context: Runtime.Context, statement: AST.Statement.Must) {
        const type = statement.data.statement.type;
        if (type == 'verify')
            throw new Error('TODO: must verify');
        if (type == 'statement')
            throw new Error('TODO: must run');
        if (type == 'action')
            throw new Error('TODO: must action');
        if (type == 'statement-expression')
            throw new Error('TODO: must statement-expression');
    },
    'mustnt': async function (context: Runtime.Context, statement: AST.Statement.Must) {
        const type = statement.data.statement.type;
        if (type == 'verify')
            throw new Error('TODO: mustnt verify');
        if (type == 'statement')
            throw new Error('TODO: mustnt run');
        if (type == 'action')
            throw new Error('TODO: mustnt action');
        if (type == 'statement-expression')
            throw new Error('TODO: mustnt statement-expression');
    },
    'wait': async function (context: Runtime.Context, statement: AST.Statement.Wait) {
        throw new Error('TODO: wait');
    },
    'wait-until': async function (context: Runtime.Context, statement: AST.Statement.WaitUntil) {
        throw new Error('TODO: wait-until');
    },
    'wait-until-next': async function (context: Runtime.Context, statement: AST.Statement.WaitUntilNext) {
        throw new Error('TODO: wait-until-next');
    },
    'within': async function (context: Runtime.Context, statement: AST.Statement.Within) {
        throw new Error('TODO: within');
    },
    'within-every': async function (context: Runtime.Context, statement: AST.Statement.WithinEvery) {
        throw new Error('TODO: within-every');
    },
    'log': async function (context: Runtime.Context, statement: AST.Statement.Log) {
        throw new Error('TODO: log');
    },
    'delete': async function (context: Runtime.Context, statement: AST.Statement.Delete) {
        throw new Error('TODO: delete');
    },
    'dev': async function (context: Runtime.Context, statement: AST.Statement.Dev) {
        throw new Error('TODO: dev');
    },

    // Helpers, not reachable via any type/kind string — called directly by name.
    LoadStatement: async function (context: Runtime.Context, statement: AST.Statement.Load) {
        return Statements.Runnable(context, statement.data.runnable);
    },
    Runnable: async function (context: Runtime.Context, runnable: AST.Statement.Fragment.Runnable) {
        if (runnable.type == 'expression')
            throw new Error('TODO: runnable call');
        if (runnable.type == 'block' && 'environment' in runnable.data)
            throw new Error('TODO: runnable js block');
        if (runnable.type == 'block')
            throw new Error('TODO: runnable block');
    },
};

export function ExecuteStatement(context: Runtime.Context, statement: AST.Statement.Node): unknown {
    switch (statement.type) {
        case 'action':
            return ExecuteAction(context, statement);
        case 'define':
            return ExecuteDefine(context, statement);
        case 'flow':
            return ExecuteFlow(context, statement);
        case 'statement': {
            const handler = (Statements as Record<string, Function>)[statement.kind];
            if (!handler)
                throw new Error(`Unknown statement kind: ${statement.kind}`);
            return handler(context, statement);
        }
        default: {
            const handler = (Statements as Record<string, Function>)[statement.type];
            if (!handler)
                throw new Error(`Unknown statement type: ${statement.type}`);
            return handler(context, statement);
        }
    }
}
