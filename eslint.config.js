import e18e from '@e18e/eslint-plugin';
import deMorgan from 'eslint-plugin-de-morgan';
import packageJson from 'eslint-plugin-package-json';
import perfectionist from 'eslint-plugin-perfectionist';
import {defineConfig} from 'eslint/config';
import xo from 'xo';

export default defineConfig([
	{
		extends: [
			deMorgan.configs.recommended,
			e18e.configs.recommended,
			perfectionist.configs['recommended-natural'],
			xo.xoToEslintConfig([
				{
					prettier: 'compat',
					rules: {
						'import-x/order': 'off',
					},
				},
			]),
		],
		files: ['**/*.js'],
		rules: {
			'e18e/prefer-static-regex': 'off',
		},
	},
	{
		extends: [packageJson.configs.recommended, packageJson.configs.stylistic],
		files: ['package.json'],
		rules: {
			'package-json/require-exports': 'off',
			'package-json/require-sideEffects': 'off',
			'package-json/scripts-name-casing': 'off',
		},
	},
]);
