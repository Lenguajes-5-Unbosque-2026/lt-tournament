# Jugador · Competir

Carpeta de pantallas: `design/flujos/Jugador competir/`

## Quién y para qué

**Quién:** el jugador inscrito en uno o más torneos (modo Jugador, acento naranja).

**Para qué:** acompañarlo entre la inscripción y el ranking, es decir, el «jugar» del ciclo crear, gestionar, jugar y hacer seguimiento.
- **Mis torneos (J13):** ver todos sus torneos, por estado.
- **Sala del torneo (J14):** hacer el check-in con una cuenta atrás, ver su primer partido y las reglas rápidas.
- **Chat del torneo (J15):** hablar con los demás jugadores y con el organizador.
- **Resultado final (F1):** ver cómo le fue al terminar el torneo, con el podio y sus puntos de ranking.

**Por qué importa:** conecta la inscripción con el bracket y el ranking, y ataca lo que las entrevistas marcan como frustración de los jugadores: la mala organización y los tiempos de espera.

**Resultado:** el jugador llega a su partido habiendo hecho su check-in y con la información del torneo a la mano, y al terminar ve su resultado.

**Alcance del MVP:**
- Hay **un solo chat público por torneo**. No hay mensajes privados con el organizador en este flujo.
- Hay **un check-in por torneo** (el de la Sala) y además **un check-in por partido**, con tolerancia, que sirve para el W.O. de cada ronda. En esta carpeta solo está dibujado el primero.
- La pantalla de Resultado final **solo la ven los tres primeros** (el podio). El resto ve su resultado en su historial.

**Caso de ejemplo para el paso a paso:** Johitan, inscrito en la **Copa Relámpago Bogotá** (sábado 4 de octubre a las 7:00 pm). Abre Mis torneos, entra a la Sala, hace check-in antes de las 6:30 pm, escribe en el chat, juega su bracket y, al terminar, ve «¡Quedaste 2º!».

## Pantallas

| ID | Pantalla | Qué es |
|---|---|---|
| J13 | Mis torneos | Pestaña raíz del jugador. Lista de sus torneos por estado, y su lista de espera. |
| J14 | Sala del torneo · Check-in | Check-in con cuenta atrás, su primer partido y accesos a las reglas y al chat. |
| J15 | Chat del torneo | Conversación pública del torneo, con un anuncio fijado del organizador. |
| F1 | Jugador · Tu resultado final | Podio, puntos de ranking y datos del jugador al terminar el torneo. |

### Qué muestra cada pantalla

**J13 · Mis torneos**
- Título «MIS TORNEOS» y un botón de calendario arriba a la derecha.
- Segmento de pestañas: Próximos (activa), En curso y Finalizados.
- Tarjetas de torneo, cada una con la portada, el juego, el nombre, la fecha y hora, los cupos y una etiqueta de estado:
  - EA FC 25 · Copa Relámpago Bogotá · Sáb 4 Oct · 7:00 pm · 24/32 · CONFIRMADA.
  - Valorant · Liga Nocturna 5v5 · Vie 10 Oct · 8:00 pm · 20/32 · CONFIRMADA.
  - Rocket League · Aerial Masters · Sáb 25 Oct · 5:00 pm · 6/12 · PENDIENTE.
- Sección «Lista de espera»: CS2 · Clutch Masters Bogotá · Dom 12 Oct · 4:00 pm · 16/16 · LLENO.
- Link «Ver estado vacío» al pie.
- Barra de navegación con Mis torneos activo.

