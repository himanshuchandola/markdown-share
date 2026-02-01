const nextConfig = require('eslint-config-next')
const prettierConfig = require('eslint-config-prettier/flat')
const prettierPlugin = require('eslint-plugin-prettier')
const typescriptEslint = require('typescript-eslint')

module.exports = [
  ...nextConfig,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/set-state-in-effect': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'import/no-named-as-default': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [{ pattern: 'react', group: 'builtin', position: 'before' }],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    rules: { '@typescript-eslint/no-var-requires': 'off' },
  },
  {
    files: ['**/*.js', '**/*.cjs'],
    plugins: { '@typescript-eslint': typescriptEslint.plugin },
    rules: { '@typescript-eslint/no-var-requires': 'off' },
  },
  {
    files: ['next-env.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
  {
    files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      globals: {
        expect: 'readonly',
        it: 'readonly',
        test: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
  },
  {
    ignores: [
      'coverage/**',
      '.pnp.*',
      'public/sw.js',
      'public/workbox-*.js',
      'public/worker-*.js',
      '*.tsbuildinfo',
    ],
  },
]
