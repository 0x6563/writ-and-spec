import grammar from '../grammars/compiled.js';
import { Parse } from "grammar-well";
export async function ParseText(input: string) {
    return Parse(new grammar(), input, { algorithm: "earley" }, "first");
}
