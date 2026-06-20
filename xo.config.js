import e18e from '@e18e/eslint-plugin';
import packageJson from 'eslint-plugin-package-json/experimental';

/** @type {import('xo').FlatXoConfig} */
const config = [
	// Global ignores must be in its own object
	// https://github.com/xojs/xo/tree/v3.0.1#ignores
	{
		ignores: ['package-lock.json'],
	},

	{
		prettier: 'compat',
	},

	e18e.configs.recommended,

	packageJson.configs.recommended,
	packageJson.configs.stylistic,
	{
		rules: {
			'package-json/require-exports': 'off',
			'package-json/require-sideEffects': 'off',
		},
	},
];

export default config;
