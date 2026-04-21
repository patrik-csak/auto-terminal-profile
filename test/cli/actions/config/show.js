import {beforeEach, describe, it, mock} from 'node:test';
import assert from 'node:assert/strict';

const console = {
	log: mock.fn(),
};
mock.module('node:console', {defaultExport: console});

const config = {get: mock.fn()};
const library = {
	getConfig: mock.fn(async () => config),
	modes: ['dark', 'light'],
};
mock.module('#library', {namedExports: library});

const {default: show} =
	await import('../../../../source/cli/actions/config/show.js');

describe('show', () => {
	beforeEach(() => {
		console.log.mock.resetCalls();
		library.getConfig.mock.resetCalls();
		config.get.mock.resetCalls();
	});

	it('logs each mode profile', async () => {
		config.get.mock.mockImplementation((key) =>
			key === 'profiles.dark' ? 'Dark Profile' : 'Light Profile',
		);

		await show();

		assert.match(console.log.mock.calls[0].arguments[0], /Dark Profile/v);
		assert.match(console.log.mock.calls[1].arguments[0], /Light Profile/v);
	});
});
