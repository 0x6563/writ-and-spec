
export namespace AST {
    interface Script {
        type: "script";
        imports?: AST.Statement.Import[];
        block: AST.Fragment.Block;
    }

    namespace Fragment {
        interface Block {
            type: "block";
            data: {
                statements: AST.Statement.Node[];
                hoisted: AST.Statement.Node[];
            };
        }
    }

    namespace Tokens {
        type BinaryOperator = "or" | "and" | "<" | ">" | "<=" | ">=" | "!=" | "==" | ".." | "+" | "-" | "*" | "/" | "%" | "^";

        type Time = "ms" | "millisecond" | "milliseconds" | "s" | "second" | "seconds" | "m" | "min" | "minute" | "minutes" | "h" | "hr" | "hour" | "hours";

        type Dimension = "px";

        type Channel = "tab" | "popup" | "dialog" | "download" | "network" | "navigation";

        type Click = "left" | "right" | "middle" | "double";

        type Navigation = "back" | "forward" | "reload";

        type Edge = "top" | "bottom" | "left" | "right";
    }

    namespace Literal {
        interface String {
            type: "literal";
            kind: "string";
            data: { value: string };
        }

        interface Number {
            type: "literal";
            kind: "number";
            data: { value: number };
        }

        interface Boolean {
            type: "literal";
            kind: "boolean";
            data: { value: boolean };
        }

        interface Null {
            type: "literal";
            kind: "null";
            data: { value: null };
        }

        interface CssSelector {
            type: "literal";
            kind: "css-selector";
            data: { value: string };
        }

        type Node = AST.Literal.String | AST.Literal.Number | AST.Literal.Boolean | AST.Literal.Null | AST.Literal.CssSelector;
    }

    namespace Expression {

        interface Binary {
            type: "expression";
            kind: AST.Tokens.BinaryOperator;
            data: { inputs: [left: AST.Expression.Node, right: AST.Expression.Node] };
        }

        interface Has {
            type: "expression";
            kind: "has" | "hasnt";
            data: { inputs: [target: AST.Expression.Node, value: AST.Expression.Node]; function: string };
        }

        /** `is NAME`/`isnt NAME` — `NAME` is a state name looked up in the `is` namespace, not a sub-expression, same pattern as `AST.Expression.Has`'s `function` field. Zero arguments, so `inputs` is just `[target]`. */
        interface Is {
            type: "expression";
            kind: "is" | "isnt";
            data: { inputs: [target: AST.Expression.Node]; function: string };
        }

        interface Between {
            type: "expression";
            kind: "between";
            data: { inputs: [value: AST.Expression.Node, from: AST.Expression.Node, to: AST.Expression.Node] };
        }

        /** @see {@link ast-reference.md#expression-not} */
        interface Not {
            type: "expression";
            kind: "!";
            data: { inputs: [value: AST.Expression.Node] };
        }

        interface Reference {
            type: "expression";
            kind: "reference";
            data: { inputs: []; name: string };
        }

        interface Accessor {
            type: "expression";
            kind: "accessor";
            data: { inputs: []; root: AST.Expression.Node; path: [AST.Expression.Node, ...AST.Expression.Node[]] };
        }

        /** `inputs` is `[expression]` — Group computes nothing of its own, it just evaluates its one child and preserves that the source had explicit parens. */
        interface Group {
            type: "expression";
            kind: "group";
            data: { inputs: [value: AST.Expression.Node] };
        }

        /** `inputs` is each element — a real expression needing its own evaluation (could be a reference, a call, anything), not a flat literal, so this is `type:"expression"` rather than `type:"literal"` despite the `[...]` syntax looking like one. */
        interface Array {
            type: "expression";
            kind: "array";
            data: { inputs: AST.Expression.Node[] };
        }

        /** `inputs` is always `[]` — properties need their own bespoke resolution (key + value, or a spread to merge), not the generic trampoline's one-expression-per-input treatment, so they live in `properties` instead, same pattern as `AST.Expression.Accessor`/`AST.Expression.LogicalConnector`. */
        interface Object {
            type: "expression";
            kind: "object";
            data: { inputs: []; properties: AST.Expression.Fragment.Property[] };
        }

