import darkMode from 'dark-mode';
import exitHook from 'exit-hook';
import update from './update.ts';

function handleError(error: unknown) {
	console.error(error);
}

/**
Update the Terminal profile and watch for appearance mode changes
*/
export default async function watch() {
	void update().catch(handleError);

	const watcher = darkMode.watch(isDarkMode => {
		void update({mode: isDarkMode ? 'dark' : 'light'})
			.catch(handleError);
	});

	exitHook(() => {
		watcher.stop();
	});
}
