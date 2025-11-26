"use client";

import { Typography } from "@mui/material";

export default function CardapioPage() {
  return (
    <>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Cardápio
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Aqui depois você lista os lanches, combos, bebidas, etc.
      </Typography>
    </>
  );
}
