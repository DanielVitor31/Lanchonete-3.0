export type ColorsDB = {
  [key: string]: string;
};


export type FoodVersion = {
  id: string;
  id_food: string;
  id_categorie: string;
  name_categorie: string;
  name: string;
  description: string | null;
  img: string | null;
  price: number;
  promotion: number | null;
  stock: boolean;
  sale: boolean;
};

export type FoodAddonItem = {
  id: string;
  id_food: string;
  id_food_version: string | null;
  free: boolean;
};

export type FoodAddonCategory = {
  category_id: string;
  category_name: string;
  items: FoodAddonItem[];
};

export type FoodsCategory = {
  id: string;
  name: string;
};

export type FoodFull = {
  id: string;
  name: string;
  description: string | null;
  img: string | null;
  id_categorie: string;
  name_categorie: string;
  price: number;
  promotion: number | null;
  stock: boolean;
  sale: boolean;
  versions: FoodVersion[];
  addons: FoodAddonCategory[];
};

export type FoodWithVersionsMap = Omit<FoodFull, "versions"> & {
  versions: Record<string, FoodVersion>;
};

export type FoodsGrouped = Record<
  string,
  Record<string, FoodWithVersionsMap>
>;

export type FoodsFullResult = {
  list: FoodFull[];
  grouped: FoodsGrouped;
};
