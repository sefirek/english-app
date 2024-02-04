module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs,ts,tsx}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		eqeqeq: 'error',
		'no-console': 'warn',
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'prettier/prettier': [2, { useTabs: true }],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-unused-vars': 'warn'
	},
	ignorePatterns: ['node_modules', 'build', 'dist', 'public']
};
