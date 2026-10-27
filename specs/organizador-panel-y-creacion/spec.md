# Organizador · Panel y creación

Carpeta de pantallas: `design/flujos/organizador-panel-y-creacion/`

## Quién y para qué

**Quién:** el organizador (modo Organizador, acento azul), con su cuenta ya creada.

**Para qué:** crear y publicar un torneo, y tener a mano todos los suyos.
- **Panel (O01):** sus números (en curso, inscritos, finalizados), el acceso a «Crear un nuevo torneo» y su lista de torneos (Todos, En curso y Borradores).
- **Crear torneo en 4 pasos (O02 a O05):** información, formato y cupos, fecha y reglas, y revisar y publicar. El paso 2 tiene una pantalla por tipo de juego (O03, O03b y O03c) y tres pantallas de cupos personalizados.
- **Torneo publicado (O06):** confirmación, enlace para compartir y accesos a gestionar o a ver el torneo como jugador.

**Por qué importa:** sin torneos publicados no hay nada que el jugador encuentre: es la oferta del producto. La promesa es «4 pasos · menos de 5 minutos. Publícalo y compártelo», es decir, bajar la barrera para organizar. Las entrevistas dicen que más control significa más torneos.

**Resultado:** el torneo queda publicado en Explorar, con un enlace para compartir, listo para recibir inscripciones.

**Alcance del MVP:**
- La inscripción es gratuita.
- El **tipo de juego es fijo por juego**: el organizador elige el juego y el tipo (Equipo vs equipo, Battle royale o Por puntos) viene determinado.
- El **Nivel 1 puede crear torneos de hasta 32 cupos**. Subir de nivel desbloquea 64 y más.
- Para publicar hay que completar los 4 pasos.
- Al abrir un borrador, el asistente retoma en el paso donde se quedó.
- «Premios» es un texto libre. Los puntos de ranking los calcula el producto (no se escriben).

**Caso de ejemplo para el paso a paso:** StreamerNova (Nivel 1) crea la **Copa Relámpago Bogotá** (EA FC 25, sábado 4 de octubre, 7:00 pm, gratis). Desde el panel toca «Empezar», recorre los 4 pasos, publica, comparte el enlace y va a gestionar.

## Pantallas

| ID | Pantalla | Qué es |
|---|---|---|
| O01 | Panel del organizador | Pestaña raíz del organizador. Números, acceso a crear y lista de torneos. |
| O02 | Crear · Información | Paso 1 de 4: portada, juego, nombre y descripción. |
| O03 | Crear · Formato · Equipo vs equipo | Paso 2 de 4 para el tipo Equipo vs equipo. |
| O03b | Crear · Formato · Battle royale | Paso 2 de 4 para el tipo Battle royale. |
| O03c | Crear · Formato · Por puntos | Paso 2 de 4 para el tipo Por puntos. |
| EvE · O1b | Cupos personalizados | Variante de O03 con «Otro» elegido en los cupos. |
| BR · O1b | Cupos personalizados | Variante de O03b con «Otro» elegido en los jugadores. |
| PTS · O1b | Cupos personalizados | Variante de O03c con «Otro» elegido en los participantes. |
| O04 | Crear · Fecha y reglas | Paso 3 de 4: fecha, hora, cierre de inscripciones, check-in, reglas y premios. |
| O05 | Crear · Revisión y publicar | Paso 4 de 4: vista previa, resumen editable y publicar. |
| O06 | Torneo publicado | Confirmación, enlace y accesos. |

### Qué muestra cada pantalla

**O01 · Panel del organizador**
- Cabecera con avatar, «StreamerNova», la etiqueta «MODO ORGANIZADOR · NIVEL 1» y la campana de notificaciones.
- Título «TU PANEL DE TORNEOS» y tres datos: «2 En curso», «56 Inscritos» y «7 Finalizados».
- Tarjeta «CREA UN NUEVO TORNEO»: «4 pasos · menos de 5 minutos. Publícalo y compártelo.», un trofeo 3D y el botón «+ Empezar».
- Sección «Mis torneos» con el link «Ver todo» y un segmento: Todos (activo), En curso y Borradores.
- Tarjetas de torneo (juego, nombre, fecha y hora, cupos y una etiqueta de estado):
  - EA FC 25 · Copa Relámpago Bogotá · ABIERTO · Sáb 4 Oct · 7:00 pm · 24/32.
  - Fortnite · Victory Royale Cup · EN CURSO · Hoy · 6:00 pm · 48/50.
  - League of Legends · Grieta Andina · BORRADOR · Sáb 18 Oct · 3:00 pm · 9/16.
