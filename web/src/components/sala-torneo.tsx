"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ActionRow } from "@/components/action-row";
import { CheckinCard } from "@/components/checkin-card";
import { CheckList } from "@/components/check-list";
import { PlayerAvatar } from "@/components/player-avatar";
import { Topbar } from "@/components/topbar";
import { buttonVariants } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { AHORA } from "@/lib/ahora";
import { ventanaCheckin } from "@/lib/checkin";
import type { Sala } from "@/lib/competir";
import { formatHora } from "@/lib/format";

/**
 * Sala del torneo (J14): check-in con cuenta atrás, el primer partido, las
 * reglas rápidas y el acceso al chat. El check-in aún no se guarda (llega con
 * Supabase): se marca en pantalla.
 */
export function SalaTorneo({ sala }: { sala: Sala }) {
  const [checkinEn, setCheckinEn] = useState(sala.checkinEn);
  const [reglasAbiertas, setReglasAbiertas] = useState(false);
  const ventana = ventanaCheckin(sala.fechaInicio, sala.minutosAntes, AHORA);
  const chat = `/torneo/${sala.torneoId}/chat`;
  const { primerPartido: p } = sala;

  const reglasRapidas = [
    sala.minutosPorPartida ? `${sala.minutosPorPartida} min` : null,
    sala.reglas.some((r) => /captura/i.test(r)) ? "captura obligatoria" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Topbar
        title="Sala del torneo"
        subtitle={sala.torneoNombre}
        fallbackHref="/mis-torneos"
        actions={
          <Link
            href={chat}
            aria-label="Chat del torneo"
            className={buttonVariants({ variant: "glass", size: "icon" })}
          >
            <MessageCircle />
          </Link>
        }
      />

      <div className="mt-4">
        {sala.checkinObligatorio ? (
          <CheckinCard
            ventana={ventana}
            hecho={checkinEn}
            onCheckin={() => {
              setCheckinEn(AHORA);
              toast.success("Check-in hecho", { description: "Ya estás listo para tu partido." });
            }}
          />
        ) : (
          <p className="rounded-lg border border-line bg-surface p-4 text-small text-ink-2">
            Este torneo no pide check-in. Solo llega a tu partido a tiempo.
          </p>
        )}
      </div>

      <section aria-labelledby="primer-partido" className="mt-6">
        <h2 id="primer-partido" className="text-h1 text-ink">
          Tu primer partido
        </h2>
        {p ? (
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-line bg-surface p-4">
            {[p.yo, p.rival].map((j, i) => (
              <div
                key={j.id}
                className={`flex min-w-0 flex-col items-center text-center ${i === 1 ? "order-3" : "order-1"}`}
              >
                <PlayerAvatar
                  imagen={j.imagen}
                  color1={j.color1}
                  color2={j.color2}
                  className="size-16 ring-2 ring-primary ring-offset-2 ring-offset-surface"
                />
                <p className="mt-2 max-w-full truncate text-h3 text-ink">{j.nombre}</p>
                <p className="text-caption text-ink-3">Seed #{j.seed}</p>
              </div>
            ))}
            <div className="order-2 text-center">
              <p className="font-display text-display-l text-primary italic">VS</p>
              <p className="text-caption text-ink-3">
                {p.ronda} · {formatHora(p.fechaHora)}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-line bg-surface p-4 text-small text-ink-2">
            Tu rival aparece cuando el organizador publique el bracket.
          </p>
        )}
      </section>

      <div className="mt-4 flex flex-col gap-3">
        <ActionRow
          icon={ShieldCheck}
          tone="info"
          titulo="Reglas rápidas"
          detalle={reglasRapidas || "Mira las reglas del torneo"}
          onClick={() => setReglasAbiertas(true)}
        />
        <ActionRow
          icon={MessageCircle}
          titulo="Escribir al organizador"
          detalle="Responde en el chat del torneo"
          href={chat}
        />
      </div>

      <Drawer open={reglasAbiertas} onOpenChange={setReglasAbiertas} showSwipeHandle>
        <DrawerContent className="mx-auto! w-full max-w-phone">
          <div className="overflow-y-auto px-screen pt-2.5 pb-8.5">
            <DrawerTitle className="mt-2">Reglas del torneo</DrawerTitle>
            <div className="mt-4">
              {sala.reglas.length > 0 ? (
                <CheckList items={sala.reglas} />
              ) : (
                <p className="text-small text-ink-3">El organizador aún no publicó reglas.</p>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
