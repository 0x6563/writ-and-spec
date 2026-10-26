import type { AST } from "../../types/ast.ts";
import type { Runtime } from "../../types/runtime.ts";
import { Value } from "../shared.ts";

enum Type {
    Boolean = 0b1,
    Number = 0b10,
    String = 0b100,

    Stringable = 0b111,
    Booleanable = 0b11


}
function Is(value: Runtime.Value, types: Type) {
    if (types & Type.Number && typeof value.value == 'number')
        return true;
    if (types & Type.String && typeof value.value == 'string')
        return true;
    if (types & Type.Boolean && typeof value.value == 'boolean')
        return true;
    return false;
}
function FormatBinaryExpressionError(operator: string, a: Runtime.Value, b: Runtime.Value) {
    return `Unable to ${operator} ${JSON.stringify(a.value)} and ${JSON.stringify(b.value)}`;

}
function FormatTernaryExpressionError(operator: string, a: Runtime.Value, b: Runtime.Value, c: Runtime.Value) {
    return `Unable to ${operator} ${JSON.stringify(a.value)} and ${JSON.stringify(b.value)} and ${JSON.stringify(c.value)}`;

}
function IsNumber(value: Runtime.Value): value is Runtime.Value & { value: number } {
    return typeof value.value === 'number';
}

function IsString(value: Runtime.Value): value is Runtime.Value & { value: string } {
    return typeof value.value === 'string';
}

function IsBoolean(value: Runtime.Value): value is Runtime.Value & { value: boolean } {
    return typeof value.value === 'boolean';
}

function Stringify(value: Runtime.Value): string {
    if (IsString(value))
        return value.value;
    if (IsNumber(value) || IsBoolean(value))
        return String(value.value);
    if (value.value === null)
        return '';
    throw new Error();
}

async function CallState(context: Runtime.Context, namespace: 'is' | 'has', name: string, target: Runtime.NativeValue, args: Runtime.NativeValue[] = []): Promise<boolean> {
    const states = context.getVariable(namespace) as { [key: string]: Function };
    const fn = states[name];
    if (typeof fn !== 'function')
        throw new Error(`Unknown state "${name}" in ${namespace} namespace`);
    return !!(await fn.call(target, ...args));
}

const DimensionToPx: { [unit in AST.Tokens.Dimension]: number } = { 'px': 1, };

const TimeToMs = { 'ms': 1, 'millisecond': 1, 'milliseconds': 1 } as { [unit in AST.Tokens.Time]: number };
TimeToMs.s = TimeToMs.second = TimeToMs.seconds = TimeToMs.ms * 1000;
TimeToMs.m = TimeToMs.min = TimeToMs.minute = TimeToMs.minutes = TimeToMs.s * 60;
TimeToMs.h = TimeToMs.hr = TimeToMs.hour = TimeToMs.hours = TimeToMs.m * 60;