- Barra de navegación del organizador: Panel (activo), Torneos, «+», Chat y Perfil.

**O02 · Crear · Información**
- Botón cerrar (X), título «Crear torneo» y subtítulo «Paso 1 de 4 · Información», con una barra de 4 pasos.
- Zona punteada «Sube la portada» («Recomendado 1200×750 · JPG o PNG»).
- Sección «Juego»: 6 tarjetas con portada (EA FC 25, Valorant, CS2, League of Legends, Fortnite y Rocket League); EA FC 25 está elegido, con un check.
- Nota: «EA FC 25 es Equipo vs equipo. En el siguiente paso puedes cambiar el tipo: Equipo vs equipo, Battle royale o Por puntos.»
- Campo «Nombre del torneo» («Copa Relámpago Bogotá», contador «21/60 caracteres»).
- Campo «Descripción» («Torneo 1v1 de FC 25 para la comunidad de Bogotá. Premios al top 3.», ayuda «Cuenta qué hace especial tu torneo»).
- Botones «Continuar» y «Guardar borrador».

**O03 · Crear · Formato · Equipo vs equipo**
- Barra superior con volver y «Crear torneo · Paso 2 de 4 · Formato».
- «TIPO DE JUEGO»: tres tarjetas (Equipo vs equipo «Equipos de 1 a 5», Battle royale «Hasta 100 jugadores» y Por puntos «Liga, rondas o récord»); activa la de Equipo vs equipo.
- «FORMATO»: tres opciones: «Eliminación directa» (RECOMENDADO, «Quien pierde queda fuera»), «Doble eliminación» («Segunda oportunidad por llave inferior») y «Fase de grupos» («Todos contra todos y luego llaves»).
- «Jugadores por equipo» (contador con − y +, valor 3, «3 vs 3 · de 1 a 5 por equipo») y chips 1, 2, 3, 4, 5 y Otro.
- «Cupos» («Equipos · potencias de 2», valor 16) y chips 8, 16, 32, 64 y Otro.
- «Tiempo por partida» («Minutos · el reloj corre al iniciar», valor 30) y chips 15', 30', 45', 60' y Otro.
- Nota: «Usa una opción rápida o toca «Otro» para escribir la cantidad que quieras. También puedes ajustar con − / +.»
- Botones «Atrás» y «Continuar».

**EvE · O1b · Cupos personalizados**
- Igual que O03, con «Otro» elegido en los cupos (valor 24).
- Aparece el campo «Cantidad personalizada» («24 equipos») y la ayuda «Entre 2 y 128. Si no es potencia de 2, se juega una ronda previa para completar el cuadro.»

**O03b · Crear · Formato · Battle royale**
- Misma estructura de O03, con Battle royale como tipo activo.
- «FORMATO»: «Partidas acumuladas» (RECOMENDADO, «Los puntos se suman entre varias partidas»), «Clasificación por lobbies» («Los mejores de cada lobby pasan a la final») y «Partida única» («Una sola partida define al campeón»).
- «Jugadores por escuadra» («Solo, dúo, trío o escuadra», valor 4) y chips Solo, Dúo, Trío, Escuadra y Otro.
- «Jugadores» («Máximo 100 jugadores por partida», valor 100) y chips 25, 50, 75, 100 y Otro.
- «Número de partidas» («Los puntos se suman entre partidas», valor 3) y chips 1, 3, 5, 6 y Otro.
- «Tiempo por partida» («Minutos · la zona cierra al final», valor 25) y chips 15', 20', 25', 30' y Otro.
- Interruptor «Puntos por eliminación» («Posición + 1 pt por cada kill», activo).

**BR · O1b · Cupos personalizados**
- Igual que O03b, con «Otro» en los jugadores (valor 64).
- Campo «Cantidad personalizada» («64 jugadores») y la ayuda «Entre 2 y 100 jugadores por partida.»

