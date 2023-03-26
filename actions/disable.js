import {disableAutomaticSwitching} from '../functions/index.js';

export async function disable() {
	await disableAutomaticSwitching();

	console.log('Automatic switching disabled');
}
