// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, is, verify, logStatement, ifFlow } from '../util/ast-builder.ts';
// #endregion

const dashboardVisible = is('is', selector('.dashboard'), 'visible');

describe('Verify Can Cant', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a bare if verify condition', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			ifFlow(verify(dashboardVisible), [logStatement('passed')])
		);
	});

	it('should parse an if can verify condition', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			ifFlow(verify(dashboardVisible, 'can'), [logStatement('passed')])
		);
	});

	it('should parse an if cant verify condition', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			ifFlow(verify(dashboardVisible, 'cant'), [logStatement('failed')])
		);
	});

	it("should parse an if can't verify condition", function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			ifFlow(verify(dashboardVisible, "cant"), [logStatement('failed')])
		);
	});
});
