import {setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode} from '#library';

/**
 Update the Terminal profile for an appearance mode

 @param {{mode?: 'dark' | 'light'}} parameters - Optional appearance mode. Defaults to current mode.
 @returns {Promise<void>}
 */
export default async function update({mode}) {
	mode ??= await getCurrentMode();

	const config = await getConfig();
	const profile = config.get(`profiles.${mode}`);

	await setTerminalProfile({profile, setDefault: true});
}
