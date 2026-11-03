import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { rutaImagen } from "@/lib/battle-royale";
import { cn } from "@/lib/utils";

/**
 * Avatar (.avatar, design/ui kit.md): el casco del jugador y, si no tiene
 * imagen, un degradado con sus dos colores. El tamaño va en `className`.
 */
export function PlayerAvatar({
  imagen,
  color1,
  color2,
  className,
}: {
  imagen: string;
  color1: string;
  color2: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("size-7", className)}>
      {imagen && <AvatarImage src={rutaImagen(imagen)} alt="" />}
      <AvatarFallback
        style={{ backgroundImage: `linear-gradient(140deg, ${color1}, ${color2})` }}
      />
    </Avatar>
  );
}
