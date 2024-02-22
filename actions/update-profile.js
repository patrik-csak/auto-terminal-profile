import process from 'node:process';
import {setTerminalProfile, setTerminalDefaultProfile} from 'terminal-profile';
import {config} from '../config.js';
import {isTerminalOpen} from '../functions/index.js';

export async function updateProfile() {
	if (!(await isTerminalOpen())) return;

	if (!config.darkProfile) {
		throw new Error('Dark profile not set');
	}

	if (!config.lightProfile) {
		throw new Error('Light profile not set');
	}

	const mode = process.env.DARKMODE === '1' ? 'dark' : 'light';
	const profile = config[`${mode}Profile`];

	await Promise.all([
		setTerminalProfile(profile),
		setTerminalDefaultProfile(profile),
	]);
}
