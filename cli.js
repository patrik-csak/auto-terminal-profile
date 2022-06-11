#! /usr/bin/env node

import {program} from 'commander';
import {execa} from 'execa';
import {readPackageUp} from 'read-pkg-up';

const {packageJson} = await readPackageUp();

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program.parse();

let mode = 'light';

try {
	const {stdout} = await execa('defaults', [
		'read',
		'-g',
		'AppleInterfaceStyle',
	]);

	if (stdout === 'Dark') mode = 'dark';
} catch (error) {
	if (
		!error.message.includes(
			'The domain/default pair of (kCFPreferencesAnyApplication, AppleInterfaceStyle) does not exist',
		)
	) {
		throw error;
	}
}

console.log(mode);
