# Acceso y registro

Carpeta de pantallas: `design/flujos/acceso-y-registro/`

## Quién y para qué

**Quién:** cualquier persona que abre la app y todavía no tiene sesión: alguien nuevo que quiere crear una cuenta (como jugador o como organizador) o alguien con cuenta que quiere volver a entrar o recuperar su acceso.

**Para qué:** es la puerta de entrada del producto. Todos los demás flujos necesitan una cuenta. Aquí además:
- Se elige el perfil con el que se empieza (Jugador o Organizador), que decide el acento de color y la navegación.
- Se captura el ID público (de jugador o de organizador), que aparece en brackets, rankings y torneos.
- Si es jugador, se capturan los juegos que le interesan, para mostrarle torneos y rankings de esos juegos.

**Resultado:** la persona queda dentro de la app con una cuenta y un perfil. Es una sola cuenta que puede tener los dos modos (Jugador y Organizador); el perfil que elige al crearla define con cuál empieza.

**Alcance del MVP:** la inscripción es gratuita; el acceso es solo con correo y contraseña.

**Caso de ejemplo para el paso a paso:** Johan Torres abre la app por primera vez, toca «Crear cuenta», elige el perfil Jugador, escribe su ID «Johitan» y su Gmail, elige EA FC 25, Valorant y Fortnite, y llega al Inicio. Las variantes son:
- Johan como **Organizador**, con el ID «JohitanCups».
- Johan ya tiene cuenta y usa **Ingresar**.
- Johan olvidó su contraseña y usa **Recuperar acceso**.

## Pantallas

| ID | Pantalla | Qué es |
|---|---|---|
| J00 | Splash | Pantalla de carga al abrir la app. |
| J01 | Bienvenida | Presentación del producto y dos accesos: crear cuenta o ingresar. |
| J03 | Crear cuenta · Jugador | Paso 1 de 2 del registro del jugador: perfil, nombre, ID de jugador, Gmail y términos. |
| J03 | Crear cuenta · Organizador | Registro del organizador, en un solo paso, en acento azul. |
| J02 | Onboarding · Tus juegos | Paso 2 de 2 del registro del jugador: elegir juegos. |
| J04 | Ingresar | Entrar con correo y contraseña. |
| J05 | Recuperar acceso | Pedir un enlace por correo para crear una nueva contraseña. |

Nota: el orden en que se recorren las pantallas del registro no sigue el número del ID. Según las etiquetas de paso, J03 es el paso 1 de 2 y J02 es el paso 2 de 2.

### Qué muestra cada pantalla

**J00 · Splash**
- Logo «LT» en un cuadrado naranja con resplandor.
- Nombre «LTOURNAMENTS» en display y el lema «Compite. Organiza. Sube de nivel.».
- Una barra de carga corta, en naranja.

**J01 · Bienvenida**
- Ilustración 3D de un mando de juego.
- Titular «COMPITE. ORGANIZA. SUBE DE NIVEL.», con la última línea en acento.
- Texto: «Encuentra torneos amateur de tus juegos, inscríbete gratis y sigue tu progreso en un solo lugar.»
- Botones «Crear cuenta» (principal) y «Ya tengo cuenta» (secundario).
- Nota al pie: «Al continuar aceptas los Términos y la Política de privacidad.»

**J03 · Crear cuenta · Jugador**
- Barra superior con volver y «Crear cuenta · Paso 1 de 2», con barra de progreso (la primera mitad llena).
- Título «CREA TU CUENTA» y la etiqueta «ELIGE TU PERFIL».
- Dos opciones tipo tarjeta de selección, con «Jugador» elegido:
  - Jugador: «Encuentra torneos, compite y sube de nivel en los rankings.»
  - Organizador: «Crea, gestiona y da seguimiento a tus torneos.»
- Campo «Nombre» (Johan Torres).
- Campo «ID de jugador» (Johitan), con la ayuda «Así te verán en brackets y rankings.»
- Campo «Gmail» (johitan@gmail.com), con la ayuda «Con tu Gmail ingresas y recibes avisos de tus torneos.»
- Casilla «Acepto los Términos y la Política de privacidad».
- Botón «Crear cuenta» y link «Ya tengo cuenta».
- Todo el acento es naranja.

