# LT Tournament

## 1. Qué es el producto

Hoy no existe un lugar centralizado, confiable y fácil para organizar y jugar torneos amateur de videojuegos: todo está repartido entre Discord, TikTok y hojas de cálculo.
**Usuario:** organizadores amateur (streamers pequeños y medianos, jugadores comunes) y jugadores de LatAm que quieren competir.
**Organizador:** crea, gestiona y mantiene su torneo de principio a fin (inscritos, bracket, resultados).
**Jugador:** encuentra torneos, se inscribe fácil y ve su progreso (rankings por juego, puestos, historial, ranking frente a amigos).
**MVP:** inscripción gratuita; sin monetización, promociones, integración con Discord ni resolución formal de disputas.

## 2. Stack

- **Next.js + TypeScript:** pantallas, rutas y lógica de servidor.
- **Tailwind + shadcn/ui:** estilos y componentes; aquí viven los tokens y el kit.
- **Supabase:** base de datos, login, fotos y permisos.
- **Vercel:** despliegue.

## 3. Mapa del repo

- `docs/`: Brief, entrevistas (simuladas, no son datos reales) y conclusiones de entrevistas.
- `design/`: diseño.
  - `ui kit`: tokens, componentes y patrones; si contradice al código, manda el kit.
  - `flujos/`: pantallas exportadas de Figma, una carpeta por flujo (sección 4).
  - `Auditoria/`: 8 imágenes (`image 1.png` a `image 8.png`).
- `specs/`: una carpeta por caso de uso con spec.md, plan.md y tareas.md (hoy solo README).
- `data/`: modelo de datos, `modelo-datos.md` (hoy solo README).
- `web/`: código de la app Next.js (hoy solo README).
- `.github/`: CODEOWNERS.

## 4. Flujos

Carpetas de `design/flujos/` con sus pantallas. J = jugador, O = organizador.

- **Acceso y registro**: J01 · Bienvenida, J02 · Onboarding · Tus juegos, J03 · Crear cuenta, J04 · Ingresar, J05 · Recuperar acceso
- **Descubrir e inscribirse**: J06 · Inicio, J07 · Explorar, J08 · Filtros, J09 · Detalle del torneo, J10 · Confirmar inscripción, J11 · Inscripción confirmada, J12 · Torneo lleno
- **Competir**: J13 · Mis torneos, J14 · Sala del torneo · Check-in, J15 · Chat del torneo, J16 · Bracket, J17 · Reportar resultado, J24 · Mis torneos · vacío
- **progreso y cuenta**: J18 · Perfil competitivo, J19 · Historial, J20 · Rankings, J21 · Rankings · Amigos, J22 · Notificaciones, J23 · Ajustes y modo
- **Panel y creacion**: O01 · Panel del organizador, O02 · Crear · Información, O03 · Crear · Formato y cupos, O04 · Crear · Fecha y reglas, O05 · Crear · Revisión y publicar, O06 · Torneo publicado
- **Gestión del torneo**: O07 · Gestionar · Resumen, O08 · Gestionar · Inscritos, O09 · Acciones sobre jugador, O10 · Confirmar expulsión, O11 · Check-in en vivo, O12 · Gestionar · Bracket, O13 · Registrar resultado, O14 · Chat · Anuncio
- **Cierre, datos y perfil**: O15 · Cerrar torneo, O16 · Estadísticas del torneo, O17 · Perfil del organizador, O18 · Cancelar torneo

## 5. Cómo trabajamos

- Cambios de experiencia (pantallas nuevas o eliminadas, accesos,
  conexiones entre pasos, estados, textos funcionales) se documentan
  primero en la spec del flujo y en Figma. No implementes un cambio
  de experiencia sin que esté en la spec; si te lo piden, avisa y
  propón actualizar la spec primero.
- Ajustes visuales (color, espaciado, imagen decorativa, tamaños) se
  hacen directo en código, siempre con los tokens del UI kit. Nunca
  escribas valores sueltos como colores hex o tamaños en px.
- Si un ajuste necesita un token que no existe, se agrega primero
  al kit.
- Todo el código vive dentro de web/.

## Preguntas abiertas

1. `design/README.md` menciona `auditoria.md` y `ui-kit.md`, pero existen `design/Auditoria/` (solo imágenes) y `design/ui kit` (sin extensión). ¿Se renombran o se crean esos archivos?
2. `design/flujos/README.md` dice que hay una carpeta por caso de uso (CU-01, CU-02…), pero las carpetas tienen nombres de flujo. ¿Cuál es la convención y cómo se relacionan con las carpetas de `specs/`?
3. Nombres de carpeta inconsistentes (`progreso y cuenta` en minúscula, `Panel y creacion` sin tilde). ¿Se normalizan? Los dejé tal cual.
4. `docs/README.md` menciona un "documento de corte 1" que no está en `docs/`. ¿Dónde está?
5. J10 y el UI kit incluyen pago (Nequi / PSE / Tarjeta, "Pagar $X"), pero el Brief dice que la inscripción es gratuita y el cobro está fuera de alcance. ¿Qué entra en el MVP?
6. ¿Qué entra al MVP de Rankings y Rankings · Amigos? El Brief dice que ese corte se define "en el siguiente paso".
7. El kit lista 24 juegos (p. ej. EA FC 25) y las entrevistas hablan de FC 26. ¿Cuál es el catálogo inicial?
8. `data/modelo-datos.md` y las specs por caso de uso no existen aún. ¿Quién los crea y antes de `web/`?
9. ¿Versión de Next.js, gestor de paquetes y comandos de dev/build/test? Se definen al crear `web/`.
10. ¿Cuál es el propósito de `design/Auditoria/` (imágenes de qué) y debe usarse como guía?
