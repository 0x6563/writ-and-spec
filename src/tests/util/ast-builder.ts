import type { AST } from "../../types/ast.ts";

/**
 * Raw JS literals accepted wherever a builder expects an `AST.Expression.Node`,
 * so fixtures can keep writing `binary('+', 1, 2)` / `assignment('a', 'hi')`
 * instead of `string('hi')`/`number(1)` everywhere. `AST.Expression.Node`
 * itself never contains bare primitives — `literal()` is the one place that
 * normalizes them into the tagged form the grammar now produces.
 */
type Literal = string | number | boolean | null;

function literal<T>(value: T | Literal): T | AST.Literal.String | AST.Literal.Number | AST.Literal.Boolean | AST.Literal.Null {
  if (value === null)
    return { type: "literal", kind: "null", data: { value: null } };
  if (typeof value === "string")
    return { type: "literal", kind: "string", data: { value } };
  if (typeof value === "number")
    return { type: "literal", kind: "number", data: { value } };
  if (typeof value === "boolean")
    return { type: "literal", kind: "boolean", data: { value } };
  return value;
}

function isHoisted(statement: AST.Statement.Node): boolean {
  return (statement as { hoisted?: boolean }).hoisted === true;
}

function block(statements: AST.Statement.Node[]): AST.Fragment.Block {
  return {
    type: "block",
    data: statements.reduce<AST.Fragment.Block["data"]>(
      (acc, statement) => isHoisted(statement)
        ? { statements: acc.statements, hoisted: [...acc.hoisted, statement] }
        : { statements: [...acc.statements, statement], hoisted: acc.hoisted },
      { statements: [], hoisted: [] }
    ),
  };
}

// ---------------------------------------------------------------------------
// Expressions
// ---------------------------------------------------------------------------

export function reference(name: string): AST.Expression.Reference {
  return { type: "expression", kind: "reference", data: { inputs: [], name } };
}

export function accessor(
  root: AST.Expression.Node | Literal,
  ...path: [AST.Expression.Node | Literal, ...(AST.Expression.Node | Literal)[]]
): AST.Expression.Accessor {
  return {
    type: "expression",
    kind: "accessor",
    data: { inputs: [], root: literal(root), path: path.map(literal) as [AST.Expression.Node, ...AST.Expression.Node[]] },
  };
}

export function group(expression: AST.Expression.Node | Literal): AST.Expression.Group {
  return { type: "expression", kind: "group", data: { inputs: [literal(expression)] } };
}

export function binary(kind: AST.Tokens.BinaryOperator, left: AST.Expression.Node | Literal, right: AST.Expression.Node | Literal): AST.Expression.Binary {
  return { type: "expression", kind, data: { inputs: [literal(left), literal(right)] } };
}

export function has(
  kind: "has" | "hasnt",
  left: AST.Expression.Node | Literal,
  func: string,
  value: AST.Expression.Node | Literal
): AST.Expression.Has {
  return { type: "expression", kind, data: { inputs: [literal(left), literal(value)], function: func } };
}

export function is(
  kind: "is" | "isnt",
  left: AST.Expression.Node | Literal,
  func: string
): AST.Expression.Is {
  return { type: "expression", kind, data: { inputs: [literal(left)], function: func } };
}

export function between(
  left: AST.Expression.Node | Literal,
  from: AST.Expression.Node | Literal,
  to: AST.Expression.Node | Literal
): AST.Expression.Between {
  return { type: "expression", kind: "between", data: { inputs: [literal(left), literal(from), literal(to)] } };
}

export function unary(kind: "!", operand: AST.Expression.Node | Literal): AST.Expression.Not {
  return { type: "expression", kind, data: { inputs: [literal(operand)] } };
}

export function call(callee: string | AST.Expression.Node, args: (AST.Expression.Node | Literal)[]): AST.Expression.Call {
  return { type: "expression", kind: "call", data: { inputs: [typeof callee === "string" ? reference(callee) : callee, ...args.map(literal)] } };
}

export function connector(
  kind: "any" | "all",
  conditions: [AST.Expression.Node | Literal, ...(AST.Expression.Node | Literal)[]]
): AST.Expression.LogicalConnector {
  return {
    type: "expression",
    kind,
    data: { inputs: [], conditions: conditions.map(literal) as [AST.Expression.Node, ...AST.Expression.Node[]] },
  };
}

