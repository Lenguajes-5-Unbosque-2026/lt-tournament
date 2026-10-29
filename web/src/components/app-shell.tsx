import { Navbar, type Mode } from "@/components/navbar";

/**
 * Contenedor raíz de la app. En celular ocupa toda la pantalla; en
 * desktop queda centrado con el ancho de un celular (max-w-phone).
 * `data-mode="org"` cambia el acento a azul en todo lo que contiene.
 */
export function AppShell({
  mode,
  children,
}: {
  mode: Mode;
  children: React.ReactNode;
}) {
  return (
    <div
      data-mode={mode === "org" ? "org" : undefined}
      className="relative mx-auto min-h-dvh w-full max-w-phone bg-bg sm:border-x sm:border-line"
    >
      <div aria-hidden className="glow pointer-events-none absolute inset-x-0 top-0 h-glow" />
      <main className="relative px-screen pt-6 pb-scroll-nav">{children}</main>
      <Navbar mode={mode} />
    </div>
  );
}
