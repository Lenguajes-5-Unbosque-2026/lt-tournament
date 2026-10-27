# Estado vacío sin torneos

Carpeta de pantallas: `design/flujos/estado-vacio-sin-torneos/`

## Quién y para qué

**Quién:** cualquier usuario que acaba de registrarse y todavía no tiene actividad.
- **El jugador** (modo Jugador, acento naranja), que no tiene torneos, puntos ni historial.
- **El organizador** (modo Organizador, acento azul), que no ha creado ningún torneo.

**Para qué:** mostrar, en lugar de una pantalla vacía o rota, qué es cada sección y cuál es el siguiente paso. Esta carpeta no es un flujo con pasos. Es un conjunto de **estados vacíos**: variantes de pantallas que ya existen en otros flujos, y que se ven mientras el usuario no tiene nada que mostrar en ellas.

**Por qué importa:** es lo primero que ve cualquier usuario nuevo al terminar el registro. Cada estado vacío convierte el vacío en una acción: el jugador toca «Explorar torneos» para inscribirse, y el organizador toca «Empezar» para crear su primer torneo. Esa primera inscripción o ese primer torneo es lo que activa el producto.

**Resultado:** el usuario nuevo entiende qué verá en cada sección y llega, con un toque, al paso que le da contenido.

**Alcance del MVP:** la inscripción es gratuita, y todos los estados vacíos de esta carpeta ya son parte de las pantallas principales del MVP.

**Caso de ejemplo para el paso a paso:**
- **Jugador:** Johitan acaba de crear su cuenta (Nivel 1, 0 pts). Recorre Inicio, Mis torneos, Rankings y Perfil, y ve el estado vacío de cada uno. En cada uno toca «Explorar torneos».
- **Organizador:** StreamerNova acaba de crear su cuenta como organizador. Ve el panel vacío y toca «Empezar» para crear su primer torneo.

## Pantallas

| ID | Pantalla | Quién | Pantalla completa a la que pertenece |
|---|---|---|---|
| V1 | Inicio · Sin torneos | Jugador | Inicio (J06). |
| J24 (también V2) | Mis torneos · vacío | Jugador | Mis torneos (J13). |
| V3 | Rankings · Sin posición | Jugador | Rankings (J20). |
| V4 | Perfil · Sin historial | Jugador | Perfil competitivo (J18). |
| V5 | Panel organizador · Sin torneos | Organizador | Panel del organizador (O01). |

Nota: la pantalla de Mis torneos vacío está en el diseño como J24, y es la que ocupa el lugar de V2 en la serie. La serie de estados vacíos queda V1, J24 (V2), V3, V4 y V5.

### Qué muestra cada pantalla

**V1 · Inicio · Sin torneos**
- Cabecera con avatar, «Hola, Johitan», «Nivel 1 · 0 pts» y la campana de notificaciones.
- «TU PRÓXIMO TORNEO»: en lugar de la tarjeta del torneo, un recuadro con borde punteado, un ícono de calendario, el título «Aún no tienes torneos», el texto «Inscríbete en uno de los recomendados y aquí verás tu check-in, chat y bracket.» y el botón «Explorar torneos».
- Debajo, el resto de Inicio se mantiene: el torneo destacado («LIGA NOCTURNA», ABIERTO, «Vie 10 Oct», «20/32 cupos», «Inscribirme»), la sección «Para ti» con «Ver todo», chips de juego (Todos, EA FC 25, Valorant, Fortnite) y tarjetas de torneo.
- Barra de navegación con Inicio activo.

**J24 (V2) · Mis torneos · vacío**
- Título «MIS TORNEOS» y segmento de pestañas: Próximos (activa), En curso y Finalizados.
- Ilustración 3D de un calendario.
- Título «Aún no tienes torneos», texto «Inscríbete en uno y aquí verás tu check-in, chat y bracket.» y el botón «Explorar torneos».
- Barra de navegación con Mis torneos activo.

