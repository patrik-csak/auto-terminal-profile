import {defineConfig, globalIgnores} from 'eslint/config';
import xo from 'eslint-config-xo';

export default defineConfig([
	globalIgnores(['distribution']),
	...xo(),
	{
		rules: {
			'unicorn/name-replacements': ['error', {allowList: {AtpConf: true}}],
		},
	},
	{
		files: ['test/**/*'],
		rules: {
			'jsdoc/require-description': 'off',
			'jsdoc/require-param-description': 'off',
			// Incompatible with es2022 TypeScript target
			'require-unicode-regexp': 'off',
		},
	},
]);
