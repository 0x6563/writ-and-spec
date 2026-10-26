// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, is, click, logStatement, ifFlow } from '../util/ast-builder.ts';
// #endregion

describe('If Else', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a single-statement if with no block braces', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			ifFlow(
				is('is', selector('.banner'), 'visible'),
				[click('right', undefined, selector('.dismiss'))]
			)
		);
	});

	it('should parse an if/else with block braces', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			ifFlow(
				is('is', selector('.modal'), 'visible'),
				[click('right', undefined, selector('.close'))],
				[logStatement('no modal')]
			)
		);
	});
});
