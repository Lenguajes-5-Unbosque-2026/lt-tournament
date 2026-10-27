# Jugador · Progreso y cuenta

Carpeta de pantallas: `design/flujos/jugador-progreso-y-cuenta/`

## Quién y para qué

**Quién:** el jugador, con la cuenta en modo Jugador (acento naranja), que ya ha jugado algún torneo.

**Para qué:** ver su progreso y gestionar su cuenta.
- **Perfil competitivo (J18):** sus datos, logros y últimos torneos.
- **Historial (J19):** todos sus torneos, filtrables por juego.
- **Ranking de amigos (J21):** cómo le va frente a sus amigos, y retarlos a un partido amistoso.
- **Notificaciones (J22):** los avisos de la app.
- **Ajustes y cuenta (J23):** el modo de la app (Jugador u Organizador), las notificaciones y la cuenta.

**Por qué importa:** es la otra mitad de la propuesta de valor del jugador («ver su progreso: puestos, historial y cómo le va frente a sus amigos»), y es el tercer frente del MVP: la capa de rankings y reputación. Es lo que le da al jugador una razón para volver después de cada torneo.

**Resultado:** el jugador entiende cuánto ha avanzado (puntos, nivel, logros, historial), se compara con sus amigos y controla su cuenta y sus avisos.

**Alcance del MVP:**
- El ranking es **solo entre amigos**. Se eliminan el ranking Global y el ranking Por juego (J20).
- Los puntos de ranking se suman **solo al cerrar el torneo**, según el puesto final (ver «Datos que usa»).
- «Retar» es un partido amistoso 1 contra 1 entre amigos, fuera de los torneos, y no suma puntos.
- El jugador agrega amigos con un enlace de invitación y con una búsqueda de usuarios con solicitud de amistad.

**Caso de ejemplo para el paso a paso:** Johitan, después de varios torneos (Nivel 12, 1.240 pts). Revisa su perfil (J18), abre su historial (J19), se compara con sus amigos (J21), revisa sus avisos (J22) y, en Ajustes (J23), cambia al modo Organizador.

## Pantallas

| ID | Pantalla | Qué es |
|---|---|---|
| J18 | Perfil competitivo | Pestaña raíz del jugador. Datos, estadísticas, logros y últimos torneos. |
| J19 | Historial | Lista de todos sus torneos, con filtro por juego. |
| J20 | Rankings | **Se elimina.** Ranking Global y Por juego (podio y lista). No entra al MVP. |
| J21 | Rankings · Amigos | Pestaña raíz del jugador. Ranking entre amigos, invitación y «Retar». |
| J22 | Notificaciones | Lista de avisos agrupados por día. |
| J23 | Ajustes y modo | Modo de la app, notificaciones y cuenta. |

### Qué muestra cada pantalla

**J18 · Perfil competitivo**
- Barra superior con el botón de compartir y un botón de ajustes.
- Avatar con anillo de acento, nombre en display («JOHITAN») y «@johitan · Bogotá · desde 2025».
- Etiquetas «TOP 5 · EA FC 25» y «NIVEL 12».
- Segmento «Jugador / Organizador» (activo: Jugador).
- Tres datos: «14 Torneos», «38 Victorias» y «1º Mejor puesto».
- Sección «Logros»: tres tarjetas con un objeto 3D: «Primer título · Liga Nocturna», «Racha x5 · 5 victorias» y «Top 10 · EA FC 25».
- Sección «Últimos torneos» con el link «Ver todo»: «1º Liga Nocturna FC · EA FC 25 · 64 jugadores · +60» y «5º Copa Chapinero · EA FC 25 · 32 jugadores · +27».
- Barra de navegación con Perfil activo.

