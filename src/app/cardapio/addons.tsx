"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import { useState } from "react";
import { buttonClasses } from "@/styles/preset";
import type { Option } from "./functions";
import type { PagesType } from "./functions";


type Props = {
  handleSelectOption: (groupIndex: number, optionIndex: number, price: number) => void;
  foodAddons: Option[][];
  page: PagesType;
  optionsSelect: { [key: number]: number };
}

export default function AddonsElement({ handleSelectOption, foodAddons, page, optionsSelect }: Props) {


  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs md:text-sm font-medium text-zinc-200 uppercase tracking-wide">
          {page.current === 0
            ? "Versão"
            : foodAddons[page.current][0].name_categorie}
        </p>
        <p className="text-[15px] text-zinc-500">
          Passo {page.current + 1} de {page.max + 1}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {foodAddons[page.current].map((option, indice) => {
          const isSelected = optionsSelect[page.current] === indice;
          const optionImg = page.current === 0 ? null : option.img;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(page.current, indice, option.price)}
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
                {optionImg && page.current !== 0 && (
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
  )
}
