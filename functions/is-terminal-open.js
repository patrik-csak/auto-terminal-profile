import {runAppleScript} from 'run-applescript';

/**
 * @returns {Promise<boolean>}
 */
export async function isTerminalOpen() {
	const result = await runAppleScript(`tell application "System Events"
	set isOpen to (name of processes) contains "Terminal"
end tell

if isOpen then
	return "true"
else
	return "false"
end if`);

	return result === 'true';
}
