import {readPackageUp} from 'read-package-up';

export const {packageJson} = await readPackageUp({
	cwd: new URL('.', import.meta.url),
});
