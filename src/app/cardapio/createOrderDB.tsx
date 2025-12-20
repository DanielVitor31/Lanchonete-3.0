"use server";

import { prisma } from "@/lib/prisma";
import type { Option } from "@/app/cardapio/functions"
import type { FoodAddon } from "@/types/typeFood"

type Props = {
  cleinte: string;
  total_price: number; 
  orderString: string; 
  orderReady: Option[]; 
  status: string;
  hasAddons: boolean;
}

export default async function createOrder({cleinte, total_price, orderString, orderReady, status, hasAddons} : Props) {

  const foodBase = orderReady[0];

  return prisma.$transaction(async (tx) => {
    const order = await tx.orders.create({
      data: {
        xid_client: cleinte,
        total_price: total_price,
        resume_string: orderString,
        status: status,
      },
      select: { id_order: true },
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

    // 3) orders_food_addon 
    if (hasAddons) {
      const addons = orderReady.slice(1);

      await tx.orders_food_addon.createMany({
        data: addons.map((addon) => ({
          xid_order_food: orders_food.id_order_food,
          xid_foods_addons: (addon as FoodAddon).id_addon,
          price: addon.price,
        })),
      });
    }

    return order.id_order;
  }); 
}