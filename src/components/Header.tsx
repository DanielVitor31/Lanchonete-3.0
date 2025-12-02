"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";
import { ROUTES_STRING } from "@/constants";
import { supabaseStorageURL } from "@/ultils/ultils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ColorsDB } from "@/types/type";

type Props = {
  colorsDB: ColorsDB;
};

export default function Header({ colorsDB }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={`p-4 md:p-6 border-b bg-tematica-2/90 border-zinc-800 backdrop-blur-lg ${styles.header} select-none`}
    >
      {/* LOGO */}
      <Link
        href="/"
        className="flex items-center gap-2 group"
        aria-label="Ir para o início"
      >
        <div
          className={styles.logo}
          style={{
            backgroundImage: `url("${supabaseStorageURL("logos", "logo")}")`,
          }}
        />
      </Link>

      {/* NAV DESKTOP */}
      <nav className="hidden md:flex gap-4 lg:gap-6">
        {ROUTES_STRING.map((l) => {
          const isActive = pathname === l.href;

          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive ? "page" : undefined}
              className={`
                relative px-2 py-1 md:px-3 md:py-2
                text-sm md:text-base lg:text-lg
                font-medium tracking-wide
                select-none
                group transition
                ${
                  isActive
                    ? "text-white cursor-default pointer-events-none"
                    : "text-zinc-300 hover:text-white"
                }
              `}
            >
              {l.label}

              {/* linha animada moderna */}
              <span
                className={`
                  pointer-events-none
                  absolute left-1/2 -bottom-1
                  h-[3px] rounded-full
                  -translate-x-1/2
                  bg-gradient-to-r from-white/0 via-white to-white/0
                  transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "w-16 opacity-100"         // linha maior e sempre ativa
                      : "w-0 opacity-0 group-hover:w-20 group-hover:opacity-100"
                  }
                `}
              />

            </Link>
          );
        })}
      </nav>

      {/* BOTÃO MOBILE */}
      <button
        className="md:hidden text-white select-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Abrir menu"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MENU MOBILE */}
      {open && (
        <nav className="md:hidden mt-4 bg-zinc-950/90 border border-zinc-800 rounded-xl shadow-lg flex flex-col px-4 py-2 space-y-1">
          {ROUTES_STRING.map((l) => {
            const isActive = pathname === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  w-full rounded-lg px-3 py-2
                  text-base font-medium
                  select-none
                  transition relative
                  ${
                    isActive
                      ? "text-white bg-white/10 backdrop-blur-sm cursor-default pointer-events-none"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
