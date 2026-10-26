// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, assignment, click, browserEventCapture, nextEvent, newRef, event } from '../util/ast-builder.ts';
// #endregion

describe('Capture and New References', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse tab from ACTION', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			assignment('reportTab', browserEventCapture('tab', [click('right', undefined, selector('.open-report'))]))
		);
	});

	it('should parse next EVENT as a value', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(
			assignment('tab3', nextEvent(event('tab', 'opened')))
		);
	});

	it('should parse new tab', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(
			assignment('myTab', newRef('tab'))
		);
	});

	it('should parse new session', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			assignment('guest', newRef('session'))
		);
	});

	it('should parse new timer', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(
			assignment('a', newRef('timer'))
		);
	});
});
