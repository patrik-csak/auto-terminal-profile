import {defineConfig, globalIgnores} from 'eslint/config';
import xo from 'eslint-config-xo';

export default defineConfig([
	globalIgnores(['package-lock.json']),

	...xo(),

	{
		rules: {
			// TODO: Fix these
			'node-test/prefer-context-mock': 'off',
		},
	},
]);
