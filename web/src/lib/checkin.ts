/**
 * Check-in del torneo (J14). Cierra `minutosAntes` antes del inicio («Cierra
 * 6:30 pm» para un torneo de las 7:00 pm) y abre una hora antes de cerrar.
 * Cálculos puros, para servidor y cliente.
 */

/** Minutos que dura la ventana de check-in antes de cerrar (provisional: la spec no la define). */
export const VENTANA_CHECKIN_MIN = 60;

export type EstadoCheckin = "pronto" | "abierto" | "cerrado";

export type VentanaCheckin = {
  estado: EstadoCheckin;
  /** Instante en que abre y en que cierra (ISO). */
  abre: string;
  cierre: string;
  /** Segundos para que cierre (abierto) o para que abra (pronto); 0 si ya cerró. */
  faltanSegundos: number;
  /** Fracción de la ventana que queda, de 0 a 1 (para la barra). */
  restante: number;
};

export function ventanaCheckin(inicio: string, minutosAntes: number, ahora: string): VentanaCheckin {
  const cierreMs = new Date(inicio).getTime() - minutosAntes * 60_000;
  const abreMs = cierreMs - VENTANA_CHECKIN_MIN * 60_000;
  const ahoraMs = new Date(ahora).getTime();

  const estado: EstadoCheckin = ahoraMs >= cierreMs ? "cerrado" : ahoraMs >= abreMs ? "abierto" : "pronto";
  const faltanSegundos =
    estado === "abierto" ? (cierreMs - ahoraMs) / 1000 : estado === "pronto" ? (abreMs - ahoraMs) / 1000 : 0;

  return {
    estado,
    abre: new Date(abreMs).toISOString(),
    cierre: new Date(cierreMs).toISOString(),
    faltanSegundos,
    restante:
      estado === "abierto"
        ? Math.min(1, (cierreMs - ahoraMs) / (VENTANA_CHECKIN_MIN * 60_000))
        : estado === "pronto"
          ? 1
          : 0,
  };
}
