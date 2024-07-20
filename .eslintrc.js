module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    'jest/globals': true
  },
  extends: [
    'standard'
  ],
  ignorePatterns: [
    'example/*'
  ],
  plugins: [
    'jest',
    '@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: ['error', 2],
    'no-use-before-define': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
