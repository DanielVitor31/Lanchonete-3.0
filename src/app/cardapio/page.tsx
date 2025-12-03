import { getFoodsFull } from "@/app/actions/getFoodsFull";
import FoodListClient from "./foodMenu";

export default async function CardapioPage() {
  const foods = await getFoodsFull(); // prisma aqui = OK, server only

  return <FoodListClient foods={foods} />;
}
