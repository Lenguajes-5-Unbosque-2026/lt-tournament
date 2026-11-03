import Link from "next/link";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

/**
 * Encabezado de saludo (design/ui kit.md §5.17): avatar con anillo que abre
 * el perfil propio, nombre, una línea de contexto y la campana de
 * notificaciones (J22). Lo usan Inicio (jugador) y el Panel (organizador).
 */
export function ProfileHeader({
  titulo,
  subtitulo,
  imagen,
  color1,
  color2,
  perfilHref,
}: {
  titulo: string;
  subtitulo: React.ReactNode;
  imagen: string;
  color1: string;
  color2: string;
  perfilHref: string;
}) {
  return (
    <header className="flex min-h-touch items-center gap-3">
      <Link
        href={perfilHref}
        aria-label="Abrir mi perfil"
        className="rounded-full ring-2 ring-primary ring-offset-3 ring-offset-bg outline-none transition-transform duration-(--dur-fast) ease-out focus-visible:ring-4 active:scale-94"
      >
        <Avatar className="size-12">
          <AvatarImage src={`/mock/${imagen}`} alt="" />
          <AvatarFallback
            style={{ backgroundImage: `linear-gradient(140deg, ${color1}, ${color2})` }}
          />
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <p className="truncate text-h2 text-ink">{titulo}</p>
        <div className="truncate text-caption text-ink-3">{subtitulo}</div>
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
