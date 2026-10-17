import {consola} from 'consola';
import {assertTerminalProfile, setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode, type Mode} from '../../../library/index.ts';

/**
Set the Terminal profile for an appearance mode
*/
export default async function setMode({mode, profile}: {mode: Mode; profile: string}) {
	await assertTerminalProfile(profile);

	const config = await getConfig();

	config.set(`profiles.${mode}`, profile);

	consola.success('saved configuration');

	if (mode === (await getCurrentMode())) {
		await setTerminalProfile({profile, setDefault: true});
	}
}
