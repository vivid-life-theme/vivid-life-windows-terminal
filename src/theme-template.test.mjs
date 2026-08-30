import { test } from "node:test";
import assert from "node:assert/strict";
import tokens from "@vivid-life-theme/design-system";
import { buildTheme } from "./theme-template.mjs";

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
      assert.equal(scheme.name, `vivid-life-${flavor}-${variant}`);
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
