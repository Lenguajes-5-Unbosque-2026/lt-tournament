# Organizador · Gestión del torneo

Carpeta de pantallas: `design/flujos/organizador-gestion-del-torneo/`

## Quién y para qué

**Quién:** el organizador de un torneo ya publicado (modo Organizador, acento azul).

**Para qué:** mantener el torneo ordenado desde que se publica hasta que empieza el bracket.
- **Resumen (O07):** ver el estado del torneo, los números clave y las acciones rápidas.
- **Inscritos (O08 a O10):** buscar y filtrar jugadores, y actuar sobre uno (ver su perfil, enviarle un mensaje, marcar su check-in, moverlo a la lista de espera o expulsarlo).
- **Check-in en vivo (O11):** ver quién confirmó, recordar a quienes faltan y cerrar el check-in para generar el bracket.
- **Chat y anuncios (O14):** publicar un anuncio para todos, fijado y con notificación.

**Por qué importa:** es la propuesta de valor del organizador (crear, gestionar y mantener su torneo en un solo lugar) y ataca el principal dolor de las entrevistas: mantener el orden durante el torneo. Según las entrevistas, más control significa más torneos.

**Resultado:** el torneo llega a la hora de empezar con los jugadores confirmados, un bracket generado y los jugadores informados.

**Alcance del MVP:**
- Hay **un solo chat público por torneo**. No hay mensajes privados entre el organizador y un jugador.
- El check-in lo abre el organizador a mano.
- Después de publicar solo se pueden editar la **fecha y las reglas**.

**Caso de ejemplo para el paso a paso:** StreamerNova gestionando la **Copa Relámpago Bogotá** (sábado 4 de octubre, 7:00 pm). Ve el resumen (24/32 inscritos), revisa quiénes están inscritos, expulsa a ZeroX, abre el check-in, recuerda a los que faltan, publica un anuncio y cierra el check-in para generar el bracket.

## Pantallas

| ID | Pantalla | Qué es |
|---|---|---|
| O07 | Gestionar · Resumen | Vista general del torneo: estado, números y acciones rápidas. |
| O08 | Gestionar · Inscritos | Lista de inscritos, con búsqueda, filtros y acciones por jugador. |
| O09 | Acciones sobre jugador | Hoja inferior con las acciones sobre un jugador inscrito. |
| O10 | Confirmar expulsión | Diálogo para confirmar la expulsión de un jugador. |
| O11 | Check-in en vivo | Estado del check-in, recordatorios y cierre. |
| O14 | Chat · Anuncio | Chat del torneo, con el formulario de anuncio. |

### Qué muestra cada pantalla

**O07 · Gestionar · Resumen**
- Barra superior con volver, título «Copa Relámpago», subtítulo «Publicado · Sáb 4 Oct · 7:00 pm» y un menú «⋯».
- Segmento de pestañas: Resumen (activa), Inscritos, Bracket y Result.
- Tres datos: «24/32 Inscritos», «18 Check-in» y «3 Lista espera», y una barra de progreso de cupos.
- Estado del torneo, en pasos: Publicado (hecho), Inscripciones abiertas (actual, con «Ahora»), Check-in, En curso y Finalizado.
- «Acciones rápidas»: cuatro tarjetas:
  - «Abrir check-in» («30 min antes»).
  - «Anuncio» («Fija un mensaje»).
  - «Bracket» («Generar llaves»).
  - «Editar» («Fecha, reglas…»).
- Barra de navegación del organizador: Panel, Torneos (activo), «+», Chat y Perfil.

**O08 · Gestionar · Inscritos**
- Barra superior con volver, título «Inscritos», subtítulo «24 de 32 cupos» y un botón de compartir.
- Campo de búsqueda «Buscar jugador».
- Chips de filtro: «Todos 24» (activo), «Confirm. 20», «Pend. 3» y «Espera 2».
- Lista de jugadores, cada uno con avatar, nombre, hace cuánto se inscribió, una etiqueta de estado (CONFIRMADA o PENDIENTE) y un botón «⋯» (Johitan, NovaK, Sh4dow, Mafe, ZeroX, Kairo y Lupe).
- Botón «Mensaje a todos».

