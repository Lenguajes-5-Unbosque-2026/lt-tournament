"use client";

import { Copy, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copiarEnlace } from "@/lib/compartir";

/** Campo con botón copiar (enlace del torneo). */
export function CopyLinkField({ texto, url }: { texto: string; url: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-surface py-2 pr-2 pl-4">
      <LinkIcon className="size-icon-btn shrink-0 text-primary" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-strong text-ink">{texto}</span>
      <Button
        variant="secondary"
        size="icon"
        aria-label="Copiar enlace"
        onClick={() => copiarEnlace(url)}
      >
        <Copy />
      </Button>
    </div>
  );
}
