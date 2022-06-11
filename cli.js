#! /usr/bin/env node

import {program} from 'commander';
import {readPackageUp} from 'read-pkg-up';

const {packageJson} = await readPackageUp();

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program.parse();
