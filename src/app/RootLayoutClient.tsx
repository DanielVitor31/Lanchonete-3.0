"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { calcHours, applyCssVars } from "@/ultils/ultils"


type Props = {
  children: ReactNode;
  colorsDB: { name: string; value: string }[] | null;
};

export default function RootLayoutClient({ children, colorsDB, }: Props) {
  const [colors, setColors] = useState<any | null>(null);

  useEffect(() => {
    const colorsLocalStorage = localStorage.getItem("colorsDB")
    const colorsLocalStorageTime = !!colorsLocalStorage ? JSON.parse(colorsLocalStorage).timestamp : null
    const calcTime = calcHours(colorsLocalStorageTime, 12)

    console.log(colorsLocalStorage)
    console.log("teste de localstorage", !colorsLocalStorage, Boolean(calcTime))

    if (!colorsLocalStorage || calcTime) {
      document.cookie = `colorsDB=1; path=/; max-age=31536000`;
      console.log("batata")
      console.log("Teste banco 1", colorsDB)
      const colorsDBFormat = {
        timestamp: new Date(),
        data: colorsDB
      };

      localStorage.setItem("colorsDB", JSON.stringify(colorsDBFormat));
      const colorsData = JSON.parse(localStorage.getItem("colorsDB")!).data

      setColors(colorsData)
      //applyCssVars(colorsData)
    } else {
      document.cookie = `colorsDB=; path=/; max-age=0`; // remove cookie
    }

  }, []);


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
