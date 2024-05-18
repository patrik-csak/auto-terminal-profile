import Conf from 'conf';
import {readPackageUp} from 'read-package-up';

const {packageJson} = await readPackageUp({cwd: new URL('.', import.meta.url)});

const config_ = new Conf({projectName: packageJson.name});

class Config {
	keys = {
		darkProfile: 'darkProfile',
		lightProfile: 'lightProfile',
	};

	/**
	 * @return {string|undefined}
	 */
	get darkProfile() {
		return config_.get(this.keys.darkProfile);
	}

	/**
	 * @param {string} profile
	 */
	set darkProfile(profile) {
		config_.set(this.keys.darkProfile, profile);
	}

	/**
	 * @return {string|undefined}
	 */
	get lightProfile() {
		return config_.get(this.keys.lightProfile);
	}

	/**
	 * @param {string} profile
	 */
	set lightProfile(profile) {
		config_.set(this.keys.lightProfile, profile);
	}
}

export const config = new Config();
