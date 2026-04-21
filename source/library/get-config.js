import packageJson from '#package-json' with {type: 'json'};
import Conf from 'conf';
import {getTerminalDefaultProfile} from 'mac-terminal';

export default async function getConfig() {
	const defaultProfile = await getTerminalDefaultProfile();

	const config = new Conf({
		defaults: {
			profiles: {
				dark: defaultProfile,
				light: defaultProfile,
			},
		},
		projectName: packageJson.name,
		schema: {
			profiles: {
				properties: {
					dark: {
						type: 'string',
					},
					light: {
						type: 'string',
					},
				},
				type: 'object',
			},
		},
	});

	return config;
}
