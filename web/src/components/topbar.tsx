"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Topbar (design/ui kit.md §4): volver o cerrar a la izquierda, título al
 * centro y acciones a la derecha. «Volver» regresa a la pantalla anterior
 * real; si se abrió la pantalla directo, va a `fallbackHref`. `onLeadingClick`
 * reemplaza ese comportamiento (por ejemplo, para confirmar antes de salir).
 */
export function Topbar({
  title,
  subtitle,
  leading = "back",
  fallbackHref,
  onLeadingClick,
  actions,
}: {
  title: string;
  subtitle?: string;
  leading?: "back" | "close";
  fallbackHref: string;
  onLeadingClick?: () => void;
  actions?: React.ReactNode;
}) {
  const router = useRouter();
  const Icon = leading === "back" ? ChevronLeft : X;

  function volver() {
    if (onLeadingClick) onLeadingClick();
    else if (window.history.length > 1) router.back();
    else router.push(fallbackHref);
  }

  return (
    <header className="grid min-h-touch grid-cols-[1fr_auto_1fr] items-center gap-2">
      <Button
        variant="glass"
        size="icon"
        aria-label={leading === "back" ? "Volver" : "Cerrar"}
        onClick={volver}
        className="justify-self-start"
      >
        <Icon />
      </Button>
      <div className="text-center">
        <h1 className="text-h2 text-ink">{title}</h1>
        {subtitle && <p className="text-caption text-ink-3">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 justify-self-end">{actions}</div>
    </header>
  );
}
