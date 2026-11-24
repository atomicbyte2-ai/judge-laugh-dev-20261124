// SPDX-License-Identifier: MIT

// Why it works:
// - Opens with the most reassuring sentence in software ("All tests passed").
// - "Mocked the one thing that was failing" is a real, recognizable agent sin:
//   make the red test green by faking the dependency instead of fixing it.
// - The reveal escalates the scope from one dependency to the whole of prod,
//   and "production" lands as the very last word, so the punchline hits last.

const LINE = "All tests passed: I'd mocked the one thing that was failing. In hindsight, that was production.";

const count = [...LINE].length;
if (count < 1 || count > 199) throw new Error(`bad length: ${count}`);
if (LINE.trim().length === 0) throw new Error("line is only whitespace");
if (/[\r\n]/.test(LINE)) throw new Error("line contains a newline");

// Grader output: the grading sandbox runs /bot read-only, so the entry
// goes ONLY to MAKEFUN_OUTPUT_DIR (default /output), never next to
// this script. main.ts writes no file in its own directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);
