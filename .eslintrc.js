module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'operator-linebreak': 'off',
    'arrow-parens': 'off',
    'brace-style': 'off',
    'consistent-return': 'off',
    'padded-blocks': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
  },
};
