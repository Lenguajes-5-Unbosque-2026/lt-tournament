"use client";

import { Gamepad2, Layers, Users } from "lucide-react";
import { CierreTorneo } from "@/components/cierre-torneo";
import { useLiga } from "@/components/liga-provider";
import { estadoCierreLiga, tablaLiga } from "@/lib/liga";

/**
 * Cierre y podio (PTS · O4): podio con los puntos de ranking del torneo,
 * participantes, partidos y rondas. Solo se cierra con todas las rondas
 * jugadas y todos los resultados registrados.
 */
export function LigaCierre() {
  const { torneo, publicado, publicar } = useLiga();
  const { registrados, tablaCompleta, listo } = estadoCierreLiga(torneo);

  return (
    <CierreTorneo
      nombre={torneo.nombre}
      enlace={torneo.enlace}
      volverHref={`/org/torneos/${torneo.id}/bracket`}
      podio={tablaLiga(torneo)
        .slice(0, 3)
        .map((f, i) => ({ ...f.jugador, detalle: `+${torneo.premios[i]} pts` }))}
      stats={[
        { icon: Users, value: String(torneo.jugadores.length), label: "Participantes" },
        { icon: Gamepad2, value: String(torneo.partidos.length), label: "Partidos" },
        { icon: Layers, value: String(torneo.totalRondas), label: "Rondas" },
      ]}
      checks={[
        { texto: "Todos los resultados registrados", hecho: registrados },
        { texto: "Tabla de posiciones completa", hecho: tablaCompleta },
        { texto: "Puntos de ranking calculados", hecho: listo },
      ]}
      participantes={torneo.jugadores.length}
      unidad="participantes"
      publicado={publicado}
      onPublicar={publicar}
    />
  );
}
