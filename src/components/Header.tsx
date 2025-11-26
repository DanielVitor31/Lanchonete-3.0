"use client";

import styles from "./Header.module.css";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

type HeaderProps = {
  primary: string;
  onChangePrimary: (color: string) => void;
};

export function Header({ primary, onChangePrimary }: HeaderProps) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className={styles.header}
    >
      <Toolbar className={styles.inner}>
        <Typography
          variant="h6"
          className={styles.logo}
          sx={{ flexGrow: 1 }}
        >
          Lanchonete 3.0
        </Typography>

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

          {/* seletor de cor simples */}
          {/* <Box
            component="label"
            sx={{
              ml: 2,
              width: 24,
              height: 24,
              borderRadius: "999px",
              border: "2px solid rgba(255,255,255,0.4)",
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: primary,
              }}
            />
            <input
              type="color"
              value={primary}
              onChange={(e) => onChangePrimary(e.target.value)}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </Box> */}
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}