export const Expressions = {
    'reference': async function (context: Runtime.Context, expression: AST.Expression.Reference, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(context.getVariable(expression.data.name));
    },
    'group': async function (context: Runtime.Context, expression: AST.Expression.Group, values: Runtime.Value[]): Promise<Runtime.Value> {
        return values[0];
    },
    'accessor': async function (context: Runtime.Context, expression: AST.Expression.Accessor, values: Runtime.Value[]): Promise<Runtime.Value> {
        const { container, key } = await Helpers.AccessorTarget(context, expression);
        return Value(container[key]);
    },
    'call': async function (context: Runtime.Context, expression: AST.Expression.Call, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (typeof values[0].value != 'function')
            throw new Error('Not a function');

        return Value(await values[0].value(...values.slice(1).map(v => v.value)));
    },
    'any': async function (context: Runtime.Context, expression: AST.Expression.LogicalConnector, values: Runtime.Value[]): Promise<Runtime.Value> {
        for (const condition of expression.data.conditions)
            if ((await ResolveExpression(context, condition)).value)
                return Value(true);
        return Value(false);
    },
    'all': async function (context: Runtime.Context, expression: AST.Expression.LogicalConnector, values: Runtime.Value[]): Promise<Runtime.Value> {
        for (const condition of expression.data.conditions)
            if (!(await ResolveExpression(context, condition)).value)
                return Value(false);
        return Value(true);
    },
    'or': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(!!values[0].value || !!values[1].value);
    },
    'and': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(!!values[0].value && !!values[1].value);
    },
    '<': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('<', values[0], values[1]));
        return Value(values[0].value! < values[1].value!);
    },
    '>': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('>', values[0], values[1]));
        return Value(values[0].value! > values[1].value!);
    },
    '<=': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('<=', values[0], values[1]));
        return Value(values[0].value! <= values[1].value!);
    },
    '>=': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('>=', values[0], values[1]));
        return Value(values[0].value! >= values[1].value!);
    },
    '!=': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(values[0].value !== values[1].value);
    },
    '==': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(values[0].value === values[1].value);
    },
    '..': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(Stringify(values[0]) + Stringify(values[1]));
    },
    '+': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('+', values[0], values[1]));
        return Value((values[0].value as number) + (values[1].value as number));
    },
    '-': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('-', values[0], values[1]));
        return Value((values[0].value as number) - (values[1].value as number));
    },
    '*': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('*', values[0], values[1]));
        return Value((values[0].value as number) * (values[1].value as number));
    },
    '/': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('/', values[0], values[1]));
        return Value((values[0].value as number) / (values[1].value as number));
    },
    '%': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('%', values[0], values[1]));
        return Value((values[0].value as number) % (values[1].value as number));
    },
    '^': async function (context: Runtime.Context, expression: AST.Expression.Binary, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('^', values[0], values[1]));
        return Value((values[0].value as number) ** (values[1].value as number));
    },
    'is': async function (context: Runtime.Context, expression: AST.Expression.Is, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(await CallState(context, 'is', expression.data.function, values[0].value));
    },
    'isnt': async function (context: Runtime.Context, expression: AST.Expression.Is, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(!(await CallState(context, 'is', expression.data.function, values[0].value)));
    },
    'has': async function (context: Runtime.Context, expression: AST.Expression.Has, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(await CallState(context, 'has', expression.data.function, values[0].value, [values[1].value]));
    },
    'hasnt': async function (context: Runtime.Context, expression: AST.Expression.Has, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(!(await CallState(context, 'has', expression.data.function, values[0].value, [values[1].value])));
    },
    'between': async function (context: Runtime.Context, expression: AST.Expression.Between, [a, b, c]: Runtime.Value[]) {
        if (!Is(a, Type.Number) || !Is(b, Type.Number) || !Is(c, Type.Number))
            throw new Error(FormatTernaryExpressionError('between', a, b, c));
        return Value(a!.value! > b!.value! && a!.value! < c!.value!);
    },
    '!': async function (context: Runtime.Context, expression: AST.Expression.Not, values: Runtime.Value[]): Promise<Runtime.Value> {
        if (!Is(values[0], Type.Boolean))
            throw new Error();
        return Value(!(values[0].value as boolean));
    },
    'new': async function (context: Runtime.Context, expression: AST.Expression.New, values: Runtime.Value[]) {
        if (expression.data.construct == 'tab')
            return Value(await (context.getVariable('this') as Runtime.BrowserInterface).tab() as any);
        if (expression.data.construct == 'incognito' || expression.data.construct == 'session')
            return Value(await (context.getVariable('this') as Runtime.BrowserInterface).session() as any);
        throw new Error(`TODO: new ${expression.data.construct}`);

    },
    'array': async function (context: Runtime.Context, expression: AST.Expression.Array, values: Runtime.Value[]) {
        return Value(values);
    },
    'object': async function (context: Runtime.Context, expression: AST.Expression.Object, values: Runtime.Value[]) {
        const result: Record<string, Runtime.NativeValue> = {};
        const stack: { expression: AST.Expression.Object, object: Record<string, Runtime.NativeValue>, index: number }[] = [{ expression, object: result, index: 0 }];

        while (stack.length) {
            const last = stack[stack.length - 1];
            const { properties } = last.expression.data;
            if (last.index >= properties.length) {
                stack.pop();
                continue;
            }

            const currentProp = properties[last.index];
            last.index++;

            if (currentProp.kind == 'spread' && currentProp.data.kind == 'object') {
                stack.push({ expression: currentProp.data, object: last.object, index: 0 });
            } else if (currentProp.kind == 'spread') {
                const spread = (await ResolveExpression(context, currentProp.data)).value;
                if (typeof spread !== 'object' || spread === null || Array.isArray(spread))
                    throw new Error();
                Object.assign(last.object, spread);
            } else if (currentProp.data.value.kind == 'object') {
                last.object[currentProp.data.key] = {};
                stack.push({ expression: currentProp.data.value, object: last.object[currentProp.data.key] as Record<string, Runtime.NativeValue>, index: 0 });
            } else {
                last.object[currentProp.data.key] = (await ResolveExpression(context, currentProp.data.value)).value;
            }
        }
        return Value(result);

    },
    'duration-list': async function (context: Runtime.Context, expression: AST.Expression.DurationList, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(values.reduce((total, ms) => total + (ms.value as number), 0));
    },
    'duration': async function (context: Runtime.Context, expression: AST.Expression.Duration, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(expression.data.value * TimeToMs[expression.data.unit]);
    },
    'dimension': async function (context: Runtime.Context, expression: AST.Expression.Dimension, values: Runtime.Value[]): Promise<Runtime.Value> {
        return Value(expression.data.value * DimensionToPx[expression.data.unit]);
    },
    'range': async function (context: Runtime.Context, expression: AST.Expression.Range, values: Runtime.Value[]) {
        if (!Is(values[0], Type.Number) || !Is(values[1], Type.Number))
            throw new Error(FormatBinaryExpressionError('range', values[0], values[1]));

        const from = values[0].value as number;
        const to = values[1].value as number;
        const step = values[2] ? values[2].value as number : (to >= from ? 1 : -1);
        if (step == 0)
            throw new Error('Range step cannot be zero');

        return Value({ from, to, step });
    },
    'step': async function (context: Runtime.Context, expression: AST.Expression.Fragment.Step, values: Runtime.Value[]) {
        if (!Is(values[0], Type.Number))
            throw new Error(`Unable to increment with ${values[0].value}`);
        const direction = expression.data.direction == '+' ? 1 : -1;

        return Value(values[0]!.value as number * direction);
    },
};

