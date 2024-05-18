import {config} from '../config.js';
import {
	getCurrentMode,
	isAutomaticSwitchingEnabled,
	isTerminalOpen,
	setTerminalProfile,
} from '../functions/index.js';

export async function setModeProfile({mode, profile}) {
	config[`${mode}Profile`] = profile;

	if ((await isAutomaticSwitchingEnabled()) && (await isTerminalOpen())) {
		const currentMode = await getCurrentMode();

		if (currentMode === mode) {
			await setTerminalProfile(profile);
		}
	}

	console.log(`${mode} mode profile set to '${profile}'`);
}