**J14 · Sala del torneo · Check-in**
- Barra superior con volver, título «Sala del torneo», subtítulo «Copa Relámpago Bogotá» y un botón de chat.
- Tarjeta destacada con la etiqueta CHECK-IN, «Cierra 6:30 pm», una cuenta atrás grande («00:42:18»), el texto «para que cierre el check-in», una barra de progreso y el botón «Hacer check-in».
- Sección «Tu primer partido»: los dos jugadores (Johitan y NovaK) con sus avatares y sus seeds (#13 y #4), «VS» al centro y «Octavos · 7:40 pm».
- Fila «Reglas rápidas»: «6 min · captura obligatoria», con una flecha.
- Fila «Escribir al organizador»: «Responde en el chat del torneo», con una flecha.

**J15 · Chat del torneo**
- Barra superior con volver, título «Copa Relámpago», subtítulo «24 inscritos · 8 en línea» y un menú «⋯».
- Anuncio fijado: «Fijado por StreamerNova» y «Check-in abierto hasta las 6:30 pm. El bracket se publica a las 6:45 pm.»
- Separador «Hoy» y mensajes:
  - NovaK: «¿A qué hora arranca la ronda 1?», 6:12 pm.
  - StreamerNova, con la etiqueta ORGANIZADOR: «7:00 pm en punto. Revisen su check-in», 6:13 pm.
  - Mensaje propio, en acento y alineado a la derecha: «Listo, ya hice check-in. ¡Suerte a todos!», «6:14 pm · Leído».
  - Sh4dow: «GG desde ya», 6:15 pm.
- Campo de mensaje con un botón «+», el texto «Escribe un mensaje…» y el botón de enviar.

**F1 · Jugador · Tu resultado final**
- Barra superior con volver, título «Resultado final» y subtítulo «Copa Relámpago Bogotá».
- Título «¡QUEDASTE 2º!» y el podio: NovaK (1.º, +300 pts), Johitan (2.º, +150 pts, resaltado como el propio) y Sh4dow (3.º, +80 pts).
- Tres datos: «+150 Pts de ranking», «↑3 Puestos en EA FC» y «3 Victorias».
- Botones «Ver bracket completo» (principal) y «Compartir mi resultado» (secundario).

## Paso a paso

Caso: Johitan, inscrito en la Copa Relámpago Bogotá.

### A. Ver sus torneos

1. Johitan toca **Mis torneos** en la barra de navegación y ve **Mis torneos (J13)**, en la pestaña Próximos.
2. Ve sus torneos próximos, cada uno con su estado (CONFIRMADA o PENDIENTE), y debajo su lista de espera (por ejemplo, Clutch Masters Bogotá, LLENO).
3. Puede cambiar a En curso o Finalizados. Esas vistas no están dibujadas (ver Preguntas abiertas).
4. Toca la tarjeta de un torneo (la Copa Relámpago Bogotá). Todas las tarjetas llevan a la **Sala del torneo (J14)**, y la Sala cambia según el estado del torneo.

### B. Hacer el check-in

5. En **Sala del torneo (J14)** ve la tarjeta de CHECK-IN: hasta qué hora cierra (6:30 pm), cuánto falta (00:42:18) y la barra de progreso.
6. Toca «Hacer check-in». Lo que ve después no está en las pantallas (ver Preguntas abiertas).
7. En «Tu primer partido» ve contra quién juega (NovaK), la ronda (Octavos), la hora (7:40 pm) y los seeds (#13 y #4).
8. Puede tocar:
   - **Reglas rápidas** («6 min · captura obligatoria»), que abre las reglas (sin pantalla).
   - **Escribir al organizador**, que abre el chat del torneo (J15).
   - El botón de chat de la barra superior, que también abre el chat (J15).
9. Si antes del check-in quiere salir del torneo, cancela su inscripción desde la Sala, hasta 1 h antes (ver la spec de inscripción). Ese botón falta en la Sala.
10. Cuando se acerca su partido hay un check-in por partido, con tolerancia, que sirve para el W.O. de cada ronda (flujo «Incidencias de partido»). Sus pantallas del lado del jugador no están en esta carpeta.

### C. Hablar en el chat

11. Johitan abre **Chat del torneo (J15)** desde la Sala. Ve el anuncio fijado por el organizador (hasta qué hora está abierto el check-in y cuándo se publica el bracket) y los mensajes de los demás jugadores.
12. Escribe en el campo «Escribe un mensaje…» y toca el botón de enviar. Su mensaje aparece a la derecha, en acento, con la hora y «Leído» cuando alguien lo ve.
13. Los mensajes del organizador llevan la etiqueta ORGANIZADOR. Hay un solo chat público por torneo: ahí se escribe a todos, y también al organizador.

### D. Jugar

14. Tras el check-in, el bracket se publica (según el anuncio, a las 6:45 pm) y el jugador juega su partido (flujo «Equipo vs equipo bracket» y las otras modalidades).

### E. Ver el resultado final

15. Cuando el organizador cierra y publica el torneo, **los tres primeros** reciben **Resultado final (F1)**. Johitan, que quedó 2.º, ve «¡QUEDASTE 2º!», el podio, y sus datos: +150 pts de ranking, ↑3 puestos en EA FC y 3 victorias.
16. Desde F1 puede:
    - **Ver bracket completo** (J16).
    - **Compartir mi resultado.**
    - Volver con la flecha.
17. Los jugadores que no llegaron al podio no ven esta pantalla: ven su resultado en su historial (flujo «Jugador progreso y cuenta», J19).

## Estados

### De un torneo en Mis torneos
| Estado | Dónde se ve | Qué muestra |
|---|---|---|
| CONFIRMADA | J13 | Etiqueta verde. El jugador está inscrito. |
| PENDIENTE | J13 | Etiqueta amarilla. El jugador todavía no ha hecho algo que le pide el torneo antes de quedar confirmado (qué es ese algo no está definido). |
| LLENO (lista de espera) | J13 | Etiqueta azul en la sección «Lista de espera». El jugador espera un cupo en un torneo lleno. |

### Del check-in (J14)
| Estado | Qué muestra |
|---|---|
| Check-in abierto | Etiqueta CHECK-IN, la hora de cierre («Cierra 6:30 pm»), la cuenta atrás, la barra de progreso y el botón «Hacer check-in». |
| Check-in hecho | No se ve. Falta en Figma. |
| Check-in cerrado | No se ve. Falta en Figma. |
| Check-in por partido | No se ve en esta carpeta (ver «Incidencias de partido», W1). |

### De los mensajes del chat (J15)
| Tipo | Cómo se ve |
|---|---|
| Mensaje ajeno | Avatar a la izquierda, nombre del autor, burbuja gris y la hora. |
| Mensaje del organizador | Igual, y con la etiqueta ORGANIZADOR junto al nombre. |
| Mensaje propio | Alineado a la derecha, burbuja en acento, la hora y «Leído» cuando fue leído. |
| Anuncio fijado | Tarjeta con borde de acento, un ícono de pin y «Fijado por [organizador]». |

### Del resultado final (F1)
- **Visible:** solo para los tres primeros del torneo.
- **Puesto propio:** el título cambia con el puesto («¡QUEDASTE 2º!») y el jugador aparece resaltado en el podio.

### Estados que las pantallas no muestran
- Mis torneos: las pestañas En curso y Finalizados, y la vista de un torneo en lista de espera con su posición.
- Sala del torneo: check-in hecho, check-in cerrado, torneo en curso, torneo finalizado y torneo en lista de espera.
- Chat: sin mensajes, enviando, error al enviar y mensaje largo.
- Resultado final para quienes no están en el podio.
- Errores de red o de carga en cualquiera de las pantallas.

## Qué pasa después

- **Check-in hecho:** el jugador queda listo para el bracket, que se publica a la hora que indica el organizador (en el ejemplo, a las 6:45 pm). Qué pasa con quien no hace el check-in del torneo no está definido (ver Preguntas abiertas).
- **Check-in por partido:** al acercarse cada partido, si un jugador no hace su check-in dentro de la tolerancia, el organizador resuelve el partido con una victoria por W.O. (flujo «Incidencias de partido»).
- **Bracket y partidos:** el bracket, reportar el resultado y las disputas están en «Equipo vs equipo bracket», «Battle royale bracket», «Bracket por puntos» e «Incidencias de partido».
- **Chat:** el chat se usa durante todo el torneo. El organizador fija anuncios y responde a los jugadores.
- **Cancelar la inscripción:** se hace desde la Sala, antes del check-in y hasta 1 h antes (decidido en la spec de inscripción). El cupo se libera para la lista de espera.
- **Cierre del torneo:** al publicar el organizador los resultados (O15), el historial y los rankings se actualizan, y los tres primeros reciben el Resultado final (F1). El resto de jugadores ve su resultado en su historial.
- **Ver bracket completo (F1):** lleva al bracket (J16), ahora con el torneo terminado.
- **Compartir mi resultado:** el contenido que se comparte no está definido.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Inscripciones del jugador**
- Por torneo: estado (confirmada, pendiente, en lista de espera), y si el torneo está próximo, en curso o finalizado.

**Torneo**
- Nombre, juego, portada, fecha y hora de inicio, cupos totales e inscritos.
- Hora de cierre del check-in (en el ejemplo, 6:30 pm) y hora de publicación del bracket (6:45 pm).
- Organizador.

**Partido**
- Rival, ronda, hora, seeds de cada lado.

**Chat del torneo**
- Mensajes: autor, texto, hora y si fue leído.
- Anuncio fijado y quién lo fijó.
- Cantidad de inscritos y de personas en línea.

**Resultado final**
- Podio (1.º, 2.º y 3.º) con puntos de ranking.
- Del jugador: puesto final, puntos de ranking ganados, puestos subidos en el ranking del juego y victorias.

### Se escribe

**Check-in**
- Jugador, torneo, hora del check-in.

**Mensaje del chat**
- Jugador, torneo, texto, hora.
- Marca de lectura de los mensajes.

**Cancelación de inscripción**
- Jugador, torneo, hora (decidido en la spec de inscripción; falta el botón en la Sala).

### Reglas que dicen las pantallas
- El check-in del torneo tiene una hora de cierre, y se muestra con una cuenta atrás.
- Hay un check-in por torneo y uno por partido, con tolerancia.
- Hay un solo chat público por torneo. Los mensajes del organizador llevan una etiqueta; el organizador puede fijar un anuncio.
- Todas las tarjetas de Mis torneos llevan a la Sala del torneo.
- El Resultado final solo lo ven los tres primeros.
- Los puntos de ranking del podio son los de la configuración del torneo (+300, +150 y +80 en el ejemplo).

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Inscribirse** (J06 a J12 y la inscripción por equipo), en «Jugador, descubrir e inscribirse». Ahí también está la regla de cancelar la inscripción.
- **El bracket y los partidos** (J16, J16b, J17, O12, O13, O15), en «Equipo vs equipo bracket», «Battle royale bracket» y «Bracket por puntos».
- **Disputas y W.O.** (D1, D2, W1, W2, W3), en «Incidencias de partido».
- **Check-in en vivo del organizador** (O11) y **chat del organizador** (O14), en «Orgamizador gestion del torneo».
- **Estados vacíos de Mis torneos** (J24), en «Estado vacio sin torneos».
- **Ranking, perfil, historial y notificaciones** (J18 a J22), en «Jugador progreso y cuenta».
- **Mensajes privados con el organizador:** no entran al MVP.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Cancelar la inscripción en la Sala.** En la spec de inscripción quedó decidido que se cancela desde la Sala del torneo (J14), antes del check-in. J14 no tiene ese botón, ni el diálogo de confirmación (el UI kit pide uno propio para acciones destructivas).
2. **Check-in por partido.** Se decidió que además del check-in del torneo hay un check-in por partido, con tolerancia. No hay pantallas del lado del jugador: cuándo se abre, cómo se hace, la cuenta atrás y la tolerancia.
3. **Estado PENDIENTE.** Se decidió que significa que el jugador todavía no ha hecho algo que le pide el torneo antes de quedar confirmado. No está definido qué es ese algo, dónde lo hace ni cómo pasa a CONFIRMADA. La spec de inscripción solo tiene los estados «Confirmada» y lista de espera, y hay que actualizarla.
4. **Resultado final solo para el podio.** Se decidió que F1 solo la ven los tres primeros. Falta definir qué ven los demás jugadores al cierre (un aviso, una notificación o solo su historial). Además, el podio de F1 (NovaK 1.º y Johitan 2.º) es el contrario al del cierre del organizador (O15: Johitan 1.º y NovaK 2.º).
5. **La Sala cambia según el estado del torneo.** Se decidió que todas las tarjetas de Mis torneos llevan a la Sala. J14 solo muestra el estado de check-in abierto. Faltan: check-in hecho, check-in cerrado, torneo en curso (con su partido y el acceso al bracket), torneo finalizado (con el resultado) y torneo en lista de espera.
6. **Un solo chat público.** Se decidió que no hay mensajes privados con el organizador. «Escribir al organizador» solo abre el chat público, y el texto «Responde en el chat del torneo» lo confirma; el UI kit todavía describe mensajes privados del organizador (O14), y hay que alinearlos.

**Pendientes de definir**

7. **Hacer check-in: qué pasa después.** No se ve el estado después de tocar «Hacer check-in» (confirmación, el botón cambia, se puede deshacer). Tampoco qué pasa si el jugador no lo hace antes del cierre (¿queda fuera del torneo?) ni cuándo abre el check-in.
8. **Hora de los partidos.** J14 dice «Tu primer partido: Octavos · 7:40 pm», mientras el torneo empieza a las 7:00 pm y el organizador dice «7:00 pm en punto» en el chat. No queda claro a qué se refiere cada hora, ni cuándo se publica el bracket (6:45 pm) frente al check-in (cierra 6:30 pm).
9. **Reglas del torneo.** «Reglas rápidas» dice «6 min · captura obligatoria», pero el formulario de reportar el resultado (J17) marca la captura como «Opcional», y el Detalle (J09) dice «Partidos al mejor de 3 · 6 min por tiempo». Hay que unificarlas. Además, «Reglas rápidas» no tiene pantalla de destino.
10. **Mis torneos: En curso y Finalizados.** No están dibujadas. No se ve el orden de la lista, cómo se ve un torneo en curso ni uno finalizado.
11. **Mis torneos: lista de espera.** No se ve la posición en la lista ni cómo salir de ella. Y no queda claro si la tarjeta de lista de espera lleva a la Sala o al Detalle (J12).
12. **Mis torneos: controles sin destino.** El botón de calendario arriba a la derecha no tiene destino. «Ver estado vacío» parece una nota de demostración del prototipo (el UI kit dice que se quita en producción).
13. **Chat: controles sin destino.** El botón «+» del campo de mensaje (¿adjuntar una imagen?) y el menú «⋯» de la barra superior (¿silenciar, reportar?) no tienen pantalla. Tampoco se ve quién puede fijar anuncios (se asume que el organizador), si hay moderación, ni los límites del mensaje.
14. **Chat: quién lo ve y cuándo.** ¿Los jugadores en lista de espera ven el chat? ¿El chat sigue abierto después de que el torneo termina? ¿El «en línea» y el «Leído» cuentan a todos?
15. **Cuenta atrás.** ¿Qué pasa cuando llega a cero? ¿Se muestra el check-in cerrado?
16. **Resultado final: datos.** No queda claro cómo se calculan «↑3 Puestos en EA FC» y «+150 Pts de ranking», ni qué cuenta como «Victorias» (¿incluye W.O.?). El contenido de «Compartir mi resultado» tampoco está definido.
17. **Modalidad con equipos.** La modalidad con equipos entra al MVP. Falta definir cómo se ve la Sala (check-in por equipo, quién hace el check-in), el chat (¿hay chat de equipo?) y el Resultado final cuando el podio son equipos.
18. **Avisos.** ¿El jugador recibe una notificación cuando se abre el check-in, cuando se publica el bracket y cuando el torneo termina? Es del flujo «Jugador progreso y cuenta» (J22).

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Versión inicial. Basada en las pantallas J13, J14, J15 y F1, y en las respuestas del equipo: PENDIENTE significa que el jugador todavía no ha hecho algo que le pide el torneo (sin definir qué), hay un check-in por torneo y otro por partido, hay un solo chat público por torneo, el Resultado final solo lo ven los tres primeros, y todas las tarjetas de Mis torneos llevan a la Sala del torneo, que cambia según el estado. |