**J19 · Historial**
- Barra superior con volver y «Historial competitivo».
- Chips de juego: Todos (activo), EA FC 25, Valorant y Fortnite.
- Tres datos: «14 Jugados», «62% Victorias» y «1.240 Puntos».
- Lista de torneos, cada uno con el puesto, el nombre, el juego, la cantidad de participantes (o la modalidad), la fecha y los puntos ganados:
  - 1º · Liga Nocturna FC · EA FC 25 · 64 jugadores · 21 Sep · +60.
  - 2º · Victory Royale Cup #3 · Fortnite · 14 Sep · +45.
  - 5º · Copa Chapinero · EA FC 25 · 32 jugadores · 7 Sep · +27.
  - 3º · Liga Nocturna · Valorant · 30 Ago · +40.
  - 12º · Open Bogotá · EA FC 25 · 128 jugadores · 16 Ago · +8.

**J20 · Rankings (se elimina)**
- Título «RANKINGS», botón de búsqueda y pestañas Global (activa), Por juego y Amigos.
- Chips de juego (EA FC 25, Valorant, CS2).
- Podio (NovaK 2.310 pts, Sh4dow 1.980, Mafe 1.720) y lista (ZeroX 1.410, Johitan · Tú 1.240 con «↑ 2 puestos esta semana», Kairo 1.105 y Lupe 980).
- Esta pantalla no entra al MVP, porque solo queda el ranking entre amigos.

**J21 · Rankings · Amigos**
- Título «RANKINGS», botón de búsqueda y pestañas Global, Por juego y Amigos (activa). Con la decisión de dejar solo el ranking de amigos, las pestañas se quitan.
- Tarjeta con borde de acento «Compite con tus amigos»: «Invítalos y comparen su progreso en todos los juegos», con el botón «Compartir invitación».
- Lista de amigos, cada uno con avatar, nombre, un dato y los puntos:
  - Sh4dow · «Te ganó en Valorant» · 1.980 pts · botón «Retar».
  - Johitan (fila propia, resaltada) · «Tú · 1.240 pts».
  - Vale · «Racha de 3 victorias» · 1.010 pts · botón «Retar».
  - Rex · «Nuevo en LTournaments» · 760 pts · botón «Retar».
- Barra de navegación con Rankings activo.

**J22 · Notificaciones**
- Barra superior con volver, título «Notificaciones» y un botón con un check.
- Grupo «HOY»:
  - «Check-in abierto» · «Copa Relámpago · cierra 6:30 pm» · «Ahora» (resaltado con borde de acento).
  - «Resultado validado» · «Ganaste 2–0 a Kairo · +15 pts» · «2 h».
  - «Sh4dow te retó» · «Partido amistoso de Valorant» · «3 h».
- Grupo «ESTA SEMANA»:
  - «Inscripción confirmada» · «Liga Nocturna · Vie 10 Oct» · «Lun».
  - «Nuevo torneo cerca» · «Grieta Andina · League of Legends» · «Dom».
  - «Subiste al puesto 5» · «Ranking global de EA FC 25» · «Sáb».

**J23 · Ajustes y modo**
- Barra superior con volver y «Ajustes y cuenta».
- «MODO DE LA APP»: dos tarjetas de selección, «Jugador» («Explora y compite», elegida) y «Organizador» («Crea y gestiona»).
- Aviso informativo «Una sola cuenta»: «Cambia entre jugador y organizador cuando quieras; tu historial se conserva.»
- «NOTIFICACIONES»: tres interruptores:
  - «Check-in y partidos» («Avisos 1 h y 15 min antes», activo).
  - «Mensajes del chat» («Solo menciones y anuncios», activo).
  - «Torneos recomendados» («Máximo 2 por semana», inactivo).
- «CUENTA»: filas «Editar perfil» y «Privacidad y seguridad», y el botón «Cerrar sesión».

## Paso a paso

Caso: Johitan revisa su progreso y ajusta su cuenta.

### A. Ver el perfil

1. Johitan toca **Perfil** en la barra de navegación y ve **Perfil competitivo (J18)**. Ve:
   - Su nivel (12) y su juego (la etiqueta junto al nivel).
   - Cuántos torneos jugó (14), cuántas victorias tiene (38) y su mejor puesto (1º).
   - Sus logros y sus últimos torneos con los puntos que ganó en cada uno.
