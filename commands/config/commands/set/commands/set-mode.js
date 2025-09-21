import {Argument, Command} from '@commander-js/extra-typings';
import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';
import ow from 'ow';
import {
	getConfig,
	getCurrentMode,
	modes,
} from '../../../../../library/index.js';

/**
 * Make set mode command
 *
 * @param {'dark' | 'light'} mode
 */
export default async function setMode(mode) {
	ow(mode, ow.string.oneOf(modes));

	return new Command(mode)
		.description(`set terminal profile for ${mode}`)
		.addArgument(
			new Argument('<profile>', 'terminal profile name').choices(
				await getTerminalProfiles(),
			),
		)
		.action(async (profile) => {
			const config = await getConfig();

			config.set(`profiles.${mode}`, profile);

			consola.success('Saved configuration');

			if (mode === (await getCurrentMode())) {
				await setTerminalProfile({profile, setDefault: true});
			}
		});
}
