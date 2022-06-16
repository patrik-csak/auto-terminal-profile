import {isAutomaticSwitchingEnabled} from '../functions/index.js';
import {config} from '../config.js';

export async function status() {
	console.log(
		`automatic switching : ${
			(await isAutomaticSwitchingEnabled()) ? 'enabled' : 'disabled'
		}`,
	);
	console.log(`dark profile : ${config.darkProfile}`);
	console.log(`light profile : ${config.lightProfile}`);
}
