// Maps Vivid Life foundation tokens to a Windows Terminal color scheme.
// One pure function: (flavor, variant, tokens) -> scheme JSON object.
//
// `selectionBackground` is the design system's resolved terminal selection
// (`overlay[variant].selection.terminal.flat`, the recipe flattened over
// bg_terminal) since Windows Terminal's scheme keys have no alpha channel.

function resolveAccent(tokens, flavor, variant) {
  const shade = tokens.accent_shade[flavor][variant];
  return tokens.palette[variant][shade];
}

export function buildTheme(flavor, variant, tokens) {
  const f = tokens.flavors[flavor];
  const { surface, text, ansi, overlay } = f;
  const accent = resolveAccent(tokens, flavor, variant);

  return {
    name: `vivid-life-${flavor}-${variant}`,
    background: surface.bg_terminal,
    foreground: text.fg,
    cursorColor: accent,
    selectionBackground: overlay[variant].selection.terminal.flat,
    black: ansi.black,
    red: ansi.red,
    green: ansi.green,
    yellow: ansi.yellow,
    blue: ansi.blue,
    purple: ansi.magenta,
    cyan: ansi.cyan,
    white: ansi.white,
    brightBlack: ansi.bright_black,
    brightRed: ansi.bright_red,
    brightGreen: ansi.bright_green,
    brightYellow: ansi.bright_yellow,
    brightBlue: ansi.bright_blue,
    brightPurple: ansi.bright_magenta,
    brightCyan: ansi.bright_cyan,
    brightWhite: ansi.bright_white,
  };
}
