// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { reference, selector, click, withinStatement, withinEveryStatement } from '../util/ast-builder.ts';
// #endregion

describe('Within Scoping', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse within with block braces', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			withinStatement(selector('.modal'), [click('right', undefined, selector('.close'))])
		);
	});

	it('should parse within with a single unbraced statement', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			withinStatement(selector('.sidebar'), [click('right', undefined, selector('.link'))])
		);
	});

	it('should parse within every', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			withinEveryStatement(reference('items'), [click('right', undefined, selector('.expand'))])
		);
	});
});
