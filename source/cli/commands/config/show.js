import * as actions from '#cli/actions';
import {Command} from 'commander';

export default new Command('show')
	.description('show configuration')
	.action(actions.config.show);
