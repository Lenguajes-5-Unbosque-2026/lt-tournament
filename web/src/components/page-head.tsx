/**
 * Encabezado de pestaña raíz (pagehead): título display a la izquierda
 * y una acción opcional a la derecha. Lo usan las pantallas sin botón
 * de volver (Inicio, Explorar, Mis torneos, Rankings, Perfil, Panel…).
 */
export function PageHead({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex min-h-touch items-center justify-between gap-3">
      <h1 className="font-display text-display-xl text-ink uppercase italic">
        {title}
      </h1>
      {action}
    </header>
  );
}
