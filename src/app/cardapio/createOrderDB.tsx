"use server";

import { prisma } from "@/lib/prisma";
import type { FoodFull, FoodAddon, OrderArrayChosenType } from "@/types/typeFood"
import { USER_DEFAULT } from "@/constants"
import validateOrder from "@/app/finalizar_pedido/validateOrder"

type Props = {
  total_price: number;
  orderString: string;
  orderReady: OrderArrayChosenType;
  food: FoodFull;
}

export default async function createOrder({food, total_price, orderString, orderReady }: Props) {

  const [version, ingredients, addons] = orderReady;

  const foodBase = version ?? food;

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
        food_id: foodBase.id_food,
        food_version_id: "id_version" in foodBase ? foodBase.id_version : null,
        price: foodBase.price,
      },
    });

    // 3) orders_food_extra_ingredients
    if (ingredients.length > 0) {
      await tx.orders_food_extra_ingredients.createMany({
        data: ingredients
        .filter(ingredient => ingredient.qty_chosen > 0)
        .map((ingredient) => ({
          xid_order_food: orders_food.id_order_food,
          foods_extra_ingredients_id: ingredient.id_foods_extra_ingredients,
          price_unit: ingredient.price,
          qty_chosen: ingredient.qty_chosen,
          price_total: ingredient.price * ingredient.qty_chosen,
        })),
      });
    }

    // 4) orders_food_addon 
    if (addons.length > 0) {

      await tx.orders_food_addon.createMany({
        data: addons
        .filter(addon => addon.id_food !== "null")
        .map((addon) => ({
          xid_order_food: orders_food.id_order_food,
          foods_addons_id: addon.id_addon,
          price: addon.free ? 0.0 : addon.price,
        })),
      });
    }



    return order.id_order;
  });
}