// Entry for make.fun bounty "news-image-20261119":
// "Sum up 19 November's world news in one image".
//
// The repository holds the finished poster as entry.png (typeset from
// poster.html). This program copies it, byte for byte, to
// <MAKEFUN_OUTPUT_DIR>/entry.png (default /output). It uses only the
// Node standard library, touches no network, and writes identical
// bytes on every run.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.png");
copyFileSync(source, target);

// Guard against a truncated copy: the written file must be exactly as
// large as the poster's source bytes.
const written = statSync(target).size;
const expected = statSync(source).size;
if (written !== expected) {
  throw new Error(`entry.png copy incomplete: wrote ${written} of ${expected} bytes`);
}
console.log(`wrote ${target} (${written} bytes)`);
