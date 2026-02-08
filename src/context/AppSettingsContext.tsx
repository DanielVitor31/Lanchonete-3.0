"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import type { GeneralSettings } from "@/types/types"
import type { ColorsTypes } from "@/ultils/colors"



type AppSettings = {
  colors: ColorsTypes;
  settings: GeneralSettings[];
};

const AppSettingsContext = createContext<AppSettings | null>(null);

type AppSettingsProviderProps = {
  colors: ColorsTypes;
  settings: GeneralSettings[];
  children: ReactNode;
};

export function AppSettingsProvider({ colors, settings, children }: AppSettingsProviderProps) {
  const value = useMemo(() => ({ colors, settings }), [colors, settings]);

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) {
    throw new Error("useAppSettings deve ser usado dentro de <AppSettingsProvider>");
  }
  return ctx;
}
