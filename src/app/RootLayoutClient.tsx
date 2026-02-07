"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { applyCssVars, arrayObjToObjKey } from "@/ultils/ultils";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import type { ColorsDB, GeneralSettings } from "@/types/types"



type Props = {
  children: ReactNode;
  colorsDB: ColorsDB[];
  settings: GeneralSettings[];
};

export default function RootLayoutClient({ children, colorsDB, settings }: Props) {
  useEffect(() => {
    applyCssVars(colorsDB);
  }, [colorsDB]);

  const colorsDB_obj = arrayObjToObjKey({ key: "name", obj: colorsDB })

  const appSettingsValue = useMemo(() => ({
    colorsDB_obj,
    settings,
  }),
    [colorsDB_obj, settings]
  );

  return (
    <AppSettingsProvider value={appSettingsValue}>
      <div className="w-full h-[100dvh] overflow-hidden grid grid-rows-[0.6fr_minmax(0,6fr)_0.7fr]">
        {/* Header */}
        <div className="flex items-center">
          <Header colorsDB={colorsDB_obj} />
        </div>

        {/* Conteúdo */}
        <main className="min-h-0 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <div>
          <Footer />
        </div>
      </div>
    </AppSettingsProvider>
  );
}
