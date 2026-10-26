// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

describe('Basic Check', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should have results', function () {
		expect(result).to.not.be.undefined;
		expect(result).to.be.an('array');
		expect(result.length).to.be.above(0);
	});

	it('should not be ambigous', function () {
		expect(result.length).to.be.below(2);
	});
});