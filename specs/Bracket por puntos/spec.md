# Bracket por puntos

Carpeta de pantallas: `design/flujos/Bracket por puntos/`

## Quién y para qué

**Quién:** dos roles sobre el mismo torneo.
- **El jugador** inscrito en un torneo de formato «Por puntos» (modo Jugador, acento naranja).
- **El organizador** de ese torneo (modo Organizador, acento azul).

**Para qué:** llevar un torneo «Por puntos», en su versión de **Liga**, desde que empieza hasta su cierre. Los jugadores se enfrentan por rondas, y cada resultado suma puntos a una tabla de posiciones: 3 puntos por victoria, 1 por empate y 0 por derrota. Gana quien sume más.
- El jugador ve la tabla de posiciones, su partido de la ronda, reporta el marcador y consulta las pruebas de sus partidos anteriores.
- El organizador valida los reportes, registra cada resultado con su captura, avanza de ronda y cierra el torneo con el podio.

**Por qué importa:** es la tercera modalidad de competencia del producto (junto a Equipo vs equipo y Battle royale) y la que da un historial de partidos tipo liga. Al cerrar, los resultados se convierten en historial y ranking, que es la propuesta de valor del jugador. También ataca el dolor del organizador: mantener el orden durante el torneo sin hojas de cálculo.

**Resultado:** el torneo queda con una tabla de posiciones final, un podio (1.º, 2.º y 3.º), los puntos de ranking calculados y los resultados publicados. Al cerrar, el historial y los rankings de todos los participantes se actualizan.

**Alcance del MVP:**
- En este flujo se juega de forma **individual** (un jugador por fila de la tabla), aunque la configuración ofrece equipos de hasta 5.
- Los tres formatos de «Por puntos» (Liga, Rondas suizas y Récord de puntos) entran al MVP, pero las pantallas solo muestran la **Liga**; esta spec describe solo ese formato.

**Caso de ejemplo para el paso a paso:** la **Liga Relámpago**, con 16 participantes, 5 rondas y 20 minutos por partido. Se sigue la **Ronda 3**, Johitan contra Mafe, desde las dos perspectivas:
- **Johitan (jugador):** reporta el marcador 21 – 18.
- **El organizador:** confirma que los dos reportes coinciden, registra el resultado y avanza a la Ronda 4, hasta el cierre con Sh4dow, Johitan y Lupe en el podio.

## Pantallas

| ID | Pantalla | Quién | Qué es |
|---|---|---|---|
| PTS · J1 | Tabla y tu partido | Jugador | Tabla de posiciones, tarjeta de su partido, y resultados y pruebas de cada ronda. |
| PTS · J2 | Reportar resultado | Jugador | Formulario para reportar el marcador de su partido. |
| PTS · J3 | Prueba del resultado | Jugador | Hoja con la prueba de un partido ya confirmado. |
| PTS · O2 | Tabla de posiciones | Organizador | Tabla y controles de la ronda (registrar, avanzar y emparejar). |
| PTS · O3 | Registrar resultado | Organizador | Registro y validación del resultado de un partido. |
| PTS · O4 | Cierre y podio | Organizador | Podio, resumen y cierre del torneo. |

### Qué muestra cada pantalla

**PTS · J1 · Tabla y tu partido**
- Barra superior con volver, título «Bracket», subtítulo «Liga Relámpago · Ronda 3 de 5» y botón de compartir.
- Segmento de pestañas: Tabla, Ronda 1, Ronda 2, Ronda 3 (activa: Tabla).
- Tabla con las columnas #, Jugador, PJ, G, E, P y Pts. Muestra 8 filas (Sh4dow 9, Johitan 7, Lupe 6, ZeroX 5, Mafe 4, NovaK 3, Kairo 1 y Tito 1). Los tres primeros llevan el número en dorado, plata y bronce, y la fila de Johitan (2.º) está resaltada con borde de acento.
- Leyenda: «Victoria 3 pts · Empate 1 · Derrota 0».
- Tarjeta «Tu partido · Ronda 3», con la etiqueta PENDIENTE (amarilla), el texto «Vas 2° con 7 pts. Juegas contra Mafe · 20'. Al terminar, reporta el marcador.» y el botón «Reportar resultado».
- Sección «Resultados y pruebas»:
  - Ronda 2 · Johitan 3 – 1 Lupe: «Victoria · +3 pts», con el botón «Ver prueba».
  - Ronda 1 · Johitan 1 – 1 Kairo: «Empate · +1 pt», con el botón «Ver prueba».
  - Ronda 3 · Johitan vs Mafe: «Hoy · 7:00 pm», con el texto «Pendiente».

