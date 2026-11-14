-- LT Tournament · Puntos de ranking con máximo 100
--
-- Regla única: puntos del puesto = 100 × (N − puesto + 1) / N, redondeado. El 1.º siempre da
-- 100 y nadie gana más. Corre este archivo en el SQL Editor de Supabase para corregir la base
-- que ya está creada (schema.sql ya trae estos valores para una base nueva). Se puede correr
-- varias veces.

begin;

-- Puntos del 1.º, 2.º y 3.º en cada torneo (N = cupos) y el premio con el mismo número.
update public.torneos set puntos_1 = 100, puntos_2 = 94, puntos_3 = 88, premio = 'Trofeo + 100 pts de ranking' where id = 'tor_001';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Trofeo + 100 pts para cada integrante' where id = 'tor_002';
update public.torneos set puntos_1 = 100, puntos_2 = 98, puntos_3 = 96, premio = 'Trofeo + 100 pts' where id = 'tor_003';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Medalla + 100 pts' where id = 'tor_004';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Trofeo + 100 pts' where id = 'tor_005';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Trofeo + 100 pts' where id = 'tor_006';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Trofeo + 100 pts' where id = 'tor_007';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Trofeo + 100 pts' where id = 'tor_008';
update public.torneos set puntos_1 = 100, puntos_2 = 75, puntos_3 = 50, premio = 'Camiseta + 100 pts' where id = 'tor_009';
update public.torneos set puntos_1 = 100, puntos_2 = 83, puntos_3 = 67, premio = 'Trofeo + 100 pts' where id = 'tor_010';
update public.torneos set puntos_1 = 100, puntos_2 = 75, puntos_3 = 50, premio = 'Trofeo + 100 pts' where id = 'tor_011';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Trofeo + 100 pts' where id = 'tor_012';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = 'Trofeo + 100 pts' where id = 'tor_013';
update public.torneos set puntos_1 = 100, puntos_2 = 96, puntos_3 = 92, premio = '' where id = 'tor_014';
update public.torneos set puntos_1 = 100, puntos_2 = 88, puntos_3 = 75, premio = '' where id = 'tor_015';
update public.torneos set puntos_1 = 100, puntos_2 = 97, puntos_3 = 94, premio = 'Medalla + 100 pts' where id = 'tor_016';
update public.torneos set puntos_1 = 100, puntos_2 = 94, puntos_3 = 88, premio = 'Trofeo + 100 pts' where id = 'tor_017';
update public.torneos set puntos_1 = 100, puntos_2 = 94, puntos_3 = 88, premio = 'Trofeo + 100 pts' where id = 'tor_018';
update public.torneos set puntos_1 = 100, puntos_2 = 95, puntos_3 = 90, premio = 'Solo por diversión' where id = 'tor_019';
update public.torneos set puntos_1 = 100, puntos_2 = 98, puntos_3 = 97, premio = 'Trofeo + 100 pts' where id = 'tor_020';

-- Puntos sugeridos por juego (N = 32: 100 / 97 / 94).
update public.juegos set puntos_1 = 100, puntos_2 = 97, puntos_3 = 94;

-- Puntos de cada puesto final.
update public.posiciones_finales set puntos_ranking = 100 where id = 'pos_001';
update public.posiciones_finales set puntos_ranking = 88 where id = 'pos_002';
update public.posiciones_finales set puntos_ranking = 75 where id = 'pos_003';
update public.posiciones_finales set puntos_ranking = 63 where id = 'pos_004';
update public.posiciones_finales set puntos_ranking = 50 where id = 'pos_005';
update public.posiciones_finales set puntos_ranking = 38 where id = 'pos_006';
update public.posiciones_finales set puntos_ranking = 25 where id = 'pos_007';
update public.posiciones_finales set puntos_ranking = 13 where id = 'pos_008';
update public.posiciones_finales set puntos_ranking = 100 where id = 'pos_009';
update public.posiciones_finales set puntos_ranking = 75 where id = 'pos_010';
update public.posiciones_finales set puntos_ranking = 50 where id = 'pos_011';
update public.posiciones_finales set puntos_ranking = 25 where id = 'pos_012';
update public.posiciones_finales set puntos_ranking = 100 where id = 'pos_013';
update public.posiciones_finales set puntos_ranking = 75 where id = 'pos_014';
update public.posiciones_finales set puntos_ranking = 50 where id = 'pos_015';
update public.posiciones_finales set puntos_ranking = 25 where id = 'pos_016';

-- Total y nivel de cada jugador (nivel = 1 + puntos ÷ 100).
update public.perfiles_jugador set puntos_ranking = 150, nivel = 2 where id = 'usr_001';
update public.perfiles_jugador set puntos_ranking = 88, nivel = 1 where id = 'usr_002';
update public.perfiles_jugador set puntos_ranking = 13, nivel = 1 where id = 'usr_003';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_004';
update public.perfiles_jugador set puntos_ranking = 63, nivel = 1 where id = 'usr_005';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_006';
update public.perfiles_jugador set puntos_ranking = 75, nivel = 1 where id = 'usr_007';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_008';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_009';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_010';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_011';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_012';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_013';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_014';
update public.perfiles_jugador set puntos_ranking = 138, nivel = 2 where id = 'usr_015';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_016';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_017';
update public.perfiles_jugador set puntos_ranking = 100, nivel = 2 where id = 'usr_018';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_019';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_020';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_021';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_022';
update public.perfiles_jugador set puntos_ranking = 25, nivel = 1 where id = 'usr_023';
update public.perfiles_jugador set puntos_ranking = 50, nivel = 1 where id = 'usr_024';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_025';
update public.perfiles_jugador set puntos_ranking = 75, nivel = 1 where id = 'usr_026';
update public.perfiles_jugador set puntos_ranking = 100, nivel = 2 where id = 'usr_027';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_028';
update public.perfiles_jugador set puntos_ranking = 0, nivel = 1 where id = 'usr_029';
update public.perfiles_jugador set puntos_ranking = 75, nivel = 1 where id = 'usr_030';

commit;
