# Equipo vs equipo bracket

Carpeta de pantallas: `design/flujos/Equipo vs equipo bracket/`

## Quién y para qué

**Quién:** dos roles sobre el mismo torneo.
- **El jugador** inscrito en un torneo «Equipo vs equipo» (modo Jugador, acento naranja).
- **El organizador** de ese torneo (modo Organizador, acento azul).

**Para qué:** llevar un torneo de **eliminación directa** desde que empieza hasta su cierre. Es un bracket de rondas (Octavos, Cuartos, Semis y Final) en el que quien pierde queda fuera.
- El jugador ve el bracket completo con su partido, reporta el marcador y consulta las pruebas de los partidos ya jugados.
- El organizador ve el mismo bracket, valida los reportes, registra el resultado de cada partido con su prueba, avanza de ronda y cierra el torneo con el podio.

**Por qué importa:** es el bracket clásico del producto y el destino del botón «Ver bracket» que se muestra al inscribirse. Al cerrar, convierte los resultados en historial y ranking, que es la propuesta de valor del jugador. También ataca el dolor del organizador: mantener el orden durante el torneo y registrar resultados sin hojas de cálculo.

**Resultado:** el torneo queda con el bracket completo, un podio (1.º, 2.º y 3.º), los puntos de ranking calculados y los resultados publicados. Al cerrar, el historial y los rankings de todos los jugadores se actualizan.

**Alcance del MVP:**
- La modalidad «Equipo vs equipo» entra completa al MVP (de 1 a 5 jugadores por equipo). Las pantallas de este flujo todavía muestran un jugador por lado; faltan las versiones con nombres de equipo.
- La inscripción por equipo (crear equipo, invitar compañeros y unirse con código) también entra al MVP. Es del flujo «Jugador, descubrir e inscribirse».
- De los tres formatos de esta modalidad, **solo entra la eliminación directa**. La doble eliminación y la fase de grupos quedan fuera.

