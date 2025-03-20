import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const nextConfig = compat.extends("next/core-web-vitals");

const typescript = tseslint.config(
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        ...tseslint.configs.recommended,
      ],
      rules: {},
    }
);

export default [
  ...nextConfig,
  ...typescript,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "always"],
      "max-len": ["error", { "code": 100 }],
      "no-unused-vars": "warn",
      "object-curly-spacing": ["error", "always"],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
      "prettier/prettier": "error",
    },
  },
  prettierConfig,
];
