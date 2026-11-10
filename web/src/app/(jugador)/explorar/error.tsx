"use client"; // Los error boundaries tienen que ser Client Components.

import { useEffect } from "react";
import { CircleAlert, RotateCw } from "lucide-react";
import { PageHead } from "@/components/page-head";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

/** Estado de error de Explorar (J07): aviso danger y «Reintentar» vuelve a pedir los torneos. */
export default function ExplorarError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHead title="Explorar" />
      <Alert variant="danger" className="mt-4">
        <CircleAlert />
        <AlertTitle>No pudimos cargar los torneos</AlertTitle>
        <AlertDescription>Revisa tu conexión e inténtalo de nuevo.</AlertDescription>
      </Alert>
      <Button variant="secondary" className="mt-4 w-full" onClick={() => retry()}>
        <RotateCw />
        Reintentar
      </Button>
    </>
  );
}
