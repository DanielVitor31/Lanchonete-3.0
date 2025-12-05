// service

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

  // helper interno – parse de JSON -> array
  const parseJsonArray = <T,>(
    value: Prisma.JsonValue | null | undefined
  ): T[] => {
    if (!value) return [];
    if (!Array.isArray(value)) return [];
    return value as unknown as T[];
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
        versions,
        addons,
      } satisfies FoodFull;
    });

  // 2) monta estrutura agrupada:
  //    categoria -> comida -> versões em mapa
  const grouped: FoodsGrouped = {};

  for (const food of foods) {
    const catId = food.id_categorie;

    if (!grouped[catId]) {
      grouped[catId] = {};
    }

    // monta map de versões: idVersão -> versão
    const versionsMap: Record<string, FoodVersion> = {};
    for (const v of food.versions) {
      versionsMap[v.id] = v;
    }

    const foodWithMap: FoodWithVersionsMap = {
      ...food,
      versions: versionsMap,
    };

    grouped[catId][food.id] = foodWithMap;
  }

  return {
    list: foods,
    grouped,
  };
}
