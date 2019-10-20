module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2015
  },
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.dev.js'
      }
    }
  },
  rules: {
    //縮排單位
    "indent": ["error", 2],
    //字串引號
    "quotes": ["error", "single"],
    //分號
    "semi": ["error", "always"],
    //console
    // "no-console": "error",
    "no-console": "off",
    //箭號函式括號
    "arrow-parens": ["error", "always"],
    //function名稱
    "func-names": ["error", "as-needed"],

  }
}