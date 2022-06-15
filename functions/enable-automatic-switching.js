import {writeFile} from 'node:fs/promises';
import {execa} from 'execa';
import {launchAgentPlistFilePath} from '../constants/index.js';
import {getLaunchAgentPlistFileContents} from './get-launch-agent-plist-file-contents.js';

export async function enableAutomaticSwitching() {
	await writeFile(
		launchAgentPlistFilePath,
		await getLaunchAgentPlistFileContents(),
	);

	await execa('launchctl', ['load', '-w', launchAgentPlistFilePath]);
}
