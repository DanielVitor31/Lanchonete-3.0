import fs from "node:fs";

export function readSchema(path = "prisma/schema.prisma") {
  return fs.readFileSync(path, "utf8");
}

export function writeSchema(content, path = "prisma/schema.prisma") {
  fs.writeFileSync(path, content, "utf8");
}

export function getModelBlock(schema, modelName) {
  const re = new RegExp(`model\\s+${modelName}\\s*\\{[\\s\\S]*?\\n\\}`, "m");
  const match = schema.match(re);
  return { re, block: match?.[0] ?? null };
}

export function replaceModelBlock(schema, modelRe, newBlock) {
  return schema.replace(modelRe, newBlock);
}
