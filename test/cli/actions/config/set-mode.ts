import {suite, test, type TestContext} from 'node:test';
import type {ConsolaInstance} from 'consola';
import type {assertTerminalProfile, setTerminalProfile} from 'mac-terminal';
import type * as setModeModule from '../../../../source/cli/actions/config/set-mode.ts';
import type {AtpConf, getCurrentMode} from '../../../../source/library/index.ts';

async function setup(t: TestContext) {
	const consola = {success: t.mock.fn<ConsolaInstance['success']>()};
	t.mock.module('consola', {namedExports: {consola}});

	const macTerminal = {
		assertTerminalProfile: t.mock.fn<typeof assertTerminalProfile>(),
		setTerminalProfile: t.mock.fn<typeof setTerminalProfile>(),
	};
	t.mock.module('mac-terminal', {namedExports: macTerminal});

	const config = {set: t.mock.fn<AtpConf['set']>()};
	const library = {
		getConfig: t.mock.fn(async () => config),
		getCurrentMode: t.mock.fn<typeof getCurrentMode>(),
	};
	t.mock.module('../../../../source/library/index.ts', {namedExports: library});

	// https://github.com/nodejs/node/issues/59163
	const {default: setMode} = await import(`../../../../source/cli/actions/config/set-mode.ts?test=${t.name}`) as typeof setModeModule;

	return {
		config, consola, library, macTerminal, setMode,
	};
}

suite('setMode', () => {
	test('saves profile for given mode', async (t: TestContext) => {
		const {config, consola, library, macTerminal, setMode} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.deepStrictEqual(
			config.set.mock.calls[0]?.arguments,
			['profiles.dark', 'Profile'],
			'setMode didn\'t call config.set correctly',
		);
		t.assert.strictEqual(
			macTerminal.assertTerminalProfile.mock.calls[0]?.arguments[0],
			'Profile',
			'setMode didn\'t call assertTerminalProfile',
		);
		t.assert.deepStrictEqual(
			consola.success.mock.calls[0]?.arguments,
			['saved configuration'],
			'setMode didn\'t log success message',
		);
	});

	test('updates profile when given mode matches current mode', async (t: TestContext) => {
		const {library, macTerminal, setMode} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'dark');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.strictEqual(macTerminal.setTerminalProfile.mock.callCount(), 1);
		t.assert.deepStrictEqual(
			macTerminal.setTerminalProfile.mock.calls[0]?.arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	test('doesn\'t update profile when given mode is different than current mode', async (t: TestContext) => {
		const {library, macTerminal, setMode} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		t.assert.strictEqual(macTerminal.setTerminalProfile.mock.callCount(), 0);
	});

	test('throws when profile isn\'t valid', async (t: TestContext) => {
		const {macTerminal, setMode} = await setup(t);

		macTerminal.assertTerminalProfile.mock.mockImplementation(async () => {
			throw new Error('Invalid profile');
		});

		await t.assert.rejects(setMode({mode: 'dark', profile: 'Nonexistent'}), {
			message: 'Invalid profile',
		});
	});
});
