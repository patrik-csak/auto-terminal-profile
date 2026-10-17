import {suite, test, type TestContext} from 'node:test';
import type * as showModule from '../../../../source/cli/actions/config/show.ts';
import type {AtpConf} from '../../../../source/library/index.ts';

declare const configuration: AtpConf;

async function setup(t: TestContext) {
	const console = {
		log: t.mock.fn<Console['log']>(),
	};
	t.mock.module('node:console', {defaultExport: console});

	const config = {get: t.mock.fn<typeof configuration.get<string, string>>()};
	const library = {
		getConfig: t.mock.fn(async () => config),
		modes: ['dark', 'light'],
	};
	t.mock.module('../../../../source/library/index.ts', {namedExports: library});
	// https://github.com/nodejs/node/issues/59163
	const {default: show} = await import(`../../../../source/cli/actions/config/show.ts?test=${t.name}`) as typeof showModule;

	return {config, console, show};
}

suite('show', () => {
	test('logs mode profiles', async (t: TestContext) => {
		const {config, console, show} = await setup(t);

		config.get.mock.mockImplementation(key =>
			key === 'profiles.dark'
				? 'Dark Profile'
				: 'Light Profile');

		await show();

		t.assert.match(String(console.log.mock.calls[0]?.arguments[0]), /Dark Profile/);
		t.assert.match(String(console.log.mock.calls[1]?.arguments[0]), /Light Profile/);
	});
});