        /** `inputs[0]` is the callee, `inputs[1:]` are the call's args — a bare name callee is wrapped as a `AST.Expression.Reference`, same as a bare name resolves anywhere else, so any expression (e.g. a parenthesized group) can stand in as the callee. */
        interface Call {
            type: "expression";
            kind: "call";
            data: { inputs: [callee: AST.Expression.Node, ...args: AST.Expression.Node[]] };
        }

        /** `inputs` is the `any`/`all`'d expressions, genuinely variadic. */
        interface LogicalConnector {
            type: "expression";
            kind: "any" | "all";
            data: { inputs: []; conditions: [AST.Expression.Node, ...AST.Expression.Node[]] };
        }

        /** `inputs` is the chain's atoms (`AST.Expression.Duration`s), e.g. `1 hour 30 minutes`. */
        interface DurationList {
            type: "expression";
            kind: "duration-list";
            data: { inputs: AST.Expression.Duration[] };
        }

        /** The atom: a single number+unit, e.g. `1 hour`. Same shape as `AST.Expression.Dimension` — no sub-expressions, but still a real computation (unit conversion) rather than a flat unwrap. */
        interface Duration {
            type: "expression";
            kind: "duration";
            data: { inputs: []; value: number; unit: AST.Tokens.Time };
        }

        /** No sub-expressions — `value` is the already-unwrapped raw number, not a node. `inputs` is always `[]`. */
        interface Dimension {
            type: "expression";
            kind: "dimension";
            data: { inputs: []; value: number; unit: AST.Tokens.Dimension };
        }

        interface New {
            type: "expression";
            kind: "new";
            data: { inputs: []; construct: "tab" | "session" | "incognito" | "timer" };
        }

        /** `inputs` is `[from, to]`, with `step` as an optional third element when present — it's itself a node needing evaluation (a `kind` + operand), not inert metadata, so it belongs in `inputs` rather than a sibling field. */
        interface Range {
            type: "expression";
            kind: "range";
            data: { inputs: [from: AST.Expression.Node, to: AST.Expression.Node, incrementer: AST.Expression.Fragment.Step?] };
        }

        namespace Fragment {
            type Property =
                | { type: "property"; kind: "value"; data: { key: string; value: AST.Expression.Node } }
                | { type: "property"; kind: "spread"; data: AST.Expression.Node };

            interface Step {
                type: "expression";
                kind: "step";
                data: { inputs: [value: AST.Expression.Node]; direction: "+" | "-" };
            }
        }

        type Node =
            | AST.Expression.New
            | AST.Expression.Binary
            | AST.Expression.Has
            | AST.Expression.Is
            | AST.Expression.Between
            | AST.Expression.Not
            | AST.Literal.Node
            | AST.Expression.Group
            | AST.Expression.Call
            | AST.Expression.Array
            | AST.Expression.Object
            | AST.Expression.LogicalConnector
            | AST.Expression.DurationList
            | AST.Expression.Dimension
            | AST.Expression.Reference
            | AST.Expression.Accessor;
    }

    namespace Action {

        interface Simple {
            type: "action";
            kind: "clear" | "press" | "focus" | "blur" | "unfocus" | "restart";
            data: { target: AST.Expression.Node };
        }

        interface NavigateTo {
            type: "action";
            kind: "navigate";
            data: { destination: AST.Expression.Node };
        }

        interface NavigateDirection {
            type: "action";
            kind: "navigate";
            data: { direction: AST.Tokens.Navigation };
        }

        interface Click {
            type: "action";
            kind: "click";
            data: {
                button: AST.Tokens.Click; // Default: right
                behavior?: string;
                target: AST.Expression.Node;
            };
        }

        interface Type {
            type: "action";
            kind: "type";
            data: {
                content: AST.Expression.Node;
                behavior?: string;
                target: AST.Expression.Node;
            };
        }

        interface Hover {
            type: "action";
            kind: "hover";
            data: { behavior?: string; target: AST.Expression.Node };
        }

        interface Drag {
            type: "action";
            kind: "drag";
            data: { behavior?: string; source: AST.Expression.Node; destination: AST.Expression.Node };
        }

        interface Scroll {
            type: "action";
            kind: "scroll";
            data: { behavior?: string; target: AST.Expression.Node | AST.Tokens.Edge };
        }