**O09 · Acciones sobre jugador**
- Hoja inferior sobre la lista de inscritos.
- Cabecera con avatar, nombre (ZeroX) y «Inscrito hace 1 día · ID FC 25: zerox-77».
- Cinco acciones, cada una con una flecha: «Ver perfil competitivo», «Enviar mensaje», «Marcar check-in manual», «Mover a lista de espera» y «Expulsar del torneo» (en rojo).

**O10 · Confirmar expulsión**
- Diálogo sobre la lista de inscritos.
- Ícono de advertencia, título «¿Expulsar a ZeroX?» y el texto «Perderá su cupo y no podrá volver a inscribirse en este torneo. Esta acción no se puede deshacer.»
- Campo «Motivo (opcional)» con el ejemplo «Ej: no respetó las reglas».
- Botones «Sí, expulsar» (rojo) y «Cancelar».

**O11 · Check-in en vivo**
- Barra superior con volver, título «Check-in» y subtítulo «Cierra en 18:32».
- Tarjeta con «18/24», la etiqueta EN VIVO, «jugadores confirmaron su asistencia» y una barra de progreso.
- Aviso de advertencia «6 jugadores sin check-in»: «Si no confirman antes del cierre, su cupo pasa a la lista de espera.»
- Lista de jugadores:
  - Johitan · «Confirmó 6:00 pm» · CONFIRMADA.
  - NovaK · «Confirmó 6:01 pm» · CONFIRMADA.
  - Sh4dow · «Sin confirmar» · botón «Recordar».
  - Mafe · «Confirmó 6:03 pm» · CONFIRMADA.
  - ZeroX · «Confirmó 6:04 pm» · CONFIRMADA.
  - Kairo · «Sin confirmar» · botón «Recordar».
- Botón «Cerrar check-in y generar bracket».

**O14 · Chat · Anuncio**
- Barra superior con volver, título «Chat del torneo», subtítulo «Copa Relámpago · 24 inscritos» y un botón de personas.
- Tarjeta «Anuncio para todos»:
  - Campo «Mensaje» con el texto «El bracket se publica a las 6:45 pm. ¡Revisen su check-in!» y el contador «58/280».
  - Interruptor «Fijar en el chat» (activo).
  - Interruptor «Enviar notificación push» (activo).
  - Botón «Publicar anuncio».
- Sección «Mensajes recientes»: «NovaK: ¿A qué hora arranca la ronda 1?» (6:12 pm) y el mensaje propio «A las 7:00 pm en punto» (6:13 pm · Leído).
- Barra de navegación del organizador con Chat activo.

## Paso a paso

Caso: StreamerNova gestiona la Copa Relámpago Bogotá.

### A. Ver el resumen

1. StreamerNova toca **Torneos** en la barra de navegación, elige la Copa Relámpago Bogotá y ve **Resumen (O07)**. Ve:
   - El estado del torneo («Publicado · Sáb 4 Oct · 7:00 pm»).
   - Cuántos están inscritos (24/32), cuántos hicieron check-in y cuántos están en la lista de espera.
   - En qué paso del torneo está («Inscripciones abiertas», con «Ahora»).
2. Desde aquí puede tocar:
   - Las pestañas **Inscritos**, **Bracket** y **Result.** (esta última sin pantalla en esta carpeta).
   - El menú **⋯** de la barra superior (sin destino mostrado).
   - Las cuatro **acciones rápidas** (secciones B a F).

### B. Revisar y gestionar los inscritos

