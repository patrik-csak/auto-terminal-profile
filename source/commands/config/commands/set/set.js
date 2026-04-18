import {Command} from '@commander-js/extra-typings';
import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode, modes} from '../../../../library/index.js';
import {setMode as setModeCommand} from './commands/index.js';

const command = new Command('set').description('update configuration');

for (const mode of modes) {
	command.addCommand(await setModeCommand(mode));
}

command.action(async () => {
	const config = await getConfig();
	const profiles = await getTerminalProfiles();
	const newProfiles = {};

	for (const mode of modes) {
		const selectedProfile = await consola.prompt(
			`Select ${mode} mode profile`,
			{
				type: 'select',
				options: profiles,
				initial: config.get(`profiles.${mode}`),
				cancel: 'undefined',
			},
		);

		if (selectedProfile === undefined) return;

		newProfiles[mode] = selectedProfile;
	}

	config.set('profiles', newProfiles);

	console.log('\n');
	consola.success('Saved configuration');

	const currentMode = await getCurrentMode();

	await setTerminalProfile({
		profile: newProfiles[currentMode],
		setDefault: true,
	});
});

export default command;
