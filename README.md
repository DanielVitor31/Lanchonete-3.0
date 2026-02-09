# 🍔 Lanchonete — Sistema Completo com Next.js, Tailwind, Prisma e Supabase

Este projeto é a versão moderna do sistema **Lanchonete**, refatorado com foco em:

- **Performance**
- **Escalabilidade**
- **UI profissional**
- **Integração real com banco de dados**
- **Tema dinâmico personalizável**
- **Supabase (database + storage)**
- **Next.js (App Router)**

Serve como base para um sistema completo de restaurante: cardápio, comandas, pedidos e painel administrativo.

---

## 📌 Sumário

- [✨ Visão Geral](#-visão-geral)
- [⚙️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🎨 Tema Dinâmico](#-tema-dinâmico)
- [🗄️ Banco de Dados (Prisma + Supabase)](#️-banco-de-dados-prisma--supabase)
- [🖼️ Supabase Storage](#️-supabase-storage)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [🔧 Como Rodar o Projeto](#-como-rodar-o-projeto)
- [🧪 Scripts](#-scripts)
- [🚀 Próximos Passos](#-próximos-passos)
- [📜 Licença](#-licença)

---

# ✨ Visão Geral

Este projeto utiliza **Next.js 16 + App Router** como base do frontend e backend, com integração completa ao banco de dados via **Prisma 7** e conexão otimizada usando `@prisma/adapter-pg`.

O sistema conta com:

- **Tema totalmente dinâmico** (definido pelo dono do site)
- **Consumo real de dados** usando Server Components
- **Integração com Supabase Storage** para imagens

* **Estilização completa com Tailwind CSS 4**

- **Arquitetura escalável e separação clara de responsabilidades**

---

# ⚙️ Tecnologias Utilizadas

### 🧩 Base

- **Next.js 16**
- **React 19**
- **TypeScript**

### 🎨 UI & Estilo

- **Tailwind CSS 4** (Estilização utilitária de alta performance)
- **Culori** (Manipulação avançada de cores e suporte a OKLCH)
- **Lucide React** (Ícones modernos)
- **CSS Modules**
- **Variáveis CSS globais** para tema dinâmico

### 🛢️ Banco / API

- **PostgreSQL (Supabase)**
- **Prisma 7** com Adapter Postgres (pg + @prisma/adapter-pg)

### 🖼️ Imagens

- **Supabase Storage**
  - URLs públicas
  - Preparado para upload via service role

### 📦 Organização interna

- `app/` → rotas + componentes server
- `components/` → componentes de UI
- `lib/` → prisma, supabase, utilidades
- `hooks/` → lógicas reutilizáveis
- `styles/` → CSS global/modular
- `prisma/` → schema e migrations

---

# 🎨 Tema Dinâmico

O sistema possui um **tema dinâmico completo**, utilizando a biblioteca **Culori** para manipulação de cores e suporte ao espaço de cor **OKLCH**.
A partir da cor principal, são geradas e calculadas variações aplicadas via variáveis CSS:

- `--primary`
- `--primary-light`
- `--primary-dark`
- `--primary-soft`
- `--primary-strong`
- `--primary-test`

### Fluxo do tema:

- **Variáveis CSS globais**
- **Tema muda dinamicamente em toda a aplicação**

---

# 🗄️ Banco de Dados (Prisma + Supabase)

### Conexão (Prisma 7)

O projeto usa a forma recomendada:

```ts
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
```

# 🖼️ Supabase Storage

- Armazena imagens do cardápio e logo
- Usa URLs públicas ou `getPublicUrl`
- Preparado para upload via service key no futuro

Exemplo:

```tsx
<Box component="img" src={food.image_url} alt={food.name} />
```

---

# 🏗️ Estrutura do Projeto

```
|   .env
|   next.config.ts
|   package.json
|   prisma.config.ts
|   tsconfig.json
|
+---prisma
|       schema.prisma
|
\---src
    |   theme.ts
    |
    +---app
    |   |   favicon.ico
    |   |   globals.css
    |   |   layout.tsx
    |   |   page.module.css
    |   |   page.tsx
    |   |   RootLayoutClient.tsx
    |   |
    |   +---cardapio
    |   |       page.tsx
    |   |
    |   +---comandas
    |   |       page.tsx
    |   |
    |
    +---components
    |       Footer.module.css
    |       Footer.tsx
    |       Header.module.css
    |       Header.tsx
    |       Header_exemplo.tsx
    |       Header_Original_exemplo.tsx
    |
    +---lib
    |       prisma.ts
    |       supabase.ts
    |
    +---hooks
    |
    +---styles
    |
    +---types
    |
    \---ultils
            colors.ts
```

---

# 🔧 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/lanchonete.git
cd lanchonete
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o `.env`

```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_KEY="..."
SETTINGS_ID="ID-da-tabela-de-settings"
```

### 4. Gere o cliente Prisma

```bash
npx prisma generate
```

### 5. Rode o projeto

```bash
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

# 🧪 Scripts

| Comando               | Função                                                                  |
| --------------------- | ----------------------------------------------------------------------- |
| `npm run dev`         | Inicia o servidor Next.js                                               |
| `npm run build`       | Build de produção                                                       |
| `npm run start`       | Inicia versão de produção                                               |
| `npx prisma generate` | Gera cliente Prisma                                                     |
| `npx prisma db pull`  | Atualiza modelos do banco                                               |
| `npm run sync`        | Sincroniza DB, roda scripts e gera cliente (Pull + Validate + Generate) |

---

# 🚀 Próximos Passos

- 🔐 Página de admin com autenticação
- 🎛️ Página de configuração de tema (salvar cor no banco)
- 🧾 CRUD completo de produtos do cardápio
- 🧾 Sistema de comandas
- 📦 Upload de imagens direto do painel
- 📱 Interface mobile otimizada
- 🧪 Testes com Playwright / Vitest
- 📊 Painel administrativo avançado

---

# 📜 Licença

Este projeto segue a licença **privada**.

---
