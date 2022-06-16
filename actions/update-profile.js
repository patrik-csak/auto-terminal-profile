import {config} from "../config.js";
import darkMode from "dark-mode";
import {setTerminalProfile} from "terminal-profile";

export async function updateProfile () {
	if (!config.darkProfile) {
		throw new Error('Dark profile not set');
	}

	if (!config.lightProfile) {
		throw new Error('Light profile not set');
	}

	const mode = (await darkMode.isEnabled()) ? 'dark' : 'light';

	await setTerminalProfile(config[`${mode}Profile`]);
}