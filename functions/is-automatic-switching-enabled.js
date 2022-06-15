import {existsSync as exists} from 'node:fs';
import {execa} from 'execa';
import {launchAgentPlistFilePath} from '../constants/index.js';

/**
 * @return {Promise<boolean>}
 */
async function isDarkModeNotifyRunning() {
	const {stdout} = await execa('launchctl', ['list']);

	return stdout.includes('ke.bou.dark-mode-notify');
}

/**
 * @return {Promise<boolean>}
 */
export async function isAutomaticSwitchingEnabled() {
	const _isDarkModeNotifyRunning = await isDarkModeNotifyRunning();
	const plistFileExists = exists(launchAgentPlistFilePath);

	if (_isDarkModeNotifyRunning && !plistFileExists) {
		throw new Error(
			`Automatic switching is running, but the launch agent plist file (${launchAgentPlistFilePath}) doesn't exist`,
		);
	} else if (!_isDarkModeNotifyRunning && plistFileExists) {
		throw new Error(
			`Automatic switching is not running, but the launch agent plist file (${launchAgentPlistFilePath}) exists`,
		);
	}

	return _isDarkModeNotifyRunning && plistFileExists;
}
