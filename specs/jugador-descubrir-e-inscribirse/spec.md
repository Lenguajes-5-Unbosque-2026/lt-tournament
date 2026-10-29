# Jugador · Descubrir e inscribirse

Carpeta de pantallas: `design/flujos/jugador-descubrir-e-inscribirse/`

## Quién y para qué

**Quién:** el jugador, con la cuenta en modo Jugador (acento naranja). Ya tiene cuenta y perfil, con su ID público (el que escribió al crear la cuenta).

**Para qué:** encontrar un torneo que le interese e inscribirse en él con el menor número de pasos posible. Es el flujo core del producto: entrega la propuesta de valor del jugador («encontrar torneos, inscribirse fácil») y es lo que alimenta todo lo demás. Sin inscripción no hay check-in, bracket, resultados ni ranking.

**Resultado:** el jugador queda con un cupo confirmado en el torneo, o en la lista de espera si el torneo está lleno.

**Alcance del MVP:** la inscripción es gratuita y es **individual**: cada jugador se inscribe por su cuenta. Las pantallas solo muestran entrada «Gratis».

**Caso de ejemplo para el paso a paso:** Johitan (nivel 12, 1.240 pts) se inscribe en la **Copa Relámpago Bogotá**: EA FC 25, 1 vs 1, eliminación directa, sábado 4 de octubre a las 7:00 pm, gratis, 24/32 inscritos. Una variante usa otro torneo que aparece en las pantallas: **Clutch Masters Bogotá** (CS2, lleno).

## Pantallas

| ID | Pantalla | Qué es |
|---|---|---|
| J06 | Inicio | Pestaña raíz del jugador. Muestra el próximo torneo, un torneo destacado y la lista «Para ti». |
| J07 | Explorar | Pestaña raíz. Búsqueda, chips de juego y lista de todos los torneos. |
| J08 | Filtros | Hoja inferior sobre Explorar con filtros de juego, modalidad, fecha, cupos y cercanía. |
| J09 | Detalle del torneo | Toda la información del torneo y el botón «Inscribirme». |
| J10 | Confirmar inscripción | Hoja inferior sobre el Detalle, para confirmar la inscripción. |
| J11 | Inscripción confirmada | Éxito de la inscripción: «¡ESTÁS DENTRO!». |
| J12 | Torneo lleno | Variante del Detalle cuando no hay cupos: lista de espera. |

### Qué muestra cada pantalla

**J06 · Inicio**
- Cabecera con avatar, «Hola, Johitan», «Nivel 12 · 1.240 pts» y la campana de notificaciones.
- «TU PRÓXIMO TORNEO»: tarjeta con la etiqueta CHECK-IN, la cuenta atrás («Falta 02:14:36»), el torneo («Copa Relámpago Bogotá»), el partido («Octavos vs NovaK · 7:40 pm») y el botón «Check-in».
- Torneo destacado en tarjeta grande, con el nombre, la etiqueta ABIERTO, la fecha, los cupos (por ejemplo, «20/32 cupos») y el botón «Inscribirme».
- Sección «Para ti» con el link «Ver todo», chips de juego (Todos, EA FC 25, Valorant, Fortnite) y tarjetas de torneo.
- Barra de navegación con Inicio activo.

**J07 · Explorar**
- Título «EXPLORAR» y un ícono QR arriba a la derecha.
- Campo de búsqueda («Busca torneos, juegos u organizadores») con el botón de filtros a la derecha.
- Chips de juego: Todos, EA FC 25, Valorant, CS2, LoL.
- Contador («6 torneos en Bogotá») y el selector de orden («Más próximos»).
- Lista de tarjetas de torneo con juego, nombre, fecha y hora, cupos y etiqueta de estado.
- Barra de navegación con Explorar activo.

**J08 · Filtros**
- Hoja con el link «Limpiar» arriba.
- JUEGO: chips de selección múltiple (EA FC 25, Valorant, CS2, LoL).
- MODALIDAD: chips (1 vs 1).
- FECHA: segmento (Hoy, Esta semana, Este mes).
- Interruptor «Solo con cupos disponibles» («Oculta torneos llenos»).
- Interruptor «Cerca de mí» («Bogotá · radio de 10 km»).
- Botones «Limpiar» y «Ver N resultados» (en la pantalla, «Ver 4 resultados»).

