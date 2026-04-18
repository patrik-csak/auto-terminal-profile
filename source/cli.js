#! /usr/bin/env node

import {program} from 'commander';
import packageJson from '../package.json' with {type: 'json'};
import {config, update} from './commands/index.js';

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program.addCommand(config).addCommand(update);

await program.parseAsync();