**Caso de ejemplo para el paso a paso:** la **Copa Relámpago Bogotá**, eliminación directa. Se sigue el **Partido 1 de Octavos**, Johitan (seed #13) contra NovaK (seed #4), desde las dos perspectivas:
- **Johitan (jugador):** reporta 2 – 1.
- **El organizador:** confirma que los dos reportes coinciden y avanza a Cuartos, hasta el cierre con Johitan campeón, NovaK 2.º y Sh4dow 3.º.

## Pantallas

| ID | Pantalla | Quién | Qué es |
|---|---|---|---|
| J16 | Bracket | Jugador | Bracket por rondas, con la tarjeta de su partido. |
| J16b | Bracket · Prueba del resultado | Jugador | Hoja con la prueba de un partido ya confirmado. |
| J17 | Reportar resultado | Jugador | Formulario para reportar el marcador de su partido. |
| O12 | Bracket · Equipo vs equipo | Organizador | Bracket y controles de la ronda (registrar, avanzar y reordenar). |
| O13 | Registrar resultado | Organizador | Registro y validación del resultado de un partido. |
| O15 | Cerrar torneo | Organizador | Podio, resumen y cierre del torneo. |

### Qué muestra cada pantalla

**J16 · Bracket**
- Barra superior con volver, título «Bracket», subtítulo «Copa Relámpago Bogotá» y botón de compartir.
- Segmento de pestañas por ronda: Octavos, Cuartos, Semis y Final (activa: Octavos).
- Bracket en dos columnas: la ronda actual a la izquierda y la siguiente a la derecha.
  - Cada partido es una caja de dos filas (avatar, nombre y marcador). El ganador lleva el marcador en acento.
  - Partidos de la ronda actual: Johitan vs NovaK (con borde de acento, es el partido propio), Sh4dow 2 – 0 Kairo, Mafe 1 – 2 ZeroX y Lupe 2 – 1 Tito. Los tres últimos tienen el botón «Ver prueba».
  - Ronda siguiente: «Por definir» vs Sh4dow, y ZeroX vs Lupe.
- Tarjeta «Tu partido», con la etiqueta EN CURSO: los dos avatares (Johitan y NovaK), un marcador grande, «Octavos» y sus seeds («Seed #13» y «Seed #4»).
- Botón «Reportar resultado».

**J16b · Bracket · Prueba del resultado**
- Hoja inferior sobre el bracket (J16).
- Título «Prueba del resultado» y subtítulo «Octavos · Partido 2 · Sh4dow vs Kairo».
- Imagen con un balón 3D y el texto «FINAL · 90:00» y «SH4DOW 2 – 0 KAIRO».
- «Ganador: Sh4dow», «Subida por el organizador · hace 2 h» y la etiqueta CONFIRMADO.
- Botón «Cerrar».

**J17 · Reportar resultado**
- Botón cerrar (X), título «Reportar resultado» y subtítulo «Octavos · Partido 1».
- Tarjeta con los dos lados (Johitan y NovaK), cada uno con su avatar, su nombre y un contador con − y + sobre el marcador (2 y 1).
- Sección «Ganador» con dos opciones: «Johitan» («Gana 2 – 1», elegida) y «NovaK».
- Zona punteada «Sube la captura del marcador» («Opcional · solo la ve el organizador»).
- Aviso informativo: «El organizador valida el resultado. Si ambos reportan distinto, decide el organizador.»
- Botones «Enviar resultado» y «Cancelar».

**O12 · Bracket · Equipo vs equipo**
- Barra superior con volver, título «Bracket», subtítulo «16 equipos · Eliminación directa» y un botón de ícono de intercambio.
- Mismas pestañas por ronda y mismo bracket, con acento azul. Los partidos son: Johitan 2 – 1 NovaK (borde azul), Sh4dow 2 – 0 Kairo, Mafe – ZeroX (sin marcador) y Lupe 2 – 1 Tito. Las cajas de la ronda siguiente son «Por definir» vs Sh4dow, y «Por definir» vs Lupe.
- Tarjeta «Partido 1 · Johitan vs NovaK», con la etiqueta PENDIENTE, el texto «Ambos jugadores reportaron 2–1. Confirma para avanzar.» y el botón «Registrar resultado».
- Botones «Avanzar a Cuartos» y «Reordenar semillas».
- Link «Ir al cierre del torneo».
- Nota al pie: «Faltan 2 resultados de Octavos para avanzar.»

**O13 · Registrar resultado**
- Botón cerrar (X), título «Registrar resultado» y subtítulo «Octavos · Partido 1».
- Tarjeta con los dos lados y un contador con − y + sobre el marcador (2 y 1), en azul.
- Sección «Reportes de los jugadores»:
  - «Johitan reportó 2 – 1», «Hace 3 min · con captura», con una miniatura de la captura.
  - «NovaK reportó 2 – 1», «Hace 1 min», con un check.
- Aviso verde «Los reportes coinciden. Ganador sugerido: Johitan.»
- Opción de selección «Ganador: Johitan».
- Zona punteada «Prueba del resultado» («Los jugadores la verán en el bracket con «Ver prueba».») con botón de subir.
- Botones «Confirmar resultado» y «Cancelar».

**O15 · Cerrar torneo**
- Barra superior con volver, título «Cerrar torneo» y subtítulo «Copa Relámpago Bogotá».
- Título «¡FINAL REGISTRADA!» y el podio con Johitan (1.º, +300 pts), NovaK (2.º, +150 pts) y Sh4dow (3.º, +80 pts).
- Tres datos: 32 Jugadores, 31 Partidos y 5 Rondas.
- Lista de verificación: «Todos los resultados registrados», «Bracket completo» y «Puntos de ranking calculados».
- Aviso informativo: «Al cerrar se actualiza todo. Historial y rankings de los 32 jugadores se actualizan al instante.»
- Botones «Finalizar y publicar resultados» y «Compartir resultados».

## Paso a paso

Caso: Copa Relámpago Bogotá, Octavos, Partido 1: Johitan contra NovaK.

### A. El jugador sigue el torneo

1. Johitan abre el bracket del torneo y ve **Bracket (J16)**, en la pestaña de la ronda actual (Octavos). Ve:
   - Todos los partidos de la ronda, con el marcador de los que ya terminaron.
   - Su propio partido, resaltado con borde de acento.
   - La ronda siguiente, con los lugares «Por definir» que todavía no tienen rival.
2. Para ver otra ronda toca la pestaña Cuartos, Semis o Final. Esas vistas no están dibujadas (ver Preguntas abiertas).
3. En la tarjeta **«Tu partido»** ve contra quién juega (NovaK), la ronda (Octavos) y los seeds de cada lado (#13 y #4). La tarjeta está EN CURSO y no muestra marcador hasta que se reporta el resultado.
4. En los partidos terminados toca «Ver prueba» (por ejemplo, el de Sh4dow contra Kairo) y se abre **Prueba del resultado (J16b)**, una hoja sobre el bracket. Ve la imagen de la prueba, el ganador (Sh4dow), que la subió el organizador hace 2 h y que está CONFIRMADO. Toca «Cerrar» y vuelve al bracket.

### B. El jugador reporta su resultado

5. Cuando termina el partido contra NovaK, Johitan toca «Reportar resultado» y se abre **Reportar resultado (J17)**.
6. Escribe el marcador con los contadores − / +: 2 para él y 1 para NovaK.
7. Elige al ganador (Johitan). La opción muestra «Gana 2 – 1».
8. Si quiere, sube la captura del marcador. Es opcional y solo la ve el organizador.
9. Lee el aviso: el organizador valida el resultado.
10. Toca «Enviar resultado». Lo que ve después de enviar no está en las pantallas (ver Preguntas abiertas).
    - «Cancelar» y la X cierran el formulario sin enviar.

### C. El organizador controla la ronda

11. El organizador abre el bracket del torneo y ve **Bracket (O12)**, con el mismo bracket que el jugador, en acento azul, y la tarjeta del partido que espera su confirmación («Ambos jugadores reportaron 2–1. Confirma para avanzar.»).
12. Desde esta pantalla puede:
    - Tocar «Registrar resultado» para registrar el partido.
    - Tocar «Avanzar a Cuartos». Se habilita cuando todos los resultados de la ronda están registrados; mientras falten, la pantalla dice cuántos son («Faltan 2 resultados de Octavos para avanzar.»).
    - Tocar «Reordenar semillas». Lo que hace no está definido (ver Preguntas abiertas).
    - Tocar «Ir al cierre del torneo».
    - Tocar el botón de intercambio de la barra superior (sin destino mostrado).

### D. El organizador registra un partido

13. Toca «Registrar resultado» y se abre **Registrar resultado (O13)**.
14. Ve el marcador del partido (2 – 1), que puede ajustar con los contadores − / +.
15. En «Reportes de los jugadores» ve lo que reportó cada uno, cuándo lo hizo y si adjuntó captura. En este caso los dos reportaron 2 – 1.
16. La pantalla compara los dos reportes:
    - Si coinciden, muestra el aviso verde «Los reportes coinciden», con el ganador sugerido (Johitan).
    - Si no coinciden, se abre una disputa formal (flujo «Incidencias de partido»; esa pantalla no se ve aquí).
17. Confirma al ganador («Ganador: Johitan») y sube la prueba del resultado, que los jugadores verán con «Ver prueba».
18. Toca «Confirmar resultado». El partido queda registrado y el ganador pasa al partido siguiente de la ronda que viene. «Cancelar» y la X cierran sin guardar.

### E. El organizador avanza de ronda

19. Cuando todos los partidos de Octavos están registrados, toca «Avanzar a Cuartos». Los ganadores ocupan los lugares «Por definir» de la ronda siguiente.
20. Repite el ciclo (secciones C y D) en Cuartos y en Semis.
21. Tras las Semis se juegan dos partidos: la **Final** y el **partido por el tercer puesto** entre los dos perdedores de las semifinales. El partido por el tercer puesto falta en Figma (ver Preguntas abiertas).

### F. El organizador cierra el torneo

22. Con todos los resultados registrados, toca «Ir al cierre del torneo» y llega a **Cerrar torneo (O15)**.
23. Ve «¡FINAL REGISTRADA!», el podio (Johitan +300 pts, NovaK +150 pts, Sh4dow +80 pts), el resumen (32 jugadores, 31 partidos, 5 rondas) y la lista de verificación: todos los resultados registrados, bracket completo y puntos de ranking calculados.
24. Toca «Finalizar y publicar resultados». Los resultados se publican y el historial y los rankings de todos los jugadores se actualizan al instante.
25. También puede tocar «Compartir resultados».

## Estados

### De un partido
| Estado | Dónde se ve | Qué muestra |
|---|---|---|
| EN CURSO | J16 | Etiqueta EN CURSO en «Tu partido». No muestra marcador hasta que se reporta el resultado. |
| PENDIENTE | O12 | Etiqueta amarilla PENDIENTE en la tarjeta del partido cuyos reportes esperan confirmación. |
| Con resultado | J16, O12 | Marcador de cada lado; el ganador lleva el marcador en acento. Los partidos de J16 llevan «Ver prueba». |
| Por definir | J16, O12 | Lugar sin rival, con avatar gris y «Por definir». |
| Partido propio | J16 | Caja con borde de acento. En O12, borde azul. |

### De la prueba de un partido (J16b)
- **CONFIRMADO:** el organizador subió la prueba y confirmó el resultado.

### De los reportes de los jugadores (O13)
| Estado | Qué muestra |
|---|---|
| Reporte con captura | Miniatura de la captura a la derecha de la fila. |
| Reporte sin captura | Solo el texto del marcador y la hora. |
| Reporte con check verde | Check verde a la derecha de la fila. Se asume que significa que coincide con el otro reporte; hay que confirmarlo. |
| Los reportes coinciden | Aviso verde con el ganador sugerido. |
| Los reportes no coinciden | Se abre una disputa formal (flujo «Incidencias de partido»; la pantalla no está en este flujo). |

### De la ronda (O12)
- **Faltan resultados:** el texto «Faltan N resultados de Octavos para avanzar» y «Avanzar a Cuartos» deshabilitado (se asume por el texto; el estado deshabilitado no se ve dibujado).
- **Todos los resultados registrados:** «Avanzar a Cuartos» habilitado.

### Del cierre del torneo (O15)
- **Lista de verificación completa:** los tres puntos con check verde (resultados, bracket, puntos de ranking). Si falta alguno, la pantalla no lo muestra.
- **Torneo publicado:** al tocar «Finalizar y publicar resultados». Lo que se ve después no está dibujado.

### Estados que las pantallas no muestran
- «Reporte enviado», reporte rechazado y partido sin reportes.
- Reportes que no coinciden (aviso de diferencia en O13).
- Ronda previa para completar el cuadro, y jugadores que pasan sin rival.
- Vistas de Cuartos, Semis y Final, y el partido por el tercer puesto.
- Errores de red o de validación al enviar o confirmar.

## Qué pasa después

- **Reporte del jugador:** el reporte llega al organizador y aparece en «Reportes de los jugadores» de O13, con la hora y la captura si la subió. La tarjeta del partido en O12 refleja que ambos reportaron.
- **Confirmar resultado:** el partido queda registrado, la prueba queda visible para los jugadores con «Ver prueba» y el ganador pasa a la siguiente ronda.
- **Reportes que no coinciden:** se abre una disputa formal en el flujo «Incidencias de partido» (D1 para el jugador y D2 para el organizador). Esta spec solo menciona a dónde se va.
- **Avanzar de ronda:** al avanzar, los ganadores ocupan los lugares «Por definir» de la ronda siguiente.
- **Cierre del torneo:** al finalizar y publicar los resultados se actualizan al instante el historial y los rankings de todos los jugadores (flujo «Jugador progreso y cuenta», J18 a J21). Cada jugador puede ver su resultado final (pantalla F1 de «Jugador competir»).
- **Puntos de ranking:** los 3 primeros reciben puntos (+300, +150, +80 en el ejemplo). Los valores salen de la configuración del torneo.
- **Compartir:** J16 y O15 tienen botones de compartir; el contenido que se comparte no está definido.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Torneo «Equipo vs equipo»** (viene de la configuración, flujo «Organizador panel y creacion»)
- Nombre.
- Formato: eliminación directa (el único que entra al MVP).
- Jugadores por equipo (de 1 a 5).
- Cupos (cantidad de equipos; potencias de 2, con una ronda previa si no lo son).
- Tiempo por partida («el reloj corre al iniciar»).
- Puntos de ranking del podio (1.º, 2.º y 3.º).

**Participantes**
- Nombre, avatar, color y seed (viene de la inscripción).

**Ronda y partido**
- Número de ronda, emparejamiento (qué participante contra cuál), estado y hora.

### Se escribe

**Reporte del jugador**
- Jugador, partido, marcador de cada lado, ganador, captura opcional y hora de envío.

**Resultado del partido** (lo registra el organizador)
- Marcador de cada lado, ganador, prueba del resultado (quién la subió y cuándo) y su estado (confirmado).

**Bracket**
- Emparejamientos de cada ronda, ganadores que avanzan, y la ronda actual del torneo.

**Partido por el tercer puesto**
- Los dos perdedores de las semifinales, marcador y ganador.

**Cierre del torneo**
- Podio (1.º, 2.º y 3.º) y puntos de ranking de cada puesto.
- Resumen: jugadores, partidos y rondas.
- Estado publicado.
- Actualización del historial y del ranking de cada jugador.

### Reglas que dicen las pantallas
- Quien pierde un partido queda fuera del torneo (formato de eliminación directa).
- Los dos lados de cada partido reportan el marcador, y el organizador valida y registra el resultado.
- La captura de un jugador solo la ve el organizador. La prueba del resultado la ven los jugadores.
- Si los dos reportes no coinciden, se abre una disputa formal.
- El ganador de cada partido pasa a la siguiente ronda.
- Para avanzar de ronda deben estar registrados todos los resultados de la ronda actual.
- Los cupos son potencias de 2. Si no lo son, se juega una ronda previa para completar el cuadro (lo dice la configuración).
- Los cupos pueden ser de 2 a 128 equipos.
- El 3.º puesto sale de un partido entre los perdedores de las semifinales.
- El cierre exige tener todos los resultados registrados, el bracket completo y los puntos de ranking calculados (O15).

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Crear y configurar el torneo** (O01 a O06, O03, EvE · O1b), en «Organizador panel y creacion».
- **Inscribirse** (J06 a J12, y la inscripción por equipo), en «Jugador, descubrir e inscribirse». Ahí se asigna el seed.
- **Check-in y chat** (J14, J15, O11, O14), en «Jugador competir» y «Orgamizador gestion del torneo».
- **Battle royale** y **Bracket por puntos**, las otras modalidades, con sus propias carpetas.
- **Incidencias de partido** (D1, D2, W1, W2, W3): disputas y W.O., con su propia spec.
- **Ranking e historial** (J18 a J21) y **resultado final del jugador** (F1): se actualizan al cerrar, pero se describen en sus carpetas.
- **Estadísticas del torneo** (O16), en «Organizador cierre datos y perfil».

Dentro del MVP, no incluido en este flujo:
- **Doble eliminación** y **Fase de grupos**: los dos formatos de esta modalidad que no entran al MVP.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Bracket con equipos.** La modalidad «Equipo vs equipo» entra completa al MVP, pero todas las pantallas de este flujo muestran un jugador por lado. Faltan las versiones con nombres de equipo y tag (como «Los Cóndores · CND»), cómo se ven los integrantes y el marcador por equipo.
2. **Inscripción por equipo.** Se decidió que las pantallas E1, E2 y E3 vuelven al MVP. La spec «Jugador, descubrir e inscribirse» las quitó, y hay que restaurarlas ahí (pantallas, estados, datos y preguntas). Tampoco se sabe si la Copa Relámpago Bogotá (el torneo del ejemplo) es un torneo con 1 jugador por equipo.
3. **Formatos que no entran.** La doble eliminación y la fase de grupos están en la configuración (O03), pero no entran al MVP. Hay que quitarlos o deshabilitarlos, igual que lo que habla de jugadores por equipo si no se cambia.
4. **Texto de J17 y reportes distintos.** J17 dice «Si ambos reportan distinto, decide el organizador», pero se decidió que los reportes distintos abren una disputa formal. Hay que alinear el texto y dibujar en O13 el estado «Los reportes no coinciden».
5. **Partido por el tercer puesto.** Se decidió que el 3.º sale de un partido entre los perdedores de las semifinales. Falta en Figma (por ejemplo, como una pestaña o un partido junto a la Final).
6. **Marcador de «Tu partido» en J16.** Se decidió que el partido no tiene marcador en vivo. La tarjeta de J16 muestra 1 – 0 mientras el partido está EN CURSO, y el bracket muestra «–» en ese mismo partido. Hay que cambiar la tarjeta para que no muestre marcador hasta que se reporta el resultado.

**Pendientes de definir**

7. **«Reordenar semillas» (O12).** No está definido qué hace el botón ni cuándo se puede usar. Además contradice la spec de inscripción, donde el seed es el orden de inscripción y queda fijo (J11 lo muestra como definitivo). Hay que definir si el organizador puede cambiar las semillas, hasta cuándo, y si los jugadores reciben un aviso.
8. **Avanzar de ronda.** Se asume que «Avanzar a Cuartos» se habilita cuando todos los resultados de la ronda están registrados (lo dice «Faltan 2 resultados de Octavos para avanzar»). No se ve el estado deshabilitado, ni qué pasa si un jugador no se presenta (W.O.), ni qué muestra el botón en la última ronda.
9. **Cantidad de equipos que no es potencia de 2.** EvE · O1b dice «Si no es potencia de 2, se juega una ronda previa para completar el cuadro». No hay pantalla de cómo se ve esa ronda ni de a quién le toca jugarla. La Copa Relámpago tiene 24 inscritos de 32 cupos.
10. **Quién reporta por el equipo.** Cuando cada lado es un equipo de varios jugadores, ¿reporta solo el capitán o cualquier integrante? ¿Qué pasa si dos integrantes reportan distinto? Hoy las pantallas muestran un jugador por lado.
11. **Datos que no cuadran entre pantallas.**
    - J16 y O12 dicen «16 equipos» con Octavos como primera ronda, y O15 cierra con 32 jugadores, 31 partidos y 5 rondas. Con 32 la primera ronda sería Dieciseisavos.
    - En J16 el partido de Mafe contra ZeroX ya está jugado (1 – 2, con «Ver prueba»), y en O12 el mismo partido aparece sin marcador.
    - La ronda siguiente de J16 tiene «Por definir» vs Sh4dow y ZeroX vs Lupe; la de O12 tiene «Por definir» vs Sh4dow y «Por definir» vs Lupe.
    - El bracket muestra 4 de los 8 partidos de Octavos.
12. **Pestañas de ronda.** Solo está dibujada la ronda de Octavos. Faltan Cuartos, Semis, Final, la ronda previa y cómo se ve el bracket completo (con scroll horizontal).
13. **Qué ve el jugador al reportar.** J17 no muestra qué pasa después de «Enviar resultado»: ¿hay confirmación, un estado «Reporte enviado», se puede corregir? ¿Cuándo se habilita «Reportar resultado»? ¿Qué pasa si el organizador rechaza el reporte?
14. **Marcador.** Los contadores de J17 y O13 muestran 2 y 1. ¿Hay un máximo o depende del juego? La prueba de J16b dice «FINAL · 90:00», lo que parece un partido de fútbol.
15. **Prueba del resultado (J16b).** La imagen parece una tarjeta ilustrada («FINAL · 90:00 · SH4DOW 2 – 0 KAIRO»), no una captura real. ¿Es la captura que sube el organizador o una tarjeta generada?
16. **Tiempo por partido.** La configuración tiene «Tiempo por partido: 30 min, el reloj corre al iniciar» (O03), pero este flujo no muestra un reloj ni cómo empieza el partido.
17. **Disputas formales.** El Brief deja fuera «un mecanismo formal de resolución de disputas» del MVP. D1 y D2 están dibujadas para partidos de dos lados, así que encajan aquí. Hay que confirmar que entran al MVP, y cómo se resuelve cuando cada lado es un equipo.
18. **Cierre del torneo.**
    - O15 muestra la lista de verificación completa, pero no cómo se ve con resultados pendientes, ni si se puede cerrar así.
    - Después de «Finalizar y publicar resultados» no hay pantalla de confirmación; ¿se notifica a los jugadores? ¿Se puede deshacer?
    - Los puntos de ranking (+300, +150, +80) vienen de la configuración; el UI kit propone valores distintos según el juego, y las pantallas no muestran el juego de la Copa Relámpago.
    - O15 habla de «32 jugadores», aunque la modalidad se llama «Equipo vs equipo».
19. **Compartir y botón de intercambio.** J16 y O15 tienen botones de compartir, y no muestran qué se comparte ni con qué formato. El botón de intercambio de O12 no tiene destino.
20. **Cómo se llega a J16 y O12.** Las pantallas no muestran el camino desde «Ver bracket» (J11), Mis torneos o la gestión del torneo. J11 promete ver el bracket antes de que exista (se genera después del check-in): ¿qué ve el jugador? El UI kit tiene el estado «El bracket aún no se publica».

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Versión inicial. Basada en las pantallas J16, J16b, J17, O12, O13 y O15, y en las respuestas del equipo: la modalidad con equipos entra completa al MVP, la inscripción por equipo (E1 a E3) vuelve al MVP, solo entra la eliminación directa, los reportes que no coinciden abren una disputa formal, «Reordenar semillas» queda sin definir, el 3.º puesto sale de un partido entre los perdedores de las semifinales (falta en Figma), y el partido no tiene marcador en vivo. |
