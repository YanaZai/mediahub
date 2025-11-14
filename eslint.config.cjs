const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplateParser = require('@angular-eslint/template-parser');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const unusedImports = require('eslint-plugin-unused-imports');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');

module.exports = tseslint.config(
  {
    ignores: ['dist/', 'node_modules/', '.husky/'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    ...tseslint.configs.recommended[0],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.app.json', 'tsconfig.spec.json'],
        sourceType: 'module',
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': tsPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      ...angularPlugin.configs.recommended.rules,
      // --- сортировка импортов
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1) Angular ядро и zone.js
            ['^@angular', '^zone\\.js'],
            // 2) rxjs
            ['^rxjs', '^rxjs/operators'],
            // 3) сторонние пакеты
            ['^@?\\w'],
            // 4) алиасы проекта (подставь свои пути, если есть)
            ['^@app(/.*)?$', '^@core(/.*)?$', '^@shared(/.*)?$', '^@env(/.*)?$'],
            // 5) ассеты/стили
            ['^.+\\.(?:s?css|less)$', '^@assets', '^@styles'],
            // 6) относительные: сначала родитель, потом соседние/текущая
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      // --- удаление неиспользуемых импортов и переменных
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // полезное строгое правило для импорта по расширениям
      'import/extensions': 'off', // если нет eslint-plugin-import — выключено

      // — по желанию: запрет default export в доменной логике
      // 'import/no-default-export': 'warn',
    },
  },
  {
    files: ['**/*.spec.ts'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        afterEach: 'readonly',
        jasmine: 'readonly',
      },
    },
  },
  {
    files: ['**/server.ts', '**/main.server.ts', '**/*.config.server.ts'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
  },
  {
    files: ['**/main.ts'],
    languageOptions: {
      globals: {
        console: 'readonly',
      },
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },
);
