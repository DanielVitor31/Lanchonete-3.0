// src/theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f97316", // laranja de base (depois deixamos dinâmico)
    },
    background: {
      default: "#020617",
      paper: "#020617",
    },
  },
  shape: {
    borderRadius: 12,
  },
});
