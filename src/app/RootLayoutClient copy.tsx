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
  const [colors, setColors] = useState<any | null>(null);
  const [phase, setPhase] = useState(0);

  console.log("Teste banco 1", colorsDB)

  useEffect(() => {

    if (phase === 0) {
      const colorsLocalStorage = localStorage.getItem("colorsDB")
      const colorsLocalStorageTime = !!colorsLocalStorage ? JSON.parse(colorsLocalStorage).timestamp : null
      const calcTime = calcHours(colorsLocalStorageTime, 12)


      console.log("Teste banco 2", colorsDB)

      if (!colorsLocalStorage || calcTime) {
        document.cookie = `colorsDB=1; path=/; max-age=31536000`;
        console.log("Teste banco 2", colorsDB)
      } else {
        document.cookie = `colorsDB=; path=/; max-age=0`; // remove cookie
      }
      setPhase(phase + 1); // força segunda rodada
      return;
    }

    if (phase === 2) {

      if (!!colorsDB) {
        console.log("Teste banco confirmado", colorsDB)
        const colorsDBFormat = {
          timestamp: new Date(),
          data: colorsDB
        };
        localStorage.setItem("colorsDB", JSON.stringify(colorsDBFormat));
      }

        console.log("Teste banco negado", colorsDB)

      const colorsData = JSON.parse(localStorage.getItem("colorsDB")!).data

      setColors(colorsData)
      //applyCssVars(colorsData)

    }


  }, [phase]);




  if (phase < 2) {
    return <Loading />;
  }


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
