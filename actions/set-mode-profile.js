import {config} from "../config.js";

export function setModeProfile({mode, profile}) {
	config[`${mode}Profile`] = profile;

	console.log(`${mode} mode profile set to '${profile}'`);
}