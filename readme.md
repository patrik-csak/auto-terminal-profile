# Auto Terminal Profile

Automatically switch [macOS Terminal](https://en.wikipedia.org/wiki/Terminal_%28macOS%29) profiles when the [dark / light appearance mode](https://support.apple.com/guide/mac-help/use-a-light-or-dark-appearance-mchl52e1c2d2/mac) changes

![auto-terminal-profile demonstration screen recording](./documentation/demo.gif)

## Prerequisites

- [Node.js](https://nodejs.org/) 18–20

## Installation

```shell
npm install --global auto-terminal-profile
```

## Usage

### Enable automatic profile switching

To get started, enable automatic profile switching and set your preferred dark and light mode profiles:

```shell
auto-terminal-profile enable \
  --dark-profile='One Dark' \
  --light-profile='One Light'
```

### Switch profile on Terminal startup

Auto Terminal Profile only runs if Terminal is running, so the profile can fall out of sync if the macOS appearance mode changes while Terminal isn&rsquo;t running.

To sync the Terminal profile to the current macOS appearance mode once:

```shell
auto-terminal-profile update-profile
```

To sync the Terminal profile to the current macOS appearance mode when Terminal app is opened, you can add that line to your shell startup script (e.g. `.zshrc`), but it will increase the startup time of new shell sessions.

### Disable automatic profile switching

```shell
auto-terminal-profile disable
```

### Help

```shell
auto-terminal-profile --help
```
