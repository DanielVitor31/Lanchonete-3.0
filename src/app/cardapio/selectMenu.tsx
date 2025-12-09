"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type { FoodsGrouped, FoodWithVersionsMap } from "@/types/type";
import { useState } from "react";
import { X } from "lucide-react";
import { loadAddons, pages, orderFinishOBJ } from "./functions"
import AddonsElement from "./addons"
import ButtonsElement from "./buttons"



type Props = {
  open: (value: null) => void;
  foods: FoodsGrouped;
  food: FoodWithVersionsMap;
  foods_categories_obj: { [key: string]: string };
};


export default function SelectMenu({ open, foods, food }: Props) {
  const foodVersions = Object.values(foods[food.id_categorie][food.id].versions);
  const foodAddonsIDS = foods[food.id_categorie][food.id].addons;


  const hasAddons = foodAddonsIDS.length > 0;
  const hasVersion = foodVersions.length > 0;
  const foodAddons = loadAddons(hasAddons, foodAddonsIDS, foodVersions, foods);



  const initialPrice = hasVersion ? foodVersions[0].price : food.price;
  const pagsMin = hasVersion ? 0 : 1;
  const pagsMax = hasVersion || hasAddons ? foodAddons.length - 1 : 2;
  const [pageCurrent, setPageCurrent] = useState<number>(pagsMin);
  const page = pages({ min: pagsMin, max: pagsMax, current: pageCurrent })

  const [prices, setPrices] = useState<number[]>([initialPrice]);
  const [optionsSelect, setOptionsSelect] = useState<{ [key: number]: number }>({ 0: 0 });

  const priceTotal = prices.reduce((total, value) => total + value, 0);


  const handleOrderFinish = () => {
    const orderFinish = orderFinishOBJ(hasAddons, hasVersion, foodVersions, optionsSelect, food, foodAddons)
    console.log(orderFinish)
  };

  const handleSelectOption = (groupIndex: number, optionIndex: number, price: number) => {
    setOptionsSelect((prev) => ({ ...prev, [groupIndex]: optionIndex }));
    setPrices((prev) => {
      const clone = [...prev];
      clone[groupIndex] = price;
      return clone;
    });
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg h-[80vh] rounded-2xl bg-zinc-950 border border-zinc-800 p-4 shadow-2xl">
        <div className="grid h-full grid-rows-[auto_auto_auto_minmax(0,1fr)_auto] gap-3">
          {/* Cabeçalho */}
          <header className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-base md:text-lg font-semibold text-zinc-50 leading-tight">
                {food.name}
              </h2>
              {(hasVersion || hasAddons) && (
                <span className="inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400 border border-zinc-800">
                  Personalize seu pedido
                </span>
              )}
            </div>

            <button
              className="cursor-pointer select-none text-zinc-500 hover:text-zinc-200 transition"
              onClick={() => open(null)}
              type="button"
            >
              <X size={22} />
            </button>
          </header>

          {/* Imagem principal */}
          <div className="relative w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
            <div
              className="h-40 md:h-48 w-full bg-cover bg-center"
              style={{ backgroundImage: `url("${supabaseStorageURL(food.img!)}")` }}
            />
          </div>

          {/* Descrição */}
          <p className="w-full text-xs md:text-sm text-zinc-300 leading-snug line-clamp-3 bg-zinc-900/40 rounded-xl px-3 py-2 border border-zinc-800/60">
            {food.description}
          </p>

          {/* Opções (versões / addons) */}
          <section className="min-h-0 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
            {!page.isOnLast ?
              (
                <>
                  {hasVersion || hasAddons ? (
                    <AddonsElement handleSelectOption={handleSelectOption} foodAddons={foodAddons} page={page} optionsSelect={optionsSelect} />
                  ) : (
                    <p className="text-xs md:text-sm text-zinc-400 text-center">
                      Esse item não possui versões ou complementos.
                    </p>
                  )}
                </>
              ) : (
                <p></p>
              )
            }

          </section>

          {/* Footer */}
          <footer className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide">
                Total
              </span>
              <span className="text-base md:text-lg font-bold text-dinheiro-6">
                {moneyFormatBRL(priceTotal)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ButtonsElement setPageCurrent={setPageCurrent} handleOrderFinish={handleOrderFinish} page={page} optionsSelect={optionsSelect} />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
