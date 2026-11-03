import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Render 3D (trofeo, ticket, medalla…) con respaldo (.render3d): la imagen si
 * existe, y si no un cuadrado rotado con degradado del acento y un ícono.
 */
export function Render3D({
  src,
  icon: Icon,
  className,
}: {
  src?: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("relative mx-auto size-48", className)}>
      <div
        className="absolute inset-0 rounded-full bg-primary/30 blur-3xl"
      />
      {src ? (
        <Image src={src} alt="" fill sizes="192px" className="object-contain" />
      ) : (
        <div className="absolute inset-6 flex rotate-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-pressed shadow-nav">
          <Icon className="size-16 text-on-primary" strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}
