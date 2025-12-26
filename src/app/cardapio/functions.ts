
import type { FoodsGrouped, FoodAddon, FoodFull, OrderArrayType, FoodVersion, OrderArrayChosenType, FoodExtraIgredien, OrderFoodStringType, OrderIngredientStringType, OrderArrayStringType } from "@/types/typeFood";
import { OPTION_NULL } from "@/constants";
import { moneyFormatBRL, extrackTitleVersion } from "@/ultils/ultils";


export function loadAddons(food: FoodFull, foods: FoodsGrouped) {

    const foodAddons: FoodAddon[][] = [];

    food.addons.forEach((addon) => {
        const categoryComplement = addon.items.map((addonItem) => {
            // Verifica se o complemento está associado a uma versão específica do alimento
            const _foodBase = foods[addon.category_id][addonItem.id_food];
            const hasVersion = addonItem.id_food_version;
            const { versions, extraIgrediens, addons, ...foodBasic } = _foodBase;
            const foodAddon = !!hasVersion
                ? _foodBase.versions[hasVersion]
                : foodBasic;


            return { ...foodAddon, free: addonItem.free, id_addon: addonItem.id } as FoodAddon;
        });

        const sequenceCategoryComplement = categoryComplement.sort((a, b) => a.price - b.price);

        // Adiciona a opção de não escolher nada em cada complemento
        const optionNull = {
            ...OPTION_NULL,
            id_mixed: `null-${Date.now()}`,
        };

        foodAddons.push([optionNull, ...sequenceCategoryComplement]);
    });

    return foodAddons
}


export function pagesNavFunc(hasVersion: boolean, hasExtraIgrediens: boolean, hasAddons: boolean, foodAddons: FoodAddon[][]) {
    const pages: string[] = [];
    if (hasVersion) pages.push("versions");
    if (hasExtraIgrediens) pages.push("extraIgrediens");
    if (hasAddons) {
        foodAddons.forEach((_, index) => {
            pages.push(`addon-${index}`);
        });
    }
    pages.push("orderEnd");

    return pages;
};

export function pricesCalc(complementSelect: OrderArrayChosenType, food: FoodFull) {
    let prices = 0

    const [version, extraIgrediens, addons] = complementSelect;

    const _initialPrice = !!version ? version.price : food.price;
    const _ingredientsFilter = extraIgrediens.filter(ingredient => ingredient.qty_chosen > 0);
    const _ingredients = _ingredientsFilter.reduce((acc, ingredient) => {
        return acc + (ingredient.price * ingredient.qty_chosen);
    }, 0);

    const _addonsFilter = addons.filter(addon => addon.id_addon !== "null");

    const _addons = _addonsFilter.reduce((acc, addon) => {
        return acc + addon.price;
    }, 0);

    prices = _initialPrice + _ingredients + _addons;

    return prices
}





// export function orderFinishOBJ(hasAddons: boolean, hasVersion: boolean, foodVersions: FoodVersion[], optionsSelect: { [key: number]: number }, food: FoodFull, foodAddons: Option[][]) {
//     const orderFinish = Object.entries(optionsSelect).reduce((acc, [key, value]) => {
//         const index = Number(key);

//         if (index === 0) {
//             acc.push(hasVersion ? foodVersions[value] : food);
//         } else if (hasAddons) {
//             acc.push(foodAddons[index][value]);
//         }

//         return acc;
//     }, [] as OrderArrayType[]);

//     return orderFinish
// }

/**
 * Função que monta o resumo do pedido em um array de strings
 */



export function complementsInfos(kind: string, OrderArray: OrderArrayType, complementSelect: OrderArrayChosenType, pageAddons: number) {

    const [versions, extraIgrediens, addons] = OrderArray;

    if (kind === "versions") {
        const items = versions;
        return {
            title: "Versões",
            items,
            getKey: (i: FoodVersion) => `v:${i.id_version}`,
            getSelected: (i: FoodVersion) => i.id_version === complementSelect[0]!.id_version,
            getName: (i: FoodVersion) => `${i.name} (${i.name_version})`,
        };
    }

    if (kind === "extraIgrediens") {
        const items = extraIgrediens;
        return {
            title: "Ingredientes extras",
            items,
            getKey: (i: FoodExtraIgredien) => `e:${i.id_foods_extra_ingredients}`,
            getSelected: (i: FoodExtraIgredien) => false,
            getName: (i: FoodExtraIgredien) => i.name,
        };
    }

    // addons

    const items = addons[pageAddons];
    return {
        title: items[1].name_categorie,
        items,
        getKey: (i: FoodAddon) => `a:${i.id_addon}`,
        getSelected: (i: FoodAddon) => i.id_addon === complementSelect[2]?.[pageAddons]?.id_addon,
        getName: (i: FoodAddon) => i.name_version ? `${i.name} (${i.name_version})` : i.name,
    };
};


export function orderArrayString(complementSelect: OrderArrayChosenType, food: FoodFull): OrderArrayStringType {
    const [version, extraIgrediens, addons] = complementSelect;

    const foodBase = version ?? food;
    const ordersFoodBase = { name: foodBase.name, version: version?.name_version, price: moneyFormatBRL(foodBase.price) };


    const ingredientsParts = extraIgrediens
        .filter(ingredient => ingredient.qty_chosen > 0)
        .map(ingredientsItem => ({
            name: ingredientsItem.name,
            qty_chosen: ingredientsItem.qty_chosen,
            price: moneyFormatBRL(ingredientsItem.price * ingredientsItem.qty_chosen)
        }));


    const addonsParts = addons.map(addonItem => ({ 
        name: addonItem.name, 
        version: addonItem.name_version, 
        price: moneyFormatBRL(addonItem.price)
    }));

    return [ordersFoodBase, ingredientsParts, addonsParts];
}



export function orderStringFunc(orderArrayString: OrderArrayStringType, priceTotal: number) {
    const [foodBase, ingredientsParts, addonsParts] = orderArrayString;

    let _orderString = "";
    

    _orderString += `
    Pedido: ${foodBase.name} 
    ${foodBase.version ? `Versão: ${foodBase.version}` : ''}
    Valor: ${foodBase.price}
    Valor total: ${moneyFormatBRL(priceTotal)}
    `;

    if (ingredientsParts.length > 0) {
        _orderString += `\n\n
        Ingredientes extras:
        `;

        ingredientsParts.forEach(ingredient => {
            _orderString += `
            Ingrediente: ${ingredient.name}
            Quantidade: (${ingredient.qty_chosen})
            Valor: ${ingredient.price}
            \n`;
        });
    }

    if (addonsParts.length > 0) {
        _orderString += `\n\n
        Adicionais:
        `;

        addonsParts.forEach(addon => {
            _orderString += `
            complemento: ${addon.name}
            ${addon.version ? `Versão: ${addon.version}\n` : ''}Valor: ${addon.price}
            \n`;
        });
    }


    return _orderString;
}