// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { selector, event, click, eventListener, closeAction, runStatement, call } from '../util/ast-builder.ts';
// #endregion

describe('Event Listeners', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse after with no qualifier', function () {
		expect(result[0].block.data.hoisted[0]).to.deep.equal(
			eventListener('after', 'every', event('popup', 'opened'), [closeAction('popup')])
		);
	});

	it('should parse before with no qualifier', function () {
		expect(result[0].block.data.hoisted[1]).to.deep.equal(
			eventListener('before', 'every', event('tab', 'closed'), [runStatement(call('cleanup', []))])
		);
	});

	it('should capture the next qualifier as timing', function () {
		expect(result[0].block.data.hoisted[2]).to.deep.equal(
			eventListener('after', 'next', event('popup', 'opened'), [click('right', undefined, selector('.accept'))])
		);
	});

	it('should run now-prefixed listeners in place instead of hoisting them', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(
			eventListener('after', 'every', event('dialog', 'opened'), [click('right', undefined, selector('.ok'))], true)
		);
	});
});
