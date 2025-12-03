"use client";

import { supabaseStorageURL } from "@/ultils/ultils";
import { useState } from "react";
import type { FoodFull } from "@/types/type";

type Categoria = "lanche" | "bebidas" | "doces";

type Props = {
  foods: FoodFull[];
};


type Item = {
  nome: string;
  preco: number;
};

const categorias: Categoria[] = ["lanche", "bebidas", "doces"];

const items: Record<Categoria, Item> = {
  lanche: {
    nome: "Batata",
    preco: 5.99,
  },
  bebidas: {
    nome: "Coxinha",
    preco: 7.5,
  },
  doces: {
    nome: "Pastel",
    preco: 9.2,
  },
};

export default function Dashboard({ foods }: Props) {
  console.log(foods)
  const [active, setActive] = useState<Categoria>("lanche");

  const itemAtivo = items[active]; // TS FELIZ AQUI ✅

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* MENU */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/70 overflow-y-auto">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-xl font-bold">Categorias</h1>
        </div>

        <nav className="p-2 flex flex-col gap-1">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-left rounded transition
                ${
                  active === cat
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
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          Categoria: {active}
        </h2>

        <div className="border border-zinc-800 bg-zinc-900/60 p-4 rounded-xl w-64">
        <div
          className="
            w-[7vh] h-[7vh]
            bg-cover bg-center
          "
          style={{backgroundImage: `url("${supabaseStorageURL("logos", "logo")}")`,}}
        />
          <p className="text-lg font-medium">{itemAtivo.nome}</p>

          <p className="text-lg font-medium">
            R$ {itemAtivo.preco.toFixed(2)}
          </p>
        </div>
      </main>
    </div>
  );
}
