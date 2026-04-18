import Conf from 'conf';
import {getTerminalDefaultProfile} from 'mac-terminal';
import packageJson from '../package.json' with {type: 'json'};

export default async function getConfig() {
	const defaultProfile = await getTerminalDefaultProfile();

	const config = new Conf({
		projectName: packageJson.name,
		schema: {
			profiles: {
				type: 'object',
				properties: {
					dark: {
						type: 'string',
					},
					light: {
						type: 'string',
					},
				},
			},
		},
		defaults: {
			profiles: {
				dark: defaultProfile,
				light: defaultProfile,
			},
		},
	});

	return config;
}
