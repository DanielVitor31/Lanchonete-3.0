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

   const foods_categories_obj = arrayObjToObjKey({key: "id", obj: foods_categories})
   console.log(foods_categories_obj)

  return foods_categories_obj

}
