import darkMode from 'dark-mode';
import update from './update.ts';

/**
Watch for appearance mode changes and update the Terminal profile
*/
export default function watch() {
	darkMode.watch(isDarkMode => {
		update({mode: isDarkMode ? 'dark' : 'light'})
			.catch((error: unknown) => {
				console.error(error);
			});
	});
}
