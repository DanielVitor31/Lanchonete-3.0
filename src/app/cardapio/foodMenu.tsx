"use client";

import { supabaseStorageURL, moneyFormatBRL} from "@/ultils/ultils";
import { culoriCalc } from "@/ultils/colors";
import { useState } from "react";
import type { FoodsGrouped, FoodsCategoryObj } from "@/types/typeFood";
import SelectMenu from "./selectMenu";
import { useAppSettings } from "@/context/AppSettingsContext";

type Props = {
  foodsGrouped: FoodsGrouped;
  foods_categories: FoodsCategoryObj;
};

export default function FoodMenu({ foodsGrouped, foods_categories }: Props) {
  const [categoriesActive, setCategoriesActive] = useState(Object.keys(foods_categories)[0]);
  const [foodIDActive, setFoodIDActive] = useState<string | null>(null);

  const foodsActiveOBJ = foodsGrouped[categoriesActive];
  const foodsActive = Object.values(foodsActiveOBJ);

  const { colorsDB_obj: colorDB } = useAppSettings();

  const StyleBorder = culoriCalc(colorDB["--food-menu-fundo"].value,[0.1832, 0.0016, 0.21]);

  return (
    <div className="min-h-screen bg-food-menu-fundo-7 flex flex-col md:flex-row overflow-hidden">
      {/* MENU */}
      <aside
        className="
          w-full md:w-64
          max-h-[40vh] md:max-h-none
          shrink-0
          border-b md:border-b-0 md:border-r
          text-food-menu-escrita-5
          flex flex-col
        "
        style={{
          background: culoriCalc(colorDB["--food-menu-fundo"].value, [0.0695, 0.0015, 0.07, -0.2]),
          borderColor: StyleBorder,
        }}
      >
        <div
          className="p-4 border-b backdrop-blur sticky top-0 z-10"
          style={{
            background: culoriCalc(colorDB["--food-menu-fundo"].value, [0.0395, 0.0015, 0.07, -0.2]),
            borderColor: StyleBorder,
          }}
        >
          <h1 className="text-lg md:text-xl font-bold">Categorias</h1>
        </div>

        <nav className="p-2 flex gap-2 overflow-x-auto md:flex-col md:overflow-x-hidden">
          {Object.entries(foods_categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setCategoriesActive(key)}
              className="
                whitespace-nowrap
                cursor-pointer
                select-none
                active:scale-95
                transition-all
                px-4 py-2
                text-left
                rounded-lg
                text-sm md:text-base
              "
              style={
                categoriesActive === key
                  ? {
                    backgroundColor: culoriCalc(colorDB["--food-menu-fundo"].value, [0.1331, 0.0011, 0.21]),
                    color: colorDB["--food-menu-escrita"].value,
                  }
                  : {
                    color: culoriCalc(colorDB["--food-menu-escrita"].value, [-0.1189, 0.0155, 286.29]),
                  }
              }
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
          {foodsActive.map((food) => (
            <div
              key={food.id_food}
              onClick={() => setFoodIDActive(food.id_food)}
              className="
                relative
                w-full
                min-h-[104px]
                bg-food-menu-card-fundo-3
                text-food-menu-card-escrita-4
                flex items-center gap-3
                cursor-pointer select-none
                active:scale-[0.99]
                hover:md:scale-95
                transition-transform duration-150
                border
                p-3
                rounded-xl

                md:w-50
                md:h-80
                md:p-4
                md:grid
                md:grid-rows-[auto_auto_1fr_auto]
                md:items-start
                md:gap-6
              "
              style={{ borderColor: StyleBorder }}
            >
              {/* IMAGEM */}
              <div
                className="
                  w-20 h-20
                  shrink-0
                  bg-cover bg-center
                  rounded-lg

                  md:w-28 md:h-28
                  md:mx-auto
                "
                style={{backgroundImage: `url("${supabaseStorageURL(food.img!)}")`}}
              />

              {/* TEXTO */}
              <div className="flex-1 min-w-0 md:block">
                <p className="text-food-menu-card-escrita-3 text-left text-base font-semibold md:text-center md:text-lg">
                  {food.name}
                </p>

                <p className="mt-1 text-xs text-food-menu-card-escrita-3 line-clamp-2 md:mt-0 md:text-center md:text-sm md:line-clamp-3">
                  {food.description}
                </p>
              </div>

              {/* PREÇO */}
              <p
                className="
                  absolute bottom-0 right-3
                  text-sm font-bold

                  md:static
                  md:text-center
                  md:text-base
                "
                style={{ color: culoriCalc(colorDB["--dinheiro"].value, [-0.16, -0.06, 0.06]) }}
              >
                {moneyFormatBRL(food.price)}
              </p>
            </div>
          ))}
        </div>

        {!!foodIDActive && (
          <SelectMenu
            open={setFoodIDActive}
            foods={foodsGrouped}
            food={foodsActiveOBJ[foodIDActive]}
          />
        )}
      </main>
    </div>
  );
}
