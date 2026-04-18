import {Command} from 'commander';
import show from './show.js';
import set from './set.js';

export default new Command('config')
	.description('manage configuration')
	.addCommand(show)
	.addCommand(set);
