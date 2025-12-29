import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { readSchema, writeSchema } from "./utils.mjs";

const schemaPath = "prisma/schema.prisma";
const patchesDir = path.resolve("scripts/prisma/patches");

async function loadPatches(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mjs")).sort();
  const patches = [];

  for (const file of files) {
    const full = path.join(dir, file);
    const mod = await import(pathToFileURL(full).href);

    if (typeof mod.default === "function") {
      patches.push({ name: file, fn: mod.default });
    } else if (typeof mod.patch === "function") {
      patches.push({ name: file, fn: mod.patch });
    } else {
      console.log(`skip ${file} (no default export or patch export)`);
    }
  }
  return patches;
}

(async () => {
  try {
    let schema = readSchema(schemaPath);

    const patches = await loadPatches(patchesDir);
    for (const p of patches) {
      const before = schema;
      schema = p.fn(schema);
      console.log(`${schema !== before ? "applied" : "no-op "} : ${p.name}`);
    }

    writeSchema(schema, schemaPath);
    console.log("All prisma patches applied ✅");
  } catch (err) {
    console.error("Prisma patch failed ❌");
    console.error(err?.stack ?? err);
    process.exit(1);
  }
})();
