# Auto Terminal Profile

Automatically switch [Terminal](https://en.wikipedia.org/wiki/Terminal_%28macOS%29) profiles when macOS [dark/light mode](https://support.apple.com/guide/mac-help/use-a-light-or-dark-appearance-mchl52e1c2d2/mac) changes

![auto-terminal-profile demonstration screen recording](./documentation/demo.gif)

## Requirements

- [Homebrew](https://brew.sh)

## Installation

```shell
brew install patrik-csak/homebrew-tap/auto-terminal-profile
```

## Usage

### 1. Import Terminal profiles

[Import the Terminal profiles](https://support.apple.com/guide/terminal/import-and-export-terminal-profiles-trml4299c696/mac) you want to use, or continue to the next step if you want to use default profiles

### 2. Configure auto-terminal-profile

Set your preferred dark and light mode profiles:

```shell
auto-terminal-profile config set
```

<details>
<summary><small>You can also set profiles individually:</small></summary>

```shell
auto-terminal-profile config set dark 'Clear Dark'
auto-terminal-profile config set light 'Clear Light'
```

</details>

### 3. Enable automatic switching

```shell
brew services start auto-terminal-profile
```

---

### Disable automatic switching

```shell
brew services stop auto-terminal-profile
```

---

### Related

- [mac-terminal](https://github.com/patrik-csak/mac-terminal) – Node.js library to control the macOS Terminal app