**PTS · J2 · Reportar resultado**
- Botón cerrar (X), título «Reportar resultado» y subtítulo «Ronda 3 · Liga».
- Tarjeta con los dos jugadores (Johitan y Mafe), cada uno con su avatar, su nombre y un contador con − y + sobre el marcador (21 y 18).
- Sección «Ganador» con dos opciones: «Johitan» («Gana 21 – 18 · +3 pts», elegida) y «Mafe».
- Zona punteada «Sube la captura del marcador» («Opcional · solo la ve el organizador»).
- Aviso informativo: «El organizador valida el resultado. Si ambos reportan distinto, decide el organizador.»
- Botones «Enviar resultado» y «Cancelar».

**PTS · J3 · Prueba del resultado**
- Hoja inferior sobre la tabla de posiciones (J1).
- Título «Prueba del resultado» y subtítulo «Ronda 2 · Johitan vs Lupe».
- Imagen con una medalla 3D y el texto «FINAL · RONDA 2» y «JOHITAN 3 – 1 LUPE».
- «Ganador: Johitan · +3 pts», «Subida por el organizador · hace 2 h» y la etiqueta CONFIRMADO.
- Botón «Cerrar».

**PTS · O2 · Tabla de posiciones**
- Barra superior con volver, título «Bracket», subtítulo «16 participantes · Liga» y un botón de ícono de intercambio.
- Mismas pestañas y misma tabla que J1, con acento azul, y la misma leyenda de puntos.
- Tarjeta «Ronda 3 · Johitan vs Mafe», con la etiqueta PENDIENTE, el texto «Ambos reportaron 21–18. Confirma para sumar los puntos a la tabla.» y el botón «Registrar resultado».
- Botones «Avanzar a Ronda 4» y «Generar emparejamientos».
- Link «Ir al cierre del torneo».
- Nota al pie: «Faltan 2 resultados de la Ronda 3 para avanzar.»

**PTS · O3 · Registrar resultado**
- Botón cerrar (X), título «Registrar resultado» y subtítulo «Ronda 3 · Johitan vs Mafe».
- Tarjeta con los dos jugadores y un contador con − y + sobre el marcador (21 y 18), en azul.
- Sección «Reportes de los jugadores»:
  - «Johitan reportó 21 – 18», «Hace 3 min · con captura», con una miniatura de la captura.
  - «Mafe reportó 21 – 18», «Hace 1 min», con un check.
- Aviso verde «Los reportes coinciden. Johitan suma 3 pts · Mafe suma 0.»
- Opción de selección «Ganador: Johitan».
- Zona punteada «Prueba del resultado» («Los jugadores la verán en el bracket con «Ver prueba».») con botón de subir.
- Botones «Confirmar resultado» y «Cancelar».

**PTS · O4 · Cierre y podio**
- Barra superior con volver, título «Cerrar torneo» y subtítulo «Liga Relámpago Bogotá».
- Título «¡FINAL REGISTRADA!» y el podio con Sh4dow (1.º, +300 pts), Johitan (2.º, +150 pts) y Lupe (3.º, +80 pts).
- Tres datos: 16 Participantes, 40 Partidos y 5 Rondas.
- Lista de verificación: «Todos los resultados registrados», «Tabla de posiciones completa» y «Puntos de ranking calculados».
- Aviso informativo: «Al cerrar se actualiza todo. Historial y rankings de los 16 participantes se actualizan al instante.»
- Botones «Finalizar y publicar resultados» y «Compartir resultados».

