"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Medal, Share2, TriangleAlert } from "lucide-react";
import { CopyLinkField } from "@/components/copy-link-field";
import { useCrearTorneo } from "@/components/crear-torneo-provider";
import { Render3D } from "@/components/render-3d";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { cuposDelBorrador } from "@/lib/crear-config";
import { compartirEnlace } from "@/lib/compartir";
import { slugDeNombre } from "@/lib/slug";

/** Torneo publicado (O06): confirmación, enlace para compartir y accesos. */
export function CrearPublicado() {
  const router = useRouter();
  const { borrador: b } = useCrearTorneo();
  const nombre = b.nombre.trim();

  if (nombre === "") {
    return (
      <>
        <Topbar title="Publicado" leading="close" fallbackHref="/org/panel" />
        <Alert variant="warning" className="mt-6">
          <TriangleAlert aria-hidden />
          <AlertTitle>No hay un torneo para mostrar</AlertTitle>
          <AlertDescription>Crea uno desde tu panel.</AlertDescription>
        </Alert>
        <Link href="/org/panel" className={`${buttonVariants()} mt-4 w-full`}>
          Ir al panel
        </Link>
      </>
    );
  }

  const enlace = `lt.gg/${slugDeNombre(nombre)}`;

  return (
    <>
      <Topbar
        title="Publicado"
        leading="close"
        fallbackHref="/org/panel"
        onLeadingClick={() => router.push("/org/panel")}
      />

      <Render3D icon={Medal} className="mt-8" />

      <h2 className="mt-8 text-center font-display text-display-l text-ink uppercase italic">
        ¡Torneo publicado!
      </h2>
      <p className="mt-3 text-center text-body text-ink-2">
        «{nombre}» ya aparece en Explorar. Compártela para llenar los {cuposDelBorrador(b)} cupos.
      </p>

      <div className="mt-6">
        <CopyLinkField texto={enlace} url={`https://${enlace}`} />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Button className="w-full" onClick={() => compartirEnlace(nombre, `https://${enlace}`)}>
          <Share2 />
          Compartir enlace
        </Button>
        {/* Resumen del torneo (O07) pertenece al flujo de gestión; por ahora, la lista. */}
        <Link
          href="/org/torneos"
          className={`${buttonVariants({ variant: "secondary" })} w-full`}
        >
          Ir a gestionar
        </Link>
        <Link
          href="/explorar"
          className={`${buttonVariants({ variant: "ghost", size: "sm" })} self-center`}
        >
          <Eye />
          Ver como jugador
        </Link>
      </div>
    </>
  );
}
