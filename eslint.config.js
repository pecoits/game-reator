module.exports = [
    {
        files: ['js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                localStorage: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                performance: 'readonly',
                module: 'readonly',
                confirm: 'readonly',
                REACTOR_CONFIG: 'readonly',
                manualPagesPT: 'readonly',
                manualPagesEN: 'readonly',
                manualPagesES: 'readonly',
                manualPagesFR: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['error', { args: 'none', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^(REACTOR_CONFIG)$', ignoreRestSiblings: true }],
            'no-undef': 'error'
        }
    },
    {
        files: ['tests/**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                global: 'readonly',
                REACTOR_CONFIG: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['error', { args: 'none', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_', ignoreRestSiblings: true }],
            'no-undef': 'error'
        }
    }
];
