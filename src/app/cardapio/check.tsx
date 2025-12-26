"use client";

import { useAppSettings } from "@/context/AppSettingsContext";
import type { FoodsGrouped, FoodAddon, FoodFull, OrderArrayType, FoodVersion, OrderArrayChosenType, FoodExtraIgredien, OrderFoodStringType, OrderIngredientStringType, OrderArrayStringType } from "@/types/typeFood";


type Props = {
  data: OrderArrayStringType;
};

export default function Check({ data }: Props) {
  const { settings } = useAppSettings(); // se não usar, pode remover
  const [base, ingredients, addons] = data;

  const hasIngredients = ingredients.length > 0;
  const hasAddons = addons.length > 0;

  return (
    <div
      className="
        max-w-md w-full
        rounded-2xl
        border
        shadow-xl
        p-4 md:p-6
        bg-zinc-900/90
        border-zinc-700
        text-zinc-100
        space-y-4
      "
      style={{
        background: "var(--primary-soft)",
        borderColor: "var(--primary-strong)",
      }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Comanda
          </span>
          <span className="text-sm font-medium text-zinc-300">
            Resumo do Pedido
          </span>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide bg-black/20">
            Nova Lanchonete
          </span>
        </div>
      </div>

      <div className="h-px bg-zinc-700/60 mb-1" />

      {/* Item base */}
      <div className="rounded-xl px-3 py-2.5 bg-black/10 ring-1 ring-black/10">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <p className="text-sm font-semibold text-zinc-100">{base.name}</p>
          <span className="text-[10px] uppercase tracking-wide text-zinc-400">
            Item
          </span>
        </div>

        {base.version && (
          <p className="text-[11px] font-medium text-amber-200/90">
            Versão: {base.version}
          </p>
        )}

        <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-zinc-700/60">
          <span className="text-zinc-400 uppercase tracking-[0.15em] text-[10px]">
            Valor
          </span>
          <span className="text-dinheiro-6 text-sm font-semibold tabular-nums">
            {base.price}
          </span>
        </div>
      </div>

      {/* Ingredientes */}
      {hasIngredients && (
        <div className="rounded-xl px-3 py-2.5 bg-black/5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className="text-sm font-semibold text-zinc-200">Extras</p>
            <span className="text-[10px] uppercase tracking-wide text-zinc-400">
              Ingredientes Extras
            </span>
          </div>

          <div className="space-y-1">
            {ingredients.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <p className="text-zinc-200">
                  {it.qty_chosen}x {it.name}
                </p>
                <p className="text-zinc-300 tabular-nums">{it.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Addons */}
      {hasAddons && (
        <div className="rounded-xl px-3 py-2.5 bg-black/5">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <p className="text-sm font-semibold text-zinc-200">Complementos</p>
            <span className="text-[10px] uppercase tracking-wide text-zinc-400">
              Complementos
            </span>
          </div>

          <div className="space-y-1">
            {addons.map((a, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex flex-col">
                  <p className="text-zinc-200">{a.name}</p>
                  {a.version && (
                    <p className="text-[11px] font-medium text-amber-200/90">
                      {a.version}
                    </p>
                  )}
                </div>
                <p className="text-zinc-300 tabular-nums">{a.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rodapé */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400">
        <span>Obrigado pela preferência ❤️</span>
        <span className="uppercase tracking-[0.16em]">
          mesa • balcão • delivery
        </span>
      </div>
    </div>
  );
}
