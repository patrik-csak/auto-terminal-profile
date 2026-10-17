import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';
import {
	getConfig,
	getCurrentMode,
	modes,
	type Mode,
} from '../../../library/index.ts';

/**
Prompt for and save Terminal profiles for both appearance modes
*/
export default async function set() {
	const config = await getConfig();
	const profiles = await getTerminalProfiles();
	const newProfiles: Record<Mode, string> = {
		dark: '',
		light: '',
	};

	for (const mode of modes) {
		// eslint-disable-next-line no-await-in-loop
		const selectedProfile = await consola.prompt(
			`select ${mode} mode profile`,
			{
				cancel: 'undefined',
				initial: config.get(`profiles.${mode}`),
				options: profiles,
				type: 'select',
			},
		);

		if (selectedProfile === undefined) {
			return;
		}

		newProfiles[mode] = selectedProfile;
	}

	config.set('profiles', newProfiles);

	consola.success('saved configuration');

	const currentMode = await getCurrentMode();

	await setTerminalProfile({
		profile: newProfiles[currentMode],
		setDefault: true,
	});
}
