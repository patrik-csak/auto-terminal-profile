import darkMode from 'dark-mode';
import update from './update.js';

/**
Watch for appearance mode changes and update the Terminal profile

@returns {Promise<void>}
 */
export default async function watch() {
	darkMode.watch(isDarkMode => {
		update({mode: isDarkMode ? 'dark' : 'light'});
	});
}
