import { ProfileHeader } from "@/components/profile-header";
import { formatPuntos } from "@/lib/format";
import type { Jugador } from "@/lib/types";

/** Saludo de Inicio (J06): «Hola, Johitan» y nivel y puntos. */
export function GreetingHeader({ jugador }: { jugador: Jugador }) {
  return (
    <ProfileHeader
      titulo={`Hola, ${jugador.nombreUsuario}`}
      subtitulo={`Nivel ${jugador.nivel} · ${formatPuntos(jugador.puntosRanking)} pts`}
      imagen={jugador.imagen}
      color1={jugador.color1}
      color2={jugador.color2}
      perfilHref="/perfil"
    />
  );
}
