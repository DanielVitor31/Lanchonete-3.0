"use client";

import { ReactNode, useEffect, useMemo, useState, useRef } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { calcHours, applyCssVars } from "@/ultils/ultils"
import Loading from "./loading";

type Props = {
  children: ReactNode;
  colorsDB: { name: string; value: string }[] | null;
};

export default function RootLayoutClient({ children, colorsDB, }: Props) {



  return (
    <Box >
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, maxWidth: 1200, mx: "auto", p: 2 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );

}