3. Toca la pestaña **Inscritos** y ve **Inscritos (O08)**, con los 24 jugadores y su estado (CONFIRMADA o PENDIENTE).
4. Para encontrar a alguien, escribe su nombre en el buscador o toca un chip de filtro: Todos, Confirmados, Pendientes o En espera.
5. Para actuar sobre un jugador toca su botón **⋯** y se abre **Acciones sobre jugador (O09)**, con su nombre, su tiempo de inscripción y su ID del juego. Puede:
   - **Ver perfil competitivo:** abre el perfil del jugador (sin pantalla; ver Preguntas abiertas).
   - **Enviar mensaje:** escribe en el chat público del torneo mencionando al jugador (por ejemplo, @ZeroX), y el jugador recibe un aviso.
   - **Marcar check-in manual:** marca su asistencia a mano.
   - **Mover a lista de espera:** el jugador pierde su cupo y pasa a la lista de espera.
   - **Expulsar del torneo:** abre el diálogo de confirmación (paso 6).
6. En **Confirmar expulsión (O10)** ve «¿Expulsar a ZeroX?», con el aviso de que perderá su cupo, no podrá volver a inscribirse y la acción no se puede deshacer. Si quiere, escribe un motivo (opcional). Toca «Sí, expulsar» o «Cancelar».
   - Al expulsar, se avisa al jugador con el motivo (si lo escribió), su cupo se libera para la lista de espera y desaparece de la lista de inscritos.
7. Para escribirles a todos toca **«Mensaje a todos»**: publica en el chat público del torneo, igual que un anuncio. También puede tocar el botón de compartir de la barra superior (el contenido no está definido).

### C. Abrir el check-in y seguirlo

8. En el Resumen toca **«Abrir check-in»**. El check-in lo abre el organizador a mano; «30 min antes» es el momento recomendado. Los jugadores reciben el aviso y pueden hacer su check-in en la Sala del torneo (flujo «jugador-competir»).
9. Se abre **Check-in en vivo (O11)**. Ve cuántos jugadores confirmaron (18/24), una barra de progreso, la hora de cierre y el aviso de que los jugadores sin check-in al cierre pierden su cupo, que pasa a la lista de espera.
10. En la lista ve quién confirmó y a qué hora, y quién no. Junto a cada jugador sin confirmar toca **«Recordar»** para avisarle.
11. Si un jugador no puede hacer su check-in, lo marca a mano desde O09 («Marcar check-in manual»).
12. Cuando termina el check-in, toca **«Cerrar check-in y generar bracket»**. Los jugadores que no confirmaron pierden su cupo, que pasa a la lista de espera, y se genera el bracket (flujo «1v1-bracket» y las otras modalidades).

### D. Cubrir los cupos que se liberan

13. Cuando se libera un cupo (un jugador sin check-in, uno movido a la lista de espera, uno expulsado o uno que cancela), el **primero de la lista de espera** recibe un aviso. Tiene un tiempo límite para confirmar. Si no confirma a tiempo, el cupo pasa al siguiente.

### E. Publicar un anuncio

14. En el Resumen toca **«Anuncio»** (o la pestaña **Chat** de la barra de navegación) y se abre **Chat · Anuncio (O14)**.
15. Escribe el mensaje (máximo 280 caracteres) y elige:
    - **Fijar en el chat:** el anuncio queda fijado en el chat de los jugadores.
    - **Enviar notificación push:** los jugadores reciben un aviso en el teléfono.
16. Toca «Publicar anuncio». Ve los mensajes recientes del chat debajo del formulario (cómo responde a un mensaje no se ve; ver Preguntas abiertas).

### F. Editar el torneo

17. En el Resumen toca **«Editar»**. Después de publicar solo se pueden editar la **fecha** y las **reglas**, y los inscritos reciben un aviso del cambio. La pantalla de edición no está en esta carpeta.

## Estados

### Del torneo (O07)
| Paso | Qué muestra |
|---|---|
| Publicado | Con un check verde cuando ya está publicado. |
| Inscripciones abiertas | Paso actual, con «Ahora». |
| Check-in | Aún no. Se abre con «Abrir check-in». |
| En curso | Aún no. |
| Finalizado | Aún no. |

