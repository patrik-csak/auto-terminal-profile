# auto-terminal-profile

Automatically switch [Terminal](https://en.wikipedia.org/wiki/Terminal_%28macOS%29) profiles when macOS [dark/light mode](https://support.apple.com/guide/mac-help/use-a-light-or-dark-appearance-mchl52e1c2d2/mac) changes

![auto-terminal-profile demonstration screen recording](./documentation/demo.gif)

## Usage

- [Homebrew](#homebrew) · **recommended**
- [npm](#npm)

### Homebrew

The easiest way to use auto-terminal-profile is to install the [`auto-terminal-profile` Homebrew formula](https://github.com/patrik-csak/homebrew-tap/blob/main/Formula/auto-terminal-profile.rb) and run it as a [Homebrew](https://brew.sh) [service](https://docs.brew.sh/Manpage#services-subcommand):

1. Install

	```shell
	brew install patrik-csak/tap/auto-terminal-profile
	```

1. [Import the Terminal profiles](https://support.apple.com/guide/terminal/import-and-export-terminal-profiles-trml4299c696/mac) you want to use if you haven’t already

1. Set your preferred dark and light mode profiles:

	```shell
	auto-terminal-profile config set
	```

	<details>
	<summary><small>Or set profiles individually</small></summary>

	```shell
	auto-terminal-profile config set dark 'Clear Dark'
	auto-terminal-profile config set light 'Clear Light'
	```
	</details>

1. Enable automatic switching

	```shell
	brew services start auto-terminal-profile
	```

	The process will run as a macOS launchd agent, and will start automatically on login

	<details>
	<summary><small>Disable automatic switching</small></summary>

	```shell
	brew services stop auto-terminal-profile
	```
	</details>

### npm

You can use the [`auto-terminal-profile` npm package](https://npmx.dev/package/auto-terminal-profile) directly, but it doesn’t have built-in background service management

1. Install

	```shell
	npm install --global auto-terminal-profile
	```

1. Set your preferred dark and light mode profiles:

	```shell
	auto-terminal-profile config set
	```

	<details>
	<summary><small>Or set profiles individually</small></summary>

	```shell
	auto-terminal-profile config set dark 'Clear Dark'
	auto-terminal-profile config set light 'Clear Light'
	```
	</details>

1. Enable automatic switching

	```shell
	auto-terminal-profile watch
	```

	The process will continue until you stop it with <kbd>Ctrl</kbd>+<kbd>C</kbd>

## Related

- [patrik-csak/mac-terminal](https://github.com/patrik-csak/mac-terminal) · Node.js library to control the macOS Terminal app, used by this app
