module.exports = [
    {
        files: ['js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'script',
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
                SaveSystem: 'readonly',
                IntroSystem: 'readonly',
                ReactorSimulation: 'readonly',
                ReactorViewport: 'readonly',
                UIController: 'readonly',
                EventSystem: 'readonly',
                SoundSystem: 'readonly',
                MANUAL_PAGES: 'readonly',
                showGameConfirm: 'readonly',
                UIControllerNew: 'readonly',
                manualPagesPT: 'readonly',
                manualPagesEN: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': ['error', { args: 'none', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^(REACTOR_CONFIG|SaveSystem|IntroSystem|showGameConfirm)$', ignoreRestSiblings: true }],
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
