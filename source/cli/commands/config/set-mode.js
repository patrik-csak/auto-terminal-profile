import {Argument, Command} from '@commander-js/extra-typings';
import {getTerminalProfiles} from 'mac-terminal';
import * as actions from '../../actions/index.js';

/**
 * Make set mode command
 *
 * @param {'dark' | 'light'} mode
 */
export default async function setMode(mode) {
	return new Command(mode)
		.description(`set terminal profile for ${mode}`)
		.addArgument(
			new Argument('<profile>', 'terminal profile name').choices(
				await getTerminalProfiles(),
			),
		)
		.action(async (profile) => actions.config.setMode({mode, profile}));
}
