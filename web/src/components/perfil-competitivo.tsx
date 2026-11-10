import Link from "next/link";
import { Crown, Settings, Trophy, Zap } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { ShareButton } from "@/components/detail-actions";
import { GameArt } from "@/components/game-art";
import { ModeSwitch } from "@/components/mode-switch";
import { PlayerAvatar } from "@/components/player-avatar";
import { Stat } from "@/components/stat";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { PerfilCompetitivo } from "@/lib/types";

/**
 * Perfil competitivo (J18) y su estado vacío (V4): avatar, nombre, etiquetas,
 * segmento de modo, tres cifras y «Últimos torneos». Sin historial, solo esa
 * sección se reemplaza por el aviso «Tu historial está vacío».
 */
export function PerfilCompetitivoView({ perfil }: { perfil: PerfilCompetitivo }) {
  const { jugador } = perfil;
  const datos = [`@${jugador.nombreUsuario.toLowerCase()}`, perfil.ciudad, perfil.desde && `desde ${perfil.desde}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <div className="flex items-center justify-between">
        <ShareButton titulo={`Perfil de ${jugador.nombreUsuario}`} />
        <Link
          href="/ajustes"
          aria-label="Ajustes"
          className={buttonVariants({ variant: "glass", size: "icon" })}
        >
          <Settings />
        </Link>
      </div>

      <div className="flex flex-col items-center text-center">
        <PlayerAvatar
          imagen={jugador.imagen}
          color1={jugador.color1}
          color2={jugador.color2}
          className="size-24 ring-2 ring-primary ring-offset-3 ring-offset-bg"
        />
        <h1 className="mt-3 font-display text-display-l text-ink uppercase italic">
          {jugador.nombreUsuario}
        </h1>
        <p className="mt-1 text-caption text-ink-3">{datos}</p>
        <div className="mt-3 flex items-center gap-2">
          <Badge variant={perfil.juegoPrincipal ? "accent" : "warning"} dot={false} className="rounded-sm">
            {perfil.juegoPrincipal ?? "Sin juego principal"}
          </Badge>
          <Badge variant="accent" dot={false} className="rounded-sm">
            Nivel {jugador.nivel}
          </Badge>
        </div>
      </div>

      <div className="mt-5">
        <ModeSwitch actual="jugador" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Stat icon={Trophy} value={String(perfil.torneosJugados)} label="Torneos" tone="accent" />
        <Stat icon={Zap} value={String(perfil.victorias)} label="Victorias" tone="accent" />
        <Stat
          icon={Crown}
          value={perfil.mejorPuesto ? `${perfil.mejorPuesto}°` : "—"}
          label="Mejor puesto"
          tone="warning"
        />
      </div>

      <section aria-labelledby="ultimos-titulo" className="mt-6">
        <div className="flex items-center justify-between">
          <h2 id="ultimos-titulo" className="text-h1 text-ink">
            Últimos torneos
          </h2>
          <Link href="/historial" className="text-label font-semibold text-primary">
            Ver todo
          </Link>
        </div>

        {perfil.historial.length === 0 ? (
          <EmptyState
            icon={Trophy}
            titulo="Tu historial está vacío"
            texto="Cuando termines tu primer torneo verás aquí tus resultados, logros y puntos."
            cta={{ label: "Explorar torneos", href: "/explorar" }}
            className="mt-4"
          />
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {perfil.historial.slice(0, 3).map(({ torneo, puesto, puntos }) => (
              <li
                key={torneo.id}
                className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3"
              >
                <GameArt
                  src={torneo.imagen}
                  color1={torneo.juego.color1}
                  color2={torneo.juego.color2}
                  abreviatura={torneo.juego.abreviatura}
                  className="size-12"
                  sizes="48px"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-strong text-ink">{torneo.nombre}</p>
                  <p className="text-caption text-ink-3">{torneo.juego.nombre}</p>
                </div>
                <div className="text-right">
                  <p className="text-strong text-ink">{puesto}° puesto</p>
                  <p className="text-caption text-primary">+{puntos} pts</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
