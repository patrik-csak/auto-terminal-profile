import memoize from 'p-memoize';
import {readPackageUp} from 'read-package-up';

async function getPackageJson() {
	const result = await readPackageUp({
		cwd: new URL('.', import.meta.url),
		normalize: true,
	});

	if (result.packageJson === undefined) {
		throw new Error('Failed to get package.json');
	}

	return result.packageJson;
}

export default memoize(getPackageJson);
