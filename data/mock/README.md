# data/mock · Datos de prueba

Registros inventados pero realistas (Colombia) para alimentar las pantallas en código y, después, cargarse tal cual a Supabase. Salen de lo que muestran las pantallas de `design/flujos/`.

**Volumen:** 20 torneos · 30 jugadores · 80 inscripciones (más 7 organizadores, 5 equipos, 28 partidos, 36 reportes, 16 mensajes de chat y el resto de tablas de apoyo).

## Archivos y relaciones

Cada registro tiene un `id`. Cuando un registro pertenece a otro, lleva una columna con el `id` del otro (por ejemplo, cada inscripción tiene `torneo_id` y `jugador_id`).

| Archivo | Qué es | Se relaciona con | Pantallas |
|---|---|---|---|
| `usuarios.csv` | La cuenta única (equivale a `auth.users` de Supabase) | — | J03–J05, J23 |
| `perfiles_jugador.csv` | Perfil de jugador; `id` = id del usuario | `usuarios.id`, `juegos.id` | J06, J18, J20 |
| `perfiles_organizador.csv` | Perfil de organizador; `id` = id del usuario | `usuarios.id` | O01, O17 |
| `juegos.csv` | Catálogo de los 24 juegos del UI kit, con colores y puntos sugeridos 1°/2°/3° | — | J02, O02, filtros |
| `jugador_juegos.csv` | Juegos que eligió cada jugador en el onboarding | `perfiles_jugador.id`, `juegos.id` | J02 |
| `torneos.csv` | Torneos con formato, cupos, fechas, reglas, puntos y estado | `perfiles_organizador.id`, `juegos.id` | J06–J12, O01–O07 |
| `equipos.csv` | Equipos inscritos en torneos por equipos | `torneos.id`, `perfiles_jugador.id` (capitán) | E1–E3 |
| `equipo_integrantes.csv` | Integrantes de cada equipo (aceptado / pendiente) | `equipos.id`, `perfiles_jugador.id` | E2 |
| `inscripciones.csv` | Inscripción de un jugador a un torneo (en torneos por equipos, una fila por integrante con su `equipo_id`) | `torneos.id`, `perfiles_jugador.id`, `equipos.id` | J10, J11, J13, O08, O11 |
| `partidos.csv` | Partidos de bracket, liga y rondas suizas (`resultados_bracket` en el SDD) | `torneos.id`, `perfiles_jugador.id` | J16, O12, PTS-J1, PTS-O2, D1, D2, W1–W3 |
| `reportes_resultado.csv` | Marcador que reporta cada jugador de un partido | `partidos.id`, `perfiles_jugador.id` | J17, O13, PTS-J2, PTS-O3, D1, D2 |
| `partidas_battle_royale.csv` | Partidas de un torneo battle royale | `torneos.id`, `perfiles_jugador.id` (ganador) | BR-J1, BR-O2 |
| `resultados_battle_royale.csv` | Puesto, kills y puntos de cada jugador en cada partida | `partidas_battle_royale.id`, `perfiles_jugador.id` | BR-J1, BR-J2, BR-O3 |
| `posiciones_finales.csv` | Puesto final y puntos de ranking por torneo finalizado (alimenta historial y rankings) | `torneos.id`, `perfiles_jugador.id` | J19, J20, F1, O15 |
| `mensajes_torneo.csv` | Chat del torneo y anuncios fijados | `torneos.id`, `usuarios.id` | J15, O14 |
| `conexiones.csv` | Amistades (aceptado / pendiente) | `perfiles_jugador.id` ×2 | J21 |
| `notificaciones.csv` | Notificaciones por usuario | `usuarios.id`, `torneos.id` | J22 |

### Valores que se calculan (no se guardan)

- **Inscritos de un torneo** (`24/32`): se cuentan en `inscripciones.csv` las filas `confirmada` + `pendiente`. En torneos por equipos se cuentan equipos distintos.
- **«Lleno»**: no es un estado del torneo; se muestra cuando inscritos = `cupos`.
- **`puntos_ranking` y `nivel`** de `perfiles_jugador.csv` ya vienen sumados desde `posiciones_finales.csv` (nivel = 1 + puntos ÷ 100). Si cambian las posiciones, hay que recalcularlos.

### Estados usados

- **Torneo:** `borrador` → `abierto` → `checkin` → `en_curso` → `finalizado`, o `cancelado` (ciclo del UI kit §6).
- **Inscripción:** `confirmada`, `pendiente`, `espera` (lista de espera, con `posicion_espera`) y `cancelada`.
- **Partido:** `pendiente`, `reportado` (ambos reportaron, falta que el organizador confirme), `en_disputa`, `finalizado` y `wo`. `resuelto_por`: `reportes`, `organizador_disputa` u `organizador_wo`.

