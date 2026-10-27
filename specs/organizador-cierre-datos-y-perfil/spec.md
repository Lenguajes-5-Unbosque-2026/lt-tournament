# Organizador · Cierre, datos y perfil

Carpeta de pantallas: `design/flujos/organizador-cierre-datos-y-perfil/`

## Quién y para qué

**Quién:** el organizador (modo Organizador, acento azul), después de gestionar un torneo o cuando necesita cancelarlo.

**Para qué:** ver cómo le fue y cuidar su reputación.
- **Estadísticas (O16):** el balance de un torneo finalizado, con un botón para crear un torneo similar.
- **Perfil del organizador (O17):** su reputación (verificado, nivel, torneos, jugadores y valoración), su progreso hacia el siguiente nivel y sus torneos organizados.
- **Cancelar torneo (O18):** el diálogo para cancelar un torneo, avisando a los inscritos.

**Por qué importa:** el Brief dice que el organizador debe poder «darle mantenimiento y seguimiento» a su torneo, durante y después de que termina. Además, las entrevistas muestran que los jugadores confían en organizadores con historial y referencias, y que los organizadores quieren repetir lo que funcionó. Cancelar es la salida limpia cuando un torneo no va a salir.

**Resultado:** el organizador entiende qué funcionó y qué no, tiene una reputación visible ante los jugadores y puede repetir o cancelar un torneo sin perder el control.

**Alcance del MVP:**
- La valoración del torneo la hacen los jugadores al terminar, de 1 a 5 estrellas, y responden si repetirían.
- El nivel del organizador sube por torneos finalizados **con buena valoración**.
- La verificación del organizador es automática, al cumplir un requisito.
- Un torneo solo se puede cancelar **antes de generar el bracket**.
- «Crear torneo similar» (y «duplicar») crea directamente un borrador con los datos copiados.

**Caso de ejemplo para el paso a paso:** StreamerNova, después de la **Copa Relámpago Bogotá**. Ve las estadísticas del torneo finalizado (O16) y toca «Crear torneo similar». Abre su perfil (O17) y ve que le faltan 3 torneos para el Nivel 2. En una variante, cancela un torneo publicado (O18), avisando a los 24 inscritos.

## Pantallas

| ID | Pantalla | Qué es |
|---|---|---|
| O16 | Estadísticas del torneo | Balance de un torneo finalizado. |
| O17 | Perfil del organizador | Reputación, nivel y torneos organizados. Pestaña raíz del organizador. |
| O18 | Cancelar torneo | Diálogo de confirmación para cancelar un torneo publicado. |

### Qué muestra cada pantalla

**O16 · Estadísticas del torneo**
- Barra superior con volver, título «Estadísticas» y subtítulo «Copa Relámpago · Finalizado».
- Cuatro datos: «32 Inscritos», «92% Asistencia», «2 h 40 Duración» y «4,8 Valoración».
- Gráfica «Inscripciones por día», con la nota «El 40% llegó tras compartir el enlace» y una barra por día: Lun 3, Mar 5, Mié 4, Jue 12 (resaltada), Vie 6 y Sáb 2.
- Tres filas de datos: «Partidos con disputa · 1 de 31», «Tiempo medio de reporte · 3 min» y «Jugadores que repetirían · 88%» (en verde).
- Botón «Crear torneo similar».

**O17 · Perfil del organizador**
- Avatar con anillo de acento y nombre en display («STREAMERNOVA»).
- Etiquetas «VERIFICADO» (verde) y «NIVEL 1».
- Segmento «Jugador / Organizador» (activo: Organizador) y el texto «Cambia a modo jugador en Ajustes para competir con la misma cuenta.»
- Tres datos: «7 Torneos», «312 Jugadores» y «4,8 Valoración».
- Tarjeta de progreso: «Nivel 2 en 3 torneos», «Desbloquea torneos de 64 cupos y destacados en Explorar», con una corona 3D y una barra de progreso.
- Sección «Torneos organizados» con el link «Ver todo»:
  - EA FC 25 · Copa Relámpago Bogotá · FINALIZADO · Sáb 4 Oct · 7:00 pm · 24/32.
  - Fortnite · Victory Royale Cup · EN CURSO · Hoy · 6:00 pm · 48/50.
- Barra de navegación del organizador con Perfil activo.

**O18 · Cancelar torneo**
- Diálogo sobre el Resumen del torneo (O07).
- Ícono de advertencia, título «¿Cancelar la Copa Relámpago?» y el texto «Se notificará a los 24 inscritos y el torneo pasará a «Cancelado». Podrás duplicarlo después.»
- Casilla «Enviar un mensaje a los inscritos» (marcada).
- Botones «Cancelar torneo» (rojo) y «Volver».

## Paso a paso

