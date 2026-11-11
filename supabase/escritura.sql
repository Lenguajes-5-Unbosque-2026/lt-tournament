-- LT Tournament · Políticas de escritura (Row Level Security)
--
-- Se ejecuta DESPUÉS de supabase/schema.sql, que ya activa RLS en todas las
-- tablas y crea la política de lectura pública. Pega este archivo en el SQL
-- Editor de Supabase. Se puede ejecutar más de una vez.
--
-- Con estas políticas la app puede registrar en Supabase lo que hace el
-- usuario, usando solo la llave pública (anon):
--
--   Acción en la app                        Tabla                  Permiso
--   Crear cuenta (J03)                      usuarios               INSERT
--                                           perfiles_jugador       INSERT
--                                           perfiles_organizador   INSERT
--   Elegir juegos (J02)                     jugador_juegos         INSERT
--   Inscribirse / lista de espera (J10/J12) inscripciones          INSERT
--   Hacer check-in (J14)                    inscripciones          UPDATE
--   Publicar o guardar un torneo (O05)      torneos                INSERT
--   Escribir en el chat / anuncio (J15/O14) mensajes_torneo        INSERT
--
-- IMPORTANTE: hoy no hay login con Supabase Auth, así que estas políticas son
-- abiertas (cualquiera con la llave pública puede escribir). Sirven para
-- desarrollar y probar el MVP. Cuando se conecte el login hay que cambiar
-- `with check (true)` por reglas con auth.uid(): por ejemplo, que una
-- inscripción solo la pueda crear o actualizar su jugador.
--
-- No hay políticas de UPDATE ni DELETE en torneos: inscribirse NO modifica el
-- torneo (`cupos` es la capacidad total; los inscritos se cuentan en
-- inscripciones), y editar o borrar un torneo ajeno no debe poder hacerse.

-- 1. Cuentas ---------------------------------------------------------------
drop policy if exists "Crear cuenta" on public.usuarios;
create policy "Crear cuenta" on public.usuarios
  for insert to anon, authenticated with check (true);

drop policy if exists "Crear perfil de jugador" on public.perfiles_jugador;
create policy "Crear perfil de jugador" on public.perfiles_jugador
  for insert to anon, authenticated with check (true);

drop policy if exists "Crear perfil de organizador" on public.perfiles_organizador;
create policy "Crear perfil de organizador" on public.perfiles_organizador
  for insert to anon, authenticated with check (true);

drop policy if exists "Elegir juegos" on public.jugador_juegos;
create policy "Elegir juegos" on public.jugador_juegos
  for insert to anon, authenticated with check (true);

-- 2. Inscripciones y check-in ----------------------------------------------
drop policy if exists "Inscripción pública" on public.inscripciones;
create policy "Inscripción pública" on public.inscripciones
  for insert to anon, authenticated with check (true);

-- El check-in actualiza una inscripción existente (check_in_en).
drop policy if exists "Check-in público" on public.inscripciones;
create policy "Check-in público" on public.inscripciones
  for update to anon, authenticated using (true) with check (true);

-- 3. Torneos ---------------------------------------------------------------
drop policy if exists "Publicar torneo" on public.torneos;
create policy "Publicar torneo" on public.torneos
  for insert to anon, authenticated with check (true);

-- 4. Chat ------------------------------------------------------------------
drop policy if exists "Escribir en el chat" on public.mensajes_torneo;
create policy "Escribir en el chat" on public.mensajes_torneo
  for insert to anon, authenticated with check (true);

-- Lo demás sigue bloqueado: sin política no hay UPDATE ni DELETE (salvo el
-- check-in de arriba). La lectura la permite "Lectura pública" de schema.sql.
