# Incidencias de partido

Carpeta de pantallas: `design/flujos/incidencias-de-partido/`

## Quién y para qué

**Quién:** dos roles sobre el mismo partido de un torneo.
- **El jugador** que juega el partido (modo Jugador, acento naranja).
- **El organizador** del torneo (modo Organizador, acento azul).

**Para qué:** resolver las dos cosas que pueden bloquear un partido.
- **Disputa:** los dos jugadores reportan marcadores distintos. El jugador ve que su resultado está «en disputa», y el organizador revisa la evidencia, elige al ganador y sube la captura oficial.
- **W.O.** (walkover): un jugador no hace check-in y no se presenta. El organizador resuelve el partido con una victoria por W.O. para el otro jugador. Cada jugador ve su resultado: «¡Avanzas por W.O.!» o «Perdiste por W.O.».

**Por qué importa:** son exactamente los problemas que más duelen según las entrevistas (mantener el orden durante el torneo y resolver disputas). Además, sin resolverlos el bracket se queda trabado, porque avanzar de ronda exige todos los resultados registrados.

**Resultado:** el partido queda resuelto, el ganador avanza a la siguiente ronda y los dos jugadores saben qué pasó y por qué.

**Alcance del MVP:**
- Los reportes que no coinciden abren una **disputa formal** (la decisión de las otras modalidades también apunta aquí).
- Del W.O. entra solo la **victoria por W.O.**. Descalificar al jugador y reprogramar el partido no entran.

**Caso de ejemplo para el paso a paso:** la **Copa Relámpago Bogotá**, Octavos, Partido 1, Johitan contra NovaK, con las dos incidencias:
- **Disputa:** Johitan reporta 2 – 1 y NovaK reporta 1 – 2 (dice haber ganado). Johitan ve D1 y el organizador resuelve en D2.
- **W.O.:** Johitan hace check-in a las 6:52 pm y NovaK no se presenta. El organizador resuelve en W1. Johitan ve W2 y NovaK ve W3.

## Pantallas

| ID | Pantalla | Quién | Qué es |
|---|---|---|---|
| D1 | Jugador · Resultado en disputa | Jugador | Aviso de que los reportes no coinciden y de que el organizador decidirá. |
| D2 | Organizador · Resolver disputa | Organizador | Revisión de la evidencia, elección del ganador y captura oficial. |
| W1 | Organizador · Jugador no se presentó | Organizador | Resolución de un partido cuando un jugador no hizo check-in. |
| W2 | Jugador · Avanzas por W.O. | Jugador (ganador) | Aviso de que pasa a la siguiente ronda sin jugar. |
| W3 | Jugador · Perdiste por W.O. | Jugador (perdedor) | Aviso de que queda fuera del torneo. |

### Qué muestra cada pantalla

**D1 · Jugador · Resultado en disputa**
- Botón cerrar (X), título «Resultado en disputa» y subtítulo «Octavos · Partido 1».
- Tarjeta con los dos jugadores (Johitan y NovaK), cada uno con su avatar, su nombre y el marcador (2 y 1) con los botones − y +.
- Aviso ámbar «Los reportes no coinciden»: «Tú reportaste 2 – 1 y NovaK reportó 1 – 2. El organizador revisará las pruebas y decidirá.»
- Aviso informativo «Te avisaremos cuando decida»: «La prueba oficial aparecerá en el bracket con «Ver prueba».»
- Botones «Ir al chat del torneo» (principal) y «Volver al bracket» (secundario).

**D2 · Organizador · Resolver disputa**
- Botón cerrar (X), título «Resolver disputa» y subtítulo «Octavos · Partido 1».
- Tarjeta con los dos jugadores y un contador con − y + sobre el marcador (2 y 1), en azul.
- Sección «Reportes de los jugadores»:
  - «Johitan reportó 2 – 1», «Hace 3 min · con captura», con una miniatura de la captura.
  - «NovaK reportó 1 – 2», «Hace 1 min».
