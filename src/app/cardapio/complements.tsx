"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type { Addon, Version, ExtraIngredient } from "./actions/getFoodsGrouped"
import Image from "next/image";
import clsx from "clsx";
import { complementsStyles as s } from "./complements.styles";

type Props<Complement> = {
  handleSelectOption: (option: Complement, optionIndex: number) => void;
  complements: Complement[]
  getNameComplement: string
  getId: (item: Complement) => string
  getName: (item: Complement) => string
  getPrice: (item: Complement) => number
  getImg?: (item: Complement) => string
  getFree?: (item: Complement) => boolean
  getQty?: (item: Complement) => number
  getMax?: (item: Complement) => number
  getSelect?: (item: Complement) => boolean
  getCountExtraIngredient?: (item: Complement) => number
  pageCurrentIndex: number;
  pagMax: number;
};


export default function AddonsElement<Complement>({
  handleSelectOption,
  complements,
  getNameComplement,
  getId,
  getName,
  getPrice,
  getImg,
  getFree,
  getQty,
  getMax,
  getSelect,
  getCountExtraIngredient,
  pageCurrentIndex,
  pagMax,
}: Props<Complement>) {


  return (
    <>
      {/* Header */}
      <div className={s.header}>
        <p className="text-xs font-semibold text-zinc-200 uppercase tracking-wide">
          {getNameComplement}
        </p>
        <p className="text-sm text-zinc-500">
          Passo {pageCurrentIndex + 1} de {pagMax - 1}
        </p>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-2">
        {complements.map((complement, indice) => {

          const isExtras = getNameComplement === "Ingredientes Extras";
          const isVersion = getNameComplement === "Versões";
          const isAddonPage = !isExtras && !isVersion;
          const qty = getQty?.(complement) ?? 0;
          const OptionContainerTag = isExtras ? "div" : "button";
          const priceLabel = isAddonPage && getFree?.(complement)
            ? "Grátis"
            : moneyFormatBRL(getPrice(complement));
          const subtotal = qty > 0 ? moneyFormatBRL(getPrice(complement) * qty) : null;
          const isImg = getImg?.(complement);

          return (
            <OptionContainerTag
              key={getId(complement)}
              {...(!isExtras ? { type: "button" } : {})}
              onClick={() => !isExtras && handleSelectOption(complement, indice)}
              className={clsx(
                s.optionContainer,
                isExtras ? "cursor-default" : "cursor-pointer",
                getSelect?.(complement)
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
              )}
            >
              <div className="flex w-full items-center gap-2">
                {/* Imagens*/}
                {isImg && (
                  <div className={s.imageAddonContainer}>
                    <Image
                      src={supabaseStorageURL(isImg)}
                      alt="Complemento"
                      width={520}
                      height={520}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 520px"
                      className="object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <p className="font-medium text-zinc-100 line-clamp-2">
                      {getName(complement)}
                    </p>
                    <p className="text-sm font-bold text-money-6">
                      {priceLabel}
                    </p>
                    {subtotal && (
                      <p className="text-sm font-bold text-money-6">
                        SubTotal: <br /> {subtotal}
                      </p>
                    )}
                  </div>

                  {/* Bolinha de seleção */}
                  {!isExtras ? (
                    // Parte De Fora
                    <div
                      className={clsx(
                        s.ballOutside,
                        getSelect!(complement)
                          ? "border-emerald-500 bg-emerald-500/20"
                          : "border-zinc-700 bg-zinc-900"
                      )}
                    >
                      {/* Parte De Dentro */}
                      <span
                        className={clsx(
                          s.ballInside,
                          getSelect!(complement)
                            ? "bg-emerald-400"
                            : "bg-zinc-600 group-hover:bg-zinc-500"
                        )}
                      />
                    </div>
                  ) : (
                    <div className={s.buttonsQtyContainer}>
                      <button
                        type="button"
                        onClick={() => handleSelectOption(complement, qty! - 1)}
                        disabled={qty === 0}
                        className={clsx(s.buttonsQty, "border-r")}
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center text-sm font-semibold text-zinc-100">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleSelectOption(complement, qty! + 1)}
                        disabled={qty === getMax!(complement)}
                        className={clsx(s.buttonsQty, "border-l")}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </OptionContainerTag>
          );
        })}
      </div>
    </>
  );
}
