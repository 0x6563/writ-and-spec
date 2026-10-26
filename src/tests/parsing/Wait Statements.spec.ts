// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, is, duration, durationList, waitStatement, waitUntilStatement, waitUntilNextStatement, event } from '../util/ast-builder.ts';
// #endregion

describe('Wait Statements', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse wait DURATION', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			waitStatement(durationList(duration(30, 's')))
		);
	});

	it('should parse wait until EXPRESSION', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			waitUntilStatement(is('is', selector('.result'), 'visible'))
		);
	});

	it('should parse wait until next EVENT', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			waitUntilNextStatement(event('tab', 'opened'))
		);
	});
});
