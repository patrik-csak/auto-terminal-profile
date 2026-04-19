import {beforeEach, describe, it, mock} from 'node:test';
import assert from 'node:assert/strict';

const consola = {success: mock.fn()};
mock.module('consola', {namedExports: {consola}});

const macTerminal = {setTerminalProfile: mock.fn()};
mock.module('mac-terminal', {namedExports: macTerminal});

const config = {set: mock.fn()};
const library = {
	getCurrentMode: mock.fn(),
	getConfig: mock.fn(async () => config),
};
mock.module('#library', {namedExports: library});

const {default: setMode} =
	await import('../source/cli/actions/config/set-mode.js');

describe('setMode', () => {
	beforeEach(() => {
		consola.success.mock.resetCalls();
		macTerminal.setTerminalProfile.mock.resetCalls();
		library.getCurrentMode.mock.resetCalls();
		library.getConfig.mock.resetCalls();
		config.set.mock.resetCalls();
	});

	it('saves the profile for the given mode', async () => {
		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		assert.equal(config.set.mock.calls[0].arguments[0], 'profiles.dark');
		assert.equal(config.set.mock.calls[0].arguments[1], 'Profile');
	});

	it('logs a success message', async () => {
		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		assert.match(
			consola.success.mock.calls[0].arguments[0],
			/Saved configuration/v,
		);
	});

	it('updates terminal profile when mode matches current mode', async () => {
		library.getCurrentMode.mock.mockImplementation(async () => 'dark');

		await setMode({mode: 'dark', profile: 'Profile'});

		assert.equal(macTerminal.setTerminalProfile.mock.callCount(), 1);
		assert.deepEqual(
			macTerminal.setTerminalProfile.mock.calls[0].arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	it('does not update terminal profile when mode differs from current mode', async () => {
		library.getCurrentMode.mock.mockImplementation(async () => 'light');

		await setMode({mode: 'dark', profile: 'Profile'});

		assert.equal(macTerminal.setTerminalProfile.mock.callCount(), 0);
	});
});
