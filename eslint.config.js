import {defineConfig} from 'eslint/config';
import packageJson from 'eslint-plugin-package-json';
import xo from 'xo';

export default defineConfig([
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
