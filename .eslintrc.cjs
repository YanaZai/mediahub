/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    ignorePatterns: ['dist/', 'node_modules/', '.husky/'],
    parserOptions: {
      project: ['tsconfig.json'],
      sourceType: 'module',
    },
    overrides: [
      // TypeScript + Angular
      {
        files: ['*.ts'],
        parser: '@typescript-eslint/parser',
        plugins: [
          '@angular-eslint',
          '@typescript-eslint',
          'simple-import-sort',
          'unused-imports',
        ],
        extends: [
          'plugin:@angular-eslint/recommended',
          'plugin:@typescript-eslint/recommended',
          'eslint:recommended',
        ],
        rules: {
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
  
      // Шаблоны
      {
        files: ['*.html'],
        extends: ['plugin:@angular-eslint/template/recommended'],
        rules: {},
      },
    ],
  };
  