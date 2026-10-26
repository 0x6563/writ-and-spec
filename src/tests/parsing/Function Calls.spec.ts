// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { accessor, reference, assignment, call, devStatement } from '../util/ast-builder.ts';
// #endregion

describe('Function Calls', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse a call with no args', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(assignment('a', call('login', [])));
	});

	it('should parse a call with args', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			assignment('b', call('login', [
				accessor(reference('vars'), 'username'),
				accessor(reference('vars'), 'password')
			]))
		);
	});

	it('should parse dev CALL', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(devStatement(call('exit', [1])));
	});
});
