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
    'no-unused-vars': 'off'
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        // 'prettier/prettier': 'off'
      }
    }
    // {
    //   files: [
    //     '*.vue'
    //     // "**/__tests__/*.{j,t}s?(x)",
    //     // "**/tests/unit/**/*.spec.{j,t}s?(x)"
    //   ],
    //   env: {
    //     browser: true,
    //     es6: true
    //   }
    // }
  ]
}
