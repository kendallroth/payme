module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    // NOTE: Had to disable this config because it caused problems after an Expo upgrade.
    //         Have posted in a GitHub issue but am still awaiting a resolution. Instead,
    //         the individual ESLint packages are installed/configured here temporarily.
    //       Added configs 'plugin:react-hooks/recommended' and plugins 'react-native'
    // "@react-native-community",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    // Disable ESLint rules that would conflict with Prettier
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-native"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "styles" },
    ],
    "@typescript-eslint/explicit-function-return-type": "off", // Disable for all files (enable for TS)
    "no-console": "warn",
    "prettier/prettier": "warn",
    "prefer-const": "warn",
    "react/display-name": "off",
    "react-native/no-color-literals": "warn",
    "react-native/no-inline-styles": "off",
    // TODO: Determine if this rule is working
    "react-native/no-unused-styles": "warn",
  },
  overrides: [
    // TypeScript overrides
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "warn",
      },
    },
  ],
};
