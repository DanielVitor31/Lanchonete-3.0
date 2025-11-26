// src/app/RootLayoutClient.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createAppTheme, DEFAULT_PRIMARY, generateColorVariants } from "../theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
  children: ReactNode;
};

export default function RootLayoutClient({ children }: Props) {
  const [primary, setPrimary] = useState(DEFAULT_PRIMARY);

  // carrega do localStorage na primeira vez
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("primaryColor");
    if (saved) setPrimary(saved);
  }, []);

  // atualiza CSS var + salva no localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.style.setProperty("--primary", primary);

    const v = generateColorVariants(primary);
    document.documentElement.style.setProperty("--primary-light", v.light);
    document.documentElement.style.setProperty("--primary-dark", v.dark);
    document.documentElement.style.setProperty("--primary-strong", v.strong);
    document.documentElement.style.setProperty("--primary-soft", v.soft);
    document.documentElement.style.setProperty("--primary-test", v.test);
    
    window.localStorage.setItem("primaryColor", primary);
  }, [primary]);

  const theme = useMemo(() => createAppTheme(primary), [primary]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* passa a cor e o setter pro Header */}
        <Header primary={primary} onChangePrimary={setPrimary} />

        <Box component="main" sx={{ flexGrow: 1, maxWidth: 1200, mx: "auto", p: 2 }}>
          {children}
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
