// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { reference, assignment, array, object, prop } from '../util/ast-builder.ts';
// #endregion

describe('Literal Values', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a string', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(assignment('a', 'hello'));
	});

	it('should parse an integer', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(assignment('b', 42));
	});

	it('should parse a decimal', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(assignment('c', 3.14));
	});

	it('should parse a negative number', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(assignment('d', -5));
	});

	it('should parse true', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(assignment('e', true));
	});

	it('should parse false', function () {
		expect(result[0].block.data.statements[5]).to.deep.equal(assignment('f', false));
	});

	it('should parse null', function () {
		expect(result[0].block.data.statements[6]).to.deep.equal(assignment('g', null));
	});

	it('should parse an empty array', function () {
		expect(result[0].block.data.statements[7]).to.deep.equal(assignment('h', array([])));
	});

	it('should parse an array of numbers', function () {
		expect(result[0].block.data.statements[8]).to.deep.equal(assignment('i', array([1, 2, 3])));
	});

	it('should parse an empty object', function () {
		expect(result[0].block.data.statements[9]).to.deep.equal(assignment('j', object([])));
	});

	it('should parse an object with a key:value property', function () {
		expect(result[0].block.data.statements[10]).to.deep.equal(assignment('k', object([prop('name', 'test')])));
	});

	it('should parse an object with a shorthand property', function () {
		expect(result[0].block.data.statements[11]).to.deep.equal(assignment('l', object([prop('name', reference('name'))])));
	});
});
