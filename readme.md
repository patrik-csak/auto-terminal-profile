# `auto-terminal-profile`

Automatically switch the macOS Terminal profile based on the system-wide dark / light appearance mode

![auto-terminal-profile demonstration screen recording](./documentation/demo.gif)

## Prerequisites

- [Node.js](https://nodejs.org/en/) 14-19

## Installation

```sh
npm install --global auto-terminal-profile
```

## Usage

```sh
auto-terminal-profile --help
```

```
Usage: auto-terminal-profile [options] [command]

Automatically switch the macOS Terminal profile based on the system-wide dark / light appearance mode

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  disable                      Disable automatic macOS Terminal profile switching based on system dark / light mode
  enable [options]             Enable automatic macOS Terminal profile switching based on system dark / light mode
  set-dark-profile <profile>   Set the Terminal profile to use in dark mode
  set-light-profile <profile>  Set the Terminal profile to use in light mode
  status                       Show status and configuration
  update-profile               Update the profile of currently running Terminal windows / tabs
  help [command]               display help for command
```

## Acknowledgements

Thanks to [Fatih Arslan](https://github.com/fatih) for his article [*Automatic dark mode for terminal applications*](https://arslan.io/2021/02/15/automatic-dark-mode-for-terminal-applications/) and [Bouke van der Bijl](https://github.com/bouk) for his project [dark-mode-notify](https://github.com/bouk/dark-mode-notify), which this project uses
