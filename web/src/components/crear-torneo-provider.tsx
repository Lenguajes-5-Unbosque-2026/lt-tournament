"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { guardarTorneoDelOrganizador } from "@/app/actions/escritura";
import { BORRADOR_INICIAL, type Borrador } from "@/lib/crear-config";

type Contexto = {
  borrador: Borrador;
  /** Mezcla cambios en el borrador; los pasos del asistente comparten este estado. */
  actualizar: (cambios: Partial<Borrador>) => void;
  /** Nivel del organizador: fija el máximo de jugadores. */
  nivel: number;
  /** Guarda el torneo en Supabase (publicado o borrador). `true` si se guardó; si no, avisa del error. */
  guardar: (estado: "abierto" | "borrador") => Promise<boolean>;
};

const CrearTorneoContext = createContext<Contexto | null>(null);

/**
 * Estado del asistente «Crear torneo». Vive en el layout de /org/crear, así
 * que se conserva al ir de un paso a otro. Todavía no se guarda en la base
 * de datos: al recargar la página se pierde.
 */
export function CrearTorneoProvider({
  nivel,
  children,
}: {
  nivel: number;
  children: React.ReactNode;
}) {
  const [borrador, setBorrador] = useState<Borrador>(BORRADOR_INICIAL);

  return (
    <CrearTorneoContext.Provider
      value={{
        borrador,
        nivel,
        actualizar: (cambios) => setBorrador((b) => ({ ...b, ...cambios })),
        guardar: async (estado) => {
          if (borrador.nombre.trim() === "") {
            toast.error("Escribe el nombre del torneo para guardarlo");
            return false;
          }
          const r = await guardarTorneoDelOrganizador(borrador, estado);
          if (!r.ok) toast.error("No se pudo guardar el torneo", { description: r.error });
          return r.ok;
        },
      }}
    >
      {children}
    </CrearTorneoContext.Provider>
  );
}

export function useCrearTorneo() {
  const ctx = useContext(CrearTorneoContext);
  if (!ctx) throw new Error("useCrearTorneo va dentro de CrearTorneoProvider");
  return ctx;
}
