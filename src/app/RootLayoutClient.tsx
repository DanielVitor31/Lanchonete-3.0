// src/app/RootLayoutClient.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createAppTheme, generateColorVariants } from "../theme";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = {
  children: ReactNode;
  initialPrimary: string;
};

export default function RootLayoutClient({ children, initialPrimary }: Props) {
  const [primary, setPrimary] = useState(initialPrimary);

  // se por algum motivo o initialPrimary mudar (SSR), sincroniza
  useEffect(() => {
    setPrimary(initialPrimary);
  }, [initialPrimary]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const v = generateColorVariants(primary);

    document.documentElement.style.setProperty("--primary", primary);
    document.documentElement.style.setProperty("--primary-light", v.light);
    document.documentElement.style.setProperty("--primary-dark", v.dark);
    document.documentElement.style.setProperty("--primary-strong", v.strong);
    document.documentElement.style.setProperty("--primary-soft", v.soft);
    document.documentElement.style.setProperty("--primary-test", v.test);
    document.documentElement.style.setProperty("--primary-test2", v.test2);

    window.localStorage.setItem("primaryColor", primary);
  }, [primary]);

  const theme = useMemo(() => createAppTheme(primary), [primary]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header primary={primary} onChangePrimary={setPrimary} />
        <Box component="main" sx={{ flexGrow: 1, maxWidth: 1200, mx: "auto", p: 2 }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