### De cada inscrito (O08)
| Estado | Dónde se ve | Qué significa |
|---|---|---|
| CONFIRMADA | O08, O11 | El jugador está inscrito y confirmado; en O11 además muestra la hora de su check-in. |
| PENDIENTE | O08 | El jugador todavía no ha hecho algo que le pide el torneo antes de quedar confirmado (qué es ese algo no está definido). |
| En espera | O08 (chip «Espera») | El jugador está en la lista de espera. |

### Del check-in (O11)
| Estado | Qué muestra |
|---|---|
| EN VIVO | Etiqueta EN VIVO, el contador de confirmados y una barra de progreso. |
| Jugador confirmado | Etiqueta CONFIRMADA y la hora en que confirmó. |
| Jugador sin confirmar | «Sin confirmar» y el botón «Recordar». |
| Hay jugadores sin check-in | Aviso de advertencia con la cantidad y la consecuencia (pierden el cupo). |

### De las acciones sobre un jugador (O09)
| Acción | Resultado |
|---|---|
| Ver perfil competitivo | Abre el perfil del jugador. |
| Enviar mensaje | Mención en el chat público, con un aviso al jugador. |
| Marcar check-in manual | El jugador queda confirmado. |
| Mover a lista de espera | El jugador pierde el cupo y pasa a la lista de espera. |
| Expulsar del torneo | Confirmación (O10). Se avisa al jugador, se libera el cupo y desaparece de los inscritos. |

### Del anuncio (O14)
- **Fijar en el chat:** activo o inactivo.
- **Enviar notificación push:** activo o inactivo.
- **Mensaje:** de 0 a 280 caracteres, con contador.

### Estados que las pantallas no muestran
- Resumen en otros pasos (Check-in, En curso, Finalizado, Cancelado).
- Lista de inscritos vacía, búsqueda sin resultados y la vista de la lista de espera (el chip «Espera»).
- Aviso al jugador expulsado, movido a la lista de espera o que recibe un cupo.
- Check-in cerrado, y la vista del organizador después de generar el bracket.
- Pantalla de editar (fecha y reglas) y su aviso a los inscritos.
- Errores de red o de validación al publicar, expulsar o cerrar el check-in.

## Qué pasa después

- **Abrir el check-in:** los jugadores reciben el aviso y pueden hacer su check-in en la Sala del torneo (flujo «jugador-competir», J14).
- **Cerrar el check-in:** los jugadores sin check-in pierden su cupo, que pasa a la lista de espera, y el bracket se genera. El bracket y los resultados están en «1v1-bracket», «battle-royale-bracket» y «bracket-por-puntos».
- **Lista de espera:** al liberarse un cupo (check-in no confirmado, mover a la lista, expulsión o cancelación), el primero de la lista recibe un aviso y un tiempo límite para confirmar. Si no confirma, pasa al siguiente.
- **Expulsión:** el jugador recibe un aviso con el motivo, pierde su cupo y no puede volver a inscribirse en ese torneo. La acción no se puede deshacer.
- **Anuncio:** queda fijado en el chat de los jugadores (J15) si se activó «Fijar en el chat», y los jugadores reciben una notificación push si se activó. Según los ajustes del jugador, los avisos del chat son «solo menciones y anuncios».
- **Mensaje a un jugador:** se publica en el chat público, mencionando al jugador, que recibe un aviso.
- **Editar fecha y reglas:** los inscritos reciben un aviso del cambio.
- **Torneo en curso:** al generar el bracket el torneo pasa a «En curso», y la gestión continúa en el bracket (O12 y las otras modalidades).

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Torneo**
- Nombre, fecha y hora, estado (publicado, inscripciones abiertas, check-in, en curso, finalizado).
- Cupos totales, inscritos, confirmados en check-in y lista de espera.
- Hora de cierre del check-in.

**Inscritos**
- Por jugador: nombre, avatar, hace cuánto se inscribió, estado (confirmada, pendiente, en espera), ID del juego (por ejemplo, «ID FC 25: zerox-77») y, si hizo check-in, la hora.

**Chat del torneo**
- Mensajes recientes: autor, texto, hora y si fue leído.
- Cantidad de inscritos.

### Se escribe

