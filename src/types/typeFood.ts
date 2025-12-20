export type FoodsCategory = {
  id_foods_categories: string;
  name: string;
  position_menu: number;
  position_addons: number;
};

export type FoodsCategoryObj = Record<string, FoodsCategory>;

export type FoodBase = {
  id_food: string;
  name: string;
  description: string;
  img: string;
  id_categorie: string;
  name_categorie: string;
  price: number;
  promotion: number | null;
  stock: boolean;
  sale: boolean;
};

export type FoodVersion = FoodBase & {
  id_version: string;
};


export type FoodAddon = FoodBase & {
  id_addon: string;
  id_version?: string;
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
  addons: FoodAddonGroupedCategory[];
};

export type FoodsGrouped = Record<string, Record<string, FoodFull>>;
