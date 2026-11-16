# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Breaking:** the schemes now show readable names in Windows Terminal's dropdowns, such as `Vivid Life · Midnight · Purple` instead of `vivid-life-midnight-purple`. This matches the other ports. Windows Terminal stores the name in each profile, so after updating, pick your scheme again under **Settings → \<profile\> → Appearance → Color scheme**. In `settings.json`, replace any `"colorScheme": "vivid-life-midnight-purple"` with `"colorScheme": "Vivid Life · Midnight · Purple"`.

### Added

- Window themes: `themes/vivid-life-window-themes.json` holds one window theme per color scheme, with the same name (e.g. `Vivid Life · Midnight · Purple`). Pasted into `settings.json`, it puts the tab row (which is also the title bar) on the variant's frame color from the design system; the active tab runs into its pane. Optional and by hand, since a fragment can't carry themes; see the README.

### Changed

- Bumped `@vivid-life-theme/design-system` to 0.14.2 (via 0.14.1). The terminal background is now the flavor's editor background on every flavor (`#171717` / `#404040` / `#d4d4d4` / `#f5f5f5`), Midnight and Twilight get a selection in the accent's hue, and Twilight / Noon `brightBlack` change slightly. Dawn's window themes now give the tab row a visible pastel (e.g. `#d1e2fe` for Blue) instead of a near-white one.

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