**J03 · Crear cuenta · Organizador**
- Igual que la anterior, pero con «Organizador» elegido y todo el acento en azul.
- La barra superior dice «Paso 1 de 1», con la barra de progreso completa.
- El campo del ID cambia a «ID de organizador» (JohitanCups), con la ayuda «Así te verán los jugadores en tus torneos.»

**J02 · Onboarding · Tus juegos**
- Barra superior con volver y «Tus juegos · Paso 2 de 2», con la barra de progreso completa.
- Título «¿QUÉ JUEGAS?» y el texto «Elige al menos uno. Te mostraremos torneos y rankings de esos juegos.»
- Cuadrícula de 2 columnas con 6 juegos, cada uno con su portada y un check en la esquina cuando está elegido: EA FC 25, Valorant, CS2, League of Legends, Fortnite y Rocket League. En la pantalla están elegidos EA FC 25, Valorant y Fortnite.
- Contador «3 seleccionados».
- Botón «Continuar» y link «Omitir por ahora».

**J04 · Ingresar**
- Barra superior con volver y «Ingresar».
- Título «BIENVENIDO DE VUELTA» y el texto «Una sola cuenta para jugar y organizar.»
- Campo «Correo» (con ícono de sobre) y campo «Contraseña» (con ícono de candado, texto oculto).
- Link «¿Olvidaste tu contraseña?» a la derecha.
- Botón «Ingresar».

**J05 · Recuperar acceso**
- Barra superior con volver y «Recuperar acceso».
- Ilustración 3D de un mensaje.
- Título «TE ENVIAMOS UN ENLACE» y el texto «Escribe tu correo y te enviaremos un enlace para crear una nueva contraseña.»
- Campo «Correo» ya escrito.
- Aviso de éxito «Enlace enviado»: «Revisa tu bandeja de entrada. El enlace vence en 15 minutos.»
- Botón «Volver a ingresar» y botón deshabilitado «Reenviar en 0:45».

## Paso a paso

Caso: Johan Torres crea su cuenta como Jugador.

### A. Abrir la app

1. Johan abre la app y ve el **Splash (J00)**: logo, nombre, lema y la barra de carga.
2. Al terminar la carga pasa a **Bienvenida (J01)**. Ahí tiene dos caminos:
   - «Crear cuenta»: sigue al paso 3.
   - «Ya tengo cuenta»: va a **Ingresar (J04)** (ver sección D).

### B. Crear cuenta como jugador

3. En **Crear cuenta (J03)**, paso 1 de 2, el perfil Jugador viene elegido. Johan escribe:
   - Su nombre (Johan Torres).
   - Su ID de jugador (Johitan), único en la plataforma.
   - Su Gmail (johitan@gmail.com).
4. Marca la casilla «Acepto los Términos y la Política de privacidad».
5. Toca «Crear cuenta». Pasa a **Tus juegos (J02)**, paso 2 de 2.
   - «Ya tengo cuenta» lleva a Ingresar (J04).
   - El botón de volver regresa a Bienvenida (J01).
6. En **Tus juegos (J02)** toca las portadas de los juegos que juega: EA FC 25, Valorant y Fortnite. Cada toque marca o desmarca el juego, y el contador muestra «3 seleccionados».
7. Toca «Continuar» y llega al **Inicio (J06)**, ya dentro de la app en modo Jugador (acento naranja).
   - Si toca «Omitir por ahora», llega también al Inicio, sin juegos elegidos. En ese caso Inicio muestra torneos de todos los juegos.

### C. Variante: crear cuenta como organizador

8. En **Crear cuenta (J03)**, Johan toca la opción «Organizador». La pantalla cambia al acento azul, la barra de progreso muestra «Paso 1 de 1», y el campo del ID pasa a «ID de organizador».
9. Escribe su nombre, su ID de organizador (JohitanCups) y su Gmail, y marca los términos.
10. Toca «Crear cuenta». Como el organizador no elige juegos, entra directamente a la app en modo Organizador (acento azul), al Panel del organizador (O01). Este destino no se ve en las pantallas de este flujo; lo indica el UI kit («Al crear, entra directo a Inicio o al Panel según el perfil»).
    - Si toca «Jugador» de nuevo, la pantalla vuelve a la versión de jugador. No se ve qué pasa con los datos ya escritos (ver Preguntas abiertas).

