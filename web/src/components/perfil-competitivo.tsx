import Link from "next/link";
import { Crown, Settings, Trophy, Zap } from "lucide-react";
import { AchievementCard } from "@/components/achievement-card";
import { EmptyState } from "@/components/empty-state";
import { ShareButton } from "@/components/detail-actions";
import { HistoryRow } from "@/components/history-row";
import { ModeSwitch } from "@/components/mode-switch";
import { PlayerAvatar } from "@/components/player-avatar";
import { Stat } from "@/components/stat";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { ItemHistorial, Logro } from "@/lib/progreso";
import type { PerfilCompetitivo } from "@/lib/types";

/**
 * Perfil competitivo (J18) y su estado vacío (V4): avatar, nombre, etiquetas,
 * segmento de modo, tres cifras, «Logros» y «Últimos torneos». Sin historial,
 * solo esa sección se reemplaza por el aviso «Tu historial está vacío».
 */
export function PerfilCompetitivoView({
  perfil,
  logros,
  ultimos,
}: {
  perfil: PerfilCompetitivo;
  logros: Logro[];
  /** Los torneos terminados más recientes. */
  ultimos: ItemHistorial[];
}) {
  const { jugador } = perfil;
  const datos = [
    `@${jugador.nombreUsuario.toLowerCase()}`,
    perfil.ciudad,
    perfil.desde && `desde ${perfil.desde}`,
  ]
    .filter(Boolean)
    .join(" · ");
  const etiquetaJuego = perfil.juegoPrincipal
    ? perfil.posicionJuego && perfil.posicionJuego <= 10
      ? `Top ${perfil.posicionJuego} · ${perfil.juegoPrincipal}`
      : perfil.juegoPrincipal
    : "Sin juego principal";

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
          <Badge
            variant="warning"
            dot={false}
            className="rounded-sm"
          >
            {etiquetaJuego}
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

      {logros.length > 0 && (
        <section aria-labelledby="logros-titulo" className="mt-6">
          <h2 id="logros-titulo" className="text-h1 text-ink">
            Logros
          </h2>
          <ul className="mt-4 grid grid-cols-3 gap-2.5">
            {logros.slice(0, 3).map((l) => (
              <AchievementCard key={l.id} logro={l} />
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="ultimos-titulo" className="mt-6">
        <div className="flex items-center justify-between">
          <h2 id="ultimos-titulo" className="text-h1 text-ink">
            Últimos torneos
          </h2>
          <Link href="/historial" className="text-label font-semibold text-primary">
            Ver todo
          </Link>
        </div>

        {ultimos.length === 0 ? (
          <EmptyState
            icon={Trophy}
            titulo="Tu historial está vacío"
            texto="Cuando termines tu primer torneo verás aquí tus resultados, logros y puntos."
            cta={{ label: "Explorar torneos", href: "/explorar" }}
            className="mt-4"
          />
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {ultimos.slice(0, 3).map((item) => (
              <HistoryRow key={item.torneoId} item={item} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
