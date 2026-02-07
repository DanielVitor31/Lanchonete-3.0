
import { moneyFormatBRL } from "@/ultils/ultils";
import type { OrderArrayChosenType } from "@/types/typeFood";
import type { FoodFullMap, FoodFull, AddonRelation, Addon, Food } from "./actions/getFoodsGrouped"

/**
 * Carrega os complementos do cardapio completo
 */
export function loadAddons(addonRelation: AddonRelation[], foods: FoodFullMap) {
    const addonsMap = new Map<string, Addon[]>();

    addonRelation.forEach((addon) => {
        const categoryComplement = addon.items.map((addonItem) => {
            const foodBasic = foods.get(addon.id_category)!.get(addonItem.xid_food)!;
            const hasVersion = addonItem.xid_food_version;
            const version = hasVersion ? foodBasic.versions.get(hasVersion)! : null;
            const foodAddon = version
                ? { ...version, name: `${foodBasic.name} (${version.name})` }
                : foodBasic;


            const foodAddonClean = "versions" in foodAddon
                ? (({ addons, versions, extra_ingredients, ...foodAddonReset }) => foodAddonReset)(foodAddon)
                : foodAddon;


            return { ...foodAddonClean, free: addonItem.free, id_foods_addon: addonItem.id_foods_addon }
        });

        const optionNull = {
            "id_foods_addon": `null-${addon.name_category}`,
            "id_food": "null",
            "name": "Não obrigado",
            "description": "null",
            "img": "extras/noOption",
            "xid_category": "null",
            'name_category': "null",
            "price": 0,
            "promotion": undefined,
            "stock": true,
            "free": true,
        }

        categoryComplement.unshift(optionNull);
        addonsMap.set(addon.name_category, categoryComplement);

    });

    return addonsMap
}

/**
 * Adiciona os nomes das paginas dos complementos
 */
export function pagesNavFunc(hasVersion: boolean, hasExtraIgrediens: boolean, foodAddons: string[]) {
    const pages: string[] = [];
    if (hasVersion) pages.push("versions");
    if (hasExtraIgrediens) pages.push("extraIgrediens");
    if (foodAddons.length > 0) foodAddons.forEach((fa) => pages.push(fa));
    pages.push("orderEnd");

    return pages;
};

/**
 * Calcula os valores dos complementos
 */
export function pricesCalc(complementSelect: OrderArrayChosenType, food: FoodFull) {
    const _initialPrice = !!complementSelect.versions ? complementSelect.versions.price : food.price;
    const _ingredients = [...complementSelect.extraIngredients.values()].reduce((acc, ingredient) => {
        return acc + (ingredient.price * ingredient.qty_chosen);
    }, 0);

    const _addonsFilter = [...complementSelect.addons.values()].filter(addon => addon.id_foods_addon !== "null");

    const _addons = _addonsFilter.reduce((acc, addon) => {
        return acc + addon.price;
    }, 0);

    const prices = _initialPrice + _ingredients + _addons;

    return prices
}


/**
 * Cria um array de strings com o pedido completo
 */
export function orderArrayStringFunc(complementSelect: OrderArrayChosenType, foodSimple: Food) {
    const foodBase = complementSelect.versions ?? foodSimple;

    const ingredientsParts = [...complementSelect.extraIngredients.values()]
        .map(ingredientsItem => ({
            name: ingredientsItem.name,
            qty_chosen: ingredientsItem.qty_chosen,
            price: moneyFormatBRL(ingredientsItem.price * ingredientsItem.qty_chosen)
        }));


    const addonsParts = [...complementSelect.addons.values()].map(addonItem => {
        const hasVersion = "id_food_version" in addonItem;
        const _name = hasVersion ? `${addonItem.name_food} (${addonItem.name})` : addonItem.name;
        const _version = hasVersion ? addonItem.name : undefined;

        return {
            name: _name,
            version: _version,
            price: moneyFormatBRL(addonItem.price)
        }
    });

    return {
        foodBase: { ...foodBase, price: moneyFormatBRL(foodBase.price) },
        extraIngredients: ingredientsParts,
        addons: addonsParts
    };
}

export type orderArrayStringFuncType = Awaited<ReturnType<typeof orderArrayStringFunc>>;


/**
 * Cria uma string completa do pedido
 */
export function orderStringFunc(orderArrayString: orderArrayStringFuncType, priceTotal: number) {
    const hasVersion = "id_food_version" in orderArrayString.foodBase;

    let _orderString = "";
    const name = "id_food_version" in orderArrayString.foodBase ? `${orderArrayString.foodBase.name_food} (${orderArrayString.foodBase.name})}` : orderArrayString.foodBase.name;


    _orderString += `
    Pedido: ${name}
    ${hasVersion ? `Versão: ${orderArrayString.foodBase.name}` : ''}
    Valor: ${orderArrayString.foodBase.price}
    Valor total: ${moneyFormatBRL(priceTotal)}
    `;

    if (orderArrayString.extraIngredients.length > 0) {
        _orderString += `\n\n
        Ingredientes extras:
        `;

        orderArrayString.extraIngredients.forEach(ingredient => {
            _orderString += `
            Ingrediente: ${ingredient.name}
            Quantidade: (${ingredient.qty_chosen})
            Valor: ${ingredient.price}
            \n`;
        });
    }

    if (orderArrayString.addons.length > 0) {
        _orderString += `\n\n
        Adicionais:
        `;

        orderArrayString.addons.forEach(addon => {
            _orderString += `
            complemento: ${addon.name}
            ${addon.version ? `Versão: ${addon.version}\n` : ''}Valor: ${addon.price}
            \n`;
        });
    }
    return _orderString;
}
