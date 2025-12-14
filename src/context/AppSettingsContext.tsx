"use client";

import { createContext, useContext, ReactNode } from "react";
import type { ColorsDB, GeneralSettings } from "@/types/typeFood"


type AppSettings = {
  colorsDB_obj: Record<string, ColorsDB>;
  settings: GeneralSettings[];
};

const AppSettingsContext = createContext<AppSettings | null>(null);

type AppSettingsProviderProps = {
  value: AppSettings;
  children: ReactNode;
};

export function AppSettingsProvider({ value, children }: AppSettingsProviderProps) {
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
