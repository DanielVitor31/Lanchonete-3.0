import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { prisma } from "@/lib/prisma";
import { getColorMap } from "@/lib/colorSettings";
import { Suspense } from "react";
import Loading from "./loading";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Lanchonete 3.0",
  description: "Sistema da lanchonete",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    try {
    let colorsDB = null
     const hasLocalStorage = (await cookies()).get("colorsDB")?.value === "1";

    if (hasLocalStorage) {
       colorsDB = await prisma.settings_colors.findMany({
        select: {
          name: true,
          value: true,
        }
      });

      if (!colorsDB) {
        // registro não existe, mas sintaxe da query é ok
        throw new Error("DB_EMPTY");
      }

      
    }

    return (
      <html lang="pt-BR">
        <body>
          <Suspense fallback={<Loading />}>
            <RootLayoutClient
            colorsDB={colorsDB}
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
