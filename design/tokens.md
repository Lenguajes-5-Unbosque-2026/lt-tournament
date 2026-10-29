# LT Tournament · Tokens de diseño

Valores base del sistema con nombre fijo. En código cada pantalla usa estos nombres (como variable CSS `--nombre` o como clase de Tailwind) y **nunca** un valor suelto.

**Fuentes que crucé:** `design/ui kit` (§2, §3 y §5), las variables y estilos de texto del Figma «LT» (colección «LTournaments · Color», página *📱 Diseño* → *Sistema de diseño v2 → Fundamentos*) y las 75 pantallas de `design/flujos/`.

**Cómo leer las tablas:** la columna «Token» es el nombre que se usa en código (el mismo del UI kit, para no tener dos nombres para lo mismo). La columna «Figma» dice si el valor existe como variable o estilo en Figma (✅ igual, ⚠️ distinto, — no existe).

Al final está la sección **[Valores parecidos o en conflicto](#valores-parecidos-o-en-conflicto)**. No unifiqué nada: cada caso necesita una decisión de ustedes.

---

## 1. Color

El tema es oscuro siempre. Solo el acento cambia por modo: naranja para jugador, azul para organizador. El cambio se hace con `data-mode="org"` en el contenedor raíz; ningún componente lleva el hex del acento escrito.

### 1.1 Superficies y bordes

| Token | Valor | Figma | Dónde se usa |
|---|---|---|---|
| `color-bg` | `#0B0B0D` | ✅ `color/bg` | Fondo de todas las pantallas |
| `color-surface` | `#141418` | ✅ `color/surface` | Tarjetas, campos de texto, filas de lista, hojas inferiores |
| `color-surface-2` | `#1C1C22` | ✅ `color/surface-2` | Chips sin seleccionar, botón secundario, burbuja de chat ajena |
| `color-surface-3` | `#26262E` | ✅ `color/surface-3` | Pista de barras de progreso, pista del switch apagado, íconos neutros |
| `color-border` | `#2C2C35` | ✅ `color/border` | Borde por defecto de tarjetas, campos y filas |
| `color-border-strong` | `#3A3A45` | ✅ `color/border-strong` | Borde del botón secundario, checkbox y radio vacíos, bordes punteados (vacíos, «Sube la portada») |
| `color-overlay` | `rgba(0,0,0,.62)` | ✅ | Atenuado detrás de hojas inferiores y diálogos (J08, J10, O09, O10, O18, W3) |
| `color-glass` | `rgba(255,255,255,.06)` | ✅ `color/glass` | Fondo del botón de ícono sobre imágenes y en topbar |

### 1.2 Texto

| Token | Valor | Figma | Dónde se usa |
|---|---|---|---|
| `color-text` | `#FFFFFF` | ✅ `color/text` | Texto principal, títulos, valores de stats |
| `color-text-2` | `#B4B4BE` | ✅ `color/text-2` | Texto secundario, labels de campos, descripciones |
| `color-text-3` | `#7C7C88` | ✅ `color/text-3` | Metadatos (fecha, cupos), placeholders, ayudas, labels de navbar inactivos. Solo en 12 px o más |

### 1.3 Acento (cambia por modo)

| Token | Jugador | Organizador | Figma | Dónde se usa |
|---|---|---|---|---|
| `color-primary` | `#FF7A29` | `#4C8DFF` | ⚠️ solo existe el naranja | Botón primario, chip y tab seleccionados, links, marcador ganador, ítem activo de navbar |
| `color-primary-pressed` | `#DB5F14` | `#2F6FE0` | ⚠️ solo naranja | Botón primario presionado |
| `color-on-primary` | `#160A02` | `#030D1F` | ⚠️ solo naranja | Texto e íconos sobre fondo de acento (nunca blanco) |
| `color-primary-soft` | `rgba(255,122,41,.14)` | `rgba(76,141,255,.14)` | ⚠️ solo naranja | Fondo de ítem activo de navbar, fila propia (`.is-me`), opción seleccionada, ghost presionado |
| `color-primary-line` | `rgba(255,122,41,.45)` | `rgba(76,141,255,.45)` | ⚠️ solo naranja | Borde de tarjeta destacada, fila propia en rankings e inscritos |
| `accent-rgb` | `255, 122, 41` | `76, 141, 255` | — | Para armar transparencias: `rgb(var(--accent-rgb) / .42)` (glow, sombras de acento) |
| `glow-deep` | `120, 52, 14` | `18, 46, 110` | — | Parte oscura del resplandor superior de cada pantalla |

### 1.4 Estados

| Token | Valor | Soft (fondo 14 %) | Figma | Dónde se usa |
|---|---|---|---|---|
| `color-success` | `#2FD07A` | `color-success-soft` `rgba(47,208,122,.14)` | ✅ | Etiquetas ABIERTO, CONFIRMADA, PUBLICADO; avisos «Los reportes coinciden», «Enlace enviado»; «Gratis»; deltas de puntos (+60) |
| `color-warning` | `#F5B841` | `color-warning-soft` `rgba(245,184,65,.14)` | ✅ | PENDIENTE, BORRADOR, SIN CHECK-IN; avisos «Los reportes no coinciden», «Cupos agotados», «6 jugadores sin check-in» |
| `color-danger` | `#FF5A5F` | `color-danger-soft` `rgba(255,90,95,.14)` | ✅ | Botón peligro (Expulsar, Cancelar torneo), CANCELADO, EN VIVO, errores de campo |
| `color-danger-pressed` | `#E0393F` | — | ✅ | Botón peligro presionado |
| `color-info` | `#5AA9FF` | `color-info-soft` `rgba(90,169,255,.14)` | ✅ | CHECK-IN, LLENO, EN ESPERA; avisos «El organizador valida el resultado», «Puedes cancelar hasta 1 h antes» |

### 1.5 Podio y utilitarios

| Token | Valor | Figma | Dónde se usa |
|---|---|---|---|
| `color-gold` | `#FFC857` | ✅ `color/gold` | Base y borde del 1° en podios (J20, F1, O15, BR-O4, PTS-O4), posición 1 en tablas |
| `color-silver` | `#C9CED6` | ✅ | Base del 2° en podios |
| `color-bronze` | `#D98A55` | ✅ | Base del 3° en podios, posición 3 en tablas |
| `color-disabled-bg` | `#24242B` | ✅ | Fondo de botón deshabilitado («Reenviar en 0:45» en J05, «Inscribirme» en J12) |
| `color-disabled-text` | `#5E5E69` | ✅ | Texto de botón deshabilitado |

### 1.6 Color por juego (arte de portada)

Cada juego tiene dos colores para el degradado de su portada y del arte de respaldo. Están en `data/mock/juegos.csv` (`color_1`, `color_2`) y en el UI kit §5.18. No son tokens de interfaz: no se usan para botones ni textos.

| Juego | `color_1` | `color_2` |
|---|---|---|
| EA FC 25 | `#2FB35A` | `#0B3A19` |
| Valorant | `#E8473F` | `#4A0D0E` |
| CS2 | `#F2A33A` | `#4F2A07` |
| League of Legends | `#5D55E0` | `#171447` |
| Fortnite | `#F07A2C` | `#4A1A05` |
| Rocket League | `#3F78E8` | `#0C1D4B` |
| …otros 18 | ver `juegos.csv` | |

---

## 2. Tipografía

Dos familias, ambas de Google Fonts.

| Token | Valor | Dónde se usa |
|---|---|---|
| `font-display` | `"Montserrat", "Arial Black", system-ui, sans-serif` · solo itálica 800 y 900 | Títulos de pantalla en MAYÚSCULAS, nombres de torneo en portadas, números grandes (contador, marcador, stepper) |
| `font-ui` | `"Inter", system-ui, -apple-system, "Segoe UI", sans-serif` · 400, 500, 600, 700 | Todo lo demás |

### 2.1 Estilos de texto

Tamaño / alto de línea en px. Todos los números usan `font-variant-numeric: tabular-nums`.

| Token | Familia | Peso | Tamaño / línea | Tracking | Figma | Dónde se usa |
|---|---|---|---|---|---|---|
| `text-display-xl` | Montserrat italic | 900 | 34 / 38 | −0.5 px · MAYÚSCULAS | ✅ `Display/XL` | Títulos de pantalla raíz: MIS TORNEOS, EXPLORAR, RANKINGS, ¡ESTÁS DENTRO!, ¡FINAL REGISTRADA! |
| `text-display-l` | Montserrat italic | 900 | 26 / 30 | −0.3 px · MAYÚSCULAS | ✅ `Display/L` | Nombre del torneo en detalle (J09, J12), nombre en perfil (J18, O17) |
| `text-display-m` | Montserrat italic | 800 | 19 / 23 | MAYÚSCULAS | ✅ `Display/M` | Nombre en tarjeta destacada (LIGA NOCTURNA 5V5), «CREA UN NUEVO TORNEO» |
| `text-numeric-xl` | Montserrat italic | 900 | 44 / 48 | −1 px | ✅ `Numeric/XL` | Contador de check-in `00:42:18`, `18/24` en O11, marcador en VS |
| `text-h1` | Inter | 700 | 22 / 28 | −0.2 px | ✅ `Title/H1` | Títulos de estados vacíos y diálogos («¿Expulsar a ZeroX?») |
| `text-h2` | Inter | 600 | 17 / 22 | 0 (Figma −0.1) | ⚠️ `Title/H2` | Título del topbar, títulos de sección («Para ti», «Premios») |
| `text-h3` | Inter | 600 | 15 / 20 | 0 | ✅ `Title/H3` | Nombre del torneo en tarjeta, títulos de fila de lista |
| `text-body` | Inter | 400 | 15 / 22 | 0 | ✅ `Body/Regular` | Texto base, valor de campos de texto, mensajes de chat |
| `text-strong` | Inter | 600 | 15 / 22 | 0 | ✅ `Body/Strong` | Texto base en negrita, valores en filas clave-valor |
| `text-small` | Inter | 400 | 13 / 18 | 0 | ✅ `Body/Small` | Descripciones de opciones, textos de aviso |
| `text-label` | Inter | 500 | 13 / 16 | 0 | ✅ `Label/Medium` | Label de campo de texto, chips, segmento |
| `text-caption` | Inter | 500 | 12 / 16 | 0 | ✅ `Caption` | Metadatos de tarjeta (fecha, cupos), subtítulo del topbar, ayudas |
| `text-overline` | Inter | 600 | 11 / 14 | +1 px · MAYÚSCULAS | ✅ `Overline` | Juego en tarjeta (EA FC 25), encabezados de grupo (ELIGE TU PERFIL, HOY) |
| `text-button-l` | Inter | 600 | 16 / 20 | 0 | ✅ `Button/L` | Botón tamaño L |
| `text-button-s` | Inter | 600 | 14 / 18 | 0 | ✅ `Button/S` | Botón tamaño S |

### 2.2 Tamaños de texto que aparecen en el kit pero no tienen estilo propio

| Valor | Dónde | Nota |
|---|---|---|
| 10.5 px · 600 · MAYÚSCULAS · +1 px | Etiqueta de estado (`.tag`) | Ver conflicto T1 |
| 11 / 14 · 500 | Label de la navbar | Igual tamaño que `text-overline`, distinto peso |
| 13 · 600 | Botón XS | No hay `Button/XS` en Figma |
| 13.5 · 600 | Día del calendario | Medio píxel fuera de la escala |
| 20 / 26 · 600 | Título del estado vacío | Entre `text-h2` (17) y `text-h1` (22) |
| 21 / 26 · 700 | Valor del stat | Fuera de la escala (Figma muestra los stats a 28) |
| 22 px | Valor del stepper pequeño | |
| 34 px | Valor del stepper normal (kit) | En Figma los steppers muestran el valor a 44–48 px |

---

## 3. Espaciado

Retícula de 4/8 px.

| Token | Valor | Dónde se usa |
|---|---|---|
| `space-4` | 4 px | Separación ícono–texto mínima, gap entre etiqueta y valor |
| `space-8` | 8 px | Gap entre chips, gap ícono–texto en botones, separación mínima entre áreas táctiles |
| `space-12` | 12 px | Gap entre botones apilados (`.btn-col`, `.btn-row`), padding de tarjeta compacta, gap en filas de lista |
| `space-16` | 16 px | Padding de tarjeta, separación entre bloques (`.stack`), padding horizontal de chip y campo |
| `space-20` | 20 px | **Margen lateral de pantalla** (todas las pantallas) |
| `space-24` | 24 px | Padding superior de diálogo |
| `space-32` | 32 px | Padding inferior del área de scroll |

### 3.1 Medidas de layout (no son espaciado, pero son fijas)

| Token propuesto | Valor | Dónde se usa |
|---|---|---|
| `layout-screen-w` | 390 px | Ancho base de diseño (iPhone 14) |
| `layout-screen-h` | 844 px | Alto base de diseño |
| `layout-topbar-btn` | 44 px | Columnas laterales del topbar (`44px · 1fr · 44px`) |
| `layout-navbar-h` | 72 px | Alto de la navbar flotante |
| `layout-navbar-inset` | 16 px laterales · 22 px abajo | Posición de la navbar flotante |
| `layout-scroll-pb-nav` | 120 px | Padding inferior del scroll cuando hay navbar |
| `layout-glow-h` | 320 px | Alto del resplandor superior |
| `layout-touch-min` | 44 px | Área táctil mínima de todo lo interactivo |

---

## 4. Radios

| Token | Valor | Figma | Dónde se usa |
|---|---|---|---|
| `radius-sm` | 10 px | ✅ `radius/sm` | Botón S, celdas de calendario, botones del stepper, tabs del segmento |
| `radius-md` | 14 px | ✅ `radius/md` | Botón L, campos, filas de lista, botón de ícono, contenedor del segmento, arte de juego |
| `radius-lg` | 20 px | ✅ `radius/lg` (Figma dice «20–24 tarjetas») | Tarjetas, stats |
| `radius-xl` | 24 px | — | Barra de navegación |
| `radius-sheet` | 28 px | — | Hoja inferior (solo esquinas superiores) y diálogo |
| `radius-pill` | 999 px | ✅ `radius/pill` | Chips, etiquetas de estado, switch |

---

## 5. Sombras

| Token | Valor | Dónde se usa |
|---|---|---|
| `shadow-nav` | `0 12px 32px rgba(0,0,0,.5)` | Barra de navegación flotante |
| `shadow-sheet` | `0 -20px 48px rgba(0,0,0,.55)` | Hoja inferior |
| *(sin token)* `shadow-accent` | no definido | El kit menciona «sombra de acento» en la perilla del slider y en el día seleccionado del calendario, pero no da el valor. Ver conflicto S1 |

---

## 6. Movimiento

| Token | Valor | Dónde se usa |
|---|---|---|
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Todas las transiciones |
| `dur-fast` | 160 ms | Hover, press, toggles, cambio de chip o tab |
| `dur` | 260 ms | Entrada de pantalla (fade + `translateX(18px)`), overlays |
| `dur-sheet` *(propuesto)* | 340 ms | Hoja inferior `translateY(100%) → 0` |
| `dur-dialog` *(propuesto)* | 300 ms | Diálogo `scale(.94) → 1` |
| `dur-toast` *(propuesto)* | 320 ms entrada · 2,4 s visible | Toast |
| `dur-bar` *(propuesto)* | 600 ms | Relleno de barra de progreso |
| `pulse-live` *(propuesto)* | 1,2 s | Punto pulsante de EN VIVO |

`press`: `scale(.98)` en botones, `.99` en tarjeta de torneo, `.94` en avatares. Con `prefers-reduced-motion` se quitan las animaciones.

---

## 7. Iconografía

Rejilla de 24 × 24, trazo de 2 px, extremos redondeados, sin relleno, `stroke="currentColor"`. Si falta uno se usa Lucide.

| Token | Valor | Dónde se usa |
|---|---|---|
| `icon-btn` | 20 px | Ícono dentro de botón L y botón de ícono |
| `icon-btn-s` | 16 px | Botón S y XS |
| `icon-nav` | 22 px | Barra de navegación |
| `icon-chip` | 14 px | Chip, link |
| `icon-meta` | 13 px | Metadatos de tarjeta (calendario, usuarios) |

---

## 8. Equivalente para Tailwind

El bloque CSS del UI kit (§3) ya define todas las variables. En `web/` se conectan a Tailwind así, para que en el código se escriba `bg-surface`, `text-ink-2`, `rounded-md`, nunca un hex:

| Clase Tailwind | Variable |
|---|---|
| `bg-bg` | `--color-bg` |
| `bg-surface`, `bg-surface-2`, `bg-surface-3` | `--color-surface*` |
| `border-line`, `border-line-strong` | `--color-border*` |
| `text-ink`, `text-ink-2`, `text-ink-3` | `--color-text*` |
| `bg-primary`, `text-primary`, `bg-primary/15` | `rgb(var(--accent-rgb) / <alpha>)` |
| `text-primary-on` | `--color-on-primary` |
| `text-success`, `bg-success-soft`… | `--color-success*`, etc. |
| `rounded-sm/md/lg/xl/full` | `--radius-*` |
| `font-display`, `font-sans` | `--font-display`, `--font-ui` |

> Ojo: el bloque de Tailwind del UI kit escribe `success`, `warning`, `danger`, `info`, `gold`, `silver` y `bronze` como hex fijos. Conviene que apunten a la variable (`var(--color-success)`) igual que el resto. Ver conflicto C5.

---

## Valores parecidos o en conflicto

No unifiqué ninguno. Para cada uno hay que decidir si se fusiona, se deja como está o se agrega al kit.

### Color

| # | Qué encontré | Valores | Por qué importa |
|---|---|---|---|
| C1 | **El azul del organizador casi igual al azul `info`** | `color-primary` org `#4C8DFF` vs `color-info` `#5AA9FF` | En modo organizador la etiqueta CHECK-IN y los avisos info se confunden con el acento (se ve en O07: «Abrir check-in» y la etiqueta usan casi el mismo azul). ¿Se cambia `info` en modo org o se acepta? |
| C2 | **El acento del organizador no está en Figma** | Figma solo tiene la colección naranja | Las variables `primary`, `primary-pressed`, `on-primary`, `primary-soft`, `primary-line` del modo organizador solo existen en el kit. ¿Se agrega un modo «Organizador» a la colección de Figma? |
| C3 | `color-disabled-bg` casi igual a `color-surface-3` | `#24242B` vs `#26262E` | Diferencia casi invisible. ¿Un solo token? |
| C4 | `color-warning` parecido a `color-gold` | `#F5B841` vs `#FFC857` | La etiqueta PENDIENTE y el 1° del podio se ven del mismo amarillo. Puede ser intencional |
| C5 | Hex fijos en el bloque Tailwind del kit | `success: '#2FD07A'`, etc. | Rompe la regla «nunca hex sueltos». Mejor `var(--color-success)` |
| C6 | Fondo de la navbar sin token | `rgba(20,20,24,.92)` | Es `color-surface` (#141418) al 92 %. ¿Se crea `color-nav-bg` o se usa `surface` con opacidad? |
| C7 | Fondo del toast sin token | `#23232A` | Está entre `surface-2` (#1C1C22) y `surface-3` (#26262E). ¿Se usa uno de esos? |
| C8 | Texto del botón peligro | kit: `--color-on-primary` | En modo organizador eso da texto azul oscuro sobre rojo. En O18 se ve texto oscuro. ¿Se crea `color-on-danger`? |

### Tipografía

| # | Qué encontré | Valores | Por qué importa |
|---|---|---|---|
| T1 | Etiqueta de estado a 10.5 px | kit `.tag` 10.5 px vs `text-overline` 11 px | Medio píxel de diferencia. ¿Se usa `text-overline`? |
| T2 | Tracking de `text-h2` | kit 0 vs Figma −0.1 px | Pequeño, pero hoy no coinciden |
| T3 | Valor del stepper | kit 34 px (y 22 px el pequeño) vs Figma ~44–48 px (`text-numeric-xl`) | En O03, O03b, O03c, J17, PTS-J2, D1 el número del stepper es mucho más grande que lo que dice el kit |
| T4 | Valor del stat | kit 21/26 · 700 vs Figma ~28 px | En J09, O07, J18 el número del stat se ve más grande |
| T5 | Título de estado vacío 20/26 | no existe en la escala | ¿Se usa `text-h1` (22/28)? |

### Espaciado

| # | Qué encontré | Valores | Por qué importa |
|---|---|---|---|
| E1 | Separaciones fuera de la retícula 4/8 | `stack--sm` 10 px, `stack--lg` 22 px, gap de stats 10 px | ¿Pasan a 8/12 y 20/24? |
| E2 | Paddings internos de 14 px | stat 14, fila de lista 12 14, fila de opción 14 16 | 14 no está en la escala (12 o 16) |
| E3 | Status bar | kit 50 px vs Figma 44 px | En web no se dibuja, pero define el padding superior |
| E4 | Padding del topbar | `10 20 14` | 10 y 14 fuera de escala |

### Radios

| # | Qué encontré | Valores | Por qué importa |
|---|---|---|---|
| R1 | Varios radios sueltos entre 7 y 16 px | checkbox y pill 7 · botón XS e ícono de stat 9 · botón de ícono S e ícono de fila 11 · caja de partido del bracket 12 · FAB 15 · tab de navbar, burbuja de chat y toast 16 · ícono de diálogo 16 | Ocho valores que no son tokens. Candidatos: 7→`radius-xs` nuevo, 9/11/12→`sm` (10) o `md` (14), 15/16→`md` o `lg` |
| R2 | Tarjetas a 20 o 24 | Figma: «20–24 (tarjetas)» · kit: tarjeta 20, navbar 24 | ¿Tarjetas siempre 20? |
| R3 | Hoja inferior y diálogo a 28 | no hay token | Propuse `radius-sheet` |

### Sombras

| # | Qué encontré | Por qué importa |
|---|---|---|
| S1 | «Sombra de acento» sin valor | Perilla del slider y día seleccionado del calendario la piden, pero no hay token. Proponer p. ej. `0 6px 18px rgb(var(--accent-rgb) / .35)` |
| S2 | Sin sombra para tarjetas ni diálogos | Las pantallas no muestran sombra en tarjetas; el diálogo parece usar solo el overlay. Confirmar que es intencional |

### Tamaños de componente

| # | Qué encontré | Valores | Por qué importa |
|---|---|---|---|
| Z1 | **Botones del stepper** | kit 34 × 34 vs Figma 44 × 44 | El kit queda por debajo del área táctil mínima de 44 px. Las pantallas usan 44 |
| Z2 | **Slider de jugadores por equipo** | kit: slider 1–6 · Figma: stepper + chips 1–5 + «Otro» | El kit describe un componente que ninguna pantalla usa, y el rango no coincide (6 vs 5) |
| Z3 | Tamaños de avatar | kit: 22 · 30 · 40 · 48 · 62 · 96 · Figma además: 26 (tablas), 36 (reportes), 44 (organizador), 46 (mensajes privados), 52 (reportar), 60 (VS) | Seis tamaños extra en las pantallas |
| Z4 | Pasos de creación | kit: «Fecha, puntos y pago» · Figma O04: «Fecha y reglas» | El nombre del paso 3 no coincide, y el pago no entra al MVP |
