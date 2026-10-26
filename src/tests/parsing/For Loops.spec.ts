// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { accessor, reference, logStatement, forFlow, range, step } from '../util/ast-builder.ts';
// #endregion

describe('For Loops', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a single-variable for over a collection', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			forFlow(null, 'item', reference('items'), [logStatement(reference('item'))])
		);
	});

	it('should parse a key,value for over an object', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			forFlow('key', 'value', accessor(reference('vars'), 'config'), [logStatement(reference('key'))])
		);
	});

	it('should parse a for over a plain range', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			forFlow(null, 'i', range(0, null, 10), [logStatement(reference('i'))])
		);
	});

	it('should parse a for over a range with a step', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			forFlow(null, 'i', range(0, step('+', 4), 100), [logStatement(reference('i'))])
		);
	});
});
