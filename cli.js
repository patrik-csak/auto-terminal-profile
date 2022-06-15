#! /usr/bin/env node

import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {program} from 'commander';
import darkMode from 'dark-mode';
import envPaths from 'env-paths';
import {execa} from 'execa';
import pupa from 'pupa';
import {readPackageUp} from 'read-pkg-up';
import {setTerminalProfile} from 'terminal-profile';
import untildify from 'untildify';
import {config} from './config.js';

const {packageJson} = await readPackageUp({cwd: new URL('.', import.meta.url)});

const launchAgentPlistFilePath = untildify(
	'~/Library/LaunchAgents/ke.bou.dark-mode-notify.plist',
);

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program
	.command('enable')
	.description(
		'Enable automatic macOS Terminal profile switching based on system dark / light mode',
	)
	.option(
		'--dark-profile <profile>',
		'dark profile name, for example "One Dark"',
	)
	.option(
		'--light-profile <profile>',
		'light profile name, for example "One Light"',
	)
	.action(async ({darkProfile, lightProfile}) => {
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

		const launchAgentPlistFileContents = pupa(
			await readFile(new URL('launch-agent.xml', import.meta.url), {
				encoding: 'utf8',
			}),
			{
				autoTerminalProfilePath: fileURLToPath(
					new URL('cli.js', import.meta.url),
				),
				darkModeNotifyPath: fileURLToPath(
					new URL('dark-mode-notify.swift', import.meta.url),
				),
				logPath: envPaths(packageJson.name).log,
			},
		);

		await writeFile(launchAgentPlistFilePath, launchAgentPlistFileContents);

		await execa('launchctl', ['load', '-w', launchAgentPlistFilePath]);
	});

for (const mode of ['dark', 'light']) {
	program
		.command(`set-${mode}-profile`)
		.description(`Set the Terminal profile to use in ${mode} mode`)
		.argument('<profile>')
		.action((profile) => {
			config[`${mode}Profile`] = profile;
		});
}

program
	.command('status')
	.description('Show configuration')
	.action(() => {
		console.log('automatic switching : (disabled|enabled) (TODO)'); // TODO
		console.log(`dark profile : ${config.darkProfile}`);
		console.log(`light profile : ${config.lightProfile}`);
	});

program
	.command('update-profile')
	.description(
		'Update the profile of currently running Terminal windows / tabs',
	)
	.action(async () => {
		if (!config.darkProfile) {
			throw new Error('Dark profile not set');
		}

		if (!config.lightProfile) {
			throw new Error('Light profile not set');
		}

		const mode = (await darkMode.isEnabled()) ? 'dark' : 'light';

		await setTerminalProfile(config[`${mode}Profile`]);
	});

program.parse();
