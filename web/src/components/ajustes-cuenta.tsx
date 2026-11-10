"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftRight, Lock, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { ActionRow } from "@/components/action-row";
import { ModeCards } from "@/components/mode-cards";
import { SwitchRow } from "@/components/switch-row";
import { Topbar } from "@/components/topbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cerrarSesion } from "@/app/ajustes/actions";

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-3 text-overline text-ink-3 uppercase">{titulo}</h2>
      {children}
    </section>
  );
}

/**
 * Ajustes y cuenta (J23): modo de la app, avisos y cuenta. Elegir «Organizador»
 * pasa a su Panel; las preferencias de avisos se guardan al conectar Supabase.
 */
export function AjustesCuenta() {
  const router = useRouter();
  const [avisos, setAvisos] = useState({ partidos: true, chat: true, recomendados: false });
  const [saliendo, salir] = useTransition();

  function proximamente() {
    toast("Esta pantalla llega pronto");
  }

  return (
    <>
      <Topbar title="Ajustes y cuenta" fallbackHref="/perfil" />

      <Seccion titulo="Modo de la app">
        <ModeCards
          value="jugador"
          onValueChange={(modo) => {
            if (modo === "organizador") router.push("/org/panel");
          }}
        />
      </Seccion>

      <Alert variant="info" className="mt-4">
        <ArrowLeftRight aria-hidden />
        <AlertTitle>Una sola cuenta</AlertTitle>
        <AlertDescription>
          Cambia entre jugador y organizador cuando quieras; tu historial se conserva.
        </AlertDescription>
      </Alert>

      <Seccion titulo="Notificaciones">
        <div className="flex flex-col gap-3">
          <SwitchRow
            titulo="Check-in y partidos"
            descripcion="Avisos 1 h y 15 min antes"
            checked={avisos.partidos}
            onCheckedChange={(partidos) => setAvisos((a) => ({ ...a, partidos }))}
          />
          <SwitchRow
            titulo="Mensajes del chat"
            descripcion="Solo menciones y anuncios"
            checked={avisos.chat}
            onCheckedChange={(chat) => setAvisos((a) => ({ ...a, chat }))}
          />
          <SwitchRow
            titulo="Torneos recomendados"
            descripcion="Máximo 2 por semana"
            checked={avisos.recomendados}
            onCheckedChange={(recomendados) => setAvisos((a) => ({ ...a, recomendados }))}
          />
        </div>
      </Seccion>

      <Seccion titulo="Cuenta">
        <div className="flex flex-col gap-3">
          <ActionRow icon={User} tone="neutral" titulo="Editar perfil" detalle="Tu ID, tu foto y tu juego principal" onClick={proximamente} />
          <ActionRow icon={Lock} tone="neutral" titulo="Privacidad y seguridad" detalle="Contraseña y quién te ve" onClick={proximamente} />
        </div>
      </Seccion>

      <Button
        variant="secondary"
        className="mt-4 w-full"
        disabled={saliendo}
        onClick={() =>
          salir(async () => {
            await cerrarSesion();
            router.push("/bienvenida");
          })
        }
      >
        <LogOut />
        Cerrar sesión
      </Button>
    </>
  );
}
