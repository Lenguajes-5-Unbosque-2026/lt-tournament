import { ModeSync } from "@/components/mode-sync";
import { Navbar, type Mode } from "@/components/navbar";
import { cn } from "@/lib/utils";

/**
 * Contenedor raíz de la app. En celular ocupa toda la pantalla; en
 * desktop queda centrado con el ancho de un celular (max-w-phone).
 * `data-mode="org"` cambia el acento a azul en todo lo que contiene.
 */
export function AppShell({
  mode,
  navbar = true,
  children,
}: {
  mode: Mode;
  /** false en pantallas de detalle y flujos que llevan topbar y no navbar. */
  navbar?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-mode={mode === "org" ? "org" : undefined}
      className="relative mx-auto min-h-dvh w-full max-w-phone bg-bg sm:border-x sm:border-line"
    >
      <ModeSync org={mode === "org"} />
      <div aria-hidden className="glow pointer-events-none absolute inset-x-0 top-0 h-glow" />
      <main className={cn("relative px-screen pt-6", navbar ? "pb-scroll-nav" : "pb-8")}>
        {children}
      </main>
      {navbar && <Navbar mode={mode} />}
    </div>
  );
}
