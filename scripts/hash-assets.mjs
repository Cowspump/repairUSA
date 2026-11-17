import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const assetsDir = path.join(root, "assets");
const manifestPath = path.join(root, ".asset-hashes.json");
const hashPattern = /\.[a-f0-9]{12}$/;
const mutableExtensions = new Set([
  ".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".woff2", ".wav",
]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const mapping = new Map();
const files = walk(assetsDir).filter((file) => mutableExtensions.has(path.extname(file)));
const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : {};

for (const file of files) {
  const dir = path.dirname(file);
  const ext = path.extname(file);
  let base = path.basename(file, ext);
  base = base.replace(hashPattern, "");

  const content = fs.readFileSync(file);
  const contentHash = crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);
  const relative = path.relative(root, file).split(path.sep).join("/");
  const previous = manifest[relative];
  if (previous?.finalHash === contentHash) continue;

  const hash = contentHash;
  const next = path.join(dir, `${base}.${hash}${ext}`);
  mapping.set(path.basename(file), path.basename(next));

  if (file !== next) {
    fs.renameSync(file, next);
  }
}

function updateReferences(file) {
  let content = fs.readFileSync(file, "utf8");
  content = content.replace(/[?][v]=[^"'&\s)]+/g, "");
  for (const [oldName, newName] of mapping) {
    if (oldName !== newName) {
      content = content.replaceAll(oldName, newName);
    }
  }
  fs.writeFileSync(file, content);
}

updateReferences(path.join(root, "index.html"));
for (const file of walk(assetsDir)) {
  if ([".js", ".css", ".html"].includes(path.extname(file))) {
    updateReferences(file);
  }
}

const nextManifest = {};
for (const file of walk(assetsDir).filter((item) => mutableExtensions.has(path.extname(item)))) {
  const relative = path.relative(root, file).split(path.sep).join("/");
  const contentHash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  nextManifest[relative] = { finalHash: contentHash.slice(0, 12) };
}
fs.writeFileSync(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);

console.log(`Processed ${mapping.size} changed asset files`);
