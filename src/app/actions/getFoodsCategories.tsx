"use server"

import { prisma } from "@/lib/prisma";

export async function getFoodsCategories() {
  const foods_categories = await prisma.foods_categories.findMany()
  const foods_categories_obj = Object.fromEntries(
    foods_categories.map(item => [item.name, item.id_foods_categories])
  );
  return foods_categories_obj;
}
