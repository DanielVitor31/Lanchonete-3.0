// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { prisma } from "@/lib/prisma";
import { getColorMap } from "@/lib/colorSettings";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Lanchonete 3.0",
  description: "Sistema da lanchonete",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    try {
    const settings = await prisma.settings.findUnique({
      where: {
        id_setting: "d89c3973-8cb7-4282-ab38-385aeb52712f", // aqui tu zoou de propósito
      },
    });

    // chegou aqui = query não quebrou
    if (!settings) {
      // registro não existe, mas sintaxe da query é ok
      throw new Error("DB_EMPTY");
    }

    const primaryFromDb = settings.value_string ?? "rgb(255, 202, 127)";
    const colorMap = await getColorMap();

    return (
      <html lang="pt-BR">
        <body>
          <Suspense fallback={<Loading />}>
            <RootLayoutClient
              initialPrimary={primaryFromDb}
              colorMap={colorMap}
            >
              {children}
            </RootLayoutClient>
          </Suspense>
        </body>
      </html>
    );
  } catch (err: any) {
    console.error("Erro ao acessar DB:", err);

    // qualquer erro de driver / prisma você trata como erro de banco
    throw new Error("DB_ERROR");
  }
  
}
