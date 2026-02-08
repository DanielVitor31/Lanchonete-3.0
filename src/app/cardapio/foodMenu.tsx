"use client";

import { useMemo, useRef, useState } from "react";
import SelectMenu from "./selectMenu";
import { useAppSettings } from "@/context/AppSettingsContext";
import type { FoodFullObj } from "./actions/getFoodsGrouped";
import { culoriCalc } from "@/ultils/colors";
import { deepDTOToMap, moneyFormatBRL, supabaseStorageURL } from "@/ultils/ultils";
import { useInViewOnceContainer } from "@/hooks/useInViewOnceContainer";
import Image from "next/image";


type Props = {
  foodsGroupedOBJ: FoodFullObj;
};

export default function FoodMenu({ foodsGroupedOBJ }: Props) {
  const foodsGroupedMap = useMemo(() => deepDTOToMap(foodsGroupedOBJ), [foodsGroupedOBJ]);

  const categories = useMemo(() => {
    const c = new Map<string, string>();
    for (const fMap of foodsGroupedMap.values()) {
      for (const f of fMap.values()) {
        c.set(f.xid_category, f.name_category);
      }
    }
    return c;
  }, [foodsGroupedMap]);

  const firstCategoryKey = useMemo(() => categories.keys().next().value as string, [categories]);

  const [categoriesActive, setCategoriesActive] = useState<string>(firstCategoryKey);
  const [foodIDActive, setFoodIDActive] = useState<string | null>(null);

  const foodsActive = useMemo(() => {
    const m = foodsGroupedMap.get(categoriesActive);
    return m ? [...m.values()] : [];
  }, [foodsGroupedMap, categoriesActive]);

  const { colors: colorDB } = useAppSettings();

  const StyleBorder = useMemo(() => {
    return culoriCalc(colorDB["--food-menu-fundo"].value, [0.1832, 0.0016, 0.21]);
  }, [colorDB]);

  // ✅ 1 observer só (hook separado)
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useInViewOnceContainer(cardsContainerRef, [categoriesActive, foodsActive.length], {
    selector: ".food-card",
    threshold: 0.15,
    rootMargin: "0px 0px -10% 0px",
    onVisible: (el) => {
      el.classList.remove("opacity-0", "translate-y-6", "rotate-[-1.5deg]");
      el.classList.add("opacity-100", "translate-y-0", "rotate-0");
    },
    onHidden: (el) => {
      el.classList.remove("opacity-100", "translate-y-0", "rotate-0");
      el.classList.add("opacity-0", "translate-y-6", "rotate-[-1.5deg]");
    },
  });


  return (
    <div className="bg-food-menu-fundo-7 flex flex-col md:flex-row h-full">
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
        style={{ borderColor: StyleBorder }}
      >
        <div
          className="p-4 border-b backdrop-blur sticky top-0 z-10"
          style={{ borderColor: StyleBorder }}
        >
          <h1 className="text-lg md:text-xl font-bold text-center">Cardápio</h1>
        </div>

        <nav className="p-2 flex gap-2 overflow-x-auto md:flex-col md:overflow-x-hidden md:overflow-y-auto min-h-0 md:flex-1">
          {[...categories].map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setCategoriesActive(key)}
              className="
                whitespace-nowrap
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
              {cat}
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 overflow-y-auto p-4">
        <div
          ref={cardsContainerRef}
          className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4"
        >
          {foodsActive.map((food, index) => (
            <div
              key={food.id_food}
              onClick={() => setFoodIDActive(food.id_food)}
              className={`
                food-card
                relative
                w-full
                min-h-[124px]
                bg-food-menu-card-fundo-3
                text-food-menu-card-escrita-4
                flex items-center gap-3
                cursor-pointer select-none
                border
                p-3
                rounded-3xl

                active:scale-[0.99]

                md:rounded-xl
                md:w-50
                md:h-80
                md:p-4
                md:grid
                md:grid-rows-[auto_auto_1fr_auto]
                md:items-start
                md:gap-6

                will-change-transform
                transition-[transform,opacity,box-shadow] duration-500 ease-out
                delay-(--card-delay) md:delay-0


                md:opacity-100 md:translate-y-0 md:rotate-0
                md:transition-transform md:duration-150
                md:hover:scale-[1.03]
                md:hover:shadow-md

                opacity-0 translate-y-6 rotate-[-1.5deg]

                motion-reduce:transition-none
                motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:rotate-0
              `}

              style={{
                borderColor: StyleBorder,
                ["--card-delay" as any]: `${Math.min(index * 60, 360)}ms`,
              }}

            >
              {/* IMAGEM */}
              <div
                className="
                  relative
                  w-20 h-20
                  shrink-0
                  overflow-hidden
                  rounded-lg

                  md:w-28 md:h-28
                  md:mx-auto
                "
              >
                <Image
                  src={supabaseStorageURL(food.img!)}
                  alt={food.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>

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
                style={{ color: culoriCalc(colorDB["--money"].value, [-0.16, -0.06, 0.06]) }}
              >
                {moneyFormatBRL(food.price)}
              </p>
            </div>
          ))}
        </div>

        {!!foodIDActive && foodsGroupedMap.get(categoriesActive)?.get(foodIDActive) && (
          <SelectMenu
            open={setFoodIDActive}
            foods={foodsGroupedMap}
            food={foodsGroupedMap.get(categoriesActive)!.get(foodIDActive)!}
          />
        )}
      </main>
    </div>
  );
}
