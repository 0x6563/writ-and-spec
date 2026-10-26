// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { assignment, selector, is } from '../util/ast-builder.ts';
// #endregion

describe('Is State Conditions', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse is', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			assignment('a', is('is', selector('.btn'), 'visible'))
		);
	});

	it('should parse isnt', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			assignment('b', is('isnt', selector('.btn'), 'disabled'))
		);
	});

	it("should parse isn't", function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			assignment('c', is("isnt", selector('.btn'), 'disabled'))
		);
	});

	it('should parse a custom state name', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			assignment('d', is('is', selector('.user'), 'admin'))
		);
	});
});