**V3 · Rankings · Sin posición**
- Título «RANKINGS» y botón de búsqueda arriba a la derecha.
- Segmento de pestañas: Global (activa), Por juego y Amigos.
- Chips de juego: EA FC 25 (activo), Valorant y CS2.
- Podio con los tres primeros (NovaK 1.º con 2.310 pts, Sh4dow 2.º con 1.980 pts y Mafe 3.º con 1.720 pts) y la fila del 4.º lugar (ZeroX, «12 torneos», 1.410).
- Debajo, en lugar de la fila propia del usuario, un recuadro con borde punteado, un ícono de trofeo, el título «Aún no apareces en el ranking», el texto «Juega tu primer torneo para sumar puntos y ver tu posición en cada juego.» y el botón «Explorar torneos».
- Barra de navegación con Rankings activo.

**V4 · Perfil · Sin historial**
- Barra superior con el botón de compartir y un botón de ajustes.
- Avatar con anillo de acento, nombre en display («JOHITAN») y «@johitan · Bogotá · desde 2025».
- Etiquetas «SIN JUEGO PRINCIPAL» y «NIVEL 1».
- Segmento «Jugador / Organizador» (activo: Jugador).
- Tres datos: «0 Torneos», «0 Victorias» y «— Mejor puesto».
- Sección «Últimos torneos» con el link «Ver todo».
- En lugar de la lista, un recuadro con borde punteado, un ícono de trofeo, el título «Tu historial está vacío», el texto «Cuando termines tu primer torneo verás aquí tus resultados, logros y puntos.» y el botón «Explorar torneos».

**V5 · Panel organizador · Sin torneos**
- Cabecera con avatar, «StreamerNova», la etiqueta «MODO ORGANIZADOR · NIVEL 1» y la campana de notificaciones.
- Título «TU PANEL DE TORNEOS» y tres datos: «0 En curso», «0 Inscritos» y «0 Finalizados».
- Tarjeta «CREA UN NUEVO TORNEO»: «4 pasos · menos de 5 minutos. Publícalo y compártelo.», un trofeo 3D y el botón «+ Empezar».
- Sección «Mis torneos» con el link «Ver todo».
- En lugar de la lista, un recuadro con borde punteado, un ícono de trofeo, el título «Aún no has creado torneos» y el texto «Toca «Empezar» arriba: en 4 pasos tu torneo queda publicado y listo para compartir.» Este recuadro no tiene botón propio; apunta al botón «Empezar» de la tarjeta de arriba.

## Paso a paso

### A. El jugador nuevo

Caso: Johitan acaba de crear su cuenta como jugador.

1. Termina el registro (y los juegos, o los omite) y llega a **Inicio (V1)**. Ve:
   - Su nombre y que es Nivel 1 con 0 pts.
   - El bloque «TU PRÓXIMO TORNEO» vacío, con el texto «Aún no tienes torneos».
   - El resto de Inicio con contenido: el torneo destacado y la lista «Para ti».
2. Toca «Explorar torneos» en el bloque vacío. Va a **Explorar (J07)** (flujo «jugador-descubrir-e-inscribirse»). También puede tocar «Inscribirme» en el torneo destacado.
3. En la barra de navegación toca **Mis torneos** y ve **Mis torneos (J24)**. Cada una de las tres pestañas (Próximos, En curso y Finalizados) muestra el mismo vacío. «Explorar torneos» lleva a Explorar (J07).
4. Toca **Rankings** y ve **Rankings (V3)**. Ve el ranking de los demás jugadores (podio y lista), y en lugar de su posición, el aviso «Aún no apareces en el ranking». «Explorar torneos» lleva a Explorar (J07).
5. Toca **Perfil** y ve **Perfil (V4)**. Ve su perfil con 0 torneos, 0 victorias y «—» en mejor puesto, la etiqueta «SIN JUEGO PRINCIPAL» y el aviso «Tu historial está vacío». «Explorar torneos» lleva a Explorar (J07).
6. Cuando se inscribe en su primer torneo, el vacío de Inicio y de Mis torneos desaparece (ver «Estados»). Cuando termina su primer torneo, desaparecen el vacío de Rankings y el de Perfil.

