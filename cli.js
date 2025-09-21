#! /usr/bin/env node

import {program} from 'commander';
import {config, update} from './commands/index.js';
import {getPackageJson} from './library/index.js';

const packageJson = await getPackageJson();

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program.addCommand(config).addCommand(update);

await program.parseAsync();
