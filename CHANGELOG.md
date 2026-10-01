# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-10-01

### Changed

- Bumped `@vivid-life-theme/design-system` to 0.11.0 (via 0.9.0). Cursor accent colors shift in several themes.
- `selectionBackground` now uses the design system's resolved terminal selection (`overlay[variant].selection.terminal.flat`) instead of a port-side 30% accent blend. Selection colors change in all 24 themes.

### Documentation

- README notes that Windows Terminal has no selection-foreground key, so ANSI text can fall below AA contrast on the selection tint.

## [0.1.0] - 2026-09-01

### Added

- Windows Terminal port of the Vivid Life Theme design system: 24 color schemes (4 flavors × 6 variants), generated from `@vivid-life-theme/design-system` tokens and WCAG AA verified.
- `install.ps1` to deploy all 24 schemes as a JSON Fragment Extension, so Windows Terminal picks them up automatically with no `settings.json` edit.
- `themes/*.json` per-scheme files for manual copy-paste into `settings.json` as a fallback to the fragment install.
- Release process: git tag plus GitHub Release, since this port has no package registry.

### Changed

- Bumped `@vivid-life-theme/design-system` to 0.7.0, picking up per-flavor ANSI shade rungs and shade-ruleset-derived syntax/semantic tokens. Regenerates the 12 twilight and dawn theme files: normal/bright ANSI rungs shift, `twilight.bg_terminal` becomes a dedicated literal (`#333333`), and `dawn.bg_terminal` now equals `bg` (`#d4d4d4`). Midnight and noon themes are unchanged.
