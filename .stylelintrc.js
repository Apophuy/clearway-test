module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  plugins: ['stylelint-prettier'],
  rules: {
    'max-nesting-depth': [5, { ignoreAtRules: ['pseudo-classes', 'media'], severity: 'warning' }],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use', 'include', 'import', 'mixin', 'function', 'if', 'error', 'return'],
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        ignoreFunctions: [],
      },
    ],
    'function-name-case': [
      'lower',
      {
        ignoreFunctions: ['/(^[a-z]|[A-Z0-9])[a-z]*/'],
        severity: 'warning',
      },
    ],
    'no-descending-specificity': [
      true,
      {
        severity: 'warning',
      },
    ],
    'alpha-value-notation': [
      'number',
      {
        exceptProperties: [],
      },
    ],
    'color-function-notation': 'legacy',
    'selector-class-pattern': ['[a-zA-Z]+(_[a-zA-Z]+)*'],
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep'] }],
    'color-hex-length': 'long',
    'scss/dollar-variable-pattern': ['[a-z][a-zA-Z]+'],
    'scss/at-function-pattern': '[a-z]+(?:[A-Z0-9]+[a-z0-9]+[A-Za-z0-9]*)*',
  },
};