- Aviso ámbar «Los reportes no coinciden»: «Revisa la evidencia, elige al ganador y sube la captura oficial.»
- Dos opciones de selección: «Ganador: Johitan» (elegida) y «Ganador: NovaK».
- Zona punteada «Prueba del resultado» («Los jugadores la verán en el bracket con «Ver prueba».») con botón de subir.
- Botones «Confirmar ganador» (principal) y «Pedir nueva captura» (secundario).

**W1 · Organizador · Jugador no se presentó**
- Botón cerrar (X), título «Resolver partido» y subtítulo «Octavos · Partido 1».
- Sección «Check-in del partido»:
  - «Johitan hizo check-in», «A las 6:52 pm».
  - «NovaK no se presentó», «Sin check-in · tolerancia de 10 min vencida».
- Aviso ámbar «NovaK no se presentó»: «Elige cómo resolver el partido.»
- Tres opciones de selección: «Victoria por W.O. para Johitan» (elegida), «Descalificar a NovaK del torneo» y «Reprogramar el partido».
- Botones «Aplicar decisión» (principal) y «Cancelar».

**W2 · Jugador · Avanzas por W.O.**
- Botón cerrar (X), título «Copa Relámpago Bogotá» y una ilustración 3D de ticket.
- «¡AVANZAS POR W.O.!» y el texto «NovaK no hizo check-in a tiempo. Pasas a Cuartos sin jugar; tu siguiente partido es a las 8:00 pm.»
- Datos: fecha (Sáb 4 Oct), hora (7:00 pm), ronda (Cuartos) y estado (CONFIRMADA).
- Botones: «Ver bracket» (principal), «Ir al chat del torneo» (secundario) y el link «Agregar al calendario».

**W3 · Jugador · Perdiste por W.O.**
- Diálogo sobre la vista del bracket (J16, con sus pestañas por ronda y la tarjeta «Tu partido»).
- Ícono de advertencia rojo, título «Perdiste por W.O.» y el texto «No hiciste check-in a tiempo en Octavos. Quedas fuera de este torneo, pero sumas tu participación.»
- Botones «Ver otros torneos» (principal) y «Entendido» (secundario).

## Paso a paso

Caso: Copa Relámpago Bogotá, Octavos, Partido 1: Johitan contra NovaK.

### A. Disputa: el jugador se entera

1. Johitan reporta el marcador de su partido en **Reportar resultado (J17)**: 2 – 1 a su favor, con captura. Es el primero en reportar.
2. NovaK reporta después, en el mismo formulario: 1 – 2 (dice que ganó él). Como su reporte no coincide con el de Johitan, NovaK ve **Resultado en disputa (D1)** enseguida al enviar.
3. Johitan recibe una notificación cuando NovaK reporta, y entra a **Resultado en disputa (D1)** desde ahí.
4. En D1 el jugador ve el aviso «Los reportes no coinciden», con lo que reportó cada uno («Tú reportaste 2 – 1 y NovaK reportó 1 – 2»), y la nota de que el organizador revisará las pruebas y decidirá.
5. Desde D1 puede:
   - Tocar «Ir al chat del torneo» (flujo «jugador-competir», J15).
   - Tocar «Volver al bracket» (J16).
   - Cerrar con la X.
6. El jugador espera. Solo puede corregir su reporte si el organizador pide una nueva captura (ver sección B). Le llega un aviso cuando el organizador decide.

### B. Disputa: el organizador resuelve

