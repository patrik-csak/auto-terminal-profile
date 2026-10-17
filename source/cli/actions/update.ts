import {setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode, type Mode} from '../../library/index.ts';

/**
Update the Terminal profile for an appearance mode
*/
export default async function update(parameters?: {mode?: Mode}) {
	let {mode} = parameters ?? {};
	mode ??= await getCurrentMode();

	const config = await getConfig();
	const profile = config.get(`profiles.${mode}`);

	await setTerminalProfile({profile, setDefault: true});
}