2. Puede tocar:
   - **Ver todo** en «Últimos torneos», que abre el historial (J19).
   - **Compartir** (arriba a la izquierda). El contenido que se comparte no está definido.
   - **Ajustes** (arriba a la derecha), que abre Ajustes y cuenta (J23). Se asume por el botón; el destino no se ve.
   - El segmento **Jugador / Organizador**, que cambia el modo de toda la app (ver sección F).

### B. Ver el historial

3. En **Historial (J19)** ve cuántos torneos jugó (14), el porcentaje de victorias (62%) y sus puntos totales (1.240).
4. Debajo ve la lista de todos sus torneos: el puesto, el nombre, el juego, los participantes o la modalidad, la fecha y los puntos que ganó.
5. Con los chips de juego (Todos, EA FC 25, Valorant, Fortnite) filtra la lista. Qué filtran los datos de arriba no se ve (ver Preguntas abiertas).

### C. Compararse con sus amigos

6. Johitan toca **Rankings** en la barra de navegación y ve **Rankings · Amigos (J21)**, el único ranking del MVP. Ve una lista de sus amigos con los puntos de cada uno, y su propia fila resaltada («Tú · 1.240 pts»).
7. Para sumar amigos puede:
   - Tocar **«Compartir invitación»**, que comparte un enlace. Quien lo abre se vuelve su amigo.
   - Buscar a alguien con el botón de **búsqueda** (la lupa) y enviarle una solicitud de amistad, que el otro acepta. Estas pantallas no están dibujadas (ver Preguntas abiertas).
8. Para retar a un amigo toca **«Retar»** en su fila. Un reto es un partido amistoso 1 contra 1, fuera de los torneos:
   - El amigo recibe una notificación («Sh4dow te retó · Partido amistoso de Valorant»).
   - Lo acepta, lo juega y se reporta el resultado.
   - No suma puntos de ranking.
   - Ninguna de estas pantallas está dibujada.

### D. Ver las notificaciones

9. Johitan abre **Notificaciones (J22)** desde la campana de Inicio. Ve los avisos, agrupados por «Hoy» y «Esta semana», con la hora o el día.
10. Al tocar un aviso, va a su pantalla:
    - **Check-in abierto:** a la Sala del torneo (J14).
    - **Resultado validado:** al bracket del torneo (J16) o a su historial.
    - **Te retó:** al reto (sin pantalla).
    - **Inscripción confirmada:** a la Sala del torneo o a Mis torneos.
    - **Nuevo torneo cerca:** al Detalle del torneo (J09).
11. El botón con el check de la barra superior parece marcar todo como leído (se asume por el ícono; ver Preguntas abiertas).

### E. Ajustar la cuenta

12. Desde **Ajustes y cuenta (J23)** Johitan puede:
    - Cambiar el **modo de la app** (sección F).
    - Activar o desactivar los avisos de **check-in y partidos**, de **mensajes del chat** y de **torneos recomendados**.
    - Abrir **Editar perfil** o **Privacidad y seguridad** (sin pantalla). En Editar perfil se cambia el ID de jugador y se elige el juego principal (decidido en otras specs).
    - Tocar **Cerrar sesión**.

### F. Cambiar de modo

13. Johitan toca la tarjeta **«Organizador»** en Ajustes (o el segmento «Organizador» del perfil). Cualquiera de los dos controles cambia el modo de **toda la app**: la navegación, el acento (naranja o azul) y las pantallas.
14. La cuenta es una sola, y su historial se conserva al cambiar de modo. Johitan llega al Panel del organizador (flujo «organizador-panel-y-creacion»).

## Estados

### De la pantalla de perfil (J18)
| Estado | Qué muestra |
|---|---|
| Con historial | Estadísticas, logros y últimos torneos (los que se ven en la pantalla). |
| Sin historial | «Tu historial está vacío» (ver la spec «estado-vacio-sin-torneos», V4). |

### De un torneo en el historial (J18 y J19)
- **Puesto:** el número a la izquierda (1º, 2º, 3º, 5º, 12º), con un color distinto para los tres primeros.
- **Puntos:** el valor a la derecha, en verde (por ejemplo, «+60»).

