// src/app/RootLayoutClient.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import type { ColorMap } from "@/lib/colorSettings";

type Props = {
  children: ReactNode;
  initialPrimary: string;
  colorMap: ColorMap;
};

export default function RootLayoutClient({
  children,
  colorMap,
}: Props) {

  // 2) CSS vars vindas do banco: --icon_dark, --fundo_light etc
  useEffect(() => {
    const root = document.documentElement.style;

    Object.entries(colorMap).forEach(([name, value]) => {
      // vira algo como --icon_dark: oklch(...)
      root.setProperty(`--${name}`, value);
    });
  }, [colorMap]);


  return (
    <Box >
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header colorMap={colorMap} />
        <Box component="main" sx={{ flexGrow: 1, maxWidth: 1200, mx: "auto", p: 2 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
