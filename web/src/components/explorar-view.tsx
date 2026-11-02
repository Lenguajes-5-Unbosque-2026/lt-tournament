"use client";

import { useState } from "react";
import { ChevronDown, QrCode } from "lucide-react";
import { FiltersSheet } from "@/components/filters-sheet";
import { GameChips } from "@/components/game-chips";
import { PageHead } from "@/components/page-head";
import { SearchField } from "@/components/search-field";
import { TournamentCard } from "@/components/tournament-card";
import { Button } from "@/components/ui/button";
import {
  CIUDAD_JUGADOR,
  SIN_FILTROS,
  aplicarFiltros,
  coincideBusqueda,
  type Filtros,
} from "@/lib/torneo";
import type { Torneo } from "@/lib/types";

type Orden = "proximos" | "cupos";

const ORDENES: Record<Orden, { etiqueta: string; siguiente: Orden }> = {
  proximos: { etiqueta: "Más próximos", siguiente: "cupos" },
  cupos: { etiqueta: "Más cupos", siguiente: "proximos" },
};

/** Explorar (J07): búsqueda, chips de juego, orden, lista y la hoja de filtros (J08). */
export function ExplorarView({
  torneos,
  juegos,
  ahora,
}: {
  /** Ya vienen ordenados del más próximo al más lejano. */
  torneos: Torneo[];
  /** Chips de juego de J07 y opciones del filtro «Juego» de J08. */
  juegos: { id: string; nombre: string }[];
  ahora: string;
}) {
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState<Filtros>(SIN_FILTROS);
  const [orden, setOrden] = useState<Orden>("proximos");
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const filtrar = (f: Filtros) =>
    torneos.filter((t) => coincideBusqueda(t, busqueda) && aplicarFiltros(t, f, ahora));

  const resultado = filtrar(filtros);
  const lista =
    orden === "cupos"
      ? [...resultado].sort((a, b) => b.cupos - b.inscritos - (a.cupos - a.inscritos))
      : resultado;

  const hayFiltros = JSON.stringify(filtros) !== JSON.stringify(SIN_FILTROS);
  const lugar = filtros.cercaDeMi ? ` en ${CIUDAD_JUGADOR}` : "";

  return (
    <>
      <PageHead
        title="Explorar"
        action={
          <Button variant="glass" size="icon" aria-label="Escanear código QR">
            <QrCode />
          </Button>
        }
      />

      <div className="mt-4">
        <SearchField
          value={busqueda}
          onValueChange={setBusqueda}
          onOpenFilters={() => setFiltrosAbiertos(true)}
          activos={hayFiltros}
          placeholder="Busca torneos, juegos u organizadores"
        />
      </div>

      <GameChips
        juegos={juegos}
        selected={filtros.juegos}
        onChange={(juegos) => setFiltros((f) => ({ ...f, juegos }))}
        className="mt-4"
      />

      <div className="mt-4 flex items-center justify-between">
        <p className="text-small text-ink-3" aria-live="polite">
          {lista.length} {lista.length === 1 ? "torneo" : "torneos"}
          {lugar}
        </p>
        <Button
          variant="link"
          size="xs"
          className="gap-1 px-0"
          aria-label={`Orden: ${ORDENES[orden].etiqueta}. Cambiar orden`}
          onClick={() => setOrden(ORDENES[orden].siguiente)}
        >
          {ORDENES[orden].etiqueta}
          <ChevronDown />
        </Button>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {lista.map((t) => (
          <li key={t.id}>
            <TournamentCard torneo={t} ahora={ahora} />
          </li>
        ))}
      </ul>
      {lista.length === 0 && (
        <p className="mt-8 text-center text-small text-ink-3">
          No encontramos torneos con esos filtros.
        </p>
      )}

      <FiltersSheet
        open={filtrosAbiertos}
        onOpenChange={setFiltrosAbiertos}
        filtros={filtros}
        juegos={juegos}
        contar={(f) => filtrar(f).length}
        onApply={setFiltros}
      />
    </>
  );
}
