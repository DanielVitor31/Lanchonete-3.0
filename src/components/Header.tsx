"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css"

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Início", href: "/" },
    { label: "Cardápio", href: "/cardapio" },
    { label: "Comandas", href: "/comandas" },
    { label: "Pedidos", href: "/pedidos" },
  ];

  return (
    <header className={`border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-lg ${styles.header}`}>
      <div className="max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* LOGO */}
        <h1 className="text-lg font-bold text-white tracking-wide hover:text-primary transition">
          Nova Lanchonete
        </h1>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-zinc-300 hover:text-white transition relative group"
            >
              {l.label}

              {/* underline animado */}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <nav className="md:hidden bg-zinc-900 border-t border-zinc-700 flex flex-col px-4 pb-4 animate-slideDown">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-zinc-300 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
      
    </header>
  );
}
