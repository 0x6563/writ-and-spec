// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, is, click, whileFlow, untilFlow } from '../util/ast-builder.ts';
// #endregion

describe('While Until Loops', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse while', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			whileFlow(
				is('is', selector('.spinner'), 'visible'),
				[click('right', undefined, selector('.retry'))]
			)
		);
	});

	it('should parse until', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			untilFlow(
				is('is', selector('.result'), 'visible'),
				[click('right', undefined, selector('.retry'))]
			)
		);
	});
});
