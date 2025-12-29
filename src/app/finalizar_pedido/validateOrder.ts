"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { USER_DEFAULT } from "@/constants";
import { searchdb } from "./functions";
export type dataOrder = { price: number, sale: boolean, stock: boolean }
import type { FoodsLite, VersionsLite, AddonsLite, FoodIngredientsLite } from "./functions"


export default async function validateOrder() {

    // Variaveis para busca no banco de dados
    const debugIds = false; // Ativar para ver os IDs dos itens
    const debugErrorItems = false; // Ativar para ver os erros dos itens


    const cart = await prisma.orders.findMany({
        where: { xid_client: USER_DEFAULT, status: "cart" },
        select: {
            id_order: true,
            orders_food: {
                select: {
                    id_order_food: true,
                    food_id: true,
                    food_version_id: true,
                    price: true,

                    orders_food_extra_ingredients: {
                        select: {
                            id_orders_food_extra_ingredients: debugIds,
                            xid_order_food: debugIds,
                            foods_extra_ingredients_id: true,
                            qty_chosen: true,
                            price_unit: true,
                            price_total: debugIds,
                        }
                    },

                    orders_food_addon: {
                        select: {
                            id_order_food_addon: debugIds,
                            xid_order_food: debugIds,
                            foods_addons_id: true,
                            price: true,
                        }
                    }
                }
            }
        }
    });


    // IDs únicos (não repetem)
    const foodOrder = new Map<string, number>();
    const versionOrders = new Map<string, number>();
    const addonOrders = new Map<string, number>();
    const ingredientsOrders = new Map<string, { price: number, qty_chosen: number }>();


    for (const order of cart) {
        const item = order.orders_food[0];

        // Base do item
        if (!!item.food_version_id) {
            versionOrders.set(item.food_version_id, item.price.toNumber());
        } else {
            foodOrder.set(item.food_id, item.price.toNumber());
        }

        // extras ingredientsDB
        for (const extra of item.orders_food_extra_ingredients) {
            ingredientsOrders.set(extra.foods_extra_ingredients_id, { price: extra.price_unit.toNumber(), qty_chosen: extra.qty_chosen });
        }

        // addonsDB
        for (const addon of item.orders_food_addon) {
            addonOrders.set(addon.foods_addons_id, addon.price.toNumber());
        }


    }


    // Busca os itens no banco de dados
    const foodsDB = await searchdb("foods", [...foodOrder.keys()]);
    const versionsDB = await searchdb("versions", [...versionOrders.keys()]);
    const addonsDB = await searchdb("addons", [...addonOrders.keys()]);
    const ingredientsDB = await searchdb("food_igrendient", [...ingredientsOrders.keys()]);


    const invalidOrderFoodIds = new Set<string>();


    const validate = (obj: FoodsLite | VersionsLite | AddonsLite | FoodIngredientsLite | undefined, value: Prisma.Decimal) => {
        if (!obj) return true;
        if (obj.price.toNumber() !== value.toNumber()) return true;
        if (!obj.stock) return true;
        if (!obj.sale) return true;
        return false;
    };



    for (const order of cart) {
        const orderID = order.id_order;
        const item = order.orders_food[0];

        // Verifica se é comida ou versão da comida
        const foodBaseObj = !!item.food_version_id ? versionsDB.get(item.food_version_id) : foodsDB.get(item.food_id);


        // Caso o preço da comida ou versão seja diferente do pedido ou n exista stock ou sale, remove o pedido do carrinho.
        if (validate(foodBaseObj, item.price)) {
            if (debugErrorItems) console.log(`Erro no item. Comida: ${item.food_id} Versão: ${item.food_version_id}`);
            invalidOrderFoodIds.add(orderID);
            continue;
        }


        // 3) Addon não existe mais
        for (const addon of item.orders_food_addon) {

            // Caso o preço do addon seja diferente do pedido ou n exista stock ou sale, remove o pedido do carrinho
            if (validate(addonsDB.get(addon.foods_addons_id), addon.price)) {
                if (debugErrorItems) console.log(`Erro no item. Addon: ${addon.foods_addons_id}`);
                invalidOrderFoodIds.add(orderID);
                break;
            }
        }

        // 4) Ingredientes extras não existe mais
        for (const ingredient of item.orders_food_extra_ingredients) {
            const ingredientsObj = ingredientsDB.get(ingredient.foods_extra_ingredients_id);

            // Caso o preço do ingrediente seja diferente do pedido ou n exista stock ou sale, remove o pedido do carrinho
            if (validate(ingredientsObj, ingredient.price_unit) || ingredient.qty_chosen > Number(ingredientsObj?.qty_max)) {
                if (debugErrorItems) console.log(`Erro no item. Ingrediente: ${ingredient.foods_extra_ingredients_id}`);
                invalidOrderFoodIds.add(orderID);
                break;
            }
            
        }
    }

    const invalidIdsArr = [...invalidOrderFoodIds];

    // if (invalidIdsArr.length > 0) {
    //     await prisma.orders.deleteMany({
    //         where: {
    //             id_order: { in: invalidIdsArr },
    //             status: "cart",
    //             xid_client: USER_DEFAULT,
    //         },
    //     });
    // }

    console.log("Itens para remover", invalidIdsArr);

    return;
}
