import {unlink} from 'node:fs/promises';
import {execa} from 'execa';
import {launchAgentPlistFilePath} from '../constants/index.js';

export async function disableAutomaticSwitching() {
	await execa`launchctl unload -w ${launchAgentPlistFilePath}`;

	await unlink(launchAgentPlistFilePath);
}
