"use server";

import { prisma } from "@/lib/prisma";
import type { OrderArrayChosenType } from "@/types/typeFood"
import { USER_DEFAULT } from "@/constants"
import type { FoodFullMap, FoodFullObj, FoodFull, Version, ExtraIngredient, Addon, Food } from "./actions/getFoodsGrouped"

type Props = {
  total_price: number;
  orderString: string;
  orderReady: OrderArrayChosenType;
  food: Food;
}

export default async function createOrder({ food, total_price, orderString, orderReady }: Props) {

  const version = orderReady.versions;

  return prisma.$transaction(async (tx) => {
    // 1) orders
    const order = await tx.orders.create({
      data: {
        xid_client: USER_DEFAULT,
        total_price: total_price,
        resume_string: orderString,
        status: "cart",
      }
    });

    // 2) orders_food 
    const orders_food = await tx.orders_food.create({
      data: {
        xid_order: order.id_order,
        food_id: version?.xid_food ?? food.id_food,
        food_version_id: version?.id_food_version,
        price: version?.price ?? food.price,
      },
    });

    // 3) orders_food_extra_ingredients
    if (orderReady.extraIngredients.size > 0) {
      await tx.orders_food_extra_ingredients.createMany({
        data: [...orderReady.extraIngredients.values()].map((ingredient) => ({
            xid_order_food: orders_food.id_order_food,
            foods_extra_ingredients_id: ingredient.id_extra_ingredient,
            price_unit: ingredient.price,
            qty_chosen: ingredient.qty_chosen,
            price_total: ingredient.price * ingredient.qty_chosen,
          })),
      });
    }

    // 4) orders_food_addon 
    if (orderReady.addons.size > 0) {

      await tx.orders_food_addon.createMany({
        data: [...orderReady.addons.values()]
          .filter(addon => !(addon.id_foods_addon.includes("null")))
          .map((addon) => ({
            xid_order_food: orders_food.id_order_food,
            foods_addons_id: addon.id_foods_addon,
            price: addon.free ? 0.0 : addon.price,
          })),
      });
    }

    return order.id_order;
  });
}