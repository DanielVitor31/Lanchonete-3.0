"use server";

import { prisma } from "@/lib/prisma";
//import type { foods_full } from "@prisma/client";
import type { FoodsGrouped, FoodFull, FoodVersion, FoodAddonGroupedCategory, FoodsVersionGrouped } from "@/types/typeFood";

export async function getFoodsGrouped(): Promise<FoodsGrouped> {
  const rows = await prisma.foods_full.findMany();

  const grouped: FoodsGrouped = {};

  for (const row of rows) {
    const versionsArr = Array.isArray(row.versions)
      ? (row.versions as unknown as FoodVersion[])
      : [];

    const addons = Array.isArray(row.addons)
      ? (row.addons as unknown as FoodAddonGroupedCategory[])
      : [];

    const versions: FoodsVersionGrouped = {};
    for (const v of versionsArr) {
      if (v?.id_version) versions[v.id_version] = v;
    }

    const food: FoodFull = {
      id_food: row.id_food!,
      name: row.name!,
      description: row.description!, 
      img: row.img!,
      id_categorie: row.id_categorie!,
      name_categorie: row.name_categorie!,
      price: Number(row.price!),
      promotion:row.promotion === null || row.promotion === undefined
          ? null
          : Number(row.promotion),
      stock: row.stock!,
      sale: row.sale!,
      versions,
      addons,
    };

    const catId = food.id_categorie;
    (grouped[catId] ??= {})[food.id_food] = food;
  }

  return grouped;
}
