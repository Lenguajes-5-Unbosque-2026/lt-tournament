"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gamepad2, Mail, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { OptionGroup } from "@/components/option-group";
import { useRegistro, type PerfilCuenta } from "@/components/registro-provider";
import { StepProgress } from "@/components/step-progress";
import { TextField } from "@/components/text-field";
import { Topbar } from "@/components/topbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const PERFILES = [
  {
    value: "jugador",
    titulo: "Jugador",
    descripcion: "Encuentra torneos, compite y sube de nivel en los rankings.",
  },
  {
    value: "organizador",
    titulo: "Organizador",
    descripcion: "Crea, gestiona y da seguimiento a tus torneos.",
  },
];

const FORMATO_ID = /^[\p{L}\p{N}_.-]{3,20}$/u;
const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errorDeId(id: string, ocupados: string[]) {
  if (id === "") return undefined;
  if (!FORMATO_ID.test(id)) return "Usa entre 3 y 20 letras, números, punto, guion o guion bajo.";
  if (ocupados.includes(id.toLowerCase())) return "Ese ID ya está en uso. Prueba con otro.";
  return undefined;
}

/**
 * Crear cuenta (J03, jugador y organizador): perfil, nombre, ID público,
 * Gmail y términos. El acento cambia con el perfil. El jugador sigue a
 * «Tus juegos» (J02); el organizador entra directo a su Panel (O01).
 */
export function RegistroForm({ idsOcupados }: { idsOcupados: string[] }) {
  const router = useRouter();
  const { datos, actualizar } = useRegistro();
  const esOrganizador = datos.perfil === "organizador";
  const pasos = esOrganizador ? 1 : 2;

  const errorId = errorDeId(datos.idPublico.trim(), idsOcupados);
  const errorCorreo =
    datos.correo.trim() !== "" && !FORMATO_CORREO.test(datos.correo.trim())
      ? "Escribe un correo válido, como nombre@gmail.com."
      : undefined;
  const completo =
    datos.nombre.trim() !== "" &&
    datos.idPublico.trim() !== "" &&
    !errorId &&
    datos.correo.trim() !== "" &&
    !errorCorreo &&
    datos.terminos;

  function crearCuenta() {
    router.push(esOrganizador ? "/org/panel" : "/registro/juegos");
  }

  return (
    <AppShell mode={esOrganizador ? "org" : "player"} navbar={false}>
      <Topbar
        title="Crear cuenta"
        subtitle={`Paso 1 de ${pasos}`}
        fallbackHref="/bienvenida"
      />
      <div className="mt-3">
        <StepProgress total={pasos} current={1} />
      </div>

      <h2 className="mt-4 font-display text-display-l text-ink uppercase italic">
        Crea tu cuenta
      </h2>

      <h3 className="mt-3 mb-3 text-overline text-ink-3 uppercase">Elige tu perfil</h3>
      <OptionGroup
        label="Perfil"
        value={datos.perfil}
        onValueChange={(perfil) => actualizar({ perfil: perfil as PerfilCuenta })}
        options={PERFILES}
      />

      <div className="mt-5 flex flex-col gap-4">
        <TextField
          label="Nombre"
          icon={User}
          value={datos.nombre}
          onValueChange={(nombre) => actualizar({ nombre })}
          maxLength={60}
          placeholder="Johan Torres"
          autoComplete="name"
          ayuda=""
        />
        <TextField
          label={esOrganizador ? "ID de organizador" : "ID de jugador"}
          icon={Gamepad2}
          value={datos.idPublico}
          onValueChange={(idPublico) => actualizar({ idPublico })}
          maxLength={20}
          placeholder={esOrganizador ? "JohitanCups" : "Johitan"}
          autoComplete="username"
          error={errorId}
          ayuda={
            esOrganizador
              ? "Así te verán los jugadores en tus torneos."
              : "Así te verán en brackets y rankings."
          }
        />
        <TextField
          label="Gmail"
          icon={Mail}
          type="email"
          value={datos.correo}
          onValueChange={(correo) => actualizar({ correo })}
          maxLength={80}
          placeholder="johitan@gmail.com"
          autoComplete="email"
          error={errorCorreo}
          ayuda="Con tu Gmail ingresas y recibes avisos de tus torneos."
        />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3.5">
        <Checkbox
          checked={datos.terminos}
          onCheckedChange={(terminos) => actualizar({ terminos })}
          className="mt-0.5"
        />
        <span className="text-body text-ink-2">
          Acepto los Términos y la Política de privacidad
        </span>
      </label>

      <div className="mt-5 flex flex-col gap-1">
        <Button className="w-full" disabled={!completo} onClick={crearCuenta}>
          Crear cuenta
        </Button>
        <Link
          href="/ingresar"
          className={`${buttonVariants({ variant: "ghost" })} self-center`}
        >
          Ya tengo cuenta
        </Link>
      </div>
    </AppShell>
  );
}
