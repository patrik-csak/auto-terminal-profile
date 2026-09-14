import {suite, test} from 'node:test';

/**
@param {import('node:test').TestContext} t
*/
async function setup(t) {
	const macTerminal = {setTerminalProfile: t.mock.fn()};
	t.mock.module('mac-terminal', {exports: macTerminal});

	const config = {get: t.mock.fn()};
	const library = {
		getConfig: t.mock.fn(async () => config),
		getCurrentMode: t.mock.fn(),
	};
	t.mock.module('#library', {exports: library});

	// https://github.com/nodejs/node/issues/59163
	const {default: update} = await import(`../source/cli/actions/update.js?test=${t.name}`);

	return {
		update, config, library, macTerminal,
	};
}

suite('update', () => {
	test('sets profile for given mode', async t => {
		const {update, config, macTerminal} = await setup(t);

		config.get.mock.mockImplementation(() => 'Profile');

		await update({mode: 'dark'});

		t.assert.strictEqual(config.get.mock.calls[0].arguments[0], 'profiles.dark');
		t.assert.deepStrictEqual(
			macTerminal.setTerminalProfile.mock.calls[0].arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	test('uses current mode when no mode provided', async t => {
		const {update, config, library} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');
		config.get.mock.mockImplementation(() => 'Profile');

		await update({});

		t.assert.strictEqual(library.getCurrentMode.mock.callCount(), 1);
		t.assert.strictEqual(config.get.mock.calls[0].arguments[0], 'profiles.light');
	});

	test('doesn\'t use current mode when mode provided', async t => {
		const {update, config, library} = await setup(t);

		config.get.mock.mockImplementation(() => 'Profile');

		await update({mode: 'dark'});

		t.assert.strictEqual(library.getCurrentMode.mock.callCount(), 0);
	});
});
