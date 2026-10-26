// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { assignment, selector, is, connector } from '../util/ast-builder.ts';
// #endregion

describe('Logical Connectors', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse any', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			assignment('a', connector('any', [
				is('is', selector('.error'), 'visible'),
				is('is', selector('.warning'), 'visible')
			]))
		);
	});

	it('should parse all', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			assignment('b', connector('all', [
				is('is', selector('.dashboard'), 'visible'),
				is('is', selector('.avatar'), 'visible')
			]))
		);
	});
});
