"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { applyColorsCssVars } from "@/ultils/colors";
import { AppSettingsProvider } from "@/context/AppSettingsContext";
import type { GeneralSettings } from "@/types/types"
import type { ColorsDBTypes } from "./actions/getSettings";
import type { ColorsTypes } from "@/ultils/colors"
import Loading from "./loading";

type Props = {
  children: ReactNode;
  colorsDB: ColorsDBTypes[];
  settings: GeneralSettings[];
};

export default function RootLayoutClient({ children, colorsDB, settings }: Props) {
  const [colors, setColors] = useState<ColorsTypes>()

  useEffect(() => {
    const colorsObj = applyColorsCssVars(colorsDB);
    setColors(colorsObj);
  }, [colorsDB]);

  if (!colors) return <Loading />

  return (
    <AppSettingsProvider colors={colors} settings={settings}>
      <div className="w-full h-dvh overflow-hidden grid grid-rows-[0.6fr_minmax(0,6fr)_0.7fr]">
        {/* Header */}
        <div className="flex items-center">
          <Header colorsDB={colors} />
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
