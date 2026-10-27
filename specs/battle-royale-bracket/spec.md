# Battle royale bracket

Carpeta de pantallas: `design/flujos/battle-royale-bracket/`

## Quién y para qué

**Quién:** dos roles sobre el mismo torneo.
- **El jugador** inscrito en un torneo Battle royale (modo Jugador, acento naranja).
- **El organizador** de ese torneo (modo Organizador, acento azul).

**Para qué:** llevar un torneo Battle royale de partidas acumuladas desde que está en juego hasta su cierre.
- El jugador sigue la tabla general (kills, mejor puesto y puntos), reporta su puesto y sus kills al terminar cada partida, y consulta las pruebas de las partidas ya jugadas.
- El organizador controla las partidas, valida los reportes de los jugadores, registra los resultados con la captura de la tabla final y cierra el torneo con el podio.

**Por qué importa:** es la versión del bracket para los juegos que no se juegan uno contra uno. Aquí los resultados se convierten en historial y ranking, que es la propuesta de valor del jugador. También ataca el dolor del organizador: mantener el orden durante el torneo y reportar resultados sin hojas de cálculo.

**Resultado:** el torneo queda con una tabla final, un podio (1.º, 2.º y 3.º), los puntos de ranking calculados y los resultados publicados. Al cerrar, el historial y los rankings de todos los jugadores se actualizan.

**Alcance del MVP:**
- En este flujo se juega en modo **Solo** (un jugador por fila de la tabla).
- Los tres formatos de Battle royale (Partidas acumuladas, Clasificación por lobbies y Partida única) entran al MVP, pero las pantallas solo muestran **Partidas acumuladas**; esta spec describe solo ese formato.

**Caso de ejemplo para el paso a paso:** la **Victory Royale Cup**, con 100 jugadores, 3 partidas de 25 minutos, puntos por posición más 1 punto por kill. Se sigue la **Partida 3**, en vivo, desde las dos perspectivas:
- **Johitan (jugador):** va 2.º en la general con 31 pts, y reporta su 2.º puesto con 4 kills.
- **El organizador:** registra la Partida 3 (gana ZeroX) y cierra el torneo con ZeroX, Johitan y Sh4dow en el podio.

## Pantallas

| ID | Pantalla | Quién | Qué es |
|---|---|---|---|
| BR · J1 | Tabla y tu partida | Jugador | Tabla general, tarjeta de su partida, y resultados y pruebas de cada partida. |
| BR · J2 | Reportar resultado | Jugador | Formulario para reportar su puesto final y sus kills. |
| BR · J3 | Prueba del resultado | Jugador | Hoja con la prueba de una partida ya finalizada. |
| BR · O2 | Tabla de partidas | Organizador | Tabla general y controles de la partida en vivo. |
| BR · O3 | Registrar resultados | Organizador | Registro y validación de los resultados de una partida. |
| BR · O4 | Cierre y podio | Organizador | Podio, resumen y cierre del torneo. |

### Qué muestra cada pantalla

**BR · J1 · Tabla y tu partida**
- Barra superior con volver, título «Bracket», subtítulo «Victory Royale Cup · 3 partidas» y botón de compartir.
- Segmento de pestañas: General, Partida 1, Partida 2, Partida 3 (activa: General).
- Tabla con las columnas #, Jugador, Kills, Mejor y Pts. Muestra 8 filas (ZeroX 38, Johitan 31, Sh4dow 30, Lupe 22, NovaK 19, Mafe 14, Kairo 9 y Tito 6). Los tres primeros llevan el número en dorado, plata y bronce, y la fila de Johitan (2.º) está resaltada con borde de acento.
- Pie de la tabla: «Mostrando 8 de 100 jugadores · Ver tabla completa».
- Tarjeta «Tu partida · Partida 3», con la etiqueta EN VIVO, el texto «Vas 2° en la general con 31 pts. Al terminar, reporta tu puesto y tus kills.» y el botón «Reportar resultado».
- Sección «Resultados y pruebas»:
  - Partida 1 · Finalizada: «Ganó Sh4dow · tú quedaste 3°», con el botón «Ver prueba».
  - Partida 2 · Finalizada: «Ganó ZeroX · tú quedaste 2°», con el botón «Ver prueba».
  - Partida 3: «Lobby único · 46 vivos», con el texto «En curso».

