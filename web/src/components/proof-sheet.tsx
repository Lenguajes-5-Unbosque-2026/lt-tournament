"use client";

import Image from "next/image";
import { PlayerAvatar } from "@/components/player-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { rutaImagen, type JugadorBR } from "@/lib/battle-royale";

export type Prueba = {
  /** «Partida 2 · Victory Royale Cup» */
  subtitulo: string;
  imagen: string;
  /** «Victoria · Partida 2» */
  overline: string;
  /** «Sh4dow · 1° · 8 kills» */
  marcador: string;
  ganador: JugadorBR;
  /** «Subida por el organizador» */
  detalle: string;
};

/**
 * Visor de prueba del resultado (design/componentes.md #38): hoja inferior
 * con la imagen, el marcador encima, el ganador y la etiqueta CONFIRMADO.
 * Lo usa BR · J3 y sirve para J16b y PTS · J3.
 */
export function ProofSheet({
  prueba,
  onOpenChange,
}: {
  prueba: Prueba | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Drawer open={prueba !== null} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent className="mx-auto! w-full max-w-phone">
        {prueba && (
          <div className="overflow-y-auto px-screen pt-2.5 pb-8.5">
            <DrawerTitle className="mt-2 text-h1 text-ink normal-case not-italic">
              Prueba del resultado
            </DrawerTitle>
            <p className="text-small text-ink-3">{prueba.subtitulo}</p>

            <figure className="relative mt-4 aspect-video overflow-hidden rounded-lg border border-line bg-surface">
              <Image
                src={rutaImagen(prueba.imagen)}
                alt={`Prueba del resultado: ${prueba.marcador}`}
                fill
                sizes="(max-width: 390px) 100vw, 390px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-bg/90 to-transparent px-4 pt-10 pb-4 text-center">
                <p className="text-overline text-ink-2 uppercase">{prueba.overline}</p>
                <p className="font-display text-display-m text-ink uppercase italic">
                  {prueba.marcador}
                </p>
              </figcaption>
            </figure>

            <div className="mt-4 flex items-center gap-3">
              <PlayerAvatar
                imagen={prueba.ganador.imagen}
                color1={prueba.ganador.color1}
                color2={prueba.ganador.color2}
                className="size-9"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-strong text-ink">Ganador: {prueba.ganador.nombre}</p>
                <p className="text-caption text-ink-3">{prueba.detalle}</p>
              </div>
              <Badge variant="success">Confirmado</Badge>
            </div>

            <DrawerClose render={<Button variant="secondary" className="mt-5 w-full" />}>
              Cerrar
            </DrawerClose>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
