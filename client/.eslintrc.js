module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'airbnb-base',
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    // 'no-console': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'require-await': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'import/extensions': 'off'
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  settings: {
    'import/extensions': [
      'error',
      'always',
      {
        vue: 'never',
        js: 'never',
        mjs: 'never'
      }
    ],
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.vue']
      }
    }
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        // 'prettier/prettier': 'off'
        'import/extensions': 'off'
      }
    }
  ]
}
