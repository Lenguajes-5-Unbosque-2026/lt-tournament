"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { TextField } from "@/components/text-field";
import { Topbar } from "@/components/topbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { iniciarSesion } from "@/app/ingresar/actions";

/** Ingresar (J04): correo y contraseña; el acceso es solo con correo y contraseña. */
export function IngresarForm() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorCorreo, setErrorCorreo] = useState<string>();
  const [errorContrasena, setErrorContrasena] = useState<string>();
  const [enviando, iniciar] = useTransition();

  const completo = correo.trim() !== "" && contrasena !== "";

  function ingresar() {
    setErrorCorreo(undefined);
    setErrorContrasena(undefined);
    iniciar(async () => {
      const resultado = await iniciarSesion(correo, contrasena);
      if ("destino" in resultado) router.push(resultado.destino);
      else if (resultado.campo === "correo") setErrorCorreo(resultado.error);
      else setErrorContrasena(resultado.error);
    });
  }

  return (
    <AppShell mode="player" navbar={false}>
      <Topbar title="Ingresar" fallbackHref="/bienvenida" />

      <h2 className="mt-4 font-display text-display-l text-ink uppercase italic">
        Bienvenido de vuelta
      </h2>
      <p className="mt-3 text-body text-ink-2">Una sola cuenta para jugar y organizar.</p>

      <form
        className="mt-5 flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (completo) ingresar();
        }}
      >
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
        <TextField
          label="Contraseña"
          icon={Lock}
          type="password"
          value={contrasena}
          onValueChange={setContrasena}
          maxLength={72}
          autoComplete="current-password"
          ayuda=""
          error={errorContrasena}
        />

        <Link
          href="/recuperar"
          className={`${buttonVariants({ variant: "ghost", size: "xs" })} -mt-2 self-end px-0`}
        >
          ¿Olvidaste tu contraseña?
        </Link>

        <Button type="submit" className="w-full" disabled={!completo || enviando}>
          Ingresar
        </Button>
      </form>
    </AppShell>
  );
}
