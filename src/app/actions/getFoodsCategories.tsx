"use server"

import { prisma } from "@/lib/prisma";
import type { FoodsCategory } from "@/types/typeFood"
import {arrayObjToObjKey} from "@/ultils/ultils"

export async function getFoodsCategories() {
  const foods_categories: FoodsCategory[] = await prisma.foods_categories.findMany({
  orderBy: {
    position_menu: 'asc',
  },
});

   const foods_categories_obj = arrayObjToObjKey({key: "id_foods_categories", obj: foods_categories})

  return foods_categories_obj

}
