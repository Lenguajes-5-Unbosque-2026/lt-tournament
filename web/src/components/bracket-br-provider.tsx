"use client";

import { createContext, useContext, useState } from "react";
import { AHORA } from "@/lib/ahora";
import { puntosPartida, type ResultadoBR, type TorneoBR } from "@/lib/battle-royale";

export type FilaRegistro = { jugadorId: string; puesto: number; kills: number };

type BracketBR = {
  torneo: TorneoBR;
  publicado: boolean;
  /** Confirmar resultados (BR · O3): la partida queda finalizada. */
  registrarPartida: (numero: number, filas: FilaRegistro[], prueba: string | null) => void;
  /** «Iniciar siguiente partida» (BR · O2). */
  iniciarSiguiente: () => void;
  /** «Finalizar y publicar resultados» (BR · O4). */
  publicar: () => void;
};

const Contexto = createContext<BracketBR | null>(null);

/**
 * Estado del bracket battle royale del organizador (BR · O2 a O4). Arranca
 * con los datos del mock y guarda en memoria lo que registra el organizador
 * mientras navega entre las tres pantallas. Al conectar Supabase, cada
 * acción pasa a ser una escritura en la base.
 */
export function BracketBRProvider({
  inicial,
  children,
}: {
  inicial: TorneoBR;
  children: React.ReactNode;
}) {
  const [torneo, setTorneo] = useState(inicial);
  const [publicado, setPublicado] = useState(false);

  function registrarPartida(numero: number, filas: FilaRegistro[], prueba: string | null) {
    setTorneo((t) => {
      const partida = t.partidas.find((p) => p.numero === numero);
      if (!partida) return t;
      const anteriores = t.resultados.filter((r) => r.partidaId === partida.id);
      const nuevos: ResultadoBR[] = filas.map((f) => ({
        partidaId: partida.id,
        jugadorId: f.jugadorId,
        puesto: f.puesto,
        kills: f.kills,
        puntos: puntosPartida(f.puesto, f.kills, t.puntosPorKill),
        estado: "confirmado",
        // La captura que subió el jugador al reportar se conserva.
        captura: anteriores.find((r) => r.jugadorId === f.jugadorId)?.captura ?? null,
      }));
      return {
        ...t,
        resultados: [...t.resultados.filter((r) => r.partidaId !== partida.id), ...nuevos],
        partidas: t.partidas.map((p) =>
          p.id === partida.id
            ? {
                ...p,
                estado: "finalizada",
                vivos: null,
                ganadorId: filas.find((f) => f.puesto === 1)?.jugadorId ?? null,
                prueba: prueba ?? p.prueba,
              }
            : p,
        ),
      };
    });
  }

  function iniciarSiguiente() {
    setTorneo((t) => {
      const siguiente = t.partidas.find((p) => p.estado === "pendiente");
      if (!siguiente || t.partidas.some((p) => p.estado === "en_curso")) return t;
      return {
        ...t,
        partidas: t.partidas.map((p) =>
          p.id === siguiente.id
            ? { ...p, estado: "en_curso", inicio: AHORA, vivos: t.jugadores.length }
            : p,
        ),
      };
    });
  }

  return (
    <Contexto.Provider
      value={{
        torneo,
        publicado,
        registrarPartida,
        iniciarSiguiente,
        publicar: () => setPublicado(true),
      }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function useBracketBR() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useBracketBR va dentro de <BracketBRProvider>.");
  return ctx;
}
