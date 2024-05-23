exports.config = {
  plugins: ['import'],
  settings: {
    'import/internal-regex': '^@(ngx-intersection|ng-in-viewport)/',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  extends: ['plugin:import/recommended', 'plugin:import/typescript'],
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        allowSeparatedGroups: true,
      },
    ],
    'import/first': 'warn',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'unknown'], 'internal', 'parent', ['sibling', 'index'], 'object', 'type'],
        pathGroups: [
          {
            pattern: '@angular/!(cdk|cdk-*|material|material-*){/**,}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@angular/{cdk,material}{-*,}{/**,}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@{ngx-intersection,ng-in-viewport}/**',
            group: 'internal',
          },
        ],
        distinctGroup: true,
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
