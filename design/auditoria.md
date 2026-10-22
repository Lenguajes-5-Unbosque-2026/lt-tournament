# LTournaments — Qué se tomó de cada referente

Análisis del diseño final en Figma (archivo **LT**, páginas *Flujo* y *📱 Diseño*) comparado con las referencias de la página *Recursos*. Solo se incluyen los referentes con un aporte verificable en las pantallas finales.

## Cómo se hizo este análisis

- Revisé las pantallas finales de *📱 Diseño*: acceso y registro, jugador (descubrir, inscribirse, mis torneos, sala, chat, resultado), perfil, rankings, amigos, notificaciones, ajustes, organizador (panel, crear torneo, gestión, check-in, chat), brackets por modalidad, reporte de resultados, estadísticas, perfil del organizador y estados vacíos. También revisé el sistema de diseño (colores, tipografía, ilustraciones 3D).
- El Figma **no trae anotaciones** que digan "esta pantalla viene de tal referencia". La página *Recursos* solo contiene las 8 imágenes, sin notas. La relación se estableció **comparando visualmente** cada pantalla con cada referencia.
- Nivel de evidencia que uso en cada punto:
  - **Directo**: la pantalla replica la estructura de la referencia.
  - **Adaptado**: la idea viene de la referencia, pero se cambió para móvil o para el alcance del MVP.
  - **Probable**: hay parecido claro, pero no se puede asegurar que sea intencional.

## Adaptaciones comunes a todas las referencias

Las referencias son interfaces de escritorio. El diseño final es **móvil primero** (390 px de ancho), así que en todos los casos:

- La barra lateral de iconos pasó a **barra inferior**. Jugador: Inicio, Explorar, Mis torneos, Rankings, Perfil. Organizador: Panel, Torneos, +, Chat, Perfil.
- Las vistas de varias columnas pasaron a **una sola columna**, con pestañas o chips para cambiar de vista.
- Se descartó todo lo que depende de dinero (precios, pagos), porque el MVP es gratuito.

---

## 1. Plataforma de gaming "Choose your time" (naranja)

**Qué tiene la referencia:** fondo casi negro, un único acento naranja, tarjetas seleccionables (la activa con borde y relleno naranja), panel de resumen con botón de acción naranja sólido y barra lateral con lista de juegos.

| Qué se tomó | Dónde se ve en el diseño | Evidencia |
|---|---|---|
| Tema oscuro con **un único acento naranja** (`#FF7A29` sobre fondo `#0B0B0D`, texto sobre naranja `#160A02`) | Sistema de diseño: *"Tema oscuro con un único acento naranja"*. Todo el modo jugador | Directo |
| **Tarjetas seleccionables** con estado activo en naranja | *Crea tu cuenta* (Jugador / Organizador), *Tus juegos* (portadas con check naranja), *Arma tu equipo* (Crear equipo / Unirme con código), chips y selector de fecha en *Filtros* | Directo |
| **Panel de resumen + botón principal** | *Detalle del torneo*: bloque "Inscripción gratis · Cierra Sáb 8:00 pm" con botón naranja *Inscribirme*. *Confirma tu inscripción*: filas de resumen (Gamertag, Entrada: Gratis) más botón *Confirmar inscripción* | Adaptado |
| Fila de **tres tarjetas** con icono y dato grande | *Detalle del torneo*: Sáb 4 / 7:00 pm / Gratis | Probable |
| Resplandor naranja que sangra desde arriba del fondo | Elipse "Resplandor" en cada pantalla | Probable |

**Cómo se adaptó:**
- El panel de pago pasó a *confirmación de inscripción gratuita*. La entrada se muestra en verde como "Gratis".
- Las tarjetas de planes con precio (700 / 1000 / 2000) no se trasladaron.
- El modo organizador **no usa el naranja**: usa azul. Es una decisión propia del diseño, no viene de ninguna referencia.

---

## 2. Tabla de clasificación con top 3 y filas con estadísticas

**Qué tiene la referencia:** tres tarjetas destacadas arriba, luego filas con avatar, nombre, columnas de estadísticas y un botón al final de cada fila.