**O03c · Crear · Formato · Por puntos**
- Misma estructura de O03, con Por puntos como tipo activo.
- «FORMATO»: «Liga» (RECOMENDADO, «Todos contra todos, gana quien sume más»), «Rondas suizas» («Emparejamientos entre puntajes similares») y «Récord de puntos» («Gana el mejor puntaje en sus intentos»).
- «Jugadores por equipo» («Individual o equipos de hasta 5», valor 1) y chips 1, 2, 3, 4, 5 y Otro.
- «Participantes» («Hasta 64 participantes», valor 16) y chips 8, 16, 32, 64 y Otro.
- «Rondas» («Cada ronda suma a la tabla», valor 5) y chips 3, 5, 7, 10 y Otro.
- «Puntos por resultado» («Editables · se suman en la tabla de posiciones»): Victoria 3, Empate 1 y Derrota 0.
- «Tiempo por partida» («Minutos por enfrentamiento», valor 20) y chips 10', 15', 20', 30' y Otro.

**PTS · O1b · Cupos personalizados**
- Igual que O03c, con «Otro» en los participantes (valor 12).
- Campo «Cantidad personalizada» («12 participantes») y la ayuda «Entre 2 y 128. Con número impar, uno descansa cada ronda.»

**O04 · Crear · Fecha y reglas**
- Barra superior con volver y «Crear torneo · Paso 3 de 4 · Fecha y reglas».
- «Fecha» («Sáb 4 Oct») y «Hora» («7:00 pm»).
- «Cierre de inscripciones» («Sáb 4 Oct · 6:00 pm») con la ayuda «Después de esta hora nadie más puede inscribirse.»
- Interruptor «Check-in obligatorio» («30 min antes del inicio», activo).
- «REGLAS»: tres casillas: «Reporte con captura del marcador» (marcada), «Desconexión: se repite el partido una vez» (marcada) y «Permitir suplentes» (sin marcar).
- Campo «Premios (opcional)» («Trofeo + 300 pts de ranking»).
- Botones «Atrás» y «Continuar».

**O05 · Crear · Revisión y publicar**
- Barra superior con volver y «Revisar y publicar · Paso 4 de 4», y el texto «Así lo verán los jugadores en Explorar.»
- Vista previa de la tarjeta del torneo: etiqueta ABIERTO, nombre «COPA RELÁMPAGO BOGOTÁ», fecha, «24/32 cupos» y un botón «Inscribirme».
- Resumen con un lápiz de edición en cada bloque: «Formato · Equipo vs equipo · Eliminación directa», «Cupos · 16 equipos · 3 vs 3», «Fecha · Sáb 4 Oct · 7:00 pm», «Tiempo por partida · 30 minutos» y «Check-in · 30 min antes».
- Aviso verde «Inscripción gratuita»: «Se publicará en Explorar y podrás compartir el enlace.»
- Botones «Publicar torneo» (principal) y «Guardar como borrador».

**O06 · Torneo publicado**
- Botón cerrar (X), título «Publicado» y una medalla 3D.
- «¡TORNEO PUBLICADO!» y el texto «La Copa Relámpago Bogotá ya aparece en Explorar. Compártela para llenar los 32 cupos.»
- Enlace «lt.gg/copa-relampago» con un botón para copiar.
- Botones «Compartir enlace» (principal) e «Ir a gestionar» (secundario), y el link «Ver como jugador».

## Paso a paso

Caso: StreamerNova crea la Copa Relámpago Bogotá.

### A. Empezar desde el panel

1. StreamerNova abre el **Panel (O01)**. Ve cuántos torneos tiene en curso, cuántos inscritos y cuántos finalizados, y su lista de torneos con el estado de cada uno (ABIERTO, EN CURSO, BORRADOR).
2. Puede filtrar la lista con el segmento: Todos, En curso o Borradores.
3. Para crear un torneo toca **«+ Empezar»** (o el botón «+» de la barra de navegación). Se abre el paso 1.
4. Para retomar un borrador, toca su tarjeta: el asistente se abre en el paso donde se quedó, con los datos ya guardados.

### B. Paso 1: información

