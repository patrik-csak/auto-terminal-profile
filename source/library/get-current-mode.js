import darkMode from 'dark-mode';

/**
 Get the current appearance mode

 @returns {Promise<'dark' | 'light'>} The current appearance mode
 */
export default async function getCurrentMode() {
	return (await darkMode.isEnabled()) ? 'dark' : 'light';
}
