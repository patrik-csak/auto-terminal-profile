import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode, modes} from '#library';

/**
 * @returns {Promise<void>}
 */
export default async function set() {
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
}
