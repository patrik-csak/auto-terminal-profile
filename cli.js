#! /usr/bin/env node

import {program} from 'commander';
import darkMode from 'dark-mode';
import {readPackageUp} from 'read-pkg-up';
import {setTerminalProfile} from 'terminal-profile';
import {config} from './config.js';
import {
	disableAutomaticSwitching,
	enableAutomaticSwitching,
	isAutomaticSwitchingEnabled,
} from './functions/index.js';

const {packageJson} = await readPackageUp({cwd: new URL('.', import.meta.url)});

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program
	.command('disable')
	.description(
		'Disable automatic macOS Terminal profile switching based on system dark / light mode',
	)
	.action(async () => {
		await disableAutomaticSwitching()

		console.log('Automatic switching disabled')
	});

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

		await enableAutomaticSwitching();

		console.log('Automatic switching enabled')
	});

for (const mode of ['dark', 'light']) {
	program
		.command(`set-${mode}-profile`)
		.description(`Set the Terminal profile to use in ${mode} mode`)
		.argument('<profile>')
		.action((profile) => {
			config[`${mode}Profile`] = profile;

			console.log(`${mode} mode profile set to '${profile}'`)
		});
}

program
	.command('status')
	.description('Show status and configuration')
	.action(async () => {
		console.log(
			`automatic switching : ${
				(await isAutomaticSwitchingEnabled()) ? 'enabled' : 'disabled'
			}`,
		);
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
