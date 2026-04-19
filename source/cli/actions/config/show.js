// eslint-disable-next-line n/prefer-global/console
import console from 'node:console';
import {styleText} from 'node:util';
import {upperFirst} from 'es-toolkit/string';
import {getConfig, modes} from '#library';

/**
 * @returns {Promise<void>}
 */
export default async function show() {
	const config = await getConfig();

	for (const mode of modes) {
		const icon =
			mode === 'dark'
				? '\u{263D}' // Moon
				: '\u{2600}'; // Sun

		console.log(
			`${styleText('yellow', icon)} ${upperFirst(mode)} mode profile: ${config.get(`profiles.${mode}`)}`,
		);
	}
}
