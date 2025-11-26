"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { theme } from "../theme";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
9
type Props = {
  children: ReactNode;
};

export default function RootLayoutClient({ children }: Props) {
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
        {/* Header separado */}
        <Header />

        {/* Conteúdo dinâmico */}
        <Box component="main" sx={{ flexGrow: 1, maxWidth: 1200, mx: "auto", p: 2 }}>
          {children}
        </Box>

        {/* Footer separado */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