        interface Find {
            type: "action";
            kind: "find";
            data: { every: boolean; target: AST.Expression.Node };
        }

        interface Close {
            type: "action";
            kind: "close";
            data: { target: "tab" | "popup" };
        }

        interface Resize {
            type: "action";
            kind: "resize";
            data: { width: AST.Expression.Node; height: AST.Expression.Node };
        }

        interface Upload {
            type: "action";
            kind: "upload";
            data: { file: AST.Expression.Node; target: AST.Expression.Node };
        }

        type Node =
            | AST.Action.Simple
            | AST.Action.NavigateTo
            | AST.Action.NavigateDirection
            | AST.Action.Click
            | AST.Action.Type
            | AST.Action.Hover
            | AST.Action.Drag
            | AST.Action.Scroll
            | AST.Action.Find
            | AST.Action.Close
            | AST.Action.Resize
            | AST.Action.Upload;
    }

    namespace Flow {

        interface If {
            type: "flow";
            kind: "if";
            data: { condition: AST.Expression.Node | AST.Statement.Verify; block: AST.Fragment.Block; else?: AST.Fragment.Block };
        }

        interface While {
            type: "flow";
            kind: "while";
            data: { condition: AST.Expression.Node; block: AST.Fragment.Block };
        }

        interface Until {
            type: "flow";
            kind: "until";
            data: { condition: AST.Expression.Node; block: AST.Fragment.Block };
        }

        interface For {
            type: "flow";
            kind: "for";
            data: {
                key: string | null;
                value: string;
                iterable: AST.Expression.Node | AST.Expression.Range;
                block: AST.Fragment.Block;
            };
        }

        type Node = AST.Flow.If | AST.Flow.While | AST.Flow.Until | AST.Flow.For;
    }

    namespace StatementExpression {
        interface DOMSubject {
            type: "statement-expression";
            kind: "dom-subject";
            data: { subjects: [AST.Expression.Node, ...AST.Expression.Node[]]; block: AST.Fragment.Block };
        }

        interface BrowserEventCapture {
            type: "statement-expression";
            kind: "browser-event-capture";
            data: { type: "tab" | "popup" | "download"; block: AST.Fragment.Block };
        }

        type Node = AST.StatementExpression.DOMSubject | AST.StatementExpression.BrowserEventCapture;
    }

    namespace Statement {
        interface Import {
            type: "import";
            value: string;
        }

        namespace Define {
            interface NativeFunction {
                type: "define";
                kind: "function";
                hoisted: true;
                data: {
                    name: AST.Statement.Define.Fragment.FunctionName;
                    args: string[];
                    block: AST.Fragment.Block;
                    browser: boolean;
                    behavior: boolean;
                };
            }

            interface JavaScriptFunction {
                type: "define";
                kind: "function";
                hoisted: true;
                data: {
                    name: AST.Statement.Define.Fragment.FunctionName;
                    args: string[];
                    source: AST.Statement.Fragment.JsBlock;
                    browser: boolean;
                    behavior: boolean;
                };
            }

            interface Behavior {
                type: "define";
                kind: "behavior";
                hoisted: true;
                data: { name: string; value: AST.Expression.Object };
            }

            namespace Fragment {
                interface FunctionName {
                    name: string;
                    namespace?: string;
                }
            }

            type Node = AST.Statement.Define.NativeFunction | AST.Statement.Define.JavaScriptFunction | AST.Statement.Define.Behavior;
        }

        namespace EventListener {
            interface Before {
                type: "event-listener";
                kind: "before";
                hoisted: boolean;
                data: {
                    event: AST.Statement.EventListener.Fragment.Event
                    block: AST.Fragment.Block;
                    timing: "next" | "every";
                };
            }

            interface After {
                type: "event-listener";
                kind: "after";
                hoisted: boolean;
                data: {
                    event: AST.Statement.EventListener.Fragment.Event;
                    block: AST.Fragment.Block;
                    timing: "next" | "every";
                };
            }

            /** `next tab|popup|...` used as an assignable value (e.g. `tab3 = next tab opened`). */
            interface Next {
                type: "event-listener";
                kind: "next";
                data: { event: AST.Statement.EventListener.Fragment.Event | AST.Expression.Node };
            }

