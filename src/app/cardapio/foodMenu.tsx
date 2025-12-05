"use client";

import { supabaseStorageURL } from "@/ultils/ultils";
import { useState } from "react";
import type { FoodsFullResult  } from "@/types/type";


type Props = {
  foods: FoodsFullResult;
  foods_categories_obj: {[key: string]: string};
};


type Item = {
  nome: string;
  preco: number;
};



export default function Dashboard({ foods, foods_categories_obj }: Props) {
  const foodsGrouped = foods.grouped;
  const foodsCategoriesNames = Object.keys(foods_categories_obj);
  const [categoriesActive, setCategoriesActive] = useState<string>(foodsCategoriesNames[0]);
  const foodCategoriesIDActive = foods_categories_obj[categoriesActive];
  const foodsActiveOBJ = foodsGrouped[foodCategoriesIDActive];
  const foodsActive = Object.values(foodsActiveOBJ);
  const [foodActive, setFoodActive] = useState<string | null>(null);
  const foodVersionsOBJ = !!foodActive ? foodsActiveOBJ[foodActive].versions : null 
  const foodVersions = !!foodVersionsOBJ ? Object.values(foodVersionsOBJ) : null 


  // console.log("Teste valores1", foodsGrouped)
  // console.log("Teste valores2", foodsCategoriesNames)
  // console.log("Teste valores3", active)
  // console.log("Teste valores4", foodCategoriesIDActive)
  // console.log("Teste valores5", foodsActiveOBJ)
  // console.log("Teste valores6", foodsActive)
  // console.log("Teste valores7", foodsActiveOBJ)
  //console.log("Teste valores8", foodActive)
  console.log("Teste valores9", foodVersionsOBJ)
  console.log("Teste valores10", foodVersions)

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* MENU */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/70 overflow-y-auto">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-xl font-bold">Categorias</h1>
        </div>

        <nav className="p-2 flex flex-col gap-1">
          {foodsCategoriesNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriesActive(cat)}
              className={`cursor-pointer select-none active:scale-95 transition-all px-4 py-2 text-left rounded 
                ${
                  categoriesActive === cat
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/40"
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
          grid
          grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]
          gap-4
          overflow-y-auto
        "
      >
        {foodsActive.map((food) => (
          <div    
            key={food.id}
            onClick={() => setFoodActive(food.id)}
            className="w-60 h-75 flex flex-col items-center overflow-hidden cursor-pointer select-none active:scale-95 transition-all border border-zinc-800 bg-zinc-900/60 p-4 rounded-xl"
          >
            <div
              className="w-[10vh] h-[10vh] bg-cover bg-center"
              style={{ backgroundImage: `url("${supabaseStorageURL(food.img)}")` }}
            />
            <p className="text-lg font-medium">{food.name}</p>
            <p className="text-lg font-small">{food.description}</p>
            <p className="text-lg font-medium">R$ {food.price.toFixed(2)}</p>
          </div>
        ))}
      </main>

    </div>
  );
}
