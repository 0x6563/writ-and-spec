// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { accessor, reference, selector, call, click, assignment, runStatement, loadStatement, jsRunnable, jsSource, tryStatement } from '../util/ast-builder.ts';
// #endregion

describe('Run Load Try', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse run FUNCTIONCALL', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			runStatement(call('login', [
				accessor(reference('vars'), 'username'),
				accessor(reference('vars'), 'password')
			]))
		);
	});

	it('should parse run in browser js', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			runStatement(jsRunnable('browser', jsSource('return 1')))
		);
	});

	it('should parse load FUNCTIONCALL', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			assignment('context', loadStatement(call('init', [])))
		);
	});

	it('should parse load globally FUNCTIONCALL', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			assignment('context', loadStatement(call('setup', []), true))
		);
	});

	it('should parse try', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(
			tryStatement([click('right', undefined, selector('.might-not-exist'))])
		);
	});
});
