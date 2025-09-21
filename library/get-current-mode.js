import darkMode from 'dark-mode';

/**
 * @returns {Promise<'dark' | 'light'>}
 */
export default async function getCurrentMode() {
	return (await darkMode.isEnabled()) ? 'dark' : 'light';
}
