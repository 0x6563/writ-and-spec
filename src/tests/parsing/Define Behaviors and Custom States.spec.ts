// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { object, prop, duration, durationList, jsSource, defineBehavior } from '../util/ast-builder.ts';
// #endregion

describe('Define Behaviors and Custom States', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a nested behavior config object', function () {
		expect(result[0].block.data.hoisted[0]).to.deep.equal(
			defineBehavior('slowly', object([
				prop('action', object([
					prop('interval', object([
						prop('target', durationList(duration(200, 'ms')))
					]))
				]))
			]))
		);
	});

	it('should parse a namespaced is.NAME custom state definition', function () {
		const node = result[0].block.data.hoisted[1] as (AST.Statement.Define.NativeFunction | AST.Statement.Define.JavaScriptFunction);
		expect(node.data.name).to.deep.equal({ name: 'is', namespace: 'admin' });
		expect(node.data.args).to.deep.equal([]);
		expect(node.data.browser).to.equal(true);
		expect(node.data.behavior).to.equal(false);
		expect((node.data as { source: unknown }).source).to.deep.equal(jsSource('\n    return true\n'));
	});

	it('should parse a namespaced has.NAME custom state definition with an arg', function () {
		const node = result[0].block.data.hoisted[2] as (AST.Statement.Define.NativeFunction | AST.Statement.Define.JavaScriptFunction);
		expect(node.data.name).to.deep.equal({ name: 'has', namespace: 'permission' });
		expect(node.data.args).to.deep.equal(['level']);
		expect(node.data.browser).to.equal(true);
		expect(node.data.behavior).to.equal(false);
		expect((node.data as { source: unknown }).source).to.deep.equal(jsSource('\n    return true\n'));
	});
});
