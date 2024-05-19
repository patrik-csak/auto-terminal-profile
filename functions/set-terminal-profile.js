import {
	setTerminalDefaultProfile as setDefaultProfile,
	setTerminalProfile as setProfile,
} from 'terminal-profile';

/**
 * @param {string} profile
 */
export async function setTerminalProfile(profile) {
	await Promise.all([setDefaultProfile(profile), setProfile(profile)]);
}
