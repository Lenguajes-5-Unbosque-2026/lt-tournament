# web

Código de la app (Next.js 16 · App Router · TypeScript · Tailwind 4 · shadcn/ui). Gestor de paquetes: npm.

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en http://localhost:3000 |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |

- Tokens del tema: `src/app/globals.css` (de `design/tokens.md`). Es el único archivo con valores literales.
- Rutas de jugador en `src/app/(jugador)/`; de organizador en `src/app/org/` (acento azul con `data-mode="org"`).
