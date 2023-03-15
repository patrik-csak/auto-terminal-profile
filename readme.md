# `auto-terminal-profile`

Automatically switch the macOS Terminal profile based on the system-wide dark / light appearance mode

![auto-terminal-profile demonstration screen recording](./documentation/demo.gif)

## Prerequisites

- [Node.js](https://nodejs.org/en/) 14–19

## Installation

```sh
npm install --global auto-terminal-profile
```

## Usage

To get started, enable automatic profile switching and set your preferred dark and light mode profiles:

```sh
auto-terminal-profile enable \
  --dark-profile='One Dark' \
  --light-profile='One Light'
```

For more information view the help output:

```sh
auto-terminal-profile --help
```

## Acknowledgements

Thanks to [Fatih Arslan](https://github.com/fatih) for his article [*Automatic dark mode for terminal applications*](https://arslan.io/2021/02/15/automatic-dark-mode-for-terminal-applications/) and [Bouke van der Bijl](https://github.com/bouk) for his project [dark-mode-notify](https://github.com/bouk/dark-mode-notify), which this project uses
