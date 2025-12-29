import { getModelBlock, replaceModelBlock } from "../utils.mjs";

function renameFieldOnly(line, newFieldName) {
  // troca só o nome do campo (primeira palavra da linha)
  return line.replace(/^(\s*)\w+(\s+)/, `$1${newFieldName}$2`);
}

export default function patch(schema) {
  const { re, block } = getModelBlock(schema, "foods_addons");
  if (!block) {
    console.log("skip foods_addons (model not found)");
    return schema;
  }

  const lines = block.split("\n");
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];

    // relação map: "food" -> campo "food"
    if (ln.includes('@relation(') && ln.includes('map: "food"') && ln.includes(" foods ")) {
      lines[i] = renameFieldOnly(ln, "food");
      changed = true;
      console.log("patched foods_addons: field food");
      continue;
    }

    // relação map: "food_base" -> campo "food_base"
    if (ln.includes('@relation(') && ln.includes('map: "food_base"') && ln.includes(" foods ")) {
      lines[i] = renameFieldOnly(ln, "food_base");
      changed = true;
      console.log("patched foods_addons: field food_base");
      continue;
    }

    // relação map: "food_version" -> campo "food_version"
    if (ln.includes('@relation(') && ln.includes('map: "food_version"') && ln.includes(" foods_version? ")) {
      lines[i] = renameFieldOnly(ln, "food_version");
      changed = true;
      console.log("patched foods_addons: field food_version");
      continue;
    }
  }

  if (!changed) {
    console.log("no-op foods_addons");
    return schema;
  }

  const newBlock = lines.join("\n");

  // trava contra duplicidade
  const dupFood = newBlock.match(/\n\s*food\s+foods\s+@relation\(/g)?.length ?? 0;
  if (dupFood > 1) throw new Error(`foods_addons: duplicated "food" relation field (${dupFood}x)`);

  const dupFoodBase = newBlock.match(/\n\s*food_base\s+foods\s+@relation\(/g)?.length ?? 0;
  if (dupFoodBase > 1) throw new Error(`foods_addons: duplicated "food_base" relation field (${dupFoodBase}x)`);

  return replaceModelBlock(schema, re, newBlock);
}
