// Reads foundation tokens from @vivid-life-theme/design-system,
// emits one Windows Terminal color scheme (.json) per (flavor, variant)
// into themes/, plus one aggregate JSON Fragment Extension (dist/) that
// install.ps1 drops into Windows Terminal's Fragments folder so all 24
// schemes appear without the user hand-editing settings.json.
// https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions

import { mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import tokens from "@vivid-life-theme/design-system";

import { buildTheme } from "./src/theme-template.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = join(__dirname, "themes");
const DIST_DIR = join(__dirname, "dist");
const FRAGMENT_FILE = "vivid-life-windows-terminal.json";

const flavors = ["midnight", "twilight", "dawn", "noon"];
const variants = tokens.variant_hues;

mkdirSync(THEMES_DIR, { recursive: true });
mkdirSync(DIST_DIR, { recursive: true });

// Clean stale files so renames don't leave orphans.
for (const file of readdirSync(THEMES_DIR)) {
  if (file.endsWith(".json")) {
    rmSync(join(THEMES_DIR, file));
  }
}
for (const file of readdirSync(DIST_DIR)) {
  if (file.endsWith(".json")) {
    rmSync(join(DIST_DIR, file));
  }
}

const schemes = [];
for (const flavor of flavors) {
  for (const variant of variants) {
    const scheme = buildTheme(flavor, variant, tokens);
    schemes.push(scheme);
    writeFileSync(
      join(THEMES_DIR, `vivid-life-${flavor}-${variant}.json`),
      JSON.stringify(scheme, null, 2) + "\n",
      "utf8",
    );
  }
}

// Node's writeFileSync defaults to UTF-8 without a BOM, which is exactly
// what Windows Terminal requires for fragment files — unlike PowerShell's
// `Write-Output`, which defaults to UTF-16LE and silently produces a
// fragment Windows Terminal can't read.
writeFileSync(
  join(DIST_DIR, FRAGMENT_FILE),
  JSON.stringify({ schemes }, null, 2) + "\n",
  "utf8",
);

console.log(
  `Built ${schemes.length} themes (${flavors.length} flavors x ${variants.length} variants) into themes/, and dist/${FRAGMENT_FILE}`,
);