### B. El organizador nuevo

Caso: StreamerNova acaba de crear su cuenta como organizador.

7. Termina el registro y llega al **Panel (V5)**. Ve las tres estadísticas en 0 («En curso», «Inscritos» y «Finalizados»), la tarjeta «CREA UN NUEVO TORNEO» y el vacío de «Mis torneos».
8. Toca «+ Empezar» en la tarjeta. Va al primer paso de crear torneo (O02, flujo «organizador-panel-y-creacion»). Es el camino que indica el texto «Toca «Empezar» arriba».
9. Al tener cualquier torneo (aunque sea un borrador), el vacío de «Mis torneos» desaparece.

## Estados

### Cuándo aparece cada estado vacío
| Pantalla | Aparece cuando | Desaparece cuando |
|---|---|---|
| V1 · Inicio (bloque «Tu próximo torneo») | El jugador no tiene un torneo próximo ni en curso, aunque tenga torneos finalizados. El texto es el mismo. | El jugador se inscribe en un torneo (aparece su próximo torneo). |
| J24 (V2) · Mis torneos | El jugador no tiene torneos. Las tres pestañas (Próximos, En curso y Finalizados) muestran el mismo estado vacío. | El jugador tiene torneos que mostrar. |
| V3 · Rankings (tarjeta «Aún no apareces») | El jugador no tiene puntos en ningún juego (no ha terminado ningún torneo). | El jugador termina su primer torneo y suma puntos. A partir de ahí ve siempre su posición. |
| V4 · Perfil (sección «Últimos torneos») | El jugador no tiene historial (no ha terminado ningún torneo). | El jugador termina su primer torneo. |
| V5 · Panel (sección «Mis torneos») | El organizador no tiene ningún torneo, en cualquier estado (borrador, abierto, check-in, en curso, finalizado o cancelado). | El organizador crea cualquier torneo, incluso un borrador. |

### Estados parciales (vacío dentro de una pantalla con contenido)
- **V1:** solo el bloque «Tu próximo torneo» está vacío. El torneo destacado y «Para ti» se mantienen.
- **V3:** solo la fila propia está vacía. El podio y la lista de los demás jugadores se mantienen.
- **V4:** el perfil se muestra completo, con datos en cero, y solo «Últimos torneos» está vacío.
- **V5:** las estadísticas se muestran en 0, y solo «Mis torneos» está vacío. La tarjeta «Crea un nuevo torneo» se mantiene.

### Del juego principal (V4)
- **«SIN JUEGO PRINCIPAL»:** se ve mientras el jugador no elige un juego principal. Lo elige él mismo, en el perfil o en los ajustes, aunque haya marcado juegos durante el registro.

### Estados que las pantallas no muestran
- Estados vacíos de las pestañas «Por juego» y «Amigos» de Rankings.
- Estados vacíos de otras pantallas: resultados de Explorar sin coincidencias, Notificaciones sin avisos, Historial completo (J19), chat sin mensajes, y Amigos sin amigos.
- El texto del vacío de Inicio y de Mis torneos para quien ya jugó torneos y no tiene ninguno próximo.
- Estado de carga y de error de red de cada pantalla.

## Qué pasa después

