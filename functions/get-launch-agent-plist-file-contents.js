import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import pupa from 'pupa';
import envPaths from 'env-paths';
import {packageJson} from '../constants/index.js';

export async function getLaunchAgentPlistFileContents() {
	return pupa(
		await readFile(new URL('../templates/launch-agent.xml', import.meta.url), {
			encoding: 'utf8',
		}),
		{
			autoTerminalProfilePath: fileURLToPath(
				new URL('../cli.js', import.meta.url),
			),
			darkModeNotifyPath: fileURLToPath(
				new URL('../dark-mode-notify/dark-mode-notify.swift', import.meta.url),
			),
			logPath: envPaths(packageJson.name).log,
			path: process.env.PATH,
		},
	);
}
