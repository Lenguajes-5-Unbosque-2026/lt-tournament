"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";

/**
 * Perdiste por W.O. (W3): diálogo sobre el bracket (J16). Quedas fuera del
 * torneo, pero sumas tu participación. «Entendido» deja ver el bracket;
 * «Ver otros torneos» lleva a Explorar (J07).
 */
export function WoPerdedor({
  torneoId,
  ronda,
  fondo,
}: {
  torneoId: string;
  /** «Octavos» */
  ronda: string;
  /** El bracket del jugador, que queda detrás del diálogo. */
  fondo: React.ReactNode;
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(true);
  const bracket = `/torneo/${torneoId}/bracket`;

  return (
    <>
      {fondo}
      <AlertDialog open={abierto} onOpenChange={setAbierto}>
        <AlertDialogContent>
          <span className="mx-auto flex size-13 items-center justify-center rounded-md bg-danger-soft text-danger">
            <TriangleAlert className="size-icon-nav" aria-hidden />
          </span>
          <AlertDialogTitle className="mt-4">Perdiste por W.O.</AlertDialogTitle>
          <AlertDialogDescription>
            No hiciste check-in a tiempo en {ronda}. Quedas fuera de este torneo, pero sumas tu
            participación.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Link href="/explorar" className={`${buttonVariants()} w-full`}>
              Ver otros torneos
            </Link>
            <Button
              variant="secondary"
              onClick={() => {
                setAbierto(false);
                router.push(bracket);
              }}
            >
              Entendido
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
