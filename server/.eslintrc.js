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
    // 'import/extensions': 'off',
    camelcase: [
      'error',
      { ignoreImports: true, allow: ['password_options', 'bcrypt_salt_rounds', 'token_options', 'byte_length'] },
    ],
    'no-restricted-syntax': [
      'off',
      {
        selector: 'ForOfStatement',
      },
    ],
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
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        mjs: 'never',
      },
    ],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js'],
      },
    },
  },
  overrides: [
    {
      files: ['.vscode/*', '**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        node: true,
        es6: true,
      },
    },
  ],
};
