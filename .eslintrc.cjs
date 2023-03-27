module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', '@tanstack/query'],
  rules: {
    semi: ['error', 'always'],
    quote: ['warning', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': ['error'],
  },
  root: true,
};