5. En **Crear · Información (O02)**, sube la portada (recomendado 1200×750, JPG o PNG).
6. Elige el juego (EA FC 25). El juego determina el tipo de torneo: el tipo es fijo por juego y el organizador no lo cambia.
7. Escribe el nombre (máximo 60 caracteres) y la descripción.
8. Toca «Continuar», o «Guardar borrador». Con la X cierra el asistente: se abre un diálogo que pregunta si quiere guardar el borrador o descartar los cambios (el diálogo falta en Figma).

### C. Paso 2: formato y cupos

9. Según el tipo del juego, se abre una de tres pantallas de formato (con la barra de 4 pasos en el paso 2):
   - **Equipo vs equipo (O03):** elige el formato (en el MVP solo entra la eliminación directa), los jugadores por equipo (de 1 a 5), los cupos (8, 16, 32 o 64, o «Otro») y el tiempo por partida.
   - **Battle royale (O03b):** elige el formato (partidas acumuladas, clasificación por lobbies o partida única), los jugadores por escuadra (en el MVP se juega Solo), los jugadores (hasta 100), el número de partidas, el tiempo por partida y si da puntos por eliminación.
   - **Por puntos (O03c):** elige el formato (liga, rondas suizas o récord de puntos), los participantes (hasta 64, o «Otro»), las rondas, los puntos por resultado (victoria, empate y derrota) y el tiempo por partida.
10. Con los chips elige una cantidad rápida, o con el contador − / +. Con **«Otro»** aparece un campo de cantidad personalizada (EvE · O1b, BR · O1b y PTS · O1b), con su rango.
11. El Nivel 1 puede elegir hasta 32 cupos. Las opciones por encima aparecen bloqueadas hasta subir de nivel (ese estado falta en Figma).
12. Toca «Continuar» (o «Atrás» para volver al paso 1).

### D. Paso 3: fecha y reglas

13. En **Crear · Fecha y reglas (O04)** elige la fecha y la hora (Sáb 4 Oct, 7:00 pm) y el cierre de inscripciones (6:00 pm). Después de esa hora nadie más puede inscribirse.
14. Deja activo el check-in obligatorio (30 min antes del inicio).
15. Elige las reglas: reporte con captura del marcador, desconexión (se repite el partido una vez) y si se permiten suplentes.
16. Escribe el premio, que es un texto libre (por ejemplo, «Trofeo»). Los puntos de ranking los calcula el producto y no se escriben.
17. Toca «Continuar» o «Atrás».

### E. Paso 4: revisar y publicar

18. En **Revisar y publicar (O05)** ve cómo se verá el torneo en Explorar (la vista previa) y el resumen de lo que configuró: formato, cupos, fecha, tiempo por partida y check-in.
19. Para cambiar algo, toca el lápiz de ese bloque y vuelve al paso correspondiente.
20. Lee el aviso: la inscripción es gratuita, el torneo se publicará en Explorar y podrá compartir el enlace.
21. Toca **«Publicar torneo»**. Para publicar hay que haber completado los 4 pasos. También puede tocar «Guardar como borrador».

### F. Compartir y gestionar

22. Se abre **Torneo publicado (O06)**: «¡TORNEO PUBLICADO!», con el enlace corto del torneo (lt.gg/copa-relampago).
23. Desde aquí puede:
    - **Copiar** el enlace.
    - **Compartir enlace**, que abre las opciones para compartirlo.
    - **Ir a gestionar**, que abre el Resumen del torneo (flujo «organizador-gestion-del-torneo», O07).
    - **Ver como jugador**, que abre el Detalle del torneo como lo ve un jugador (J09).
    - Cerrar con la X.

### G. Repetir un torneo

24. Desde las estadísticas de un torneo finalizado, «Crear torneo similar» crea directamente un borrador con todos los datos copiados (flujo «organizador-cierre-datos-y-perfil»). El organizador lo encuentra en la pestaña Borradores del panel y lo retoma.

## Estados

### De un torneo en el panel (O01)
| Estado | Qué muestra |
|---|---|
| ABIERTO | Etiqueta verde. Publicado, con inscripciones abiertas. |
| EN CURSO | Etiqueta azul. El torneo ya empezó. |
| BORRADOR | Etiqueta amarilla. Guardado sin publicar. |
| FINALIZADO | No se ve en la lista; se cuenta en las estadísticas del panel. |

