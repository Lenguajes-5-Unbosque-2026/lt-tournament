"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, MoreHorizontal, Share2 } from "lucide-react";
import { toast } from "sonner";
import { ChipGroup } from "@/components/chip";
import { ExpelDialog } from "@/components/expel-dialog";
import { PlayerActionsSheet } from "@/components/player-actions-sheet";
import { PlayerAvatar } from "@/components/player-avatar";
import { SearchField } from "@/components/search-field";
import { StatusTag } from "@/components/status-tag";
import { Topbar } from "@/components/topbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import { compartirEnlace } from "@/lib/compartir";
import { formatHace } from "@/lib/format";
import type { EstadoInscrito, Inscrito, ListaInscritos } from "@/lib/gestion";

type Filtro = "todos" | EstadoInscrito;

/**
 * Gestionar · Inscritos (O08): búsqueda, chips por estado y la lista con el
 * botón «⋯» de cada jugador (O09). Las acciones se aplican en pantalla hasta
 * conectar Supabase: expulsar quita al jugador y mover a espera cambia su estado.
 */
export function GestionInscritos({ lista }: { lista: ListaInscritos }) {
  const [inscritos, setInscritos] = useState<Inscrito[]>(lista.inscritos);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [elegido, setElegido] = useState<Inscrito | null>(null);
  const [aExpulsar, setAExpulsar] = useState<Inscrito | null>(null);

  const cuenta = (e: EstadoInscrito) => inscritos.filter((i) => i.estado === e).length;
  const ocupados = cuenta("confirmada") + cuenta("pendiente");

  const visibles = inscritos.filter(
    (i) =>
      (filtro === "todos" || i.estado === filtro) &&
      i.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()),
  );

  const base = `/org/torneos/${lista.torneoId}`;

  function cambiar(id: string, cambios: Partial<Inscrito>) {
    setInscritos((l) => l.map((i) => (i.id === id ? { ...i, ...cambios } : i)));
  }

  return (
    <>
      <Topbar
        title="Inscritos"
        subtitle={`${ocupados} de ${lista.cupos} cupos`}
        fallbackHref={base}
        actions={
          <Button
            variant="glass"
            size="icon"
            aria-label="Compartir torneo"
            onClick={() => compartirEnlace(lista.torneoNombre, window.location.href)}
          >
            <Share2 />
          </Button>
        }
      />

      <div className="mt-4">
        <SearchField
          value={busqueda}
          onValueChange={setBusqueda}
          placeholder="Buscar jugador"
          onOpenFilters={() => {}}
          sinFiltros
        />
      </div>

      <ChipGroup
        label="Filtrar por estado"
        className="mt-4"
        options={[
          { value: "todos", label: `Todos ${inscritos.length}` },
          { value: "confirmada", label: `Confirm. ${cuenta("confirmada")}` },
          { value: "pendiente", label: `Pend. ${cuenta("pendiente")}` },
          { value: "espera", label: `Espera ${cuenta("espera")}` },
        ]}
        value={[filtro]}
        // Siempre hay un filtro activo: tocar el activo no hace nada.
        onValueChange={(v) => v[0] && setFiltro(v[0] as Filtro)}
      />

      <ul className="mt-4 flex flex-col gap-3">
        {visibles.map((j) => (
          <li
            key={j.id}
            className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3"
          >
            <PlayerAvatar
              imagen={j.imagen}
              color1={j.color1}
              color2={j.color2}
              className="size-11"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-strong text-ink">{j.nombre}</p>
              <p className="text-caption text-ink-3">{formatHace(j.inscritoEn, AHORA)}</p>
            </div>
            <StatusTag estado={j.estado} />
            <Button
              variant="secondary"
              size="icon"
              aria-label={`Acciones sobre ${j.nombre}`}
              onClick={() => setElegido(j)}
            >
              <MoreHorizontal />
            </Button>
          </li>
        ))}
      </ul>
      {visibles.length === 0 && (
        <p className="mt-8 text-center text-small text-ink-3">No hay jugadores con ese filtro.</p>
      )}

      <Link
        href={`${base}/chat`}
        className={`${buttonVariants({ variant: "secondary" })} mt-4 w-full`}
      >
        <Megaphone />
        Mensaje a todos
      </Link>

      <PlayerActionsSheet
        torneoId={lista.torneoId}
        jugador={elegido}
        onOpenChange={(abierto) => !abierto && setElegido(null)}
        onProfile={() => toast("El perfil de otros jugadores llega pronto")}
        onCheckin={() => {
          if (!elegido) return;
          cambiar(elegido.id, { checkin: true });
          toast.success(`Check-in de ${elegido.nombre} marcado`);
          setElegido(null);
        }}
        onWaitlist={() => {
          if (!elegido) return;
          cambiar(elegido.id, { estado: "espera", checkin: false });
          toast.success(`${elegido.nombre} pasó a la lista de espera`);
          setElegido(null);
        }}
        onExpel={() => {
          setAExpulsar(elegido);
          setElegido(null);
        }}
      />

      <ExpelDialog
        nombre={aExpulsar?.nombre ?? null}
        onCancel={() => setAExpulsar(null)}
        onConfirm={(motivo) => {
          if (!aExpulsar) return;
          setInscritos((l) => l.filter((i) => i.id !== aExpulsar.id));
          toast.success(`${aExpulsar.nombre} fue expulsado`, {
            description: motivo ? `Motivo: ${motivo}` : "Su cupo quedó libre.",
          });
          setAExpulsar(null);
        }}
      />
    </>
  );
}