7. El organizador abre **Resolver disputa (D2)**. La forma de llegar a esta pantalla no se ve (ver Preguntas abiertas).
8. Ve el marcador del partido (2 – 1) y, en «Reportes de los jugadores», lo que reportó cada jugador, cuándo lo hizo y si adjuntó captura. Johitan reportó 2 – 1 con captura; NovaK reportó 1 – 2 sin captura.
9. Revisa la evidencia y elige al ganador: «Ganador: Johitan» o «Ganador: NovaK».
10. Sube la captura oficial en «Prueba del resultado». Los jugadores la verán en el bracket con «Ver prueba».
11. Toca una de dos opciones:
    - **«Confirmar ganador»:** la disputa queda resuelta. El ganador avanza a la siguiente ronda, la prueba oficial aparece en el bracket con «Ver prueba», y se avisa a los dos jugadores.
    - **«Pedir nueva captura»:** se avisa a los dos jugadores, que pueden corregir su reporte y subir una nueva captura dentro de un tiempo límite. Si no responden a tiempo, el organizador decide sin más evidencia.

### C. W.O.: el jugador no se presenta

12. Antes del partido, cada jugador hace su check-in (flujo «jugador-competir»). Johitan hizo check-in a las 6:52 pm. NovaK no lo hizo.
13. Cuando vence la tolerancia de 10 minutos sin que NovaK haga check-in, el organizador recibe un aviso y queda disponible **Resolver partido (W1)**. La tolerancia la define el organizador al crear el torneo (10 minutos es el valor predeterminado).
14. En W1 el organizador ve el check-in de cada jugador (Johitan «A las 6:52 pm», NovaK «Sin check-in · tolerancia de 10 min vencida») y el aviso «NovaK no se presentó».
15. Elige «Victoria por W.O. para Johitan». Es la única decisión que entra al MVP: «Descalificar a NovaK del torneo» y «Reprogramar el partido» se quitan o se deshabilitan.
16. Toca «Aplicar decisión». «Cancelar» y la X cierran sin aplicar.

### D. W.O.: cada jugador se entera

17. **El ganador (Johitan)** ve **¡Avanzas por W.O.! (W2)**: «NovaK no hizo check-in a tiempo. Pasas a Cuartos sin jugar; tu siguiente partido es a las 8:00 pm.», con la fecha, la hora, la ronda (Cuartos) y el estado CONFIRMADA. Desde ahí puede:
    - **Ver bracket** (J16).
    - **Ir al chat del torneo** (J15).
    - **Agregar al calendario.**
    - Cerrar con la X.
18. **El perdedor (NovaK)** ve **Perdiste por W.O. (W3)**, un diálogo sobre el bracket: «No hiciste check-in a tiempo en Octavos. Quedas fuera de este torneo, pero sumas tu participación.» Desde ahí puede:
    - **Ver otros torneos**, que lleva a Explorar (J07).
    - **Entendido**, que cierra el diálogo.
19. El torneo cuenta como jugado en el historial de NovaK (su contador de torneos sube en uno), pero no suma puntos ni victorias.

## Estados

### De la disputa
| Estado | Dónde se ve | Qué muestra |
|---|---|---|
| En disputa | D1, D2 | Aviso ámbar «Los reportes no coinciden» y los dos marcadores reportados. |
| Nueva captura pedida | No se ve | El organizador pidió una nueva captura; los jugadores tienen un tiempo límite. Falta en Figma. |
| Resuelta | No se ve | El organizador confirmó al ganador y subió la captura oficial. La prueba oficial queda en el bracket con «Ver prueba». |

### De los reportes de los jugadores (D2)
| Estado | Qué muestra |
|---|---|
| Reporte con captura | Miniatura de la captura a la derecha de la fila. |
| Reporte sin captura | Solo el texto del marcador y la hora. |

### Del check-in del partido (W1)
| Estado | Qué muestra |
|---|---|
| Hizo check-in | «Johitan hizo check-in», con la hora (6:52 pm). |
| No se presentó | «NovaK no se presentó · Sin check-in · tolerancia de 10 min vencida». |

### De la decisión del organizador (W1)
| Opción | Estado |
|---|---|
| Victoria por W.O. | Entra al MVP. Es la que tiene pantallas para los jugadores (W2 y W3). |
| Descalificar al jugador del torneo | No entra al MVP. Se quita o se deshabilita. |
| Reprogramar el partido | No entra al MVP. Se quita o se deshabilita. |