### Del asistente de crear
| Estado | Qué muestra |
|---|---|
| Paso actual | Barra de 4 pasos, con los pasos hechos y el actual en azul. |
| Paso 1 | X para cerrar (con diálogo de guardar borrador o descartar). |
| Pasos 2 a 4 | Flecha de volver. |
| Borrador abierto | El asistente retoma en el paso donde se quedó. |

### De los campos del paso 2
| Estado | Qué muestra |
|---|---|
| Opción rápida elegida | Chip activo. |
| «Otro» elegido | Chip «Otro» activo y un campo «Cantidad personalizada», con su rango. |
| Cupos bloqueados por nivel | Las opciones por encima de 32 cupos se ven bloqueadas para el Nivel 1 (falta en Figma). |

### De la publicación
| Estado | Qué muestra |
|---|---|
| Para publicar | Los 4 pasos completos. |
| Publicado | Pantalla «¡TORNEO PUBLICADO!», con el enlace. |
| Borrador | «Guardar borrador» / «Guardar como borrador» guardan sin publicar. |

### Estados que las pantallas no muestran
- Errores de validación en cada paso (campo vacío, cupo bloqueado, fecha en el pasado, cierre de inscripciones posterior al inicio).
- Botón «Continuar» deshabilitado mientras falte un dato.
- Diálogo al cerrar con la X, y diálogo al borrar un borrador.
- Las pestañas En curso y Borradores del panel, y el panel sin torneos (ver «estado-vacio-sin-torneos», V5).
- Carga de la portada y error de subida.
- Errores de red o de carga al publicar.

## Qué pasa después

- **Publicar:** el torneo aparece en Explorar (flujo «jugador-descubrir-e-inscribirse», J07), con la etiqueta ABIERTO, y los jugadores pueden inscribirse hasta la hora de cierre de las inscripciones.
- **Enlace:** el enlace corto (lt.gg/…) se comparte para que los jugadores lleguen al Detalle del torneo. Las estadísticas del torneo miden qué parte de las inscripciones llegó tras compartir el enlace.
- **Ir a gestionar:** abre el Resumen del torneo (flujo «organizador-gestion-del-torneo», O07), con el check-in, los inscritos y los anuncios.
- **Ver como jugador:** abre el Detalle del torneo (J09), como lo ve un jugador.
- **Borrador:** queda en la pestaña Borradores del panel, sin aparecer en Explorar, hasta que se retome y se publique.
- **Nivel:** el nivel del organizador determina cuántos cupos puede crear (el Nivel 1, hasta 32). Sube por torneos finalizados con buena valoración (flujo «organizador-cierre-datos-y-perfil»).
- **Panel:** el torneo publicado aparece en «Mis torneos» como ABIERTO y suma a las cifras del panel.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Del organizador**
- Nombre, avatar, modo y nivel.
- Torneos: en curso, finalizados e inscritos totales.
- Lista de torneos (juego, nombre, estado, fecha, cupos e inscritos).
- Límite de cupos según su nivel (Nivel 1: hasta 32).

**Catálogo de juegos**
- Nombre, portada y el tipo de torneo de cada juego (Equipo vs equipo, Battle royale o Por puntos).

### Se escribe

**Torneo**
- Portada, juego, nombre (hasta 60 caracteres) y descripción.
- Tipo, formato y cupos: jugadores por equipo, equipos o participantes, jugadores por escuadra, partidas, rondas y puntos por resultado (en Por puntos), y puntos por eliminación (en Battle royale).
- Tiempo por partida.
- Fecha, hora y cierre de inscripciones.
- Check-in obligatorio (30 min antes del inicio).
- Reglas: reporte con captura del marcador, desconexión (se repite el partido una vez) y suplentes.
- Premios (texto libre).
- Entrada gratuita.
- Estado: borrador o abierto.
- Paso en el que se quedó el borrador.
- Enlace corto (lt.gg/…).

**Borrador copiado**
- Torneo nuevo con los datos de otro, creado desde «Crear torneo similar».

