import {Command} from '@commander-js/extra-typings';
import {modes} from '../../../library/index.js';
import * as actions from '../../actions/index.js';
import setMode from './set-mode.js';

const command = new Command('set').description('update configuration');

for (const mode of modes) {
	command.addCommand(await setMode(mode));
}

command.action(actions.config.set);

export default command;
