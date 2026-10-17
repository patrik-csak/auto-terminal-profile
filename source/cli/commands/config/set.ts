import {Command} from 'commander';
import * as actions from '../../actions/index.ts';
import {modes} from '../../../library/index.ts';
import setMode from './set-mode.ts';

const command = new Command('set').description('update configuration');

for (const mode of modes) {
	command.addCommand(setMode(mode));
}

command.action(actions.config.set);

export default command;
