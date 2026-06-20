import {Command} from 'commander';
import * as actions from '#cli/actions';

/**
 Make set mode command

 @param {'dark' | 'light'} mode - Appearance mode
 */
export default function setMode(mode) {
	return new Command(mode)
		.description(`set terminal profile for ${mode}`)
		.argument('<profile>', 'terminal profile name')
		.action(async function (profile) {
			try {
				await actions.config.setMode({mode, profile});
			} catch (error) {
				if (error instanceof Error) {
					this.error(error.message);
				}

				throw error;
			}
		});
}
