import { PageHead } from "@/components/page-head";

/**
 * Estado de carga de Explorar (J07): el mismo esqueleto de la pantalla
 * (buscador, chips y tarjetas) en surface-2 con pulso, mientras llega la
 * consulta a Supabase.
 */
export function ExplorarCargando() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Cargando torneos…</span>
      <PageHead title="Explorar" />

      <div className="mt-4 h-13 animate-pulse rounded-md bg-surface-2" />

      <div className="mt-4 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-surface-2" />
        ))}
      </div>

      <div className="mt-4 h-4.5 w-24 animate-pulse rounded-sm bg-surface-2" />

      <ul className="mt-4 flex flex-col gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <li
            key={i}
            className="flex items-center gap-3.5 rounded-lg border border-line bg-surface p-3"
          >
            <div className="size-16 shrink-0 animate-pulse rounded-md bg-surface-2" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 animate-pulse rounded-sm bg-surface-2" />
              <div className="h-4 w-3/4 animate-pulse rounded-sm bg-surface-2" />
              <div className="h-3 w-1/2 animate-pulse rounded-sm bg-surface-2" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
