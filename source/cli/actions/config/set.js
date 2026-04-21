import {getConfig, getCurrentMode, modes} from '#library';
import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';

/**
 * @returns {Promise<void>}
 */
export default async function set() {
	const config = await getConfig();
	const profiles = await getTerminalProfiles();
	const newProfiles = {};

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

		if (selectedProfile === undefined) return;

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