export function newRef(construct: "tab" | "session" | "incognito" | "timer"): AST.Expression.New {
  return { type: "expression", kind: "new", data: { inputs: [], construct } };
}

export function range(from: AST.Expression.Node | Literal, step: AST.Expression.Fragment.Step | null, to: AST.Expression.Node | Literal): AST.Expression.Range {
  return {
    type: "expression",
    kind: "range",
    data: { inputs: step === null ? [literal(from), literal(to)] : [literal(from), literal(to), step] },
  };
}

export function step(direction: "+" | "-", operand: AST.Expression.Node | Literal): AST.Expression.Fragment.Step {
  return { type: "expression", kind: "step", data: { inputs: [literal(operand)], direction } };
}

export function array(value: (AST.Expression.Node | Literal)[]): AST.Expression.Array {
  return { type: "expression", kind: "array", data: { inputs: value.map(literal) } };
}

export function object(properties: AST.Expression.Fragment.Property[]): AST.Expression.Object {
  return { type: "expression", kind: "object", data: { inputs: [], properties } };
}

export function prop(key: string, value: AST.Expression.Node | Literal): AST.Expression.Fragment.Property {
  return { type: "property", kind: "value", data: { key, value: literal(value) } };
}

export function spreadProp(value: AST.Expression.Node | Literal): AST.Expression.Fragment.Property {
  return { type: "property", kind: "spread", data: literal(value) };
}

export function duration(value: number, unit: AST.Tokens.Time): AST.Expression.Duration {
  return { type: "expression", kind: "duration", data: { inputs: [], value, unit } };
}

export function durationList(...durations: AST.Expression.Duration[]): AST.Expression.DurationList {
  return { type: "expression", kind: "duration-list", data: { inputs: durations } };
}

export function dimension(value: number, unit: AST.Tokens.Dimension): AST.Expression.Dimension {
  return { type: "expression", kind: "dimension", data: { inputs: [], value, unit } };
}

export function jsSource(source: string): AST.Statement.Fragment.JsBlock {
  return { type: "source", kind: "javascript", data: { source } };
}

export function selector(value: string): AST.Literal.CssSelector {
  return { type: "literal", kind: "css-selector", data: { value } };
}

// ---------------------------------------------------------------------------
// Verify / event targets
// ---------------------------------------------------------------------------

export function verify(
  expression: AST.Expression.Node | Literal,
  kind: "can" | "cant" = "can",
  alias?: string
): AST.Statement.Verify {
  return alias === undefined
    ? { type: "verify", kind, data: { inputs: [literal(expression)] } }
    : { type: "verify", kind, data: { inputs: [literal(expression)], alias } };
}

export function event(channel: AST.Tokens.Channel, eventName: string): AST.Statement.EventListener.Fragment.Event {
  return { type: "event", data: { channel, event: eventName } };
}

// ---------------------------------------------------------------------------
// DOM subject / browser event capture / actions
// ---------------------------------------------------------------------------

export function domSubject(
  subjects: [AST.Expression.Node | Literal, ...(AST.Expression.Node | Literal)[]],
  body: AST.Statement.Node[]
): AST.StatementExpression.DOMSubject {
  return {
    type: "statement-expression",
    kind: "dom-subject",
    data: { subjects: subjects.map(literal) as [AST.Expression.Node, ...AST.Expression.Node[]], block: block(body) },
  };
}

export function browserEventCapture(kind: "tab" | "popup" | "download", body: AST.Statement.Node[]): AST.StatementExpression.BrowserEventCapture {
  return { type: "statement-expression", kind: "browser-event-capture", data: { type: kind, block: block(body) } };
}

export function simpleAction(kind: "clear" | "press" | "focus" | "blur" | "unfocus" | "restart", target: AST.Expression.Node | Literal): AST.Action.Simple {
  return { type: "action", kind, data: { target: literal(target) } };
}

export function navigateTo(destination: AST.Expression.Node | Literal): AST.Action.NavigateTo {
  return { type: "action", kind: "navigate", data: { destination: literal(destination) } };
}

export function navigateDirection(direction: AST.Tokens.Navigation): AST.Action.NavigateDirection {
  return { type: "action", kind: "navigate", data: { direction } };
}

export function click(
  button: AST.Tokens.Click | "right",
  behavior: string | undefined,
  target: AST.Expression.Node | Literal
): AST.Action.Click {
  return { type: "action", kind: "click", data: { button, behavior, target: literal(target) } };
}

