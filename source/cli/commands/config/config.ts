import {Command} from 'commander';
import set from './set.ts';
import show from './show.ts';

export default new Command('config')
	.description('manage configuration')
	.addCommand(show)
	.addCommand(set);
