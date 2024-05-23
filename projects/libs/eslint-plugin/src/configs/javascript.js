exports.config = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    /**
     * Until ESM usage in Node matures, using require in e.g. JS config files
     * is by far the more common thing to do, so disabling this to avoid users
     * having to frequently use "eslint-disable-next-line" in their configs.
     */
    '@typescript-eslint/no-var-requires': 'off',
    /**
     * From https://typescript-eslint.io/blog/announcing-typescript-eslint-v6/#updated-configuration-rules
     *
     * The following rules were added to preserve the linting rules that were
     * previously defined v5 of `@typescript-eslint`. v6 of `@typescript-eslint`
     * changed how configurations are defined.
     *
     * TODO(v20): re-evalute these deviations from @typescript-eslint/recommended in v20 of Nx
     */
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