**Check-in**
- Apertura del check-in (la hace el organizador), hora de cierre, check-in manual de un jugador y recordatorios enviados.

**Acciones sobre un jugador**
- Mover a la lista de espera: jugador, torneo, posición, fecha.
- Expulsión: jugador, torneo, motivo (opcional), quién lo hizo y cuándo.

**Lista de espera**
- Aviso al primero de la lista, tiempo límite para confirmar y su respuesta.

**Anuncio**
- Mensaje (hasta 280 caracteres), si queda fijado en el chat y si envía notificación push.

**Mensaje a un jugador**
- Mensaje en el chat público con una mención al jugador.

**Bracket**
- Generación del bracket al cerrar el check-in.

**Edición del torneo**
- Fecha y reglas actualizadas, y aviso a los inscritos.

### Reglas que dicen las pantallas
- El check-in lo abre el organizador a mano; «30 min antes» es el momento recomendado.
- Los jugadores sin check-in al cierre pierden su cupo, que pasa a la lista de espera.
- Al liberarse un cupo, el primero de la lista de espera recibe un aviso y tiene un tiempo límite para confirmar. Si no confirma, pasa al siguiente.
- Expulsar a un jugador es definitivo: pierde su cupo y no puede volver a inscribirse en ese torneo.
- Al expulsar, el jugador recibe un aviso con el motivo (si el organizador lo escribió).
- El motivo de la expulsión es opcional.
- «Mensaje a todos» publica en el chat público, igual que un anuncio.
- «Enviar mensaje» escribe en el chat público mencionando al jugador.
- Un anuncio tiene un máximo de 280 caracteres, y se puede fijar en el chat y enviar como notificación push.
- Después de publicar solo se pueden editar la fecha y las reglas, y los inscritos reciben un aviso.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Crear y publicar el torneo** (O01 a O06), en «organizador-panel-y-creacion».
- **El bracket y los resultados** (O12, O13, O15, y las vistas de las otras modalidades), en «1v1-bracket», «battle-royale-bracket» y «bracket-por-puntos».
- **Disputas y W.O.** (D2, W1), en «incidencias-de-partido».
- **Estadísticas, perfil del organizador y cancelar el torneo** (O16, O17, O18), en «organizador-cierre-datos-y-perfil».
- **Lo que ve el jugador:** Sala del torneo y chat (J14, J15), en «jugador-competir», y la inscripción, en «jugador-descubrir-e-inscribirse».
- **Perfil competitivo de otro jugador:** el UI kit lo describe, pero no hay pantalla.
- **Mensajes privados entre el organizador y un jugador:** no entran al MVP.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Números de inscritos que no cuadran.**
   - «Todos 24» en O08 no suma con los chips (20 confirmados, 3 pendientes y 2 en espera suman 25).
   - O07 muestra 3 en lista de espera y O08 muestra 2.
   - O07 muestra 18 check-ins mientras el torneo está en «Inscripciones abiertas», es decir, antes de abrir el check-in.
   - O09 dice que ZeroX se inscribió «hace 1 día» y O08 dice «Hace 5 h».
2. **Hora de cierre del check-in.** O11 dice «Cierra en 18:32», mientras el jugador ve «Cierra 6:30 pm» (J14) y el chat dice lo mismo.
3. **Mensajes a jugadores.** Se decidió que «Mensaje a todos» y «Enviar mensaje» escriben en el chat público (el segundo, con una mención). Falta la pantalla de cómo se escribe ese mensaje desde O08 y O09, y cómo se hace la mención. El UI kit todavía describe mensajes privados del organizador y hay que alinearlo.
4. **Avisos que faltan en el lado del jugador.** Falta el aviso al jugador expulsado (con el motivo), el aviso al jugador movido a la lista de espera, el aviso al primero de la lista (con el tiempo límite para confirmar) y el aviso a los inscritos cuando el organizador edita la fecha o las reglas.
5. **Editar sin pantalla.** Se decidió que solo se editan la fecha y las reglas, con aviso a los inscritos. No hay pantalla de editar.
6. **Lista de espera del organizador.** El chip «Espera» de O08 no muestra la lista de espera (orden, posición y el tiempo límite). Falta también cómo ve el organizador si el primero confirmó o no.
7. **Pestañas Bracket y Result.** O07 las muestra, pero sus pantallas no están en esta carpeta. La acción «Bracket · Generar llaves» tampoco tiene pantalla propia.

