import {suite, test, type TestContext} from 'node:test';
import type {setTerminalProfile} from 'mac-terminal';
import type * as updateModule from '../../../source/cli/actions/update.ts';
import type {AtpConf, getCurrentMode} from '../../../source/library/index.ts';

declare const config: AtpConf;

async function setup(t: TestContext) {
	const macTerminal = {setTerminalProfile: t.mock.fn<typeof setTerminalProfile>()};
	t.mock.module('mac-terminal', {namedExports: macTerminal});

	const configMock = {get: t.mock.fn<typeof config.get<string, string>>()};
	const library = {
		getConfig: t.mock.fn(async () => configMock),
		getCurrentMode: t.mock.fn<typeof getCurrentMode>(),
	};
	t.mock.module('../../../source/library/index.ts', {namedExports: library});

	// https://github.com/nodejs/node/issues/59163
	const {default: update} = await import(`../../../source/cli/actions/update.ts?test=${t.name}`) as typeof updateModule;

	return {
		configMock,
		library,
		macTerminal,
		update,
	};
}

suite('update', () => {
	test('sets profile for given mode', async (t: TestContext) => {
		const {configMock, macTerminal, update} = await setup(t);

		configMock.get.mock.mockImplementation(() => 'Profile');

		await update({mode: 'dark'});

		t.assert.strictEqual(configMock.get.mock.calls[0]?.arguments[0], 'profiles.dark');
		t.assert.deepStrictEqual(
			macTerminal.setTerminalProfile.mock.calls[0]?.arguments[0],
			{
				profile: 'Profile',
				setDefault: true,
			},
		);
	});

	test('uses current mode if given mode undefined', async (t: TestContext) => {
		const {configMock, library, update} = await setup(t);

		library.getCurrentMode.mock.mockImplementation(async () => 'light');
		configMock.get.mock.mockImplementation(() => 'Profile');

		await update();

		t.assert.strictEqual(library.getCurrentMode.mock.callCount(), 1);
		t.assert.strictEqual(configMock.get.mock.calls[0]?.arguments[0], 'profiles.light');
	});

	test('uses given mode if defined', async (t: TestContext) => {
		const {configMock, library, update} = await setup(t);

		configMock.get.mock.mockImplementation(() => 'Profile');

		await update({mode: 'dark'});

		t.assert.strictEqual(library.getCurrentMode.mock.callCount(), 0);
	});
});