## Paso a paso

Caso: Liga Relámpago, Ronda 3, Johitan contra Mafe.

### A. El jugador sigue el torneo

1. Johitan abre el bracket del torneo y ve **Tabla y tu partido (PTS · J1)**, en la pestaña Tabla. Ahí ve:
   - Su posición (2.º) y sus puntos (7), resaltados.
   - Cuántos partidos jugó, ganó, empató y perdió.
   - La leyenda de puntos («Victoria 3 pts · Empate 1 · Derrota 0»).
2. Para ver los partidos de una ronda concreta toca la pestaña Ronda 1, 2 o 3. Esa vista no está dibujada (ver Preguntas abiertas).
3. En la tarjeta **«Tu partido · Ronda 3»** ve contra quién juega (Mafe), cuánto dura el partido (20') y que está PENDIENTE.
4. En **Resultados y pruebas** ve el resumen de sus partidos: Ronda 2 (victoria, +3 pts) y Ronda 1 (empate, +1 pt), cada uno con «Ver prueba».
5. Toca «Ver prueba» de la Ronda 2 y se abre **Prueba del resultado (PTS · J3)**, una hoja sobre la tabla. Ve la imagen de la prueba, el ganador (Johitan, +3 pts), que la subió el organizador hace 2 h y que está CONFIRMADO. Toca «Cerrar» y vuelve a la tabla.

### B. El jugador reporta su resultado

6. Cuando termina el partido contra Mafe, Johitan toca «Reportar resultado» y se abre **Reportar resultado (PTS · J2)**.
7. Escribe el marcador con los contadores − / +: 21 para él y 18 para Mafe.
8. Elige al ganador (Johitan). La opción muestra «Gana 21 – 18 · +3 pts».
9. Si quiere, sube la captura del marcador. Es opcional y solo la ve el organizador.
10. Lee el aviso: el organizador valida el resultado.
11. Toca «Enviar resultado». Lo que ve después de enviar no está en las pantallas (ver Preguntas abiertas).
    - «Cancelar» y la X cierran el formulario sin enviar.

Los empates no se reportan desde este formulario: los registra directamente el organizador.

### C. El organizador controla la ronda

12. El organizador abre el bracket del torneo y ve **Tabla de posiciones (PTS · O2)**, con la misma tabla que ve el jugador, en acento azul, y la tarjeta de la Ronda 3 con el estado del partido («Ambos reportaron 21–18. Confirma para sumar los puntos a la tabla.»).
13. Desde esta pantalla puede:
    - Tocar «Registrar resultado» para registrar el partido.
    - Tocar «Avanzar a Ronda 4». Se habilita cuando todos los resultados de la Ronda 3 están registrados. Mientras falten, la pantalla dice cuántos son («Faltan 2 resultados de la Ronda 3 para avanzar.»).
    - Tocar «Generar emparejamientos». Los emparejamientos de cada ronda se generan solos al avanzar; este botón sirve para volver a sortearlos si el organizador lo necesita.
    - Tocar «Ir al cierre del torneo».
    - Tocar el botón de intercambio de la barra superior (sin destino mostrado).

### D. El organizador registra un partido

14. Toca «Registrar resultado» y se abre **Registrar resultado (PTS · O3)**.
15. Ve el marcador del partido (21 – 18), que puede ajustar con los contadores − / +.
16. En «Reportes de los jugadores» ve lo que reportó cada uno, cuándo lo hizo y si adjuntó captura. En este caso los dos reportaron 21 – 18.
17. La pantalla compara los dos reportes:
    - Si coinciden, muestra el aviso verde «Los reportes coinciden», con los puntos que suma cada jugador (Johitan 3 pts, Mafe 0).
    - Si no coinciden, se abre una disputa formal (flujo «Incidencias de partido»; esa pantalla no se ve aquí).
18. Confirma al ganador («Ganador: Johitan») y sube la prueba del resultado, que los jugadores verán con «Ver prueba».
19. Toca «Confirmar resultado». El partido queda registrado y suma los puntos a la tabla. «Cancelar» y la X cierran sin guardar.
20. Si el partido terminó empatado, el organizador registra el empate directamente, y cada jugador suma 1 punto.

### E. El organizador avanza de ronda y cierra el torneo

21. Cuando todos los partidos de la Ronda 3 están registrados, toca «Avanzar a Ronda 4». Los emparejamientos de la ronda siguiente se generan solos.
22. Repite el ciclo (secciones C y D) hasta la última ronda (la 5).
23. Con todos los resultados registrados, toca «Ir al cierre del torneo» y llega a **Cierre y podio (PTS · O4)**.
24. Ve «¡FINAL REGISTRADA!», el podio (Sh4dow +300 pts, Johitan +150 pts, Lupe +80 pts), el resumen (16 participantes, 40 partidos, 5 rondas) y la lista de verificación: todos los resultados registrados, tabla de posiciones completa y puntos de ranking calculados.
25. Toca «Finalizar y publicar resultados». Los resultados se publican y el historial y los rankings de los 16 participantes se actualizan al instante.
26. También puede tocar «Compartir resultados».

## Estados

### De un partido
| Estado | Dónde se ve | Qué muestra |
|---|---|---|
| PENDIENTE | J1, O2 | Etiqueta amarilla PENDIENTE; en J1 también la hora («Hoy · 7:00 pm»). |
| Victoria | J1 | «Victoria · +3 pts», con el marcador y el botón «Ver prueba». |
| Empate | J1 | «Empate · +1 pt», con el marcador y el botón «Ver prueba». |
| Derrota | J1 | No se ve en las pantallas (valdría 0 pts). |

### De la prueba de un partido (J3)
- **CONFIRMADO:** el organizador subió la prueba y confirmó el resultado.

### De los reportes de los jugadores (O3)
| Estado | Qué muestra |
|---|---|
| Reporte con captura | Miniatura de la captura a la derecha de la fila. |
| Reporte sin captura | Solo el texto del marcador y la hora. |
| Reporte con check verde | Check verde a la derecha de la fila. Se asume que significa que coincide con el otro reporte; hay que confirmarlo. |
| Los reportes coinciden | Aviso verde con los puntos que suma cada jugador. |
| Los reportes no coinciden | Se abre una disputa formal (flujo «Incidencias de partido»; la pantalla no está en este flujo). |

### De la tabla de posiciones
- **Fila propia:** resaltada con borde de acento (J1) o de azul (O2).
- **Top 3:** el número va en dorado, plata y bronce.
- **Tabla parcial:** muestra 8 de los 16 participantes.

### De la ronda (O2)
- **Faltan resultados:** el texto «Faltan N resultados de la Ronda N para avanzar» y «Avanzar a Ronda 4» deshabilitado (se asume por el texto; el estado deshabilitado no se ve dibujado).
- **Todos los resultados registrados:** «Avanzar a Ronda 4» habilitado.

### Del cierre del torneo (O4)
- **Lista de verificación completa:** los tres puntos con check verde (resultados, tabla de posiciones, puntos de ranking). Si falta alguno, la pantalla no lo muestra.
- **Torneo publicado:** al tocar «Finalizar y publicar resultados». Lo que se ve después no está dibujado.

### Estados que las pantallas no muestran
- «Reporte enviado», reporte rechazado y partido empatado registrado por el organizador.
- Reportes que no coinciden (aviso de diferencia en O3).
- Partido sin rival y descanso de un jugador en una ronda con número impar de participantes.
- Vista de los partidos de una ronda (pestañas Ronda 1 a 5), tabla completa, y pantallas de Rondas suizas y Récord de puntos.
- Última ronda: el botón «Avanzar a Ronda N» sin ronda siguiente.
- Errores de red o de validación al enviar o confirmar.

## Qué pasa después

- **Reporte del jugador:** el reporte llega al organizador y aparece en «Reportes de los jugadores» de O3, con la hora y la captura si la subió. La tarjeta de la ronda en O2 refleja que ambos reportaron.
- **Confirmar resultado:** el partido queda registrado, la prueba queda visible para los jugadores con «Ver prueba» y los puntos se suman a la tabla (3 por victoria, 1 por empate, 0 por derrota).
- **Reportes que no coinciden:** se abre una disputa formal en el flujo «Incidencias de partido» (D1 para el jugador y D2 para el organizador). Esta spec solo menciona a dónde se va.
- **Avanzar de ronda:** al avanzar, los emparejamientos de la ronda siguiente se generan solos.
- **Cierre del torneo:** al finalizar y publicar los resultados se actualizan al instante el historial y los rankings de los 16 participantes (flujo «Jugador progreso y cuenta», J18 a J21). Cada jugador puede ver su resultado final (pantalla F1 de «Jugador competir»).
- **Puntos de ranking:** los 3 primeros reciben puntos (+300, +150, +80 en el ejemplo). Los valores salen de la configuración del torneo.
- **Compartir:** J1 y O4 tienen botones de compartir; el contenido que se comparte no está definido.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Torneo «Por puntos»** (viene de la configuración, flujo «Organizador panel y creacion»)
- Nombre.
- Formato: Liga, Rondas suizas o Récord de puntos.
- Jugadores por equipo (en este flujo solo se usa 1, individual).
- Cantidad de participantes y número de rondas (en el ejemplo, 16 y 5).
- Puntos por resultado, editables (en el ejemplo, victoria 3, empate 1 y derrota 0).
- Tiempo por partida (20 min).
- Puntos de ranking del podio (1.º, 2.º y 3.º).

**Participantes**
- Nombre, avatar y color.

**Ronda y partido**
- Número de ronda, emparejamiento (qué jugador contra cuál), hora del partido y estado.

### Se escribe

**Reporte del jugador**
- Jugador, partido, marcador de cada lado, ganador, captura opcional y hora de envío.

**Resultado del partido** (lo registra el organizador)
- Marcador de cada lado, ganador (o empate), puntos de cada jugador, prueba del resultado (quién la subió y cuándo) y su estado (confirmado).

**Tabla de posiciones** (se deriva de los resultados)
- Por jugador: partidos jugados, ganados, empatados, perdidos y puntos.

**Ronda**
- Emparejamientos generados al avanzar de ronda, y la ronda actual del torneo.

**Cierre del torneo**
- Podio (1.º, 2.º y 3.º) y puntos de ranking de cada puesto.
- Resumen: participantes, partidos y rondas.
- Estado publicado.
- Actualización del historial y del ranking de cada jugador.

### Reglas que dicen las pantallas
- Los puntos por resultado son 3 por victoria, 1 por empate y 0 por derrota. Son editables al configurar el torneo, y la leyenda de la tabla los muestra.
- Cada partido dura el tiempo configurado (20 min en el ejemplo).
- Los jugadores reportan el marcador y el organizador valida y registra el resultado.
- Los empates los registra directamente el organizador; no se reportan desde el formulario del jugador.
- La captura de un jugador solo la ve el organizador. La prueba del resultado la ven los jugadores.
- Si los dos reportes no coinciden, se abre una disputa formal.
- Para avanzar de ronda deben estar registrados todos los resultados de la ronda actual.
- Los emparejamientos de cada ronda se generan solos al avanzar. El organizador puede volver a sortearlos.
- Con una cantidad impar de participantes, uno descansa cada ronda (lo dice PTS · O1b).
- El cierre exige tener todos los resultados registrados, la tabla de posiciones completa y los puntos de ranking calculados (O4).

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Crear y configurar el torneo** (O01 a O06, O03c, PTS · O1b), en «Organizador panel y creacion».
- **Inscribirse** (J06 a J12 y E1 a E3), en «Jugador, descubrir e inscribirse».
- **Check-in y chat** (J14, J15, O11, O14), en «Jugador competir» y «Orgamizador gestion del torneo».
- **Equipo vs equipo** y **Battle royale**, las otras modalidades, con sus propias carpetas.
- **Incidencias de partido** (D1, D2, W1, W2, W3): disputas y W.O., con su propia spec.
- **Ranking e historial** (J18 a J21) y **resultado final del jugador** (F1): se actualizan al cerrar, pero se describen en sus carpetas.
- **Estadísticas del torneo** (O16), en «Organizador cierre datos y perfil».

Dentro del MVP, no incluido en este flujo por falta de pantallas:
- **Rondas suizas** y **Récord de puntos** (los dos formatos que no se dibujaron).
- **Ligas por equipos:** este flujo solo muestra el modo individual.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Empates.** Se decidió que los registra directamente el organizador. J2 solo ofrece elegir un ganador entre dos jugadores, lo que es coherente, pero falta definir cómo se ve en O3 (¿hay una opción «Empate» junto a «Ganador»?) y qué ve el jugador cuando su partido se registra como empate.
2. **Texto de J2 sobre reportes distintos.** J2 dice «Si ambos reportan distinto, decide el organizador», pero se decidió que los reportes distintos abren una disputa formal. Hay que alinear el texto con ese camino, y dibujar en O3 el estado «Los reportes no coinciden».
3. **Equipos en la configuración.** O03c ofrece «Jugadores por equipo» de 1 a 5, pero en el MVP este flujo solo juega individual. Hay que quitar o deshabilitar esas opciones, o dibujar las tablas por equipo.
4. **Formatos sin pantalla.** Entran los tres formatos al MVP, pero solo está dibujada la Liga. Faltan las pantallas o variantes de Rondas suizas y de Récord de puntos. Este último («gana el mejor puntaje en sus intentos») no se juega en partidos de dos jugadores, así que sus pantallas serían distintas a las de este flujo.
5. **Disputas formales.** El Brief deja fuera «un mecanismo formal de resolución de disputas» del MVP. Se decidió que los reportes distintos abren una disputa, y D1 y D2 están dibujadas para partidos de dos jugadores, así que encajan aquí. Hay que confirmar que entran al MVP.

**Pendientes de definir**

6. **Cuándo se habilita «Reportar resultado».** En J1 la tarjeta dice «Al terminar, reporta el marcador» y el botón aparece activo con el partido PENDIENTE y programado «Hoy · 7:00 pm». ¿Se habilita a la hora del partido, cuando el organizador lo inicia, o siempre? ¿Qué ve el jugador después de enviar (confirmación, estado «Reporte enviado», corrección)? ¿Qué pasa si el organizador rechaza el reporte?
7. **Avanzar de ronda.** Se decidió que «Avanzar a Ronda 4» se habilita cuando todos los resultados de la ronda están registrados. No se ve el estado deshabilitado en Figma, y falta definir qué pasa si un jugador no se presenta (W.O.). Tampoco se sabe qué ve el organizador en la última ronda (Ronda 5), donde no hay ronda siguiente.
8. **«Generar emparejamientos».** Se decidió que sirve para volver a sortear los emparejamientos. ¿Hasta cuándo se puede hacer (solo antes de que se registren resultados de esa ronda)? ¿Los jugadores reciben un aviso del cambio?
9. **Liga «todos contra todos» con 5 rondas.** O03c dice que la Liga es «Todos contra todos», pero 16 participantes necesitarían 15 rondas, y el torneo tiene 5. ¿Cómo se emparejan, o es una liga parcial? Hay que aclarar el nombre o la regla.
10. **Datos de la tabla que no cuadran.** En J1 y O2 la Ronda 3 está pendiente, pero la tabla ya muestra 3 partidos jugados para todos (Johitan: 2 victorias y 1 empate, 7 pts). Con la Ronda 1 empatada y la Ronda 2 ganada, Johitan tendría 2 partidos y 4 pts. Hay que ajustar los ejemplos, o aclarar si la tabla cuenta la Ronda 3.
11. **Desempate en la tabla.** Kairo y Tito tienen los mismos números (0 G, 1 E, 2 P y 1 pt) y aparecen 7.º y 8.º. ¿Cuál es el criterio de desempate (diferencia de marcador, resultado entre ellos, orden alfabético)?
12. **Pestañas de ronda.** Hay 5 rondas, pero el segmento solo muestra Tabla, Ronda 1, Ronda 2 y Ronda 3. ¿Se desplaza, o las rondas futuras se muestran deshabilitadas? Tampoco está dibujada la vista de los partidos de una ronda.
13. **Tabla completa.** J1 y O2 muestran 8 de los 16 participantes, sin el link «Ver tabla completa» que sí existe en Battle royale. ¿Cómo se ven los 8 restantes?
14. **Cantidad impar de participantes.** PTS · O1b dice «Con número impar, uno descansa cada ronda». No se ve cómo aparece el descanso en la tabla ni en «Tu partido», ni si suma puntos.
15. **Máximo de participantes.** O03c dice «Hasta 64 participantes», y PTS · O1b dice «Entre 2 y 128». Hay que alinearlos.
16. **Rango del marcador.** Los contadores de J2 y O3 muestran 21 y 18, mientras la Ronda 2 fue 3 – 1 y la Ronda 1 fue 1 – 1. ¿El marcador tiene un máximo, o depende del juego?
17. **Prueba del resultado (J3).** La imagen parece una tarjeta ilustrada («FINAL · RONDA 2 · JOHITAN 3 – 1 LUPE»), no una captura real. ¿Es la captura que sube el organizador o una tarjeta generada? Además, dice «FINAL» siendo la Ronda 2 de 5.
18. **Cierre con resultados pendientes.** O4 muestra la lista de verificación completa, pero no cómo se ve con resultados pendientes ni si se puede cerrar así. Después de «Finalizar y publicar resultados» no hay pantalla de confirmación; ¿se notifica a los participantes? ¿Se puede deshacer?
19. **Valores de los puntos del ranking.** O4 muestra +300, +150 y +80 puntos. El UI kit propone otros valores según el juego. Además, las pantallas no muestran de qué juego es la Liga Relámpago. ¿De dónde salen los valores?
20. **Compartir.** J1 y O4 tienen botones de compartir, y no muestran qué se comparte ni con qué formato.
21. **Botón de intercambio en O2.** El ícono de la barra superior no tiene destino: ¿cambia a la vista del jugador, o a otro bracket?
22. **Cómo se llega a J1 y O2.** Las pantallas no muestran el camino desde Mis torneos, desde «Ver bracket» (J11) o desde la gestión del torneo.
23. **Falta una pantalla.** La carpeta tiene J1 a J3 y O2 a O4, pero no hay «PTS · O1». ¿Es la pantalla de cupos personalizados (PTS · O1b), que está en otra carpeta, o falta una pantalla por exportar?
24. **Nombre del torneo.** J1 llama al torneo «Liga Relámpago» y O4 «Liga Relámpago Bogotá». Hay que unificar el nombre.

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Versión inicial. Basada en las pantallas PTS · J1 a J3 y PTS · O2 a O4, y en las respuestas del equipo: los empates los registra directamente el organizador, los reportes que no coinciden abren una disputa formal, los tres formatos entran al MVP (solo la Liga está dibujada), el MVP juega de forma individual, y los emparejamientos de cada ronda se generan solos al avanzar («Avanzar a Ronda N» se habilita cuando todos los resultados están registrados, y «Generar emparejamientos» vuelve a sortearlos). |
