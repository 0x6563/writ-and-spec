/**
 * Shared helper imported by each src/tests/parsing/*.spec.ts file.
 *
 * Compiles src/grammars/main (once per process, cached) and parses the .txt
 * file sitting next to whichever spec file calls parseSpecInput, mirroring
 * exactly what Grammar-Well Studio's grammar.worker.ts / parser.worker.ts
 * do: compile to CommonJS, eval it against a fake `module` object to get the
 * runtime parser class, then Parse(..., 'full').results.
 *
 * Packaging for Studio strips the two imports and the parseSpecInput call
 * from each spec file — Studio provides `error`/`result` as closure-scoped
 * variables instead.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Parse } from "grammar-well";
import type { RuntimeParserClass } from "grammar-well";
import { compileGrammar } from "../../util/compile-grammar.ts";

function evalCommonJS(source: string): RuntimeParserClass {
	const module = { exports: null as unknown as RuntimeParserClass };
	eval(source);
	return module.exports;
}

let parserClassPromise: Promise<RuntimeParserClass> | undefined;

function getParserClass(): Promise<RuntimeParserClass> {
	if (!parserClassPromise) {
		parserClassPromise = compileGrammar("commonjs").then(evalCommonJS);
	}
	return parserClassPromise;
}

export interface SpecInput {
	error: string | undefined;
	/** One entry per successful parse tree; each entry is that parse's top-level script node. */
	result: unknown[] | undefined;
}

export async function parseText(input: string): Promise<SpecInput> {
	const ParserClass = await getParserClass();

	try {
		const parsed = Parse(new ParserClass(), input, { algorithm: "earley" }, "full") as { results: unknown[] };
		return { error: undefined, result: parsed.results };
	} catch (error) {
		return { error: error instanceof Error ? error.message : String(error), result: undefined };
	}
}

export async function parseSpecInput(specFileUrl: string): Promise<SpecInput> {
	const specPath = fileURLToPath(specFileUrl);
	const txtPath = specPath.replace(/\.spec\.ts$/, ".txt");
	const input = await readFile(txtPath, "utf-8");
	return parseText(input);
}
