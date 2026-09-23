import {defineConfig} from 'eslint/config';
import xo from 'eslint-config-xo';

export default defineConfig([
	...xo(),

	{
		files: ['test/**/*'],
		rules: {
			'jsdoc/require-description': 'off',
			'jsdoc/require-param-description': 'off',
		},
	},
]);