**BR · J2 · Reportar resultado**
- Botón cerrar (X), título «Reportar resultado» y subtítulo «Partida 3 · Battle royale».
- Bloque «Tu puesto final» («Posición al terminar la partida»): contador con − y +, valor grande (2) y chips 1°, 2°, 3° y Top 10 (2° elegido).
- Bloque «Tus kills» («+1 pt por cada eliminación»): contador con − y +, valor grande (4) y chips 0, 2, 4 y 6+ (4 elegido).
- Zona punteada «Sube la captura de la tabla final» («Opcional · solo la ve el organizador»).
- Aviso informativo: «El organizador valida el resultado. Si ambos reportan distinto, decide el organizador.»
- Botones «Enviar resultado» y «Cancelar».

**BR · J3 · Prueba del resultado**
- Hoja inferior sobre la tabla general (J1).
- Título «Prueba del resultado» y subtítulo «Partida 2 · Victory Royale Cup».
- Imagen con el texto «VICTORIA · PARTIDA 2» y «ZEROX · 1° · 14 KILLS».
- «Ganador: ZeroX», «Subida por el organizador · hace 2 h» y la etiqueta CONFIRMADO.
- Botón «Cerrar».

**BR · O2 · Tabla de partidas**
- Barra superior con volver, título «Bracket», subtítulo «100 jugadores · Partidas acumuladas» y un botón de ícono de intercambio.
- Mismas pestañas y misma tabla que J1, con acento azul.
- Tarjeta «Partida 3 · Lobby único», con la etiqueta EN VIVO, el texto «Tiempo restante 12:40 · 46 de 100 jugadores vivos. Al terminar, sube la tabla final y la captura.» y el botón «Registrar resultados».
- Botones «Iniciar siguiente partida» y «Ver jugadores y lobbies».
- Link «Ir al cierre del torneo».
- Nota al pie: «Puntos: posición + 1 pt por kill · 25' por partida.»

**BR · O3 · Registrar resultados**
- Botón cerrar (X), título «Registrar resultados» y subtítulo «Partida 3 · Battle royale».
- Tabla con las columnas #, Jugador, Puesto, Kills y Pts (5 filas: ZeroX 1.º · 6 · 18, Johitan 2.º · 4 · 13, Sh4dow 3.º · 3 · 10, Lupe 4.º · 2 · 8, NovaK 5.º · 1 · 6).
- Texto «Toca una fila para editar puesto y kills · 100 jugadores».
- Sección «Reportes de los jugadores»:
  - «ZeroX reportó 1° · 6 kills», «Hace 3 min · con captura», con una miniatura de la captura.
  - «Johitan reportó 2° · 4 kills», «Hace 1 min», con un check.
- Aviso verde «Los reportes coinciden con la tabla. Ganador de la partida: ZeroX.»
- Opción de selección «Ganador de la partida: ZeroX».
- Zona punteada «Captura de la tabla final» («Los jugadores la verán en el bracket con «Ver prueba»») con botón de subir.
- Botones «Confirmar resultados» y «Cancelar».

**BR · O4 · Cierre y podio**
- Barra superior con volver, título «Cerrar torneo» y subtítulo «Victory Royale Cup».
- Título «¡FINAL REGISTRADA!» y el podio con ZeroX (1.º, +300 pts), Johitan (2.º, +150 pts) y Sh4dow (3.º, +80 pts).
- Tres datos: 100 Jugadores, 3 Partidas y 412 Kills.
- Lista de verificación: «Todos los resultados registrados», «Tabla final completa» y «Puntos de ranking calculados».
- Aviso informativo: «Al cerrar se actualiza todo. Historial y rankings de los 100 jugadores se actualizan al instante.»
- Botones «Finalizar y publicar resultados» y «Compartir resultados».

## Paso a paso

Caso: Victory Royale Cup, Partida 3 en vivo.

### A. El jugador sigue el torneo

1. Johitan abre el bracket del torneo y ve **Tabla y tu partida (BR · J1)**, en la pestaña General. Ahí ve:
   - Su posición en la tabla (2.º, 31 pts), resaltada.
   - Cuántas kills y cuál es su mejor puesto.
   - Cuántos jugadores hay en total.