**J09 · Detalle del torneo**
- Barra superior con volver, título «Detalle», corazón y compartir.
- Portada, etiqueta de estado, juego, modalidad y formato (por ejemplo «ABIERTO · EA FC 25 · 1 vs 1 · Eliminación directa»), y el nombre en display.
- Tres datos: fecha (Sáb 4), hora (7:00 pm) y entrada (Gratis).
- Barra de cupos: «24 / 32 inscritos» y «Quedan 8 cupos».
- Premios del torneo, con los puntos de ranking que da cada puesto según la regla única 100 × (N − puesto + 1) / N.
- Reglas: «Check-in 30 min antes en la app», «Partidos al mejor de 3 · 6 min por tiempo», «Reporta tu marcador con captura».
- Bloque de acción: «Inscripción gratis», «Cierra Sáb 6:00 pm» y el botón «Inscribirme».
- Tarjeta del creador: avatar, nombre (StreamerNova), «Organizador verificado · 7 torneos» y el botón «Seguir».

**J10 · Confirmar inscripción**
- Hoja sobre el Detalle.
- Resumen del torneo: portada, nombre y «Sáb 4 Oct · 7:00 pm · 1 vs 1».
- ID público («Johitan»), solo lectura (viene del perfil), y entrada («Gratis»).
- Casilla «Acepto las reglas del torneo y el check-in obligatorio».
- Aviso informativo: «Puedes cancelar hasta 1 h antes. Así liberas tu cupo para la lista de espera».
- Botones «Confirmar inscripción» y «Cancelar».

