import e18e from '@e18e/eslint-plugin';
import json from '@eslint/json';
import {defineConfig} from 'eslint/config';
import packageJson from 'eslint-plugin-package-json';
import xo from 'xo';

export default defineConfig([
	e18e.configs.recommended,

	// https://github.com/e18e/eslint-plugin/tree/0.2.0?tab=readme-ov-file#linting-packagejson
	{
		files: ['package.json'],
		language: 'json/json',
		plugins: {
			e18e,
			json,
		},
		extends: ['e18e/recommended'],
	},

	packageJson.configs.recommended,
	packageJson.configs.stylistic,

	...xo.xoToEslintConfig([
		{
			prettier: 'compat',
			rules: {
				'no-await-in-loop': 'off',
				'unicorn/no-process-exit': 'off',
			},
		},
	]),
]);