Caso: StreamerNova, después de la Copa Relámpago Bogotá.

### A. Ver las estadísticas de un torneo

1. Cuando el torneo está finalizado (el organizador cerró y publicó los resultados, O15), StreamerNova abre **Estadísticas (O16)**. Cómo llega a esa pantalla no se ve (ver Preguntas abiertas).
2. Ve el balance del torneo: cuántos se inscribieron (32), qué porcentaje asistió (92%), cuánto duró (2 h 40) y la valoración que le dieron los jugadores (4,8).
3. En **Inscripciones por día** ve qué días se inscribió la gente (el jueves, 12) y qué parte llegó tras compartir el enlace (el 40%).
4. Más abajo ve las incidencias (1 partido con disputa de 31), cuánto tardaron los jugadores en reportar sus resultados (3 min de media) y qué porcentaje de jugadores repetiría (88%).
5. Toca **«Crear torneo similar»**. Se crea directamente un **borrador** con todos los datos del torneo copiados, sin pasar por el asistente de crear. Lo edita desde su panel.

### B. Ver su perfil

6. StreamerNova toca **Perfil** en la barra de navegación y ve **Perfil del organizador (O17)**. Ve:
   - Que está verificado y su nivel (Nivel 1).
   - Cuántos torneos organizó (7), a cuántos jugadores reunió (312) y su valoración (4,8).
   - Su progreso hacia el siguiente nivel («Nivel 2 en 3 torneos»), con lo que desbloquea (torneos de 64 cupos y destacados en Explorar).
   - Sus torneos organizados, con su estado (FINALIZADO, EN CURSO).
7. Puede tocar:
   - **Ver todo** en «Torneos organizados» (destino no mostrado).
   - **Jugador** en el segmento, que cambia el modo de toda la app (decidido en «jugador-progreso-y-cuenta»). El texto bajo el segmento dice que se hace en Ajustes.
   - Una tarjeta de torneo (destino no mostrado; ver Preguntas abiertas).

### C. Cancelar un torneo

8. StreamerNova abre el menú **⋯** de la barra superior del Resumen del torneo (O07) y elige cancelar. Se asume por el menú; la forma de abrirlo no se ve.
9. Se abre **Cancelar torneo (O18)**: «¿Cancelar la Copa Relámpago?». Solo se puede cancelar antes de generar el bracket, es decir, con el torneo publicado o con el check-in abierto.
10. Lee que se notificará a los 24 inscritos y que el torneo pasará a «Cancelado». Puede dejar marcada la casilla **«Enviar un mensaje a los inscritos»**, que además publica un mensaje en el chat público del torneo (el organizador lo escribe en una pantalla que falta en Figma).
11. Toca **«Cancelar torneo»**. Los inscritos reciben la notificación de cancelación (automática y obligatoria), y el torneo pasa a «Cancelado». «Volver» cierra el diálogo sin cancelar.
12. Más tarde puede **duplicar** el torneo cancelado, que crea un borrador con los datos copiados. El botón para duplicar un torneo cancelado no está en las pantallas.

## Estados

### De un torneo
| Estado | Dónde se ve | Qué muestra |
|---|---|---|
| EN CURSO | O17 | Etiqueta azul en la lista de torneos organizados. |
| FINALIZADO | O16, O17 | Etiqueta gris. Desde O16 se ven las estadísticas. |
| Cancelado | O18 | Estado al que pasa un torneo al cancelarlo. |

### Del organizador (O17)
| Estado | Qué muestra |
|---|---|
| Verificado | Etiqueta verde «VERIFICADO», que se obtiene automáticamente al cumplir un requisito. |
| Nivel | Etiqueta «NIVEL 1» y una tarjeta de progreso con lo que falta para el siguiente nivel y lo que desbloquea. |

### De las estadísticas (O16)
- **Datos disponibles:** solo para un torneo finalizado.
- **Día destacado:** el día con más inscripciones se ve resaltado en la gráfica (jueves, 12).
- **Resaltado en verde:** «Jugadores que repetirían».

### Del diálogo de cancelar (O18)
- **Casilla «Enviar un mensaje a los inscritos»:** marcada o desmarcada.
- **Disponible solo antes de generar el bracket.**

### Estados que las pantallas no muestran
- Estadísticas de un torneo que no está finalizado o fue cancelado, y estadísticas con pocos datos.
- Perfil del organizador sin torneos, con un torneo cancelado o en borrador, y un nivel que baja.
- Tarjeta de progreso en el nivel máximo.
- Pantalla donde el jugador valora el torneo (1 a 5 estrellas y «¿repetirías?»).
- Pantalla para escribir el mensaje de cancelación y para duplicar un torneo cancelado.
- Errores de red o de carga.

## Qué pasa después