### D. Ingresar

11. Johan, que ya tiene cuenta, toca «Ya tengo cuenta» (en J01 o en J03) y llega a **Ingresar (J04)**.
12. Escribe su correo y su contraseña y toca «Ingresar». Entra a la app.
13. Alternativas en la misma pantalla:
    - «¿Olvidaste tu contraseña?»: lleva a **Recuperar acceso (J05)** (sección E).
    - Volver (flecha): regresa a Bienvenida (J01).

### E. Recuperar acceso

14. En **Recuperar acceso (J05)**, Johan escribe su correo y pide el enlace.
15. La pantalla muestra el aviso «Enlace enviado. Revisa tu bandeja de entrada. El enlace vence en 15 minutos.»
16. Desde aquí puede:
    - Tocar «Volver a ingresar», que lleva a Ingresar (J04).
    - Esperar a que termine la cuenta atrás de «Reenviar en 0:45» para pedir otro enlace. Mientras corre, el botón está deshabilitado.
17. Johan abre el enlace en su correo y crea una nueva contraseña. Lo que ocurre en ese paso no está en las pantallas (ver Preguntas abiertas).

## Estados

### De las pantallas de registro
| Estado | Dónde se ve | Qué cambia |
|---|---|---|
| Perfil Jugador elegido | J03 | Acento naranja, «Paso 1 de 2», campo «ID de jugador». |
| Perfil Organizador elegido | J03 | Acento azul, «Paso 1 de 1», campo «ID de organizador». |
| Términos aceptados | J03 | La casilla está marcada con el acento del perfil. |
| Juego elegido | J02 | Anillo de acento y check en la portada. |
| Juego sin elegir | J02 | Portada sin anillo ni check. |
| N seleccionados | J02 | Contador «3 seleccionados». |

### De Ingresar y Recuperar acceso
| Estado | Dónde se ve | Qué cambia |
|---|---|---|
| Contraseña oculta | J04 | El campo muestra puntos. |
| Enlace enviado | J05 | Aviso verde con el texto «Enlace enviado» y la vigencia de 15 minutos. |
| Reenvío en espera | J05 | Botón deshabilitado «Reenviar en 0:45», con cuenta atrás. |

### De la pantalla de carga
- **Splash (J00):** barra de carga a medio llenar, sin otros estados visibles.

### Estados que las pantallas no muestran
- Errores de validación en Crear cuenta e Ingresar (campo vacío, correo inválido, ID ya usado, contraseña incorrecta).
- Estado inicial de Recuperar acceso (campo vacío y botón para enviar el enlace), correo no registrado y enlace vencido.
- Carga o error de red en cualquiera de las pantallas.

Estos estados van en Preguntas abiertas.

## Qué pasa después

- **Jugador:** al terminar Tus juegos (J02), entra al **Inicio (J06)**, en modo Jugador. Los juegos elegidos alimentan «Para ti» y los chips de juego de Inicio (flujo «jugador-descubrir-e-inscribirse»). Desde Inicio puede explorar, inscribirse y ver su progreso.
- **Organizador:** al crear la cuenta entra al **Panel del organizador (O01)**, en modo Organizador (flujo «organizador-panel-y-creacion»).
- **Cuenta con los dos modos:** una cuenta puede tener los dos modos. Quien empieza como jugador puede activar el modo organizador después, y viceversa. El cambio se hace desde «Ajustes y modo» (J23, flujo «jugador-progreso-y-cuenta»).
- **Ingresar:** al ingresar correctamente, la persona entra a la app (el modo con el que entra no se ve; ver Preguntas abiertas).
- **Recuperar acceso:** al cambiar la contraseña, la persona puede volver a Ingresar (J04) con la nueva.
- **ID público:** el ID de jugador o de organizador aparece en los brackets, rankings y torneos de los demás flujos. Es único y se puede cambiar después (desde el perfil o los ajustes, que son de otro flujo).
- **Avisos:** el Gmail también sirve para recibir avisos de los torneos, según el texto de J03.

