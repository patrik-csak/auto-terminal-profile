import {Command} from 'commander';
import setMode from './set-mode.js';
import * as actions from '#cli/actions';
import {modes} from '#library';

const command = new Command('set').description('update configuration');

for (const mode of modes) {
	command.addCommand(setMode(mode));
}

// eslint-disable-next-line unicorn/no-top-level-side-effects
command.action(actions.config.set);

export default command;
