
import type { FoodVersion, FoodsGrouped, FoodWithVersionsMap, FoodAddonCategory } from "@/types/type";
import { OPTION_NULL } from "@/constants";

export type Option = FoodWithVersionsMap | FoodVersion;

export function loadAddons(hasAddons: boolean, foodAddonsIDS: FoodAddonCategory[], foodVersions: FoodVersion[], foods: FoodsGrouped ) {
    const foodAddons: Option[][] = [foodVersions];


    if (hasAddons) {
        foodAddonsIDS.forEach((addon) => {
            const categoryComplement: Option[] = addon.items.map((addonItem) => {
                const foodBase = foods[addon.category_id][addonItem.id_food];
                const foodVersion = addonItem.id_food_version
                    ? foodBase.versions[addonItem.id_food_version]
                    : foodBase;

                const baseOption: Option = { ...foodVersion, price: addonItem.free ? 0 : foodVersion.price };
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