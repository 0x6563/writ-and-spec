// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, assignment, find, domSubject } from '../util/ast-builder.ts';
// #endregion

describe('Find Actions', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a single find', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			assignment('modal', find(false, selector('.modal')))
		);
	});

	it('should parse find every', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			assignment('items', find(true, selector('.item')))
		);
	});

	it('should parse find with an in-scope suffix', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			assignment('link', domSubject([selector('.nav')], [find(false, selector('a'))]))
		);
	});
});
