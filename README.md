# Vivid Life Theme — Windows Terminal

A multi-flavor color theme for [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/). **4 flavors × 6 variants = 24 themes**, all WCAG AA verified. Generated from the [Vivid Life design-system foundation](https://github.com/vivid-life-theme/vivid-life-design-system) — colors and contrast ratios come from a single source of truth. Inspired by [Dracula for Windows Terminal](https://draculatheme.com/windows-terminal).

## Flavors

In time-of-day order:

| Flavor       | Type  | Canvas    |
| ------------ | ----- | --------- |
| **Midnight** | dark  | `#171717` |
| **Twilight** | dark  | `#404040` |
| **Dawn**     | light | `#d4d4d4` |
| **Noon**     | light | `#f5f5f5` |

## Variants

Each flavor is available in six accent variants: **Red · Orange · Yellow · Green · Blue · Purple**. The variant re-tints the accent (cursor color, selection tint); the ANSI palette and surface colors stay stable across variants.

## Install

```powershell
git clone https://github.com/vivid-life-theme/vivid-life-windows-terminal.git
cd vivid-life-windows-terminal
.\install.ps1
```

This copies a [JSON Fragment Extension](https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions) into `%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\VividLifeTheme\` — Windows Terminal picks it up automatically. **No hand-editing of `settings.json` required.**

If PowerShell blocks the script with an execution-policy error, unblock it first:

```powershell
Unblock-File .\install.ps1
```

`git clone` (rather than a zip download) means a later `git pull` + re-running `install.ps1` picks up new themes.

### Choose a theme

Restart Windows Terminal, then **Settings → Color schemes** to preview and set a default, or per-profile under **Settings → \<profile\> → Appearance → Color scheme**. All 24 schemes appear as `vivid-life-<flavor>-<variant>`.

Default: **Midnight · Purple** (`vivid-life-midnight-purple`), matching the design system's overall default.

### Manual install (no script)

Prefer not to run a script? Open any file under `themes/*.json`, copy its contents into the `"schemes"` array in Windows Terminal's `settings.json` (**Settings → Open JSON file**), one scheme at a time.

### Uninstall

Delete `%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\VividLifeTheme\` and restart Windows Terminal.

## Scope

Windows Terminal's color surface is foreground/background/cursor/selection plus the 16-color ANSI palette — no shell syntax highlighting (that's the shell's job, e.g. [vivid-life-fish](https://github.com/vivid-life-theme/vivid-life-fish)). `background` uses the foundation's `surface.bg_terminal` token specifically — the only surface tier verified to clear 4.5:1 contrast against every `ansi.*` color per flavor.

## Recommended companion

**Font** — [Atkinson Hyperlegible Mono](https://www.brailleinstitute.org/freefont) for the terminal, or its [Nerd Font variant](https://www.nerdfonts.com/font-downloads) if your prompt (e.g. [Starship](https://starship.rs)) uses icon glyphs.

## Contributing

```bash
npm install
npm run build   # regenerate themes/*.json and dist/vivid-life-windows-terminal.json
npm test        # verify the mapping
npm run format  # prettier
```

Edit `src/theme-template.mjs` to change how foundation tokens map to Windows Terminal's scheme keys — never hand-edit files under `themes/` or `dist/`, they're generated.

If you need a color or token not in the foundation, that's a foundation gap — open an issue against [vivid-life-design-system](https://github.com/vivid-life-theme/vivid-life-design-system) rather than papering over it here.
