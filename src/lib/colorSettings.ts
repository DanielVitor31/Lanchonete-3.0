// src/lib/colorSettings.ts
import { prisma } from "@/lib/prisma";

export type ColorMap = Record<string, string>;

/**
 * Lê todas as cores da tabela settings_colors
 * e retorna um map: { [name]: corResolvida }
 */
export async function getColorMap(): Promise<ColorMap> {
  const rows = await prisma.settings_colors.findMany();

  const map: ColorMap = {};

  for (const row of rows) {
    // usa value se tiver, senão valueDefault
    const resolved = row.value && row.value.trim() !== ""
      ? row.value
      : row.value_default;

    map[row.name] = resolved;
  }

  return map;
}
