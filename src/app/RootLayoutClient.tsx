"use client";

import { ReactNode, useEffect, useMemo, useState, useRef } from "react";
import { Box } from "@mui/material";
import Header from "@/components/Header";
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
    <div className="w-screen h-screen grid grid-rows-[0.6fr_6fr_0.7fr]">
      {/* Item 1 */}
      <div className="h-full flex items-center">
        <Header colorsDB={colorsDB_obj}/>
      </div>

      {/* Item 2 */}
      <div className="bg-green-500 overflow-hidden">
        <div className="h-[500px] w-full">{children}</div>
      </div>

      {/* Item 3 */}
      <div className="bg-blue-500 overflow-hidden">
        <div className="h-[500px] w-full">Conteúdo gigante também</div>
      </div>
    </div>
  );


}
