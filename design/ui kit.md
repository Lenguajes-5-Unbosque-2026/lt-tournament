LTournaments · UI Kit
Guía de diseño para implementar LTournaments en código. Sale del Figma «LT» (página Componentes) y del prototipo HTML que ya funciona. Si algo aquí y el código se contradicen, manda este documento.

Para Claude Code: usa estos tokens y componentes tal cual. No inventes colores, radios ni tamaños nuevos. Todo color de acento sale de --color-primary / --accent-rgb, nunca de un hex fijo, porque el acento cambia con el modo (jugador naranja, organizador azul).

1. Principios
Mobile first, oscuro siempre. Diseño base a 390 × 844 (iPhone 14). No hay modo claro.
Un acento por modo.
Jugador: naranja #FF7A29.
Organizador: azul #4C8DFF.
Es el mismo sistema; solo cambia el acento.
Gaming, pero legible. Los títulos grandes van en Montserrat Black Italic en mayúsculas, con energía de esports. Todo lo demás va en Inter, limpio.
Estado siempre visible. Cada torneo, partido e inscripción muestra su estado con una etiqueta de color (ver §6).
Una acción principal por pantalla. Un solo botón primario. Si es la acción final, va fijo abajo (dock).
Español neutro con tú. Textos cortos y directos: «Inscribirme», «Hacer check-in», «Reportar resultado».
2. Tokens
2.1 Color
Superficies
Token	Valor	Uso
--color-bg	#0B0B0D	Fondo de pantalla
--color-surface	#141418	Tarjetas, campos, hojas
--color-surface-2	#1C1C22	Chips, botón secundario
--color-surface-3	#26262E	Pistas de barras, íconos neutros
--color-border	#2C2C35	Borde por defecto
--color-border-strong	#3A3A45	Bordes de controles, separadores punteados
Texto
Token	Valor	Uso
--color-text	#FFFFFF	Texto principal
--color-text-2	#B4B4BE	Texto secundario, labels
--color-text-3	#7C7C88	Metadatos, placeholders, ayudas
Acento (cambia por modo)
Token	Jugador	Organizador
--color-primary	#FF7A29	#4C8DFF
--color-primary-pressed	#DB5F14	#2F6FE0
--color-on-primary	#160A02	#030D1F
--color-primary-soft	rgba(255,122,41,.14)	rgba(76,141,255,.14)
--color-primary-line	rgba(255,122,41,.45)	rgba(76,141,255,.45)
--accent-rgb	255, 122, 41	76, 141, 255
--glow-deep	120, 52, 14	18, 46, 110
El texto sobre un botón primario es oscuro (--color-on-primary), no blanco.

Estados
Token	Valor	Soft (fondo, 14 %)
--color-success	#2FD07A	rgba(47,208,122,.14)
--color-warning	#F5B841	rgba(245,184,65,.14)
--color-danger	#FF5A5F (pressed #E0393F)	rgba(255,90,95,.14)
--color-info	#5AA9FF	rgba(90,169,255,.14)
Podio y utilitarios
Token	Valor
--color-gold	#FFC857
--color-silver	#C9CED6
--color-bronze	#D98A55
--color-disabled-bg	#24242B
--color-disabled-text	#5E5E69
--color-overlay	rgba(0,0,0,.62)
--color-glass	rgba(255,255,255,.06)
2.2 Espaciado (retícula 4/8)
4 · 8 · 12 · 16 · 20 · 24 · 32 px (--space-4 … --space-32).

Dónde	Valor
Margen lateral de pantalla	20 px
Separación entre bloques (.stack)	16 px
Separación en grupos densos (.stack--sm)	10 px
Separación entre secciones (.stack--lg)	22 px
Padding interno de tarjeta	16 px (12 px en la variante compacta)
2.3 Radios
Token	Valor	Uso
--radius-sm	10 px	Botón S, chips cuadrados, ticks
--radius-md	14 px	Botones, campos, filas de lista, botón de ícono
--radius-lg	20 px	Tarjetas, stats
--radius-xl	24 px	Barra de navegación
--radius-pill	999 px	Chips, etiquetas, switch
Las hojas inferiores usan 28 px arriba y los diálogos 28 px.

