import {Command} from 'commander';
import * as actions from '../../actions/index.ts';
import {type Mode} from '../../../library/index.ts';

/**
Make set mode command
*/
export default function setMode(mode: Mode) {
	return new Command(mode)
		.description(`set terminal profile for ${mode}`)
		.argument('<profile>', 'terminal profile name')
		.action(async function (profile: string) {
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