### Del jugador después de un W.O.
| Estado | Dónde se ve | Qué muestra |
|---|---|---|
| Avanza por W.O. | W2 | «¡AVANZAS POR W.O.!», con la ronda siguiente y la hora de su siguiente partido. |
| Eliminado por W.O. | W3 | «Perdiste por W.O.»: queda fuera del torneo, pero el torneo cuenta como jugado. |

### Estados que las pantallas no muestran
- Disputa con una nueva captura pedida: el aviso al jugador, la pantalla para subir la nueva captura y el tiempo límite.
- Resultado de la disputa para cada jugador: quién ganó y quién queda fuera, y la notificación de la decisión.
- D1 desde el punto de vista de NovaK (el segundo en reportar).
- Aviso al organizador de que venció la tolerancia.
- Cómo aparece un W.O. dentro del bracket (marcador, etiqueta y «Ver prueba»).
- Los dos jugadores sin check-in, y las incidencias en las otras modalidades.
- Errores de red o de validación al confirmar.

## Qué pasa después

- **Disputa resuelta:** el ganador elegido por el organizador avanza a la siguiente ronda. La prueba oficial aparece en el bracket con «Ver prueba» (flujo «eliminacion-directa-bracket», J16 y O12). El partido ya cuenta como resultado registrado, y «Avanzar de ronda» se habilita cuando todos los resultados están.
- **Notificaciones:** el primer jugador en reportar recibe un aviso cuando el segundo reporta, y los dos reciben un aviso cuando el organizador decide. Las notificaciones son del flujo «jugador-progreso-y-cuenta» (J22).
- **Nueva captura:** si el organizador pide una nueva captura, los dos jugadores reciben el aviso y pueden corregir su reporte dentro del tiempo límite. Si no responden, el organizador decide sin más evidencia.
- **W.O.:** el ganador pasa a la siguiente ronda sin jugar (por ejemplo, a Cuartos), con la hora de su siguiente partido. El perdedor queda fuera del torneo.
- **Historial del perdedor:** el torneo cuenta como jugado, sin puntos ni victorias (flujo «jugador-progreso-y-cuenta», J18 y J19).
- **Siguiente paso del perdedor:** «Ver otros torneos» lo lleva a Explorar (J07).
- **Chat:** «Ir al chat del torneo» en D1 y en W2 lleva al chat (J15).

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Partido**
- Torneo, ronda, número de partido, jugadores, hora y estado.

**Reportes de los jugadores**
- Por jugador: marcador reportado, captura (opcional) y hora.

**Check-in del partido**
- Por jugador: si hizo check-in y a qué hora.

**Configuración del torneo**
- Tolerancia de check-in (por defecto, 10 minutos; la define el organizador al crear el torneo).

**Jugadores**
- Nombre, avatar y color.

### Se escribe

**Disputa**
- Partido, estado (abierta, nueva captura pedida, resuelta), ganador elegido, captura oficial y quién la subió.
- Pedido de nueva captura: cuándo se pidió y tiempo límite.

**Resultado del partido** (cuando el organizador lo resuelve)
- Ganador, marcador oficial y prueba del resultado.

**W.O.**
- Partido, jugador ausente, decisión (victoria por W.O. para el otro jugador) y quién la aplicó.

**Inscripción**
- Estado del perdedor (eliminado por W.O.) y del ganador (avanza a la siguiente ronda).

**Historial del perdedor**
- El torneo cuenta como jugado (el contador de torneos sube en uno), sin puntos ni victorias.

**Notificaciones**
- Aviso al jugador cuyo reporte queda en disputa, aviso a los dos jugadores cuando el organizador decide, aviso de nueva captura, y aviso al organizador de que venció la tolerancia.

