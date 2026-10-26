// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { assignment, binary, unary } from '../util/ast-builder.ts';
// #endregion

describe('Operators', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse +', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(assignment('a', binary('+', 1, 2)));
	});

	it('should parse -', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(assignment('b', binary('-', 1, 2)));
	});

	it('should parse *', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(assignment('c', binary('*', 2, 3)));
	});

	it('should parse /', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(assignment('d', binary('/', 6, 2)));
	});

	it('should parse %', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(assignment('e', binary('%', 7, 2)));
	});

	it('should parse ^', function () {
		expect(result[0].block.data.statements[5]).to.deep.equal(assignment('f', binary('^', 2, 3)));
	});

	it('should parse <', function () {
		expect(result[0].block.data.statements[6]).to.deep.equal(assignment('g', binary('<', 1, 2)));
	});

	it('should parse >', function () {
		expect(result[0].block.data.statements[7]).to.deep.equal(assignment('hh', binary('>', 1, 2)));
	});

	it('should parse <=', function () {
		expect(result[0].block.data.statements[8]).to.deep.equal(assignment('i', binary('<=', 1, 2)));
	});

	it('should parse >=', function () {
		expect(result[0].block.data.statements[9]).to.deep.equal(assignment('j', binary('>=', 1, 2)));
	});

	it('should parse ==', function () {
		expect(result[0].block.data.statements[10]).to.deep.equal(assignment('k', binary('==', 1, 1)));
	});

	it('should parse !=', function () {
		expect(result[0].block.data.statements[11]).to.deep.equal(assignment('l', binary('!=', 1, 2)));
	});

	it('should parse and', function () {
		expect(result[0].block.data.statements[12]).to.deep.equal(assignment('mm', binary('and', true, false)));
	});

	it('should parse or', function () {
		expect(result[0].block.data.statements[13]).to.deep.equal(assignment('n', binary('or', true, false)));
	});

	it('should parse not as !', function () {
		expect(result[0].block.data.statements[14]).to.deep.equal(assignment('o', unary('!', true)));
	});

	it('should parse !', function () {
		expect(result[0].block.data.statements[15]).to.deep.equal(assignment('p', unary('!', true)));
	});

	it('should parse ..', function () {
		expect(result[0].block.data.statements[16]).to.deep.equal(assignment('q', binary('..', 'a', 'b')));
	});
});