2. Para ver una partida concreta toca la pestaña Partida 1, 2 o 3. Para ver a todos los jugadores toca «Ver tabla completa». Ninguna de las dos vistas está dibujada (ver Preguntas abiertas).
3. En **Resultados y pruebas** ve el resumen de cada partida. Las partidas finalizadas tienen el botón «Ver prueba».
4. Toca «Ver prueba» de la Partida 2 y se abre **Prueba del resultado (BR · J3)**, una hoja sobre la tabla. Ahí ve la imagen de la prueba, el ganador (ZeroX), que la subió el organizador hace 2 h y que está CONFIRMADO. Toca «Cerrar» y vuelve a la tabla.

### B. El jugador reporta su resultado

5. Mientras la Partida 3 está EN VIVO, la tarjeta «Tu partida» muestra «Reportar resultado». El botón solo se habilita cuando el jugador ya fue eliminado o cuando la partida terminó; mientras sigue jugando está deshabilitado.
6. Cuando Johitan termina su partida, toca «Reportar resultado» y se abre **Reportar resultado (BR · J2)**.
7. Indica su puesto final con el contador − / + o con los chips (1°, 2°, 3°, Top 10): elige 2.º.
8. Indica sus kills con el contador − / + o con los chips (0, 2, 4, 6+): elige 4.
9. Si quiere, sube la captura de la tabla final. Es opcional y solo la ve el organizador.
10. Lee el aviso: el organizador valida el resultado, y si los reportes no coinciden decide el organizador.
11. Toca «Enviar resultado». Lo que ve después de enviar no está en las pantallas (ver Preguntas abiertas).
    - «Cancelar» y la X cierran el formulario sin enviar.

### C. El organizador controla las partidas

12. El organizador abre el bracket del torneo y ve **Tabla de partidas (BR · O2)**, con la misma tabla general y la tarjeta de la Partida 3 en vivo: tiempo restante (12:40) y jugadores vivos (46 de 100).
13. Desde esta pantalla puede:
    - Tocar «Registrar resultados» para registrar la partida.
    - Tocar «Iniciar siguiente partida».
    - Tocar «Ver jugadores y lobbies» (pantalla sin dibujar; ver Preguntas abiertas).
    - Tocar «Ir al cierre del torneo».
    - Tocar el botón de intercambio de la barra superior (sin destino mostrado).

### D. El organizador registra una partida

14. Al terminar la Partida 3, el organizador toca «Registrar resultados» y se abre **Registrar resultados (BR · O3)**.
15. En la tabla, llena a mano los resultados: toca una fila para editar puesto y kills. La columna «Pts» muestra los puntos de esa partida (posición más 1 punto por kill).
16. Debajo, en «Reportes de los jugadores», ve lo que reportó cada jugador, cuándo lo hizo y si adjuntó captura. Los usa como ayuda para llenar la tabla.
17. La pantalla compara los reportes con la tabla:
    - Si coinciden, muestra el aviso verde «Los reportes coinciden con la tabla», con el ganador de la partida.
    - Si no coinciden, se abre una disputa formal (flujo «incidencias-de-partido»; esa pantalla no se ve aquí).
18. Confirma el ganador de la partida («Ganador de la partida: ZeroX») y sube la captura de la tabla final, que los jugadores verán con «Ver prueba».
19. Toca «Confirmar resultados». La partida queda finalizada y la tabla general se actualiza. «Cancelar» y la X cierran sin guardar.

### E. El organizador cierra el torneo

20. Cuando las 3 partidas están registradas, toca «Ir al cierre del torneo» y llega a **Cierre y podio (BR · O4)**.
21. Ve «¡FINAL REGISTRADA!», el podio (ZeroX +300 pts, Johitan +150 pts, Sh4dow +80 pts), el resumen (100 jugadores, 3 partidas, 412 kills) y la lista de verificación: todos los resultados registrados, tabla final completa y puntos de ranking calculados.
22. Toca «Finalizar y publicar resultados». Los resultados se publican y el historial y los rankings de los 100 jugadores se actualizan al instante.
23. También puede tocar «Compartir resultados».