### Del ranking de amigos (J21)
| Estado | Qué muestra |
|---|---|
| Fila propia | Borde de acento y «Tú», sin botón «Retar». |
| Amigo con dato | Una línea de contexto («Te ganó en Valorant», «Racha de 3 victorias», «Nuevo en LTournaments») y los puntos. |
| Sin amigos | No se ve en las pantallas. |

### De las notificaciones (J22)
| Estado | Qué muestra |
|---|---|
| Aviso reciente / urgente | Borde de acento y la etiqueta «Ahora» («Check-in abierto»). |
| Aviso normal | Ícono, título, descripción y la hora («2 h», «3 h») o el día («Lun», «Dom», «Sáb»). |
| Sin avisos | No se ve en las pantallas. |

### De los ajustes (J23)
| Control | Estados |
|---|---|
| Modo de la app | Jugador (elegido) u Organizador. |
| Notificaciones | Activado o desactivado, uno por tipo de aviso. |

### Estados que las pantallas no muestran
- Perfil de otro jugador (público) y solicitudes de amistad.
- Historial filtrado por un juego y sin torneos.
- Ranking de amigos sin amigos, y los reportes de «Retar».
- Notificaciones sin avisos, leídas y no leídas.
- Pantallas de Editar perfil y de Privacidad y seguridad.
- Cerrar sesión: confirmación y a dónde lleva.
- Errores de red o de carga.

## Qué pasa después

- **Después de cada torneo:** al cerrar el torneo, los puntos de ranking se suman al perfil, el torneo entra en el historial y el nivel se actualiza (flujos «eliminacion-directa-bracket», «battle-royale-bracket» y «bracket-por-puntos»). Los tres primeros reciben además el Resultado final (F1).
- **Nivel:** el nivel sale de los puntos totales acumulados, con umbrales por nivel (los umbrales no están definidos).
- **Ranking de amigos:** el jugador ve a sus amigos ordenados por puntos totales.
- **Retar:** cuando un amigo reta al jugador, le llega una notificación. Aceptar, jugar y reportar el reto no tiene pantallas.
- **Invitaciones:** quien abre el enlace de invitación se registra (flujo «acceso-y-registro») y queda como amigo de quien invitó. Una solicitud de amistad que se acepta deja a los dos como amigos.
- **Cambio de modo:** pasa a modo Organizador, con su navegación y su panel (flujo «organizador-panel-y-creacion»).
- **Cerrar sesión:** cierra la sesión y lleva a la pantalla de bienvenida (flujo «acceso-y-registro», J01). Se asume por el nombre; el destino no se ve.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Del jugador**
- Nombre, usuario (@johitan), avatar, ciudad y fecha de registro.
- Juego principal (que elige el jugador).
- Nivel y puntos totales.
- Estadísticas: torneos jugados, victorias, porcentaje de victorias y mejor puesto.

**Logros**
- Nombre, objeto 3D y descripción (por ejemplo, «Primer título · Liga Nocturna», «Racha x5 · 5 victorias»).

**Historial de torneos**
- Por torneo: puesto final, nombre, juego, cantidad de participantes o modalidad, fecha y puntos ganados.

**Amigos**
- Lista de amigos, con nombre, avatar, puntos totales y un dato de contexto (último resultado, racha o «Nuevo en LTournaments»).
- Solicitudes de amistad enviadas y recibidas.

**Notificaciones**
- Por aviso: tipo, título, descripción, fecha y hora, torneo o persona relacionada, y si fue leído.

**Ajustes**
- Modo actual y preferencias de notificación.

### Se escribe

**Puntos de ranking** (al cerrar un torneo)
- Jugador, torneo, puesto final y puntos (ver la regla abajo).

**Amistad**
- Quién invita a quién (enlace o solicitud) y estado (pendiente o aceptada).

**Reto (partido amistoso)**
- Retador, retado, juego, estado (enviado, aceptado, jugado) y resultado. No suma puntos.

**Modo y ajustes**
- Modo actual, interruptores de notificaciones.

**Cuenta**
- ID de jugador, juego principal y datos del perfil (desde Editar perfil).