### Precio (futuro)

`torneos.precio_cop` existe para cuando se active el pago, pero **no se implementa en el MVP**. Todos los torneos valen 0, menos `tor_018` (Copa Pro Chapinero, $10.000), que está en `borrador` justamente porque el pago no entra este semestre.

## Casos difíciles incluidos

| Caso | Dónde |
|---|---|
| Nombre de torneo muy largo | `tor_014` (Free Fire, 99 caracteres) |
| Nombre de equipo muy largo | `eq_005` «Los Que Vuelan Sin Frenos y Sin Saber Aterrizar» |
| Gamertag muy largo | `usr_029` MarianaDelPilarRodriguezCastaneda |
| Alias de organizador largo | `usr_033` «Liga Universitaria Andina de Esports» |
| Torneo sin imagen | `tor_014`, `tor_015` (`imagen` vacía) |
| Juego sin portada (usa el arte de respaldo) | 18 de los 24 juegos de `juegos.csv` |
| Jugador sin avatar | `usr_010` Rex, `usr_029` |
| Organizador sin avatar y sin torneos (V5) | `usr_036` NuevaOrgCol |
| Jugador nuevo: 0 puntos, sin juego principal, sin juegos elegidos, sin historial (V4) | `usr_010` Rex |
| Descripción vacía | `tor_014` |
| Premio y reglas vacíos | `tor_015` (borrador) |
| Puntos de ranking en cero | `tor_019` (0 / 0 / 0 y participación 0) |
| Organizador con valoración 0 y 0 seguidores | `usr_035`, `usr_036` |
| Torneos con 0 inscritos (listas vacías) | `tor_013` a `tor_020` |
| Torneo lleno con lista de espera | `tor_004` (8/8 + 2 en espera) |
| Torneo cancelado con inscripción cancelada | `tor_013` |
| Equipo incompleto con invitación pendiente | `eq_001` Los Cóndores (4 de 5) |
| Resultado en disputa | `par_028` (NovaK vs Kairo, reportes distintos) |
| Ambos reportaron, falta confirmar | `par_027` (Johitan vs Mafe) |
| Victoria por W.O. | `par_003` |
| Empates (liga y rondas suizas) | `par_016`, `par_018`, `par_023`, `par_024` |
| Partidas battle royale con reportes sin confirmar | `pbr_003` |
| Mensaje de chat muy largo y mensajes solo con emojis | `msg_006`, `msg_008` |
| Formato de torneo sin pantalla de bracket | `tor_017` (doble eliminación) |
| Cupos que no son potencia de 2 | `tor_010` (6) y `tor_014` (25) |

## Imágenes

Están en `imagenes/` con el nombre exacto que dice la columna `imagen`, `prueba_imagen` o `captura_imagen`. Son 79 y cada una tiene su fila.

- `portada-<juego>.jpg` y `torneo-<nombre>.jpg` (1200 × 750, el tamaño que recomienda O02).
- `avatar-<gamertag>.png` y `avatar-org-<alias>.png` (256 × 256, casco con los colores del usuario).
- `prueba-*.jpg` (prueba oficial que sube el organizador) y `captura-*.jpg` (captura que sube el jugador al reportar).

Todas son **arte original generado para el proyecto**, con los colores del UI kit: degradado del juego, franjas diagonales y un objeto genérico (balón, gema, audífonos, corona, mando, medalla). No usan portadas oficiales, logos de marcas ni fotos de terceros. Se pueden reemplazar por los renders 3D del Figma o por fotos libres de Unsplash dejando el mismo nombre de archivo.

## Cargar a Supabase (sesión 5)

Los `id` son legibles (`tor_001`, `usr_001`) para revisar las relaciones a mano. Al crear las tablas se puede:

- usar `text` como tipo de `id` en los datos de prueba, o
- mapear cada id a un `uuid` al importar.

Los usuarios de `usuarios.csv` hay que crearlos en Supabase Auth; sus `id` pasan a ser los de `auth.users`.

Orden de carga para que no fallen las relaciones: `juegos` → `usuarios` → `perfiles_jugador` → `perfiles_organizador` → `jugador_juegos` → `torneos` → `equipos` → `equipo_integrantes` → `inscripciones` → `partidos` → `reportes_resultado` → `partidas_battle_royale` → `resultados_battle_royale` → `posiciones_finales` → `mensajes_torneo` → `conexiones` → `notificaciones`.
