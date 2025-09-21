import xo from 'xo';

export default xo.xoToEslintConfig([
	{
		prettier: 'compat',
		rules: {
			'no-await-in-loop': 'off',
			'unicorn/no-process-exit': 'off',
		},
	},
]);
