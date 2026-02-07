export type FoodsCategory = {
  id_foods_categories: string;
  name: string;
  position_menu: number;
  position_addons: number;
};

export type FoodsCategoryObj = Record<string, FoodsCategory>;

export type Base = {
  name: string;
  description: string;
  img: string;
  price: number;
  promotion: number | null;
  stock: boolean;
  sale: boolean;
}

export type FoodBase = Base & {
  id_food: string;
  id_categorie: string;
  name_categorie: string;
};

export type FoodVersion = FoodBase & {
  id_version: string;
  name_version: string;
};

export type FoodExtraIgredien = Base & {
  id_foods_extra_ingredients: string;
  id_extra_ingredient: string;
  qty_max: number;
  qty_chosen: number;
}


export type FoodAddon = FoodBase & {
  id_addon: string;
  id_version?: string;
  name_version?: string;
  free: boolean;
};


export type FoodAddonGrouped = {
  id: string;
  id_food: string;
  id_food_version: string | null;
  free: boolean;
};

export type FoodAddonGroupedCategory = {
  category_id: string;
  category_name: string;
  items: FoodAddonGrouped[];
};

export type FoodsVersionGrouped = Record<string, FoodVersion>;

export type FoodFull = FoodBase & {
  versions: FoodsVersionGrouped;
  extraIgrediens: FoodExtraIgredien[];
  addons: FoodAddonGroupedCategory[];
};

export type FoodsGrouped = Record<string, Record<string, FoodFull>>;


export type OrderArrayType = [
  FoodVersion[],
  FoodExtraIgredien[],
  FoodAddon[][]
];

export type OrderArrayChosenType = [
  FoodVersion | undefined,
  FoodExtraIgredien[],
  FoodAddon[]
];

export type FoodTypes =  FoodVersion | FoodExtraIgredien | FoodAddon ;

export type ComplementSelectBaseType = {
  idIndice: number,
  totalPrice: number
};

export type ComplementSelectExtraIgredienType = ComplementSelectBaseType & {
  priceUnit: number,
  qtyChosen: number
};

export type ComplementSelectType = {
  [pagSelect: number]: ComplementSelectBaseType | ComplementSelectExtraIgredienType | ComplementSelectBaseType[];
};

export type OrderFoodStringType = {
  name: string,
  version: string | undefined,
  price: string,
}; 

export type OrderIngredientStringType = {
  name: string,
  qty_chosen: number,
  price: string,
}; 

export type OrderArrayStringType = [OrderFoodStringType, OrderIngredientStringType[], OrderFoodStringType[]];
