import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';


export default [
  { files: ['**/*.{ts,mts,cts}'], languageOptions: { parser: tsParser } },
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      "nonblock-statement-body-position": ["error", "below"],
      "semi": ["error", "always"]
    }
  }
];