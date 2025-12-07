"use server"

import { prisma } from "@/lib/prisma";

export async function getFoodsCategories() {
  const foods_categories = await prisma.foods_categories.findMany();

  const categoriesObj = Object.fromEntries(
  foods_categories.map(cat => [cat.id_foods_categories, cat.name!])
);
  return categoriesObj;
}