### Reglas que dicen las pantallas
- Si los dos reportes no coinciden, se abre una disputa formal: el jugador ve D1 y el organizador resuelve en D2.
- El segundo en reportar ve D1 enseguida. El primero recibe una notificación y entra a D1 desde ahí.
- El jugador solo puede corregir su reporte si el organizador pide una nueva captura.
- «Pedir nueva captura» avisa a los dos jugadores con un tiempo límite. Si no responden, el organizador decide sin más evidencia.
- El organizador elige al ganador y sube la captura oficial. Esta se ve en el bracket con «Ver prueba».
- Un jugador sin check-in al vencer la tolerancia queda en W.O. La tolerancia por defecto es de 10 minutos y la define el organizador al crear el torneo.
- El organizador recibe un aviso cuando vence la tolerancia.
- El MVP solo permite resolver un W.O. con victoria por W.O. para el otro jugador.
- Quien pierde por W.O. queda fuera del torneo, y el torneo cuenta como jugado en su historial, sin puntos ni victorias.
- Quien gana por W.O. pasa a la siguiente ronda sin jugar.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Reportar el resultado cuando los reportes coinciden** (J17, O13), en «eliminacion-directa-bracket».
- **Check-in** (J14, O11), en «jugador-competir» y «organizador-gestion-del-torneo».
- **El bracket** (J16, O12) y su cierre (O15), en «eliminacion-directa-bracket».
- **Chat del torneo** (J15, O14).
- **Notificaciones** (J22) y **perfil e historial** (J18, J19), en «jugador-progreso-y-cuenta».
- **Explorar torneos** (J07), destino de «Ver otros torneos».
- **Crear el torneo** (O02 a O06), donde se define la tolerancia de check-in.

No entra al MVP, aunque está en el diseño:
- **Descalificar a un jugador del torneo** y **reprogramar el partido** (opciones de W1).

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **D1 sin controles.** Se decidió que el jugador no puede corregir su reporte mientras el resultado está en disputa (solo si el organizador pide una nueva captura). D1 muestra el marcador con los botones − y +. Hay que mostrarlo como solo lectura.
2. **D1 desde el punto de vista de NovaK.** Solo está dibujada la vista de Johitan («Tú reportaste 2 – 1 y NovaK reportó 1 – 2»). Falta la del segundo jugador en reportar, que es quien la ve enseguida al enviar.
3. **Pantallas de «Pedir nueva captura».** Falta la pantalla donde el jugador ve la petición del organizador, corrige su reporte y sube la nueva captura, con el tiempo límite visible. Falta también el valor del tiempo límite, y qué ve el organizador mientras espera.
4. **Resultado de la disputa para los jugadores.** D1 promete «Te avisaremos cuando decida». Falta la pantalla o el aviso que ve cada jugador al conocer la decisión (quién ganó y quién queda fuera).
5. **Tolerancia de check-in.** Se decidió que el organizador define la tolerancia al crear el torneo (10 minutos por defecto). No existe ese campo en la configuración del torneo (O03 ni O04).
6. **W1 sin opciones que no entran.** «Descalificar a NovaK del torneo» y «Reprogramar el partido» se quitan o se deshabilitan. Queda una sola decisión posible, así que hay que revisar si W1 necesita la lista de opciones o solo una confirmación.
7. **Fondo de W3.** El diálogo es para quien perdió (NovaK), pero el fondo muestra la vista de Johitan («Tu partido», con Johitan 1 – 0 NovaK y el botón «Reportar resultado»). Debe mostrar la vista de NovaK.
8. **Disputas formales y el Brief.** El Brief deja fuera «un mecanismo formal de resolución de disputas» del MVP. Se decidió que entran los reportes distintos como disputa formal (aquí y en las otras modalidades). Falta alinear el Brief y el texto de J17 («Si ambos reportan distinto, decide el organizador»).

**Pendientes de definir**

