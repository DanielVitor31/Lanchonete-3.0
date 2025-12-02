"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  ShoppingBag,
  Settings,
} from "lucide-react";

type SectionId = "resumo" | "comandas" | "produtos" | "configuracoes";

export default function DashboardPage() {
  const [activeSection, setActiveSection] =
    useState<SectionId>("resumo");

  return (
    <div className="flex bg-zinc-950 text-zinc-50 h-screen overflow-hidden">
      {/* ASIDE LEFT – SCROLL INDEPENDENTE */}
      <aside
        className="w-64 border-r border-zinc-800 bg-zinc-900/70 backdrop-blur
                   flex flex-col overflow-y-auto"
      >
        <div className="px-4 py-4 border-b border-zinc-800">
          <h1 className="text-lg font-bold">Nova Lanchonete</h1>
          <p className="text-xs text-zinc-400 mt-1">Painel de controle</p>
        </div>

        <nav className="flex-1 py-4 space-y-1">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Resumo"
            active={activeSection === "resumo"}
            onClick={() => setActiveSection("resumo")}
          />
          <NavItem
            icon={<ClipboardList size={18} />}
            label="Comandas"
            active={activeSection === "comandas"}
            onClick={() => setActiveSection("comandas")}
          />
          <NavItem
            icon={<ShoppingBag size={18} />}
            label="Produtos"
            active={activeSection === "produtos"}
            onClick={() => setActiveSection("produtos")}
          />
          <NavItem
            icon={<Settings size={18} />}
            label="Configurações"
            active={activeSection === "configuracoes"}
            onClick={() => setActiveSection("configuracoes")}
          />

          {/* Itens extras só pra mostrar que o scroll funciona */}
          {Array.from({ length: 30 }).map((_, i) => (
            <NavItem
              key={i}
              icon={<Settings size={16} />}
              label={`Extra ${i + 1}`}
              onClick={() => {}}
            />
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-zinc-800 text-xs text-zinc-500">
          © {new Date().getFullYear()} Nova Lanchonete
        </div>
      </aside>

      {/* DIREITA – SCROLL INDEPENDENTE */}
      <main className="flex-1 overflow-y-auto p-6">
        {activeSection === "resumo" && <ResumoSection />}
        {activeSection === "comandas" && <ComandasSection />}
        {activeSection === "produtos" && <ProdutosSection />}
        {activeSection === "configuracoes" && <ConfiguracoesSection />}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition
        ${
          active
            ? "bg-zinc-800 text-zinc-50 border-l-2 border-l-emerald-400"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* --- Seções (mesmas de antes) --- */

function ResumoSection() {
  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-semibold">Resumo geral</h2>
      <p className="text-sm text-zinc-400">
        Visão rápida do movimento da lanchonete hoje.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Comandas abertas" value="12" subtitle="4 aguardando pagamento" />
        <Card title="Pedidos em preparo" value="7" subtitle="Média 08 min de espera" />
        <Card title="Faturamento do dia" value="R$ 1.240,00" subtitle="Atualizado" />
        <Card title="Produtos em falta" value="3" subtitle="Repor estoque" />
      </div>
    </div>
  );
}

function ComandasSection() {
  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-xl font-semibold">Comandas</h2>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        Conteúdo de comandas
      </div>
    </div>
  );
}

function ProdutosSection() {
  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-xl font-semibold">Produtos</h2>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        Conteúdo de produtos
      </div>
    </div>
  );
}

function ConfiguracoesSection() {
  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-xl font-semibold">Configurações</h2>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
        Configurações gerais
      </div>
    </div>
  );
}

function Card({ title, value, subtitle }: any) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <p className="text-xs text-zinc-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
    </div>
  );
}
