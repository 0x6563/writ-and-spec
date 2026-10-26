// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { accessor, reference, assignment, duration, durationList, dimension, binary } from '../util/ast-builder.ts';
// #endregion

describe('Time and Dimension Units', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a single duration segment', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			assignment('a', durationList(duration(400, 'ms')))
		);
	});

	it('should parse chained duration segments', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			assignment('b', durationList(duration(1, 'h'), duration(30, 'm')))
		);
	});

	it('should parse a dimension literal', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			assignment('c', dimension(10, 'px'))
		);
	});

	it('should parse arithmetic between an accessor and a duration', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			assignment('d', binary('+', accessor(reference('vars'), 'baseTimeout'), durationList(duration(30, 's'))))
		);
	});
});
