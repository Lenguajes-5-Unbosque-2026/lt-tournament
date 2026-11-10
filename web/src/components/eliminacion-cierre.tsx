"use client";

import { Gamepad2, Layers, Users } from "lucide-react";
import { CierreTorneo } from "@/components/cierre-torneo";
import { useEliminacion } from "@/components/eliminacion-provider";
import { cuadro, estadoCierreEliminacion, podio } from "@/lib/eliminacion";

/**
 * Cerrar torneo (O15): podio (campeón, finalista y ganador del 3.er puesto)
 * con los puntos de ranking del torneo, jugadores, partidos y rondas. Solo
 * se cierra con el bracket completo.
 */
export function EliminacionCierre() {
  const { torneo, publicado, publicar } = useEliminacion();
  const { registrados, completo, partidos } = estadoCierreEliminacion(torneo);

  return (
    <CierreTorneo
      nombre={torneo.nombre}
      enlace={torneo.enlace}
      volverHref={`/org/torneos/${torneo.id}/bracket`}
      podio={podio(torneo).map((j, i) => ({ ...j, detalle: `+${torneo.premios[i]} pts` }))}
      stats={[
        { icon: Users, value: String(torneo.jugadores.length), label: "Jugadores" },
        { icon: Gamepad2, value: String(partidos), label: "Partidos" },
        { icon: Layers, value: String(cuadro(torneo).length), label: "Rondas" },
      ]}
      checks={[
        { texto: "Todos los resultados registrados", hecho: registrados },
        { texto: "Bracket completo", hecho: completo },
        { texto: "Puntos de ranking calculados", hecho: completo },
      ]}
      participantes={torneo.jugadores.length}
      unidad="jugadores"
      publicado={publicado}
      onPublicar={publicar}
    />
  );
}
