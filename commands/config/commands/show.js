import chalk from 'chalk';
import {Command} from 'commander';
import humanizeString from 'humanize-string';
import {getConfig, modes} from '../../../library/index.js';

export default new Command('show')
	.description('show configuration')
	.action(async () => {
		const config = await getConfig();

		for (const mode of modes) {
			const icon =
				mode === 'dark'
					? '\u{263D}' // Moon
					: '\u{2600}'; // Sun

			console.log(
				`${chalk.yellow(icon)} ${humanizeString(mode)} mode profile: ${config.get(`profiles.${mode}`)}`,
			);
		}
	});
