import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Lanchonete 3.0",
  description: "Sistema da lanchonete",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  try {
    const colorsDB = await prisma.settings_colors.findMany({
      select: {
        name: true,
        value: true,
      }
    });

    if (!colorsDB.length) {
      throw new Error("DB_EMPTY");
    }

    const settings  = await prisma.settings.findMany();



    return (
      <html lang="pt-BR">
        <body>
          <Suspense fallback={<Loading />}>
            <RootLayoutClient
              colorsDB={colorsDB}
              settings={settings}
            >
              {children}
            </RootLayoutClient>
          </Suspense>
        </body>
      </html>
    );
  } catch (err: any) {
    console.error("Erro ao acessar DB:", err);

    throw new Error("DB_ERROR");
  }

}
