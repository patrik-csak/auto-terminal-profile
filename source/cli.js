#! /usr/bin/env node

import * as commands from '#cli/commands';
import packageJson from '#package-json' with {type: 'json'};
import {program} from 'commander';

program
	.name(packageJson.name)
	.description(packageJson.description)
	.version(packageJson.version);

program.addCommand(commands.config).addCommand(commands.update);

await program.parseAsync();