- **Explorar torneos:** en V1, J24, V3 y V4, el botón «Explorar torneos» lleva a Explorar (J07). Se asume por el nombre del botón; el destino no se ve en las pantallas.
- **Primera inscripción:** al inscribirse en el primer torneo (flujo «jugador-descubrir-e-inscribirse»), el vacío de Inicio y de Mis torneos se reemplaza por el torneo. Los demás vacíos se mantienen hasta terminarlo.
- **Primer torneo terminado:** al terminar el primer torneo, el jugador suma puntos, aparece en el ranking de ese juego y su perfil muestra el resultado en «Últimos torneos» (flujos «jugador-progreso-y-cuenta», J18 a J21). Los textos de los vacíos prometen justo eso («verás aquí tus resultados, logros y puntos»).
- **Empezar (organizador):** en V5, el botón «Empezar» lleva al primer paso de crear torneo (O02). Se asume por el contenido de la tarjeta; el destino no se ve en las pantallas.
- **Primer torneo del organizador:** al crear cualquier torneo, el vacío de «Mis torneos» desaparece y el panel muestra la lista (flujo «organizador-panel-y-creacion», O01).
- **Ver todo:** los links «Ver todo» de V4 y V5 no tienen destino mostrado.

## Datos que usa

Datos que esta spec lee, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se lee

**Del jugador**
- Nombre, avatar, nivel y puntos totales (Nivel 1 · 0 pts).
- Usuario (@johitan), ciudad y fecha de registro («desde 2025»).
- Juego principal (puede estar vacío).
- Cantidad de torneos jugados, victorias y mejor puesto (0, 0 y «—» si no hay).

**Torneos del jugador**
- Inscripciones por estado: próximos, en curso y finalizados.
- Si tiene un torneo próximo o en curso (para el bloque «Tu próximo torneo»).
- Historial de torneos terminados («Últimos torneos»).

**Rankings**
- Puntos del jugador por juego, y si tiene puntos en algún juego.
- Los primeros puestos de cada juego (podio y lista de los demás jugadores).

**Del organizador**
- Nombre, avatar, modo y nivel.
- Torneos creados, en cualquier estado, y su cantidad.
- Estadísticas del panel: torneos en curso, inscritos y finalizados.

**De torneos abiertos**
- Torneo destacado y lista «Para ti» (los datos de cada torneo están en el flujo «jugador-descubrir-e-inscribirse»).

### Reglas que dicen las pantallas
- El estado vacío de Inicio aparece siempre que no hay un torneo próximo ni en curso, aunque haya finalizados.
- Las tres pestañas de Mis torneos muestran el mismo estado vacío.
- El vacío de Rankings aparece solo cuando el jugador no tiene puntos en ningún juego.
- El vacío de Perfil aparece cuando el jugador no ha terminado ningún torneo; el juego principal lo elige el jugador.
- El vacío del panel desaparece apenas el organizador tiene cualquier torneo.
- Un usuario nuevo empieza en Nivel 1 con 0 puntos.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Inicio con contenido** (J06), **Mis torneos con contenido** (J13), **Rankings** (J20 y J21), **Perfil competitivo** (J18) e **Historial** (J19): las pantallas completas, en «jugador-progreso-y-cuenta», «jugador-competir» y «jugador-descubrir-e-inscribirse».
- **Panel del organizador con torneos** (O01): en «organizador-panel-y-creacion».
- **Crear torneo** (O02 a O06): el destino de «Empezar».
- **Explorar e inscribirse** (J07 a J12): el destino de «Explorar torneos».
- **Acceso y registro:** de donde se llega a estos estados por primera vez.
- **Ajustes y modo** (J23): el cambio entre Jugador y Organizador.
- **Elegir el juego principal:** la pantalla donde el jugador lo elige no está en este flujo.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Texto de Mis torneos para todas las pestañas.** Se decidió que las tres pestañas muestran el mismo vacío. El texto «Inscríbete en uno y aquí verás tu check-in, chat y bracket» solo tiene sentido en «Próximos»; en «En curso» y «Finalizados» no encaja. Hay que revisar el texto.
2. **Texto de Inicio para quien ya jugó.** Se decidió que el vacío de Inicio aparece cuando no hay un torneo próximo ni en curso, aunque haya finalizados, con el mismo texto. «Aún no tienes torneos» no es exacto para quien ya jugó. Hay que revisar el texto.
3. **Juego principal sin pantalla.** Se decidió que el jugador elige su juego principal (en el perfil o en los ajustes). No hay pantalla de cómo se elige, y la etiqueta «SIN JUEGO PRINCIPAL» no explica cómo cambiarla. Además, en el registro (J02) el jugador ya marca juegos, y esa elección no define el juego principal.
4. **Panel del organizador.** Las tres estadísticas (En curso, Inscritos y Finalizados) no cuentan los torneos abiertos ni en borrador. Como el vacío desaparece con cualquier torneo, un organizador con solo un borrador vería las tres cifras en 0 y, en «Mis torneos», una lista sin pantalla para ese caso.
5. **Rankings: «Global» con chips de juego.** V3 muestra «Global» activo con un chip de juego (EA FC 25) debajo, y el Brief dice que el ranking es por juego, no entre juegos. Hay que aclarar qué muestra «Global» y qué muestra «Por juego».

