"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type { FoodVersion, FoodsGrouped, FoodWithVersionsMap } from "@/types/type";
import { useState } from "react";
import { X } from "lucide-react";
import { buttonClasses } from "@/styles/preset";
import { OPTION_NULL } from "@/constants";

type Props = {
  open: (value: null) => void;
  foods: FoodsGrouped;
  food: FoodWithVersionsMap;
  foods_categories_obj: { [key: string]: string };
};

type Option = FoodWithVersionsMap | FoodVersion;

export default function SelectMenu({ open, foods, food, foods_categories_obj }: Props) {
  const foodVersions = Object.values(foods[food.id_categorie][food.id].versions);
  const foodVersionsOrder = foodVersions.sort((a, b) => a.price - b.price);
  const foodAddons = foods[food.id_categorie][food.id].addons;
  const foodOptions: Option[][] = [foodVersionsOrder];

  const hasAddons = foodAddons.length > 0;
  const hasVersion = foodVersionsOrder.length > 0;

  if (hasAddons) {
    foodAddons.forEach((addon) => {
      const categoryArray: Option[] = addon.items.map((addonItem) => {
        const foodBase = foods[addon.category_id][addonItem.id_food];
        const foodVersion = addonItem.id_food_version
          ? foodBase.versions[addonItem.id_food_version]
          : foodBase;

        const baseOption: Option = {...foodVersion, price: addonItem.free ? 0 : foodVersion.price};
        return baseOption;
      });

      const orderCategoryArray = categoryArray.sort((a, b) => a.price - b.price);

      // Adiciona a opção de não escolher nada em cada complemento
      const OPTION_NULL_ID = {
        ...OPTION_NULL,
        id: `null-${Date.now()}`,
      };

      foodOptions.push([OPTION_NULL_ID, ...orderCategoryArray]);
    });
  }

  const initialPrice = hasVersion ? foodVersionsOrder[0].price : food.price;
  const pagsMin = hasVersion ? 0 : 1;
  const pagsMax = foodOptions.length - 1;

  const [optionsNumber, setOptionsNumber] = useState<number>(pagsMin);
  const [prices, setPrices] = useState<number[]>([initialPrice]);
  const [optionsSelect, setOptionsSelect] = useState<{ [key: number]: number }>({ 0: 0 });

  const priceTotal = prices.reduce((total, value) => total + value, 0);

  const handleSelectOption = (groupIndex: number, optionIndex: number, price: number) => {
    setOptionsSelect((prev) => ({ ...prev, [groupIndex]: optionIndex }));
    setPrices((prev) => {
      const clone = [...prev];
      clone[groupIndex] = price;
      return clone;
    });
  };

  const orderFinish = Object.entries(optionsSelect).reduce((acc, [key, value]) => {
    const index = Number(key);

    if (index === 0) {
      acc.push(hasVersion ? foodVersionsOrder[value] : food);
    } else if (hasAddons) {
      acc.push(foodOptions[index][value]);
    }

    return acc;
  }, [] as any);

  const handleOrderFinish = () => {

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
              style={{ backgroundImage: `url("${supabaseStorageURL(food.img)}")` }}
            />
          </div>

          {/* Descrição */}
          <p className="w-full text-xs md:text-sm text-zinc-300 leading-snug line-clamp-3 bg-zinc-900/40 rounded-xl px-3 py-2 border border-zinc-800/60">
            {food.description}
          </p>

          {/* Opções (versões / addons) */}
          <section className="min-h-0 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
            {hasVersion || hasAddons ? (
              <>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-xs md:text-sm font-medium text-zinc-200 uppercase tracking-wide">
                    {optionsNumber === 0
                      ? "Versão"
                      : foods_categories_obj[foodOptions[optionsNumber][0].id_categorie]}
                  </p>
                  <p className="text-[15px] text-zinc-500">
                    Passo {optionsNumber + 1} de {pagsMax + 1}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {foodOptions[optionsNumber].map((option, indice) => {
                    const isSelected = optionsSelect[optionsNumber] === indice;
                    const optionImg = optionsNumber === 0 ? null : option.img;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectOption(optionsNumber, indice, option.price)}
                        className={[
                          "group flex h-full flex-col justify-between rounded-xl border px-3 py-2 text-left text-xs md:text-sm transition",
                          "shadow-sm hover:shadow-md",
                          isSelected
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-zinc-800 bg-zinc-900 hover:border-zinc-700",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-2">
                          {/* Imagem só para addons */}
                          {optionImg && optionsNumber !== 0 && (
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0 flex items-center justify-center">
                              <div
                                className="h-full w-full bg-cover bg-center"
                                style={{ backgroundImage: `url("${supabaseStorageURL(optionImg)}")` }}
                              />
                            </div>
                          )}

                          <div className="flex-1 flex items-center justify-between gap-2">
                            <div className="flex flex-col justify-center">
                              <p className="font-small text-zinc-50 line-clamp-2">
                                {option.name}
                              </p>
                              <p className="text-[14px] font-bold text-dinheiro-6 mt-0.5">
                                {option.price === 0 ? "Gratis" : moneyFormatBRL(option.price)}
                              </p>
                            </div>

                            <div
                              className={[
                                "flex h-5 w-5 items-center justify-center rounded-full border transition",
                                isSelected
                                  ? "border-emerald-500 bg-emerald-500/20"
                                  : "border-zinc-700 bg-zinc-900",
                              ].join(" ")}
                            >
                              <span
                                className={[
                                  "h-2.5 w-2.5 rounded-full transition",
                                  isSelected
                                    ? "bg-emerald-400"
                                    : "bg-zinc-600/60 group-hover:bg-zinc-500",
                                ].join(" ")}
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-xs md:text-sm text-zinc-400 text-center">
                Esse item não possui versões ou complementos.
              </p>
            )}
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
              <button
                type="button"
                onClick={() => setOptionsNumber(optionsNumber - 1)}
                className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                disabled={pagsMin === optionsNumber}
              >
                Voltar
              </button>
              {pagsMax !== optionsNumber ? (
                <button
                  type="button"
                  onClick={() => setOptionsNumber(optionsNumber + 1)}
                  className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                  disabled={!(optionsNumber in optionsSelect)}
                >
                  Próximo
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOrderFinish()}
                  className={`${buttonClasses} px-3 py-1 text-xs md:text-sm`}
                  disabled={!(optionsNumber in optionsSelect)}
                >
                  Finalizar
                </button>
              )}


            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
