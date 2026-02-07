import { getModelBlock, replaceModelBlock } from "../utils.mjs";

function renameFieldOnly(line, newFieldName) {
  // troca só o nome do campo (primeira palavra da linha)
  return line.replace(/^(\s*)\w+(\s+)/, `$1${newFieldName}$2`);
}

export default function patch(schema) {
  const { re, block } = getModelBlock(schema, "foods");
  if (!block) {
    console.log("skip foods (model not found)");
    return schema;
  }

  const lines = block.split("\n");
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];

    // relação map: "food_category" -> campo "food_category"
    if (
      ln.includes('@relation(') &&
      ln.includes('map: "food_category"') &&
      ln.includes(" foods_categories ")
    ) {
      lines[i] = renameFieldOnly(ln, "food_category");
      changed = true;
      console.log("patched foods: field food_category");
      continue;
    }
  }

  if (!changed) {
    console.log("no-op foods");
    return schema;
  }

  const newBlock = lines.join("\n");

  // trava contra duplicidade
  const dupFoodCategory =
    newBlock.match(/\n\s*food_category\s+foods_categories\s+@relation\(/g)?.length ?? 0;
  if (dupFoodCategory > 1)
    throw new Error(`foods: duplicated "food_category" relation field (${dupFoodCategory}x)`);

  return replaceModelBlock(schema, re, newBlock);
}
