import * as actions from '#cli/actions';
import {Command} from 'commander';
import {ArgumentError} from 'ow';

/**
 * Make set mode command
 *
 * @param {'dark' | 'light'} mode
 */
export default function setMode(mode) {
	return new Command(mode)
		.description(`set terminal profile for ${mode}`)
		.argument('<profile>', 'terminal profile name')
		.action(async function (profile) {
			try {
				await actions.config.setMode({mode, profile});
			} catch (error) {
				if (error instanceof ArgumentError) {
					this.error(error.message);
				}

				throw error;
			}
		});
}
