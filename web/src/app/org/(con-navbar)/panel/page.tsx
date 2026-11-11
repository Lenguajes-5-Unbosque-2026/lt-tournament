import { Suspense } from "react";
import { Trophy, Users, Zap } from "lucide-react";
import { CreateTournamentCard } from "@/components/create-tournament-card";
import { PanelTorneos } from "@/components/panel-torneos";
import { ProfileHeader } from "@/components/profile-header";
import { Stat } from "@/components/stat";
import { Badge } from "@/components/ui/badge";
import { AHORA } from "@/lib/ahora";
import {
  getResumenPanel,
  getTorneosDelOrganizador,
  tipoDeBracket,
} from "@/lib/mock";
import { organizadorPorId } from "@/lib/perfiles";
import { organizadorActualId } from "@/lib/sesion";

/** Panel del organizador (O01): cifras, acceso a crear y «Mis torneos». */
async function Panel() {
  // La sesión viene de una cookie: dato de la petición, por eso va en Suspense.
  const organizadorId = await organizadorActualId();
  const organizador = await organizadorPorId(organizadorId);
  const torneos = getTorneosDelOrganizador(organizadorId);
  // Los finalizados solo se cuentan; no aparecen en la lista (spec, estados del panel).
  const lista = torneos.filter((t) => t.estado !== "finalizado" && t.estado !== "cancelado");
  const resumen = getResumenPanel(torneos);

  return (
    <>
      <ProfileHeader
        titulo={organizador.alias}
        subtitulo={
          <Badge variant="accent" dot={false} className="mt-1 h-5 rounded-sm">
            Modo organizador · Nivel {organizador.nivel}
          </Badge>
        }
        imagen={organizador.imagen}
        color1={organizador.color1}
        color2={organizador.color2}
        perfilHref="/org/perfil"
      />

      <h1 className="mt-5 font-display text-display-l text-ink uppercase italic">
        Tu panel de torneos
      </h1>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Stat icon={Zap} value={String(resumen.enCurso)} label="En curso" tone="accent" />
        <Stat icon={Users} value={String(resumen.inscritos)} label="Inscritos" tone="info" />
        <Stat icon={Trophy} value={String(resumen.finalizados)} label="Finalizados" tone="success" />
      </div>

      <div className="mt-4">
        <CreateTournamentCard />
      </div>

      <PanelTorneos
        torneos={lista}
        // V5: el vacío es no tener ningún torneo, en cualquier estado.
        sinTorneos={torneos.length === 0}
        ahora={AHORA}
        conBracket={lista.filter((t) => tipoDeBracket(t.id)).map((t) => t.id)}
      />
    </>
  );
}

export default function PanelPage() {
  return (
    <Suspense>
      <Panel />
    </Suspense>
  );
}