**Pendientes de definir**

6. **Destinos de los botones.** «Explorar torneos» se asume que lleva a Explorar (J07), y «Empezar» al primer paso de crear torneo (O02). Ninguno se ve en las pantallas. ¿Explorar llega con algún filtro (por ejemplo, el juego principal o los juegos del registro)?
7. **Vacíos de otras pantallas sin diseñar.** No están dibujados: Explorar sin resultados (búsqueda o filtros), Notificaciones sin avisos, Rankings «Por juego» y «Amigos» sin datos, Historial (J19) vacío, chat sin mensajes y la lista de amigos vacía. ¿Cuáles entran al MVP?
8. **Perfil: segmento «Jugador / Organizador».** V4 tiene el segmento en la pantalla del perfil, y ya existe «Ajustes y modo» (J23). ¿Es el mismo cambio de modo? Además V4 muestra el botón de ajustes arriba a la derecha sin destino mostrado.
9. **Perfil: datos en cero.** «Mejor puesto» muestra «—» y «Torneos» y «Victorias» muestran 0. «desde 2025» se ve en el ejemplo, y no está claro de dónde sale (fecha de registro).
10. **Nivel y puntos.** Los usuarios nuevos empiezan en Nivel 1 con 0 pts. No se ve cómo se sube de nivel (eso es de otros flujos).
11. **Organizador: «Inscritos».** ¿Es el total de jugadores inscritos en todos sus torneos, o los de los torneos en curso? ¿Y qué muestra «Ver todo» en un panel sin torneos?
12. **Barra de navegación.** V4 y V5 no muestran la barra de navegación, y el resto de pantallas sí. ¿Es solo un recorte del diseño, o esas pantallas no la tienen?
13. **Estado de carga y de error.** No hay pantalla para cuando la lista está cargando o falla la conexión. Un usuario con torneos podría ver un instante el estado vacío antes de que carguen sus datos.
14. **Nombres de las pantallas.** J24 y «V2» son la misma pantalla. El resto de la serie usa «V» (V1, V3, V4 y V5). Hay que unificar el ID (por ejemplo, llamarla V2) o dejar la nota. Además, el nombre de la carpeta («estado-vacio-sin-torneos») no refleja que también cubre Rankings, Perfil y el panel del organizador.

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-26 | Versión inicial. Basada en las pantallas V1, J24 (V2), V3, V4 y V5, y en las respuestas del equipo: las tres pestañas de Mis torneos muestran el mismo vacío, el vacío de Inicio aparece cuando no hay torneo próximo ni en curso (aunque haya finalizados) con el mismo texto, la tarjeta de Rankings aparece solo si el jugador no tiene puntos en ningún juego, el juego principal lo elige el jugador, el vacío del panel desaparece con cualquier torneo, y V2 es la pantalla J24. |
| 2026-10-27 | Revisión del PR #3. Equipos queda fuera del MVP de forma definitiva: se quita la pregunta sobre el torneo de equipos en Inicio y el nombre «5v5» del torneo destacado. |
