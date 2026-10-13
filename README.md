# Vivid Life Theme — Windows Terminal

A multi-flavor color theme for [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/). **4 flavors × 6 variants = 24 themes**, all WCAG AA verified, so your eyes never have to file a bug report. Generated from the [Vivid Life design-system foundation](https://github.com/vivid-life-theme/vivid-life-design-system): colors and contrast ratios come from a single source of truth. Inspired by [Dracula for Windows Terminal](https://draculatheme.com/windows-terminal).

## Flavors

In time-of-day order. This port sets the terminal background itself, using the foundation's terminal background tier:

| Flavor       | Type  | Terminal background |
| ------------ | ----- | ------------------- |
| **Midnight** | dark  | `#0a0a0a`           |
| **Twilight** | dark  | `#333333`           |
| **Dawn**     | light | `#d4d4d4`           |
| **Noon**     | light | `#ffffff`           |

The shell and prompt ports ([PowerShell](https://github.com/vivid-life-theme/vivid-life-powershell), [fish](https://github.com/vivid-life-theme/vivid-life-fish), [Starship](https://github.com/vivid-life-theme/vivid-life-starship)) and the [Claude Code port](https://github.com/vivid-life-theme/vivid-life-claude-code) are all checked against these exact backgrounds, so pick the same flavor on both sides.

## Variants

Each flavor comes in six accent variants: **Red · Orange · Yellow · Green · Blue · Purple**. The variant re-tints the accent (cursor color, selection tint); the ANSI palette and surface colors stay put across variants.

## Install

```powershell
git clone https://github.com/vivid-life-theme/vivid-life-windows-terminal.git
cd vivid-life-windows-terminal
.\install.ps1
```

This drops a [JSON Fragment Extension](https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions) into `%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\VividLifeTheme\`, and Windows Terminal picks it up on its own. **No hand-editing of `settings.json` required.** Your carefully curated 400-line `settings.json` stays exactly as fragile as you left it.

If PowerShell blocks the script with an execution-policy error, unblock it first:

```powershell
Unblock-File .\install.ps1
```

Why `git clone` and not a zip download? Because `git pull` + re-running `install.ps1` picks up new themes later. Zip files don't do updates; they just sit in `Downloads` feeling sorry for themselves.

### Choose a theme

Restart Windows Terminal, then go to **Settings → Color schemes** to preview and set a default, or per profile under **Settings → \<profile\> → Appearance → Color scheme**. All 24 schemes appear as `vivid-life-<flavor>-<variant>`.

Default: **Midnight · Purple** (`vivid-life-midnight-purple`), matching the design system's overall default.

### Manual install (no script)

Prefer not to run a script? Open any file under `themes/*.json` and copy its contents into the `"schemes"` array in Windows Terminal's `settings.json` (**Settings → Open JSON file**), one scheme at a time.

### Uninstall

Delete `%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\VividLifeTheme\` and restart Windows Terminal. No registry spelunking involved.

## Scope

Windows Terminal's color surface is foreground/background/cursor/selection plus the 16-color ANSI palette. No shell syntax highlighting; that's the shell's job (see [vivid-life-powershell](https://github.com/vivid-life-theme/vivid-life-powershell) or [vivid-life-fish](https://github.com/vivid-life-theme/vivid-life-fish)). The terminal paints the canvas and stays out of the shell's business. `background` uses the foundation's `surface.bg_terminal` token specifically: it's the only surface tier verified to clear 4.5:1 contrast against every `ansi.*` color per flavor.

The selection color is the design system's resolved terminal selection. Windows Terminal has no selection-foreground key, so ANSI text keeps its own color while selected and can drop below AA contrast on the selection tint (the design system sets `fg` there wherever a target allows it).

## Recommended companion

**Font:** [Atkinson Hyperlegible Mono](https://www.brailleinstitute.org/freefont) for the terminal, or its [Nerd Font variant](https://www.nerdfonts.com/font-downloads) if your prompt (say, [Starship](https://github.com/vivid-life-theme/vivid-life-starship)) uses icon glyphs.

The rest of the family (terminals, editors, prompts, desktop) lives at [github.com/vivid-life-theme](https://github.com/vivid-life-theme).

## Contributing

```bash
npm install
npm run build   # regenerate themes/*.json and dist/vivid-life-windows-terminal.json
npm test        # verify the mapping
npm run format  # prettier
```

Edit `src/theme-template.mjs` to change how foundation tokens map to Windows Terminal's scheme keys. Never hand-edit files under `themes/` or `dist/`: they're generated, and the next build will flatten your changes faster than you can type `git blame`.

If you need a color or token that isn't in the foundation, that's a foundation gap. Open an issue against [vivid-life-design-system](https://github.com/vivid-life-theme/vivid-life-design-system) rather than papering over it here.

## License

MIT. See [LICENSE](LICENSE).
