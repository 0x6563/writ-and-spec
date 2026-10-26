// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { accessor, reference, navigateTo, navigateDirection, domSubject } from '../util/ast-builder.ts';
// #endregion

describe('Navigate Actions', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse navigate to with no target tab (no target key at all)', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(navigateTo('https://example.com'));
	});

	it('should parse navigate to with a target tab', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			domSubject([reference('reportTab')], [navigateTo(accessor(reference('vars'), 'baseUrl'))])
		);
	});

	it('should parse navigate back', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(navigateDirection('back'));
	});

	it('should parse navigate forward', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(navigateDirection('forward'));
	});

	it('should parse navigate reload', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(navigateDirection('reload'));
	});
});
