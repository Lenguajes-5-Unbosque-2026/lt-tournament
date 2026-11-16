-- LT Tournament · Portadas de los juegos
--
-- Pone en public.juegos el link público de la portada de cada juego. Antes sube los 10 archivos
-- de data/mock/imagenes/portada-*.jpg al bucket público «imagenes» de Supabase Storage
-- (Storage → imagenes → Upload files), con esos mismos nombres. Si ya existían, reemplázalos.
-- Los links llevan «?v=2» para que el navegador y Next no muestren la imagen vieja guardada en caché;
-- si vuelves a cambiar las imágenes, sube ese número. Se puede correr varias veces.
--
-- Juegos: clash, cs2, fc25, fortnite, freefire, lol, minecraft, rocket, smash, valorant.

begin;

update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-clash.jpg?v=2' where id = 'clash';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-cs2.jpg?v=2' where id = 'cs2';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-fc25.jpg?v=2' where id = 'fc25';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-fortnite.jpg?v=2' where id = 'fortnite';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-freefire.jpg?v=2' where id = 'freefire';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-lol.jpg?v=2' where id = 'lol';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-minecraft.jpg?v=2' where id = 'minecraft';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-rocket.jpg?v=2' where id = 'rocket';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-smash.jpg?v=2' where id = 'smash';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-valorant.jpg?v=2' where id = 'valorant';

commit;
