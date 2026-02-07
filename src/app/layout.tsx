import type { Metadata, Viewport } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";
import { Suspense } from "react";
import Loading from "./loading";
import { getSettingsCached, getSettingsColorsCached } from "@/app/actions/cachedSettings"

export const metadata: Metadata = {
  title: "Lanchonete 3.0",
  description: "Sistema da lanchonete",
};

export const viewport: Viewport = {
  themeColor: "#ff4da6",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const colorsDB = await getSettingsColorsCached();

    const settings  = await getSettingsCached();

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
  
}
