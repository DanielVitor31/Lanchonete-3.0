"use server"

import { getFoodsFull } from "@/app/actions/getFoodsFull";
import { getFoodsCategories } from "@/app/actions/getFoodsCategories";
import FoodListClient from "./foodMenu";

export default async function CardapioPage() {
  const foods = await getFoodsFull(); 
  const foods_categories = await getFoodsCategories(); 

  return <FoodListClient foods={foods} foods_categories_obj={foods_categories} />;
}
