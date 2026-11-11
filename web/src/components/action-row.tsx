"use client";

import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TONOS = {
  accent: "bg-primary-soft text-primary",
  info: "bg-info-soft text-info",
  neutral: "bg-surface-3 text-ink-2",
} as const;

/**
 * Fila de acción (.listrow): ficha con ícono, título, detalle y flecha. Es un
 * enlace si lleva `href` y un botón si lleva `onClick`.
 */
export function ActionRow({
  icon: Icon,
  tone = "accent",
  titulo,
  detalle,
  href,
  onClick,
}: {
  icon: LucideIcon;
  tone?: keyof typeof TONOS;
  titulo: string;
  detalle: string;
  href?: string;
  onClick?: () => void;
}) {
  const clases =
    "flex w-full items-center gap-3 rounded-lg border border-line bg-surface p-3.5 text-left transition-transform duration-(--dur-fast) ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-99";
  const contenido = (
    <>
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-sm", TONOS[tone])}>
        <Icon className="size-icon-btn" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-strong text-ink">{titulo}</span>
        <span className="block text-caption text-ink-3">{detalle}</span>
      </span>
      <ChevronRight className="size-icon-btn shrink-0 text-ink-3" aria-hidden />
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
