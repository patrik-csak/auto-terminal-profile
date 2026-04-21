import assert from 'node:assert/strict';
import {beforeEach, describe, it, mock} from 'node:test';

const darkMode = {isEnabled: mock.fn()};
mock.module('dark-mode', {defaultExport: darkMode});

const {default: getCurrentMode} =
	await import('../../source/library/get-current-mode.js');

describe('getCurrentMode', () => {
	beforeEach(() => {
		darkMode.isEnabled.mock.resetCalls();
	});

	it('returns dark when dark mode is enabled', async () => {
		darkMode.isEnabled.mock.mockImplementation(async () => true);

		assert.equal(await getCurrentMode(), 'dark');
	});

	it('returns light when dark mode is disabled', async () => {
		darkMode.isEnabled.mock.mockImplementation(async () => false);

		assert.equal(await getCurrentMode(), 'light');
	});
});
