/**
 * Régénère tous les decks oraux (Blocs 1–5 + overview).
 * Usage (depuis oral/) : node build-all.js
 */
const { spawnSync } = require("child_process");
const path = require("path");

const scripts = [
  "01_kayak/presentation.js",
  "02_steam/presentation.js",
  "03_conversion_uber/presentation.js",
  "04_att_spam/presentation.js",
  "05_getaround/presentation.js",
  "overview/presentation.js",
];

let failed = 0;
for (const rel of scripts) {
  const full = path.join(__dirname, rel);
  console.log("\n===", rel, "===");
  const r = spawnSync(process.execPath, [full], {
    cwd: __dirname,
    stdio: "inherit",
  });
  if (r.status !== 0) {
    console.error("FAILED", rel);
    failed += 1;
  }
}

if (failed) {
  process.exit(1);
}
console.log("\nAll decks regenerated.");
