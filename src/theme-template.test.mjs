import { test } from "node:test";
import assert from "node:assert/strict";
import tokens from "@vivid-life-theme/design-system";
import { contrast } from "@vivid-life-theme/design-system/tools/build-tokens";
import { buildTheme, buildWindowTheme } from "./theme-template.mjs";

const FLAVORS = ["midnight", "twilight", "dawn", "noon"];
const ANSI_KEYS = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "purple",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightPurple",
  "brightCyan",
  "brightWhite",
];

test("builds all 24 flavor x variant combinations", () => {
  for (const flavor of FLAVORS) {
    for (const variant of tokens.variant_hues) {
      const scheme = buildTheme(flavor, variant, tokens);
      assert.match(
        scheme.name,
        /^Vivid Life · (Midnight|Twilight|Dawn|Noon) · (Red|Orange|Yellow|Green|Blue|Purple)$/,
      );
      for (const key of [
        "background",
        "foreground",
        "cursorColor",
        "selectionBackground",
        ...ANSI_KEYS,
      ]) {
        assert.match(
          scheme[key],
          /^#[0-9a-f]{6}$/i,
          `${flavor}/${variant} ${key} should be a 6-digit hex color`,
        );
      }
    }
  }
});

test("scheme has exactly Windows Terminal's documented key set", () => {
  // https://learn.microsoft.com/en-us/windows/terminal/customize-settings/color-schemes
  const expectedKeys = [
    "name",
    "background",
    "foreground",
    "cursorColor",
    "selectionBackground",
    ...ANSI_KEYS,
  ].sort();
  const scheme = buildTheme("midnight", "purple", tokens);
  assert.deepEqual(Object.keys(scheme).sort(), expectedKeys);
});

test("cursorColor matches the accent-shade table", () => {
  const shade = tokens.accent_shade.midnight.purple;
  const expected = tokens.palette.purple[shade];
  const scheme = buildTheme("midnight", "purple", tokens);
  assert.equal(scheme.cursorColor, expected);
});

test("background uses surface.bg_terminal, not bg/bg_sunk/bg_soft", () => {
  const scheme = buildTheme("noon", "blue", tokens);
  assert.equal(scheme.background, tokens.flavors.noon.surface.bg_terminal);
});

// Pins the whole object, and with it the key set: Windows Terminal ignores
// an unknown or misspelled theme key without an error.
test("window theme puts the tab row on the frame — all 24 themes", () => {
  for (const flavor of FLAVORS) {
    for (const variant of tokens.variant_hues) {
      const f = tokens.flavors[flavor];
      const frame = f.frame[variant].bg;
      assert.deepEqual(buildWindowTheme(flavor, variant, tokens), {
        name: buildTheme(flavor, variant, tokens).name,
        window: { applicationTheme: f.type },
        tabRow: { background: frame, unfocusedBackground: frame },
        tab: { background: "terminalBackground", unfocusedBackground: frame },
      });
    }
  }
});

// The frame is the strip that tells the tab row from the pane, and the tab
// titles on it are drawn in the system's text colour for applicationTheme:
// the foundation gates its fg at 4.5:1 on every frame.
test("frame is distinct from the pane and keeps fg readable — all 24 themes", () => {
  for (const flavor of FLAVORS) {
    for (const variant of tokens.variant_hues) {
      const f = tokens.flavors[flavor];
      const frame = f.frame[variant].bg;
      assert.notEqual(frame, buildTheme(flavor, variant, tokens).background);
      const ratio = contrast(frame, f.text.fg);
      assert.ok(
        ratio >= 4.5,
        `${flavor}/${variant}: fg on the frame ${ratio.toFixed(2)}:1`,
      );
    }
  }
});
