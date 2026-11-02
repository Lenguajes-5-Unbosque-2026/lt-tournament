import Link from "next/link";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { formatPuntos } from "@/lib/format";
import type { Jugador } from "@/lib/types";

/**
 * Encabezado de saludo (design/ui kit.md §5.17): avatar con anillo que abre
 * el perfil propio, nombre, nivel y puntos, y la campana de notificaciones (J22).
 */
export function GreetingHeader({ jugador }: { jugador: Jugador }) {
  return (
    <header className="flex min-h-touch items-center gap-3">
      <Link
        href="/perfil"
        aria-label="Abrir mi perfil"
        className="rounded-full ring-2 ring-primary ring-offset-3 ring-offset-bg outline-none transition-transform duration-(--dur-fast) ease-out focus-visible:ring-4 active:scale-94"
      >
        <Avatar className="size-12">
          <AvatarImage src={`/mock/${jugador.imagen}`} alt="" />
          <AvatarFallback
            style={{
              backgroundImage: `linear-gradient(140deg, ${jugador.color1}, ${jugador.color2})`,
            }}
          />
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate text-h2 text-ink">Hola, {jugador.nombreUsuario}</p>
        <p className="truncate text-caption text-ink-3">
          Nivel {jugador.nivel} · {formatPuntos(jugador.puntosRanking)} pts
        </p>
      </div>
      <Link
        href="/notificaciones"
        aria-label="Notificaciones"
        className={buttonVariants({ variant: "glass", size: "icon" })}
      >
        <Bell />
      </Link>
    </header>
  );
}
