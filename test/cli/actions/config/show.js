import {suite, test} from 'node:test';

/**
@param {import('node:test').TestContext} t
*/
async function setup(t) {
	const console = {
		log: t.mock.fn(),
	};
	t.mock.module('node:console', {exports: {default: console}});

	const config = {get: t.mock.fn()};
	const library = {
		getConfig: t.mock.fn(async () => config),
		modes: ['dark', 'light'],
	};
	t.mock.module('#library', {exports: library});
	// https://github.com/nodejs/node/issues/59163
	const {default: show} = await import(`../../../../source/cli/actions/config/show.js?test=${t.name}`);

	return {show, console, config};
}

suite('show', () => {
	test('logs mode profiles', async t => {
		const {show, console, config} = await setup(t);

		config.get.mock.mockImplementation(key =>
			key === 'profiles.dark'
				? 'Dark Profile'
				: 'Light Profile');

		await show();

		t.assert.match(console.log.mock.calls[0].arguments[0], /Dark Profile/v);
		t.assert.match(console.log.mock.calls[1].arguments[0], /Light Profile/v);
	});
});