## Estados

### De una partida
| Estado | Dónde se ve | Qué muestra |
|---|---|---|
| En curso / EN VIVO | J1, O2 | Etiqueta EN VIVO, jugadores vivos («46 vivos»). En O2 también el tiempo restante («12:40»). |
| Finalizada | J1 | Título «Partida N · Finalizada», el ganador, la posición del jugador y el botón «Ver prueba». |
| Pendiente | J1, O2 | Pestaña de una partida que todavía no empieza (no se dibuja). |

### De la prueba de una partida (J3)
- **CONFIRMADO:** el organizador subió la prueba y confirmó el resultado.

### De los reportes de los jugadores (O3)
| Estado | Qué muestra |
|---|---|
| Reporte con captura | Miniatura de la captura a la derecha de la fila. |
| Reporte sin captura | Solo el texto del puesto, las kills y la hora. |
| Reporte con check verde | Check verde a la derecha de la fila. Se asume que significa que el reporte coincide con la tabla; hay que confirmarlo. |
| Los reportes coinciden con la tabla | Aviso verde con el ganador de la partida. |
| Los reportes no coinciden | Se abre una disputa formal (flujo «incidencias-de-partido»; la pantalla no está en este flujo). |

### Del botón «Reportar resultado» del jugador (J1)
- **Habilitado:** el jugador ya fue eliminado o la partida terminó.
- **Deshabilitado:** el jugador sigue jugando. Este estado no está dibujado en Figma (ver Preguntas abiertas).

### De la tabla general
- **Fila propia:** resaltada con borde de acento (J1 y O2).
- **Top 3:** el número va en dorado, plata y bronce.
- **Tabla parcial:** muestra 8 jugadores y «Ver tabla completa» para el resto.

### Del cierre del torneo (O4)
- **Lista de verificación completa:** los tres puntos con check verde (resultados, tabla final, puntos de ranking). Si falta alguno, la pantalla no lo muestra.
- **Torneo publicado:** al tocar «Finalizar y publicar resultados». Lo que se ve después no está dibujado.

### Estados que las pantallas no muestran
- Botón «Reportar resultado» deshabilitado, «reporte enviado» y reporte rechazado.
- Reportes que no coinciden (aviso de diferencia en O3).
- Partida pendiente (todavía no empieza) y partida sin resultados.
- Tabla completa, tabla de una partida concreta y pantalla de «Ver jugadores y lobbies».
- Errores de red o de validación al enviar o confirmar.

## Qué pasa después

- **Reporte del jugador:** el reporte llega al organizador y aparece en «Reportes de los jugadores» de O3, con la hora y la captura si la subió.
- **Confirmar resultados:** la partida pasa a Finalizada. La captura de la tabla final queda visible para los jugadores con «Ver prueba». La tabla general se actualiza con los puntos, kills y mejor puesto.
- **Reportes que no coinciden:** se abre una disputa formal en el flujo «incidencias-de-partido» (D1 para el jugador y D2 para el organizador). Esta spec solo menciona a dónde se va.
- **Cierre del torneo:** al finalizar y publicar los resultados se actualizan al instante el historial y los rankings de los 100 jugadores (flujo «jugador-progreso-y-cuenta», J18 a J21). Cada jugador puede ver su resultado final (pantalla F1 de «jugador-competir»).
- **Puntos de ranking:** los 3 primeros reciben puntos (+300, +150, +80 en el ejemplo). Los valores salen de la configuración del torneo.
- **Compartir:** J1 y O4 tienen botones de compartir; el contenido que se comparte no está definido.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Torneo Battle royale** (viene de la configuración, flujo «organizador-panel-y-creacion»)
- Nombre y juego.
- Formato: Partidas acumuladas, Clasificación por lobbies o Partida única.
- Cantidad de jugadores (de 2 a 100).
- Número de partidas (en el ejemplo, 3) y tiempo por partida (25 min).
- Puntos por eliminación (activado: posición más 1 punto por kill).
- Puntos de ranking del podio (1.º, 2.º y 3.º).

**Jugadores del torneo**
- Nombre, avatar y color.

**Partida**
- Número, estado (en curso, finalizada), hora de inicio, tiempo restante y jugadores vivos.

