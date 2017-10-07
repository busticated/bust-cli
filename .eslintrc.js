module.exports = {
    extends: ["@bust/eslint-config"],
    parserOptions: {
        ecmaVersion: 2017
    },
    env: {
        jest: true
    },
    rules: {
        'no-magic-numbers': 0,
        'space-before-blocks': [2, {
            functions: 'never',
            keywords: 'never',
            classes: 'always'
        }]
    }
};
