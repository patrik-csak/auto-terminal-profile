import {suite, test} from 'node:test';

/**
@param {import('node:test').TestContext} t
*/
async function setup(t) {
	const darkMode = {isEnabled: t.mock.fn()};
	t.mock.module('dark-mode', {exports: {default: darkMode}});
	// https://github.com/nodejs/node/issues/59163
	const {default: getCurrentMode} = await import(`../../source/library/get-current-mode.js?test=${t.name}`);

	return {getCurrentMode, darkMode};
}

suite('getCurrentMode', () => {
	test('returns dark when dark mode is enabled', async t => {
		const {getCurrentMode, darkMode} = await setup(t);

		darkMode.isEnabled.mock.mockImplementation(async () => true);

		t.assert.strictEqual(await getCurrentMode(), 'dark');
	});

	test('returns light when dark mode is disabled', async t => {
		const {getCurrentMode, darkMode} = await setup(t);

		darkMode.isEnabled.mock.mockImplementation(async () => false);

		t.assert.strictEqual(await getCurrentMode(), 'light');
	});
});
