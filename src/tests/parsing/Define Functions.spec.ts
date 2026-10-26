// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, click, jsSource, defineFunction } from '../util/ast-builder.ts';
// #endregion

describe('Define Functions', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse define function with a Writ&Spec block body', function () {
		expect(result[0].block.data.hoisted[0]).to.deep.equal(
			defineFunction({ name: 'login' }, ['email', 'password'], { block: [click('right', undefined, selector('.submit'))] }, false, false)
		);
	});

	it('should parse define js with a raw JS source body', function () {
		expect(result[0].block.data.hoisted[1]).to.deep.equal(
			defineFunction({ name: 'handleResponse' }, ['page'], { source: jsSource('\n    return 1\n') }, false, false)
		);
	});

	it('should parse define browser js with browser: true', function () {
		expect(result[0].block.data.hoisted[2]).to.deep.equal(
			defineFunction({ name: 'customCheck' }, [], { source: jsSource('\n    return 1\n') }, true, false)
		);
	});
});
