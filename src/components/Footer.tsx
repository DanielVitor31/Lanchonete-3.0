"use client";

import styles from "./Footer.module.css";
import { Box, Container, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box component="footer" className={styles.footer}>
      <Container className={styles.inner}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Lanchonete 3.0
        </Typography>
      </Container>
    </Box>
  );
}