**Pendientes de definir**

8. **Check-in.**
   - Qué pasa si el organizador no abre el check-in (las reglas del torneo prometen al jugador un check-in 30 minutos antes).
   - Cuándo cierra el check-in: ¿a una hora fija o cuando el organizador toca «Cerrar check-in y generar bracket»?
   - Si se puede reabrir un check-in cerrado.
9. **Lista de espera.** No se sabe si la lista recibe cupos después de cerrar el check-in, cuánto dura el tiempo límite para confirmar, ni qué pasa si nadie de la lista confirma.
10. **Estado PENDIENTE.** Significa que el jugador todavía no ha hecho algo que le pide el torneo, y no está definido qué. Tampoco qué puede hacer el organizador con un jugador pendiente, ni si cuenta como inscrito para el cupo.
11. **Acciones sobre un jugador.**
    - «Marcar check-in manual»: ¿solo se puede con el check-in abierto?, ¿avisa al jugador?
    - «Mover a lista de espera»: ¿en qué posición queda?, ¿se puede deshacer?
    - «Expulsar»: ¿qué pasa con su historial y sus puntos?, ¿se puede expulsar con el torneo en curso?
12. **Ver perfil competitivo.** No hay pantalla del perfil público de otro jugador.
13. **Generar el bracket.** ¿Hay un mínimo de jugadores? ¿Cómo se ordenan los seeds (por orden de inscripción)? ¿Qué pasa si la cantidad de confirmados no es una potencia de 2? «Reordenar semillas» está sin definir en «1v1-bracket».
14. **Recordar.** ¿Qué envía (una notificación push) y cuántas veces se puede usar sobre el mismo jugador?
15. **Anuncios.**
    - ¿Un anuncio nuevo fijado reemplaza al anterior, o puede haber varios fijados?
    - ¿Se puede editar o borrar un anuncio?
    - ¿Quién más ve el anuncio si el jugador tiene los avisos del chat en «solo menciones y anuncios»?
16. **Chat del organizador.** O14 muestra «Mensajes recientes» y un botón de personas sin destino. No se ve cómo el organizador responde a un mensaje, modera (borra o silencia) ni qué torneo muestra la pestaña «Chat» cuando tiene varios.
17. **Compartir y menú ⋯.** El botón de compartir de O08 y el menú ⋯ de O07 no tienen destino. El menú podría llevar a «Cancelar torneo» (O18), que es de otro flujo.
18. **Ciclo de vida.** O07 muestra Publicado, Inscripciones abiertas, Check-in, En curso y Finalizado. El UI kit tiene Borrador, Abierto, Check-in, En curso, Finalizado y Cancelado. Hay que alinearlos.
19. **Modalidad con equipos.** La modalidad con equipos entra al MVP. Falta definir cómo se ven los inscritos (por equipo), el check-in (por equipo o por jugador) y la expulsión (del equipo o de un integrante).
20. **Equivalencia con el chat del jugador.** El mensaje propio del organizador en O14 dice «A las 7:00 pm en punto», y el jugador lo ve como «7:00 pm en punto. Revisen su check-in» (J15). Son ejemplos distintos del mismo mensaje.

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-27 | Versión inicial. Basada en las pantallas O07 a O11 y O14, y en las respuestas del equipo: el organizador abre el check-in a mano («30 min antes» es el momento recomendado), el primero de la lista de espera recibe un aviso y un tiempo límite para confirmar, al expulsar se avisa al jugador con el motivo y se libera el cupo, «Mensaje a todos» y «Enviar mensaje» escriben en el chat público (el segundo con una mención), y después de publicar solo se editan la fecha y las reglas, con aviso a los inscritos. |
