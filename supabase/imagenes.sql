-- LT Tournament · URLs públicas de las imágenes
-- Cambia cada columna de imagen de "nombre-de-archivo.jpg" a la URL pública del bucket "imagenes" de Supabase Storage.
-- Correr después de schema.sql.
--
-- Se puede correr varias veces: toma solo el nombre del archivo (lo que va después del último "/")
-- y le pone delante la URL base. Si cambia el proyecto, basta con cambiar "base" y volver a correrlo.
-- Las filas sin imagen (null) no se tocan.

do $$
declare
  base text := 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/';
begin
  -- Portadas de juegos
  update public.juegos                  set imagen         = base || regexp_replace(imagen,         '^.*/', '') where imagen         is not null;
  -- Avatares de jugadores y organizadores
  update public.perfiles_jugador        set imagen         = base || regexp_replace(imagen,         '^.*/', '') where imagen         is not null;
  update public.perfiles_organizador    set imagen         = base || regexp_replace(imagen,         '^.*/', '') where imagen         is not null;
  -- Portadas de torneos
  update public.torneos                 set imagen         = base || regexp_replace(imagen,         '^.*/', '') where imagen         is not null;
  -- Prueba oficial que sube el organizador
  update public.partidos                set prueba_imagen  = base || regexp_replace(prueba_imagen,  '^.*/', '') where prueba_imagen  is not null;
  update public.partidas_battle_royale  set prueba_imagen  = base || regexp_replace(prueba_imagen,  '^.*/', '') where prueba_imagen  is not null;
  -- Captura que sube el jugador al reportar
  update public.reportes_resultado      set captura_imagen = base || regexp_replace(captura_imagen, '^.*/', '') where captura_imagen is not null;
  update public.resultados_battle_royale set captura_imagen = base || regexp_replace(captura_imagen, '^.*/', '') where captura_imagen is not null;
end $$;
