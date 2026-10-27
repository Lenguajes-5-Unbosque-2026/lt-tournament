# Decisiones y contexto del proyecto (pendiente de pasar al CLAUDE.md)

En la sesión 2 la regla es **no editar el `CLAUDE.md`**. Este archivo junta lo que ya sabemos del proyecto y que el `CLAUDE.md` todavía no recoge (o deja como pregunta abierta), para pasarlo cuando se pueda editar. Cada punto dice de dónde sale.

Fuentes: decisiones tomadas en conversaciones del equipo, el `sdd v2.md`, el Figma «LT» y lo que encontré al preparar `design/tokens.md`, `design/componentes.md` y `data/mock/`.

## 1. Respuestas a las preguntas abiertas del CLAUDE.md

| # | Pregunta | Lo que ya está decidido o se sabe | Fuente |
|---|---|---|---|
| 1 | Pago vs. MVP gratuito | El MVP es **solo gratuito**. El precio queda en el modelo como **futuro** (`torneos.precio_cop`) y **no se implementa**: ni pasarela, ni Nequi / PSE / Tarjeta, ni «Pagar $X y confirmar». No hay tablas `pagos` ni `creditos` | Decisión de esta sesión · SDD §2 y §4 |
| 3 | Modalidades | El diseño tiene **tres tipos de juego**: Equipo vs equipo (equipos de 1 a 5), Battle royale (hasta 100 jugadores) y Por puntos (liga, rondas suizas, récord). Los límites tienen opciones fijas más un valor libre que pone el organizador («Otro»). Falta decidir cuáles entran al MVP | Decisión de diseño · pantallas O03, O03b, O03c y O1b |
| 3 | Cupos que no son potencia de 2 | En eliminación directa se juega una **ronda previa** para completar el cuadro | Decisión de diseño · texto de ayuda en EvE · O1b |
| 2 | Disputas y prueba del resultado | La **imagen de prueba oficial la sube solo el organizador**. La captura que adjunta el jugador al reportar es opcional y solo la ve el organizador. Falta decidir si D1, D2 y W1–W3 entran al MVP | Decisión de diseño · pantallas J17, O13, D2 |
| 12 | Enlace de Figma | https://www.figma.com/design/RXCmaVQ2NHd3KJr0ijbBl2/LT · página «📱 Diseño» (node `3:7`), con secciones Jugador y Organizador. Componentes en «⚙️Componentes / Ui kit» (node `3:4`) | Memoria del proyecto |
| 13 | Modelo de datos | El SDD ya propone tablas: `perfiles_jugador`, `perfiles_organizador`, `torneos`, `inscripciones`, `resultados_bracket`, `mensajes_torneo` y, como stretch, `conexiones` y `tabla_puntos`. `data/mock/` las usa y suma las que piden las pantallas (ver §3) | SDD §3 y §4 |
| 15 | Inicio de sesión | J04 muestra «Continuar con Google» y «Continuar con Discord», pero la integración con Discord está fuera de alcance. Sigue abierta | Pantalla J04 · Brief §6 |

## 2. Decisiones de producto y diseño que conviene dejar escritas

- **Una sola cuenta con dos modos.** Un registro en `auth.users` y dos perfiles: `perfiles_jugador` y `perfiles_organizador`, ambos con `id` = id del usuario. El cambio de modo se hace **desde el perfil** (J23 · Ajustes y modo; O17 lo recuerda). *(SDD §3 · decisión de diseño)*
- **Nivel del organizador limitado a 1 en el MVP**, con un trigger de Postgres. Es un gancho para gamificación futura (O17 ya muestra «Nivel 2 en 3 torneos»). *(SDD §3)*
- **Regla de color:** el modo organizador **siempre va en azul** y el jugador en **naranja**. *(decisión de diseño · UI kit §1)*
- **Chat nativo del torneo**, solo para inscritos confirmados y el organizador, con Row Level Security y Realtime. Reemplaza la integración con Discord. *(SDD §4)*
- **Rankings en tres dimensiones:** por juego, por torneo y por jugador, más el ranking de amigos con torneos jugados y puntos por puesto. El ranking no compara habilidad entre juegos. *(SDD §6 · Brief §6)*
- **Puntos por puesto:** el kit sugiere puntos 1°/2°/3° por juego y el organizador los puede editar. En `data/mock/` además hay `puntos_participacion` (10 pts por jugar, 0 en torneos amistosos), porque W3 dice «sumas tu participación». Confirmar. *(UI kit §5.18 · pantalla W3)*
- **Puntos en battle royale:** posición + 1 pt por kill (BR-O2). En `data/mock/` la tabla de posición es 1°=12, 2°=9, 3°=7, 4°=6, 5°=5… sacada de BR-O3. Confirmar. *(pantallas BR-O2, BR-O3)*
- **Tiempo disponible:** unas 96 horas-persona en el semestre (~6 h por semana cada uno). Es el límite para trazar la línea del MVP. *(contexto del equipo)*
- **Validación:** comunidades gamer de la universidad, organizadores LAN y de Valorant / CS2 amateur en Bogotá, y servidores de Discord de esports en Colombia, con guion por agente. Las entrevistas de `docs/Entrevistas` son simuladas. *(Brief §7)*

## 3. Diferencias que encontré entre documentos

| Tema | Un documento dice | El otro dice | Qué propongo |
|---|---|---|---|
| Nombre del producto | CLAUDE.md: «LT Tournament» · Figma: «LTournaments» | Notas anteriores del equipo: «Lootourmaments» | Definir uno solo |
| Estados del torneo | SDD: `borrador / publicado / en_curso / finalizado / cancelado` | UI kit §6: `borrador → abierto → checkin → en_curso → finalizado`, o `cancelado` | `data/mock/` usa el del kit, porque es el que muestran las pantallas (O07) |
| Estados de inscripción | SDD: `confirmada / cancelada` | Pantallas: Confirmada, Pendiente, En espera (O08, J13) | `data/mock/` usa los cuatro |
| Tablas que faltan en el SDD | — | Las pantallas piden: juegos, equipos e integrantes, reportes de resultado, partidas y resultados de battle royale, posiciones finales, notificaciones y juegos favoritos | Agregarlas al modelo de datos (`data/modelo-datos.md`) |
| Nombre del archivo del kit | La guía de la sesión y `design/README.md` dicen `design/ui-kit.md` | En disco se llama `design/ui kit` (con espacio y sin extensión) | Renombrar a `ui-kit.md` cuando se pueda tocar el CLAUDE.md, porque lo nombra |
| Paso 3 de crear torneo | Kit: «Fecha, puntos y pago» | Figma O04: «Fecha y reglas» | Usar el de Figma, sin pago |
| Jugadores por equipo | Kit: slider de 1 a 6 | Figma: stepper con chips de 1 a 5 y «Otro» | Usar el de Figma |

El detalle de las diferencias de valores visuales está en `design/tokens.md` (sección «Valores parecidos o en conflicto»).

## 4. Qué se agregó en la rama `setup/preparacion`

- `design/tokens.md`: todos los tokens en tablas, cruzados con las variables de Figma, y la lista de valores duplicados o en conflicto.
- `design/componentes.md`: los 52 componentes que aparecen en las 75 pantallas, con su equivalente en shadcn/ui, ordenados por frecuencia.
- `data/mock/`: 17 CSV relacionados (20 torneos, 30 jugadores, 80 inscripciones) y 79 imágenes originales.
- Este archivo y los índices de `design/README.md` y `data/README.md`.

Las cuentas de Supabase y Vercel (paso 4 de la guía) quedan pendientes: las crea el equipo directamente en cada servicio.
