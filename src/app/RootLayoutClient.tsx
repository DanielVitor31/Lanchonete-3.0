"use client";

import { ReactNode, useEffect, useMemo, useState, useRef } from "react";
import { CssBaseline, Box } from "@mui/material";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { applyCssVars } from "@/ultils/ultils";
import { culoriCalc } from "@/ultils/colors";

type Props = {
  children: ReactNode;
  colorsDB: { name: string; value: string }[];
};

export default function RootLayoutClient({ children, colorsDB, }: Props) {

  applyCssVars(colorsDB)

  const colorsDB_obj = Object.fromEntries(
  colorsDB.map(item => [item.name, item.value])
);


  return (
    <Box >
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, maxWidth: 1200, mx: "auto", p: 2 }}>
          {children}
        </Box>
        <div style={{ backgroundColor: "var(--color-base-tematica-1)" }}>
          {culoriCalc(colorsDB_obj["--base-tematica"], [-0.19, 0.09, -31.58, 0.0])}
        </div>
        <Footer />
      </Box>
    </Box>
  );

}
