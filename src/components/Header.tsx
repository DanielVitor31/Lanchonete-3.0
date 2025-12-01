"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css"
import {ROUTES_STRING} from "@/constants"
import { supabaseStorageURL } from "@/ultils/ultils"

export default function Header() {
  const [open, setOpen] = useState(false);


  return (
    <header className={`p-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-lg ${styles.header}`}>
        {/* LOGO */}
        <div
          className="w-20 h-18 bg-cover bg-center"
          style={{ backgroundImage: `url("${supabaseStorageURL("logos", "logo")}")` }}
        />
        {/* NAV DESKTOP */}
        <nav className="hidden md:flex gap-6">
          {ROUTES_STRING.map((l) => (
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

      {/* MENU MOBILE */}
      {open && (
        <nav className="md:hidden bg-zinc-900 border-t border-zinc-700 flex flex-col px-4 pb-4 animate-slideDown">
          {ROUTES_STRING.map((l) => (
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
