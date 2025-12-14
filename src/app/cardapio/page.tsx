"use server"

import { getFoodsGrouped } from "@/app/actions/getFoodsGrouped";
import { getFoodsCategories } from "@/app/actions/getFoodsCategories";
import FoodListClient from "./foodMenu";

export default async function CardapioPage() {
  const foods = await getFoodsGrouped(); 
  const foods_categories = await getFoodsCategories(); 

  return <FoodListClient foodsGrouped={foods} foods_categories={foods_categories} />;
}
