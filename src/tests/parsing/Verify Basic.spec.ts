// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, is, verify } from '../util/ast-builder.ts';
// #endregion

describe('Verify Basic', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse an unlabeled verify', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			verify(is('is', selector('.dashboard'), 'visible'))
		);
	});

	it('should parse a labeled verify with by', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			verify(is('is', selector('.dashboard'), 'visible'), 'can', 'labeled check')
		);
	});
});
