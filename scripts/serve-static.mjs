import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(
  currentDirectory,
  "..",
  process.argv[2] ?? "out",
);
const port = Number(process.argv[3] ?? "4173");

function getCandidates(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const safePath = decodedPath.replace(/^\/+/, "");
  const basePath = path.resolve(rootDirectory, safePath);

  if (!basePath.startsWith(rootDirectory)) {
    return [];
  }

  if (safePath === "") {
    return [path.join(rootDirectory, "index.html")];
  }

  const hasExtension = path.extname(basePath) !== "";

  if (decodedPath.endsWith("/")) {
    return [path.join(basePath, "index.html"), basePath];
  }

  return hasExtension
    ? [basePath]
    : [path.join(basePath, "index.html"), basePath, `${basePath}.html`];
}

function resolveFile(pathname) {
  for (const candidate of getCandidates(pathname)) {
    if (!existsSync(candidate)) {
      continue;
    }

    const stats = statSync(candidate);

    if (stats.isDirectory()) {
      const indexFile = path.join(candidate, "index.html");

      if (existsSync(indexFile)) {
        return indexFile;
      }

      continue;
    }

    if (stats.isFile()) {
      return candidate;
    }
  }

  return null;
}

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
  const filePath = resolveFile(requestUrl.pathname);

  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = path.extname(filePath);
  const contentType =
    mimeTypes[extension] ?? "application/octet-stream";

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${rootDirectory} on http://127.0.0.1:${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => {
      process.exit(0);
    });
  });
}
