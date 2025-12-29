import { prisma } from "@/lib/prisma";
import { arrayToMap } from "@/ultils/ultils"
import Decimal from "decimal.js";



//#region Função para buscar os dados no banco de dados.

type SearchType = "foods" | "versions" | "addons" | "food_igrendient";

const findFoods = (ids: string[]) =>
    prisma.foods.findMany({
        where: { id_food: { in: ids } },
        select: { id_food: true, price: true, stock: true, sale: true },
    });

const findVersions = (ids: string[]) =>
    prisma.foods_version.findMany({
        where: { id_food_version: { in: ids } },
        select: { id_food_version: true, price: true, stock: true, sale: true },
    });

const findAddons = async (ids: string[]) => {
    const rows = await prisma.foods_addons.findMany({
        where: { id_foods_addon: { in: ids } },
        select: {
            id_foods_addon: true,
            xid_food_version: true,
            free: true,
            food: {
                select: { price: true, stock: true, sale: true },
            },
            food_version: {
                select: { price: true, stock: true, sale: true },
            },
        },
    });

    return rows.map(r => {
        const source = r.xid_food_version ? r.food_version! : r.food;

        return {
            id_foods_addon: r.id_foods_addon,
            price: r.free ? new Decimal(0) : source.price,
            stock: source.stock,
            sale: source.sale,
        };
    });

};

const findExtras = async (ids: string[]) => {
    const rows = await prisma.foods_extra_ingredients.findMany({
        where: { id_foods_extra_ingredients: { in: ids } },
        select: {
            id_foods_extra_ingredients: true,
            extra_ingredients: {
                select: { price: true, qty_max: true, stock: true, sale: true },
            }
        },
    });

    return rows.map((r) => {
        return {
            id_ingredients_related: r.id_foods_extra_ingredients,
            price: r.extra_ingredients.price,
            qty_max: r.extra_ingredients.qty_max,
            stock: r.extra_ingredients.stock,
            sale: r.extra_ingredients.sale,
        };
    })
}


export type FoodsLite = Awaited<ReturnType<typeof findFoods>>[number];
export type VersionsLite = Awaited<ReturnType<typeof findVersions>>[number];
export type AddonsLite = Awaited<ReturnType<typeof findAddons>>[number];
export type FoodIngredientsLite = Awaited<ReturnType<typeof findExtras>>[number];

// overloads: cada type retorna um Map com o value certo
export function searchdb(type: "foods", ids: string[]): Promise<Map<string, FoodsLite>>;
export function searchdb(type: "versions", ids: string[]): Promise<Map<string, VersionsLite>>;
export function searchdb(type: "addons", ids: string[]): Promise<Map<string, AddonsLite>>;
export function searchdb(type: "food_igrendient", ids: string[]): Promise<Map<string, FoodIngredientsLite>>;

export async function searchdb(type: SearchType, ids: string[]) {
    if (ids.length === 0) return new Map<string, never>();

    switch (type) {
        case "foods": {
            const rows = await findFoods(ids);
            return arrayToMap(rows, (r) => r.id_food);
        }

        case "versions": {
            const rows = await findVersions(ids);
            return arrayToMap(rows, (r) => r.id_food_version);
        }

        case "addons": {
            const rows = await findAddons(ids);
            return arrayToMap(rows, (r) => r.id_foods_addon);
        }

        case "food_igrendient": {
            const rows = await findExtras(ids);
            return arrayToMap(rows, (r) => r.id_ingredients_related);
        }
    }
}

//#endregion


