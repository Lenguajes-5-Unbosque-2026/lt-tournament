import Link from "next/link";
import { Crown, Star, Trophy, Users } from "lucide-react";
import { ModeSwitch } from "@/components/mode-switch";
import { PlayerAvatar } from "@/components/player-avatar";
import { Stat } from "@/components/stat";
import { TournamentCard } from "@/components/tournament-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AHORA } from "@/lib/ahora";
import type { PerfilOrganizador } from "@/lib/organizador";

/**
 * Perfil del organizador (O17): reputación (verificado, nivel, torneos,
 * jugadores y valoración), progreso al siguiente nivel y torneos organizados.
 * Los finalizados llevan a sus estadísticas (O16).
 */
export function PerfilOrganizadorView({
  perfil: p,
  conBracket,
}: {
  perfil: PerfilOrganizador;
  /** Ids de los torneos con pantalla de bracket. */
  conBracket: string[];
}) {
  const destino = (id: string, estado: string) =>
    estado === "finalizado"
      ? `/org/torneos/${id}/estadisticas`
      : conBracket.includes(id)
        ? `/org/torneos/${id}/bracket`
        : `/org/torneos/${id}`;

  return (
    <>
      <div className="flex flex-col items-center pt-2 text-center">
        <PlayerAvatar
          imagen={p.imagen}
          color1={p.color1}
          color2={p.color2}
          className="size-24 ring-2 ring-primary ring-offset-3 ring-offset-bg"
        />
        <h1 className="mt-3 font-display text-display-l text-ink uppercase italic">{p.alias}</h1>
        <div className="mt-3 flex items-center gap-2">
          {p.verificado && (
            <Badge variant="success" dot={false} className="rounded-sm">
              Verificado
            </Badge>
          )}
          <Badge variant="accent" dot={false} className="rounded-sm">
            Nivel {p.nivel}
          </Badge>
        </div>
      </div>

      <div className="mt-5">
        <ModeSwitch actual="organizador" />
        <p className="mt-3 text-center text-caption text-ink-3">
          Cambia a modo jugador en Ajustes para competir con la misma cuenta.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Stat icon={Trophy} value={String(p.torneos)} label="Torneos" tone="accent" />
        <Stat icon={Users} value={String(p.jugadores)} label="Jugadores" tone="info" />
        <Stat
          icon={Star}
          value={p.valoracion.toFixed(1).replace(".", ",")}
          label="Valoración"
          tone="warning"
        />
      </div>

      <section
        aria-label="Progreso de nivel"
        className="mt-4 rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
      >
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Crown className="size-7" strokeWidth={1.5} aria-hidden />
          </span>
          <div>
            <h2 className="text-strong text-ink">
              Nivel {p.nivel + 1} en {p.faltan} {p.faltan === 1 ? "torneo" : "torneos"}
            </h2>
            <p className="text-small text-ink-2">
              Desbloquea torneos de 64 cupos y destacados en Explorar.
            </p>
          </div>
        </div>
        <Progress value={p.progreso * 100} aria-label="Progreso al siguiente nivel" className="mt-4" />
      </section>

      <section aria-labelledby="organizados-titulo" className="mt-6">
        <div className="flex items-center justify-between">
          <h2 id="organizados-titulo" className="text-h1 text-ink">
            Torneos organizados
          </h2>
          <Link href="/org/torneos" className="text-label font-semibold text-primary">
            Ver todo
          </Link>
        </div>
        {p.organizados.length === 0 ? (
          <p className="mt-4 text-center text-small text-ink-3">Aún no has organizado torneos.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {p.organizados.map((t) => (
              <li key={t.id}>
                <TournamentCard
                  torneo={t}
                  ahora={AHORA}
                  href={destino(t.id, t.estado)}
                  etiqueta={t.estado === "finalizado" ? "finalizado" : undefined}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
