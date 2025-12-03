export type ColorsDB = {
  [key: string]: string;
};


export type FoodVersion = {
  id: string;                // UUID
  xid_food: string;
  name: string;
  description: string;
  img: string;
  price: number;
  stock: boolean;
  sale: boolean;
  promotion: number | null;
};

export type FoodAddonItem = {
  id_food: string | null;        // UUID ou null
  id_food_version: string | null; // UUID ou null
  free: boolean;
  quant_max: number;
};

export type FoodAddonCategory = {
  category_id: string;      // UUID
  category_name: string;
  items: FoodAddonItem[];
};

export type FoodFull = {
  id: string;          // UUID
  name: string;
  description: string | null;
  img: string;
  id_categorie: string;
  price: number;
  promotion: string | null;
  stock: boolean;
  sale: boolean;
  versions: FoodVersion[];
  addons: FoodAddonCategory[];
};
