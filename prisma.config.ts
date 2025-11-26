// prisma.config.ts (na raiz do projeto)

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // onde está teu schema
  schema: "prisma/schema.prisma",

  // onde vão ficar as migrations (pode mudar se quiser)
  migrations: {
    path: "prisma/migrations",
  },

  // URL do banco (vem do .env)
  datasource: {
    url: env("DATABASE_URL"),
  },
});
