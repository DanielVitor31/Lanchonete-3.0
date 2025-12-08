export type ColorsDB = {
  [key: string]: string;
};


export type FoodVersion = {
  id: string;
  id_food: string;
  id_categorie: string
  name: string;
  description: string;
  img: string;
  price: number;
  stock: boolean;
  sale: boolean;
  promotion: number | null;
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
  img: string;
  id_categorie: string;
  price: number;
  promotion: string | null;
  stock: boolean;
  sale: boolean;
  versions: FoodVersion[];
  addons: FoodAddonCategory[];
};

// >>> tipos pra estrutura agrupada <<<

export type FoodWithVersionsMap = Omit<FoodFull, "versions"> & {
  versions: Record<string, FoodVersion>;
};

export type FoodsGrouped = Record<
  string, // id_categorie
  Record<
    string, // id da comida
    FoodWithVersionsMap
  >
>;

// retorno da função
export type FoodsFullResult = {
  list: FoodFull[];      // lista simples
  grouped: FoodsGrouped; // agrupado por categoria/comida
};