| Qué se tomó | Dónde se ve en el diseño | Evidencia |
|---|---|---|
| **Podio de 3** destacado arriba y lista debajo | *Rankings* (Global / Por juego / Amigos): 1° elevado al centro, 2° y 3° a los lados, con avatar, nombre y puntos. Se repite en *¡Quedaste 2°!* y *Cerrar torneo* | Directo |
| **Fila de ranking**: posición, avatar, nombre, dato principal a la derecha | *Rankings* (ZeroX, Kairo, Lupe…) y *Historial competitivo* (chip de posición, torneo, delta de puntos en verde) | Directo |
| **Botón de acción al final de la fila** | Pestaña *Amigos* de *Rankings*: botón *Retar* en cada amigo | Directo |
| **Fila propia resaltada** dentro de la tabla | "Johitan · Tú · 1.240", con borde naranja | Adaptado |
| **Tabla con varias columnas de estadísticas** | Bracket por puntos y Battle royale: columnas # · Jugador · Kills · Mejor · Pts | Adaptado |

**Cómo se adaptó:**
- En *Rankings* cada fila muestra una sola cifra (puntos) en lugar de varias columnas. La tabla multicolumna solo aparece donde hay estadísticas por partida.
- Las tarjetas del top 3 se volvieron pedestales con trofeo 3D (ver referente 6).

---

## 3. Pantalla de enfrentamiento ("versus")

**Qué tiene la referencia:** dos columnas de jugadores enfrentadas, con un eje central y un acento verde lima.

| Qué se tomó | Dónde se ve en el diseño | Evidencia |
|---|---|---|
| **Dos lados enfrentados con "VS" al centro** | *Sala del torneo → Tu primer partido*: Johitan vs NovaK, avatares a ambos lados, "VS" grande, "Octavos · 7:40 pm" y seeds #13 / #4 | Directo |
| Mismo patrón para el **marcador** | *Registrar resultado* (organizador) y *Reportar resultado* (jugador): dos avatares con marcador editable (2 – 1) en el centro | Adaptado |
| Mismo patrón en tarjetas de partido | *Tu partido* dentro del bracket (Johitan 1 – 0 NovaK, "EN CURSO"). *Prueba del resultado*: "SH4DOW 2 – 0 KAIRO" | Adaptado |
| Resolución de partidos entre dos lados | *Resolver partido* (¡Avanzas por W.O.!) y *Resolver disputa* | Probable |

**Cómo se adaptó:**
- La referencia muestra equipos de varios jugadores. El diseño lo simplifica a **1 vs 1**, con un avatar por lado.
- El eje central verde lima pasó a un "VS" naranja.
- La versión por equipos (*Invita a tu equipo*) es una lista vertical de integrantes, no una vista enfrentada.

---

## 4. Bracket (Upper / Lower Bracket)

**Qué tiene la referencia:** tarjetas de partido de dos filas (jugador y puntaje) unidas por líneas entre rondas, con separación entre llave superior e inferior y un trofeo como remate.

| Qué se tomó | Dónde se ve en el diseño | Evidencia |
|---|---|---|
| **Tarjeta de partido de dos filas** (nombre + puntaje) | *Bracket*: Johitan 2 / NovaK 1, Sh4dow 2 / Kairo 0… Ganador del partido resaltado con el color de acento | Directo |
| **Rondas encadenadas**: la siguiente ronda ("Por definir") queda centrada entre dos partidos de la anterior | *Bracket* en modo *Eliminación directa* (16 equipos) | Directo |
| **Estados dentro del bracket** | Etiquetas "Pendiente", "Por definir", "En curso" y botón "Ver prueba" | Adaptado |
| **Trofeo como remate** | Final del bracket, *Cerrar torneo* y *Resultado final* con trofeos 1° / 2° / 3° | Adaptado |

**Cómo se adaptó:**
- Las rondas pasaron a **pestañas** (Octavos · Cuartos · Semis · Final) en lugar de un lienzo horizontal. No hay líneas conectoras visibles: la relación entre rondas se ve por la posición.
- Se añadieron variantes por modalidad que la referencia no tiene: partidas acumuladas (Battle royale), liga y récord de puntos.

**Parte de la referencia que no se dibujó:**
- La vista **Upper / Lower Bracket no tiene pantalla**. *Doble eliminación* aparece solo como opción de formato en *Crear torneo* ("Segunda oportunidad por llave inferior"). El único bracket de partidos enfrentados que se dibujó es el de eliminación directa. Las otras modalidades (Battle royale, liga, récord de puntos) usan tablas de posiciones.

