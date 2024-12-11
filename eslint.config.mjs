import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";

/** 
 * @type {import('eslint').Linter.Config[]} 
 */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: [
      "@typescript-eslint",
      "react",
    ],
    extends: [
      pluginJs.configs.recommended,
      tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    settings: {
      react: {
        version: 'detect', // Automatically detects the version of React
      },
    },
    rules: {
      "no-unused-vars": ["error", { "args": "none" }],  // Option to allow unused function arguments
      "no-undef": "error",  // Ensure no undefined variables
      "no-console": "warn",  // Optional, for preventing console.log in production code
      "eol-last": ["error", "always"],  // Ensure files end with a newline
      "no-useless-escape": "error", // Prevent unnecessary escapes
    },
  },
];