### Se escribe

**Reporte del jugador**
- Jugador, partida, puesto final, kills, captura opcional y hora de envío.

**Resultado de la partida** (lo registra el organizador)
- Por cada jugador y partida: puesto, kills y puntos.
- Ganador de la partida.
- Captura de la tabla final (quién la subió y cuándo) y su estado (confirmada).

**Tabla general** (se deriva de los resultados)
- Por jugador: kills totales, mejor puesto y puntos totales.

**Cierre del torneo**
- Podio (1.º, 2.º y 3.º), puntos de ranking de cada puesto.
- Resumen: jugadores, partidas y kills totales.
- Estado publicado.
- Actualización del historial y del ranking de cada jugador.

### Reglas que dicen las pantallas
- Los puntos de una partida son los puntos por posición más 1 punto por kill (J2, O2).
- Cuántos puntos da cada posición no se muestra. Se calcula con una fórmula que depende del número de jugadores.
- «Mejor» en la tabla es el mejor puesto del jugador entre todas las partidas (se asume por los valores).
- Cada partida dura 25 minutos (O2).
- En una partida de «Lobby único» juegan todos los jugadores a la vez (O2).
- El jugador solo puede reportar cuando ya fue eliminado o la partida terminó.
- El reporte del jugador es una ayuda; el organizador es quien valida y registra el resultado.
- La captura de un jugador solo la ve el organizador. La captura de la tabla final la ven los jugadores.
- Si los reportes no coinciden con lo registrado, se abre una disputa formal.
- El cierre exige tener todos los resultados registrados, la tabla final completa y los puntos de ranking calculados (O4).

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Crear y configurar el torneo** (O01 a O06, O03b, BR · O1b), en «organizador-panel-y-creacion».
- **Inscribirse** (J06 a J12), en «jugador-descubrir-e-inscribirse».
- **Check-in y chat** (J14, J15, O11, O14), en «jugador-competir» y «organizador-gestion-del-torneo».
- **eliminacion-directa-bracket** y **bracket-por-puntos**, las otras modalidades, con sus propias carpetas.
- **incidencias-de-partido** (D1, D2, W1, W2, W3): disputas y W.O., con su propia spec.
- **Ranking e historial** (J18 a J21) y **resultado final del jugador** (F1): se actualizan al cerrar, pero se describen en sus carpetas.
- **Estadísticas del torneo** (O16), en «organizador-cierre-datos-y-perfil».

Dentro del MVP, no incluido en este flujo por falta de pantallas:
- **Clasificación por lobbies** y **Partida única** (los dos formatos que no se dibujaron).

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Botón «Reportar resultado» en J1.** Se decidió que solo se habilita cuando el jugador ya fue eliminado o la partida terminó. En J1 aparece activo con la partida en vivo y con 46 jugadores vivos. Falta el estado deshabilitado y su mensaje. Además, J2 permite reportar el 2.º puesto mientras J1 dice que quedan 46 jugadores vivos: los datos de los ejemplos no cuadran.
2. **Formatos sin pantalla.** Entran los tres formatos al MVP, pero solo está dibujado «Partidas acumuladas». Faltan las pantallas o variantes de «Clasificación por lobbies» y de «Partida única».
3. **Disputas formales.** Se decidió que los reportes que no coinciden abren una disputa formal. El Brief deja fuera «un mecanismo formal de resolución de disputas» del MVP, y D1 y D2 están dibujadas para partidos entre dos jugadores. Hay que confirmar si aplican a Battle royale.

**Pendientes de definir**

