"use client";

import styles from "./Header.module.css";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export function Header() {
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

        <Box sx={{ display: "flex", gap: 1 }}>
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
