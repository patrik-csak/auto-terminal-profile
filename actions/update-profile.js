import darkMode from 'dark-mode';
import {setTerminalProfile, setTerminalDefaultProfile} from 'terminal-profile';
import {config} from '../config.js';

export async function updateProfile() {
	if (!config.darkProfile) {
		throw new Error('Dark profile not set');
	}

	if (!config.lightProfile) {
		throw new Error('Light profile not set');
	}

	const mode = (await darkMode.isEnabled()) ? 'dark' : 'light';
	const profile = config[`${mode}Profile`];

	await Promise.all([
		setTerminalProfile(profile),
		setTerminalDefaultProfile(profile),
	]);
}
