import darkMode from 'dark-mode';
import update from './update.ts';

function handleError(error: unknown) {
	console.error(error);
}

/**
Update the Terminal profile and watch for appearance mode changes
*/
export default async function watch() {
	await update().catch(handleError);

	darkMode.watch(isDarkMode => {
		update({mode: isDarkMode ? 'dark' : 'light'})
			.catch(handleError);
	});
}
