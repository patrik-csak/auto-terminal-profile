import {Argument, Command} from 'commander';
import * as actions from '../actions/index.ts';
import {modes} from '../../library/index.ts';

export default new Command('update')
	.description('update terminal profile based on the mode')
	.addArgument(new Argument(
		'[mode]',
		'appearance mode. defaults to current system appearance mode.',
	).choices(modes))
	.action(async mode => actions.update({mode}));