- **Después de las estadísticas:** «Crear torneo similar» crea un borrador con los datos del torneo, y el organizador lo edita y publica desde su panel (flujo «organizador-panel-y-creacion»).
- **Valoración:** al terminar el torneo, los jugadores lo valoran (de 1 a 5 estrellas) y responden si repetirían. La valoración del organizador es el promedio de sus torneos, y se ve en su perfil.
- **Nivel:** el nivel del organizador sube por torneos finalizados con buena valoración, y al subir desbloquea torneos de 64 cupos y destacados en Explorar.
- **Verificación:** el organizador queda verificado automáticamente al cumplir un requisito. Los jugadores lo ven como «Organizador verificado» en el Detalle del torneo (flujo «jugador-descubrir-e-inscribirse»).
- **Cancelar un torneo:** los inscritos reciben una notificación automática de cancelación y el torneo pasa a «Cancelado». Si la casilla está marcada, se publica además un mensaje en el chat público del torneo.
- **Después de cancelar:** el organizador puede duplicar el torneo, que crea un borrador con los datos copiados.
- **Perfil visto por los jugadores:** los jugadores ven la reputación del organizador desde el Detalle del torneo, con un botón para ver su perfil.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Estadísticas de un torneo finalizado**
- Inscritos, porcentaje de asistencia y duración.
- Valoración promedio y porcentaje de jugadores que repetirían (de las respuestas de los jugadores).
- Inscripciones por día y porcentaje que llegó tras compartir el enlace del torneo.
- Cantidad de partidos con disputa y de partidos totales.
- Tiempo medio de reporte de los resultados.

**Del organizador**
- Nombre, avatar, si está verificado, nivel y progreso hacia el siguiente nivel.
- Cantidad de torneos, de jugadores y valoración promedio.
- Lista de torneos organizados: juego, nombre, estado, fecha, cupos e inscritos.

### Se escribe

**Valoración del torneo** (la hace el jugador al terminar)
- Jugador, torneo, estrellas (de 1 a 5) y si repetiría.

**Cancelación**
- Torneo, quién la hizo, cuándo, y si se envió el mensaje a los inscritos.
- Estado del torneo (cancelado).
- Notificación automática a los inscritos.
- Mensaje en el chat público (si se marcó la casilla).

**Duplicado**
- Borrador de un nuevo torneo con los datos copiados de otro.

**Nivel y verificación**
- Nivel del organizador y estado de verificación (se actualizan solos, según los torneos finalizados y su valoración).

### Reglas que dicen las pantallas
- Las estadísticas se ven para un torneo finalizado.
- La valoración del torneo la hacen los jugadores de 1 a 5 estrellas, y la del organizador es el promedio de sus torneos.
- El nivel del organizador sube por torneos finalizados con buena valoración, y desbloquea torneos de 64 cupos y destacados en Explorar.
- La verificación es automática, al cumplir un requisito.
- Un torneo solo se puede cancelar antes de generar el bracket.
- Al cancelar se notifica a los inscritos de forma automática y obligatoria, y el torneo pasa a «Cancelado».
- La casilla «Enviar un mensaje a los inscritos» agrega un mensaje en el chat público del torneo.
- «Crear torneo similar» y «duplicar» crean un borrador con todos los datos copiados, sin pasar por el asistente.
- El organizador usa la misma cuenta que el jugador, y el segmento del perfil cambia el modo de toda la app.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Cerrar el torneo y publicar los resultados** (O15 y los cierres de las otras modalidades), que habilita las estadísticas, en «eliminacion-directa-bracket», «battle-royale-bracket» y «bracket-por-puntos».
- **Gestionar el torneo** (O07 a O14), de donde sale el menú que lleva a cancelar, en «organizador-gestion-del-torneo».
- **Crear el torneo** (O01 a O06), destino de editar un borrador, en «organizador-panel-y-creacion».
- **Panel del organizador** (O01) y **Ajustes y modo** (J23), en «organizador-panel-y-creacion» y «jugador-progreso-y-cuenta».
- **Perfil competitivo del jugador** (J18), en «jugador-progreso-y-cuenta».
- **Valorar el torneo desde el lado del jugador:** la pantalla no está en ninguna carpeta.
- **Lo que ve el jugador al cancelarse un torneo:** el aviso y el estado en Mis torneos.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Pantalla de valoración del jugador.** Se decidió que los jugadores valoran el torneo de 1 a 5 estrellas y responden si repetirían. Falta esa pantalla: cuándo aparece, si es obligatoria, si es anónima, y a qué jugadores se les pide (también a quienes quedaron eliminados pronto).
2. **Inscritos del ejemplo.** O16 dice «32 Inscritos» para la Copa Relámpago, mientras O07, O08 y O17 dicen 24 de 32.
3. **Cancelar solo antes del bracket.** Se decidió que solo se cancela antes de generar el bracket. El UI kit dice «Cancelado desde cualquiera antes de finalizar» y hay que alinearlo. O18 se muestra sobre el Resumen de un torneo publicado, que es coherente.
4. **Mensaje de cancelación.** Se decidió que la casilla agrega un mensaje en el chat público. Falta la pantalla para que el organizador lo escriba.
5. **Duplicar un torneo cancelado.** O18 dice «Podrás duplicarlo después», y «Crear torneo similar» está en O16 (torneo finalizado). Falta el botón para duplicar un torneo cancelado, y cómo se ve el borrador creado en el panel.
6. **Texto del perfil.** O17 dice «Cambia a modo jugador en Ajustes», pero se decidió que el segmento del perfil también cambia el modo de toda la app. Hay que alinear el texto.
7. **Tarjeta de nivel.** «Nivel 2 en 3 torneos» habla de cantidad, pero se decidió que el nivel sube por torneos finalizados con buena valoración. Hay que cambiar el texto de la tarjeta para reflejar la calidad.