---

## 6. Trofeos 3D (trofeo oscuro con emblema luminoso)

**Qué tiene la referencia:** renders 3D de un trofeo de copa con asas sobre base oscura escalonada, con un emblema geométrico brillante, sobre fondo casi negro.

| Qué se tomó | Dónde se ve en el diseño | Evidencia |
|---|---|---|
| **Trofeos 3D como elemento de marca**: copa con asas sobre base oscura escalonada | Sistema de diseño → *Ilustraciones 3D*: `3d-trofeo-oro`, `plata`, `bronce` | Directo |
| **Familia de objetos 3D con la misma técnica** (metal sobre fondo oscuro con brillo) | Medalla, corona, gema, ticket, mando, chat, calendario y audífonos | Adaptado |
| **Emblema geométrico (rombo / triángulo) al centro** de los objetos | Medalla y ticket 3D | Probable |
| Uso del 3D para dar **volumen a los momentos importantes** | Podios (*Rankings*, *Resultado final*, *Cerrar torneo*), tarjeta *Crea un nuevo torneo* (trofeo), *¡Torneo publicado!* (medalla), *¡Estás dentro!* (ticket), *Logros* del perfil, estados vacíos (calendario) | Directo |
| 3D como **portadas de juego** | Gema (Valorant), audífonos (CS2), corona (League of Legends), mando (Fortnite), medalla (Rocket League) | Adaptado |

**Cómo se adaptó:**
- El brillo verde del emblema pasó a la gama **oro / plata / bronce con acentos naranja**, para integrarse con el acento de la marca.
- La regla de UI del propio diseño lo confirma: *"Sin degradados en botones ni controles. El volumen viene de las ilustraciones 3D y las fotos."*

---

## 7 y 8. Dashboards de telemetría de F1 (rojo)

**Qué tienen las referencias:** paneles modulares con tarjetas de datos, medidores, gráficas de barras y líneas, tablas de posiciones, estado "en vivo" y tarjeta de piloto. El acento es rojo.

| Qué se tomó | Dónde se ve en el diseño | Evidencia |
|---|---|---|
| **Paneles modulares con cifra grande + icono + etiqueta** | *Tu panel de torneos* (En curso 2 / Inscritos 56 / Finalizados 7). *Resumen del torneo* (24/32 Inscritos, 18 Check-in, 3 Lista de espera) | Adaptado |
| **Gráfica de barras con la barra destacada en el color de acento** | *Estadísticas*: "Inscripciones por día", con el jueves resaltado | Adaptado |
| **Estado en vivo** con indicador y avance | *Check-in en vivo*: "18/24" con etiqueta "EN VIVO", barra de progreso y lista de jugadores con estado | Probable |
| **Tabla de posiciones con la fila propia resaltada** | Tabla general de Battle royale y de Liga | Probable |
| Estado del torneo como **secuencia de etapas** | *Resumen*: Publicado → Inscripciones abiertas → Check-in → En curso → Finalizado | Probable |

**Cómo se adaptó:**
- De estas referencias se tomó la **estructura y densidad de datos**, no el color. El rojo no es acento: solo aparece como color de peligro y de "EN VIVO" (por ejemplo en *¿Expulsar a ZeroX?*).
- Los medidores circulares, el mapa y los paneles de video no se trasladaron.
- La vista del organizador usa el azul como acento, no el rojo.

---

## Decisiones del diseño que no vienen de estas referencias

- **Azul para el modo organizador** (ninguna referencia usa azul).
- **Una sola cuenta con cambio de modo** Jugador ⇄ Organizador, con el acento cambiando de naranja a azul.
- Tipografía **Montserrat Black Italic** para titulares y **Inter** para interfaz.
- **Avatares 3D con casco** y portadas de juego de arte original.
- Flujos funcionales propios: check-in, chat del torneo, reporte de resultados con captura, disputas, lista de espera y expulsión con confirmación.

## Pendientes que encontré

1. **Doble eliminación sin pantalla**: la referencia del bracket (Upper / Lower) está ofrecida como formato, pero no hay vista que la muestre.
2. **`3d-balon` vacío**: en *Ilustraciones 3D* ese elemento es un marcador sin imagen. El balón de EA FC 25 se ve en las pantallas como foto, no como render 3D.