### Reglas que dicen las pantallas
- El asistente tiene 4 pasos: información, formato y cupos, fecha y reglas, revisar y publicar.
- El tipo de torneo es fijo por juego.
- Un torneo se publica solo con los 4 pasos completos.
- Al cerrar el asistente con la X se pregunta si guardar un borrador o descartar los cambios.
- Al abrir un borrador, el asistente retoma en el paso donde se quedó.
- El Nivel 1 puede crear torneos de hasta 32 cupos.
- Los cupos de Equipo vs equipo son potencias de 2; si no lo son, se juega una ronda previa.
- Equipo vs equipo admite de 2 a 128 equipos, Battle royale de 2 a 100 jugadores por partida y Por puntos de 2 a 128 participantes (con un número impar, uno descansa cada ronda).
- Equipo vs equipo admite de 1 a 5 jugadores por equipo.
- Después de la hora de cierre de las inscripciones nadie más puede inscribirse.
- El check-in es obligatorio, y empieza 30 min antes del inicio.
- Los puntos de ranking los calcula el producto y no se escriben. «Premios» es un texto libre.
- La inscripción es gratuita.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Gestionar el torneo publicado** (O07 a O14), a donde lleva «Ir a gestionar», en «organizador-gestion-del-torneo».
- **Los brackets y el cierre** (O12, O13, O15 y las vistas de las otras modalidades), en «eliminacion-directa-bracket», «battle-royale-bracket» y «bracket-por-puntos».
- **Perfil, estadísticas y cancelar** (O16, O17, O18), y el nivel del organizador, en «organizador-cierre-datos-y-perfil».
- **Lo que ve el jugador:** Detalle del torneo (J09) y Explorar (J07), en «jugador-descubrir-e-inscribirse».
- **Panel vacío** (V5), en «estado-vacio-sin-torneos».
- **Registro y modo Organizador** (J03 y J23), en «acceso-y-registro» y «jugador-progreso-y-cuenta».

No entran al MVP, aunque están en el diseño:
- **Doble eliminación** y **fase de grupos** (opciones de formato de Equipo vs equipo).
- **Cambiar el tipo de torneo** en el paso 2, que es fijo por juego.
- **Cobro de inscripciones:** el UI kit describe un paso con precio y pasarela, y el MVP es gratuito.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Tipo de juego fijo.** El tipo es fijo por juego y el organizador no lo cambia en el MVP. El paso 2 muestra las tres opciones como si se pudiera elegir, y O02 dice «En el siguiente paso puedes cambiar el tipo». Hay que quitar o deshabilitar el selector y el texto.
2. **Premios.** Se decidió que «Premios» es un texto libre y que los puntos de ranking son automáticos. Hay que quitar «300 pts de ranking» del ejemplo de O04. Además el campo dice «(opcional)», mientras que para publicar hay que completar los 4 pasos: hay que alinear una cosa con la otra.
3. **Cerrar con la X.** Se decidió que se pregunta si guardar un borrador o descartar los cambios. Falta ese diálogo en Figma.
4. **Cupos bloqueados por nivel.** Se decidió que el Nivel 1 llega a 32 cupos. Falta el estado bloqueado de las opciones de 64 o más, el texto de qué hace falta para desbloquearlas, y alinear el texto de O17 («Desbloquea torneos de 64 cupos»).
5. **Tolerancia de check-in.** En «incidencias-de-partido» se decidió que el organizador define la tolerancia al crear el torneo (10 minutos por defecto). No existe ese campo en el paso 3 (O04).
6. **Formatos y opciones que no entran.**
   - Doble eliminación y fase de grupos: hay que quitarlos o deshabilitarlos en O03.
   - Battle royale: en el MVP se juega Solo, y O03b ofrece dúo, trío y escuadra.
   - Por puntos: se juega individual, y O03c ofrece equipos de hasta 5.
   - Hay que quitar o deshabilitar esas opciones.
7. **Datos de ejemplo que no cuadran.**
   - La Copa Relámpago es «16 equipos · 3 vs 3» en O05, tiene «24/32 cupos» en la vista previa, «32 cupos» en O06 y una descripción que dice «Torneo 1v1».
   - «Grieta Andina» es un BORRADOR con 9/16 inscritos, y los jugadores ya la ven como abierta en Inicio.
   - El panel dice «2 En curso» y la lista muestra uno; O17 dice 7 torneos y O01 dice 7 finalizados.
