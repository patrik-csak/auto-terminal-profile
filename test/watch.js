import {suite, test} from 'node:test';

/**
@param {import('node:test').TestContext} t
*/
async function setup(t) {
	const darkMode = {watch: t.mock.fn()};
	t.mock.module('dark-mode', {exports: {default: darkMode}});

	const macTerminal = {setTerminalProfile: t.mock.fn()};
	t.mock.module('mac-terminal', {exports: macTerminal});

	const config = {get: t.mock.fn(() => 'Profile')};
	const library = {
		getConfig: t.mock.fn(async () => config),
		getCurrentMode: t.mock.fn(),
	};
	t.mock.module('#library', {exports: library});

	// https://github.com/nodejs/node/issues/59163
	const {default: update} = await import(`../source/cli/actions/update.js?test=${t.name}`);
	t.mock.module('../source/cli/actions/update.js', {exports: {default: update}});

	// https://github.com/nodejs/node/issues/59163
	const {default: watch} = await import(`../source/cli/actions/watch.js?test=${t.name}`);

	return {
		watch, darkMode, config, macTerminal,
	};
}

suite('watch', () => {
	test('watches for appearance changes', async t => {
		const {watch, darkMode} = await setup(t);

		await watch();

		t.assert.strictEqual(darkMode.watch.mock.callCount(), 1);
	});

	test('updates the terminal profile when dark mode is enabled', async t => {
		const {watch, darkMode, macTerminal} = await setup(t);

		await watch();

		const [onModeChange] = darkMode.watch.mock.calls[0].arguments;
		onModeChange(true);
		await new Promise(resolve => {
			setImmediate(resolve);
		});

		t.assert.deepStrictEqual(
			macTerminal.setTerminalProfile.mock.calls[0].arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	test('updates the terminal profile when dark mode is disabled', async t => {
		const {watch, darkMode, config} = await setup(t);

		await watch();

		const [onModeChange] = darkMode.watch.mock.calls[0].arguments;
		onModeChange(false);
		await new Promise(resolve => {
			setImmediate(resolve);
		});

		t.assert.strictEqual(config.get.mock.calls[0].arguments[0], 'profiles.light');
	});
});
