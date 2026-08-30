// Maps Vivid Life foundation tokens to a Windows Terminal color scheme.
// One pure function: (flavor, variant, tokens) -> scheme JSON object.
//
// Windows Terminal's `selectionBackground` has no alpha channel, so the
// accent-over-bg_terminal blend used elsewhere in the design system
// (VS Code's `terminal.selectionBackground` = accent @ 30% alpha) is
// flattened to an opaque hex here instead of encoded as alpha.

function hexToRgb(hex) {
  const clean = hex.startsWith("#") ? hex.slice(1) : hex;
  if (clean.length !== 6) {
    throw new Error(`hexToRgb expects 6-digit hex, got "${hex}"`);
  }
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (n) => Math.round(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Flattens `fg` blended over `bg` at `ratio` (0-1) opacity into an opaque hex.
function blendFlat(fg, bg, ratio) {
  const a = hexToRgb(fg);
  const b = hexToRgb(bg);
  return rgbToHex({
    r: a.r * ratio + b.r * (1 - ratio),
    g: a.g * ratio + b.g * (1 - ratio),
    b: a.b * ratio + b.b * (1 - ratio),
  });
}

function resolveAccent(tokens, flavor, variant) {
  const shade = tokens.accent_shade[flavor][variant];
  return tokens.palette[variant][shade];
}

export function buildTheme(flavor, variant, tokens) {
  const f = tokens.flavors[flavor];
  const { surface, text, ansi } = f;
  const accent = resolveAccent(tokens, flavor, variant);

  return {
    name: `vivid-life-${flavor}-${variant}`,
    background: surface.bg_terminal,
    foreground: text.fg,
    cursorColor: accent,
    selectionBackground: blendFlat(accent, surface.bg_terminal, 0.3),
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
