// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { prisma } from "@/lib/prisma";
import { DEFAULT_PRIMARY } from "../theme";

export const metadata: Metadata = {
  title: "Lanchonete 3.0",
  description: "Sistema da lanchonete",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const settings = await prisma.settings.findUnique({
    where: {
      id_setting: "c901f0a2-1234-4567-89ab-ff0011223344",
    },
  });

  const primaryFromDb = settings?.value_string ?? DEFAULT_PRIMARY;
  //const primaryFromDb = DEFAULT_PRIMARY; // Para testes

  return (
    <html lang="pt-BR">
      <body>
        <RootLayoutClient initialPrimary={primaryFromDb}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
