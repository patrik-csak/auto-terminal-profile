import * as actions from '#cli/actions';
import {modes} from '#library';
import {Command} from 'commander';

import setMode from './set-mode.js';

const command = new Command('set').description('update configuration');

for (const mode of modes) {
	command.addCommand(setMode(mode));
}

command.action(actions.config.set);

export default command;
