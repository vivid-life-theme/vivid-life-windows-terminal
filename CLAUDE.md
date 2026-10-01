# Vivid Life Theme — Windows Terminal

Windows Terminal port of the Vivid Life Theme design system (4 flavors × 6 variants = 24 themes, WCAG AA verified). Companion project to the other [vivid-life-theme ports](https://github.com/orgs/vivid-life-theme/repositories) (fish, VS Code, starship, PowerShell, xfce4-terminal).

## Key Config Files

| File                                       | Purpose                                                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `build.mjs`                                | Generates `themes/*.json` and `dist/vivid-life-windows-terminal.json` from `@vivid-life-theme/design-system` |
| `.claudeignore`                            | Excludes `node_modules/` from Claude Code's project indexing                                                 |
| `.claude/learnings.md`                     | Auto-collected corrections/observations from config skill runs                                               |
| `CLAUDE.md`                                | Project instructions, loaded every message                                                                   |
| `.claude/settings.json`                    | Permissions, hooks, environment variables                                                                    |
| `.claude/skills/release/SKILL.md`          | TODO: add description                                                                                        |
| `.claude/skills/vivid-life-theme/SKILL.md` | Fetches the design-system tokens/foundation for building themed artifacts                                    |
| `.githooks/pre-commit`                     | Runs `scripts/sync-config-table.sh` before each commit                                                       |
| `.github/workflows/claude-code-review.yml` | Auto-review on PR open/update                                                                                |
| `.github/workflows/claude.yml`             | `@claude` mention trigger in issues/PRs                                                                      |
| `.gitignore`                               | Git ignore patterns                                                                                          |
| `package.json`                             | npm scripts (`build`, `test`, `format`) and the design-system devDependency                                  |
| `scripts/sync-config-table.sh`             | Keeps this Key Config Files table in sync with the filesystem                                                |

<!-- cc-config: last-optimize-run: 2026-08-30 3e9e33f3e85bc3b47648ee5db3730681d25a923e -->

## Commands

- `npm run build` — regenerate `themes/*.json` and `dist/vivid-life-windows-terminal.json` from `@vivid-life-theme/design-system`
- `npm test` — run `src/theme-template.test.mjs` (node:test)
- `npm run format` / `npm run format:check` — prettier
- `./install.ps1` (Windows, PowerShell) — installs the built fragment into Windows Terminal

## Structure

- `themes/*.json` — generated output, one Windows Terminal color scheme per flavor×variant (`vivid-life-<flavor>-<variant>.json`), committed to git (matches sibling ports). For manual copy-paste into `settings.json`. **Never hand-edit** — edit `src/theme-template.mjs` and rebuild.
- `dist/vivid-life-windows-terminal.json` — generated aggregate `{"schemes": [...]}` [JSON Fragment Extension](https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions), committed to git. What `install.ps1` actually deploys — not meant for manual editing or per-scheme copy-paste (use `themes/*.json` for that).
- `install.ps1` — copies `dist/vivid-life-windows-terminal.json` into `%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\VividLifeTheme\`, the documented per-user fragment location. Windows Terminal then picks up all 24 schemes with no `settings.json` edit.
- `src/theme-template.mjs` — pure `buildTheme(flavor, variant, tokens)` mapping foundation tokens to a Windows Terminal scheme object: `name`, `background`, `foreground`, `cursorColor`, `selectionBackground`, plus the 16-color ANSI palette (`black`/`red`/`green`/`yellow`/`blue`/`purple`/`cyan`/`white` and their `bright*` counterparts — this is Windows Terminal's full documented key set, see [color-schemes docs](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/color-schemes); an extra or misspelled key is silently ignored by Windows Terminal rather than erroring, so `theme-template.test.mjs` asserts the exact key set).
- `build.mjs` — iterates all 24 combinations and writes `themes/` and the `dist/` fragment.

## References

Use the `vivid-life-theme` skill to fetch the design-system tokens (`tokens.json`) and system overview before writing any theme-generation code — do not hardcode colors from memory.

## Conventions

- 24 themes = 4 flavors × 6 variants. Keep flavor/variant naming consistent with the upstream design-system and sibling ports (fish, VS Code, xfce4-terminal).
- Windows Terminal's color surface is the 16-color ANSI palette plus `background`/`foreground`/`cursorColor`/`selectionBackground` — no shell syntax highlighting (that's a different port's scope, e.g. `vivid-life-fish`), and no separate cursor-foreground key (unlike `vivid-life-vs-code`'s `terminalCursor.background`/xfce4's `ColorCursorForeground` — Windows Terminal's scheme format has no analogous slot).
- `background` must use `surface.bg_terminal`, not `bg`/`bg_sunk`/`bg_soft` — it's the only surface tier verified against all 16 `ansi.*` colors per flavor (design-system README's `bg_terminal` caveat).
- ANSI slot 5 is named `purple`/`brightPurple` in Windows Terminal's scheme format, mapped from the design-system's `ansi.magenta`/`ansi.bright_magenta`.
- `cursorColor` = the accent (`palette[variant][accent_shade[flavor][variant]]`), mirroring `terminalCursor.foreground` in `vivid-life-vs-code`.
- `selectionBackground` = `flavors[flavor].overlay[variant].selection.terminal.flat` — the design system's resolved terminal selection (recipe flattened over `bg_terminal`; Windows Terminal's scheme keys have no alpha channel). Don't keep a port-side alpha table. Windows Terminal has no `selectionForeground` key, so ANSI text on a selection can fall below AA (documented in README.md).
- Install path: `install.ps1` copies `dist/vivid-life-windows-terminal.json` as a JSON Fragment Extension into `%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\VividLifeTheme\` — Windows Terminal detects it automatically, no `settings.json` edit needed (mirrors Dracula for Windows Terminal's "easy install" script, but via the documented fragments mechanism rather than direct settings.json mutation). Manual per-scheme copy-paste from `themes/*.json` remains as a fallback, documented in README.md.

## Don't

- Don't commit secrets or credentials to git
- Don't use --force flags — fix the underlying issue instead
- Don't hardcode color values without pulling them from the design-system tokens via the `vivid-life-theme` skill

## Learnings

When the user corrects a mistake or points out a recurring issue, append a one-line summary to .claude/learnings.md. Don't modify CLAUDE.md directly.

## Compact Instructions

When compacting, preserve: list of modified files, current test status, open TODOs, and key decisions made.
