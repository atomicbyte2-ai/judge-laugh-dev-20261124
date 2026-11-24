// SPDX-License-Identifier: MIT
import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "entry.txt");
writeFileSync(out, LINE, "utf8");
const back = readFileSync(out, "utf8");
if (back !== LINE) throw new Error("readback mismatch");

console.log(LINE);
console.log(`chars: ${count}`);
