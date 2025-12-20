
import type { FoodVersion, FoodsGrouped, FoodAddon, FoodFull, FoodAddonGroupedCategory } from "@/types/typeFood";
import { OPTION_NULL } from "@/constants";

export type Option = FoodFull | FoodVersion | FoodAddon;

export function loadAddons(hasAddons: boolean, foodAddonsIDS: FoodAddonGroupedCategory[], foodVersions: FoodVersion[], foods: FoodsGrouped) {
    const foodAddons: Option[][] = [foodVersions];


    if (hasAddons) {
        foodAddonsIDS.forEach((addon) => {
            const categoryComplement: Option[] = addon.items.map((addonItem) => {
                const foodBase = foods[addon.category_id][addonItem.id_food];
                const foodVersion = addonItem.id_food_version
                    ? foodBase.versions[addonItem.id_food_version]
                    : foodBase;

                const baseOption: Option = { ...foodVersion, price: addonItem.free ? 0 : foodVersion.price, id_addon: addonItem.id };
                return baseOption;
            });

            const ordercategoryComplement = categoryComplement.sort((a, b) => a.price - b.price);

            // Adiciona a opção de não escolher nada em cada complemento
            const OPTION_NULL_ID = {
                ...OPTION_NULL,
                id: `null-${Date.now()}`,
            };

            foodAddons.push([OPTION_NULL_ID, ...ordercategoryComplement]);
        });
    }

    return foodAddons
}

type PagesTypeFunction = {
    min: number;
    max: number;
    current: number;
}

export type PagesType = {
    min: number;
    max: number;
    last: number;
    current: number;
    isOnLast: boolean;
}

export function pages({ min, max, current }: PagesTypeFunction) {

    const pagLast = max + 1
    const pagIsOnLast = current === pagLast

    return {
        "min": min,
        "max": max,
        "last": pagLast,
        "current": current,
        "isOnLast": pagIsOnLast
    }
}


export function orderFinishOBJ(hasAddons: boolean, hasVersion: boolean, foodVersions: FoodVersion[], optionsSelect: { [key: number]: number }, food: FoodFull, foodAddons: Option[][]) {
    const orderFinish = Object.entries(optionsSelect).reduce((acc, [key, value]) => {
        const index = Number(key);

        if (index === 0) {
            acc.push(hasVersion ? foodVersions[value] : food);
        } else if (hasAddons) {
            acc.push(foodAddons[index][value]);
        }

        return acc;
    }, [] as Option[]);

    return orderFinish
}


export function orderStringResume(orderFinish: any[], hasVersion: boolean) {
    const str = orderFinish.map((item, i) => {
        let name = item.name;
        let version: string | null = null;

        if (hasVersion) {
            version = name.match(/\(([^)]+)\)/)?.[1] ?? null;
            name = name.split("(")[0].trim();
        }

        const title = i === 0 ? name : `Complemento ${i}: \n${name}`;
        const versionLine = version ? `Versão ${version}` : "";

        return [
            title,
            versionLine,
            `Valor: ${item.price}`,
            "\n"
        ].filter(Boolean).join("\n");
    })
        .join("")
        .trim();

    return str
}

