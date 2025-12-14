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
      <div className="w-screen h-screen grid grid-rows-[0.6fr_6fr_0.7fr]">
        {/* Item 1 */}
        <div className="h-full flex items-center">
          <Header colorsDB={colorsDB_obj} />
        </div>

        {/* Item 2 */}
        <div className="bg-green-500 overflow-hidden">
          <div className="w-full">{children}</div>
        </div>

        {/* Item 3 */}
        <div className="bg-blue-500 overflow-hidden">
          <div className="w-full">Conteúdo gigante também</div>
        </div>
      </div>
    </AppSettingsProvider>
  );
}