## Datos que usa

Datos que esta spec lee o escribe, como puente hacia Supabase. Los nombres son provisionales; el modelo definitivo vive en `data/modelo-datos.md`.

### Se escribe

**Cuenta (usuario)**
- Nombre.
- Correo (el campo se llama «Gmail» al crear la cuenta y «Correo» al ingresar).
- Contraseña (la gestiona el login de Supabase; falta el campo en J03, ver Preguntas abiertas).
- Perfil con el que empezó (Jugador u Organizador).
- Aceptación de los Términos y la Política de privacidad (y cuándo).

**Identidad pública**
- ID de jugador (único, se puede cambiar).
- ID de organizador (único, se puede cambiar).

**Juegos del jugador**
- Relación entre el jugador y cada juego elegido en Tus juegos (puede estar vacía).

**Recuperación de acceso**
- Solicitud de enlace: correo, vigencia de 15 minutos, tiempo de espera para reenviar (la pantalla muestra 0:45).

### Se lee

- **Catálogo de juegos:** nombre y portada de cada juego, para la cuadrícula de Tus juegos (la pantalla muestra 6; el UI kit habla de 24).
- **IDs existentes:** para saber si el ID ya está en uso.
- **Cuentas existentes:** para ingresar y para recuperar el acceso.

### Reglas que dicen las pantallas
- Hay que aceptar los Términos y la Política de privacidad para crear la cuenta.
- El perfil se elige entre Jugador y Organizador.
- Un jugador tiene 2 pasos de registro y un organizador 1.
- Los juegos se pueden omitir.
- El ID es único y se puede cambiar después.
- El enlace de recuperación vence a los 15 minutos.
- El reenvío del enlace está bloqueado durante una cuenta atrás.
- Una cuenta puede tener los dos modos.

## Fuera de alcance

Esta spec no cubre lo siguiente, que tiene su propia spec:

- **Inicio y descubrir torneos** (J06 a J12): destino del jugador al terminar el registro. Está en «jugador-descubrir-e-inscribirse».
- **Panel del organizador** (O01): destino del organizador. Está en «organizador-panel-y-creacion».
- **Ajustes y modo** (J23), **perfil competitivo** (J18) y **notificaciones** (J22): cambio de modo, edición del ID y avisos. Están en «jugador-progreso-y-cuenta».
- **Términos y Política de privacidad:** se mencionan en J01 y J03, pero no hay pantalla.
- **Pantalla de «Nueva contraseña»:** no existe en las pantallas.

## Preguntas abiertas

**Ajustes pendientes en Figma (ya decididos por el equipo)**

1. **Falta el campo de contraseña en Crear cuenta (J03).** Ingresar (J04) pide contraseña, pero al crear la cuenta no hay dónde definirla. Hay que agregar el campo (y, si aplica, su confirmación) a las dos versiones de J03.
2. **Texto de Tus juegos (J02) contradictorio.** Dice «Elige al menos uno», pero también ofrece «Omitir por ahora», y se decidió que se puede omitir. Hay que cambiar el texto (por ejemplo, «Elige los que quieras»). Además el UI kit dice «mínimo 1» y también debe alinearse.

**Pendientes de definir**

