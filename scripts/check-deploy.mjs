import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));

for (const rule of vercel.headers ?? []) {
  if (rule.source?.includes("/assets/")) {
    for (const header of rule.headers ?? []) {
      if (header.key === "Cache-Control" && /immutable/i.test(header.value)) {
        const catchAll = rule.source === "/assets/(.*)" || rule.source === "/(.*)";
        if (catchAll) errors.push("vercel.json has immutable caching on a generic /assets/* rule");
      }
    }
  }
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function checkNoQueryVersion(file) {
  if (!fs.existsSync(file)) return;
  if (fs.readFileSync(file, "utf8").includes("?v=")) {
    errors.push(`${path.relative(root, file)} contains ?v=`);
  }
}

checkNoQueryVersion(path.join(root, "index.html"));
for (const file of walk(path.join(root, "assets"))) {
  if ([".js", ".css", ".html"].includes(path.extname(file))) checkNoQueryVersion(file);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
  const reference = match[1];
  if (!reference.startsWith("/") || reference.startsWith("//")) continue;
  if (/^(?:tel|mailto):/.test(reference)) continue;
  const local = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (!local.startsWith("/assets/")) continue;
  if (!fs.existsSync(path.join(root, local.replace(/^\//, "")))) {
    errors.push(`index.html references missing local file: ${local}`);
  }
}

if (fs.existsSync(path.join(root, "assets/site-features.js"))) {
  errors.push("assets/site-features.js must be renamed with a content hash");
}

const entryMatch = html.match(/<script[^>]+src=["']([^"']+index[^"']*\.js[^"']*)["']/);
if (entryMatch) {
  const entryPath = entryMatch[1].split(/[?#]/)[0].replace(/^\//, "");
  if (!fs.existsSync(path.join(root, entryPath))) {
    errors.push(`index.html references missing entry bundle: ${entryPath}`);
  } else {
    const entry = fs.readFileSync(path.join(root, entryPath), "utf8");
    for (const match of entry.matchAll(/import\(`\.\/([^`]+\.js)`\)/g)) {
      const name = match[1];
      if (!fs.existsSync(path.join(root, "assets", name))) {
        errors.push(`entry bundle references missing dynamic chunk: ${name}`);
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Deployment cache and asset references are valid");
