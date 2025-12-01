"use client";

import styles from "./Header.module.css";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { culoriCalc, normalizeToOklch } from "@/ultils/colors";
import { colect_colors } from "@/ultils/ultils"
import { useState, useEffect } from "react";


type Props = {
  colorMap?: { [key: string]: string };
};




export function Header({ colorMap }: Props) {
  const [colors, setcolors] = useState<Record<string, string>>({});

  useEffect(() => {
    const vars = colect_colors([
      "--color-mint-500",
      "--color-primary",
      "--background",
    ]);
    setcolors(vars);
  }, []);


  return (
    <AppBar
      position="static"
      sx={{ background: culoriCalc({ keyColorData: colorMap?.["base_tematica"] ?? "rgb(255, 202, 127)", calc: [-0.19, 0.08, -31.18]}) }}
      elevation={0}
      className={styles.header}
    >
      <Toolbar className={styles.inner}>
        <p
          className="bg-mint-500">
          Lanchonete 3.0
        </p>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/cardapio">
            Cardápio
          </Button>
          <Button color="inherit" component={Link} href="/comandas">
            Comandas
          </Button>

          
        </Box>
      </Toolbar>
    </AppBar>
  );
}