### Reglas de puntos de ranking

Los puntos se suman **solo al cerrar el torneo**, según el puesto final, con esta regla de tres:

> **Puntos = 100 × (N − puesto + 1) / N**, donde N es la cantidad de jugadores del torneo. Se redondea al entero más cercano.

- El primer puesto suma siempre 100. El último suma 100 / N.
- En una eliminación directa, los participantes eliminados en la misma ronda comparten el **mejor puesto del grupo**. El 3.º sale del partido por el tercer puesto, y el 4.º es su perdedor.

Ejemplos:
- **Eliminación directa de 16 jugadores:** el campeón suma 100, el 2.º suma 94, el 3.º suma 88, el 4.º suma 81, los eliminados en Cuartos (5.º) suman 75 y los eliminados en Octavos (9.º) suman 50.

### Otras reglas que dicen las pantallas
- El ranking es solo entre amigos. No hay ranking global ni por juego.
- Un reto es un partido amistoso 1 contra 1 fuera de los torneos, y no suma puntos.
- Los amigos se agregan con un enlace de invitación o con una búsqueda y una solicitud de amistad.
- Cada tipo de notificación lleva a su pantalla.
- El nivel sale de los puntos totales acumulados.
- Los dos controles de cambio de modo (perfil y ajustes) cambian el modo de toda la app. Hay una sola cuenta, y el historial se conserva.
- Las notificaciones de check-in y partidos avisan 1 h y 15 min antes.
- Las notificaciones de torneos recomendados son como máximo 2 por semana.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Registro y onboarding** (J00 a J05), de donde salen el ID y los juegos del jugador.
- **Estados vacíos de Perfil y Rankings** (V3, V4), en «estado-vacio-sin-torneos».
- **Mis torneos, Sala y chat** (J13 a J15) y **Resultado final** (F1), en «jugador-competir».
- **Inscribirse y Detalle del torneo** (J06 a J12), destino de algunas notificaciones.
- **Bracket y cierre de los torneos** (J16, O12, O15 y las otras modalidades), donde se calculan los puntos.
- **Modo Organizador** (panel, perfil del organizador O17, crear y gestionar), en el flujo del organizador.
- **Perfil público de otro jugador:** el UI kit lo describe (avatar con anillo, «Retar» y «Agregar amigo»), pero no hay pantalla.

No entra al MVP, aunque está en el diseño:
- **Ranking Global y Por juego** (J20 y las pestañas de J21).

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Eliminar el ranking Global y Por juego.** J20 se elimina, y las pestañas Global y Por juego se quitan de J21. Rankings queda con el ranking de amigos. También cambia el estado vacío de Rankings (V3, en la spec «estado-vacio-sin-torneos»), que muestra Global y chips de juego. El Brief pide «ranking dentro de cada juego» y hay que alinearlo.
2. **Notificaciones.** «Subiste al puesto 5 · Ranking global de EA FC 25» ya no aplica, porque se elimina el ranking global. «Resultado validado · +15 pts» ya no aplica, porque los puntos se suman solo al cerrar el torneo.
3. **Etiqueta «TOP 5 · EA FC 25» (J18).** Se refería a un ranking global que se elimina. Debería mostrar el juego principal del jugador, o la posición entre amigos, o quitarse.
4. **Puntos del historial.** J18 y J19 muestran +60, +45, +27, +40 y +8, que no siguen la regla de puntos nueva (por ejemplo, un 1.º de 64 jugadores suma 100, y un 12.º de 128 suma 100 × 117 / 128 ≈ 91).
5. **Retar sin pantallas.** Falta lanzar el reto, la notificación al amigo, aceptar o rechazar, jugarlo y reportar el resultado (sin puntos).
6. **Amigos sin pantallas.** Falta la búsqueda de usuarios, las solicitudes de amistad enviadas y recibidas, y el perfil público de otro jugador desde donde se agrega o se reta.
7. **Editar perfil y Privacidad y seguridad.** No tienen pantallas. En Editar perfil se cambia el ID y se elige el juego principal (decidido en otras specs).