export const Helpers = {
    AccessorTarget: async function (context: Runtime.Context, accessor: AST.Expression.Accessor): Promise<{ container: Record<string, Runtime.NativeValue>, key: string }> {
        let container = (await ResolveExpression(context, accessor.data.root)).value;
        for (const step of accessor.data.path.slice(0, -1)) {
            const key = (await ResolveExpression(context, step)).value;
            if (typeof container !== 'object' || container === null || Array.isArray(container))
                throw new Error('Unsupported access');
            container = container[key as string];
        }
        if (typeof container !== 'object' || container === null || Array.isArray(container))
            throw new Error('Unsupported access');
        const key = (await ResolveExpression(context, accessor.data.path[accessor.data.path.length - 1])).value as string;
        return { container, key };
    },
    BrowserEventCapture: async function (context: Runtime.Context, expression: AST.StatementExpression.BrowserEventCapture) {
        throw new Error(`TODO: browser event capture ${expression.data.type}`);
    },
    NextEvent: async function (context: Runtime.Context, expression: AST.Statement.EventListener.Next) {
        throw new Error('TODO: next event');
    },
};


export async function ResolveExpression(context: Runtime.Context, expression: Runtime.Expression.Node, values?: Runtime.Value[]): Promise<Runtime.Value> {
    if (expression.type == 'literal')
        return Value(expression.data.value as Runtime.NativeValue);

    if (values) {
        const handler = (Expressions as Record<string, Function>)[expression.kind];
        if (!handler)
            throw new Error(`Unknown expression kind: ${expression.kind}`);
        return handler(context, expression, values);
    }

    const result: Runtime.Value[] = [];
    const stack: { expression: Runtime.Expression.Node, values: Runtime.Value[] }[] = [{ expression: { type: "expression", kind: "group", data: { inputs: [expression] } } as AST.Expression.Group, values: result }];
    while (result.length == 0) {
        const last = stack[stack.length - 1];
        if (last.expression.type == 'literal') {
            stack[stack.length - 2].values.push(Value(last.expression.data.value as Runtime.NativeValue));
            stack.pop();
            continue;
        } else if (last.expression.data.inputs.length == last.values.length) {
            stack[stack.length - 2].values.push(await ResolveExpression(context, last.expression, last.values));
            stack.pop();
            continue;
        } else if (last.values.length < last.expression.data.inputs.length) {
            stack.push({ expression: last.expression.data.inputs[last.values.length] as Runtime.Expression.Node, values: [] });
            continue;
        }
    }
    return result[0];
}
