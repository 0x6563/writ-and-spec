// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, is, verify, must, click, runStatement, call } from '../util/ast-builder.ts';
// #endregion

describe('Must Variants', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse must verify', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			must('must', verify(is('is', selector('.dashboard'), 'visible')))
		);
	});

	it("should parse mustn't verify", function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			must("mustnt", verify(is('is', selector('.error'), 'visible')))
		);
	});

	it('should parse mustnt verify', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			must('mustnt', verify(is('is', selector('.error'), 'visible')))
		);
	});

	it('should parse must ACTION', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			must('must', click('right', undefined, selector('.submit')))
		);
	});

	it('should parse must run', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(
			must('must', runStatement(call('login', [])))
		);
	});
});
