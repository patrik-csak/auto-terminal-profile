import {
	suite,
	test,
	type TestContext,
} from 'node:test';
import type darkModeModule from 'dark-mode';
import type * as updateModule from '../../../source/cli/actions/update.ts';
import type * as watchModule from '../../../source/cli/actions/watch.ts';

async function setup(t: TestContext) {
	const darkMode = {watch: t.mock.fn<typeof darkModeModule.watch>()};
	t.mock.module('dark-mode', {defaultExport: darkMode});

	// https://github.com/nodejs/node/issues/59163
	const update = t.mock.fn<typeof updateModule.default>(async () => {/* empty */});
	t.mock.module('../../../source/cli/actions/update.ts', {defaultExport: update});

	// https://github.com/nodejs/node/issues/59163
	const {default: watch} = await import(`../../../source/cli/actions/watch.ts?test=${t.name}`) as typeof watchModule;

	await watch();
	const darkModeWatchCall = darkMode.watch.mock.calls[0];
	t.assert.ok(darkModeWatchCall);
	const [darkModeWatchCallback] = darkModeWatchCall.arguments;

	return {darkMode, darkModeWatchCallback, update};
}

suite('watch', () => {
	test('updates on start', async (t: TestContext) => {
		const {update} = await setup(t);

		t.assert.strictEqual(update.mock.callCount(), 1);
		t.assert.deepStrictEqual(update.mock.calls[0]?.arguments, []);
	});

	test('watches for appearance changes', async (t: TestContext) => {
		const {darkMode} = await setup(t);

		t.assert.strictEqual(darkMode.watch.mock.callCount(), 1);
	});

	test('updates the terminal profile when dark mode is enabled', async (t: TestContext) => {
		const {darkModeWatchCallback, update} = await setup(t);

		darkModeWatchCallback(true);

		t.assert.deepStrictEqual(
			update.mock.calls[1]?.arguments[0],
			{mode: 'dark'},
		);
	});

	test('updates the terminal profile when dark mode is disabled', async (t: TestContext) => {
		const {darkModeWatchCallback, update} = await setup(t);

		darkModeWatchCallback(false);

		t.assert.deepStrictEqual(
			update.mock.calls[1]?.arguments[0],
			{mode: 'light'},
		);
	});
});