export function typeAction(
  behavior: string | undefined,
  target: AST.Expression.Node | Literal,
  content: AST.Expression.Node | Literal
): AST.Action.Type {
  return { type: "action", kind: "type", data: { behavior, target: literal(target), content: literal(content) } };
}

export function hoverAction(behavior: string | undefined, target: AST.Expression.Node | Literal): AST.Action.Hover {
  return { type: "action", kind: "hover", data: { behavior, target: literal(target) } };
}

export function dragAction(
  behavior: string | undefined,
  source: AST.Expression.Node | Literal,
  destination: AST.Expression.Node | Literal
): AST.Action.Drag {
  return { type: "action", kind: "drag", data: { behavior, source: literal(source), destination: literal(destination) } };
}

export function scrollAction(behavior: string | undefined, target: AST.Expression.Node | AST.Tokens.Edge): AST.Action.Scroll {
  return { type: "action", kind: "scroll", data: { behavior, target } };
}

export function closeAction(target: "tab" | "popup"): AST.Action.Close {
  return { type: "action", kind: "close", data: { target } };
}

export function resizeAction(width: AST.Expression.Node | Literal, height: AST.Expression.Node | Literal): AST.Action.Resize {
  return { type: "action", kind: "resize", data: { width: literal(width), height: literal(height) } };
}

export function uploadAction(file: AST.Expression.Node | Literal, target: AST.Expression.Node | Literal): AST.Action.Upload {
  return { type: "action", kind: "upload", data: { file: literal(file), target: literal(target) } };
}

export function find(every: boolean, target: AST.Expression.Node | Literal): AST.Action.Find {
  return { type: "action", kind: "find", data: { every, target: literal(target) } };
}

// ---------------------------------------------------------------------------
// Event listeners
// ---------------------------------------------------------------------------

export function eventListener(
  kind: "before" | "after",
  timing: "next" | "every",
  target: AST.Statement.EventListener.Fragment.Event | Literal,
  body: AST.Statement.Node[],
  unhoisted?: true
): AST.Statement.EventListener.Node {
  return { type: "event-listener", kind, hoisted: !unhoisted, data: { event: literal(target), block: block(body), timing } } as AST.Statement.EventListener.Node;
}

export function nextEvent(target: AST.Statement.EventListener.Fragment.Event | Literal): AST.Statement.EventListener.Next {
  return { type: "event-listener", kind: "next", data: { event: literal(target) } };
}

// ---------------------------------------------------------------------------
// Run / load
// ---------------------------------------------------------------------------

export function runStatement(runnable: AST.Statement.Fragment.Runnable): AST.Statement.Run {
  return { type: "statement", kind: "run", data: { runnable } };
}

export function loadStatement(runnable: AST.Statement.Fragment.Runnable, global?: true): AST.Statement.Load {
  return global
    ? { type: "statement", kind: "load", data: { runnable, global: true } }
    : { type: "statement", kind: "load", data: { runnable } };
}

export function jsRunnable(environment: string, source: AST.Statement.Fragment.JsBlock): AST.Statement.Fragment.Runnable {
  return { type: "block", data: { environment, source } };
}

export function blockRunnable(statements: AST.Statement.Node[]): AST.Statement.Fragment.Runnable {
  return block(statements);
}

export function tryStatement(body: AST.Statement.Node[]): AST.Statement.Try {
  return { type: "statement", kind: "try", data: { block: block(body) } };
}

export function devStatement(devCall: AST.Expression.Call): AST.Statement.Dev {
  return { type: "statement", kind: "dev", data: { call: devCall } };
}

export function deleteStatement(expression: AST.Expression.Node | Literal): AST.Statement.Delete {
  return { type: "statement", kind: "delete", data: { expression: literal(expression) } };
}

// ---------------------------------------------------------------------------
// Simple statements
// ---------------------------------------------------------------------------

export function assignment(target: string | AST.Expression.Reference | AST.Expression.Accessor, value: AST.Statement.Assignable | Literal): AST.Statement.Assignment {
  return {
    type: "statement",
    kind: "assignment",
    data: { target: typeof target === "string" ? reference(target) : target, value: literal(value) },
  };
}

export function flowControl(kind: "stop" | "skip", target?: "suite" | "app" | "event"): AST.Statement.FlowControl {
  return { type: "statement", kind, data: { target } };
}

export function logStatement(expression: AST.Expression.Node | Literal): AST.Statement.Log {
  return { type: "statement", kind: "log", data: { expression: literal(expression) } };
}