3. **Recuperar acceso: qué pasa al abrir el enlace.** No hay pantalla de «Nueva contraseña». ¿Se abre dentro de la app o en el navegador? Al guardar, ¿la persona entra directo o vuelve a Ingresar?
4. **Estados que faltan en Recuperar acceso (J05).** Solo existe el estado «Enlace enviado». Falta el estado inicial (campo vacío y botón para enviar el enlace), el de correo no registrado y el de enlace vencido.
5. **Mismo ID para jugador y organizador.** Una cuenta puede tener los dos modos, pero no se sabe si el ID de jugador y el de organizador son el mismo o son dos distintos. Y si alguien empieza como organizador y activa el modo jugador después, ¿cuándo elige sus juegos, dado que J03 organizador no pasa por Tus juegos?
6. **Dónde se cambia el ID.** Se decidió que se puede cambiar, pero no se sabe desde dónde (perfil, ajustes) ni si hay un límite de cambios.
7. **Cómo se activa el segundo modo.** Se asume desde «Ajustes y modo» (J23), pero esa pantalla es de otro flujo. Hay que confirmarlo en su spec.
8. **Modo con el que se entra al ingresar.** J04 no muestra si entra siempre al modo con el que empezó, o al último que usó.
9. **«Gmail» o «Correo».** J03 pide «Gmail» y J04 dice «Correo». ¿Solo se aceptan correos de Gmail, o cualquier correo? El texto de ayuda de J03 habla de «Con tu Gmail ingresas».
10. **Verificación del correo.** No hay pantalla de «Revisa tu correo» ni de confirmar la cuenta. ¿La cuenta se crea al instante o hay que verificar el correo?
11. **Errores de validación.** No hay estados de error para: campo vacío, correo inválido, ID ya usado, ID con caracteres no permitidos, correo ya registrado (al crear la cuenta), contraseña incorrecta, o sin conexión. ¿Qué dice cada uno? El UI kit pide mostrar el mensaje concreto en el campo.
12. **Cuenta que ya existe.** Si alguien intenta crear una cuenta con un correo ya registrado, ¿se le dirige a Ingresar?
13. **Reglas del ID.** Largo mínimo y máximo, caracteres permitidos y si distingue mayúsculas.
14. **Reglas de la contraseña.** Largo mínimo y complejidad, una vez que se agregue el campo.
15. **Orden de los pasos de J02 y J03.** Las etiquetas dicen que J03 es el paso 1 de 2 y J02 el paso 2 de 2, pero el UI kit describe el registro como «Bienvenida → Tus juegos → Crear cuenta». Esta spec sigue las etiquetas de las pantallas. Hay que confirmar el orden.
16. **Cuándo se muestra el Splash y cuánto dura.** ¿Siempre al abrir la app, o solo la primera vez? Y si ya hay una sesión abierta, ¿se salta Bienvenida y va directo a Inicio o al Panel?
17. **Sesión.** ¿La sesión se mantiene abierta al cerrar la app? ¿Hay «Cerrar sesión» y dónde? (No hay pantalla en este flujo.)
18. **Términos y Política de privacidad.** Se mencionan en J01 y J03 como links, pero no hay pantalla. ¿Qué texto muestran y dónde viven?
19. **Catálogo de juegos de Tus juegos.** La pantalla muestra 6 juegos, pero el UI kit habla de 24 y de un buscador («Busca entre 24 juegos») con el link «Ver los 24 juegos». ¿Cuántos se muestran y cómo se ven los demás?
20. **Edad mínima.** Los Términos aceptados no mencionan una edad mínima para registrarse. ¿Se pide la edad o la fecha de nacimiento?
21. **Foto de perfil.** El avatar de otras pantallas (Inicio) es un casco 3D. ¿Se elige o se genera al crear la cuenta? No hay paso para eso en este flujo.
22. **Cambiar de perfil con datos escritos.** Si Johan escribe sus datos como Jugador y luego toca «Organizador» (o al revés), ¿se conservan el nombre, el ID y el Gmail? El ID cambia de «ID de jugador» a «ID de organizador»: ¿se borra o se mantiene?
23. **Idioma del lema.** El splash dice «Sube de nivel» y el UI kit usa «COMPITE. ORGANIZA. SUBE.». ¿Cuál es el texto oficial?

## Cambios

| Fecha | Cambio |
|---|---|
| 2026-10-25 | Versión inicial. Basada en las pantallas J00 a J05 (con las dos versiones de J03) y en las respuestas del equipo: falta el campo de contraseña en J03 (ajuste pendiente en Figma), los juegos se pueden omitir, el ID es único y se puede cambiar después, la cuenta puede tener los dos modos, y lo que pasa después de abrir el enlace de recuperación queda sin definir. |
| 2026-10-27 | Revisión del PR #3. Google y Discord se eliminan del diseño: Ingresar solo tiene correo, contraseña, el link «¿Olvidaste tu contraseña?» y el botón «Ingresar», y el acceso es solo con correo y contraseña. |
