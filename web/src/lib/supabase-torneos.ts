import "server-only";
import { supabase } from "./supabase";
import type { EstadoTorneo, Torneo } from "./types";

/** Torneos que se muestran en Explorar (igual que en lib/mock.ts). */
const ESTADOS_VISIBLES: EstadoTorneo[] = ["abierto", "checkin", "en_curso"];

/** Estados de inscripción que ocupan cupo: «24/32» (data/mock/README.md). */
const OCUPAN_CUPO = ["confirmada", "pendiente"];

/**
 * Forma de cada fila que devuelve la consulta (columnas de supabase/schema.sql).
 * juego y organizador son un objeto porque torneos tiene una sola FK a cada uno.
 */
type FilaTorneo = {
  id: string;
  nombre: string;
  imagen: string | null;
  jugadores_por_equipo: number;
  cupos: number;
  fecha_inicio: string;
  estado: string;
  ciudad: string | null;
  juego: {
    id: string;
    nombre: string;
    color_1: string;
    color_2: string;
    abreviatura: string;
    imagen: string | null;
  };
  organizador: { id: string; alias: string; verificado: boolean; imagen: string | null };
  inscripciones: { estado: string }[];
};

/**
 * Torneos visibles para el jugador, del más próximo al más lejano, con su
 * juego, su organizador y el conteo de inscritos. Lee de Supabase; si la
 * consulta falla lanza un error para que lo atrape el error.tsx de la ruta.
 */
export async function getTorneosVisibles(): Promise<Torneo[]> {
  const { data, error } = await supabase
    .from("torneos")
    .select(
      `id, nombre, imagen, jugadores_por_equipo, cupos, fecha_inicio, estado, ciudad,
       juego:juegos!inner (id, nombre, color_1, color_2, abreviatura, imagen),
       organizador:perfiles_organizador!inner (id, alias, verificado, imagen),
       inscripciones (estado)`,
    )
    .in("estado", ESTADOS_VISIBLES)
    .order("fecha_inicio")
    .overrideTypes<FilaTorneo[], { merge: false }>();

  if (error) throw new Error(`No se pudieron cargar los torneos: ${error.message}`);

  return data.map((t) => ({
    id: t.id,
    nombre: t.nombre,
    imagen: t.imagen ?? "",
    jugadoresPorEquipo: t.jugadores_por_equipo,
    cupos: t.cupos,
    inscritos: t.inscripciones.filter((i) => OCUPAN_CUPO.includes(i.estado)).length,
    fechaInicio: t.fecha_inicio,
    estado: t.estado as EstadoTorneo,
    ciudad: t.ciudad ?? "",
    juego: {
      id: t.juego.id,
      nombre: t.juego.nombre,
      color1: t.juego.color_1,
      color2: t.juego.color_2,
      abreviatura: t.juego.abreviatura,
      imagen: t.juego.imagen ?? "",
    },
    organizador: {
      id: t.organizador.id,
      alias: t.organizador.alias,
      verificado: t.organizador.verificado,
      imagen: t.organizador.imagen ?? "",
    },
  }));
}
