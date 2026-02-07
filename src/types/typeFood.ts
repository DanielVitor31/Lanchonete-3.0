import type { FoodFullMap, FoodFullObj, FoodFull, Version, Addon, ExtraIngredient } from "@/app/cardapio/actions/getFoodsGrouped";


export type OrderArrayType = {
  versions: Version[],
  extraIngredients: ExtraIngredient[],
  addons: Map<string, Addon[]>
};



export type OrderArrayChosenType = {
  versions: Version | undefined,
  extraIngredients:  Map<string, ExtraIngredient>,
  addons: Map<string, Addon>
};