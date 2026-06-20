import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';
import ow from 'ow';
import {getConfig, getCurrentMode} from '#library';

/**
 Set the Terminal profile for an appearance mode

 @param {{mode: 'dark' | 'light', profile: string}} parameters - Mode and profile to save
 @throws {import('ow').ArgumentError}
 @returns {Promise<void>}
 */
export default async function setMode({mode, profile}) {
	ow(profile, ow.string.oneOf(await getTerminalProfiles()));

	const config = await getConfig();

	config.set(`profiles.${mode}`, profile);

	consola.success('saved configuration');

	if (mode === (await getCurrentMode())) {
		await setTerminalProfile({profile, setDefault: true});
	}
}
