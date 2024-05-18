import darkMode from 'dark-mode';

/**
 * @returns {Promise<'dark' | 'light'>} Current macOS appearance mode
 */
export async function getCurrentMode() {
	return (await darkMode.isEnabled()) ? 'dark' : 'light';
}
