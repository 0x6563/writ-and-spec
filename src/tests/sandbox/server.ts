/**
 * Minimal local server for Playwright to automate against.
 *
 * Serves pages/<name>.sb and pages/<name>.json as static files, plus a thin
 * HTML shell per page name that loads script-bound from CDN, fetches that
 * pair, and mounts <script-bound> with them. No build step, no embedding —
 * the browser fetches the template text and data object directly.
 *
 * Usage: node src/tests/sandbox/server.ts
 */

import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pagesDir = join(__dirname, "pages");
const port = Number(process.env.PORT) || 4310;

const SCRIPT_BOUND_CDN = "https://cdn.jsdelivr.net/gh/0x6563/script-bound@app/dist/script-bound.js";

const PAGE_ASSET_CONTENT_TYPES: Record<string, string> = {
  ".sb": "text/plain; charset=utf-8",
  ".json": "application/json",
};

function shellPage(name: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<script src="${SCRIPT_BOUND_CDN}"></script>
</head>
<body>
<script-bound></script-bound>
<script>
  Promise.all([
    fetch('/pages/${name}.sb').then((r) => r.text()),
    fetch('/pages/${name}.json').then((r) => r.json()),
  ]).then(([source, data]) => {
    const el = document.querySelector('script-bound');
    el.data = data;
    el.source = source;
  });
</script>
</body>
</html>`;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${port}`);

  if (url.pathname.startsWith("/pages/")) {
    const filePath = join(pagesDir, url.pathname.slice("/pages/".length));
    try {
      const content = await readFile(filePath, "utf-8");
      res.writeHead(200, { "Content-Type": PAGE_ASSET_CONTENT_TYPES[extname(filePath)] ?? "text/plain" });
      res.end(content);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`Not found: ${url.pathname}`);
    }
    return;
  }

  const name = url.pathname === "/" ? "index" : url.pathname.replace(/^\//, "");
  if (!existsSync(join(pagesDir, `${name}.sb`))) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Not found: ${name}`);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(shellPage(name));
});

server.listen(port, () => {
  console.log(`Sandbox server running at http://localhost:${port}`);
});
