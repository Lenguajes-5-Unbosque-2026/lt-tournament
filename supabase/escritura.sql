-- LT Tournament · Políticas de escritura (Row Level Security)
--
-- Se ejecuta DESPUÉS de supabase/schema.sql, que ya activa RLS en todas las
-- tablas y crea la política de lectura pública. Pega este archivo en el SQL
-- Editor de Supabase. Se puede ejecutar más de una vez.
--
-- Inscribirse en un torneo solo agrega una fila en public.inscripciones.
-- No modifica public.torneos: `cupos` es la capacidad TOTAL del torneo y los
-- inscritos («24/32») se calculan contando las filas de inscripciones con
-- estado confirmada o pendiente. Por eso NO hay política de UPDATE sobre
-- torneos (ver la nota al final).

-- 1. Cualquiera puede inscribirse (INSERT en inscripciones)
drop policy if exists "Inscripción pública" on public.inscripciones;

create policy "Inscripción pública"
  on public.inscripciones
  for insert
  to anon, authenticated
  with check (true);

-- Nota sobre las otras acciones, que siguen bloqueadas:
--   · SELECT  → ya lo permite "Lectura pública" (schema.sql). La app lo
--               necesita para contar inscritos y para leer la fila recién
--               creada (insert(...).select()).
--   · UPDATE y DELETE sobre inscripciones → sin política, por lo tanto nadie
--               puede cancelar ni editar una inscripción todavía. Cuando
--               haya login se agregarán con auth.uid().
--
-- Nota sobre torneos: no se crea política de UPDATE. Restar «cupos» al
-- inscribirse dañaría el dato (el torneo quedaría con menos capacidad de la
-- que tiene) y, peor, un UPDATE abierto permitiría a cualquiera cambiar el
-- nombre, el estado o los premios de cualquier torneo. Si más adelante se
-- necesita un contador, se agrega con un trigger en inscripciones, no con
-- una política de escritura abierta.
