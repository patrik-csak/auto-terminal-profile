import {beforeEach, describe, it, mock} from 'node:test';
import assert from 'node:assert/strict';

const macTerminal = {setTerminalProfile: mock.fn()};
mock.module('mac-terminal', {namedExports: macTerminal});

const config = {get: mock.fn()};
const library = {
	getCurrentMode: mock.fn(),
	getConfig: mock.fn(async () => config),
};
mock.module('#library', {namedExports: library});

const {default: update} = await import('../source/cli/actions/update.js');

describe('update', () => {
	beforeEach(() => {
		macTerminal.setTerminalProfile.mock.resetCalls();
		library.getCurrentMode.mock.resetCalls();
		library.getConfig.mock.resetCalls();
		config.get.mock.resetCalls();
	});

	it('sets the terminal profile for the given mode', async () => {
		config.get.mock.mockImplementation(() => 'Profile');

		await update({mode: 'dark'});

		assert.equal(config.get.mock.calls[0].arguments[0], 'profiles.dark');
		assert.deepEqual(
			macTerminal.setTerminalProfile.mock.calls[0].arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	it('uses current mode when mode is not provided', async () => {
		library.getCurrentMode.mock.mockImplementation(async () => 'light');
		config.get.mock.mockImplementation(() => 'Profile');

		await update({});

		assert.equal(library.getCurrentMode.mock.callCount(), 1);
		assert.equal(config.get.mock.calls[0].arguments[0], 'profiles.light');
	});

	it('does not call getCurrentMode when mode is provided', async () => {
		config.get.mock.mockImplementation(() => 'Profile');

		await update({mode: 'dark'});

		assert.equal(library.getCurrentMode.mock.callCount(), 0);
	});
});
