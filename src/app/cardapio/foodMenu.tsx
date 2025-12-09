"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import { useState } from "react";
import type { FoodsFullResult  } from "@/types/type";
import SelectMenu from "./selectMenu";


type Props = {
  foods: FoodsFullResult;
  foods_categories_obj: {[key: string]: string};
};



export default function FoodMenu({ foods, foods_categories_obj }: Props) {
  const foods_categories_obj_reversa = Object.fromEntries(
    Object.entries(foods_categories_obj).map(([k, v]) => [v, k])
  );

  const foodsGrouped = foods.grouped;
  const foodsCategoriesNames = Object.keys(foods_categories_obj_reversa);
  const [categoriesActive, setCategoriesActive] = useState<string>(foodsCategoriesNames[0]);
  const foodCategoriesIDActive = foods_categories_obj_reversa[categoriesActive];
  const foodsActiveOBJ = foodsGrouped[foodCategoriesIDActive];
  const foodsActive = Object.values(foodsActiveOBJ);
  const foodsActiveOrder = foodsActive;
  const [foodIDActive, setFoodIDActive] = useState<string | null>(null);



  // console.log("Teste valores1", foodsGrouped)
  // console.log("Teste valores2", foodsCategoriesNames)
  // console.log("Teste valores3", active)
  // console.log("Teste valores4", foodCategoriesIDActive)
  // console.log("Teste valores5", foodsActiveOBJ)
  // console.log("Teste valores6", foodsActive)
  // console.log("Teste valores7", foodsActiveOBJ)
  //console.log("Teste valores8", foodActive)

    return (
      <div
        className="
          min-h-screen
          bg-zinc-950
          text-white
          flex
          flex-col md:flex-row
          overflow-hidden
        "
      >
        {/* MENU */}
        <aside
          className="
            w-full md:w-64
            shrink-0
            border-b md:border-b-0 md:border-r
            border-zinc-800
            bg-zinc-900/70
            flex
            flex-col
            max-h-[40vh] md:max-h-none
          "
        >
          <div
            className="
              p-4
              border-b
              border-zinc-800
              bg-zinc-900/80
              backdrop-blur
              sticky top-0
              z-10
            "
          >
            <h1 className="text-lg md:text-xl font-bold">Categorias</h1>
          </div>

          <nav
            className="
              p-2
              flex
              gap-2
              overflow-x-auto md:overflow-x-hidden
              md:flex-col
            "
          >
            {foodsCategoriesNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriesActive(cat)}
                className={`
                  whitespace-nowrap
                  cursor-pointer 
                  select-none
                  active:scale-95
                  transition-all
                  px-4 py-2
                  text-left
                  rounded-lg
                  text-sm md:text-base
                  ${
                    categoriesActive === cat
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-300 hover:bg-zinc-800/40"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* CONTEÚDO */}
        <main
          className="
            flex-1
            overflow-y-auto
            p-4
          "
        >
          <div
            className="
              flex
              flex-wrap
              gap-4
              justify-start
            "
          >
            {foodsActiveOrder.map((food) => (
              <div
                key={food.id}
                onClick={() => setFoodIDActive(food.id)}
                className="
                  w-50
                  h-80
                  grid grid-rows-[1fr_1fr_1fr_1fr]
                  items-center
                  gap-6
                  cursor-pointer select-none
                  hover:scale-95
                  transition-transform duration-150
                  border border-zinc-800
                  bg-zinc-900/60
                  p-4
                  rounded-xl
                "
              >
                <div
                  className="
                    w-24 h-24
                    md:w-28 md:h-28
                    bg-zinc-800
                    bg-cover bg-center
                    mb-1
                    mx-auto
                  "
                  style={{ backgroundImage: `url("${supabaseStorageURL(food.img!)}")` }}
                />

                <p className="w-full text-center text-base md:text-lg font-semibold">
                  {food.name}
                </p>

                  <p
                    className="
                      w-full text-center
                      text-xs md:text-sm
                      text-zinc-300
                      line-clamp-2
                    "
                  >
                    {food.description}
                  </p>

                <p className="w-full text-center text-sm md:text-base font-bold mt-1">
                  {moneyFormatBRL(food.price)}
                </p>
              </div>
            ))}
          </div>
          {!!foodIDActive && <SelectMenu open={setFoodIDActive} foods={foodsGrouped} food={foodsActiveOBJ[foodIDActive]} foods_categories_obj={foods_categories_obj} />}
          

        </main>
      </div>
  );

}
