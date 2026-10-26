// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { accessor, reference, selector, dimension, closeAction, resizeAction, uploadAction } from '../util/ast-builder.ts';
// #endregion

describe('Close Resize Upload', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse close tab', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(closeAction('tab'));
	});

	it('should parse close popup', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(closeAction('popup'));
	});

	it('should parse resize tab with width and height', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(resizeAction(dimension(1280, 'px'), dimension(720, 'px')));
	});

	it('should parse upload', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(
			uploadAction(accessor(reference('vars'), 'filePath'), selector('.file-input'))
		);
	});
});
