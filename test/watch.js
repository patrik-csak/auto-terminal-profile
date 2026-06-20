import assert from 'node:assert/strict';
import {
	beforeEach,
	describe,
	it,
	mock,
} from 'node:test';

let onModeChange;
const darkMode = {
	watch: mock.fn(callback => {
		onModeChange = callback;
	}),
};
mock.module('dark-mode', {defaultExport: darkMode});

const macTerminal = {setTerminalProfile: mock.fn()};
mock.module('mac-terminal', {namedExports: macTerminal});

const config = {get: mock.fn(() => 'Profile')};
const library = {
	getConfig: mock.fn(async () => config),
	getCurrentMode: mock.fn(),
};
mock.module('#library', {namedExports: library});

const {default: watch} = await import('../source/cli/actions/watch.js');

describe('watch', () => {
	beforeEach(() => {
		darkMode.watch.mock.resetCalls();
		macTerminal.setTerminalProfile.mock.resetCalls();
		library.getConfig.mock.resetCalls();
		library.getCurrentMode.mock.resetCalls();
		config.get.mock.resetCalls();
	});

	it('watches for appearance changes', async () => {
		await watch();

		assert.equal(darkMode.watch.mock.callCount(), 1);
	});

	it('updates the terminal profile when dark mode is enabled', async () => {
		await watch();

		onModeChange(true);
		await new Promise(resolve => {
			setImmediate(resolve);
		});

		assert.deepEqual(
			macTerminal.setTerminalProfile.mock.calls[0].arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	it('updates the terminal profile when dark mode is disabled', async () => {
		await watch();

		onModeChange(false);
		await new Promise(resolve => {
			setImmediate(resolve);
		});

		assert.equal(config.get.mock.calls[0].arguments[0], 'profiles.light');
	});
});
