import {Command} from 'commander';

import set from './set.js';
import show from './show.js';

export default new Command('config')
	.description('manage configuration')
	.addCommand(show)
	.addCommand(set);
