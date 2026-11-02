# LT Tournament · Mapa de componentes

Cada componente del UI kit (`design/ui kit`), si tiene un equivalente en [shadcn/ui](https://ui.shadcn.com/docs/components) y en qué pantallas aparece. Ordenado de más a menos repetido.

**Cómo lo armé:** revisé una por una las 75 pantallas de `design/flujos/` y anoté qué componentes usa cada una. El conteo es de pantallas, no de veces que aparece el componente dentro de una pantalla. Los IDs de pantalla son los de la sección 4 del `CLAUDE.md`.

**Leyenda**

- ✅ **shadcn**: existe tal cual; solo se le aplican los tokens.
- 🟡 **shadcn + adaptar**: existe una base en shadcn, pero hay que componer o agregar variantes.
- 🔴 **Desde cero**: no existe en shadcn. Son los que más trabajo dan en la sesión 4.
- ⚪ **No se implementa**: está en el kit pero queda fuera del MVP.

Todos los componentes de shadcn usan los tokens de `design/tokens.md`; ninguno lleva un color de acento fijo.

## Resumen

| Tipo | Componentes |
|---|---|
| ✅ shadcn | 16 |
| 🟡 shadcn + adaptar | 15 |
| 🔴 Desde cero | 21 |
| Total en pantallas | 52 |

Además hay 7 componentes del kit que no aparecen en ninguna pantalla (tabla al final).

## Tabla completa

| # | Componente | Clase en el kit | shadcn/ui | Tipo | Pantallas | Dónde aparece | Nota |
|---|---|---|---|---|---|---|---|
| 1 | Botón (Primario · Secundario · Fantasma · Peligro; L · S · XS) | `.btn` | `Button` | ✅ shadcn | 63 | J01, J02, J03 · Jugador, J03 · Organizador, J04, J05, J06, J08, J09, J10, J11, J12, E1, E2 y 49 más | Agregar variantes `secondary`, `ghost`, `danger` y tamaños L/S/XS con los tokens |
| 2 | Topbar (volver / cerrar · título · subtítulo · acción) | topbar | — | 🔴 Desde cero | 51 | J02, J03 · Jugador, J03 · Organizador, J04, J05, J09, J11, J12, E1, E2, E3, J14, J15, F1 y 37 más | Layout simple: grid `44px 1fr 44px`; usa Botón de ícono |
| 3 | Avatar (casco con degradado por usuario) | `.avatar` | `Avatar` | 🟡 shadcn + adaptar | 40 | J06, J09, E2, J14, J15, F1, J18, J20, J21, V1, V3, V4, V5, O01 y 26 más | `AvatarImage` + `AvatarFallback` con el casco y los colores del usuario; tamaños 22–96 |
| 4 | Botón de ícono (vidrio · primario · contorno) | `.iconbtn` | `Button size="icon"` | ✅ shadcn | 26 | J06, J07, J09, J12, J13, J14, J15, J18, J20, J21, J22, V1, V3, V4 y 12 más | Siempre con `aria-label`; badge de punto para notificaciones |
| 5 | Etiqueta de estado (ABIERTO, CONFIRMADA, EN VIVO…) | `.tag` | `Badge` | 🟡 shadcn + adaptar | 25 | J06, J07, J09, J11, J12, E2, E3, J13, J14, V1, O01, O05, O08, O11 y 11 más | Variantes por estado (§6 del kit) + punto `::before` y pulso para EN VIVO |
| 6 | Fila de lista (avatar o ícono · texto · acción) | `.listrow` | `Item` | 🟡 shadcn + adaptar | 23 | J08, J09, J10, J12, E2, J14, J18, J19, J20, J21, J22, J23, V3, O08 y 9 más | Incluye la fila propia `.is-me` |
| 7 | Aviso (success · warning · info · danger) | `.card--success` etc. | `Alert` | ✅ shadcn | 18 | J05, J10, J12, J23, O05, O11, J17, O13, O15, BR · J2, BR · O3, BR · O4, PTS · J2, PTS · O3 y 4 más | Ícono + título + texto, con borde y fondo soft del estado |
| 8 | Fila de opción (radio en tarjeta) y tarjetas de tipo de juego | `.optrow` | `RadioGroup` | 🟡 shadcn + adaptar | 17 | J03 · Jugador, J03 · Organizador, E1, J23, O03, O03b, O03c, EvE · O1b, BR · O1b, PTS · O1b, J17, O13, BR · O3, PTS · J2 y 3 más | `RadioGroupItem` dentro de una tarjeta con borde de acento al seleccionar; incluye selección de ganador y perfil |
| 9 | Segmento / pestañas | `.segment` | `Tabs` | ✅ shadcn | 17 | J08, J13, J18, J20, J21, J24, V3, V4, O01, O07, O17, J16, O12, BR · J1 y 3 más | `TabsList` + `TabsTrigger` con relleno de acento al activarse |
| 10 | Link (Ver todo, Ver prueba, Agregar al calendario) | `.link` | `Button variant="link"` | ✅ shadcn | 16 | J06, J07, J11, J12, E3, J18, V1, V4, V5, O01, O06, O17, O12, BR · O2 y 2 más |  |
| 11 | Chip de filtro / opción rápida | `.chip` | `ToggleGroup` | 🟡 shadcn + adaptar | 15 | J06, J07, J08, J19, J20, V1, V3, O03, O03b, O03c, EvE · O1b, BR · O1b, PTS · O1b, O08 y 1 más | `type="single"` o `"multiple"`; versión con scroll horizontal |
| 12 | Pasos de un flujo (barras de progreso) | `.progress-steps` | — | 🔴 Desde cero | 14 | J02, J03 · Jugador, J03 · Organizador, E1, E2, O02, O03, O03b, O03c, EvE · O1b, BR · O1b, PTS · O1b, O04, O05 | N barras de 4 px; registro (2 pasos), equipo (2) y crear torneo (4) |
| 13 | Tarjeta (base · acento · punteada) | `.card` | `Card` | ✅ shadcn | 14 | J06, J09, E2, J15, J21, V5, O01, O14, O17, O12, BR · J1, BR · O2, PTS · J1, PTS · O2 | Variantes `--accent` y `--dashed` |
| 14 | Barra de navegación flotante (jugador · organizador con FAB «+») | `.navbar` | — | 🔴 Desde cero | 13 | J06, J07, J13, J18, J20, J21, J24, V1, V3, O01, O07, O14, O17 | Cambia pestañas según el modo; el FAB solo en organizador |
| 15 | Stat (ícono · número · etiqueta) | `.stat` | `Card` | 🟡 shadcn + adaptar | 13 | J09, F1, J18, J19, V4, V5, O01, O07, O16, O17, O15, BR · O4, PTS · O4 | Composición sobre `Card`; en grupos de 2 o 3 columnas |
| 16 | Stepper (− valor +) | `.stepper` | — | 🔴 Desde cero | 13 | O03, O03b, O03c, EvE · O1b, BR · O1b, PTS · O1b, J17, O13, BR · J2, PTS · J2, PTS · O3, D1, D2 | Botones de 44 px (ver conflicto Z1 en tokens.md) y valor en display |
| 17 | Campo de texto (label · ícono · ayuda · error · textarea) | `.field` | `Field` + `Input` / `Textarea` | ✅ shadcn | 12 | J03 · Jugador, J03 · Organizador, J04, J05, E1, O02, EvE · O1b, BR · O1b, PTS · O1b, O04, O10, O14 | Ícono a la izquierda con `InputGroup`; contador de caracteres en textarea |
| 18 | Pill (NIVEL 12, ORGANIZADOR, RECOMENDADO) | `.pill` | `Badge` | 🟡 shadcn + adaptar | 12 | J15, J18, V4, V5, O01, O03, O03b, O03c, EvE · O1b, BR · O1b, PTS · O1b, O17 | Variante rectangular de Badge, sin punto |
| 19 | Render 3D (trofeo, ticket, medalla…) con respaldo | `.render3d` | — | 🔴 Desde cero | 12 | J01, J05, J11, E3, J18, J21, J24, V5, O01, O06, O17, W2 | `<img>` con fallback de cuadrado rotado con degradado del acento |
| 20 | Versus / marcador (dos avatares, VS o marcador central) | — | — | 🔴 Desde cero | 9 | J14, J16, J17, O13, PTS · J2, PTS · O3, D1, D2, W3 | Se usa en Sala, Bracket, Reportar y Registrar resultado |
| 21 | Subir archivo (captura, portada) | — | — | 🔴 Desde cero | 8 | O02, J17, O13, BR · J2, BR · O3, PTS · J2, PTS · O3, D2 | Zona punteada con ícono; `<input type="file">` y vista previa en miniatura |
| 22 | Filas clave-valor (resumen, premios) | — | `Card` + `Separator` | 🟡 shadcn + adaptar | 7 | J09, J10, J11, E3, O05, O16, W2 | Fecha / Hora / Seed / Estado; Premios 1°/2°/3° |
| 23 | Tabla de posiciones (# · jugador · columnas · pts) | — | `Table` | 🟡 shadcn + adaptar | 7 | BR · J1, BR · J3, BR · O2, BR · O3, PTS · J1, PTS · J3, PTS · O2 | Fila propia resaltada; columnas cambian por modalidad (Kills/Mejor/Pts o PJ/G/E/P/Pts) |
| 24 | Barra de progreso | `.bar` | `Progress` | ✅ shadcn | 6 | J00, J09, J14, O07, O11, O17 | Cupos, check-in, progreso de nivel |
| 25 | Checkbox / fila de aceptar | `.check` / `.checkrow` | `Checkbox` | ✅ shadcn | 6 | J03 · Jugador, J03 · Organizador, J10, E1, O04, O18 |  |
| 26 | Encabezado de pestaña raíz (título display + acción) | pagehead | — | 🔴 Desde cero | 6 | J07, J13, J20, J21, J24, V3 | Layout simple |
| 27 | Hoja inferior | `.sheet` | `Drawer` | ✅ shadcn | 6 | J08, J10, O09, J16b, BR · J3, PTS · J3 | Filtros, confirmar inscripción, acciones sobre jugador, prueba del resultado |
| 28 | Podio 2° · 1° · 3° | `.podium` | — | 🔴 Desde cero | 6 | F1, J20, V3, O15, BR · O4, PTS · O4 | Avatares, puntos y bases con trofeo 3D en oro/plata/bronce |
| 29 | Switch | `.switch` | `Switch` | ✅ shadcn | 6 | J08, J23, O03b, BR · O1b, O04, O14 |  |
| 30 | Tarjeta de torneo | `.tcard` | — | 🔴 Desde cero | 6 | J06, J07, J13, V1, O01, O17 | Sobre `Card`: arte 64 px, overline del juego, etiqueta, nombre truncado y metadatos. Toda la tarjeta es un botón |
| 31 | Estado vacío | `.empty` | `Empty` | ✅ shadcn | 5 | J24, V1, V3, V4, V5 | Render 3D + título + texto + CTA |
| 32 | Arte de juego / portada | `.art` | — | 🔴 Desde cero | 4 | J06, J09, J10, J12 | Degradado de los colores del juego + franjas; imagen si hay portada |
| 33 | Bracket por ronda (caja de partido de dos filas) | `.bracket` / `.mbox` | — | 🔴 Desde cero | 4 | J16, J16b, O12, W3 | Pestañas de ronda, ganador en acento, «Por definir», «Ver prueba». El componente más complejo |
| 34 | Checklist con check verde (reglas, cierre) | — | — | 🔴 Desde cero | 4 | J09, O15, BR · O4, PTS · O4 | Lista simple con ícono `check` |
| 35 | Encabezado de saludo (avatar · nombre · nivel · campana) | — | — | 🔴 Desde cero | 4 | J06, V1, V5, O01 | Inicio, Panel |
| 36 | Diálogo de confirmación destructiva | `.dialog` | `AlertDialog` | ✅ shadcn | 3 | O10, O18, W3 | Expulsar, cancelar torneo, perdiste por W.O. |
| 37 | Tarjeta de torneo destacada | `.tcard` destacada | — | 🔴 Desde cero | 3 | J06, V1, O05 | Arte a ancho completo, nombre en display, etiqueta y CTA encima |
| 38 | Visor de prueba del resultado | — | `Drawer` | 🟡 shadcn + adaptar | 3 | J16b, BR · J3, PTS · J3 | Imagen con marcador superpuesto + etiqueta CONFIRMADO |
| 39 | Buscador con botón de filtros | `.field` búsqueda | `InputGroup` | 🟡 shadcn + adaptar | 2 | J07, O08 | Ícono search + input + botón de filtros en acento |
| 40 | Campo con botón copiar (código, enlace) | — | `InputGroup` + `Button` | 🟡 shadcn + adaptar | 2 | E2, O06 | CND-7K2Q, lt.gg/copa-relampago |
| 41 | Contador de check-in (00:42:18 · 18/24) | patrón 5.30 | — | 🔴 Desde cero | 2 | J14, O11 | Número display + barra + etiqueta CHECK-IN / EN VIVO |
| 42 | Editor de puntos por resultado (Victoria · Empate · Derrota) | — | — | 🔴 Desde cero | 2 | O03c, PTS · O1b | Tres casillas con número editable |
| 43 | Mensajes de chat (ajeno · propio · organizador · fijado) | `.msg` | — | 🔴 Desde cero | 2 | J15, O14 | Con `ScrollArea`; burbuja propia en acento; anuncio fijado |
| 44 | Selector de juegos (rejilla de portadas con check) | gamePicker | — | 🔴 Desde cero | 2 | J02, O02 | Búsqueda sin tildes + 6 populares + «Ver los 24 juegos» |
| 45 | Acciones rápidas (rejilla de tarjetas-botón) | — | `Card` | 🟡 shadcn + adaptar | 1 | O07 | Abrir check-in, Anuncio, Bracket, Editar |
| 46 | Compositor de chat (input píldora + enviar) | — | `InputGroup` | 🟡 shadcn + adaptar | 1 | J15 | Va en el dock |
| 47 | Etapas del torneo (Publicado → Finalizado) | — | — | 🔴 Desde cero | 1 | O07 | Lista vertical con estado hecho / actual / pendiente |
| 48 | Gráfica de barras | — | `Chart` | ✅ shadcn | 1 | O16 | Inscripciones por día con la barra mayor en acento |
| 49 | Logo LT / splash | — | — | 🔴 Desde cero | 1 | J00 | Solo J00 |
| 50 | Selector de fecha y hora | `.cal` | `Calendar` + `Popover` | ✅ shadcn | 1 | O04 | En O04 se ven como campos; el kit describe el calendario completo |
| 51 | Separador «o continúa con» | — | `Separator` | ✅ shadcn | 1 | J04 |  |
| 52 | Tarjeta de logro | — | `Card` | 🟡 shadcn + adaptar | 1 | J18 | Render 3D + título + detalle |

## Los que se construyen desde cero

Ordenados por cuántas pantallas los necesitan. Los primeros desbloquean más pantallas; los últimos son los más complejos.

| Componente | Pantallas | Por qué no sirve uno de shadcn |
|---|---|---|
| Topbar (volver / cerrar · título · subtítulo · acción) | 51 | Layout simple: grid `44px 1fr 44px`; usa Botón de ícono |
| Pasos de un flujo (barras de progreso) | 14 | N barras de 4 px; registro (2 pasos), equipo (2) y crear torneo (4) |
| Barra de navegación flotante (jugador · organizador con FAB «+») | 13 | Cambia pestañas según el modo; el FAB solo en organizador |
| Stepper (− valor +) | 13 | Botones de 44 px (ver conflicto Z1 en tokens.md) y valor en display |
| Render 3D (trofeo, ticket, medalla…) con respaldo | 12 | `<img>` con fallback de cuadrado rotado con degradado del acento |
| Versus / marcador (dos avatares, VS o marcador central) | 9 | Se usa en Sala, Bracket, Reportar y Registrar resultado |
| Subir archivo (captura, portada) | 8 | Zona punteada con ícono; `<input type="file">` y vista previa en miniatura |
| Encabezado de pestaña raíz (título display + acción) | 6 | Layout simple |
| Podio 2° · 1° · 3° | 6 | Avatares, puntos y bases con trofeo 3D en oro/plata/bronce |
| Tarjeta de torneo | 6 | Sobre `Card`: arte 64 px, overline del juego, etiqueta, nombre truncado y metadatos. Toda la tarjeta es un botón |
| Arte de juego / portada | 4 | Degradado de los colores del juego + franjas; imagen si hay portada |
| Bracket por ronda (caja de partido de dos filas) | 4 | Pestañas de ronda, ganador en acento, «Por definir», «Ver prueba». El componente más complejo |
| Checklist con check verde (reglas, cierre) | 4 | Lista simple con ícono `check` |
| Encabezado de saludo (avatar · nombre · nivel · campana) | 4 | Inicio, Panel |
| Tarjeta de torneo destacada | 3 | Arte a ancho completo, nombre en display, etiqueta y CTA encima |
| Contador de check-in (00:42:18 · 18/24) | 2 | Número display + barra + etiqueta CHECK-IN / EN VIVO |
| Editor de puntos por resultado (Victoria · Empate · Derrota) | 2 | Tres casillas con número editable |
| Mensajes de chat (ajeno · propio · organizador · fijado) | 2 | Con `ScrollArea`; burbuja propia en acento; anuncio fijado |
| Selector de juegos (rejilla de portadas con check) | 2 | Búsqueda sin tildes + 6 populares + «Ver los 24 juegos» |
| Etapas del torneo (Publicado → Finalizado) | 1 | Lista vertical con estado hecho / actual / pendiente |
| Logo LT / splash | 1 | Solo J00 |

**Los más pesados para la sesión 4:** Bracket por ronda, Versus / marcador, Podio, Stepper, Tarjeta de torneo, Selector de juegos y Mensajes de chat. El bracket, el podio y la tabla de posiciones tienen además variantes por modalidad (Equipo vs equipo, Battle royale, Por puntos).

## Componentes del kit que no aparecen en ninguna pantalla

| Componente | Clase en el kit | shadcn/ui | Tipo | Nota |
|---|---|---|---|---|
| Toast | `.toast` | `Sonner` | ✅ shadcn | El kit lo pide («Al enviar con errores mostrar un toast»), pero ninguna pantalla lo muestra |
| Slider de jugadores por equipo | `.range` | `Slider` | ✅ shadcn | El kit lo describe (1–6), pero las pantallas usan stepper + chips (1–5). Ver conflicto Z2 |
| Calendario completo | `.cal` | `Calendar` | ✅ shadcn | Descrito en el kit §5.11; en O04 solo se ven los campos de fecha y hora |
| Bracket completo (todas las rondas con scroll y Campeón) | `.bfull` | — | 🔴 Desde cero | Kit §5.27; ninguna pantalla lo muestra (solo «Por ronda») |
| Mensajes privados del organizador | `.dm-strip` | — | 🔴 Desde cero | Kit §5.26; ninguna pantalla lo muestra |
| Método de pago (Nequi · PSE · Tarjeta) | `.optrow` | `RadioGroup` | ⚪ No se implementa | Pago queda como futuro: no se implementa en el MVP |
| Nota demo | `.demo-note` | — | ⚪ No se implementa | Solo para el prototipo; no va a producción |

## Componentes de shadcn a instalar

Cuando se cree `web/`, estos son los que hay que agregar con `npx shadcn@latest add`:

```
npx shadcn@latest add alert alert-dialog avatar badge button calendar card chart checkbox drawer empty field input input-group item popover progress radio-group separator slider sonner switch table tabs toggle-group scroll-area
```
