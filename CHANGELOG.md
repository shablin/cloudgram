# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2026-10-29

### Added

- Added new format options: spoiler (tg-spoiler, `sp("Hidden text")`), underline (`u("hey")`), strikethrough (`s("Strike")`)

## [0.2.0] - 2026-10-29

### Added

- Formatting support (messages with HTML parse mode enabled)
- Small refactoring

### Fixed

- Improved replyHTML method to ensure proper message formatting

## [0.1.0] - 2026-10-27

### Added

- The fundamental components: Router, Context, Bot
- Command parser
- Custom command handlers
- `debug()` util to make output pretty
- Command routes

### Fixed

- Context class: Set default command value and correct chat_id reference