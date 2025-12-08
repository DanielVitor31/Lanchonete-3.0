"use server";

import { prisma } from "@/lib/prisma";
import type { foods_full } from "@prisma/client";
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

  const list: FoodFull[] = rows.map((row) => {
    const versions = Array.isArray(row.versions)
      ? (row.versions as unknown as FoodVersion[])
      : [];

    const addons = Array.isArray(row.addons)
      ? (row.addons as unknown as FoodAddonCategory[])
      : [];

    return {
      id: row.id!,                    // << non-null assertion
      name: row.name!,                // <<
      description: row.description,   // string | null, ok
      img: row.img,                   // string | null, ok
      id_categorie: row.id_categorie!,      // <<
      name_categorie: row.name_categorie!,  // <<
      price: Number(row.price ?? 0),
      promotion:
        row.promotion === null || row.promotion === undefined
          ? null
          : Number(row.promotion),
      stock: row.stock ?? true,
      sale: row.sale ?? true,
      versions,
      addons,
    };
  });

  const grouped: FoodsGrouped = {};

  for (const food of list) {
    const catId = food.id_categorie;
    if (!grouped[catId]) grouped[catId] = {};

    const versionsMap: Record<string, FoodVersion> = {};
    for (const v of food.versions ?? []) {
      if (v?.id) {
        versionsMap[v.id] = v;
      }
    }

    const foodFinal: FoodWithVersionsMap = {
      ...food,
      versions: versionsMap,
    };

    grouped[catId][food.id] = foodFinal;
  }

  return {
    list,
    grouped,
  };
}
