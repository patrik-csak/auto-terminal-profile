import Conf from 'conf';
import {getTerminalDefaultProfile} from 'mac-terminal';
import getPackageJson from './get-package-json.js';

export default async function getConfig() {
	const defaultProfile = await getTerminalDefaultProfile();
	const packageJson = await getPackageJson();

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
