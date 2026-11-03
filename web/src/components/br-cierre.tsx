"use client";

import { Crosshair, Gamepad2, Users } from "lucide-react";
import { useBracketBR } from "@/components/bracket-br-provider";
import { CierreTorneo } from "@/components/cierre-torneo";
import { confirmados, estadoCierre, tablaGeneral } from "@/lib/battle-royale";

/**
 * Cierre y podio (BR · O4): podio con los puntos de ranking del torneo,
 * jugadores, partidas y kills. Solo se cierra con todas las partidas
 * registradas.
 */
export function BRCierre() {
  const { torneo, publicado, publicar } = useBracketBR();
  const { registradas, completa, listo } = estadoCierre(torneo);

  return (
    <CierreTorneo
      nombre={torneo.nombre}
      enlace={torneo.enlace}
      volverHref={`/org/torneos/${torneo.id}/bracket`}
      podio={tablaGeneral(torneo)
        .slice(0, 3)
        .map((f, i) => ({ ...f.jugador, detalle: `+${torneo.premios[i]} pts` }))}
      stats={[
        { icon: Users, value: String(torneo.jugadores.length), label: "Jugadores" },
        { icon: Gamepad2, value: String(torneo.partidas.length), label: "Partidas" },
        {
          icon: Crosshair,
          value: String(confirmados(torneo).reduce((s, r) => s + r.kills, 0)),
          label: "Kills",
        },
      ]}
      checks={[
        { texto: "Todos los resultados registrados", hecho: registradas },
        { texto: "Tabla final completa", hecho: completa },
        { texto: "Puntos de ranking calculados", hecho: listo },
      ]}
      participantes={torneo.jugadores.length}
      unidad="jugadores"
      publicado={publicado}
      onPublicar={publicar}
    />
  );
}
