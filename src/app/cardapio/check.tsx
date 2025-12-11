"use client";

import { supabaseStorageURL, moneyFormatBRL } from "@/ultils/ultils";
import { useAppSettings } from "@/context/AppSettingsContext";

type OrderSummaryCardProps = {
  text: string;
};

export default function Check({ text }: OrderSummaryCardProps) {
  const blocks = text.trim().split(/\n\s*\n/);
  const { colorsDB_obj: colorDB, settings } = useAppSettings();


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
      {/* Cabeçalho da comanda */}
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

      {/* Blocos (principal + complementos) */}
      <div className="space-y-3">
        {blocks.map((block, index) => {
          const lines = block.split("\n").map((l) => l.trim());
          if (!lines[0]) return null;

          const isMain = index === 0;

          return (
            <div
              key={index}
              className={`
                rounded-xl px-3 py-2.5
                ${isMain ? "bg-black/10 ring-1 ring-black/10" : "bg-black/5"}
              `}
            >
              {/* Título do item */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p
                  className={`
                    text-sm font-semibold
                    ${isMain ? "text-zinc-100" : "text-zinc-200"}
                  `}
                >
                  {lines[0]}
                </p>
                {!isMain && (
                  <span className="text-[10px] uppercase tracking-wide text-zinc-400">
                    Complemento {index}
                  </span>
                )}
              </div>

              {/* Linhas de detalhes */}
              <div className="space-y-0.5">
                {lines.slice(1).map((line, i) => {
                  const lower = line.toLowerCase();

                  const isValor = lower.startsWith("valor");
                  const isVersao = lower.startsWith("versão");

                  if (isValor) {
                    const valor = line.replace(/valor\s*:\s*/i, "").trim();
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-zinc-700/60"
                      >
                        <span className="text-zinc-400 uppercase tracking-[0.15em] text-[10px]">
                          Valor
                        </span>
                        <span className="text-dinheiro-6 text-sm font-semibold tabular-nums">
                          {moneyFormatBRL(Number(valor))}
                        </span>
                      </div>
                    );
                  }

                  if (isVersao) {
                    return (
                      <p
                        key={i}
                        className="text-[11px] font-medium text-amber-200/90"
                      >
                        {line}
                      </p>
                    );
                  }

                  return (
                    <p key={i} className="text-xs text-zinc-200">
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

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
