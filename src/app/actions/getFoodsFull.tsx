// service.ts

import { prisma } from "@/lib/prisma";
import type { Prisma, foods_full } from "@prisma/client";
import type {
  FoodFull,
  FoodVersion,
  FoodAddonCategory,
  FoodsFullResult,
  FoodsGrouped,
  FoodWithVersionsMap,
} from "@/types/type";

export async function getFoodsFull(): Promise<FoodsFullResult> {
  const rows: foods_full[] = await prisma.foods_full.findMany();

  const parseJsonArray = <T,>(value: Prisma.JsonValue | null | undefined): T[] => {
    if (!value) return [];
    // se já for array, retorna como T[]
    if (Array.isArray(value)) return value as unknown as T[];
    // se for um objeto único, embrulha em array
    if (typeof value === "object") return [value as unknown as T];
    // caso seja string ou outro tipo (malformado), tenta parse JSON
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (Array.isArray(parsed)) return parsed as unknown as T[];
      if (typeof parsed === "object") return [parsed as unknown as T];
    } catch {
      // ignore
    }
    return [];
  };

  // 1) normaliza tudo pra FoodFull[]
  const foods: FoodFull[] = rows
    // garante pra TS que esses campos não são null
    .filter(
      (row): row is foods_full & {
        id_food: string;
        name: string;
        xid_categorie: string;
      } => !!row.id_food && !!row.name && !!row.xid_categorie
    )
    .map((row) => {
      const versions = parseJsonArray<FoodVersion>(row.versions);
      const addons = parseJsonArray<FoodAddonCategory>(row.addons);

      return {
        id: row.id_food,
        name: row.name,
        description: row.description ?? null,
        img: row.img ?? "logos/logo",
        id_categorie: row.xid_categorie,
        price: Number(row.price ?? 0),
        promotion: row.promotion ? row.promotion.toString() : null,
        stock: row.stock ?? true,
        sale: row.sale ?? true,
        versions, // sempre array (pode ser [])
        addons,
      } satisfies FoodFull;
    });

  const grouped: FoodsGrouped = {} as unknown as FoodsGrouped;

  for (const food of foods) {
    const catId = food.id_categorie;

    if (!grouped[catId]) {
      grouped[catId] = {};
    }

    // monta map de versões: idVersão -> versão (útil para lookup rápido)
    const versionsMap: Record<string, FoodVersion> = {};
    for (const v of food.versions) {
      if (v && (v as any).id) versionsMap[(v as any).id] = v;
    }

    const foodWithMap = {
      ...food,
      versions: food.versions, // garante array (mesmo que vazio)
      versionsMap, // mapa auxiliar (pode ser {} se não houver versões)
    } as unknown as FoodWithVersionsMap;

    grouped[catId][food.id] = foodWithMap;
  }

  return {
    list: foods,
    grouped,
  };
}
