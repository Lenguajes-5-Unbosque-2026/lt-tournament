-- LT Tournament · Quita los equipos (fuera del MVP)
--
-- El MVP solo tiene jugadores individuales: no hay equipos, escuadras ni capitanes. Corre este
-- archivo en el SQL Editor de Supabase para borrar las tablas y columnas de equipos de la base
-- que ya está creada (schema.sql ya no las trae). Se puede correr varias veces.
-- OJO: borra los datos de public.equipos y public.equipo_integrantes.

begin;

alter table public.inscripciones drop column if exists equipo_id;
alter table public.posiciones_finales drop column if exists equipo_id;

drop table if exists public.equipo_integrantes cascade;
drop table if exists public.equipos cascade;

commit;