9. **Cómo llega el organizador a D2 y a W1.** Las pantallas no muestran el camino: ¿desde la tarjeta del partido en O12, desde la lista de check-in en vivo (O11), desde una notificación? Tampoco se sabe cómo se ve en el bracket un partido en disputa o en W.O.
10. **Desde cuándo se cuenta la tolerancia.** W1 dice «tolerancia de 10 min vencida», con el check-in de Johitan a las 6:52 pm. ¿Se cuenta desde la hora del partido (7:00 pm), desde la apertura del check-in (30 min antes, según las reglas del torneo) o desde otro momento?
11. **Marcador oficial en D2.** D2 tiene los botones − y + sobre el marcador (2 y 1). Si el organizador elige «Ganador: NovaK», ¿el marcador se invierte solo, o debe ajustarlo a mano? ¿Debe coincidir con alguno de los reportes?
12. **Decisión a favor de quien reportó sin captura.** En el ejemplo NovaK reportó sin captura. ¿El organizador puede elegir a un jugador sin evidencia? ¿Cuenta algo la hora en que cada uno reportó?
13. **Disputa sin respuesta.** Si ninguno responde al pedido de nueva captura, el organizador decide sin más evidencia. ¿Cuánto tiempo tiene el organizador para decidir? ¿Qué pasa si no decide y el bracket está esperando?
14. **Los dos jugadores sin check-in.** W1 solo muestra el caso de un jugador ausente. ¿Qué pasa si ninguno se presenta?
15. **Cómo aparece el W.O. en el bracket.** No se ve el marcador, ni una etiqueta de W.O., ni si «Ver prueba» aplica. J16 y O12 no tienen esa variante.
16. **Datos de W2.** Dice «Hora 7:00 pm» y «tu siguiente partido es a las 8:00 pm»: no queda claro a qué se refiere cada una. El estado «CONFIRMADA» tampoco explica qué se confirma.
17. **Cómo se muestra «sumas tu participación».** Se decidió que el torneo cuenta como jugado, sin puntos ni victorias. No se ve cómo aparece en el historial y en el perfil del jugador (por ejemplo, con una etiqueta «W.O.»). Es del flujo «jugador-progreso-y-cuenta».
18. **W2 y W3 como aviso.** W2 es una pantalla completa y W3 un diálogo sobre el bracket. ¿Se abren al entrar a la app, llegan como notificación, o solo se ven al abrir el bracket?
19. **Chat en D1.** «Ir al chat del torneo» lleva al chat general del torneo. ¿El jugador habla ahí con el organizador sobre la disputa, o hay una conversación aparte?
20. **Otras modalidades.** Las cinco pantallas son de un partido de eliminación directa entre dos jugadores. Las specs de Battle royale y bracket-por-puntos mandan los reportes distintos a D1 y D2. Falta definir cómo se ven en esas modalidades (en Por puntos, un W.O. puede dar derrota 0 pts; en Battle royale, no aplica un partido de dos jugadores).
21. **Modalidad con equipos.** La modalidad con equipos entra al MVP. Falta definir el check-in por equipo, quién se presenta, y quién reporta o disputa cuando cada lado son varios jugadores.
22. **Apelar y reincidencia.** No hay forma de apelar la decisión del organizador, ni de registrar que un jugador faltó antes. Queda fuera de las pantallas actuales.

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Versión inicial. Basada en las pantallas D1, D2, W1, W2 y W3, y en las respuestas del equipo: el segundo en reportar ve D1 enseguida y el primero recibe una notificación, el jugador solo corrige su reporte si el organizador pide una nueva captura, «Pedir nueva captura» avisa a los dos jugadores con un tiempo límite, el W.O. se detecta automáticamente al vencer la tolerancia (que define el organizador, 10 minutos por defecto), solo entra la victoria por W.O. (no descalificar ni reprogramar), y «sumas tu participación» significa que el torneo cuenta como jugado sin puntos ni victorias. |
