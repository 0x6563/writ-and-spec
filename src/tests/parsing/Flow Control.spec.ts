// #region node:test harness (stripped for Grammar-Well Studio)
import { describe, it } from 'node:test';
import { expect } from 'chai';
import { parseSpecInput } from '../util/parse-spec-input.ts';
import type { AST } from '../../types/ast.ts';
const { error, result: rawResult } = await parseSpecInput(import.meta.url);
const result = rawResult as AST.Script[];
// #endregion

// #region ast-builder (inlined for Grammar-Well Studio)
import { flowControl } from '../util/ast-builder.ts';
// #endregion

describe('Flow Control', function () {
	it('should not error', function () {
		expect(error).to.be.undefined;
	});

	it('should not be ambigous', function () {
		expect(result).to.be.an('array');
		expect(result.length).to.equal(1);
	});

	it('should parse bare stop with no target', function () {
		expect(result[0].block.data.statements[0]).to.deep.equal(flowControl('stop', undefined));
	});

	it('should parse bare skip with no target', function () {
		expect(result[0].block.data.statements[1]).to.deep.equal(flowControl('skip', undefined));
	});

	it('should parse stop suite', function () {
		expect(result[0].block.data.statements[2]).to.deep.equal(flowControl('stop', 'suite'));
	});

	it('should parse stop app', function () {
		expect(result[0].block.data.statements[3]).to.deep.equal(flowControl('stop', 'app'));
	});

	it('should parse stop event', function () {
		expect(result[0].block.data.statements[4]).to.deep.equal(flowControl('stop', 'event'));
	});
});
