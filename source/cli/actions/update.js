import {getConfig, getCurrentMode} from '#library';
import {setTerminalProfile} from 'mac-terminal';

/**
 * @param {{mode?: 'dark' | 'light'}} parameters
 * @returns {Promise<void>}
 */
export default async function update({mode}) {
	mode ??= await getCurrentMode();

	const config = await getConfig();
	const profile = config.get(`profiles.${mode}`);

	await setTerminalProfile({profile, setDefault: true});
}
