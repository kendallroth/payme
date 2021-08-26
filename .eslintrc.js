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
    "@react-native-community",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // Disable ESLint rules that would conflict with Prettier
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "warn",
    "prettier/prettier": "warn",
    "prefer-const": "warn",
    "react/display-name": "off",
    "react-native/no-color-literals": "warn",
    "react-native/no-inline-styles": "off",
    "react-native/no-unused-styles": "warn",
  },
};