            namespace Fragment {
                type Event = {
                    type: "event";
                    data: { channel: AST.Tokens.Channel; event: string };
                } | AST.Expression.Node;
            }

            type Node = Before | After;

        }

        namespace Comment {
            interface Block {
                type: "comment";
                kind: "block";
                data: { comment: string };
            }

            interface Inline {
                type: "comment";
                kind: "inline";
                data: { comment: string };
            }

            type Node = AST.Statement.Comment.Block | AST.Statement.Comment.Inline;
        }

        namespace Fragment {
            interface JsBlock {
                type: "source";
                kind: "javascript";
                data: { source: string };
            }

            type Runnable =
                | AST.Expression.Call
                | { type: "block"; data: { environment: string; source: AST.Statement.Fragment.JsBlock } }
                | AST.Fragment.Block;
        }

        interface TestSuite {
            type: "test-suite";
            data: { name: string; block: AST.Fragment.Block };
        }

        interface Try {
            type: "statement";
            kind: "try";
            data: { block: AST.Fragment.Block };
        }

        interface Run {
            type: "statement";
            kind: "run";
            data: { runnable: AST.Statement.Fragment.Runnable };
        }

        interface Load {
            type: "statement";
            kind: "load";
            data: { runnable: AST.Statement.Fragment.Runnable; global?: true }
        }

        interface Verify {
            type: "verify";
            kind: "can" | "cant";
            data: { inputs: [condition: AST.Expression.Node]; alias?: string };
        }

        interface Must {
            type: "statement";
            kind: "must" | "mustnt";
            data: { statement: AST.Statement.Verify | AST.Statement.Run | AST.Action.Node | AST.StatementExpression.DOMSubject };
        }

        interface Wait {
            type: "statement";
            kind: "wait";
            data: { duration: AST.Expression.DurationList };
        }

        interface WaitUntil {
            type: "statement";
            kind: "wait-until";
            data: { condition: AST.Expression.Node };
        }

        interface WaitUntilNext {
            type: "statement";
            kind: "wait-until-next";
            data: { event: AST.Statement.EventListener.Fragment.Event };
        }

        interface Within {
            type: "statement";
            kind: "within";
            data: { context: AST.Expression.Node; block: AST.Fragment.Block };
        }

        interface WithinEvery {
            type: "statement";
            kind: "within-every";
            data: { context: AST.Expression.Node; block: AST.Fragment.Block };
        }

        interface Log {
            type: "statement";
            kind: "log";
            data: { expression: AST.Expression.Node };
        }

        interface Delete {
            type: "statement";
            kind: "delete";
            data: { expression: AST.Expression.Node };
        }

        interface Dev {
            type: "statement";
            kind: "dev";
            data: { call: AST.Expression.Call };
        }

        /** `data.target` is `undefined` for bare `stop`/`skip`. */
        interface FlowControl {
            type: "statement";
            kind: "stop" | "skip";
            data: { target?: "suite" | "app" | "event" };
        }

        interface Assignment {
            type: "statement";
            kind: "assignment";
            data: { target: AST.Expression.Reference | AST.Expression.Accessor; value: AST.Statement.Assignable };
        }

        type Assignable =
            | AST.Expression.Node
            | AST.StatementExpression.BrowserEventCapture
            | AST.Statement.EventListener.Node
            | AST.Statement.Run
            | AST.Statement.Load
            | AST.Action.Find
            | AST.StatementExpression.DOMSubject
            | AST.Statement.EventListener.Next;

        type Node =
            | AST.Statement.TestSuite
            | AST.Statement.Define.Node
            | AST.Statement.Assignment
            | AST.Flow.Node
            | AST.Action.Node
            | AST.StatementExpression.DOMSubject
            | AST.Statement.FlowControl
            | AST.Statement.EventListener.Node
            | AST.Statement.Comment.Node
            | AST.Statement.Try
            | AST.Statement.Run
            | AST.Statement.Verify
            | AST.Statement.Must
            | AST.Statement.Wait
            | AST.Statement.WaitUntil
            | AST.Statement.WaitUntilNext
            | AST.Statement.Within
            | AST.Statement.WithinEvery
            | AST.Statement.Log
            | AST.Statement.Delete
            | AST.Statement.Dev;
    }
}
