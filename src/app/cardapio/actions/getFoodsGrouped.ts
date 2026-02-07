import { prisma } from "@/lib/prisma";
import { deepMapToDTO } from "@/ultils/ultils"


const findFoods = async () => {
  const rows = await prisma.foods.findMany({
    where: { sale: true },
    select: {
      food_category: {
        select: { name: true }
      },
      id_food: true, xid_category: true, name: true, description: true, img: true, price: true, promotion: true, stock: true
    },
    orderBy: [
      { food_category: { position_menu: 'asc' } },
      { price: 'asc' },
    ]
  });
  return rows.map((r) => ({ ...r, price: r.price.toNumber(), promotion: r.promotion?.toNumber(), name_category: r.food_category.name }))
}



const findVersions = async () => {
  const rows = await prisma.foods_version.findMany({
    where: { sale: true },
    select: {
      foods: {
        select: {
          name: true,
          img: true,
          food_category: {
            select: { id_foods_categories: true, name: true }
          },
        }
      },
      xid_food: true, id_food_version: true, name: true, description: true, price: true, promotion: true, stock: true
    },
    orderBy: [
      { xid_food: 'asc' },
      { price: 'asc' },
    ]

  });
  return rows.map((r) => ({
    ...r, price: r.price.toNumber(), promotion: r.promotion?.toNumber(),
    name_food: r.foods.name, img: r.foods.img, name_category: r.foods.food_category.name
  }))
}

const findExtrasIngredientLite = async () => {
  const rows = await prisma.foods_extra_ingredients.findMany({
    select: {
      xid_food: true,
      extra_ingredients: {
        select: { id_extra_ingredient: true, name: true, description: true, img: true, price: true, promotion: true, qty_max: true, stock: true }
      }
    },
    orderBy: { extra_ingredients: { price: 'asc' } }
  });

  return rows.map((r) => ({
    ...r, extra_ingredients:
      { ...r.extra_ingredients, price: r.extra_ingredients.price.toNumber(), promotion: r.extra_ingredients.promotion?.toNumber(), qty_chosen: 0 }
  }))
}


const findAddons = async () => prisma.foods_addons.findMany({
  select: {
    food: {
      select: {
        food_category: {
          select: { id_foods_categories: true, name: true, position_addons: true }
        }
      }
    },
    id_foods_addon: true, xid_food_base: true, xid_food: true, xid_food_version: true, free: true
  },
  orderBy: { food: { food_category: { position_addons: 'asc' } } }
});


type FoodDB = Awaited<ReturnType<typeof findFoods>>[number];
type VersionDB = Awaited<ReturnType<typeof findVersions>>[number];
type IngredientDB = Awaited<ReturnType<typeof findExtrasIngredientLite>>[number];
type AddonDB = Awaited<ReturnType<typeof findAddons>>[number];

export type Food = Omit<FoodDB, "food_category">;
export type Version = Omit<VersionDB, "foods">;
export type ExtraIngredient = IngredientDB["extra_ingredients"];
type AddonRelationCategory = Omit<AddonDB, "food">



export type AddonRelation = {
  id_category: string,
  name_category: string,
  items: AddonRelationCategory[];
}


export type FoodFull = Food & {
  versions: Map<string, Version>,
  extra_ingredients: ExtraIngredient[],
  addons: AddonRelation[]
}

type FoodsMap = Map<string, FoodFull>

export type FoodFullMap = Map<string, FoodsMap>;
type AddonComplements = { id_foods_addon: string, free: boolean }
export type Addon = (Food  | Version) & AddonComplements

/**
 * Cria um objeto com os addons agrupados por categoria 
 */
function addonsFormatFunc(addons: AddonDB[]) {
  if (addons.length === 0) return []

  const addonsMap = new Map<string, AddonRelationCategory[]>();
  const categoryMap = new Map<string, string>();

  addons.forEach((adb) => {
    const { food, ...a } = adb
    const categoryId = food.food_category.id_foods_categories

    const arr = addonsMap.get(categoryId) ?? [];
    arr.push(a)
    addonsMap.set(categoryId, arr)


    categoryMap.set(categoryId, food.food_category.name)
  })

  const addonsFormat = [...addonsMap].map(([k, v]) => {
    return {
      id_category: k,
      name_category: categoryMap.get(k)!,
      items: v
    }
  })

  return addonsFormat
}

/**
 * Busca todos os itens do cardapio e seus complementos e os agrupa por categoria
 */
export default async function getFoodsGrouped() {

  const categories = new Map<string, FoodsMap>();

  const versions = new Map<string, Version[]>();
  const ingredients = new Map<string, ExtraIngredient[]>();
  const addons = new Map<string, AddonDB[]>();



  const versionsDB = await findVersions();
  versionsDB.forEach((vdb) => {
    const { foods, ...v } = vdb
    const foodId = v.xid_food

    const arr = versions.get(foodId) ?? [];
    arr.push(v)

    versions.set(foodId, arr)
  })

  const ingredientsDB = await findExtrasIngredientLite();
  ingredientsDB.forEach((i) => {
    const foodId = i.xid_food

    const arr = ingredients.get(foodId) ?? [];
    arr.push(i.extra_ingredients)

    ingredients.set(foodId, arr)

  })


  const addonsDB = await findAddons();
  addonsDB.forEach((a) => {
    const foodId = a.xid_food_base

    const arr = addons.get(foodId) ?? [];
    arr.push(a)

    addons.set(foodId, arr)
  })


  const foodsDB = await findFoods();

  foodsDB.forEach((fdb) => {
    const foodId = fdb.id_food
    const _versions = versions.get(foodId) ?? []
    const _ingredients = ingredients.get(foodId) ?? []
    const _addons = addons.get(foodId) ?? []

    const _versionsMap = new Map<string, Version>();
    const _addonsFormat = addonsFormatFunc(_addons)

    _versions.forEach((v) => _versionsMap.set(v.id_food_version, v));

    const { food_category, ...food } = fdb

    const f = { ...food, versions: _versionsMap, extra_ingredients: _ingredients, addons: _addonsFormat }

    const categoryId = food.xid_category

    if (!categories.has(categoryId)) categories.set(categoryId, new Map<string, FoodFull>());

    categories.get(categoryId)!.set(foodId, f)

  })

  return deepMapToDTO(categories);
}

export type FoodFullObj = Awaited<ReturnType<typeof getFoodsGrouped>>;
