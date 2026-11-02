"use client";

import { createContext, useContext, useState } from "react";

export type PerfilCuenta = "jugador" | "organizador";

export type DatosRegistro = {
  perfil: PerfilCuenta;
  nombre: string;
  /** ID público de jugador u organizador. */
  idPublico: string;
  correo: string;
  contrasena: string;
  terminos: boolean;
  juegos: string[];
};

const INICIAL: DatosRegistro = {
  perfil: "jugador",
  nombre: "",
  idPublico: "",
  correo: "",
  contrasena: "",
  terminos: false,
  juegos: [],
};

type Contexto = {
  datos: DatosRegistro;
  actualizar: (cambios: Partial<DatosRegistro>) => void;
};

const RegistroContext = createContext<Contexto | null>(null);

/**
 * Estado del registro (J03 y J02). Vive en el layout de /registro, así que se
 * conserva entre los dos pasos. Todavía no crea la cuenta en Supabase.
 */
export function RegistroProvider({ children }: { children: React.ReactNode }) {
  const [datos, setDatos] = useState<DatosRegistro>(INICIAL);

  return (
    <RegistroContext.Provider
      value={{ datos, actualizar: (cambios) => setDatos((d) => ({ ...d, ...cambios })) }}
    >
      {children}
    </RegistroContext.Provider>
  );
}

export function useRegistro() {
  const ctx = useContext(RegistroContext);
  if (!ctx) throw new Error("useRegistro va dentro de RegistroProvider");
  return ctx;
}
