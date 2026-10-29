# LT Tournament

## 1. Qué es el producto

LT Tournament es una plataforma web, pensada primero para celular, donde los organizadores de torneos amateur de videojuegos crean y gestionan su torneo de principio a fin, y los jugadores lo encuentran, se inscriben, compiten y hacen seguimiento de su progreso en un solo lugar.

**Problema:** no existe un lugar centralizado, confiable y fácil para organizar y jugar torneos amateur. Hoy el ciclo completo (crear, gestionar, jugar y hacer seguimiento) está repartido entre Discord para coordinar, TikTok para promocionar y hojas de cálculo para llevar inscritos, bracket y resultados. Nada centraliza la gestión del torneo ni le da al jugador un historial de su progreso a través de los torneos y juegos en los que participa. Las entrevistas (simuladas, pendientes de validar con gente real) apuntan en la misma dirección: la organización es el principal punto de dolor, y la mala organización frustra a los jugadores con tiempos de espera largos.
**Usuario:** dos lados de un mismo mercado, y ninguno sostiene el producto sin el otro. Organizadores: streamers pequeños y medianos y jugadores comunes inspirados por ellos, que hoy gestionan con herramientas sueltas. Jugadores: la base de LatAm (más de 370 millones según el Brief), sobre todo casuales y semicompetitivos que hoy no tienen dónde jugar de forma estructurada. Es una sola cuenta con cambio de modo Jugador / Organizador.
**Propuesta para el organizador:** un solo lugar donde crear, gestionar y mantener su torneo de principio a fin (inscritos, check-in, bracket, resultados, chat, cierre y estadísticas), a diferencia de Discord y TikTok, que sirven para convocar pero no para administrar el torneo completo. En las entrevistas, más control significa más torneos.
**Propuesta para el jugador:** el mejor lugar para encontrar torneos, inscribirse fácil y ver su progreso (ranking dentro de cada juego, puestos, historial y cómo le va frente a sus amigos) a través de los juegos y torneos en los que participa. El ranking no compara habilidad entre juegos distintos: agrega participación y desempeño en un perfil competitivo único por jugador. Ese historial unificado es el diferencial frente a Battlefy, Challonge, Toornament, Rivals y PlayTourn, cuyos rankings casi siempre están atados a un solo juego.
**Alcance del MVP:** tres frentes y nada más: flujo del organizador, flujo del jugador y capa de rankings y reputación. La inscripción es gratuita. Quedan fuera de este semestre la monetización (cobro de entradas, comisiones, pasarela de pago), el sistema de promociones, la integración con Discord y un mecanismo formal de resolución de disputas. El foco es validar que organizadores y jugadores prefieren esta plataforma sobre Discord + TikTok + hojas de cálculo.

## 2. Stack

- **Next.js + TypeScript:** es la app completa. Pone las pantallas (mobile first, 390 × 844 como base de diseño), las rutas (jugador y organizador, con navegación distinta por modo) y la lógica de servidor (inscripciones, check-in, generación y avance del bracket, registro de resultados, cálculo de puntos y rankings). TypeScript tipa los datos del modelo (torneo, inscripción, partido, resultado) de punta a punta.
- **Tailwind + shadcn/ui:** estilos y componentes. Aquí viven los tokens y el kit descritos en `design/ui kit`: colores, espaciado, radios, tipografía (Montserrat para títulos, Inter para el resto), sombras y movimiento, más los componentes (botón, chip, tarjeta de torneo, bracket, podio, hoja inferior, diálogo, toast, etc.). El tema es oscuro siempre y el acento cambia por modo (jugador naranja, organizador azul) mediante `data-mode="org"` en el contenedor raíz; los componentes nunca llevan un color de acento fijo.
- **Supabase:** base de datos (torneos, inscripciones, partidos, resultados, puntos y rankings, amigos, notificaciones), login (crear cuenta, ingresar y recuperar acceso, J03 a J05), almacenamiento de fotos (portadas de torneo, avatares y capturas de prueba del resultado) y permisos (reglas de acceso por fila para separar lo que puede hacer un jugador, un organizador y el organizador dueño de cada torneo).
- **Vercel:** despliegue de la app Next.js, con una URL de preview por rama o pull request para revisar cambios antes de integrarlos, y variables de entorno para las llaves de Supabase.

## 3. Mapa del repo

- `docs/`: contexto y validación del producto.
  - `Brief`: el brief del proyecto (contexto, objetivo, oportunidad de negocio, hipótesis, value props, alcance, plan de validación y guion de entrevistas). Es la fuente del qué y el porqué.
  - `Entrevistas`: respuestas **simuladas** de 8 organizadores y 8 jugadores. No son datos reales y no deben presentarse como tales.
  - `Conclusiones entrevistas`: cinco hipótesis preliminares (confianza en los pagos, automatización, disputas, historial competitivo, facilidad de uso) que hay que contrastar con entrevistas reales.
  - `README.md`: índice de la carpeta.
