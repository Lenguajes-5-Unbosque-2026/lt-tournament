-- LT Tournament · Portada de cada torneo = portada real de su juego
--
-- Antes los torneos tenían una ilustración propia (torneo-*.jpg). Ahora la imagen de cada torneo
-- es la portada de su juego. Corre imagenes-juegos.sql primero (deja el link de cada portada en
-- public.juegos) y después este archivo. Los torneos de un juego sin portada quedan sin imagen y
-- la app muestra el degradado con la abreviatura. Se puede correr varias veces.

update public.torneos t
set imagen = j.imagen
from public.juegos j
where j.id = t.juego_id;
