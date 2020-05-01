module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    // '@nuxtjs',
    'prettier',
    // 'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'require-await': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  settings: {
    'import/extensions': ['.mjs', '.js'],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js'],
      },
    },
  },
  overrides: [
    {
      files: [
        '.vscode/*',
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        node: true,
        es6: true,
      },
    },
  ],
};
