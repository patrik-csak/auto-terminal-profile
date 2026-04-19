import {Argument, Command} from 'commander';
import {getTerminalProfiles} from 'mac-terminal';
import * as actions from '#cli/actions';

/**
 * Make set mode command
 *
 * @param {'dark' | 'light'} mode
 */
export default function setMode(mode) {
	return new Command(mode)
		.description(`set terminal profile for ${mode}`)
		.addArgument(
			new Argument('<profile>', 'terminal profile name').choices(
				await getTerminalProfiles(),
			),
		)
		.action(async (profile) => actions.config.setMode({mode, profile}));
}
