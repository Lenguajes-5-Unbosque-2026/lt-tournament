"use client";

import { createContext, useContext, useState } from "react";
import { AHORA } from "@/lib/ahora";
import { emparejar, rondaActual, type PartidoLiga, type TorneoLiga } from "@/lib/liga";

type Liga = {
  torneo: TorneoLiga;
  publicado: boolean;
  /** Confirmar resultado (PTS · O3): el partido queda finalizado y suma a la tabla. */
  registrarPartido: (partidoId: string, a: number, b: number, prueba: string | null) => void;
  /** «Avanzar a Ronda N» (PTS · O2): crea los emparejamientos de la ronda siguiente. */
  avanzarRonda: () => void;
  /** «Generar emparejamientos» (PTS · O2): vuelve a sortear la ronda actual. */
  regenerarEmparejamientos: () => void;
  /** «Finalizar y publicar resultados» (PTS · O4). */
  publicar: () => void;
};

const Contexto = createContext<Liga | null>(null);

function crearPartidos(t: TorneoLiga, ronda: number, aleatorio: boolean): PartidoLiga[] {
  // Los emparejamientos no cuentan los partidos de la ronda que se reemplaza.
  const base = { ...t, partidos: t.partidos.filter((p) => p.ronda !== ronda) };
  return emparejar(base, aleatorio).map(([aId, bId], i) => ({
    id: `${t.id}_r${ronda}_${i + 1}`,
    ronda,
    orden: i + 1,
    aId,
    bId,
    marcadorA: null,
    marcadorB: null,
    ganadorId: null,
    estado: "pendiente",
    fechaHora: AHORA,
    prueba: null,
  }));
}

/**
 * Estado del bracket por puntos del organizador (PTS · O2 a O4). Arranca con
 * los datos del mock y guarda en memoria lo que registra el organizador
 * mientras navega entre las tres pantallas, hasta conectar Supabase.
 */
export function LigaProvider({
  inicial,
  children,
}: {
  inicial: TorneoLiga;
  children: React.ReactNode;
}) {
  const [torneo, setTorneo] = useState(inicial);
  const [publicado, setPublicado] = useState(false);

  function registrarPartido(partidoId: string, a: number, b: number, prueba: string | null) {
    setTorneo((t) => ({
      ...t,
      partidos: t.partidos.map((p) =>
        p.id === partidoId
          ? {
              ...p,
              marcadorA: a,
              marcadorB: b,
              ganadorId: a > b ? p.aId : b > a ? p.bId : null,
              estado: "finalizado",
              prueba: prueba ?? p.prueba,
            }
          : p,
      ),
    }));
  }

  function avanzarRonda() {
    setTorneo((t) => {
      const actual = rondaActual(t);
      if (actual >= t.totalRondas) return t;
      return { ...t, partidos: [...t.partidos, ...crearPartidos(t, actual + 1, false)] };
    });
  }

  function regenerarEmparejamientos() {
    setTorneo((t) => {
      const actual = rondaActual(t);
      return {
        ...t,
        partidos: [
          ...t.partidos.filter((p) => p.ronda !== actual),
          ...crearPartidos(t, actual, true),
        ],
      };
    });
  }

  return (
    <Contexto.Provider
      value={{
        torneo,
        publicado,
        registrarPartido,
        avanzarRonda,
        regenerarEmparejamientos,
        publicar: () => setPublicado(true),
      }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function useLiga() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useLiga va dentro de <LigaProvider>.");
  return ctx;
}
