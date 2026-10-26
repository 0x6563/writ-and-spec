// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, click, domSubject } from '../util/ast-builder.ts';
// #endregion

describe('Click Actions', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should default button to right with no click-type modifier', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			click('right', undefined, selector('.btn'))
		);
	});

	it('should capture the left click-type modifier', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			click('left', undefined, selector('.btn'))
		);
	});

	it('should capture double click-type and a behavior modifier', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			click('double', 'slowly', selector('.btn'))
		);
	});

	it('should capture an in-scope suffix', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			domSubject([selector('.modal')], [click('right', undefined, selector('.btn'))])
		);
	});
});
