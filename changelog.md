# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0](https://github.com/patrik-csak/auto-terminal-profile/compare/v3.0.2...v4.0.0) – 2024-03-25

### Added

- Documentation explaining how to automatically update Terminal profile when opening Terminal 

### Changed

- **BREAKING**: `update-profile` gets appearance mode from OS instead of from `DARKMODE` environment variable

## [3.0.2](https://github.com/patrik-csak/auto-terminal-profile/compare/v3.0.1...v3.0.2) – 2024-02-21

### Fixed

- Fix Terminal opening when closed

## [3.0.1](https://github.com/patrik-csak/auto-terminal-profile/compare/v3.0.0...v3.0.1) – 2024-02-20

### Fixed

- Fix broken post-install compilation step

## [3.0.0](https://github.com/patrik-csak/auto-terminal-profile/compare/v2.1.0...v3.0.0) – 2024-02-19

### Changed

- **BREAKING**: `update-profile` gets appearance mode from `DARKMODE` environment variable instead of from OS

### Removed

- Support for Node.js versions before 18

### Fixed

- Fix issue causing `auto-terminal-profile` to silently fail on macOS Sonoma

## [2.1.0](https://github.com/patrik-csak/auto-terminal-profile/compare/v2.0.0...v2.1.0) – 2023-07-04

### Changed

- Update dependencies

## [2.0.0](https://github.com/patrik-csak/auto-terminal-profile/compare/v1.1.1...v2.0.0) – 2023-05-10

### Added

- Support for Node.js v20

### Removed

- **BREAKING**: Support for Node.js v14

## [1.1.1](https://github.com/patrik-csak/auto-terminal-profile/compare/v1.1.0...v1.1.1) – 2023-03-22

### Changed

- Update dependencies with security vulnerabilities

## [1.1.0](https://github.com/patrik-csak/auto-terminal-profile/compare/v1.0.1...v1.1.0) – 2023-03-15

### Added

- Update Terminal’s default profile on appearance mode switch so that Terminal will use the correct profile when opened after appearance mode switch.

## [1.0.1](https://github.com/patrik-csak/auto-terminal-profile/compare/v1.0.0...v1.0.1) – 2022-12-03

### Added

- Support for Node.js v18 and v19
- Changelog