- `design/`: todo el diseño.
  - `ui kit`: guía para implementar en código (principios, tokens de color, espaciado, radios, tipografía, íconos, bloque CSS de tokens y equivalente en Tailwind, estructura de pantalla, componentes con sus estados, etiquetas de estado, patrones clave, formatos de datos y accesibilidad). Si contradice al código, manda el kit.
  - `auditoria.md`: análisis de qué se tomó de cada referente visual (plataforma gaming naranja, tabla de clasificación, pantalla versus, bracket, trofeos 3D y dashboards de F1) y qué decisiones del diseño son propias. Incluye dos pendientes: doble eliminación sin pantalla y el render `3d-balon` vacío.
  - `flujos/`: pantallas exportadas de Figma (archivo «LT»), una carpeta por flujo (ver sección 4).
  - `Referencias img/`: imágenes de referencia visual (`Img/image 1.png`, `2`, `3`, `4` y `6`).
  - `README.md`: índice de la carpeta.
- `specs/`: una carpeta por caso de uso con `spec.md`, `plan.md` y `tareas.md`. Hoy solo tiene el README. La spec de cada flujo es la fuente de verdad de la experiencia.
- `data/`: modelo de datos (`modelo-datos.md`). Hoy solo tiene el README.
- `web/`: el código de la app Next.js. Hoy solo tiene el README; se crea en la sesión 2. Todo el código vive aquí.
- `.github/`: `CODEOWNERS`.
- Raíz: `README.md`, `.gitignore` (ya preparado para Next.js y Vercel) y este `CLAUDE.md`.

## 4. Flujos

Carpetas de `design/flujos/`, tal como se llaman hoy en disco, con las pantallas que contiene cada una. Prefijos de ID: J = jugador, O = organizador, V = estado vacío, D = disputa, W = W.O., F = resultado final, BR = Battle royale, PTS = bracket-por-puntos. EvE es la variante de eliminación directa 1 vs 1.

- **acceso-y-registro** (7): J00 · Splash, J01 · Bienvenida, J02 · Onboarding · Tus juegos, J03 · Crear cuenta · Jugador, J03 · Crear cuenta · Organizador, J04 · Ingresar, J05 · Recuperar acceso
- **jugador-descubrir-e-inscribirse** (7): J06 · Inicio, J07 · Explorar, J08 · Filtros, J09 · Detalle del torneo, J10 · Confirmar inscripción, J11 · Inscripción confirmada, J12 · Torneo lleno
- **jugador-competir** (4): F1 · Jugador · Tu resultado final, J13 · Mis torneos, J14 · Sala del torneo · Check-in, J15 · Chat del torneo
- **jugador-progreso-y-cuenta** (5): J18 · Perfil competitivo, J19 · Historial, J21 · Rankings · Amigos, J22 · Notificaciones, J23 · Ajustes y modo
- **organizador-panel-y-creacion** (11): O01 · Panel del organizador, O02 · Crear · Información, O03 · Crear · Formato · Equipo vs equipo, O03b · Crear · Formato · Battle royale, O03c · Crear · Formato · Por puntos, BR · O1b · Cupos personalizados, EvE · O1b · Cupos personalizados, PTS · O1b · Cupos personalizados, O04 · Crear · Fecha y reglas, O05 · Crear · Revisión y publicar, O06 · Torneo publicado
- **organizador-gestion-del-torneo** (6): O07 · Gestionar · Resumen, O08 · Gestionar · Inscritos, O09 · Acciones sobre jugador, O10 · Confirmar expulsión, O11 · Check-in en vivo, O14 · Chat · Anuncio
- **organizador-cierre-datos-y-perfil** (3): O16 · Estadísticas del torneo, O17 · Perfil del organizador, O18 · Cancelar torneo
- **1v1-bracket** (6): J16 · Bracket, J16b · Bracket · Prueba del resultado, J17 · Reportar resultado, O12 · Bracket · 1 vs 1, O13 · Registrar resultado, O15 · Cerrar torneo
- **battle-royale-bracket** (6): BR · J1 · Tabla y tu partida, BR · J2 · Reportar resultado, BR · J3 · Prueba del resultado, BR · O2 · Tabla de partidas, BR · O3 · Registrar resultados, BR · O4 · Cierre y podio
- **bracket-por-puntos** (6): PTS · J1 · Tabla y tu partido, PTS · J2 · Reportar resultado, PTS · J3 · Prueba del resultado, PTS · O2 · Tabla de posiciones, PTS · O3 · Registrar resultado, PTS · O4 · Cierre y podio
- **incidencias-de-partido** (5): D1 · Jugador · Resultado en disputa, D2 · Organizador · Resolver disputa, W1 · Organizador · Jugador no se presentó, W2 · Jugador · Avanzas por W.O., W3 · Jugador · Perdiste por W.O.
- **estado-vacio-sin-torneos** (5): J24 · Mis torneos · vacío, V1 · Inicio · Sin torneos, V3 · Rankings · Sin posición, V4 · Perfil · Sin historial, V5 · Panel organizador · Sin torneos

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

