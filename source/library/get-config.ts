import Conf from 'conf';
import {getTerminalDefaultProfile} from 'mac-terminal';
import packageJson from '../../package.json' with {type: 'json'};
import {type Mode} from './modes.ts';

type Store = {
	profiles: Record<Mode, string>;
};

export type AtpConf = Conf<Store>;

export default async function getConfig() {
	const defaultProfile = await getTerminalDefaultProfile();

	const config = new Conf<Store>({
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
