import {suite, test, type TestContext} from 'node:test';
import type darkMode from 'dark-mode';
import type * as currentModeModule from '../../source/library/get-current-mode.ts';

async function setup(t: TestContext) {
	const darkModeMock = {isEnabled: t.mock.fn<typeof darkMode.isEnabled>()};
	t.mock.module('dark-mode', {defaultExport: darkModeMock});
	// https://github.com/nodejs/node/issues/59163
	const {default: getCurrentMode} = await import(`../../source/library/get-current-mode.ts?test=${t.name}`) as typeof currentModeModule;

	return {getCurrentMode, darkMode: darkModeMock};
}

suite('getCurrentMode', () => {
	test('returns dark when dark mode is enabled', async (t: TestContext) => {
		const {getCurrentMode, darkMode} = await setup(t);

		darkMode.isEnabled.mock.mockImplementation(async () => true);

		t.assert.strictEqual(await getCurrentMode(), 'dark');
	});

	test('returns light when dark mode is disabled', async (t: TestContext) => {
		const {getCurrentMode, darkMode} = await setup(t);

		darkMode.isEnabled.mock.mockImplementation(async () => false);

		t.assert.strictEqual(await getCurrentMode(), 'light');
	});
});
