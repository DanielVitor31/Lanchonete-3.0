"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { applyCssVars, arrayObjToObjKey } from "@/ultils/ultils";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import type { ColorsDB, GeneralSettings } from "@/types/type"



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
    [colorsDB, settings]
  );

  return (
    <AppSettingsProvider value={appSettingsValue}>
      <div className="min-h-screen flex flex-col">
        <header className="shrink-0 flex items-center">
          <Header colorsDB={colorsDB_obj} />
        </header>

        <main className="flex-1 w-full overflow-y-auto">
          {children}
        </main>

        <footer className="shrink-0">
          <Footer />
        </footer>
      </div>
    </AppSettingsProvider>
  );
}
