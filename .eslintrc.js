module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': ['error', {
            prefixWithI: 'always'
        }],
        "no-console": "error",
    }
};