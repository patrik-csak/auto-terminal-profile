import {Command} from 'commander';
import * as actions from '#cli/actions';

export default new Command('watch')
	.description('watch for appearance mode changes and update the terminal profile')
	.action(actions.watch);