8. **Resumen de la revisión.** O05 no resume el nombre, la portada, el juego, las reglas, el cierre de inscripciones ni los premios, y no tiene lápiz para esos bloques. Además la vista previa muestra 24/32 inscritos en un torneo nuevo.
9. **Reglas.** «Reporte con captura del marcador» (marcada, es decir, obligatoria) contradice a J17, donde la captura es «Opcional». «Desconexión: se repite el partido una vez» y «Permitir suplentes» no tienen pantallas de cómo se aplican.

**Pendientes de definir**

10. **Tipo por juego.** No se ve qué tipo corresponde a cada juego (por ejemplo, EA FC 25 es Equipo vs equipo). La pantalla muestra 6 juegos y el UI kit habla de 24.
11. **Qué cuenta como «completar».** Para publicar hay que completar los 4 pasos, pero no se ve qué es obligatorio en cada uno: ¿se pueden dejar todas las reglas desmarcadas? ¿Y los premios, que dicen «(opcional)»? Tampoco se ven las validaciones (fecha en el pasado, cierre de inscripciones posterior al inicio, nombre repetido) ni el estado del botón «Continuar».
12. **Borradores.** Falta cuántos puede tener un organizador, cómo se borra uno y cómo se ve en el panel un borrador copiado de otro torneo (que tiene todos los datos pero se abre en el paso donde se quedó). No se ve qué pasa con un borrador cuya fecha ya pasó.
13. **Panel.** Las pestañas En curso y Borradores no están dibujadas, ni el orden de la lista, ni el destino de «Ver todo» y de tocar una tarjeta (¿Resumen del torneo, O07, o el asistente si es un borrador?).
14. **Límite de cupos por nivel.** Falta definir cuánto desbloquea cada nivel, y cómo se aplica el límite de 32 a Battle royale (hasta 100 jugadores) y a Por puntos (hasta 64 participantes), que no miden cupos de equipos.
15. **Cantidades.** Por puntos dice «Hasta 64 participantes» y su cantidad personalizada dice «Entre 2 y 128». No se ve el mínimo ni el máximo de cada chip, ni cómo se avisa al pasarse.
16. **Enlace.** El enlace corto sale del nombre del torneo (lt.gg/copa-relampago). ¿Se puede editar? ¿Qué pasa si el nombre ya existe? ¿Qué muestra «Compartir enlace» (hoja del sistema)?
17. **Publicar.** ¿El torneo aparece de inmediato en Explorar? ¿Se puede despublicar o editar la portada después? Se decidió que solo se editan la fecha y las reglas. ¿Los seguidores del organizador reciben un aviso?
18. **Torneo destacado.** El Nivel 2 desbloquea «destacados en Explorar». No se ve cómo el organizador marca un torneo como destacado.
19. **Reglas de modalidad.** ¿«Desconexión» y «Suplentes» aplican a Battle royale y a Por puntos? Los suplentes tienen sentido solo con equipos.
20. **Puntos del formato.** «Puntos por resultado» (Por puntos) y «Puntos por eliminación» (Battle royale) son puntos del torneo, distintos de los puntos de ranking. No se ve su rango (¿puede ser 5 por victoria?) ni cómo se explican al jugador.
21. **Pasos del asistente.** El UI kit llama al paso 3 «Fecha, puntos y pago», con un calendario y chips de cierre (30 min, 1 h, 2 h, 1 día antes), y la pantalla tiene un campo de fecha y otro de cierre de inscripciones. Hay que alinear el kit.
22. **Botón volver.** En los pasos 2 a 4 la flecha de volver regresa al paso anterior. No se ve si conserva los datos del paso.

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-27 | Versión inicial. Basada en las pantallas O01 a O06, O03b, O03c y los tres «Cupos personalizados», y en las respuestas del equipo: al abrir un borrador el asistente retoma en el paso donde se quedó, al cerrar con la X se pregunta si guardar un borrador o descartar, «Premios» es un texto libre y los puntos de ranking son automáticos, el Nivel 1 puede crear torneos de hasta 32 cupos, el tipo de juego es fijo por juego, y para publicar hay que completar los 4 pasos. |