2.4 Sombras y movimiento
--shadow-nav:   0 12px 32px rgba(0,0,0,.5);
--shadow-sheet: 0 -20px 48px rgba(0,0,0,.55);
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--dur-fast: 160ms;   /* hover, press, toggles */
--dur:      260ms;   /* entrada de pantalla, overlays */
Entrada de pantalla: fade + translateX(18px) (−18 px al volver), con --dur.
Hoja inferior: translateY(100%) → 0, 340 ms.
Diálogo: scale(.94) → 1, 300 ms.
Toast: sube 14 px, 320 ms, y desaparece a los ~2,4 s.
Press: scale(.98) en botones, .94 en avatares.
No re-animar pantalla ni overlay cuando solo cambia una opción dentro de la misma vista. Así se evita el efecto de «micro cierre y apertura».
Respetar prefers-reduced-motion: si está activo, quitar las animaciones.
2.5 Tipografía
Fuentes de Google Fonts:

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:ital,wght@1,800;1,900&display=swap" rel="stylesheet">
Estilo	Fuente	Peso	Tamaño / línea	Extra
t-display-xl	Montserrat italic	900	34 / 38	MAYÚSCULAS, −0.5 px
t-display-l	Montserrat italic	900	26 / 30	MAYÚSCULAS, −0.3 px
t-display-m	Montserrat italic	800	19 / 23	MAYÚSCULAS
t-numeric-xl	Montserrat italic	900	44 / 48	tabular-nums, −1 px
t-h1	Inter	700	22 / 28	−0.2 px
t-h2	Inter	600	17 / 22	
t-h3	Inter	600	15 / 20	
t-body	Inter	400	15 / 22	Texto base
t-strong	Inter	600	15 / 22	
t-small	Inter	400	13 / 18	
t-label	Inter	500	13 / 16	
t-caption	Inter	500	12 / 16	
t-overline	Inter	600	11 / 14	MAYÚSCULAS, +1 px
Reglas:

El display va solo en títulos de pantalla («MIS TORNEOS», «¡ESTÁS DENTRO!»), nombres de torneo en portadas y números grandes (contadores, marcadores, «1 vs 1»).
Una palabra del título puede ir en acento (.accent), por ejemplo «COMPITE. ORGANIZA. SUBE.».
Los números van siempre con font-variant-numeric: tabular-nums.
2.6 Iconografía
Rejilla de 24 × 24, trazo de 2 px, extremos y uniones redondeados, sin relleno (stroke="currentColor").

Tamaños según dónde aparezcan:

Contexto	Tamaño
Botón	20 px
Botón S	16 px
Barra de navegación	22 px
Metadatos	13 px
Chip	14 px
Set disponible: home search trophy user users bell calendar clock plus minus back chev down x check chat send settings filter share heart gamepad pin lock mail eye eyeoff crown flag edit trash image upload logout shield zap ticket chart more bracket swap info alert link star grid list megaphone qr globe copy camera target arrow flame download.

Si falta un ícono, usar Lucide, que tiene el mismo estilo.

3. Bloque de tokens listo para copiar
:root {
  color-scheme: dark;
  --color-bg: #0B0B0D; --color-surface: #141418; --color-surface-2: #1C1C22; --color-surface-3: #26262E;
  --color-border: #2C2C35; --color-border-strong: #3A3A45;
  --color-text: #FFFFFF; --color-text-2: #B4B4BE; --color-text-3: #7C7C88;
  --color-primary: #FF7A29; --color-primary-pressed: #DB5F14; --color-on-primary: #160A02;
  --color-primary-soft: rgba(255,122,41,.14); --color-primary-line: rgba(255,122,41,.45);
  --accent-rgb: 255, 122, 41; --glow-deep: 120, 52, 14;
  --color-success: #2FD07A; --color-success-soft: rgba(47,208,122,.14);
  --color-warning: #F5B841; --color-warning-soft: rgba(245,184,65,.14);
  --color-danger: #FF5A5F; --color-danger-soft: rgba(255,90,95,.14); --color-danger-pressed: #E0393F;
  --color-info: #5AA9FF; --color-info-soft: rgba(90,169,255,.14);
  --color-gold: #FFC857; --color-silver: #C9CED6; --color-bronze: #D98A55;
  --color-disabled-bg: #24242B; --color-disabled-text: #5E5E69;
  --color-overlay: rgba(0,0,0,.62); --color-glass: rgba(255,255,255,.06);
  --space-4: 4px; --space-8: 8px; --space-12: 12px; --space-16: 16px; --space-20: 20px; --space-24: 24px; --space-32: 32px;
  --radius-sm: 10px; --radius-md: 14px; --radius-lg: 20px; --radius-xl: 24px; --radius-pill: 999px;
  --font-display: "Montserrat", "Arial Black", system-ui, sans-serif;
  --font-ui: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --shadow-nav: 0 12px 32px rgba(0,0,0,.5); --shadow-sheet: 0 -20px 48px rgba(0,0,0,.55);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); --dur-fast: 160ms; --dur: 260ms;
}