export function must(
  kind: "must" | "mustnt",
  statement: AST.Statement.Verify | AST.Statement.Run | AST.Action.Node | AST.StatementExpression.DOMSubject
): AST.Statement.Must {
  return { type: "statement", kind, data: { statement } };
}

export function waitStatement(duration: AST.Expression.DurationList): AST.Statement.Wait {
  return { type: "statement", kind: "wait", data: { duration } };
}

export function waitUntilStatement(condition: AST.Expression.Node | Literal): AST.Statement.WaitUntil {
  return { type: "statement", kind: "wait-until", data: { condition: literal(condition) } };
}

export function waitUntilNextStatement(target: AST.Statement.EventListener.Fragment.Event | Literal): AST.Statement.WaitUntilNext {
  return { type: "statement", kind: "wait-until-next", data: { event: literal(target) } };
}

export function withinStatement(context: AST.Expression.Node | Literal, body: AST.Statement.Node[]): AST.Statement.Within {
  return { type: "statement", kind: "within", data: { context: literal(context), block: block(body) } };
}

export function withinEveryStatement(context: AST.Expression.Node | Literal, body: AST.Statement.Node[]): AST.Statement.WithinEvery {
  return { type: "statement", kind: "within-every", data: { context: literal(context), block: block(body) } };
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export function blockComment(comment: string): AST.Statement.Comment.Node {
  return { type: "comment", kind: "block", data: { comment } };
}

export function inlineComment(comment: string): AST.Statement.Comment.Node {
  return { type: "comment", kind: "inline", data: { comment } };
}

// ---------------------------------------------------------------------------
// Flow: if / while / until / for
// ---------------------------------------------------------------------------

export function ifFlow(
  condition: AST.Expression.Node | AST.Statement.Verify | Literal,
  body: AST.Statement.Node[],
  elseBody?: AST.Statement.Node[]
): AST.Flow.If {
  return elseBody === undefined
    ? { type: "flow", kind: "if", data: { condition: literal(condition), block: block(body) } }
    : { type: "flow", kind: "if", data: { condition: literal(condition), block: block(body), else: block(elseBody) } };
}

export function whileFlow(condition: AST.Expression.Node | Literal, body: AST.Statement.Node[]): AST.Flow.While {
  return { type: "flow", kind: "while", data: { condition: literal(condition), block: block(body) } };
}

export function untilFlow(condition: AST.Expression.Node | Literal, body: AST.Statement.Node[]): AST.Flow.Until {
  return { type: "flow", kind: "until", data: { condition: literal(condition), block: block(body) } };
}

export function forFlow(
  key: string | null,
  value: string,
  iterable: AST.Expression.Node | AST.Expression.Range | Literal,
  body: AST.Statement.Node[]
): AST.Flow.For {
  return { type: "flow", kind: "for", data: { key, value, iterable: literal(iterable), block: block(body) } };
}

// ---------------------------------------------------------------------------
// Test suites / define / functions
// ---------------------------------------------------------------------------

export function testSuite(name: string, body: AST.Statement.Node[]): AST.Statement.TestSuite {
  return { type: "test-suite", data: { name, block: block(body) } };
}

export function defineFunction(
  name: AST.Statement.Define.Fragment.FunctionName,
  args: string[],
  body: { block: AST.Statement.Node[] } | { source: AST.Statement.Fragment.JsBlock },
  browser: boolean,
  behavior: boolean
): AST.Statement.Define.NativeFunction | AST.Statement.Define.JavaScriptFunction {
  if ("block" in body) {
    return { type: "define", kind: "function", hoisted: true, data: { name, args, block: block(body.block), browser, behavior } };
  }
  return { type: "define", kind: "function", hoisted: true, data: { name, args, source: body.source, browser, behavior } };
}

export function defineBehavior(name: string, value: AST.Expression.Object): AST.Statement.Define.Behavior {
  return { type: "define", kind: "behavior", hoisted: true, data: { name, value } };
}

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

export function importNode(value: string): AST.Statement.Import {
  return { type: "import", value };
}

// ---------------------------------------------------------------------------
// Script
// ---------------------------------------------------------------------------

export function script(statements: AST.Statement.Node[], imports?: AST.Statement.Import[]): AST.Script {
  return imports === undefined
    ? { type: "script", block: block(statements) }
    : { type: "script", imports, block: block(statements) };
}
