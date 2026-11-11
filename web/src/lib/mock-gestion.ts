import "server-only";
import type { EstadoInscrito, ListaInscritos, ResumenGestion } from "./gestion";
import { getTorneoDetalle, leer, tipoDeBracket } from "./mock";

/** El torneo del organizador con lo que muestra el Resumen (O07). */
export function getResumenGestion(torneoId: string): ResumenGestion | undefined {
  const t = getTorneoDetalle(torneoId);
  if (!t) return undefined;
  const fila = leer("torneos").find((x) => x.id === torneoId)!;
  const inscripciones = leer("inscripciones").filter((i) => i.torneo_id === torneoId);

  return {
    torneoId,
    nombre: t.nombre,
    estado: t.estado,
    fechaInicio: t.fechaInicio,
    cupos: t.cupos,
    inscritos: t.inscritos,
    checkins: inscripciones.filter(
      (i) => (i.estado === "confirmada" || i.estado === "pendiente") && i.check_in_en,
    ).length,
    enEspera: inscripciones.filter((i) => i.estado === "espera").length,
    minutosAntes: Number(fila.checkin_minutos_antes || 30),
    conBracket: tipoDeBracket(torneoId) !== undefined,
  };
}

/** Los inscritos del torneo (confirmados, pendientes y en espera), del más reciente al más antiguo. */
export function getInscritosGestion(torneoId: string): ListaInscritos | undefined {
  const t = getTorneoDetalle(torneoId);
  if (!t) return undefined;
  const perfiles = new Map(leer("perfiles_jugador").map((p) => [p.id, p]));

  const inscritos = leer("inscripciones")
    .filter(
      (i) =>
        i.torneo_id === torneoId &&
        (i.estado === "confirmada" || i.estado === "pendiente" || i.estado === "espera"),
    )
    .flatMap((i) => {
      const p = perfiles.get(i.jugador_id);
      return p
        ? [
            {
              id: p.id,
              nombre: p.nombre_usuario,
              imagen: p.imagen,
              color1: p.color_1,
              color2: p.color_2,
              estado: i.estado as EstadoInscrito,
              inscritoEn: i.creado_en,
              checkin: !!i.check_in_en,
              checkinEn: i.check_in_en || null,
            },
          ]
        : [];
    })
    .sort((a, b) => b.inscritoEn.localeCompare(a.inscritoEn));

  return { torneoId, torneoNombre: t.nombre, cupos: t.cupos, inscritos };
}
