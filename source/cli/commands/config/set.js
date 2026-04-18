import {Command} from '@commander-js/extra-typings';
import setMode from './set-mode.js';
import * as actions from '#cli/actions';
import {modes} from '#library';

const command = new Command('set').description('update configuration');

for (const mode of modes) {
	command.addCommand(await setMode(mode));
}

command.action(actions.config.set);

export default command;
