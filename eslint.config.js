import {defineConfig, globalIgnores} from 'eslint/config';
import xo from 'eslint-config-xo';

export default defineConfig([
	globalIgnores(['package-lock.json']),

	...xo(),

	{
		files: ['test/**/*'],
		rules: {
			'jsdoc/require-description': 'off',
			'jsdoc/require-param-description': 'off',
		},
	},
]);
