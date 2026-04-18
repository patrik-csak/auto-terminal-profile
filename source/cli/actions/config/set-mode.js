import {consola} from 'consola';
import {setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode} from '../../../library/index.js';

/**
 * @param {{mode: 'dark' | 'light', profile: string}} parameters
 * @returns {Promise<void>}
 */
export default async function setMode({mode, profile}) {
	const config = await getConfig();

	config.set(`profiles.${mode}`, profile);

	consola.success('Saved configuration');

	if (mode === (await getCurrentMode())) {
		await setTerminalProfile({profile, setDefault: true});
	}
}
