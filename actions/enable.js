import {config} from '../config.js';
import {packageJson} from '../constants/index.js';
import {enableAutomaticSwitching} from '../functions/index.js';

export async function enable({darkProfile, lightProfile}) {
	if (!darkProfile && !config.darkProfile) {
		throw new Error(
			`Dark profile must be specified with --dark-profile or previously set with \`${packageJson.name} set-dark-mode\``,
		);
	}

	if (!lightProfile && !config.lightProfile) {
		throw new Error(
			`Light profile must be specified with --light-profile or previously set with \`${packageJson.name} set-light-mode\``,
		);
	}

	if (darkProfile) config.darkProfile = darkProfile;
	if (lightProfile) config.lightProfile = lightProfile;

	await enableAutomaticSwitching();

	console.log('Automatic switching enabled');
}
