#!/usr/bin/env node
/**
 * Compiles src/grammars/main (+lexer) into src/grammars/compiled.js, an ESM
 * module exporting the runtime parser class, so consumers (src/index.ts, the
 * interpreter) can import it directly without invoking grammar-well's
 * generator at process start.
 *
 * Usage: node scripts/compile-grammar.ts
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { compileGrammar, grammarDir, mainPath } from "../src/util/compile-grammar.ts";

const outPath = join(grammarDir, "compiled.js");
const source = await compileGrammar("esm");
await writeFile(outPath, source, "utf-8");
console.log(`Compiled ${mainPath} -> ${outPath}`);