/* Modo organizador: se aplica en el contenedor raíz de la app */
[data-mode="org"] {
  --color-primary: #4C8DFF; --color-primary-pressed: #2F6FE0; --color-on-primary: #030D1F;
  --color-primary-soft: rgba(76,141,255,.14); --color-primary-line: rgba(76,141,255,.45);
  --accent-rgb: 76, 141, 255; --glow-deep: 18, 46, 110;
}
Equivalente en Tailwind (si el proyecto lo usa)
// tailwind.config.js → theme.extend
colors: {
  bg: 'var(--color-bg)',
  surface: { DEFAULT: 'var(--color-surface)', 2: 'var(--color-surface-2)', 3: 'var(--color-surface-3)' },
  line: { DEFAULT: 'var(--color-border)', strong: 'var(--color-border-strong)' },
  ink: { DEFAULT: 'var(--color-text)', 2: 'var(--color-text-2)', 3: 'var(--color-text-3)' },
  primary: { DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)', pressed: 'var(--color-primary-pressed)', on: 'var(--color-on-primary)' },
  success: '#2FD07A', warning: '#F5B841', danger: '#FF5A5F', info: '#5AA9FF',
  gold: '#FFC857', silver: '#C9CED6', bronze: '#D98A55',
},
borderRadius: { sm: '10px', md: '14px', lg: '20px', xl: '24px' },
fontFamily: { display: ['Montserrat', 'Arial Black', 'sans-serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
4. Estructura de pantalla
┌─────────────────────────────┐
│ Status bar (50 px)          │
│ Topbar   [←]  Título  [⋯]   │  grid 44px · 1fr · 44px, padding 10 20 14
│─────────────────────────────│
│ Scroll (padding 0 20 32)    │  con navbar: padding-bottom 120px
│   …contenido en .stack…     │
│                             │
│ Dock (CTA fijo) opcional    │
│ ╭─ Navbar flotante (72) ──╮ │  left/right 16, bottom 22
└─────────────────────────────┘
Glow de fondo. Tiene 320 px de alto, arriba de la pantalla. Son dos radial-gradient con rgba(var(--accent-rgb), .42/.22) y un linear-gradient de rgba(var(--glow-deep), .55) a transparente. Hay una versión --soft al 55 % para pantallas de formularios.
Topbar.
Título t-h2 centrado, con subtítulo 12/16 text-3 truncado.
El botón de volver es iconbtn con el ícono back.
Las pantallas raíz de cada pestaña (Inicio, Explorar, Mis torneos, Rankings, Perfil, Panel, Chat del organizador) no tienen botón de volver. Usan pagehead: título display a la izquierda y una acción a la derecha.
Volver. Siempre regresa a la pantalla anterior real (pila de historial). Las redirecciones internas reemplazan la entrada, no la apilan.
Dock. Es la zona fija inferior para la acción principal, sobre un degradado navfade.
5. Componentes
Cada componente tiene su clase CSS de referencia (del prototipo) y sus estados.

5.1 Botón — .btn
Variante	Fondo	Texto	Uso
--primary	--color-primary (pressed --color-primary-pressed)	--color-on-primary	Acción principal (1 por pantalla)
--secondary	--color-surface-2 + borde --color-border-strong	--color-text	Acción alternativa
--ghost	transparente (pressed --color-primary-soft)	--color-primary	Acciones terciarias
--danger	--color-danger	--color-on-primary	Expulsar, cancelar torneo
Tamaño	Alto	Padding	Radio	Texto	Ícono
L (default)	52	0 22	14	16/20 · 600	20
S --s	38	0 16	10	14/18 · 600	16
XS --xs	32	0 12	9	13 · 600	16
Deshabilitado: fondo --color-disabled-bg, texto --color-disabled-text, cursor: not-allowed.
Press: scale(.98).
Bloque: --block para ancho completo; todos los CTA del dock lo usan.
Ícono: opcional, a la izquierda con 8 px de gap.
Agrupaciones: .btn-row son 2 columnas con 12 px; .btn-col va apilado con 12 px.
5.2 Botón de ícono — .iconbtn
Base: 44 × 44, radio 14, fondo --color-glass con borde --color-border y backdrop-filter: blur(10px).
Variantes:
--primary: relleno de acento.
--outline: sin fondo.
--sm: 36 × 36, radio 11.
.is-on: texto acento, fondo soft y borde primary-line.
Badge: punto de 8 px en acento, arriba a la derecha, con un anillo de 2 px del color de fondo.
Accesibilidad: siempre lleva aria-label.
5.3 Link — .link
Texto en acento, 13/16 · 600, con ícono de 14 px. Se usa en «Ver todo», «Ver perfil» y «Responder a …».

5.4 Chip — .chip
Base: alto 36, padding 0 16, píldora, fondo surface-2 con borde border, texto text-2 13 · 500.
Seleccionado (.is-on): relleno de acento con texto on-primary.
Contenedores:
.chips: wrap con 8 px de gap.
.chips--scroll: una sola línea con scroll horizontal y sangrado de −20 px.
Usos: filtros de juego, cupos, horas y cierre de inscripciones.
5.5 Segmento (tabs) — .segment
Contenedor: padding 5, radio 14, fondo surface con borde.
Botones: alto 36, radio 10, 13 · 500. Los botones son role="tab".
Activo: relleno de acento con texto on-primary · 600.
Usos: Próximos / En curso / Finalizados, Jugador / Organizador, Por ronda / Bracket completo, Gratuita / Paga y las pestañas de gestión (Resumen · Inscritos · Bracket · Result.).
5.6 Etiqueta de estado — .tag
Forma: alto 22, padding 0 10, píldora, 10.5 px · 600, MAYÚSCULAS, +1 px de tracking, con un punto de 6 px (::before) en currentColor.
Colores: fondo soft y texto en el color del estado.
En vivo: --live hace pulsar el punto (1.2 s).
Hay también .pill: rectangular, radio 7, sin punto. Se usa para niveles («NIVEL 12»), «ORGANIZADOR» y «RECOMENDADO».

5.7 Campo de texto — .field
<label class="field">
  <span class="field__label">Gamertag</span>
  <span class="field__box">[ícono 20] <input placeholder="…"> [acción]</span>
  <span class="field__help">Así te verán en brackets y rankings.</span>
</label>
Label: 13/16 · 500 en text-2.
Caja: min-height 52, padding 0 16, radio 14, fondo surface con borde border.
Input: 15/22; el placeholder va en text-3.
Foco: borde de acento más un anillo interno de 1 px de acento.
Error (.is-error): borde y anillo danger, ícono danger, y la ayuda en danger con el mensaje concreto.
Textarea: min-height 96, con contador «Máximo 280 caracteres».
Contraseña: botón de ojo (eye / eyeoff) a la derecha.
Búsqueda: ícono search a la izquierda y botón de filtros (iconbtn en acento) a la derecha.
Al enviar con errores: mostrar un toast y desplazar hasta el primer campo con error.
5.8 Controles de selección
Componente	Spec	Activo
Switch .switch	50 × 30, píldora surface-3, perilla 24 en text-2	Fondo acento, perilla on-primary, se desplaza 20 px
Checkbox .check	24 × 24, radio 7, borde de 2 px border-strong	Relleno acento con check on-primary
Radio .radio	24 × 24 circular, borde de 2 px	Borde acento con punto interno de 12 px
Fila de opción .optrow	padding 14 16, radio 14, surface con borde, radio o check a la izquierda	Borde acento con fondo primary-soft
Fila de check .checkrow	checkbox con texto (aceptar reglas o términos)	—
.optrow se usa para métodos de pago (Nequi / PSE / Tarjeta), formatos de torneo y selección de ganador.

5.9 Stepper — .stepper
Botones: − / + de 34 × 34 y radio 10. El botón + va relleno de acento.
Valor: display italic 900 de 34 px.
Pequeño (--sm): botones de 30 px y valor de 22 px. Se usa para los puntos de 1°, 2° y 3° (pasos de ±10).
5.10 Slider — .range
Pista: 8 px. Rellena con acento hasta --pct y el resto en surface-2.
Perilla: 26 px blanca, con borde de 4 px de acento y sombra de acento.
Ticks (.range-tick): debajo, en 6 columnas, alto 34 y radio 10. El activo va relleno de acento.
Salida grande: a la derecha, en display de acento (por ejemplo «3 vs 3»).
Uso: jugadores por equipo, de 1 a 6.
5.11 Calendario — .cal
Contenedor: una tarjeta.
Cabecera: ‹ mes año › con botones de ícono.
Rejilla: 7 columnas con días L M M J V S D, empezando en lunes.
Celda de día: cuadrada, radio 10, 13.5 px · 600, tabular.
Estados del día:
Hoy: anillo interno de acento y texto acento.
Seleccionado: relleno de acento con sombra de acento.
Pasado: opacidad .4 y no seleccionable.
Hora: debajo, en .time-grid (4 columnas de chips).
Cierre de inscripciones: chips de 30 min, 1 h, 2 h y 1 día antes.
Resumen: una tarjeta en acento con «Dom 25 Oct · 7:00 pm · Inscripciones hasta 6:00 pm».
5.12 Tarjetas — .card
Base: fondo surface, borde border, radio 20, padding 16. --tight usa padding 12.
Variantes:
--accent: borde primary-line y un degradado de acento del 10 % al 2 %. Se usa para lo destacado.
--success, --warning, --info, --danger: borde al 35–40 % y fondo soft. Se usan para avisos.
--dashed: borde punteado. Se usa para vacíos, «Sube la portada» y espacios del bracket.
5.13 Tarjeta de torneo — .tcard
[Arte 64×64] │ JUEGO (overline acento)      [TAG estado]
             │ Nombre del torneo (15/20 · 600, truncado)
             │ 📅 Sáb 4 Oct · 7:00 pm   👥 24/32   🎟 $10.000
Contenedor: padding 12, gap 14, press scale(.99). Toda la tarjeta es un botón.
Metadatos (.meta): 12/16 en text-3, con íconos de 13 px.
Precio: si es gratis no se muestra en meta; en el detalle aparece «Gratis».
Destacado: variante grande con el arte a ancho completo, nombre en t-display-m, etiqueta y CTA «Inscribirme» sobre la imagen.
5.14 Fila de lista — .listrow
Base: padding 12 14, radio 14, surface con borde, y gap 12.
Izquierda: avatar o listrow__icon. El ícono es de 36 × 36, radio 11, fondo soft del color del estado.
Derecha: chevron en text-3, una etiqueta, o una acción (botón XS).
Fila propia (.is-me): borde primary-line y fondo primary-soft. Se usa en rankings y en la lista de inscritos.
5.15 Stat — .stat
Contenedor: padding 14 y radio 20.
Ícono: 28 × 28, radio 9, en soft de acento o del estado.
Valor: 21/26 · 700, tabular.
Label: 12/16 en text-3.
Agrupación: en .stats (3 columnas) o .stats--2, con 10 px de gap.
5.16 Barra de progreso — .bar
Pista: 6 px (8 px en --lg), en surface-3.
Relleno: de acento, con transición de 600 ms. --success lo pinta verde.
Usos: cupos («24 / 32 inscritos», con «Quedan 8 cupos» en acento) y check-in.
5.17 Avatar — .avatar
Forma: circular, con degradado de 2 colores por usuario (--c1, --c2) y la silueta de casco del Figma.
Tamaños: 22 (bracket), 30 (chat), 40 (listas), 48, 62, 96 (perfil).
--ring: anillo de acento de 2 px separado 3 px. Se usa en el perfil y en el header.
.avatar-link: todo avatar de otro usuario es tocable y abre su perfil público. El avatar del header abre el perfil propio. En hover lleva un anillo de acento al 55 %; en press, scale(.94).
5.18 Arte de juego — .art
Forma: radio 14, con degradado a 140° entre los dos colores del juego y franjas diagonales al 7 %.
Contenido:
Si el juego tiene portada, se muestra la imagen con object-fit: cover.
Si no, el emblema SVG.
Si tampoco, la abreviatura (.art__abbr) en display de blanco al 92 %.
Colores por juego:

Juego	id	c1	c2	Puntos 1°/2°/3°
EA FC 25	fc25	#2fb35a	#0b3a19	300 / 150 / 80
Valorant	valorant	#e8473f	#4a0d0e	400 / 200 / 100
CS2	cs2	#f2a33a	#4f2a07	400 / 200 / 100
League of Legends	lol	#5d55e0	#171447	350 / 175 / 90
Fortnite	fortnite	#f07a2c	#4a1a05	250 / 125 / 60
Rocket League	rocket	#3f78e8	#0c1d4b	300 / 150 / 80
Free Fire	freefire	#ff9f1c	#5a2600	250 / 120 / 60
CoD Mobile	codm	#7a8a6a	#1d2416	250 / 120 / 60
Clash Royale	clash	#3b82f6	#172554	200 / 100 / 50
Brawl Stars	brawl	#facc15	#713f12	200 / 100 / 50
Apex Legends	apex	#dc2626	#3f0a0a	300 / 150 / 75
Overwatch 2	ow2	#f97316	#3b1606	300 / 150 / 75
Dota 2	dota2	#b91c1c	#1c0606	350 / 175 / 90
Rainbow Six Siege	r6	#64748b	#0f172a	300 / 150 / 75
Street Fighter 6	sf6	#e11d48	#3f0616	250 / 125 / 60
Tekken 8	tekken	#a855f7	#2e1065	250 / 125 / 60
Smash Bros. Ultimate	smash	#ef4444	#450a0a	250 / 125 / 60
Mobile Legends	mlbb	#0ea5e9	#082f49	250 / 125 / 60
PUBG	pubg	#d4a017	#3d2e05	250 / 125 / 60
eFootball	efootball	#16a34a	#052e16	250 / 125 / 60
NBA 2K25	nba2k	#2563eb	#1e1b4b	250 / 125 / 60
Mortal Kombat 1	mk1	#ca8a04	#1c1402	200 / 100 / 50
Halo Infinite	halo	#22c55e	#052e1a	250 / 125 / 60
Minecraft	minecraft	#65a30d	#1a2e05	150 / 75 / 40
Los populares, que se muestran primero, son fc25, valorant, freefire, fortnite, lol, cs2.

5.19 Selector de juegos — gamePicker
Búsqueda: un campo de búsqueda «Busca entre 24 juegos». No distingue tildes y busca por nombre y por etiquetas (por ejemplo «fútbol», «shooter», «móvil»).
Rejilla: de 2 columnas (o 3 en la versión compacta) con .gametile, que es el arte más el nombre.
Seleccionado: anillo de 2 px de acento y un check en la esquina que aparece con escala.
Lista larga: por defecto muestra los 6 populares y el link «Ver los 24 juegos ›».
Sin resultados: estado vacío con «No encontramos ese juego».
5.20 Render 3D — .render3d
Uso: ilustraciones 3D del Figma (trofeo oro, plata y bronce, calendario, control, ticket…). Se muestran con object-fit: contain.
Fallback sin imagen: un cuadrado de 74 % con radio 28 %, degradado --fallback-1/2/3 del acento, rotado −8°, con el ícono en blanco.
5.21 Barra de navegación — .navbar
Contenedor: flotante con left/right 16 y bottom 22. Alto 72, padding 8, radio 24, fondo rgba(20,20,24,.92) con blur de 16 y --shadow-nav.
Tabs: 64 × 56, radio 16, ícono 22 y label 11/14 · 500 en text-3. El activo lleva fondo primary-soft y texto de acento.
Modo	Pestañas
Jugador	Inicio · Explorar · Mis torneos · Rankings · Perfil
Organizador	Panel · Torneos · FAB «+» · Chat · Perfil
El FAB mide 48 × 48, radio 15 y va relleno de acento.

5.22 Hoja inferior — .sheet
Overlay: --color-overlay.
Hoja: radio 28 arriba, padding 10 20 34, max-height: 88%, con scroll interno, --shadow-sheet y una barra de agarre de 40 × 5.
Usos: filtros, confirmar inscripción, opciones del torneo y acciones sobre un jugador.
5.23 Diálogo — .dialog
Forma: centrado, radio 28, padding 24 20 20 y texto centrado.
Ícono: 52 × 52, radio 16, en soft de danger o de warning según el caso.
Botones: el de peligro arriba y «Cancelar» o «Volver» en secundario debajo.
Usos: solo acciones destructivas: expulsar, cancelar torneo y cancelar inscripción.
No usar alert(), confirm() ni prompt() nativos.
5.24 Toast — .toast
Posición: abajo, por encima de la navbar (bottom 110).
Forma: radio 16, fondo #23232a, borde border-strong y texto 14 · 500.
Ícono: en verde por defecto, o del estado correspondiente.
Duración: unos 2,4 s.
5.25 Estado vacío — .empty
Contenido: centrado, con un render 3D de unos 130 px, un título de 20/26 · 600, un texto de 14/20 en text-2 y un CTA primario.
Ejemplo: «Aún no tienes torneos» → «Explorar torneos».
5.26 Chat — .msg
Mensaje ajeno: avatar de 30 a la izquierda, con nombre 12 · 600 en text-3 y una burbuja surface-2 con radio 16 (la esquina inferior izquierda en 6).
Mensaje propio: alineado a la derecha, burbuja de acento con texto on-primary, y la hora más «Leído» debajo.
Mensaje del organizador: pill «ORGANIZADOR» junto al nombre.
Anuncio fijado: card --accent con ícono pin y overline «FIJADO POR …».
Compositor (en el dock): un input píldora más un iconbtn primario de enviar. Enter envía.
Mensajes privados (organizador):
Una fila horizontal de avatares de 46 px (.dm-strip), con un punto de acento si hay conversación abierta.
En cada mensaje reciente, un link «Responder a [nombre]».
En el hilo privado, chips de mensajes rápidos encima del compositor.
5.27 Bracket
Por ronda (.bracket)
Rejilla: 2 columnas, la ronda actual y la siguiente. La siguiente lleva un conector punteado.
Pestañas de ronda: un .segment arriba, por ejemplo Octavos / Cuartos / Semis / Final. Las rondas futuras se muestran deshabilitadas.
Partido (.mbox)
Caja: radio 12, surface con borde.
Filas (.mrow): dos filas de 38 px separadas por un borde. Cada fila tiene avatar de 22, nombre y marcador tabular.
Estados de fila:
Ganador (.is-win): marcador en acento.
Perdedor (.is-lose): texto en text-3.
Yo (.is-me): fondo de acento al 12 %.
Por definir: avatar «?» y el texto «Por definir».
Bracket completo (.bfull)
Rejilla: todas las rondas en columnas de 138 px, con scroll horizontal y snap.
Partidos: cada columna reparte sus partidos con space-around para que queden alineados con la ronda anterior.
Cabecera de columna: título de ronda en 11 px · 800, MAYÚSCULAS y +.08em.
Columna final «Campeón»: trofeo 3D y avatar del campeón, o «Por definir». Cuando hay campeón (.is-done), lleva borde dorado y degradado.
Pista de scroll: «Desliza para ver hasta el campeón ›» cuando hay más de 2 rondas.
Selector de vista: segmento «Por ronda» / «Bracket completo».
Nombres de ronda
Según la cantidad de jugadores en la ronda: 32 → Dieciseisavos, 16 → Octavos, 8 → Cuartos, 4 → Semis, 2 → Final.

5.28 Podio — .podium
Orden: 3 columnas en orden 2° · 1° · 3°.
Alturas de base: 150 (1°), 110 (2°) y 90 (3°).
Contenido de cada columna: avatar (62 para el 1°, 48 para los demás), nombre, «+300 pts» en text-3 y, en la base, el trofeo 3D con el número en display.
Base del 1°: borde y degradado dorado.
Puntos: salen de la configuración del torneo, no son fijos.
5.29 Pasos de creación — .progress-steps
Barras: N barras de 4 px; las completadas y la actual en acento, el resto en surface-3.
Topbar: «Crear torneo» con el subtítulo «Paso 2 de 4 · Formato y cupos».
Pasos: Información → Formato y cupos → Fecha, puntos y pago → Revisar y publicar.
5.30 Contador de check-in (patrón)
Valor: t-numeric-xl en formato 00:42:18.
Acompañamiento: una barra de progreso y un caption «para que cierre el check-in».
Contenedor: card --accent con la etiqueta CHECK-IN y la hora de cierre.
5.31 Nota demo — .demo-note
Una fila punteada con ícono zap y el texto «Demo: …», más un botón XS secundario («Simular», «Completar»). Es solo para el prototipo y se quita en producción.

6. Estados (etiquetas)
Clave	Etiqueta	Color
abierto	Abierto	success
checkin	Check-in	info
en_curso	En curso	primary
en_juego	En juego	primary
finalizado	Finalizado	muted
borrador	Borrador	warning
cancelado	Cancelado	danger
lleno	Lleno	info
confirmada	Inscrito	success
pendiente	Por confirmar	warning
espera	En espera	info
en_vivo	En vivo	danger + pulso
publicado	Publicado	success
sin_checkin	Sin check-in	warning
Ciclo de vida de un torneo:

Borrador → Abierto → Check-in → En curso → Finalizado (o Cancelado desde cualquiera antes de finalizar).

7. Patrones clave
Registro.

Bienvenida → Tus juegos (búsqueda más rejilla, mínimo 1) → Crear cuenta.
En Crear cuenta se elige perfil Jugador / Organizador con dos optrow grandes; luego vienen los datos y los términos.
Al crear, entra directo a Inicio o al Panel según el perfil.
Detalle del torneo. El orden es:

Portada.
Etiqueta y juego.
Nombre en display.
Descripción.
3 stats (fecha, hora, entrada «Gratis» o «$10.000»).
Barra de cupos.
Premios (1°, 2°, 3° con puntos).
Reglas.
«Creador del torneo» al final, con avatar, nombre, verificado y «Ver perfil».
El dock tiene «Inscribirme» y la fecha de cierre.

Inscripción.

Hoja de confirmación con: resumen, gamertag, entrada, aceptar reglas y política de cancelación.
Si es paga, se suma el método de pago (Nequi / PSE / Tarjeta) y el botón cambia a «Pagar $X y confirmar».
Pantalla de éxito «¡ESTÁS DENTRO!».
En Mis torneos aparece con la etiqueta Inscrito.
Dos estados del bracket.

Sin generar: card info «Check-in en curso · N de M confirmados» y un vacío «El bracket aún no se publica».
Generado: «Tu partido» (VS grande con los dos avatares, ronda y hora), «Reportar resultado» y el bracket por ronda o completo.
Crear torneo (organizador).

Paso 1: juego con búsqueda, nombre, descripción y portada.
Paso 2: formato, jugadores por equipo 1–6 (slider) y cupos.
Paso 3: calendario, hora, cierre, check-in, puntos 1°/2°/3° sugeridos por juego (editables), premio y Gratuita / Paga (con precio en COP, mínimo $1.000).
Paso 4: revisión con botón de editar en cada bloque.
Check-in del organizador.

En vivo: contador 17/24 con etiqueta EN VIVO, aviso de quienes faltan, y en cada jugador «Recordar» y check manual.
Finalizado: card success «Check-in finalizado · N jugadores ya están en el bracket» y la lista de confirmados.
Cierre del torneo.

Podio, el bracket completo lleno con el campeón, 3 stats y la checklist (resultados, bracket, puntos).
Botón «Finalizar y publicar resultados».
Perfiles públicos.

Jugador: avatar con anillo, nombre en display, @usuario, ciudad, pills de nivel, 3 stats, «Retar» / «Agregar amigo», ranking por juego y últimos torneos.
Organizador: lo mismo, con «Seguir» / «Compartir» y sus torneos.
Si el que mira es organizador: «Enviar mensaje» y «Ver inscripciones».
8. Formatos de datos en la UI
Dato	Formato	Ejemplo
Fecha corta	Día D Mes	Sáb 4 Oct
Fecha con hora	Día D Mes · h:mm am/pm	Vie 10 Oct · 8:00 pm
Dinero	COP, punto de miles, sin decimales	$10.000
Puntos	+N pts / N pts	+300 pts · 4.230 pts
Cupos	inscritos/cupos	24/32
Modalidad	N vs N	5 vs 5
Marcador	a – b	2 – 1
Tiempo relativo	Ahora · Hace 5 h · Lun	—
9. Accesibilidad
Contraste: text y text-2 sobre bg/surface pasan AA. text-3 solo se usa en metadatos de 12 px o más, nunca para texto clave.
Áreas táctiles de 44 × 44 como mínimo; un chip de 36 de alto es aceptable porque va con 8 px de separación.
:focus-visible: contorno de 2 px de acento con 2 px de offset en todo lo interactivo.
Los segmentos usan role="tablist" / role="tab" con aria-selected. Los switch usan role="switch" con aria-checked.
Todo botón de solo ícono lleva aria-label. Los avatares tocables llevan «Ver perfil de [nombre]».
El estado nunca se comunica solo con color: la etiqueta siempre lleva texto.
10. Sí / No
✅ Sí	❌ No
Acento vía var(--color-primary) / rgba(var(--accent-rgb), x)	Escribir #FF7A29 a mano en componentes
Un botón primario por pantalla	Dos CTA primarios compitiendo
Display en MAYÚSCULAS solo para títulos y números	Párrafos en Montserrat
Texto oscuro sobre botones de acento	Texto blanco sobre naranja o azul
Diálogo propio para destructivos	alert() / confirm() del navegador
Avatares de otros usuarios → perfil	Avatares que no hacen nada
Volver = pantalla anterior real	Volver que salta a Inicio o hace bucle
Mantener la vista quieta al tocar opciones	Re-animar la pantalla entera en cada toque
