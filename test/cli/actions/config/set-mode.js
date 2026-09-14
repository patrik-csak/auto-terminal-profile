import {suite, test} from 'node:test';

/**
@param {import('node:test').TestContext} t
*/
async function setup(t) {
	const consola = {success: t.mock.fn()};
	t.mock.module('consola', {exports: {consola}});

	const macTerminal = {
		assertTerminalProfile: t.mock.fn(),
		setTerminalProfile: t.mock.fn(),
	};
	t.mock.module('mac-terminal', {exports: macTerminal});

	const config = {set: t.mock.fn()};
	const library = {
		getConfig: t.mock.fn(async () => config),
		getCurrentMode: t.mock.fn(),
	};
	t.mock.module('#library', {exports: library});

	// https://github.com/nodejs/node/issues/59163
	const {default: setMode} = await import(`../../../../source/cli/actions/config/set-mode.js?test=${t.name}`);

	return {
		setMode, consola, config, library, macTerminal,
	};
}

suite('setMode', () => {
	test('saves profile for given mode', async t => {
		const {setMode, config, library} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.strictEqual(config.set.mock.calls[0].arguments[0], 'profiles.dark');
		t.assert.strictEqual(config.set.mock.calls[0].arguments[1], 'Profile');
	});

	test('asserts terminal profile', async t => {
		const {setMode, library, macTerminal} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.strictEqual(
			macTerminal.assertTerminalProfile.mock.calls[0].arguments[0],
			'Profile',
		);
	});

	test('logs success message', async t => {
		const {setMode, consola, library} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.match(
			consola.success.mock.calls[0].arguments[0],
			/saved configuration/v,
		);
	});

	test('updates profile when mode matches current mode', async t => {
		const {setMode, library, macTerminal} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'dark');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.strictEqual(macTerminal.setTerminalProfile.mock.callCount(), 1);
		t.assert.deepStrictEqual(
			macTerminal.setTerminalProfile.mock.calls[0].arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	test('doesn\'t update profile when mode doesn\'t match current mode', async t => {
		const {setMode, library, macTerminal} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.strictEqual(macTerminal.setTerminalProfile.mock.callCount(), 0);
	});

	test('throws when profile isn\'t valid', async t => {
		const {setMode, macTerminal} = await setup(t);

		macTerminal.assertTerminalProfile.mock.mockImplementation(async () => {
			throw new Error('Invalid profile');
		});

		await t.assert.rejects(setMode({mode: 'dark', profile: 'Nonexistent'}), {
			message: 'Invalid profile',
		});
	});
});
