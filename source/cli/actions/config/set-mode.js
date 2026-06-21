import {consola} from 'consola';
import {assertTerminalProfile, setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode} from '#library';

/**
 Set the Terminal profile for an appearance mode

 @param {{mode: 'dark' | 'light', profile: string}} parameters - Mode and profile to save
 @throws {Error}
 @returns {Promise<void>}
 */
export default async function setMode({mode, profile}) {
	await assertTerminalProfile(profile);

	const config = await getConfig();

	config.set(`profiles.${mode}`, profile);

	consola.success('saved configuration');

	if (mode === (await getCurrentMode())) {
		await setTerminalProfile({profile, setDefault: true});
	}
}
