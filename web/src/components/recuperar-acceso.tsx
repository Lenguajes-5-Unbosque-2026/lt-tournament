"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Mail } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Render3D } from "@/components/render-3d";
import { TextField } from "@/components/text-field";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";

const ESPERA_REENVIO_S = 45;
const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 45 → «0:45» */
function minutosSegundos(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Recuperar acceso (J05): pide el correo y «envía» un enlace. Tras el envío
 * muestra «Enlace enviado» y un reenvío con cuenta atrás de 45 s. El enlace
 * todavía no se manda de verdad: llega con Supabase.
 */
export function RecuperarAcceso() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [espera, setEspera] = useState(0);

  const correoValido = FORMATO_CORREO.test(correo.trim());
  const errorCorreo =
    correo.trim() !== "" && !correoValido ? "Escribe un correo válido." : undefined;

  useEffect(() => {
    if (espera <= 0) return;
    const id = setTimeout(() => setEspera((e) => e - 1), 1000);
    return () => clearTimeout(id);
  }, [espera]);

  function enviar() {
    setEnviado(true);
    setEspera(ESPERA_REENVIO_S);
  }

  return (
    <AppShell mode="player" navbar={false}>
      <Topbar title="Recuperar acceso" fallbackHref="/ingresar" />

      <Render3D icon={Mail} className="mt-4" />

      <h2 className="mt-6 font-display text-display-l text-ink uppercase italic">
        Te enviamos un enlace
      </h2>
      <p className="mt-3 text-body text-ink-2">
        Escribe tu correo y te enviaremos un enlace para crear una nueva contraseña.
      </p>

      <div className="mt-5">
        <TextField
          label="Correo"
          icon={Mail}
          type="email"
          value={correo}
          onValueChange={setCorreo}
          maxLength={80}
          placeholder="johan@correo.com"
          autoComplete="email"
          ayuda=""
          error={errorCorreo}
        />
      </div>

      {enviado && (
        <Alert variant="success" className="mt-4">
          <Check aria-hidden />
          <AlertTitle>Enlace enviado</AlertTitle>
          <AlertDescription>
            Revisa tu bandeja de entrada. El enlace vence en 15 minutos.
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {enviado ? (
          <>
            <Link href="/ingresar" className={`${buttonVariants()} w-full`}>
              Volver a ingresar
            </Link>
            <Button variant="secondary" className="w-full" disabled={espera > 0} onClick={enviar}>
              {espera > 0 ? `Reenviar en ${minutosSegundos(espera)}` : "Reenviar enlace"}
            </Button>
          </>
        ) : (
          <>
            <Button className="w-full" disabled={!correoValido} onClick={enviar}>
              Enviar enlace
            </Button>
            <Link
              href="/ingresar"
              className={`${buttonVariants({ variant: "ghost" })} self-center`}
            >
              Volver a ingresar
            </Link>
          </>
        )}
      </div>
    </AppShell>
  );
}