**Pendientes de definir**

8. **Reglas del nivel.** Cuántos torneos finalizados hacen falta por nivel, qué valoración cuenta como «buena» (por ejemplo, 4,0 o más), si el nivel puede bajar y cuál es el nivel máximo. Tampoco se ve cómo el Nivel 1 limita los cupos: la configuración (O03) permite torneos de 64 y 128 cupos a cualquier organizador.
9. **Verificación.** No se ve cuál es el requisito, si se puede perder, ni qué ve el jugador sobre cómo se obtuvo.
10. **Cómo se calculan las métricas.**
    - Asistencia: ¿jugadores con check-in sobre inscritos?
    - Duración: ¿desde el inicio del bracket hasta el cierre del torneo?
    - Tiempo medio de reporte: ¿desde que termina el partido hasta que el jugador reporta?
    - «El 40% llegó tras compartir el enlace»: ¿cómo se mide?
    - Inscripciones por día: ¿qué rango de días se muestra (de Lun a Sáb)?
11. **Cómo se llega a Estadísticas.** No se ve el camino desde el cierre del torneo (O15), desde «Torneos organizados» del perfil o desde el panel. Tampoco cuándo quedan disponibles, ni si hay estadísticas de torneos cancelados o en curso, ni estadísticas agregadas de todos sus torneos.
12. **Qué pasa al cancelar.** No se ve qué pasa con el check-in abierto, los inscritos en lista de espera (el diálogo solo habla de 24 inscritos), los jugadores que ya hicieron check-in, y cómo aparece el torneo cancelado en Explorar y en Mis torneos de los jugadores.
13. **Torneo que no se puede cancelar.** Con el bracket generado ya no se cancela. Si el organizador no puede seguir (por ejemplo, un problema grave con el torneo en curso), no se ve cómo se cierra.
14. **Torneos organizados (O17).** No se ve el orden de la lista, ni el estado de un torneo cancelado o en borrador, ni el destino de tocar una tarjeta (¿gestión del torneo O07 para uno en curso y estadísticas O16 para uno finalizado?) ni de «Ver todo».
15. **Datos del perfil.** ¿«7 Torneos» incluye torneos cancelados y borradores? ¿«312 Jugadores» cuenta jugadores únicos? ¿La valoración muestra cuántas valoraciones tiene?
16. **Perfil visto por los jugadores.** El Detalle del torneo (J09) muestra «Organizador verificado · 7 torneos» y un botón «Seguir». ¿Es esta misma pantalla (O17) la que ven los jugadores, y qué cambia (por ejemplo, el segmento de modo)? Tampoco se ve qué significa «Seguir».
17. **Perfil sin ajustes.** J18 (perfil del jugador) tiene botones de compartir y de ajustes arriba. O17 no los tiene. ¿Cómo llega el organizador a Ajustes?
18. **Datos de ejemplo.** O17 muestra la Victory Royale Cup con 48/50, y la spec de Battle royale dice 100 jugadores.
19. **Modalidad con equipos.** La modalidad con equipos entra al MVP. Falta definir si las estadísticas cuentan jugadores o equipos, y cómo se valora un torneo por equipos.

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-27 | Versión inicial. Basada en las pantallas O16, O17 y O18, y en las respuestas del equipo: la valoración del torneo la hacen los jugadores de 1 a 5 estrellas y responden si repetirían, el nivel del organizador sube por torneos finalizados con buena valoración, la verificación es automática al cumplir un requisito, un torneo solo se cancela antes de generar el bracket, la cancelación notifica a los inscritos de forma automática (la casilla agrega un mensaje en el chat público), y «Crear torneo similar» y «duplicar» crean un borrador con los datos copiados. |
