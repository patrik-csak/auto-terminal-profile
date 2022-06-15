import {readPackageUp} from 'read-pkg-up';

export const {packageJson} = await readPackageUp({
	cwd: new URL('.', import.meta.url),
});