**J11 · Inscripción confirmada**
- Botón cerrar (X), título «Inscripción» y una ilustración 3D de ticket.
- «¡ESTÁS DENTRO!» y el texto «Tu cupo en la Copa Relámpago Bogotá quedó confirmado. Te avisaremos cuando abra el check-in».
- Datos: fecha (Sáb 4 Oct), hora (7:00 pm), seed (#13) y estado (CONFIRMADA).
- Botones: «Ir al chat del torneo» (principal), «Ver bracket» (secundario) y el link «Agregar al calendario».

**J12 · Torneo lleno**
- Detalle de un torneo lleno (por ejemplo, Clutch Masters Bogotá, CS2), con etiqueta LLENO.
- Aviso de advertencia «Cupos agotados: 16/16 inscritos. Únete a la lista de espera y te avisamos si se libera un cupo».
- Tarjeta «Lista de espera»: «Serías el #3 · suele liberarse 1 de cada 5 cupos».
- «Inscribirme» deshabilitado, «Unirme a la lista de espera» y el link «Ver torneos similares».

## Paso a paso

Caso: Johitan se inscribe en la Copa Relámpago Bogotá (1 vs 1, gratis).

### A. Descubrir

1. Johitan abre la app y llega a **Inicio (J06)**. Ve su próximo torneo, el torneo destacado y la lista «Para ti».
   - La lista «Para ti» mezcla criterios: sus juegos y otros torneos relevantes, ordenados por fecha. Los chips de juego (Todos, EA FC 25, Valorant, Fortnite…) filtran la lista.
   - En la tarjeta destacada puede tocar «Inscribirme» directamente.
   - «Ver todo» abre la lista completa de torneos (destino no mostrado; ver Preguntas abiertas).
2. Para buscar con más control va a la pestaña **Explorar (J07)**. Ahí puede:
   - Escribir en el buscador: torneos, juegos u organizadores.
   - Tocar un chip de juego para filtrar rápido.
   - Cambiar el orden («Más próximos»).
   - Tocar el botón de filtros para abrir **Filtros (J08)**.
3. En **Filtros (J08)** elige uno o varios juegos, la modalidad, la fecha (Hoy, Esta semana o Este mes), y si quiere ocultar torneos llenos o ver solo los cercanos (radio de 10 km en Bogotá). El botón principal muestra cuántos resultados da la combinación («Ver 4 resultados»).
   - «Limpiar» (arriba y abajo) borra todos los filtros.
   - «Ver N resultados» cierra la hoja y aplica los filtros a la lista de Explorar.
4. Toca una tarjeta de torneo (en Inicio o en Explorar) y abre el **Detalle (J09)**: la Copa Relámpago Bogotá.

### B. Decidir

5. En el **Detalle (J09)** revisa:
   - El estado, el juego y el formato.
   - La fecha, la hora y la entrada.
   - Cuántos cupos quedan (24/32, quedan 8).
   - Los premios y los puntos por puesto.
   - Las reglas.
   - Quién organiza (StreamerNova, verificado).
   - Hasta cuándo puede inscribirse («Cierra Sáb 6:00 pm»).
6. Desde aquí puede compartir el torneo, marcarlo con el corazón o seguir al organizador. Para estos tres controles no hay pantallas de destino (ver Preguntas abiertas).

### C. Inscribirse

7. Toca «Inscribirme». Se abre la hoja **Confirmar inscripción (J10)** sobre el Detalle.
8. Revisa el resumen: torneo, fecha y hora, modalidad, su ID público (que viene de su perfil y no se edita aquí) y la entrada «Gratis».
9. Marca la casilla «Acepto las reglas del torneo y el check-in obligatorio». Lee el aviso: puede cancelar hasta 1 h antes.
10. Toca «Confirmar inscripción». Pasa a **Inscripción confirmada (J11)**.
    - «Cancelar» cierra la hoja y vuelve al Detalle sin inscribirlo.
11. En J11 ve «¡ESTÁS DENTRO!», con fecha, hora, su seed (#13) y el estado CONFIRMADA. Desde aquí puede:
    - **Ir al chat del torneo**, que lleva al chat (flujo «jugador-competir», J15).
    - **Ver bracket**, que lleva al bracket (J16).
    - **Agregar al calendario.**
    - Cerrar con la X.

### D. Variante: torneo lleno

12. Johitan abre Clutch Masters Bogotá (CS2). El Detalle muestra la variante **Torneo lleno (J12)**: etiqueta LLENO, «Cupos agotados» y «Inscribirme» deshabilitado.
13. Ve su posible posición («Serías el #3») y la nota de que suele liberarse 1 de cada 5 cupos.
14. Toca «Unirme a la lista de espera». Queda en la lista de inmediato, el botón cambia a «En lista de espera · #N» y sale un toast de confirmación (no hay pantalla de esto; ver Preguntas abiertas).
15. Si prefiere otra opción, toca «Ver torneos similares».

## Estados

### Del torneo (etiqueta)
| Estado | Dónde se ve | Qué se puede hacer |
|---|---|---|
| ABIERTO | Tarjetas, Detalle | Inscribirse mientras haya cupos y no haya cerrado la inscripción. |
| EN CURSO | Tarjetas en Explorar | Se abre el Detalle con «Inscribirme» deshabilitado y un aviso de que las inscripciones cerraron. |
| LLENO | Tarjetas, Detalle (J12) | «Inscribirme» deshabilitado; se puede unir a la lista de espera. |

### De los cupos
- **Con cupos:** barra de progreso y texto «Quedan N cupos» en color de acento (24/32 → «Quedan 8 cupos»).
- **Sin cupos:** aviso de advertencia «Cupos agotados» con el total de inscritos (16/16).

### De la inscripción del jugador
| Estado | Dónde se ve |
|---|---|
| CONFIRMADA | J11. |
| En lista de espera (#N) | J12, después de unirse. |

### De los controles
- **Botón «Inscribirme»:** activo cuando hay cupos y la inscripción está abierta; deshabilitado cuando el torneo está lleno o en curso.
- **Filtros:** cada uno puede estar activo o no; el botón principal muestra el número de resultados de la combinación y «Limpiar» los desactiva todos.
- **Interruptores de Filtros:** «Solo con cupos disponibles» (activo en la pantalla) y «Cerca de mí» (inactivo).

## Qué pasa después

- **Mis torneos:** se espera que el torneo aparezca en «Mis torneos» (J13, flujo «jugador-competir»). Las pantallas de este flujo no lo muestran.
- **Check-in:** cuando abre el check-in, el jugador recibe un aviso (J11 lo promete: «Te avisaremos cuando abra el check-in»). El check-in ocurre en la sala del torneo (J14, flujo «jugador-competir»). Las reglas dicen que se hace 30 min antes. En Inicio (J06) el próximo torneo muestra la cuenta atrás y el botón «Check-in».
- **Cancelar la inscripción:** se hace desde la sala del torneo (J14), antes del check-in y hasta 1 h antes. El cupo se libera para la lista de espera.
- **Lista de espera:** J12 dice «te avisamos si se libera un cupo». El mecanismo exacto no está definido (ver Preguntas abiertas).
- **Chat y bracket:** «Ir al chat del torneo» lleva a J15 y «Ver bracket» lleva a J16, ambas de otros flujos.
- **Cupos:** al inscribirse, el contador de cupos del torneo (por ejemplo 24/32) aumenta en uno.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia la base de datos en Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Torneo**
- Nombre, juego, portada, estado (abierto, en curso, lleno, otros).
- Modalidad (por ejemplo 1 vs 1) y formato (por ejemplo eliminación directa).
- Fecha y hora de inicio, ciudad.
- Cupos totales y cupos ocupados (derivado de las inscripciones).
- Entrada (gratis en el MVP).
- Premios y puntos por puesto (1.º, 2.º y 3.º).
- Reglas (lista de textos).
- Cierre de inscripciones, y hora de apertura del check-in.
- Organizador.

**Juego**
- Nombre, color de portada y emblema (para el arte de las tarjetas).

**Organizador**
- Nombre, avatar, si está verificado, cantidad de torneos organizados.

**Jugador (el que usa la app)**
- Nombre, avatar, nivel, puntos.
- ID público (el que se captura al crear la cuenta).
- Juegos de interés (para «Para ti»).
- Ubicación o ciudad (para «Cerca de mí»).

**Inscripciones, para calcular y mostrar**
- Cupos ocupados por torneo.
- Orden de inscripción (seed).
- Lista de espera y posición.

### Se escribe

**Inscripción individual**
- Jugador, torneo, estado (confirmada), fecha y hora de inscripción, seed (orden de inscripción, fijo).
- Aceptación de reglas y check-in.

**Lista de espera**
- Jugador, torneo, posición, fecha de ingreso.

### Reglas que dicen las pantallas
- La inscripción exige aceptar las reglas del torneo y el check-in obligatorio (J10).
- El seed es el orden de inscripción y queda fijo.
- La inscripción puede cancelarse hasta 1 h antes (J10), y el cupo se libera para la lista de espera.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Acceso y registro** (J00 a J05): crear cuenta, ingresar, recuperar acceso y elegir juegos en el onboarding (J02).
- **jugador-competir** (J13, J14, J15, F1): Mis torneos, la sala del torneo con el check-in y la cancelación de la inscripción, el chat y el resultado final. Aquí solo se describe a dónde se llega desde J11.
- **1v1-bracket** (J16, J16b, J17) y las otras modalidades (Battle royale y bracket-por-puntos): el bracket, el reporte de resultados y las pruebas.
- **jugador-progreso-y-cuenta** (J18 a J23): perfil, historial, rankings, notificaciones y ajustes. La campana de Inicio lleva a Notificaciones (J22).
- **Estado vacío sin torneos** (J24, V1, V3, V4, V5).
- **Organizador:** crear y publicar el torneo, gestionarlo, cerrarlo y ver sus estadísticas y perfil.
- **incidencias-de-partido** (disputas y W.O.).
- **Pagos:** el UI kit describe métodos de pago (Nequi, PSE, Tarjeta), pero el MVP es gratuito y las pantallas de este flujo solo muestran «Gratis».
- **Perfil público del organizador** (el botón «Seguir» y «Ver perfil») y **favoritos** (el corazón): no hay pantallas.

## Preguntas abiertas

**Pendientes de definir**

1. **Cancelación: desde cuándo se cuenta «1 h antes».** J10 dice «Puedes cancelar hasta 1 h antes». ¿Es 1 h antes de la hora de inicio del torneo (7:00 pm) o de la apertura del check-in (30 min antes, según las reglas)? Además, el flujo de cancelación está en la sala del torneo (J14), de otro flujo: hay que confirmarlo en esa spec.
2. **Lista de espera: qué pasa al liberarse un cupo.** Cuando alguien cancela, ¿el primero de la lista se inscribe solo, o recibe una notificación y tiene que confirmar él mismo? Si confirma él mismo, ¿con qué tiempo límite? Tampoco está definido qué ve el jugador que se queda sin cupo ni qué pasa con su posición.
3. **Lista de espera: pantalla de confirmación.** Se decidió que al unirse el botón cambia a «En lista de espera · #N» y sale un toast, pero esa variante del Detalle no está en Figma. Falta la pantalla de J12 ya unido, y cómo se sale de la lista.
4. **Seed y cancelaciones.** El seed es el orden de inscripción y queda fijo. Si alguien cancela, su número queda vacío. ¿Se reasignan los seeds, o se compactan al generar el bracket?
5. **Controles sin pantalla de destino:**
   - **Ícono QR** en Explorar (J07): ¿qué hace? Posible uso: escanear el código de un torneo y abrir su Detalle.
   - **Corazón** en el Detalle (J09): ¿dónde se ven después los torneos guardados?
   - **«Seguir»** al organizador: ¿qué significa seguir y qué recibe el jugador (avisos de nuevos torneos)? Además, ¿lleva a un perfil público del organizador? Existe O17 «Perfil del organizador», pero es del flujo del organizador.
6. **Criterio exacto de «Para ti».** Se sabe que es un criterio mixto (juegos del jugador más otros torneos) ordenado por fecha, pero falta la regla concreta: cuántos torneos, cuántos de cada tipo, y de dónde salen los chips (Todos, EA FC 25, Valorant, Fortnite).
7. **«Ver todo» en Inicio.** Se asume que lleva a Explorar, pero la pantalla no lo muestra. ¿Con qué filtros llega?

**Observaciones sobre las pantallas (posibles pantallas o ajustes que faltan en Figma)**

8. **Casilla de reglas.** En J10 hay una casilla de aceptación. ¿El botón «Confirmar inscripción» está deshabilitado hasta marcarla? No hay pantalla del estado sin marcar ni del error.
9. **Sin resultados, carga y errores.** No hay pantalla para: búsqueda o filtros sin resultados, lista cargando, error de red, o error al inscribirse (por ejemplo, el último cupo se ocupó mientras confirmaba).
10. **Cierre de inscripciones.** J09 muestra «Cierra Sáb 6:00 pm», pero no hay pantalla de un torneo con la inscripción cerrada y cupos libres. Tampoco está claro si «EN CURSO» es el único estado en que se cierra.
11. **Destino del botón cerrar (X) en J11.** No se ve si vuelve al Detalle, a Inicio o a Mis torneos.
12. **«Ver bracket» antes de generarse.** En J11 el bracket todavía no existe (se genera después del check-in). ¿Qué ve el jugador? El UI kit tiene el estado «El bracket aún no se publica», pero es de la spec del bracket.
13. **Filtros: coherencia con Explorar.**
    - Los chips de juego de J08 son EA FC 25, Valorant, CS2 y LoL, pero Explorar también lista Fortnite y Rocket League. ¿El filtro muestra todos los juegos disponibles o solo los populares?
    - «Cerca de mí» muestra «Bogotá · radio de 10 km»: ¿pide permiso de ubicación? ¿Qué pasa fuera de Bogotá?
    - Los filtros activos no se ven en Explorar una vez cerrada la hoja (los chips muestran «Todos» aunque haya filtros).
    - La pantalla de Filtros muestra «Ver 4 resultados» pero Explorar dice «6 torneos»; es coherente con filtrar, pero no hay pantalla del resultado.
14. **Orden de la lista.** Explorar muestra «Más próximos». ¿Qué otras opciones hay (más cupos, recientes)?
15. **Inscripción en torneos que se cruzan.** ¿Puede inscribirse en dos torneos a la misma hora? Las pantallas no lo restringen ni avisan.
16. **Entradas de pago.** El UI kit describe una variante «Paga» con métodos de pago, que el MVP no incluye. ¿Se deja la entrada «Gratis» fija en estas pantallas y se limpia el kit?

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Equipos queda fuera del MVP de forma definitiva: el MVP solo tiene jugadores individuales, y no existen equipos, escuadras ni integrantes en esta spec ni en sus pantallas. |
| 2026-10-27 | Revisión del PR #3. Se usa solo el ID público único que se captura al crear la cuenta: no hay ID por juego ni Gamertag, y se borra la pregunta sobre el Gamertag ausente. |
| 2026-10-27 | Revisión del PR #3 (puntos). Los puntos de ranking de los premios siguen la regla única 100 × (N − puesto + 1) / N, y se borra la pregunta sobre los puntos definidos por el organizador. |
