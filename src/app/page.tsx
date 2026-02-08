"use client";

import { Typography, Paper, Stack, Button, Box } from "@mui/material";
import Link from "next/link";


// Home page da aplicação

export default function HomePage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={700}>
        Bem-vindo à Lanchonete 3.0 🍔
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Aqui depois você vai montar o painel principal, resumo de comandas, pedidos em aberto,
        etc. Por enquanto é só a página de teste.
      </Typography>

      <Paper
        variant="outlined"
        sx={{ p: 2, display: "flex", gap: 2, flexWrap: "wrap" }}
      >
        <Button variant="contained" component={Link} href="/cardapio">
          Ir para o Cardápio
        </Button>
        <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
          <Box sx={{ width: 80, height: 80, bgcolor: "var(--primary-test)", }} />
          <Box sx={{ width: 80, height: 80, bgcolor: "var(--primary-test2)" }}/>
        </Box>

        <Button variant="outlined" component={Link} href="/comandas">
          Ir para Comandas
        </Button>
      </Paper>
    </Stack>
  );
}
