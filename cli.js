#! /usr/bin/env node

import {program} from 'commander';
import {packageJson} from './constants/index.js';
import {
	disable,
	enable,
	setModeProfile,
	status,
	updateProfile,
} from './actions/index.js';

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program
	.command('disable')
	.description(
		'disable automatic macOS Terminal profile switching based on system dark / light mode',
	)
	.action(disable);

program
	.command('enable')
	.description(
		'enable automatic macOS Terminal profile switching based on system dark / light mode',
	)
	.option(
		'--dark-profile <profile>',
		'dark profile name, for example "One Dark"',
	)
	.option(
		'--light-profile <profile>',
		'light profile name, for example "One Light"',
	)
	.action(enable);

for (const mode of ['dark', 'light']) {
	program
		.command(`set-${mode}-profile`)
		.description(`set the Terminal profile to use in ${mode} mode`)
		.argument('<profile>')
		.action((profile) => setModeProfile({mode, profile}));
}

program
	.command('status')
	.description('show status and configuration')
	.action(status);

program
	.command('update-profile')
	.description(
		'update the profile of currently running Terminal windows / tabs',
	)
	.action(updateProfile);

program.parse();
