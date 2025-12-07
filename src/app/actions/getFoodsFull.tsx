"use server"

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
  const parseJsonArray = <T,>(value: Prisma.JsonValue | null | undefined): T[] => {
    if (value == null) return [];
    if (Array.isArray(value)) return value as unknown as T[];
    if (typeof value === "object") return [value as unknown as T];

    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed as unknown as T[];
        if (typeof parsed === "object") return [parsed as unknown as T];
      } catch {
        return [];
      }
    }

    return [];
  };

  // 1) normaliza tudo pra FoodFull[]
  const foods: FoodFull[] = rows
    .filter(
      (row): row is foods_full & {
        id_food: string;
        name: string;
        xid_categorie: string;
      } => !!row.id_food && !!row.name && !!row.xid_categorie
    )
    .map((row) => {
      const versionsArray = parseJsonArray<FoodVersion>(row.versions);
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
        versions: versionsArray, // provisoriamente array (vamos converter abaixo)
        addons,
      } satisfies FoodFull;
    });

  // 2) cria o grouped com versions **como MAP**
  const grouped: FoodsGrouped = {} as FoodsGrouped;

  for (const food of foods) {
    const catId = food.id_categorie;

    if (!grouped[catId]) {
      grouped[catId] = {};
    }

    const versionsArray = Array.isArray(food.versions) ? food.versions : [];

    // transforma o array em MAP { id: objeto }
    const versionsMap: Record<string, FoodVersion> = {};
    for (const v of versionsArray) {
      if (v?.id) versionsMap[v.id] = v;
    }

    const foodFinal = {
      ...food,
      versions: versionsMap, 
    } as FoodWithVersionsMap;

    grouped[catId][food.id] = foodFinal;
  }

  return {
    list: foods,
    grouped,
  };
}
