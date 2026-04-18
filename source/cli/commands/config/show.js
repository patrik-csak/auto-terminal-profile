import {Command} from 'commander';
import * as actions from '../../actions/index.js';

export default new Command('show')
	.description('show configuration')
	.action(actions.config.show);