1. **Pago vs. MVP gratuito.** El Brief y `auditoria.md` dicen que la inscripción es gratuita y que todo lo que depende de dinero se descartó, pero el UI kit todavía describe pago (Nequi / PSE / Tarjeta, «Pagar $X y confirmar», precio en COP, Gratuita / Paga en la creación) y las entrevistas giran en torno a cobros y premios. ¿El MVP es solo gratuito? Si sí, ¿se limpia el kit, o la opción «Paga» queda como futuro y no se implementa?
2. **Disputas y W.O.** El Brief deja fuera «un mecanismo formal de resolución de disputas», pero hay un flujo completo de incidencias-de-partido (D1, D2, W1, W2, W3) y pruebas del resultado con captura (J3). ¿Entra al MVP? ¿Dónde está la línea entre «reportar y confirmar un resultado» (dentro) y «resolver disputas» (fuera)?
3. **Modalidades.** Resuelto: el MVP solo tiene jugadores individuales; no existen equipos, escuadras ni selección de equipo (E1 a E3). Entran los tres tipos de juego (eliminación directa 1 vs 1, Battle royale y Por puntos). En eliminación directa solo entra ese formato: la doble eliminación y la fase de grupos quedan fuera.
4. **Rankings.** Resuelto: solo ranking entre amigos (J21). Se eliminan el ranking Global y Por juego (J20).
5. **IDs de pantalla.** Al reorganizar, algunas pantallas cambiaron de carpeta: O12, O13 y O15 quedaron en «1v1-bracket», y J16 y J17 también, por lo que `organizador-gestion-del-torneo` ya no tiene O12/O13 y `organizador-cierre-datos-y-perfil` ya no tiene O15. Además faltan o no existen IDs como V2, BR · O1 y J16 / J17 para las otras modalidades, y «O1b · Cupos personalizados» aparece tres veces con prefijos distintos. ¿Es intencional, o falta alguna pantalla por exportar?
6. **Nombres de carpeta.** Resuelto: las carpetas de `design/flujos/` y de `specs/` se llaman igual, en minúsculas, con guiones, sin tildes, espacios ni comas. Los IDs de pantalla y los PNG no se renombran.
7. **Convención de flujos y specs.** `design/flujos/README.md` dice «una carpeta por caso de uso (CU-01, CU-02...)», pero las carpetas tienen nombres de flujo, y `specs/README.md` pide una carpeta por caso de uso. ¿Cómo se relacionan flujo, caso de uso y spec? Hoy no hay ninguna spec escrita, y la sección 5 depende de que exista.
8. **Índices desactualizados.** `design/README.md` dice «auditoria.md, ui-kit.md y flujos/», pero el archivo se llama `ui kit` (con espacio y sin extensión). `docs/README.md` menciona un «documento de corte 1» que no está en `docs/`. ¿Se renombra, se agrega o se corrigen los README?
9. **Imágenes de referencia.** `auditoria.md` habla de 8 imágenes en la página Recursos de Figma, y antes estaban en `design/Auditoria/` (image 1 a image 8). Ahora hay `design/Referencias img/Img/` con solo 5 (1, 2, 3, 4 y 6). ¿Se movieron o faltan las otras? ¿Debo usarlas como guía visual al implementar?
10. **Entrevistas reales.** El Brief exige hablar con organizadores y jugadores reales antes de cerrar el MVP, y `docs/Entrevistas` es simulado. ¿Hay entrevistas reales hechas o por hacer, y dónde se documentan?
11. **Catálogo de juegos.** El UI kit lista 24 juegos con sus colores y puntos por puesto (por ejemplo EA FC 25) y las entrevistas hablan de FC 26. ¿Cuál es el catálogo inicial y de dónde salen las portadas? Además, `auditoria.md` señala que `3d-balon` es un marcador sin imagen.
12. **Figma.** El kit dice que sale del archivo «LT» (páginas Componentes, Flujo y 📱 Diseño). ¿Cuál es el enlace del archivo para poder consultarlo con el MCP de Figma?
13. **Modelo de datos.** No existe `data/modelo-datos.md`. ¿Quién lo define y se hace antes de crear `web/`? Hay que decidir al menos cómo se calculan los puntos (el kit los saca de la configuración del torneo) y cómo se agrupan por juego.
14. **Arranque técnico.** ¿Versión de Next.js, gestor de paquetes, y comandos de desarrollo, build, lint y pruebas? Se definen al crear `web/` y deben agregarse a este archivo.
15. **Inicio de sesión.** Resuelto: el login es solo correo y contraseña con Supabase. No hay inicio con Google ni con Discord.
