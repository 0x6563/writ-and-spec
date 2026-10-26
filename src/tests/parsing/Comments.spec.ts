// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { inlineComment, blockComment } from '../util/ast-builder.ts';
// #endregion

describe('Comments', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse an inline comment', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(inlineComment('inline comment text'));
	});

	it('should parse a block comment', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(blockComment('block comment text '));
	});
});