**Pendientes de definir**

8. **Agrupación de los puntos del ranking de amigos.** No se respondió si el ranking de amigos usa los puntos totales de todos los juegos o permite filtrar por juego. J21 dice «comparen su progreso en todos los juegos» y no tiene chips, así que se asume el total.
9. **Umbrales de nivel.** El nivel sale de los puntos totales, pero no están definidos los puntos que hacen falta para cada nivel, ni qué pasa al subir (aviso, logro).
10. **Logros.** No se ve qué logros existen ni cómo se ganan («Primer título», «Racha x5», «Top 10 · EA FC 25»). «Top 10» depende de un ranking que se elimina.
11. **Historial: filtros y estadísticas.** ¿Los chips de juego filtran también los tres datos de arriba (jugados, victorias y puntos)? ¿Cómo se calcula el «62% Victorias» (victorias sobre partidos jugados) y qué cuenta como victoria («38 Victorias» en J18)?
12. **Quien pierde por W.O.** La spec de «incidencias-de-partido» dice que el torneo cuenta como jugado pero «sin puntos». Con la regla de tres, todos suman al menos 100 / N. Hay que decidir si el jugador eliminado por W.O. suma los puntos de su puesto o ninguno.
13. **Cálculo de N y de los puestos.**
    - ¿Cuenta en N un jugador descalificado o que nunca hizo check-in?
    - En una Liga y en Rondas suizas, el puesto sale de la tabla de posiciones: ¿cómo se desempata?
    - ¿Qué pasa con los puntos si el torneo se cancela?
14. **Notificaciones.**
    - El botón con el check parece marcar todo como leído (se asume por el ícono).
    - No se ve cómo se distinguen los avisos leídos de los no leídos.
    - Faltan tipos de aviso: disputa, W.O., lista de espera, mensajes del organizador, solicitudes de amistad y reto aceptado.
    - Faltan interruptores para los avisos de amistad y retos.
15. **Cambio de modo desde el perfil.** Se decidió que el segmento del perfil y las tarjetas de Ajustes cambian el modo de toda la app. ¿El segmento «Organizador» del perfil lleva al Panel o muestra el perfil del organizador (O17)?
16. **Privacidad.** Un jugador de las entrevistas quería decidir qué información ven los demás. «Privacidad y seguridad» no tiene pantalla, y no se sabe si un amigo ve todo el historial o solo los puntos.
17. **Compartir.** El botón de compartir del perfil no muestra qué se comparte ni con qué formato.
18. **Cerrar sesión.** ¿Pide confirmación (el UI kit pide un diálogo propio para acciones destructivas)? ¿A dónde lleva?
19. **Otras specs afectadas por las nuevas reglas de ranking.** Hay que revisar «estado-vacio-sin-torneos» (V3), «eliminacion-directa-bracket», «battle-royale-bracket», «bracket-por-puntos» (los puntos del podio ya no vienen de la configuración del organizador, y ya no son +300, +150 y +80), «jugador-competir» (F1: «+150 Pts de ranking» y «↑3 Puestos en EA FC») y «jugador-descubrir-e-inscribirse» (los premios con puntos del Detalle, J09).

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Versión inicial. Basada en las pantallas J18 a J23, y en las respuestas del equipo: los puntos se suman solo al cerrar el torneo con la regla 100 × (N − puesto + 1) / N, redondeada al entero más cercano (en eliminación directa, el grupo eliminado comparte el mejor puesto); se elimina el ranking Global y Por juego, y queda solo el de amigos; «Retar» es un partido amistoso sin puntos; los amigos se agregan con enlace y búsqueda con solicitud; cada notificación lleva a su pantalla; el nivel sale de los puntos totales; y los dos controles de cambio de modo cambian toda la app. |
| 2026-10-27 | Revisión del PR #3. Equipos queda fuera del MVP de forma definitiva: en la regla de puntos N es la cantidad de jugadores del torneo, y se quitan las reglas de equipos e integrantes, el ejemplo de 4 equipos y las preguntas sobre equipos y dúos. |