4. **Fórmula de puntos por posición.** Las pantallas solo dicen «posición + 1 pt por kill». Por los números de O3 parece 12, 9, 7, 6 y 5 puntos para los 5 primeros puestos, pero la fórmula depende del número de jugadores y no está escrita. También falta el desempate cuando dos jugadores tienen los mismos puntos.
5. **Cuántos jugadores registra el organizador.** O3 muestra 5 de 100 filas y dice «Toca una fila para editar». Llenar la tabla a mano con 100 jugadores es mucho trabajo: ¿se registran todos o solo los primeros puestos? ¿Cómo se buscan las filas?
6. **Qué ve el jugador al reportar.** J2 no muestra qué pasa después de «Enviar resultado»: ¿hay confirmación, un estado «Reporte enviado», se puede corregir, se puede reportar dos veces? Tampoco se ve qué pasa si el organizador rechaza el reporte.
7. **Pestañas Partida 1, 2 y 3 y «Ver tabla completa».** Ninguna de las dos vistas está dibujada. ¿La tabla de una partida muestra puesto y kills de esa partida? ¿«Ver tabla completa» lista a los 100 jugadores, con búsqueda?
8. **Pantalla «Ver jugadores y lobbies» (O2).** El botón no tiene destino. Con un solo lobby, ¿qué muestra? Parece necesario para los otros formatos.
9. **Botón de intercambio en O2.** El ícono de la barra superior no tiene destino: ¿cambia a la vista del jugador, o a otro bracket?
10. **Cómo se llega a J1 y O2.** Las pantallas no muestran el camino desde Mis torneos, desde «Ver bracket» (J11) o desde la gestión del torneo. Tampoco se sabe qué ve un jugador eliminado o alguien que solo mira.
11. **Prueba del resultado (J3).** La imagen parece una tarjeta ilustrada («VICTORIA · PARTIDA 2 · ZEROX · 1° · 14 KILLS»), no una captura real. ¿Es la captura que sube el organizador o una tarjeta generada? Además, las 14 kills que muestra son las totales de ZeroX, no las de la Partida 2.
12. **Temporizador (O2).** «Tiempo restante 12:40» ¿corre solo o lo controla el organizador? ¿Qué pasa al llegar a cero? ¿Cuál es la relación con «Iniciar siguiente partida»?
13. **«Iniciar siguiente partida» en la última partida.** En O2 la Partida 3 es la última (el torneo tiene 3), pero el botón sigue visible. Debería estar deshabilitado o cambiar a «Ir al cierre».
14. **Cierre con partidas pendientes.** ¿Se puede cerrar el torneo sin haber registrado todas las partidas? O4 muestra la lista de verificación completa, pero no cómo se ve con puntos pendientes.
15. **Después de «Finalizar y publicar resultados».** No hay pantalla de confirmación ni de torneo finalizado. ¿Se notifica a los jugadores? ¿Se puede deshacer?
16. **Valores de los puntos del ranking.** O4 muestra +300, +150 y +80 puntos. El UI kit propone otros valores para otros juegos (por ejemplo, 250, 125 y 60 para Fortnite). ¿Cuáles son los de este torneo?
17. **Compartir.** J1 (botón de compartir en la barra) y O4 («Compartir resultados») no muestran qué se comparte ni con qué formato.
18. **Columna «Mejor».** Se asume que es el mejor puesto entre las partidas, por los valores de la tabla. Hay que confirmarlo.
19. **Datos de ejemplo que no cuadran.**
    - La Victory Royale Cup aparece en Explorar con 48/50 y aquí tiene 100 jugadores.
    - En O3, los avatares de las filas de ZeroX y de Johitan en «Reportes de los jugadores» parecen intercambiados.
20. **Falta una pantalla.** La carpeta tiene J1 a J3 y O2 a O4, pero no hay «BR · O1». ¿Es la pantalla de cupos personalizados (BR · O1b), que está en otra carpeta, o falta una pantalla por exportar?
21. **Nombre del flujo.** La carpeta se llama «battle-royale-bracket», pero también cubre el cierre del torneo, que en otros formatos es una pantalla aparte (O15). ¿Se mantiene el cierre aquí?

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-25 | Versión inicial. Basada en las pantallas BR · J1 a J3 y BR · O2 a O4, y en las respuestas del equipo: el organizador llena la tabla a mano, los reportes que no coinciden abren una disputa formal, los puntos por posición dependen de una fórmula según el número de jugadores, el MVP juega en modo Solo, los tres formatos entran al MVP (solo «Partidas acumuladas» está dibujado) y el jugador solo puede reportar cuando ya fue eliminado o la partida terminó. |
| 2026-10-27 | Revisión del PR #3. Equipos queda fuera del MVP de forma definitiva: se quitan las menciones a equipos, escuadras, dúos y tríos, y las referencias a E1 a E3. |
