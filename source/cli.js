#! /usr/bin/env node

import {program} from 'commander';
import packageJson from '../package.json' with {type: 'json'};
import * as commands from './cli/commands/index.js';

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program.addCommand(commands.config).addCommand(commands.update);

await program.parseAsync();
