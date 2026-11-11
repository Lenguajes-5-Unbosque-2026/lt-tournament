-- LT Tournament · Esquema y datos de prueba
-- Generado a partir de data/mock/*.csv (no editar a mano los INSERT; regenerar si cambian los CSV).
-- Los id son texto legible (tor_001, usr_001) para revisar relaciones a mano.
-- Row Level Security activado en todas las tablas: lectura pública; la escritura se habilita con supabase/escritura.sql.

begin;

-- Borra las tablas si ya existen (en orden inverso a las relaciones) para poder correr el archivo de nuevo.
drop table if exists public.notificaciones cascade;
drop table if exists public.conexiones cascade;
drop table if exists public.mensajes_torneo cascade;
drop table if exists public.posiciones_finales cascade;
drop table if exists public.resultados_battle_royale cascade;
drop table if exists public.partidas_battle_royale cascade;
drop table if exists public.reportes_resultado cascade;
drop table if exists public.partidos cascade;
drop table if exists public.inscripciones cascade;
drop table if exists public.torneos cascade;
drop table if exists public.jugador_juegos cascade;
drop table if exists public.perfiles_organizador cascade;
drop table if exists public.perfiles_jugador cascade;
drop table if exists public.usuarios cascade;
drop table if exists public.juegos cascade;

-- ============================================================
-- 1. Tablas
-- ============================================================

-- Catálogo de juegos
create table public.juegos (
  id text primary key,
  nombre text not null,
  abreviatura text not null,
  color_1 text not null,
  color_2 text not null,
  puntos_1 integer not null,
  puntos_2 integer not null,
  puntos_3 integer not null,
  popular boolean not null,
  etiquetas text[],
  imagen text
);

-- Cuenta única (en producción, la de auth.users)
create table public.usuarios (
  id text primary key,
  nombre text not null,
  correo text not null,
  ciudad text,
  modo_actual text not null check (modo_actual in ('jugador', 'organizador')),
  creado_en timestamptz not null,
  unique (correo)
);

-- Perfil de jugador; id = id del usuario
create table public.perfiles_jugador (
  id text primary key references public.usuarios(id),
  nombre_usuario text not null,
  juego_principal_id text references public.juegos(id),
  nivel integer not null,
  puntos_ranking integer not null,
  color_1 text not null,
  color_2 text not null,
  imagen text,
  creado_en timestamptz not null,
  unique (nombre_usuario)
);

-- Perfil de organizador; id = id del usuario
create table public.perfiles_organizador (
  id text primary key references public.usuarios(id),
  alias text not null,
  nivel integer not null,
  verificado boolean not null,
  valoracion numeric(2,1) not null,
  seguidores integer not null,
  color_1 text not null,
  color_2 text not null,
  imagen text,
  creado_en timestamptz not null
);

-- Juegos que eligió cada jugador en el onboarding
create table public.jugador_juegos (
  jugador_id text not null references public.perfiles_jugador(id),
  juego_id text not null references public.juegos(id),
  primary key (jugador_id, juego_id)
);

-- Torneos: formato, cupos, fechas, reglas, puntos y estado
create table public.torneos (
  id text primary key,
  organizador_id text not null references public.perfiles_organizador(id),
  juego_id text not null references public.juegos(id),
  nombre text not null,
  descripcion text,
  imagen text,
  tipo_juego text not null,
  formato text not null,
  jugadores_por_equipo integer not null,
  cupos integer not null,
  partidas_o_rondas integer,
  minutos_por_partida integer,
  fecha_inicio timestamptz not null,
  cierre_inscripciones timestamptz,
  checkin_obligatorio boolean not null,
  checkin_minutos_antes integer,
  puntos_victoria integer,
  puntos_empate integer,
  puntos_derrota integer,
  puntos_por_kill boolean,
  puntos_1 integer,
  puntos_2 integer,
  puntos_3 integer,
  puntos_participacion integer,
  premio text,
  reglas text[],
  estado text not null check (estado in ('borrador', 'abierto', 'checkin', 'en_curso', 'finalizado', 'cancelado')),
  precio_cop integer not null,
  ciudad text,
  enlace text,
  creado_en timestamptz not null
);

-- Inscripción de un jugador a un torneo
create table public.inscripciones (
  id text primary key,
  torneo_id text not null references public.torneos(id),
  jugador_id text not null references public.perfiles_jugador(id),
  estado text not null check (estado in ('confirmada', 'pendiente', 'espera', 'cancelada')),
  seed integer,
  posicion_espera integer,
  check_in_en timestamptz,
  creado_en timestamptz not null,
  unique (torneo_id, jugador_id)
);

-- Partidos 1 vs 1 (bracket y por puntos)
create table public.partidos (
  id text primary key,
  torneo_id text not null references public.torneos(id),
  ronda integer not null,
  nombre_ronda text,
  orden integer not null,
  jugador_a_id text references public.perfiles_jugador(id),
  jugador_b_id text references public.perfiles_jugador(id),
  marcador_a integer,
  marcador_b integer,
  ganador_id text references public.perfiles_jugador(id),
  estado text not null check (estado in ('pendiente', 'reportado', 'en_disputa', 'finalizado', 'wo')),
  resuelto_por text check (resuelto_por in ('reportes', 'organizador_disputa', 'organizador_wo')),
  fecha_hora timestamptz,
  prueba_imagen text,
  nota text
);

-- Marcador que reporta cada jugador de un partido
create table public.reportes_resultado (
  id text primary key,
  partido_id text not null references public.partidos(id),
  jugador_id text not null references public.perfiles_jugador(id),
  marcador_a integer not null,
  marcador_b integer not null,
  captura_imagen text,
  creado_en timestamptz not null,
  unique (partido_id, jugador_id)
);

-- Partidas de un torneo battle royale
create table public.partidas_battle_royale (
  id text primary key,
  torneo_id text not null references public.torneos(id),
  numero integer not null,
  estado text not null,
  inicio timestamptz,
  minutos integer,
  jugadores_vivos integer,
  ganador_id text references public.perfiles_jugador(id),
  prueba_imagen text,
  unique (torneo_id, numero)
);

-- Puesto, kills y puntos de cada jugador en cada partida
create table public.resultados_battle_royale (
  id text primary key,
  partida_br_id text not null references public.partidas_battle_royale(id),
  jugador_id text not null references public.perfiles_jugador(id),
  puesto integer not null,
  kills integer not null,
  puntos integer not null,
  estado text not null,
  captura_imagen text,
  unique (partida_br_id, jugador_id)
);

-- Puesto final y puntos de ranking por torneo finalizado
create table public.posiciones_finales (
  id text primary key,
  torneo_id text not null references public.torneos(id),
  jugador_id text not null references public.perfiles_jugador(id),
  posicion integer not null,
  puntos_ranking integer not null,
  partidos_jugados integer not null,
  victorias integer not null
);

-- Chat del torneo y anuncios
create table public.mensajes_torneo (
  id text primary key,
  torneo_id text not null references public.torneos(id),
  autor_id text not null references public.usuarios(id),
  contenido text not null,
  es_anuncio boolean not null,
  fijado boolean not null,
  creado_en timestamptz not null
);

-- Amistades entre jugadores
create table public.conexiones (
  id text primary key,
  jugador_id text not null references public.perfiles_jugador(id),
  amigo_id text not null references public.perfiles_jugador(id),
  estado text not null check (estado in ('aceptado', 'pendiente')),
  creado_en timestamptz not null,
  unique (jugador_id, amigo_id)
);

-- Notificaciones por usuario
create table public.notificaciones (
  id text primary key,
  usuario_id text not null references public.usuarios(id),
  tipo text not null,
  titulo text not null,
  texto text,
  torneo_id text references public.torneos(id),
  leida boolean not null,
  creado_en timestamptz not null
);

-- ============================================================
-- 2. Datos de prueba
-- ============================================================

-- juegos (24 filas)
insert into public.juegos (id, nombre, abreviatura, color_1, color_2, puntos_1, puntos_2, puntos_3, popular, etiquetas, imagen) values
  ('fc25', 'EA FC 25', 'FC25', '#2fb35a', '#0b3a19', 100, 97, 94, true, array['fútbol', 'deportes', 'consola'], 'portada-fc25.jpg'),
  ('valorant', 'Valorant', 'VAL', '#e8473f', '#4a0d0e', 100, 97, 94, true, array['shooter', 'táctico', 'pc'], 'portada-valorant.jpg'),
  ('cs2', 'CS2', 'CS2', '#f2a33a', '#4f2a07', 100, 97, 94, true, array['shooter', 'táctico', 'pc'], 'portada-cs2.jpg'),
  ('lol', 'League of Legends', 'LOL', '#5d55e0', '#171447', 100, 97, 94, true, array['moba', 'estrategia', 'pc'], 'portada-lol.jpg'),
  ('fortnite', 'Fortnite', 'FN', '#f07a2c', '#4a1a05', 100, 97, 94, true, array['battle royale', 'shooter'], 'portada-fortnite.jpg'),
  ('rocket', 'Rocket League', 'RL', '#3f78e8', '#0c1d4b', 100, 97, 94, false, array['fútbol', 'autos', 'deportes'], 'portada-rocket.jpg'),
  ('freefire', 'Free Fire', 'FF', '#ff9f1c', '#5a2600', 100, 97, 94, true, array['battle royale', 'móvil'], null),
  ('codm', 'CoD Mobile', 'CODM', '#7a8a6a', '#1d2416', 100, 97, 94, false, array['shooter', 'móvil'], null),
  ('clash', 'Clash Royale', 'CR', '#3b82f6', '#172554', 100, 97, 94, false, array['estrategia', 'móvil', 'cartas'], null),
  ('brawl', 'Brawl Stars', 'BS', '#facc15', '#713f12', 100, 97, 94, false, array['acción', 'móvil'], null),
  ('apex', 'Apex Legends', 'APEX', '#dc2626', '#3f0a0a', 100, 97, 94, false, array['battle royale', 'shooter'], null),
  ('ow2', 'Overwatch 2', 'OW2', '#f97316', '#3b1606', 100, 97, 94, false, array['shooter', 'héroes'], null),
  ('dota2', 'Dota 2', 'DOTA', '#b91c1c', '#1c0606', 100, 97, 94, false, array['moba', 'estrategia', 'pc'], null),
  ('r6', 'Rainbow Six Siege', 'R6', '#64748b', '#0f172a', 100, 97, 94, false, array['shooter', 'táctico'], null),
  ('sf6', 'Street Fighter 6', 'SF6', '#e11d48', '#3f0616', 100, 97, 94, false, array['pelea', 'consola'], null),
  ('tekken', 'Tekken 8', 'TK8', '#a855f7', '#2e1065', 100, 97, 94, false, array['pelea', 'consola'], null),
  ('smash', 'Smash Bros. Ultimate', 'SSBU', '#ef4444', '#450a0a', 100, 97, 94, false, array['pelea', 'nintendo'], null),
  ('mlbb', 'Mobile Legends', 'MLBB', '#0ea5e9', '#082f49', 100, 97, 94, false, array['moba', 'móvil'], null),
  ('pubg', 'PUBG', 'PUBG', '#d4a017', '#3d2e05', 100, 97, 94, false, array['battle royale', 'shooter'], null),
  ('efootball', 'eFootball', 'EFB', '#16a34a', '#052e16', 100, 97, 94, false, array['fútbol', 'deportes'], null),
  ('nba2k', 'NBA 2K25', '2K25', '#2563eb', '#1e1b4b', 100, 97, 94, false, array['baloncesto', 'deportes'], null),
  ('mk1', 'Mortal Kombat 1', 'MK1', '#ca8a04', '#1c1402', 100, 97, 94, false, array['pelea', 'consola'], null),
  ('halo', 'Halo Infinite', 'HALO', '#22c55e', '#052e1a', 100, 97, 94, false, array['shooter', 'consola'], null),
  ('minecraft', 'Minecraft', 'MC', '#65a30d', '#1a2e05', 100, 97, 94, false, array['construcción', 'creativo'], null);

-- usuarios (36 filas)
insert into public.usuarios (id, nombre, correo, ciudad, modo_actual, creado_en) values
  ('usr_001', 'Johan Torres', 'johitan@ejemplo.co', 'Bogotá', 'jugador', '2025-03-14T10:00:00-05:00'),
  ('usr_002', 'Nicolás Vargas', 'novak@ejemplo.co', 'Bogotá', 'jugador', '2025-04-02T10:00:00-05:00'),
  ('usr_003', 'Sebastián Hoyos', 'sh4dow@ejemplo.co', 'Bogotá', 'jugador', '2025-02-20T10:00:00-05:00'),
  ('usr_004', 'María Fernanda Ríos', 'mafe@ejemplo.co', 'Medellín', 'jugador', '2025-05-11T10:00:00-05:00'),
  ('usr_005', 'Camilo Zerda', 'zerox@ejemplo.co', 'Bogotá', 'jugador', '2025-01-30T10:00:00-05:00'),
  ('usr_006', 'Kevin Rodríguez', 'kairo@ejemplo.co', 'Cali', 'jugador', '2025-06-08T10:00:00-05:00'),
  ('usr_007', 'Guadalupe Martínez', 'lupe@ejemplo.co', 'Bogotá', 'jugador', '2025-03-27T10:00:00-05:00'),
  ('usr_008', 'Andrés Gómez', 'tito@ejemplo.co', 'Bogotá', 'jugador', '2025-07-19T10:00:00-05:00'),
  ('usr_009', 'Valentina Cárdenas', 'vale@ejemplo.co', 'Bogotá', 'jugador', '2025-08-03T10:00:00-05:00'),
  ('usr_010', 'Ricardo Ruiz', 'rex@ejemplo.co', 'Bucaramanga', 'jugador', '2026-10-18T10:00:00-05:00'),
  ('usr_011', 'Felipe Arango', 'pipe09@ejemplo.co', 'Medellín', 'jugador', '2025-09-12T10:00:00-05:00'),
  ('usr_012', 'Laura Montoya', 'lamonagg@ejemplo.co', 'Pereira', 'jugador', '2025-10-01T10:00:00-05:00'),
  ('usr_013', 'Jorge Cuéllar', 'cucho@ejemplo.co', 'Neiva', 'jugador', '2025-11-23T10:00:00-05:00'),
  ('usr_014', 'Daniel Restrepo', 'elparcero@ejemplo.co', 'Medellín', 'jugador', '2025-02-14T10:00:00-05:00'),
  ('usr_015', 'Juan Esteban Mejía', 'juanes10@ejemplo.co', 'Bogotá', 'jugador', '2025-05-30T10:00:00-05:00'),
  ('usr_016', 'Danna Lozano', 'dannaexe@ejemplo.co', 'Cali', 'jugador', '2025-12-05T10:00:00-05:00'),
  ('usr_017', 'Mateo Peña', 'chiguiro@ejemplo.co', 'Villavicencio', 'jugador', '2026-01-17T10:00:00-05:00'),
  ('usr_018', 'Santiago Pardo', 'santifc@ejemplo.co', 'Bogotá', 'jugador', '2025-04-22T10:00:00-05:00'),
  ('usr_019', 'Brayan Guarín', 'xxguachexx@ejemplo.co', 'Soacha', 'jugador', '2025-08-29T10:00:00-05:00'),
  ('usr_020', 'Natalia Ospina', 'tatan@ejemplo.co', 'Manizales', 'jugador', '2026-02-09T10:00:00-05:00'),
  ('usr_021', 'Esteban Sierra', 'frailejon@ejemplo.co', 'Tunja', 'jugador', '2026-03-15T10:00:00-05:00'),
  ('usr_022', 'Andrés Neira', 'neobog@ejemplo.co', 'Bogotá', 'jugador', '2025-10-28T10:00:00-05:00'),
  ('usr_023', 'Samuel Pérez', 'arepakid@ejemplo.co', 'Barranquilla', 'jugador', '2026-04-01T10:00:00-05:00'),
  ('usr_024', 'Carolina Bernal', 'carogg@ejemplo.co', 'Bogotá', 'jugador', '2025-06-16T10:00:00-05:00'),
  ('usr_025', 'Luis Manrique', 'manito@ejemplo.co', 'Cartagena', 'jugador', '2026-05-20T10:00:00-05:00'),
  ('usr_026', 'Brayan Castillo', 'brayangoat@ejemplo.co', 'Bogotá', 'jugador', '2025-09-02T10:00:00-05:00'),
  ('usr_027', 'Lucas Herrera', 'lukitas@ejemplo.co', 'Chía', 'jugador', '2025-11-11T10:00:00-05:00'),
  ('usr_028', 'Isabella Nieto', 'nubecita@ejemplo.co', 'Ibagué', 'jugador', '2026-06-30T10:00:00-05:00'),
  ('usr_029', 'Mariana del Pilar Rodríguez Castañeda', 'marianadelpilarrodriguezcastaneda@ejemplo.co', 'Santa Marta', 'jugador', '2026-07-07T10:00:00-05:00'),
  ('usr_030', 'Kamila Durán', 'kami@ejemplo.co', 'Cúcuta', 'jugador', '2026-02-27T10:00:00-05:00'),
  ('usr_031', 'Andrés Felipe Nova', 'streamernova@ejemplo.co', 'Bogotá', 'organizador', '2024-11-02T10:00:00-05:00'),
  ('usr_032', 'Laura Quintero', 'parchegamerbog@ejemplo.co', 'Bogotá', 'organizador', '2025-01-15T10:00:00-05:00'),
  ('usr_033', 'Comité de deportes electrónicos', 'ligauniversitariaandinadeesports@ejemplo.co', 'Bogotá', 'organizador', '2024-08-20T10:00:00-05:00'),
  ('usr_034', 'Diana Caicedo', 'caligamersclub@ejemplo.co', 'Cali', 'organizador', '2025-06-01T10:00:00-05:00'),
  ('usr_035', 'Julián Ochoa', 'paisaesports@ejemplo.co', 'Medellín', 'organizador', '2026-09-30T10:00:00-05:00'),
  ('usr_036', 'Sara Lemus', 'nuevaorgcol@ejemplo.co', 'Pasto', 'organizador', '2026-10-20T10:00:00-05:00');

-- perfiles_jugador (30 filas)
insert into public.perfiles_jugador (id, nombre_usuario, juego_principal_id, nivel, puntos_ranking, color_1, color_2, imagen, creado_en) values
  ('usr_001', 'Johitan', 'fc25', 2, 150, '#ff7a29', '#7a2e05', 'avatar-johitan.png', '2025-03-14T10:00:00-05:00'),
  ('usr_002', 'NovaK', 'fc25', 1, 88, '#e6e6ea', '#5e5e69', 'avatar-novak.png', '2025-04-02T10:00:00-05:00'),
  ('usr_003', 'Sh4dow', 'valorant', 1, 13, '#2fd07a', '#0b3a19', 'avatar-sh4dow.png', '2025-02-20T10:00:00-05:00'),
  ('usr_004', 'Mafe', 'valorant', 1, 0, '#a855f7', '#2e1065', 'avatar-mafe.png', '2025-05-11T10:00:00-05:00'),
  ('usr_005', 'ZeroX', 'fc25', 1, 63, '#ff5a5f', '#4a0d0e', 'avatar-zerox.png', '2025-01-30T10:00:00-05:00'),
  ('usr_006', 'Kairo', 'lol', 1, 0, '#5aa9ff', '#0c1d4b', 'avatar-kairo.png', '2025-06-08T10:00:00-05:00'),
  ('usr_007', 'Lupe', 'fc25', 1, 75, '#ffc857', '#5a3d05', 'avatar-lupe.png', '2025-03-27T10:00:00-05:00'),
  ('usr_008', 'Tito', 'fortnite', 1, 0, '#7c7c88', '#1c1c22', 'avatar-tito.png', '2025-07-19T10:00:00-05:00'),
  ('usr_009', 'Vale', 'valorant', 1, 0, '#ff6fa8', '#4a0d2a', 'avatar-vale.png', '2025-08-03T10:00:00-05:00'),
  ('usr_010', 'Rex', null, 1, 0, '#5ec8c8', '#0d3b3b', null, '2026-10-18T10:00:00-05:00'),
  ('usr_011', 'Pipe_09', 'freefire', 1, 0, '#ff9f1c', '#5a2600', 'avatar-pipe-09.png', '2025-09-12T10:00:00-05:00'),
  ('usr_012', 'LaMonaGG', 'lol', 1, 0, '#f472b6', '#500724', 'avatar-lamonagg.png', '2025-10-01T10:00:00-05:00'),
  ('usr_013', 'Cucho', 'rocket', 1, 0, '#3f78e8', '#0c1d4b', 'avatar-cucho.png', '2025-11-23T10:00:00-05:00'),
  ('usr_014', 'ElParcero', 'cs2', 1, 0, '#f2a33a', '#4f2a07', 'avatar-elparcero.png', '2025-02-14T10:00:00-05:00'),
  ('usr_015', 'Juanes10', 'fc25', 2, 138, '#2fb35a', '#0b3a19', 'avatar-juanes10.png', '2025-05-30T10:00:00-05:00'),
  ('usr_016', 'Danna.exe', 'valorant', 1, 0, '#e8473f', '#4a0d0e', 'avatar-danna-exe.png', '2025-12-05T10:00:00-05:00'),
  ('usr_017', 'Chigüiro', 'fortnite', 1, 0, '#a3a35a', '#2a2a0b', 'avatar-chiguiro.png', '2026-01-17T10:00:00-05:00'),
  ('usr_018', 'Santi_FC', 'fc25', 2, 100, '#16a34a', '#052e16', 'avatar-santi-fc.png', '2025-04-22T10:00:00-05:00'),
  ('usr_019', 'xXGuacheXx', 'cs2', 1, 0, '#94a3b8', '#1e293b', 'avatar-xxguachexx.png', '2025-08-29T10:00:00-05:00'),
  ('usr_020', 'Tatán', 'clash', 1, 0, '#3b82f6', '#172554', 'avatar-tatan.png', '2026-02-09T10:00:00-05:00'),
  ('usr_021', 'Frailejón', 'lol', 1, 0, '#84cc16', '#1a2e05', 'avatar-frailejon.png', '2026-03-15T10:00:00-05:00'),
  ('usr_022', 'NeoBog', 'rocket', 1, 0, '#06b6d4', '#083344', 'avatar-neobog.png', '2025-10-28T10:00:00-05:00'),
  ('usr_023', 'Arepa_Kid', 'fortnite', 1, 25, '#fbbf24', '#451a03', 'avatar-arepa-kid.png', '2026-04-01T10:00:00-05:00'),
  ('usr_024', 'CaroGG', 'smash', 1, 50, '#ef4444', '#450a0a', 'avatar-carogg.png', '2025-06-16T10:00:00-05:00'),
  ('usr_025', 'Manito', 'freefire', 1, 0, '#fb923c', '#431407', 'avatar-manito.png', '2026-05-20T10:00:00-05:00'),
  ('usr_026', 'Brayan_GOAT', 'fc25', 1, 75, '#d4a017', '#3d2e05', 'avatar-brayan-goat.png', '2025-09-02T10:00:00-05:00'),
  ('usr_027', 'Lukitas', 'tekken', 2, 100, '#c084fc', '#3b0764', 'avatar-lukitas.png', '2025-11-11T10:00:00-05:00'),
  ('usr_028', 'Nubecita', 'brawl', 1, 0, '#facc15', '#713f12', 'avatar-nubecita.png', '2026-06-30T10:00:00-05:00'),
  ('usr_029', 'MarianaDelPilarRodriguezCastaneda', 'smash', 1, 0, '#fda4af', '#4c0519', null, '2026-07-07T10:00:00-05:00'),
  ('usr_030', 'Kami', 'tekken', 1, 75, '#a855f7', '#2e1065', 'avatar-kami.png', '2026-02-27T10:00:00-05:00');

-- perfiles_organizador (7 filas)
insert into public.perfiles_organizador (id, alias, nivel, verificado, valoracion, seguidores, color_1, color_2, imagen, creado_en) values
  ('usr_031', 'StreamerNova', 1, true, 4.8, 1240, '#e6e6ea', '#5e5e69', 'avatar-org-streamernova.png', '2024-11-02T10:00:00-05:00'),
  ('usr_001', 'JohitanCups', 1, false, 4.5, 86, '#ff7a29', '#7a2e05', 'avatar-org-johitancups.png', '2025-08-10T10:00:00-05:00'),
  ('usr_032', 'ParcheGamerBog', 1, true, 4.6, 530, '#2fd07a', '#0b3a19', 'avatar-org-parchegamerbog.png', '2025-01-15T10:00:00-05:00'),
  ('usr_033', 'Liga Universitaria Andina de Esports', 1, true, 4.9, 2105, '#5d55e0', '#171447', 'avatar-org-liga-universitaria-andina-de-esports.png', '2024-08-20T10:00:00-05:00'),
  ('usr_034', 'CaliGamersClub', 1, false, 4.2, 310, '#3b82f6', '#172554', 'avatar-org-caligamersclub.png', '2025-06-01T10:00:00-05:00'),
  ('usr_035', 'PaisaEsports', 1, false, 0.0, 0, '#fbbf24', '#451a03', 'avatar-org-paisaesports.png', '2026-09-30T10:00:00-05:00'),
  ('usr_036', 'NuevaOrgCol', 1, false, 0.0, 0, '#7c7c88', '#1c1c22', null, '2026-10-20T10:00:00-05:00');

-- jugador_juegos (57 filas)
insert into public.jugador_juegos (jugador_id, juego_id) values
  ('usr_001', 'fc25'),
  ('usr_001', 'valorant'),
  ('usr_001', 'freefire'),
  ('usr_002', 'fc25'),
  ('usr_002', 'lol'),
  ('usr_002', 'cs2'),
  ('usr_003', 'valorant'),
  ('usr_004', 'valorant'),
  ('usr_005', 'fc25'),
  ('usr_005', 'valorant'),
  ('usr_005', 'rocket'),
  ('usr_006', 'lol'),
  ('usr_007', 'fc25'),
  ('usr_007', 'fortnite'),
  ('usr_007', 'valorant'),
  ('usr_008', 'fortnite'),
  ('usr_009', 'valorant'),
  ('usr_011', 'freefire'),
  ('usr_012', 'lol'),
  ('usr_013', 'rocket'),
  ('usr_013', 'fortnite'),
  ('usr_013', 'fc25'),
  ('usr_014', 'cs2'),
  ('usr_014', 'valorant'),
  ('usr_014', 'rocket'),
  ('usr_015', 'fc25'),
  ('usr_015', 'cs2'),
  ('usr_016', 'valorant'),
  ('usr_016', 'rocket'),
  ('usr_017', 'fortnite'),
  ('usr_017', 'fc25'),
  ('usr_018', 'fc25'),
  ('usr_019', 'cs2'),
  ('usr_019', 'fortnite'),
  ('usr_019', 'lol'),
  ('usr_020', 'clash'),
  ('usr_020', 'valorant'),
  ('usr_021', 'lol'),
  ('usr_022', 'rocket'),
  ('usr_022', 'fc25'),
  ('usr_023', 'fortnite'),
  ('usr_024', 'smash'),
  ('usr_024', 'fc25'),
  ('usr_025', 'freefire'),
  ('usr_025', 'cs2'),
  ('usr_026', 'fc25'),
  ('usr_026', 'lol'),
  ('usr_026', 'valorant'),
  ('usr_027', 'tekken'),
  ('usr_027', 'lol'),
  ('usr_027', 'fortnite'),
  ('usr_028', 'brawl'),
  ('usr_029', 'smash'),
  ('usr_029', 'fc25'),
  ('usr_030', 'tekken'),
  ('usr_030', 'cs2'),
  ('usr_030', 'rocket');

-- torneos (20 filas)
insert into public.torneos (id, organizador_id, juego_id, nombre, descripcion, imagen, tipo_juego, formato, jugadores_por_equipo, cupos, partidas_o_rondas, minutos_por_partida, fecha_inicio, cierre_inscripciones, checkin_obligatorio, checkin_minutos_antes, puntos_victoria, puntos_empate, puntos_derrota, puntos_por_kill, puntos_1, puntos_2, puntos_3, puntos_participacion, premio, reglas, estado, precio_cop, ciudad, enlace, creado_en) values
  ('tor_001', 'usr_031', 'fc25', 'Copa Relámpago Bogotá', 'Torneo 1v1 de FC 25 para la comunidad de Bogotá. Premios al top 3.', 'torneo-copa-relampago-bogota.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 16, null, 30, '2026-10-24T19:00:00-05:00', '2026-10-24T18:00:00-05:00', true, 30, null, null, null, null, 100, 94, 88, 10, 'Trofeo + 100 pts de ranking', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'abierto', 0, 'Bogotá', 'lt.gg/copa-relampago-bogota', '2026-10-03T19:00:00-05:00'),
  ('tor_002', 'usr_031', 'valorant', 'Liga Nocturna 5v5', 'Valorant 5 vs 5 por equipos, de noche y sin filas eternas. Inscribe a tu equipo completo o complétalo antes del check-in.', 'torneo-liga-nocturna-5v5.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 5, 8, null, 45, '2026-10-30T20:00:00-05:00', '2026-10-30T18:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, 'Trofeo + 100 pts para cada integrante', array['Check-in 30 min antes en la app', 'Mapas por veto entre capitanes', 'Desconexión: se repite el partido una vez', 'Reporta el marcador con captura'], 'abierto', 0, 'Bogotá', 'lt.gg/liga-nocturna-5v5', '2026-10-05T20:00:00-05:00'),
  ('tor_003', 'usr_031', 'fortnite', 'Victory Royale Cup', 'Battle royale en solitario: tres partidas, los puntos se acumulan.', 'torneo-victory-royale-cup.jpg', 'battle_royale', 'partidas_acumuladas', 1, 50, 3, 25, '2026-10-22T18:00:00-05:00', '2026-10-22T17:00:00-05:00', true, 30, null, null, null, true, 100, 98, 96, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Puntos: posición + 1 pt por kill', 'Sube la captura de la tabla final'], 'en_curso', 0, 'Bogotá', 'lt.gg/victory-royale-cup', '2026-10-05T18:00:00-05:00'),
  ('tor_004', 'usr_032', 'cs2', 'Clutch Masters Bogotá', 'Duelos 1v1 de puntería en CS2. Cupos limitados, hay lista de espera.', 'torneo-clutch-masters-bogota.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 8, null, 20, '2026-11-01T16:00:00-05:00', '2026-11-01T14:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, 'Medalla + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'abierto', 0, 'Bogotá', 'lt.gg/clutch-masters-bogota', '2026-10-11T16:00:00-05:00'),
  ('tor_005', 'usr_033', 'lol', 'Grieta Andina', 'Torneo universitario de League of Legends 5v5. Abierto a todas las universidades de la región andina.', 'torneo-grieta-andina.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 5, 8, null, 45, '2026-11-07T15:00:00-05:00', '2026-11-06T15:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Mapas por veto entre capitanes', 'Desconexión: se repite el partido una vez', 'Reporta el marcador con captura'], 'abierto', 0, 'Bogotá', 'lt.gg/grieta-andina', '2026-10-23T15:00:00-05:00'),
  ('tor_006', 'usr_001', 'rocket', 'Aerial Masters', '2v2 de Rocket League para los que viven en el aire.', 'torneo-aerial-masters.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 2, 8, null, 15, '2026-10-31T17:00:00-05:00', '2026-10-31T16:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'abierto', 0, 'Bogotá', 'lt.gg/aerial-masters', '2026-10-08T17:00:00-05:00'),
  ('tor_007', 'usr_031', 'fc25', 'Liga Relámpago', 'Liga 1v1 de FC 25: todos contra todos, gana quien sume más.', 'torneo-liga-relampago.jpg', 'por_puntos', 'liga', 1, 8, 5, 20, '2026-10-15T19:00:00-05:00', '2026-10-15T18:00:00-05:00', true, 30, 3, 1, 0, null, 100, 88, 75, 10, 'Trofeo + 100 pts', array['Victoria 3 pts · Empate 1 · Derrota 0', 'Un partido por ronda', 'Reporta el marcador con captura'], 'en_curso', 0, 'Bogotá', 'lt.gg/liga-relampago', '2026-10-02T19:00:00-05:00'),
  ('tor_008', 'usr_031', 'fc25', 'Liga Nocturna FC', 'Eliminación directa de FC 25 a las 9 pm.', 'torneo-liga-nocturna-fc.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 8, null, 30, '2026-09-19T21:00:00-05:00', '2026-09-19T20:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'finalizado', 0, 'Bogotá', 'lt.gg/liga-nocturna-fc', '2026-09-07T21:00:00-05:00'),
  ('tor_009', 'usr_032', 'fc25', 'Copa Chapinero', 'Torneo exprés de cuatro jugadores en un local de Chapinero.', 'torneo-copa-chapinero.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 4, null, 30, '2026-09-05T16:00:00-05:00', '2026-09-05T15:00:00-05:00', true, 30, null, null, null, null, 100, 75, 50, 10, 'Camiseta + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'finalizado', 0, 'Bogotá', 'lt.gg/copa-chapinero', '2026-08-14T16:00:00-05:00'),
  ('tor_010', 'usr_001', 'smash', 'Smash Bros Parche', 'Liga relámpago de Smash entre amigos. Todos juegan contra todos.', 'torneo-smash-bros-parche.jpg', 'por_puntos', 'liga', 1, 6, 5, 10, '2026-10-22T20:00:00-05:00', '2026-10-22T19:00:00-05:00', true, 30, 3, 1, 0, null, 100, 83, 67, 10, 'Trofeo + 100 pts', array['Victoria 3 pts · Empate 1 · Derrota 0', '3 stocks · 7 min', 'Sin objetos'], 'checkin', 0, 'Bogotá', 'lt.gg/smash-bros-parche', '2026-10-07T20:00:00-05:00'),
  ('tor_011', 'usr_032', 'tekken', 'Tekken Fight Club Bogotá', 'Rondas suizas de Tekken 8: te emparejamos con rivales de tu mismo puntaje.', 'torneo-tekken-fight-club-bogota.jpg', 'por_puntos', 'rondas_suizas', 1, 4, 2, 15, '2026-10-10T18:00:00-05:00', '2026-10-10T17:00:00-05:00', true, 30, 3, 1, 0, null, 100, 75, 50, 10, 'Trofeo + 100 pts', array['Victoria 3 pts · Empate 1 · Derrota 0', 'Al mejor de 3 rounds', 'Reporta con captura'], 'finalizado', 0, 'Bogotá', 'lt.gg/tekken-fight-club-bogota', '2026-09-16T18:00:00-05:00'),
  ('tor_012', 'usr_034', 'clash', 'Copa Pacífico Clash', 'Clash Royale 1v1 desde Cali para todo el país.', 'torneo-copa-pacifico-clash.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 8, null, 10, '2026-11-08T18:00:00-05:00', '2026-11-08T17:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'abierto', 0, 'Cali', 'lt.gg/copa-pacifico-clash', '2026-10-23T18:00:00-05:00'),
  ('tor_013', 'usr_035', 'mk1', 'Kombat Night Barranquilla', 'Noche de Mortal Kombat 1 en Barranquilla.', 'torneo-kombat-night-barranquilla.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 8, null, 15, '2026-10-17T20:00:00-05:00', '2026-10-17T19:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'cancelado', 0, 'Medellín', 'lt.gg/kombat-night-barranquilla', '2026-10-04T20:00:00-05:00'),
  ('tor_014', 'usr_033', 'freefire', 'Torneo Relámpago de Free Fire por Escuadras Universidad Nacional Sede Bogotá Edición Halloween 2026', null, null, 'battle_royale', 'clasificacion_lobbies', 4, 25, 3, 20, '2026-10-31T15:00:00-05:00', '2026-10-31T13:00:00-05:00', true, 30, null, null, null, true, 100, 96, 92, 10, null, array['Check-in 30 min antes en la app', 'Puntos: posición + 1 pt por kill', 'Sube la captura de la tabla final'], 'abierto', 0, 'Bogotá', 'lt.gg/torneo-relampago-de-free-fire', '2026-10-06T15:00:00-05:00'),
  ('tor_015', 'usr_035', 'brawl', 'Reto Brawl Medellín', 'Borrador: falta definir premios y reglas.', null, 'equipo_vs_equipo', 'eliminacion_directa', 3, 8, null, 10, '2026-11-21T16:00:00-05:00', '2026-11-21T15:00:00-05:00', true, 30, null, null, null, null, 100, 88, 75, 10, null, null, 'borrador', 0, 'Medellín', 'lt.gg/reto-brawl-medellin', '2026-11-06T16:00:00-05:00'),
  ('tor_016', 'usr_034', 'rocket', 'Récord Rocket Freestyle', 'Gana el mejor puntaje de freestyle en tus intentos.', 'torneo-record-rocket-freestyle.jpg', 'por_puntos', 'record_puntos', 1, 32, 3, 10, '2026-11-14T17:00:00-05:00', '2026-11-14T16:00:00-05:00', true, 30, 3, 1, 0, null, 100, 97, 94, 10, 'Medalla + 100 pts', array['Tres intentos por jugador', 'Cuenta el mejor puntaje', 'Sube la captura de cada intento'], 'abierto', 0, 'Cali', 'lt.gg/record-rocket-freestyle', '2026-10-20T17:00:00-05:00'),
  ('tor_017', 'usr_033', 'valorant', 'Copa Valorant Universitaria', 'Doble eliminación: nadie se va a la casa con una sola derrota.', 'torneo-copa-valorant-universitaria.jpg', 'equipo_vs_equipo', 'doble_eliminacion', 5, 16, null, 45, '2026-11-28T14:00:00-05:00', '2026-11-27T14:00:00-05:00', true, 30, null, null, null, null, 100, 94, 88, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Mapas por veto entre capitanes', 'Desconexión: se repite el partido una vez', 'Reporta el marcador con captura'], 'abierto', 0, 'Bogotá', 'lt.gg/copa-valorant-universitaria', '2026-11-15T14:00:00-05:00'),
  ('tor_018', 'usr_032', 'efootball', 'Copa Pro Chapinero', 'Prueba de torneo con entrada paga. Queda en borrador: el pago no entra en el MVP.', 'torneo-copa-pro-chapinero.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 16, null, 30, '2026-12-05T16:00:00-05:00', '2026-12-05T15:00:00-05:00', true, 30, null, null, null, null, 100, 94, 88, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'borrador', 10000, 'Bogotá', 'lt.gg/copa-pro-chapinero', '2026-11-17T16:00:00-05:00'),
  ('tor_019', 'usr_034', 'minecraft', 'Build Battle Amistoso', 'Torneo amistoso de construcción: no suma puntos de ranking.', 'torneo-build-battle-amistoso.jpg', 'por_puntos', 'record_puntos', 1, 20, 2, 30, '2026-11-15T15:00:00-05:00', '2026-11-15T14:00:00-05:00', true, 30, 3, 1, 0, null, 100, 95, 90, 0, 'Solo por diversión', array['Tema sorpresa por ronda', 'Vota la comunidad'], 'abierto', 0, 'Cali', 'lt.gg/build-battle-amistoso', '2026-10-30T15:00:00-05:00'),
  ('tor_020', 'usr_033', 'fc25', 'Open Bogotá FC', 'El open más grande de FC 25 en Bogotá. 64 cupos, ronda previa si no se llena el cuadro.', 'torneo-open-bogota-fc.jpg', 'equipo_vs_equipo', 'eliminacion_directa', 1, 64, null, 30, '2026-11-21T10:00:00-05:00', '2026-11-20T10:00:00-05:00', true, 30, null, null, null, null, 100, 98, 97, 10, 'Trofeo + 100 pts', array['Check-in 30 min antes en la app', 'Partidos al mejor de 3 · 6 min por tiempo', 'Reporta tu marcador con captura'], 'abierto', 0, 'Bogotá', 'lt.gg/open-bogota-fc', '2026-11-02T10:00:00-05:00');

-- inscripciones (80 filas)
insert into public.inscripciones (id, torneo_id, jugador_id, estado, seed, posicion_espera, check_in_en, creado_en) values
  ('ins_001', 'tor_001', 'usr_001', 'confirmada', 1, null, null, '2026-10-18T17:00:00-05:00'),
  ('ins_002', 'tor_001', 'usr_002', 'confirmada', 2, null, null, '2026-10-18T14:00:00-05:00'),
  ('ins_003', 'tor_001', 'usr_003', 'confirmada', 3, null, null, '2026-10-20T09:00:00-05:00'),
  ('ins_004', 'tor_001', 'usr_004', 'confirmada', 4, null, null, '2026-10-19T08:00:00-05:00'),
  ('ins_005', 'tor_001', 'usr_005', 'confirmada', 5, null, null, '2026-10-22T10:00:00-05:00'),
  ('ins_006', 'tor_001', 'usr_006', 'confirmada', 6, null, null, '2026-10-21T11:00:00-05:00'),
  ('ins_007', 'tor_001', 'usr_007', 'confirmada', 7, null, null, '2026-10-20T17:00:00-05:00'),
  ('ins_008', 'tor_001', 'usr_015', 'confirmada', 8, null, null, '2026-10-16T13:00:00-05:00'),
  ('ins_009', 'tor_001', 'usr_008', 'pendiente', 9, null, null, '2026-10-19T09:00:00-05:00'),
  ('ins_010', 'tor_001', 'usr_026', 'pendiente', 10, null, null, '2026-10-15T16:00:00-05:00'),
  ('ins_011', 'tor_002', 'usr_001', 'confirmada', null, null, null, '2026-10-24T08:00:00-05:00'),
  ('ins_012', 'tor_002', 'usr_004', 'confirmada', null, null, null, '2026-10-29T17:00:00-05:00'),
  ('ins_013', 'tor_002', 'usr_003', 'confirmada', null, null, null, '2026-10-29T08:00:00-05:00'),
  ('ins_014', 'tor_002', 'usr_006', 'pendiente', null, null, null, '2026-10-24T14:00:00-05:00'),
  ('ins_015', 'tor_002', 'usr_016', 'confirmada', null, null, null, '2026-10-25T19:00:00-05:00'),
  ('ins_016', 'tor_002', 'usr_009', 'confirmada', null, null, null, '2026-10-26T11:00:00-05:00'),
  ('ins_017', 'tor_002', 'usr_019', 'confirmada', null, null, null, '2026-10-24T17:00:00-05:00'),
  ('ins_018', 'tor_002', 'usr_014', 'confirmada', null, null, null, '2026-10-22T14:00:00-05:00'),
  ('ins_019', 'tor_002', 'usr_011', 'confirmada', null, null, null, '2026-10-22T18:00:00-05:00'),
  ('ins_020', 'tor_003', 'usr_008', 'confirmada', 1, null, '2026-10-22T17:47:00-05:00', '2026-10-19T15:00:00-05:00'),
  ('ins_021', 'tor_003', 'usr_017', 'confirmada', 2, null, '2026-10-22T17:32:00-05:00', '2026-10-13T10:00:00-05:00'),
  ('ins_022', 'tor_003', 'usr_023', 'confirmada', 3, null, '2026-10-22T17:47:00-05:00', '2026-10-15T09:00:00-05:00'),
  ('ins_023', 'tor_003', 'usr_005', 'confirmada', 4, null, '2026-10-22T17:43:00-05:00', '2026-10-16T15:00:00-05:00'),
  ('ins_024', 'tor_003', 'usr_003', 'confirmada', 5, null, '2026-10-22T17:51:00-05:00', '2026-10-13T11:00:00-05:00'),
  ('ins_025', 'tor_003', 'usr_001', 'confirmada', 6, null, '2026-10-22T17:53:00-05:00', '2026-10-21T17:00:00-05:00'),
  ('ins_026', 'tor_003', 'usr_007', 'confirmada', 7, null, '2026-10-22T17:51:00-05:00', '2026-10-19T06:00:00-05:00'),
  ('ins_027', 'tor_003', 'usr_002', 'confirmada', 8, null, '2026-10-22T17:34:00-05:00', '2026-10-15T09:00:00-05:00'),
  ('ins_028', 'tor_003', 'usr_004', 'confirmada', 9, null, '2026-10-22T17:53:00-05:00', '2026-10-15T12:00:00-05:00'),
  ('ins_029', 'tor_003', 'usr_006', 'confirmada', 10, null, '2026-10-22T17:36:00-05:00', '2026-10-14T10:00:00-05:00'),
  ('ins_030', 'tor_004', 'usr_014', 'confirmada', 1, null, null, '2026-10-27T08:00:00-05:00'),
  ('ins_031', 'tor_004', 'usr_019', 'confirmada', 2, null, null, '2026-10-31T06:00:00-05:00'),
  ('ins_032', 'tor_004', 'usr_005', 'confirmada', 3, null, null, '2026-10-30T06:00:00-05:00'),
  ('ins_033', 'tor_004', 'usr_003', 'confirmada', 4, null, null, '2026-10-23T04:00:00-05:00'),
  ('ins_034', 'tor_004', 'usr_022', 'confirmada', 5, null, null, '2026-10-27T04:00:00-05:00'),
  ('ins_035', 'tor_004', 'usr_026', 'confirmada', 6, null, null, '2026-10-26T15:00:00-05:00'),
  ('ins_036', 'tor_004', 'usr_015', 'confirmada', 7, null, null, '2026-10-27T10:00:00-05:00'),
  ('ins_037', 'tor_004', 'usr_018', 'confirmada', 8, null, null, '2026-10-29T09:00:00-05:00'),
  ('ins_038', 'tor_004', 'usr_001', 'espera', null, 1, null, '2026-10-31T05:00:00-05:00'),
  ('ins_039', 'tor_004', 'usr_013', 'espera', null, 2, null, '2026-10-27T08:00:00-05:00'),
  ('ins_040', 'tor_005', 'usr_006', 'confirmada', null, null, null, '2026-11-04T07:00:00-05:00'),
  ('ins_041', 'tor_005', 'usr_012', 'confirmada', null, null, null, '2026-11-05T05:00:00-05:00'),
  ('ins_042', 'tor_005', 'usr_021', 'confirmada', null, null, null, '2026-11-02T05:00:00-05:00'),
  ('ins_043', 'tor_005', 'usr_013', 'confirmada', null, null, null, '2026-10-29T06:00:00-05:00'),
  ('ins_044', 'tor_005', 'usr_016', 'confirmada', null, null, null, '2026-11-03T13:00:00-05:00'),
  ('ins_045', 'tor_006', 'usr_022', 'confirmada', null, null, null, '2026-10-25T05:00:00-05:00'),
  ('ins_046', 'tor_006', 'usr_013', 'confirmada', null, null, null, '2026-10-28T09:00:00-05:00'),
  ('ins_047', 'tor_006', 'usr_027', 'confirmada', null, null, null, '2026-10-22T17:00:00-05:00'),
  ('ins_048', 'tor_006', 'usr_002', 'confirmada', null, null, null, '2026-10-25T10:00:00-05:00'),
  ('ins_049', 'tor_007', 'usr_003', 'confirmada', 1, null, '2026-10-15T18:55:00-05:00', '2026-10-13T14:00:00-05:00'),
  ('ins_050', 'tor_007', 'usr_001', 'confirmada', 2, null, '2026-10-15T18:46:00-05:00', '2026-10-11T19:00:00-05:00'),
  ('ins_051', 'tor_007', 'usr_007', 'confirmada', 3, null, '2026-10-15T18:48:00-05:00', '2026-10-13T18:00:00-05:00'),
  ('ins_052', 'tor_007', 'usr_005', 'confirmada', 4, null, '2026-10-15T18:32:00-05:00', '2026-10-07T18:00:00-05:00'),
  ('ins_053', 'tor_007', 'usr_004', 'confirmada', 5, null, '2026-10-15T18:31:00-05:00', '2026-10-06T07:00:00-05:00'),
  ('ins_054', 'tor_007', 'usr_002', 'confirmada', 6, null, '2026-10-15T18:51:00-05:00', '2026-10-12T09:00:00-05:00'),
  ('ins_055', 'tor_007', 'usr_006', 'confirmada', 7, null, '2026-10-15T18:40:00-05:00', '2026-10-06T17:00:00-05:00'),
  ('ins_056', 'tor_007', 'usr_008', 'confirmada', 8, null, '2026-10-15T18:47:00-05:00', '2026-10-06T10:00:00-05:00'),
  ('ins_057', 'tor_008', 'usr_001', 'confirmada', 1, null, '2026-09-19T20:42:00-05:00', '2026-09-15T13:00:00-05:00'),
  ('ins_058', 'tor_008', 'usr_002', 'confirmada', 2, null, '2026-09-19T20:31:00-05:00', '2026-09-15T10:00:00-05:00'),
  ('ins_059', 'tor_008', 'usr_005', 'confirmada', 3, null, '2026-09-19T20:46:00-05:00', '2026-09-12T11:00:00-05:00'),
  ('ins_060', 'tor_008', 'usr_007', 'confirmada', 4, null, '2026-09-19T20:35:00-05:00', '2026-09-13T14:00:00-05:00'),
  ('ins_061', 'tor_008', 'usr_015', 'confirmada', 5, null, '2026-09-19T20:39:00-05:00', '2026-09-11T20:00:00-05:00'),
  ('ins_062', 'tor_008', 'usr_018', 'confirmada', 6, null, '2026-09-19T20:48:00-05:00', '2026-09-15T20:00:00-05:00'),
  ('ins_063', 'tor_008', 'usr_026', 'confirmada', 7, null, '2026-09-19T20:45:00-05:00', '2026-09-18T12:00:00-05:00'),
  ('ins_064', 'tor_008', 'usr_003', 'confirmada', 8, null, '2026-09-19T20:38:00-05:00', '2026-09-15T12:00:00-05:00'),
  ('ins_065', 'tor_009', 'usr_015', 'confirmada', 1, null, '2026-09-05T15:48:00-05:00', '2026-09-04T15:00:00-05:00'),
  ('ins_066', 'tor_009', 'usr_001', 'confirmada', 2, null, '2026-09-05T15:33:00-05:00', '2026-09-04T13:00:00-05:00'),
  ('ins_067', 'tor_009', 'usr_018', 'confirmada', 3, null, '2026-09-05T15:53:00-05:00', '2026-09-04T11:00:00-05:00'),
  ('ins_068', 'tor_009', 'usr_026', 'confirmada', 4, null, '2026-09-05T15:53:00-05:00', '2026-08-27T13:00:00-05:00'),
  ('ins_069', 'tor_010', 'usr_024', 'confirmada', 1, null, '2026-10-22T19:47:00-05:00', '2026-10-14T17:00:00-05:00'),
  ('ins_070', 'tor_010', 'usr_029', 'confirmada', 2, null, null, '2026-10-13T18:00:00-05:00'),
  ('ins_071', 'tor_010', 'usr_027', 'confirmada', 3, null, '2026-10-22T19:40:00-05:00', '2026-10-18T08:00:00-05:00'),
  ('ins_072', 'tor_010', 'usr_030', 'confirmada', 4, null, '2026-10-22T19:40:00-05:00', '2026-10-15T17:00:00-05:00'),
  ('ins_073', 'tor_010', 'usr_028', 'pendiente', 5, null, null, '2026-10-20T19:00:00-05:00'),
  ('ins_074', 'tor_010', 'usr_020', 'confirmada', 6, null, '2026-10-22T19:42:00-05:00', '2026-10-16T14:00:00-05:00'),
  ('ins_075', 'tor_011', 'usr_027', 'confirmada', 1, null, '2026-10-10T17:42:00-05:00', '2026-10-02T07:00:00-05:00'),
  ('ins_076', 'tor_011', 'usr_030', 'confirmada', 2, null, '2026-10-10T17:54:00-05:00', '2026-10-08T18:00:00-05:00'),
  ('ins_077', 'tor_011', 'usr_024', 'confirmada', 3, null, '2026-10-10T17:43:00-05:00', '2026-10-04T06:00:00-05:00'),
  ('ins_078', 'tor_011', 'usr_023', 'confirmada', 4, null, '2026-10-10T17:52:00-05:00', '2026-10-06T15:00:00-05:00'),
  ('ins_079', 'tor_012', 'usr_020', 'confirmada', 1, null, null, '2026-11-04T10:00:00-05:00'),
  ('ins_080', 'tor_013', 'usr_023', 'cancelada', null, null, null, '2026-10-09T18:00:00-05:00');

-- partidos (28 filas)
insert into public.partidos (id, torneo_id, ronda, nombre_ronda, orden, jugador_a_id, jugador_b_id, marcador_a, marcador_b, ganador_id, estado, resuelto_por, fecha_hora, prueba_imagen, nota) values
  ('par_001', 'tor_008', 1, 'Cuartos', 1, 'usr_001', 'usr_026', 2, 0, 'usr_001', 'finalizado', 'reportes', '2026-09-19T21:00:00-05:00', 'prueba-par_001.jpg', null),
  ('par_002', 'tor_008', 1, 'Cuartos', 2, 'usr_007', 'usr_015', 3, 1, 'usr_007', 'finalizado', 'reportes', '2026-09-19T21:00:00-05:00', null, null),
  ('par_003', 'tor_008', 1, 'Cuartos', 3, 'usr_005', 'usr_018', null, null, 'usr_005', 'wo', 'organizador_wo', '2026-09-19T21:00:00-05:00', null, 'Santi_FC no hizo check-in a tiempo'),
  ('par_004', 'tor_008', 1, 'Cuartos', 4, 'usr_002', 'usr_003', 1, 0, 'usr_002', 'finalizado', 'reportes', '2026-09-19T21:00:00-05:00', null, null),
  ('par_005', 'tor_008', 2, 'Semis', 1, 'usr_001', 'usr_007', 2, 1, 'usr_001', 'finalizado', 'reportes', '2026-09-19T21:50:00-05:00', 'prueba-par_005.jpg', null),
  ('par_006', 'tor_008', 2, 'Semis', 2, 'usr_005', 'usr_002', 0, 2, 'usr_002', 'finalizado', 'organizador_disputa', '2026-09-19T21:50:00-05:00', null, null),
  ('par_007', 'tor_008', 3, 'Tercer puesto', 1, 'usr_007', 'usr_005', 2, 0, 'usr_007', 'finalizado', 'reportes', '2026-09-19T22:40:00-05:00', null, null),
  ('par_008', 'tor_008', 3, 'Final', 1, 'usr_001', 'usr_002', 3, 2, 'usr_001', 'finalizado', 'reportes', '2026-09-19T22:40:00-05:00', 'prueba-par_008.jpg', null),
  ('par_009', 'tor_009', 1, 'Semis', 1, 'usr_015', 'usr_026', 2, 0, 'usr_015', 'finalizado', 'reportes', '2026-09-05T16:00:00-05:00', null, null),
  ('par_010', 'tor_009', 1, 'Semis', 2, 'usr_001', 'usr_018', 1, 2, 'usr_018', 'finalizado', 'reportes', '2026-09-05T16:00:00-05:00', 'prueba-par_010.jpg', null),
  ('par_011', 'tor_009', 2, 'Tercer puesto', 1, 'usr_001', 'usr_026', 4, 1, 'usr_001', 'finalizado', 'reportes', '2026-09-05T16:45:00-05:00', null, null),
  ('par_012', 'tor_009', 2, 'Final', 1, 'usr_015', 'usr_018', 1, 0, 'usr_015', 'finalizado', 'reportes', '2026-09-05T16:45:00-05:00', 'prueba-par_012.jpg', null),
  ('par_013', 'tor_011', 1, 'Ronda 1', 1, 'usr_027', 'usr_023', 2, 0, 'usr_027', 'finalizado', 'reportes', '2026-10-10T18:00:00-05:00', null, null),
  ('par_014', 'tor_011', 1, 'Ronda 1', 2, 'usr_030', 'usr_024', 2, 1, 'usr_030', 'finalizado', 'reportes', '2026-10-10T18:00:00-05:00', null, null),
  ('par_015', 'tor_011', 2, 'Ronda 2', 1, 'usr_027', 'usr_030', 2, 1, 'usr_027', 'finalizado', 'reportes', '2026-10-10T18:30:00-05:00', 'prueba-par_015.jpg', null),
  ('par_016', 'tor_011', 2, 'Ronda 2', 2, 'usr_024', 'usr_023', 1, 1, null, 'finalizado', 'reportes', '2026-10-10T18:30:00-05:00', null, null),
  ('par_017', 'tor_007', 1, 'Ronda 1', 1, 'usr_003', 'usr_008', 2, 0, 'usr_003', 'finalizado', 'reportes', '2026-10-15T19:00:00-05:00', null, null),
  ('par_018', 'tor_007', 1, 'Ronda 1', 2, 'usr_001', 'usr_006', 1, 1, null, 'finalizado', 'reportes', '2026-10-15T19:00:00-05:00', 'prueba-par_018.jpg', null),
  ('par_019', 'tor_007', 1, 'Ronda 1', 3, 'usr_007', 'usr_002', 2, 1, 'usr_007', 'finalizado', 'reportes', '2026-10-15T19:00:00-05:00', null, null),
  ('par_020', 'tor_007', 1, 'Ronda 1', 4, 'usr_005', 'usr_004', 3, 2, 'usr_005', 'finalizado', 'reportes', '2026-10-15T19:00:00-05:00', null, null),
  ('par_021', 'tor_007', 2, 'Ronda 2', 1, 'usr_003', 'usr_005', 1, 0, 'usr_003', 'finalizado', 'reportes', '2026-10-18T19:00:00-05:00', null, null),
  ('par_022', 'tor_007', 2, 'Ronda 2', 2, 'usr_001', 'usr_007', 3, 1, 'usr_001', 'finalizado', 'reportes', '2026-10-18T19:00:00-05:00', 'prueba-par_022.jpg', null),
  ('par_023', 'tor_007', 2, 'Ronda 2', 3, 'usr_004', 'usr_006', 1, 1, null, 'finalizado', 'reportes', '2026-10-18T19:00:00-05:00', null, null),
  ('par_024', 'tor_007', 2, 'Ronda 2', 4, 'usr_002', 'usr_008', 2, 2, null, 'finalizado', 'reportes', '2026-10-18T19:00:00-05:00', null, null),
  ('par_025', 'tor_007', 3, 'Ronda 3', 1, 'usr_003', 'usr_007', 2, 0, 'usr_003', 'finalizado', 'reportes', '2026-10-21T19:00:00-05:00', 'prueba-par_025.jpg', null),
  ('par_026', 'tor_007', 3, 'Ronda 3', 2, 'usr_005', 'usr_008', 1, 0, 'usr_005', 'finalizado', 'reportes', '2026-10-21T19:00:00-05:00', null, null),
  ('par_027', 'tor_007', 3, 'Ronda 3', 3, 'usr_001', 'usr_004', null, null, null, 'reportado', null, '2026-10-22T19:00:00-05:00', null, 'Ambos reportaron 2–1. Falta que el organizador confirme'),
  ('par_028', 'tor_007', 3, 'Ronda 3', 4, 'usr_002', 'usr_006', null, null, null, 'en_disputa', null, '2026-10-22T19:00:00-05:00', null, 'Los reportes no coinciden');

-- reportes_resultado (36 filas)
insert into public.reportes_resultado (id, partido_id, jugador_id, marcador_a, marcador_b, captura_imagen, creado_en) values
  ('rep_001', 'par_001', 'usr_001', 2, 0, 'captura-rep_001.jpg', '2026-09-19T21:32:00-05:00'),
  ('rep_002', 'par_001', 'usr_026', 2, 0, null, '2026-09-19T21:35:00-05:00'),
  ('rep_003', 'par_002', 'usr_007', 3, 1, null, '2026-09-19T21:32:00-05:00'),
  ('rep_004', 'par_002', 'usr_015', 3, 1, null, '2026-09-19T21:35:00-05:00'),
  ('rep_005', 'par_004', 'usr_002', 1, 0, null, '2026-09-19T21:32:00-05:00'),
  ('rep_006', 'par_004', 'usr_003', 1, 0, null, '2026-09-19T21:35:00-05:00'),
  ('rep_007', 'par_005', 'usr_001', 2, 1, 'captura-rep_007.jpg', '2026-09-19T22:22:00-05:00'),
  ('rep_008', 'par_005', 'usr_007', 2, 1, null, '2026-09-19T22:24:00-05:00'),
  ('rep_009', 'par_006', 'usr_005', 1, 2, null, '2026-09-19T22:20:00-05:00'),
  ('rep_010', 'par_006', 'usr_002', 0, 2, 'captura-rep_010.jpg', '2026-09-19T22:21:00-05:00'),
  ('rep_011', 'par_008', 'usr_001', 3, 2, 'captura-rep_011.jpg', '2026-09-19T23:15:00-05:00'),
  ('rep_012', 'par_008', 'usr_002', 3, 2, null, '2026-09-19T23:17:00-05:00'),
  ('rep_013', 'par_017', 'usr_003', 2, 0, null, '2026-10-15T19:25:00-05:00'),
  ('rep_014', 'par_017', 'usr_008', 2, 0, null, '2026-10-15T19:27:00-05:00'),
  ('rep_015', 'par_018', 'usr_001', 1, 1, 'captura-rep_015.jpg', '2026-10-15T19:25:00-05:00'),
  ('rep_016', 'par_018', 'usr_006', 1, 1, null, '2026-10-15T19:27:00-05:00'),
  ('rep_017', 'par_019', 'usr_007', 2, 1, null, '2026-10-15T19:25:00-05:00'),
  ('rep_018', 'par_019', 'usr_002', 2, 1, null, '2026-10-15T19:27:00-05:00'),
  ('rep_019', 'par_020', 'usr_005', 3, 2, null, '2026-10-15T19:25:00-05:00'),
  ('rep_020', 'par_020', 'usr_004', 3, 2, null, '2026-10-15T19:27:00-05:00'),
  ('rep_021', 'par_021', 'usr_003', 1, 0, null, '2026-10-18T19:25:00-05:00'),
  ('rep_022', 'par_021', 'usr_005', 1, 0, null, '2026-10-18T19:27:00-05:00'),
  ('rep_023', 'par_022', 'usr_001', 3, 1, 'captura-rep_023.jpg', '2026-10-18T19:25:00-05:00'),
  ('rep_024', 'par_022', 'usr_007', 3, 1, null, '2026-10-18T19:27:00-05:00'),
  ('rep_025', 'par_023', 'usr_004', 1, 1, null, '2026-10-18T19:25:00-05:00'),
  ('rep_026', 'par_023', 'usr_006', 1, 1, null, '2026-10-18T19:27:00-05:00'),
  ('rep_027', 'par_024', 'usr_002', 2, 2, null, '2026-10-18T19:25:00-05:00'),
  ('rep_028', 'par_024', 'usr_008', 2, 2, null, '2026-10-18T19:27:00-05:00'),
  ('rep_029', 'par_025', 'usr_003', 2, 0, 'captura-rep_029.jpg', '2026-10-21T19:24:00-05:00'),
  ('rep_030', 'par_025', 'usr_007', 2, 0, null, '2026-10-21T19:26:00-05:00'),
  ('rep_031', 'par_026', 'usr_005', 1, 0, null, '2026-10-21T19:22:00-05:00'),
  ('rep_032', 'par_026', 'usr_008', 1, 0, null, '2026-10-21T19:23:00-05:00'),
  ('rep_033', 'par_027', 'usr_001', 2, 1, 'captura-rep_033.jpg', '2026-10-22T19:27:00-05:00'),
  ('rep_034', 'par_027', 'usr_004', 2, 1, null, '2026-10-22T19:28:00-05:00'),
  ('rep_035', 'par_028', 'usr_002', 2, 1, 'captura-rep_035.jpg', '2026-10-22T19:30:00-05:00'),
  ('rep_036', 'par_028', 'usr_006', 1, 2, null, '2026-10-22T19:31:00-05:00');

-- partidas_battle_royale (3 filas)
insert into public.partidas_battle_royale (id, torneo_id, numero, estado, inicio, minutos, jugadores_vivos, ganador_id, prueba_imagen) values
  ('pbr_001', 'tor_003', 1, 'finalizada', '2026-10-22T18:00:00-05:00', 25, null, 'usr_005', 'prueba-pbr_001.jpg'),
  ('pbr_002', 'tor_003', 2, 'finalizada', '2026-10-22T18:35:00-05:00', 25, null, 'usr_003', 'prueba-pbr_002.jpg'),
  ('pbr_003', 'tor_003', 3, 'en_curso', '2026-10-22T19:10:00-05:00', 25, 46, null, null);

-- resultados_battle_royale (22 filas)
insert into public.resultados_battle_royale (id, partida_br_id, jugador_id, puesto, kills, puntos, estado, captura_imagen) values
  ('rbr_001', 'pbr_001', 'usr_005', 1, 6, 18, 'confirmado', null),
  ('rbr_002', 'pbr_001', 'usr_003', 2, 4, 13, 'confirmado', null),
  ('rbr_003', 'pbr_001', 'usr_001', 3, 3, 10, 'confirmado', null),
  ('rbr_004', 'pbr_001', 'usr_007', 4, 2, 8, 'confirmado', null),
  ('rbr_005', 'pbr_001', 'usr_002', 5, 1, 6, 'confirmado', null),
  ('rbr_006', 'pbr_001', 'usr_004', 6, 1, 5, 'confirmado', null),
  ('rbr_007', 'pbr_001', 'usr_006', 7, 0, 3, 'confirmado', null),
  ('rbr_008', 'pbr_001', 'usr_008', 8, 2, 4, 'confirmado', null),
  ('rbr_009', 'pbr_001', 'usr_017', 9, 0, 1, 'confirmado', null),
  ('rbr_010', 'pbr_001', 'usr_023', 10, 0, 0, 'confirmado', null),
  ('rbr_011', 'pbr_002', 'usr_003', 1, 8, 20, 'confirmado', null),
  ('rbr_012', 'pbr_002', 'usr_001', 2, 5, 14, 'confirmado', null),
  ('rbr_013', 'pbr_002', 'usr_005', 3, 4, 11, 'confirmado', null),
  ('rbr_014', 'pbr_002', 'usr_002', 4, 2, 8, 'confirmado', null),
  ('rbr_015', 'pbr_002', 'usr_007', 5, 2, 7, 'confirmado', null),
  ('rbr_016', 'pbr_002', 'usr_006', 6, 1, 5, 'confirmado', null),
  ('rbr_017', 'pbr_002', 'usr_004', 7, 1, 4, 'confirmado', null),
  ('rbr_018', 'pbr_002', 'usr_023', 8, 0, 2, 'confirmado', null),
  ('rbr_019', 'pbr_002', 'usr_008', 9, 0, 1, 'confirmado', null),
  ('rbr_020', 'pbr_002', 'usr_017', 10, 0, 0, 'confirmado', null),
  ('rbr_021', 'pbr_003', 'usr_005', 1, 6, 18, 'reportado', 'captura-rbr_021.jpg'),
  ('rbr_022', 'pbr_003', 'usr_001', 2, 4, 13, 'reportado', null);

-- posiciones_finales (16 filas)
insert into public.posiciones_finales (id, torneo_id, jugador_id, posicion, puntos_ranking, partidos_jugados, victorias) values
  ('pos_001', 'tor_008', 'usr_001', 1, 100, 3, 3),
  ('pos_002', 'tor_008', 'usr_002', 2, 88, 3, 2),
  ('pos_003', 'tor_008', 'usr_007', 3, 75, 3, 2),
  ('pos_004', 'tor_008', 'usr_005', 4, 63, 3, 1),
  ('pos_005', 'tor_008', 'usr_026', 5, 50, 1, 0),
  ('pos_006', 'tor_008', 'usr_015', 6, 38, 1, 0),
  ('pos_007', 'tor_008', 'usr_018', 7, 25, 1, 0),
  ('pos_008', 'tor_008', 'usr_003', 8, 13, 1, 0),
  ('pos_009', 'tor_009', 'usr_015', 1, 100, 2, 2),
  ('pos_010', 'tor_009', 'usr_018', 2, 75, 2, 1),
  ('pos_011', 'tor_009', 'usr_001', 3, 50, 2, 1),
  ('pos_012', 'tor_009', 'usr_026', 4, 25, 2, 0),
  ('pos_013', 'tor_011', 'usr_027', 1, 100, 2, 2),
  ('pos_014', 'tor_011', 'usr_030', 2, 75, 2, 1),
  ('pos_015', 'tor_011', 'usr_024', 3, 50, 2, 0),
  ('pos_016', 'tor_011', 'usr_023', 4, 25, 2, 0);

-- mensajes_torneo (16 filas)
insert into public.mensajes_torneo (id, torneo_id, autor_id, contenido, es_anuncio, fijado, creado_en) values
  ('msg_001', 'tor_001', 'usr_031', 'Check-in abierto hasta las 6:30 pm. El bracket se publica a las 6:45 pm.', true, true, '2026-10-22T17:40:00-05:00'),
  ('msg_002', 'tor_001', 'usr_002', '¿A qué hora arranca la ronda 1?', false, false, '2026-10-22T18:12:00-05:00'),
  ('msg_003', 'tor_001', 'usr_031', '7:00 pm en punto. Revisen su check-in', false, false, '2026-10-22T18:13:00-05:00'),
  ('msg_004', 'tor_001', 'usr_001', 'Listo, ya hice check-in. ¡Suerte a todos!', false, false, '2026-10-22T18:14:00-05:00'),
  ('msg_005', 'tor_001', 'usr_003', 'GG desde ya', false, false, '2026-10-22T18:15:00-05:00'),
  ('msg_006', 'tor_001', 'usr_007', '¿Se puede jugar con cualquier equipo o solo clubes? Pregunto porque la vez pasada en otro torneo hubo problema con eso y al final repitieron dos partidos por lo mismo, entonces mejor aclararlo desde ya para que nadie se quede por fuera ni toque repetir nada 🙏', false, false, '2026-10-22T18:20:00-05:00'),
  ('msg_007', 'tor_001', 'usr_031', 'Cualquier club, sin selecciones. Partidos de 6 min por tiempo.', false, false, '2026-10-22T18:22:00-05:00'),
  ('msg_008', 'tor_001', 'usr_005', '⚽🔥', false, false, '2026-10-22T18:23:00-05:00'),
  ('msg_009', 'tor_007', 'usr_031', 'Ronda 3 hoy a las 7:00 pm. Reporten el marcador con captura.', true, true, '2026-10-22T12:00:00-05:00'),
  ('msg_010', 'tor_007', 'usr_004', 'Johitan, ¿jugamos a las 7 o un poquito más tarde?', false, false, '2026-10-22T17:05:00-05:00'),
  ('msg_011', 'tor_007', 'usr_001', 'A las 7 de una 💪', false, false, '2026-10-22T17:07:00-05:00'),
  ('msg_012', 'tor_007', 'usr_006', 'NovaK yo reporté 2–1 a mi favor, revisa la captura', false, false, '2026-10-22T19:33:00-05:00'),
  ('msg_013', 'tor_003', 'usr_031', 'Partida 3 en curso. Al terminar suban la captura de la tabla final.', true, true, '2026-10-22T19:10:00-05:00'),
  ('msg_014', 'tor_003', 'usr_017', 'Me sacaron en el primer círculo 😭', false, false, '2026-10-22T19:18:00-05:00'),
  ('msg_015', 'tor_002', 'usr_031', 'Equipos: completen sus 5 integrantes antes del check-in.', true, true, '2026-10-21T10:00:00-05:00'),
  ('msg_016', 'tor_010', 'usr_001', 'Check-in abierto. Faltan CaroGG... ¡ah no, ya entró! Falta Nubecita.', false, false, '2026-10-22T19:41:00-05:00');

-- conexiones (12 filas)
insert into public.conexiones (id, jugador_id, amigo_id, estado, creado_en) values
  ('con_001', 'usr_001', 'usr_003', 'aceptado', '2026-08-05T12:00:00-05:00'),
  ('con_002', 'usr_001', 'usr_009', 'aceptado', '2026-08-09T12:00:00-05:00'),
  ('con_003', 'usr_001', 'usr_010', 'aceptado', '2026-08-13T12:00:00-05:00'),
  ('con_004', 'usr_001', 'usr_002', 'aceptado', '2026-08-17T12:00:00-05:00'),
  ('con_005', 'usr_004', 'usr_001', 'pendiente', '2026-08-21T12:00:00-05:00'),
  ('con_006', 'usr_003', 'usr_005', 'aceptado', '2026-08-25T12:00:00-05:00'),
  ('con_007', 'usr_007', 'usr_015', 'aceptado', '2026-08-29T12:00:00-05:00'),
  ('con_008', 'usr_024', 'usr_027', 'aceptado', '2026-09-02T12:00:00-05:00'),
  ('con_009', 'usr_024', 'usr_030', 'pendiente', '2026-09-06T12:00:00-05:00'),
  ('con_010', 'usr_006', 'usr_012', 'aceptado', '2026-09-10T12:00:00-05:00'),
  ('con_011', 'usr_016', 'usr_009', 'aceptado', '2026-09-14T12:00:00-05:00'),
  ('con_012', 'usr_022', 'usr_013', 'aceptado', '2026-09-18T12:00:00-05:00');

-- notificaciones (14 filas)
insert into public.notificaciones (id, usuario_id, tipo, titulo, texto, torneo_id, leida, creado_en) values
  ('not_001', 'usr_001', 'checkin', 'Check-in abierto', 'Copa Relámpago · cierra 6:30 pm', 'tor_001', false, '2026-10-22T18:00:00-05:00'),
  ('not_002', 'usr_001', 'resultado', 'Resultado validado', 'Ganaste 3–1 a Lupe · +3 pts', 'tor_007', false, '2026-10-18T20:10:00-05:00'),
  ('not_003', 'usr_001', 'reto', 'Sh4dow te retó', 'Partido amistoso de Valorant', null, false, '2026-10-22T16:00:00-05:00'),
  ('not_004', 'usr_001', 'inscripcion', 'Inscripción confirmada', 'Liga Nocturna 5v5 · Vie 30 Oct', 'tor_002', true, '2026-10-19T09:00:00-05:00'),
  ('not_005', 'usr_001', 'recomendado', 'Nuevo torneo cerca', 'Grieta Andina · League of Legends', 'tor_005', true, '2026-10-18T11:00:00-05:00'),
  ('not_006', 'usr_001', 'ranking', 'Subiste al puesto 5', 'Ranking global de EA FC 25', null, true, '2026-10-17T21:00:00-05:00'),
  ('not_007', 'usr_001', 'espera', 'Estás en lista de espera', 'Clutch Masters Bogotá · eres el #1', 'tor_004', true, '2026-10-20T14:00:00-05:00'),
  ('not_008', 'usr_006', 'disputa', 'Resultado en disputa', 'El organizador revisará las pruebas de tu partido con NovaK', 'tor_007', false, '2026-10-22T19:32:00-05:00'),
  ('not_009', 'usr_002', 'disputa', 'Resultado en disputa', 'El organizador revisará las pruebas de tu partido con Kairo', 'tor_007', false, '2026-10-22T19:32:00-05:00'),
  ('not_010', 'usr_018', 'wo', 'Perdiste por W.O.', 'No hiciste check-in a tiempo en Cuartos', 'tor_008', true, '2026-09-19T21:05:00-05:00'),
  ('not_011', 'usr_023', 'cancelado', 'Torneo cancelado', 'Kombat Night Barranquilla fue cancelado por el organizador', 'tor_013', true, '2026-10-15T10:00:00-05:00'),
  ('not_012', 'usr_031', 'inscripcion', 'Nueva inscripción', 'Brayan_GOAT se inscribió en Copa Relámpago Bogotá', 'tor_001', false, '2026-10-21T22:00:00-05:00'),
  ('not_013', 'usr_031', 'disputa', 'Disputa por resolver', 'Liga Relámpago · Ronda 3 · NovaK vs Kairo', 'tor_007', false, '2026-10-22T19:32:00-05:00'),
  ('not_014', 'usr_010', 'bienvenida', '¡Bienvenido a LTournaments!', 'Elige tus juegos y encuentra tu primer torneo', null, false, '2026-10-18T10:05:00-05:00');

-- ============================================================
-- 3. Row Level Security: lectura pública, sin escritura
-- ============================================================
-- Con RLS activo y solo una política de SELECT, cualquier insert/update/delete desde la app queda bloqueado.

alter table public.juegos enable row level security;
create policy "Lectura pública" on public.juegos for select using (true);

alter table public.usuarios enable row level security;
create policy "Lectura pública" on public.usuarios for select using (true);

alter table public.perfiles_jugador enable row level security;
create policy "Lectura pública" on public.perfiles_jugador for select using (true);

alter table public.perfiles_organizador enable row level security;
create policy "Lectura pública" on public.perfiles_organizador for select using (true);

alter table public.jugador_juegos enable row level security;
create policy "Lectura pública" on public.jugador_juegos for select using (true);

alter table public.torneos enable row level security;
create policy "Lectura pública" on public.torneos for select using (true);

alter table public.inscripciones enable row level security;
create policy "Lectura pública" on public.inscripciones for select using (true);

alter table public.partidos enable row level security;
create policy "Lectura pública" on public.partidos for select using (true);

alter table public.reportes_resultado enable row level security;
create policy "Lectura pública" on public.reportes_resultado for select using (true);

alter table public.partidas_battle_royale enable row level security;
create policy "Lectura pública" on public.partidas_battle_royale for select using (true);

alter table public.resultados_battle_royale enable row level security;
create policy "Lectura pública" on public.resultados_battle_royale for select using (true);

alter table public.posiciones_finales enable row level security;
create policy "Lectura pública" on public.posiciones_finales for select using (true);

alter table public.mensajes_torneo enable row level security;
create policy "Lectura pública" on public.mensajes_torneo for select using (true);

alter table public.conexiones enable row level security;
create policy "Lectura pública" on public.conexiones for select using (true);

alter table public.notificaciones enable row level security;
create policy "Lectura pública" on public.notificaciones for select using (true);

commit;
