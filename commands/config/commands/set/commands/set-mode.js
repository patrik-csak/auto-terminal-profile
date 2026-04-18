import {Argument, Command} from '@commander-js/extra-typings';
import {consola} from 'consola';
import {getTerminalProfiles, setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode} from '../../../../../library/index.js';

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
		.action(async (profile) => {
			const config = await getConfig();

			config.set(`profiles.${mode}`, profile);

			consola.success('Saved configuration');

			if (mode === (await getCurrentMode())) {
				await setTerminalProfile({profile, setDefault: true});
			}
		});
}
