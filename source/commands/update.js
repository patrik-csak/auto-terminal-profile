import {Argument, Command} from '@commander-js/extra-typings';
import {setTerminalProfile} from 'mac-terminal';
import {getConfig, getCurrentMode, modes} from '../library/index.js';

export default new Command('update')
	.description('update terminal profile based on the mode')
	.addArgument(
		new Argument(
			'[mode]',
			'appearance mode. defaults to current system appearance mode.',
		).choices(modes),
	)
	.action(async (mode) => {
		mode ??= await getCurrentMode();

		const config = await getConfig();
		const profile = config.get(`profiles.${mode}`);

		await setTerminalProfile({profile, setDefault: true});
	});
