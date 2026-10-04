import {defineConfig} from 'eslint/config';
import xo from 'eslint-config-xo';

export default defineConfig([
	...xo(),
	{
		rules: {
			// https://github.com/sindresorhus/eslint-plugin-unicorn/issues/3813
			'unicorn/no-top-level-side-effects': 'off',
		},
	},
	{
		files: ['test/**/*'],
		rules: {
			'jsdoc/require-description': 'off',
			'jsdoc/require-param-description': 'off',
		},
	},
]);
