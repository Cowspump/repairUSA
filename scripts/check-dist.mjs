import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const htmlPath = path.join(dist, "index.html");
if (!fs.existsSync(htmlPath)) throw new Error("dist/index.html not found");
const html = fs.readFileSync(htmlPath, "utf8");
if (html.includes("?v=")) throw new Error("Found manual cache-busting query in dist/index.html");

for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = match[1];
  if (!ref.startsWith("/assets/")) continue;
  const file = path.join(dist, ref.slice(1).split("?")[0]);
  if (!fs.existsSync(file)) throw new Error(`Missing dist asset: ${ref}`);
}
console.log("Dist asset references are valid");
