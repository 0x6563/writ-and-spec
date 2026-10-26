#!/usr/bin/env node
/**
 * Zips the src/ project folder for import into Grammar-Well Studio.
 *
 * Packages meta.json, workspace.json, grammars/, and tests/parsing/ (the
 * .txt/.spec.js pairs) from src/ into a single .zip at the repo root, ready
 * to drag into Grammar-Well Studio. src/tests/util/ (ast-builder.ts,
 * parse-spec-input.ts) is local-only dev infrastructure and is never
 * packaged. Uses only Node built-ins (zlib for DEFLATE compression, a
 * hand-rolled CRC-32 + ZIP writer) — no npm dependencies of its own, though
 * it expects `npm run build:studio` (wired as "prepackage-project") to have
 * already compiled the *.spec.ts files to plain JS under the gitignored
 * .package-tmp/ staging folder.
 *
 * Usage: node scripts/package-project.mjs [output.zip]
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const srcDir = path.join(repoRoot, "src");
const buildDir = path.join(repoRoot, ".package-tmp");
const outFile = path.resolve(process.argv[2] || path.join(repoRoot, "writ-and-spec.zip"));

// --- CRC-32 (standard zlib/PKZIP polynomial 0xEDB88320) --------------------

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) {
    crc = CRC_TABLE[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// --- DOS date/time (ZIP local/central header format) ------------------------

function toDosDateTime(date) {
  const dosTime =
    ((date.getHours() & 0x1f) << 11) |
    ((date.getMinutes() & 0x3f) << 5) |
    ((date.getSeconds() >> 1) & 0x1f);
  const dosDate =
    (((date.getFullYear() - 1980) & 0x7f) << 9) |
    (((date.getMonth() + 1) & 0xf) << 5) |
    (date.getDate() & 0x1f);
  return { dosTime, dosDate };
}

// --- Transform a compiled spec .js for Grammar-Well Studio ------------------
//
// Studio evals each spec file's body with `chai`, `describe`/`it`, `result`,
// and `error` already in scope (see reference/utils/workers/assertion.worker.ts)
// and can't resolve module imports at all. Each *.spec.ts has two things that
// don't survive as-is:
//   1. The node:test/chai/parseSpecInput harness region -> replaced with the
//      one line Studio's own mechanism expects.
//   2. The `import { ... } from "../util/ast-builder.js"` line -> replaced with
//      the fixture builder functions themselves, inlined directly (Studio
//      has no module resolver to satisfy that import with).

const SPEC_HARNESS_REGION =
  /\/\/ #region node:test harness \(stripped for Grammar-Well Studio\)[\s\S]*?\/\/ #endregion\n?/;

const SPEC_FIXTURES_REGION =
  /\/\/ #region ast-builder \(inlined for Grammar-Well Studio\)[\s\S]*?\/\/ #endregion\n?/;

function deExport(source) {
  return source.replace(/^export /gm, "");
}

function inlineStudioSpec(source, fixturesBody) {
  return source
    .replace(SPEC_HARNESS_REGION, "const { expect } = chai;\n")
    .replace(SPEC_FIXTURES_REGION, fixturesBody);
}

// --- Walk src/ collecting files as { zipPath, data, mtime } ----------------

function collectFiles(dir, baseDir, out, { skip = [] } = {}) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath).split(path.sep).join("/");
    if (skip.some((skipPath) => relPath === skipPath || relPath.startsWith(`${skipPath}/`))) {
      continue;
    }
    if (entry.isDirectory()) {
      collectFiles(fullPath, baseDir, out, { skip });
    } else if (entry.isFile()) {
      out.push({
        zipPath: relPath,
        data: fs.readFileSync(fullPath),
        mtime: fs.statSync(fullPath).mtime,
      });
    }
  }
  return out;
}

// --- Build the ZIP (DEFLATE via zlib, falling back to STORE if it doesn't shrink) ---

function buildZip(files) {
  const localChunks = [];
  const centralChunks = [];
  let offset = 0;

  for (const file of files) {
    const nameBuf = Buffer.from(file.zipPath, "utf8");
    const crc = crc32(file.data);
    const compressed = zlib.deflateRawSync(file.data);
    const useCompression = compressed.length < file.data.length;
    const method = useCompression ? 8 : 0; // 8 = deflate, 0 = store
    const payload = useCompression ? compressed : file.data;
    const { dosTime, dosDate } = toDosDateTime(file.mtime);

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0); // local file header signature
    localHeader.writeUInt16LE(20, 4); // version needed
    localHeader.writeUInt16LE(0, 6); // flags
    localHeader.writeUInt16LE(method, 8);
    localHeader.writeUInt16LE(dosTime, 10);
    localHeader.writeUInt16LE(dosDate, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(payload.length, 18);
    localHeader.writeUInt32LE(file.data.length, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28); // extra field length

    localChunks.push(localHeader, nameBuf, payload);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0); // central directory signature
    centralHeader.writeUInt16LE(20, 4); // version made by
    centralHeader.writeUInt16LE(20, 6); // version needed
    centralHeader.writeUInt16LE(0, 8); // flags
    centralHeader.writeUInt16LE(method, 10);
    centralHeader.writeUInt16LE(dosTime, 12);
    centralHeader.writeUInt16LE(dosDate, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(payload.length, 20);
    centralHeader.writeUInt32LE(file.data.length, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30); // extra field length
    centralHeader.writeUInt16LE(0, 32); // comment length
    centralHeader.writeUInt16LE(0, 34); // disk number start
    centralHeader.writeUInt16LE(0, 36); // internal attributes
    centralHeader.writeUInt32LE(0o644 << 16, 38); // external attributes (unix perms)
    centralHeader.writeUInt32LE(offset, 42); // offset of local header

    centralChunks.push(centralHeader, nameBuf);

    offset += localHeader.length + nameBuf.length + payload.length;
  }

  const centralDirStart = offset;
  const centralDirBuf = Buffer.concat(centralChunks);

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // end of central directory signature
  eocd.writeUInt16LE(0, 4); // disk number
  eocd.writeUInt16LE(0, 6); // disk where central directory starts
  eocd.writeUInt16LE(files.length, 8); // records on this disk
  eocd.writeUInt16LE(files.length, 10); // total records
  eocd.writeUInt32LE(centralDirBuf.length, 12); // size of central directory
  eocd.writeUInt32LE(centralDirStart, 16); // offset of central directory
  eocd.writeUInt16LE(0, 20); // comment length

  return Buffer.concat([...localChunks, centralDirBuf, eocd]);
}

// --- Main --------------------------------------------------------------------

if (!fs.existsSync(srcDir)) {
  console.error(`src/ not found at ${srcDir}`);
  process.exit(1);
}

const buildParsingDir = path.join(buildDir, "tests", "parsing");
const buildFixturesFile = path.join(buildDir, "tests", "util", "ast-builder.js");

if (!fs.existsSync(buildParsingDir) || !fs.existsSync(buildFixturesFile)) {
  console.error(`Compiled output not found under ${buildDir}. Run "npm run build:studio" first.`);
  process.exit(1);
}

const fixturesBody = deExport(fs.readFileSync(buildFixturesFile, "utf8"));

// Everything under src/ except src/tests/util/ and src/tests/sandbox/
// (local-only dev infra) and the *.spec.ts sources (replaced below by their
// Studio-transformed compiled JS).
const files = collectFiles(srcDir, srcDir, [], { skip: ["tests/util", "tests/sandbox"] }).filter(
  (file) => !file.zipPath.endsWith(".spec.ts")
);

for (const entry of fs.readdirSync(buildParsingDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".spec.js"))
    continue;
  const fullPath = path.join(buildParsingDir, entry.name);
  const source = fs.readFileSync(fullPath, "utf8");
  files.push({
    zipPath: `tests/parsing/${entry.name}`,
    data: Buffer.from(inlineStudioSpec(source, fixturesBody), "utf8"),
    mtime: fs.statSync(fullPath).mtime,
  });
}

if (files.length === 0) {
  console.error(`No files found under ${srcDir}`);
  process.exit(1);
}

const zipBuffer = buildZip(files);
fs.writeFileSync(outFile, zipBuffer);

console.log(`Packaged ${files.length} files from ${srcDir}`);
console.log(`-> ${outFile}`);
