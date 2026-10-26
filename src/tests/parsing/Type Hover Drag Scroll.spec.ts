// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, typeAction, hoverAction, dragAction, scrollAction } from '../util/ast-builder.ts';
// #endregion

describe('Type Hover Drag Scroll', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse type with no behavior', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			typeAction(undefined, selector('.field'), 'value')
		);
	});

	it('should parse type with a behavior modifier', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			typeAction('slowly', selector('.field'), 'value')
		);
	});

	it('should parse hover with no behavior', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			hoverAction(undefined, selector('.menu'))
		);
	});

	it('should parse hover with a behavior modifier', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			hoverAction('smoothly', selector('.menu'))
		);
	});

	it('should parse drag with no behavior', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(
			dragAction(undefined, selector('.card'), selector('.target'))
		);
	});

	it('should parse drag with a behavior modifier', function () {
		expect(result[0].block.data.statements[5]).to.deep.equal(
			dragAction('smoothly', selector('.card'), selector('.target'))
		);
	});

	it('should parse scroll to a selector with no behavior', function () {
		expect(result[0].block.data.statements[6]).to.deep.equal(
			scrollAction(undefined, selector('.footer'))
		);
	});

	it('should parse scroll to a selector with a behavior modifier', function () {
		expect(result[0].block.data.statements[7]).to.deep.equal(
			scrollAction('slowly', selector('.footer'))
		);
	});

	it('should parse scroll to a reserved location keyword', function () {
		expect(result[0].block.data.statements[8]).to.deep.equal(
			scrollAction(undefined, 'bottom')
		);
	});
});
