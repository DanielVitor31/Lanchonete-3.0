"use server";


import { prisma } from "@/lib/prisma";


export default async function validateOrder(clientId: string) {
    return await prisma.$transaction(async (tx) => {
        const idToDelet: string[] = []; // Ids dos itens a serem deletados

        const cart = await tx.orders.findMany({
            where: { xid_client: clientId, status: "cart" },
            orderBy: { created_at: "asc" },
            include: {
                orders_food: {
                    orderBy: { created_at: "asc" },
                    include: {
                        orders_food_addon: { orderBy: { created_at: "asc" } },
                    },
                },
            },
        });

        if (cart.length === 0) {
            return null;
        }

        for (const order of cart) {
            const OrderCurrentID = order.id_order; // id do pedido atual
            const orderPriceTotal = Number(order.total_price.toFixed(2)) // Valor total atual da ordem (desatualizado)
            let orderPriceTotalDB = 0; // Valor total do banco de dados (atualizado)
            const idFoodsAddons: string[] = []; // Ids das comidas adicionais
            const idVersionsAddons: string[] = []; // Ids das versões das comidas adicionais
            const idAddons: string[] = []; // Ids dos addons

            const orderFood = order.orders_food[0]; // Sempre terá apenas um item base

            // Verifica se a comida ou versão existe caso n exista ele deleta o pedido e evitar o loop continuar 
            if (!!orderFood.food_version_id) {
                const _versionCheck = await tx.foods_version.findUnique({ where: { id_food_version: orderFood.food_version_id }, select: { id_food_version: true, price: true } })
                if (!_versionCheck) {
                    idToDelet.push(OrderCurrentID)
                    continue;
                }
                orderPriceTotalDB += Number(_versionCheck!.price.toFixed(2));
            } else {
                const _foodCheck = await tx.foods.findUnique({ where: { id_food: orderFood.food_id }, select: { id_food: true, price: true } })
                if (!_foodCheck) {
                    idToDelet.push(OrderCurrentID)
                    continue;
                }
                orderPriceTotalDB += Number(_foodCheck.price.toFixed(2));
            }


            // Verifica apenas se o addon existe. Não precisa verificar comida ou versão pq caso n existe ele já teria deletado o addon automaticamente
            orderFood.orders_food_addon.forEach((addon) => {
                idAddons.push(addon.xid_foods_addons);
            });


            // Caso n tenha nenhum addon nem faz sentido continuar
            if (idAddons.length === 0) {
                if (orderPriceTotalDB !== orderPriceTotal) {
                    idToDelet.push(OrderCurrentID)
                }
                continue;
            }

            const addonCheck = await tx.foods_addons.findMany({ where: { id_foods_addon: { in: idAddons } } }) //Puxar todoss addons

            // Verifica se todos os addons existem caso algum n exista nem faz sentido continuar pq já quebrou o pedido
            if (addonCheck.length !== idAddons.length) {
                idToDelet.push(OrderCurrentID)
                continue
            }

            // Verifica se o addon é gratuito e caso n for adiciona um array para depois extrair o preço
            addonCheck.forEach((addon) => {
                if (addon.free) {
                    orderPriceTotalDB += 0;
                    return
                } else {
                    !!addon.xid_food_version ? idVersionsAddons.push(addon.xid_food_version) : idFoodsAddons.push(addon.xid_food);
                }
            });


            // Verifica se tem algum addon pago ou n 
            const addonsPaid = idVersionsAddons.length > 0 || idFoodsAddons.length > 0;

            // Caso tenha alguma pago adiciona valor ao orderPriceTotalDB
            if (addonsPaid) {
                let _foodPrice: number[] = [0]; // Valor das comidas adicionais (valor padrão 0 para evitar tratamentos no futuro)
                let _foodVersionPrice: number[] = [0]; // Valor das versões das comidas adicionais (valor padrão 0 para evitar tratamentos no futuro)

                // Verifica se o addon é comida ou versão
                if (idFoodsAddons.length !== 0) {
                    const _food = await tx.foods.findMany({ where: { id_food: { in: idFoodsAddons } }, select: { price: true } })
                    _foodPrice = _food.map((item) => Number(item.price.toFixed(2)));
                }

                if (idVersionsAddons.length !== 0) {
                    const _foodVersion = await tx.foods_version.findMany({ where: { id_food_version: { in: idVersionsAddons } }, select: { price: true } })
                    _foodVersionPrice = _foodVersion.map((item) => Number(item.price.toFixed(2)));
                }

                orderPriceTotalDB += _foodPrice.reduce((a, b) => a + b, 0) + _foodVersionPrice.reduce((a, b) => a + b, 0);

            }


            // Verifica se o valor total do banco de dados (atualizado) é igual ao total do pedido
            if (orderPriceTotalDB !== orderPriceTotal) {
                idToDelet.push(OrderCurrentID)
                continue
            }

        };



        if (idToDelet.length > 0) {
            await tx.orders.deleteMany({ where: { id_order: { in: idToDelet } } })
        }

        // Conta quantos pedidos tem no carrinho (atualizado)
        const cartResult = await tx.orders.count({
            where: { xid_client: clientId, status: "cart" },
        })


        // Verifica se o carrinho atualizado tem o mesmo tamanho do carrinho original
        if (cart.length !== cartResult) {
            return false;
        } else {
            return true;
        }

    });
}
