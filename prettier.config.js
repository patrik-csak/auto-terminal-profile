/**
 * @type {import('prettier').Options}
 */
const config = {
	// https://github.com/xojs/xo#prettier
	bracketSpacing: false,
	singleQuote: true,
	useTabs: true,

	// https://github.com/JoshuaKGoldberg/eslint-plugin-package-json/tree/v0.83.0#usage-alongside-prettier
	plugins: ['prettier-plugin-packagejson'],
};

export default config;
