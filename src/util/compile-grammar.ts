import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Generate } from "grammar-well";
import type { GeneratorExportFormat, ImportResolver } from "grammar-well";

export const grammarDir = join(dirname(fileURLToPath(import.meta.url)), "..", "grammars");
export const mainPath = join(grammarDir, "main");

class DictionaryResolver implements ImportResolver {
	private files: Record<string, string>;
	private baseDir: string;
	constructor(files: Record<string, string>, baseDir: string) {
		this.files = files;
		this.baseDir = baseDir;
	}

	path(path: string): string {
		return path in this.files ? path : join(this.baseDir, path);
	}

	async body(path: string): Promise<string> {
		if (path in this.files)
			return this.files[path];
		return readFile(path, "utf-8");
	}
}

export async function compileGrammar(format: GeneratorExportFormat): Promise<string> {
	const [main, lexer] = await Promise.all([
		readFile(mainPath, "utf-8"),
		readFile(join(grammarDir, "lexer"), "utf-8"),
	]);

	return (await Generate(main, {
		basedir: mainPath,
		resolver: new DictionaryResolver({ lexer }, grammarDir),
		output: { name: "grammar", format },
	})) as string;
}
