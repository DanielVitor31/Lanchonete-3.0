import FoodMenu from "./foodMenu";
import { getFoodsFullCached } from "./actions/cachedFoods"

export default async function CardapioPage() {
  const foods = await getFoodsFullCached();
  return <FoodMenu foodsGroupedOBJ={foods} />;
}
