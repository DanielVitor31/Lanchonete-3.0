"use client";

import type { OrderArrayType, FoodVersion, FoodExtraIgredien, FoodAddon, OrderArrayChosenType, FoodTypes } from "@/types/typeFood";
import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import { complementsInfos } from "./functions";

type Props = {
  handleSelectOption: (option: FoodTypes | number, optionIndex: number) => void;
  OrderArray: OrderArrayType;
  pageCurrentName: string;
  pageCurrentIndex: number;
  pagMax: number;
  complementSelect: OrderArrayChosenType;
  pageAddons: number;
};




export default function AddonsElement({ handleSelectOption, OrderArray, pageCurrentName, pageCurrentIndex, pagMax, complementSelect, pageAddons }: Props) {
  const complementValues = complementsInfos(pageCurrentName, OrderArray, complementSelect, pageAddons);

  

  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs md:text-sm font-semibold text-zinc-200 uppercase tracking-wide">
          {complementValues.title}
        </p>
        <p className="text-sm text-zinc-500">
          Passo {pageCurrentIndex + 1} de {pagMax - 1}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {complementValues.items.map((complete, indice) => {
          const isSelected = complementValues.getSelected(complete as any);
          let countExtraIngredient = 0;
          const pageCurrentIngredients = pageCurrentName === "extraIgrediens";

         if (pageCurrentIngredients) {
            countExtraIngredient = complementSelect[1][indice].qty_chosen;
          } 
          
          return (
            <div
              key={complementValues.getKey(complete as any)}
              onClick={() => !pageCurrentIngredients && handleSelectOption(complete, indice)}
              className={[
                "group flex h-full flex-col justify-between rounded-xl border px-3 py-2 text-xs md:text-sm transition-all",
                "shadow-sm hover:shadow-md",
                pageCurrentIngredients
                  ? "cursor-default"
                  : "cursor-pointer",
                isSelected && !pageCurrentIngredients
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                {/* Imagens*/}
                {pageCurrentName !== "versions" && (
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${supabaseStorageURL(complete.img)}")` }}
                    />
                  </div>
                )}

                <div className="flex-1 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <p className="font-medium text-zinc-100 line-clamp-2">
                      {complementValues.getName(complete as any)}
                    </p>
                    <p className="text-sm font-bold text-dinheiro-6">
                      {pageCurrentName.includes("addon") && (complete as FoodAddon).free
                        ? "Grátis"
                        : moneyFormatBRL(complete.price)}
                    </p>
                    {countExtraIngredient > 0 && (
                      <p className="text-sm font-bold text-dinheiro-6">
                        SubTotal: {moneyFormatBRL(complete.price * countExtraIngredient)}
                      </p>
                    )}
                  </div>

                  {!pageCurrentIngredients ? (
                    <div
                      className={[
                        "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/20"
                          : "border-zinc-700 bg-zinc-900",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-2.5 w-2.5 rounded-full transition-colors",
                          isSelected
                            ? "bg-emerald-400"
                            : "bg-zinc-600 group-hover:bg-zinc-500",
                        ].join(" ")}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 h-8">
                      <button
                        type="button"
                        onClick={() => handleSelectOption(countExtraIngredient - 1, indice)}
                        disabled={countExtraIngredient === 0}
                        className="flex h-full w-8 items-center justify-center border-r border-zinc-700
                          text-sm font-bold text-zinc-200
                        hover:bg-zinc-700
                          disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center text-sm font-semibold text-zinc-100">
                        {countExtraIngredient}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleSelectOption(countExtraIngredient + 1, indice)}
                        disabled={countExtraIngredient === complementSelect[1][indice].qty_max}
                        className="flex h-full w-8 items-center justify-center border-l border-zinc-700
                          text-sm font-bold text-zinc-200
                        hover:bg-zinc-700
                          disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
