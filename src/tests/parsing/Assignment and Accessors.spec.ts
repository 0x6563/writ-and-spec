// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { accessor, reference, assignment } from '../util/ast-builder.ts';
// #endregion

describe('Assignment and Accessors', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should assign a bare word target', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			assignment('x', 1)
		);
	});

	it('should assign a chained dot-accessor target', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			assignment(accessor(reference('vars'), 'user', 'name'), 'test')
		);
	});

	it('should assign a bracket-index target', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			assignment(accessor(reference('items'), 0), 'x')
		);
	});

	it('should read a dot-accessor value', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			assignment('y', accessor(reference('item'), 'text'))
		);
	});

	it('should read a possessive-accessor value identically to dot notation', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(
			assignment('z', accessor(reference('item'), 'text'))
		);
	});
});
