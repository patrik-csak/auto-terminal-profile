import {Command} from 'commander';
import {show, set} from './commands/index.js';

export default new Command('config')
	.description('manage configuration')
	.addCommand(show)
	.addCommand(set);
