import {Command} from 'commander';
import * as actions from '#cli/actions';

export default new Command('show')
	.description('show configuration')
	.action(actions.config.show);
