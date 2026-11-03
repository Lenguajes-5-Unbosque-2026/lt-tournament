import { Trophy, Users, Zap } from "lucide-react";
import { CreateTournamentCard } from "@/components/create-tournament-card";
import { PanelTorneos } from "@/components/panel-torneos";
import { ProfileHeader } from "@/components/profile-header";
import { Stat } from "@/components/stat";
import { Badge } from "@/components/ui/badge";
import { AHORA } from "@/lib/ahora";
import { getOrganizadorActual, getResumenPanel, getTorneosDelOrganizador } from "@/lib/mock";

/** Panel del organizador (O01): cifras, acceso a crear y «Mis torneos». */
export default function PanelPage() {
  const organizador = getOrganizadorActual();
  const torneos = getTorneosDelOrganizador();
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

      <PanelTorneos torneos={lista} ahora={AHORA} />
    </>
  );
}
