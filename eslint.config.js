import e18e from '@e18e/eslint-plugin';
import {defineConfig} from 'eslint/config';
import packageJson from 'eslint-plugin-package-json';
import xo from 'xo';

export default defineConfig([
	e18e.configs.recommended,
	...xo.xoToEslintConfig([
		{
			prettier: 'compat',
		},
	]),
	{
		files: ['package.json'],
		extends: [packageJson.configs.recommended, packageJson.configs.stylistic],
	},
]);
