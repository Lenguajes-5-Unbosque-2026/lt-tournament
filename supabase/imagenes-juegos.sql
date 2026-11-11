-- LT Tournament · Portadas de los juegos
--
-- Pone en public.juegos el link público de la portada de cada juego. Antes sube los 10 archivos
-- de data/mock/imagenes/portada-*.jpg al bucket público «imagenes» de Supabase Storage
-- (Storage → imagenes → Upload files), con esos mismos nombres. Si ya existían, reemplázalos.
-- Se puede correr varias veces.
--
-- Juegos: clash, cs2, fc25, fortnite, freefire, lol, minecraft, rocket, smash, valorant.

begin;

update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-clash.jpg' where id = 'clash';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-cs2.jpg' where id = 'cs2';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-fc25.jpg' where id = 'fc25';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-fortnite.jpg' where id = 'fortnite';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-freefire.jpg' where id = 'freefire';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-lol.jpg' where id = 'lol';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-minecraft.jpg' where id = 'minecraft';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-rocket.jpg' where id = 'rocket';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-smash.jpg' where id = 'smash';
update public.juegos set imagen = 'https://smwqhyjohxtbhiueyegk.supabase.co/storage/v1/object/public/imagenes/portada-valorant.jpg' where id = 'valorant';

commit;
