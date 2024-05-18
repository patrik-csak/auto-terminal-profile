import {config} from '../config.js';
import {packageJson} from '../constants/index.js';
import {
	enableAutomaticSwitching,
	getCurrentMode,
	isTerminalOpen,
	setTerminalProfile,
} from '../functions/index.js';

/**
 * @param {string} mode
 */
function undefinedProfileMessage(mode) {
	return `${mode} profile must be specified with --${mode}-profile or previously set with \`${packageJson.name} set-${mode}-mode\``;
}

/**
 * @param {object} parameters
 * @param {string|undefined} parameters.darkProfile
 * @param {string|undefined} parameters.lightProfile
 */
export async function enable(parameters) {
	if (
		[parameters.darkProfile, config.darkProfile].every(
			(value) => value === undefined,
		)
	) {
		throw new Error(undefinedProfileMessage('dark'));
	}

	if (
		[parameters.lightProfile, config.lightProfile].every(
			(value) => value === undefined,
		)
	) {
		throw new Error(undefinedProfileMessage('light'));
	}

	if (parameters.darkProfile !== undefined) {
		config.darkProfile = parameters.darkProfile;
	}

	if (parameters.lightProfile !== undefined) {
		config.lightProfile = parameters.lightProfile;
	}

	await enableAutomaticSwitching();

	if (await isTerminalOpen()) {
		const mode = await getCurrentMode();

		if (parameters[`${mode}Profile`] !== undefined) {
			await setTerminalProfile(config[`${mode}Profile`]);
		}
	}

	console.log('automatic switching enabled');
}
