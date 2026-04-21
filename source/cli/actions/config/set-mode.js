import {getConfig, getCurrentMode} from '#library';
import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';
import ow from 'ow';

/**
 * @param {{mode: 'dark' | 'light', profile: string}} parameters
 * @throws {import('ow').ArgumentError}
 * @returns {Promise<void>}
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
