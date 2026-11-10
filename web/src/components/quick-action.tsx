"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/**
 * Acción rápida (rejilla de tarjetas-botón, design/componentes.md #45): ficha
 * con ícono, título y detalle. Es un enlace si lleva `href` y un botón si lleva
 * `onClick`.
 */
export function QuickAction({
  icon: Icon,
  titulo,
  detalle,
  href,
  onClick,
}: {
  icon: LucideIcon;
  titulo: string;
  detalle: string;
  href?: string;
  onClick?: () => void;
}) {
  const clases =
    "flex flex-col items-start rounded-lg border border-line bg-surface p-4 text-left transition-transform duration-(--dur-fast) ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-98";
  const contenido = (
    <>
      <span className="flex size-10 items-center justify-center rounded-sm bg-primary-soft text-primary">
        <Icon className="size-icon-btn" aria-hidden />
      </span>
      <span className="mt-4 text-strong text-ink">{titulo}</span>
      <span className="text-caption text-ink-3">{detalle}</span>
    </>
  );

  return href ? (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={clases}>
      {contenido}
    </button>
  );
}
