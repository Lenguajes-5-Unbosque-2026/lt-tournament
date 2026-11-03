import Image from "next/image";
import { cn } from "@/lib/utils";
import { srcImagen } from "@/lib/imagen";

/**
 * Arte de juego / portada (.art, design/ui kit.md §5.18): imagen si hay,
 * y si no un degradado con los dos colores del juego y su abreviatura.
 */
export function GameArt({
  src,
  color1,
  color2,
  abreviatura,
  className,
  rounded = "rounded-md",
  sizes = "64px",
}: {
  src?: string;
  color1: string;
  color2: string;
  abreviatura: string;
  className?: string;
  /** Clase de radio; la tarjeta usa md y la portada del detalle lg. */
  rounded?: string;
  sizes?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative shrink-0 overflow-hidden", rounded, className)}
      style={{ backgroundImage: `linear-gradient(140deg, ${color1}, ${color2})` }}
    >
      {src ? (
        <Image src={srcImagen(src)} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-display text-display-m text-ink/92 italic">
          {abreviatura}
        </span>
      )}
    </div>
  );
}
