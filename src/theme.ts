import { createTheme, lighten, darken } from "@mui/material/styles";

export const DEFAULT_PRIMARY = "#4ade80"; // verde de exemplo

export interface CustomColors {
  strong: string;
  soft: string;
  test: string;
}

declare module "@mui/material/styles" {
  interface Theme {
    customColors: CustomColors;
  }
  interface ThemeOptions {
    customColors?: CustomColors;
  }
}

// Função para gerar todas as variações
export function generateColorVariants(base: string) {
  return {
    main: base,
    light: lighten(base, 0.2),
    dark: darken(base, 0.25),

    // variação personalizada (você pode brincar com isso)
    strong: darken(base, 0.45),
    soft: lighten(base, 0.4),

    // sua "cor especial"
    test: lighten(base, 0.15),
  };
}

export function createAppTheme(primaryColor: string) {
  const v = generateColorVariants(primaryColor);

  return createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: v.main,
        light: v.light,
        dark: v.dark,
      },
      // cor alternativa gerada automaticamente
      secondary: {
        main: v.test,
      },
    },

    shape: {
      borderRadius: 12,
    },

    // Dá pra colocar também no próprio theme
    customColors: {
      strong: v.strong,
      soft: v.soft,
      test: v.test,
    },
  });
}
