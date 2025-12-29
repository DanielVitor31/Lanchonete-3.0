"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import type { FoodsGrouped, FoodFull, OrderArrayType, OrderArrayChosenType, FoodTypes, FoodVersion, FoodAddon } from "@/types/typeFood";
import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { loadAddons, pagesNavFunc, pricesCalc, orderArrayStringFunc, orderStringFunc } from "./functions"
import AddonsElement from "./complements"
import ButtonsElement from "./buttons"
import Check from "./check";
import createOrderDB from "./createOrderDB";
import validateOrder from "../finalizar_pedido/validateOrder";



type Props = {
  open: (value: null) => void;
  foods: FoodsGrouped;
  food: FoodFull;
};


export default function SelectMenu({ open, foods, food }: Props) {
  // Variaveis apenas para facilitar a leitura
  const foodVersions = Object.values(food.versions);
  const foodAddons = loadAddons(food, foods);
  const FoodExtraIgrediens = food.extraIgrediens


  // Verifica se o alimento possui complementos, versões ou ingredientes extras
  const hasVersion = foodVersions.length > 0;
  const hasExtraIgrediens = FoodExtraIgrediens.length > 0;
  const hasAddons = foodAddons.length > 0;
  const foodSimple = !hasVersion && !hasAddons && !hasExtraIgrediens

  // Arrays do pedido
  const OrderArray: OrderArrayType = [foodVersions, FoodExtraIgrediens, foodAddons];
  const OrderArrayChosenDefault: OrderArrayChosenType = [foodVersions[0], FoodExtraIgrediens, []];

  // Configuração das páginas de navegação
  const pagesNav = pagesNavFunc(hasVersion, hasExtraIgrediens, hasAddons, foodAddons);
  const [pageCurrentIndex, setPageCurrentIndex] = useState(0);
  const pageCurrentName = pagesNav[pageCurrentIndex];
  const pageAddons = Number(pageCurrentName.split("-")[1]); // 
  const pagMax = pagesNav.length;

  // Estado dos complementos escolhidos
  const [complementSelect, setComplementSelect] = useState(OrderArrayChosenDefault);

  const priceTotal = useMemo(() => {
    return pricesCalc(complementSelect, food);
  }, [complementSelect])

  const orderArrayString = orderArrayStringFunc(complementSelect, food);
  const orderString = orderStringFunc(orderArrayString, priceTotal);

  const handleSelectOption = (option: FoodTypes | number, optionIndice: number) => {
    setComplementSelect(prev => {
      const next: OrderArrayChosenType = [...prev];

      if (pageCurrentName === "versions") {
        next[0] = option as FoodVersion;
        return next;
      }

      if (pageCurrentName === "extraIgrediens") {
        const extras = [...next[1]];
        extras[optionIndice] = {
          ...extras[optionIndice],
          qty_chosen: option as number,
        };
        next[1] = extras;
        return next;
      }

      // page >= 2 => addons
      const addons = [...next[2]];
      addons[pageAddons] = option as FoodAddon;
      next[2] = addons;
      return next;
    });
  };

  const handleOrderFinish = async () => {
    await createOrderDB({ food, total_price: priceTotal, orderString: orderString, orderReady: complementSelect });
    console.log("Finalizar pedido - Enviando para o DB...");
  }




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
              {(!foodSimple) && (
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
          <div className="w-60 h-60 flex items-center justify-center mx-auto">
            <div
              className="w-full h-full bg-center bg-contain bg-no-repeat"
              style={{ backgroundImage: `url("${supabaseStorageURL(food.img)}")` }}
            />
          </div>


          {/* Descrição */}
          <p className="w-full text-xs md:text-sm text-zinc-300 leading-snug line-clamp-3 bg-zinc-900/40 rounded-xl px-3 py-2 border border-zinc-800/60">
            {food.description}
          </p>

          {/* Opções (versões / addons) */}
          <section className="min-h-0 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
            {pageCurrentName !== "orderEnd"
              ? (
                <AddonsElement handleSelectOption={handleSelectOption} OrderArray={OrderArray} pageCurrentName={pageCurrentName} pageCurrentIndex={pageCurrentIndex} pagMax={pagMax} complementSelect={complementSelect} pageAddons={pageAddons} />
              )
              : (
                <>
                  {foodSimple ? (
                    <p className="text-xs md:text-sm text-zinc-400 text-center">
                      Esse item não possui versões ou complementos.
                    </p>
                  ) : (
                    <Check data={orderArrayString} />
                  )}
                </>
              )
            }

          </section>

          {/* Footer */}
          <footer className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] text-zinc-400 uppercase tracking-wide">
                Valor Total
              </span>
              <span className="text-base md:text-lg font-bold text-dinheiro-6">
                {moneyFormatBRL(priceTotal)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ButtonsElement handleOrderFinish={handleOrderFinish} setPageCurrentIndex={setPageCurrentIndex} pageCurrentName={pageCurrentName} pageCurrentIndex={pageCurrentIndex} complementSelect={complementSelect} pageAddons={pageAddons} />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
