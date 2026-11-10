"use client";

import { createContext, useContext, useState } from "react";
import { cuadro, porJugar, totalRondas, type Llave, type TorneoEliminacion } from "@/lib/eliminacion";

type Eliminacion = {
  torneo: TorneoEliminacion;
  publicado: boolean;
  /** Confirmar resultado (O13): el ganador pasa al partido siguiente. */
  registrarLlave: (llave: Llave, marcadorA: number, marcadorB: number, prueba: string | null) => void;
  /** «Avanzar a Cuartos» (O12). */
  avanzarRonda: () => void;
  /** «Finalizar y publicar resultados» (O15). */
  publicar: () => void;
};

const Contexto = createContext<Eliminacion | null>(null);

/**
 * Estado del bracket 1 vs 1 del organizador (O12, O13 y O15). Arranca con
 * los datos del mock y guarda en memoria lo que registra el organizador
 * mientras navega entre las tres pantallas, hasta conectar Supabase.
 */
export function EliminacionProvider({
  inicial,
  children,
}: {
  inicial: TorneoEliminacion;
  children: React.ReactNode;
}) {
  const [torneo, setTorneo] = useState(inicial);
  // Un torneo que ya viene finalizado del mock ya está publicado.
  const [publicado, setPublicado] = useState(inicial.estado === "finalizado");

  function registrarLlave(llave: Llave, marcadorA: number, marcadorB: number, prueba: string | null) {
    if (!llave.aId || !llave.bId) return;
    const aId = llave.aId;
    const bId = llave.bId;
    setTorneo((t) => {
      const otros = t.partidos.filter(
        (p) => !(p.ronda === llave.ronda && p.orden === llave.orden && p.tercerPuesto === llave.tercerPuesto),
      );
      return {
        ...t,
        partidos: [
          ...otros,
          {
            id: llave.id,
            ronda: llave.ronda,
            orden: llave.orden,
            tercerPuesto: llave.tercerPuesto,
            aId,
            bId,
            marcadorA,
            marcadorB,
            ganadorId: marcadorA > marcadorB ? aId : bId,
            estado: "finalizado",
            fechaHora: llave.fechaHora,
            prueba: prueba ?? llave.prueba,
          },
        ],
      };
    });
  }

  function avanzarRonda() {
    setTorneo((t) => {
      const actual = cuadro(t)[t.rondaActiva - 1];
      const completa = actual && !actual.llaves.some((l) => porJugar(l) || !l.cerrada);
      if (!completa || t.rondaActiva >= totalRondas(t)) return t;
      return { ...t, rondaActiva: t.rondaActiva + 1 };
    });
  }

  return (
    <Contexto.Provider
      value={{ torneo, publicado, registrarLlave, avanzarRonda, publicar: () => setPublicado(true) }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function useEliminacion() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useEliminacion va dentro de <EliminacionProvider>.");
  return ctx;
}
