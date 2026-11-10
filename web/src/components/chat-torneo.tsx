"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, MoreHorizontal } from "lucide-react";
import { ChatComposer } from "@/components/chat-composer";
import { ChatMessage } from "@/components/chat-message";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import type { Chat, MensajeChat } from "@/lib/competir";
import { formatDia } from "@/lib/format";

/** Título corto del chat: «Copa Relámpago Bogotá» → «Copa Relámpago». */
function tituloCorto(nombre: string) {
  return nombre.split(" ").slice(0, 2).join(" ");
}

/**
 * Chat del torneo (J15): anuncio fijado del organizador, mensajes por día y
 * el compositor. Un solo chat público por torneo. Lo que se escribe aparece
 * en pantalla; se guarda cuando se conecte Supabase.
 */
export function ChatTorneo({ chat }: { chat: Chat }) {
  const [mensajes, setMensajes] = useState<MensajeChat[]>(chat.mensajes);
  const fin = useRef<HTMLLIElement>(null);

  // Al abrir y al enviar, baja al último mensaje.
  useEffect(() => {
    fin.current?.scrollIntoView({ block: "end" });
  }, [mensajes.length]);

  function enviar(texto: string) {
    setMensajes((m) => [
      ...m,
      {
        id: `local_${m.length}`,
        autor: { ...chat.yo, esOrganizador: false },
        contenido: texto,
        creadoEn: AHORA,
        esPropio: true,
      },
    ]);
  }

  // Un separador cuando cambia el día: «Hoy» o «Jue 22 Oct».
  const dia = (iso: string) => formatDia(iso, AHORA);

  return (
    <>
      <div className="sticky top-0 z-30 -mx-screen -mt-6 bg-bg/90 px-screen pt-6 pb-2 backdrop-blur-lg">
        <Topbar
          title={tituloCorto(chat.torneoNombre)}
          subtitle={`${chat.inscritos} inscritos`}
          fallbackHref={`/torneo/${chat.torneoId}/sala`}
          actions={
            <Button variant="glass" size="icon" aria-label="Más opciones">
              <MoreHorizontal />
            </Button>
          }
        />
      </div>

      {chat.anuncio && (
        <section
          aria-label="Anuncio fijado"
          className="mt-4 flex items-start gap-3 rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-3.5"
        >
          <MapPin
            className="mt-0.5 size-icon-btn shrink-0 text-primary"
            aria-hidden
          />
          <div>
            <p className="text-strong text-ink">
              Fijado por {chat.anuncio.organizador}
            </p>
            <p className="text-small text-ink-2">{chat.anuncio.contenido}</p>
          </div>
        </section>
      )}

      <ul className="mt-4 flex flex-col gap-4 pb-28" aria-label="Mensajes">
        {mensajes.length === 0 && (
          <li className="py-10 text-center text-small text-ink-3">
            Aún no hay mensajes. Escribe el primero.
          </li>
        )}
        {mensajes.map((m, i) => (
          <div key={m.id} className="contents">
            {(i === 0 || dia(m.creadoEn) !== dia(mensajes[i - 1].creadoEn)) && (
              <li className="text-center text-caption text-ink-3">
                {dia(m.creadoEn)}
              </li>
            )}
            <ChatMessage mensaje={m} />
          </div>
        ))}
        <li ref={fin} aria-hidden />
      </ul>

      <ChatComposer onSend={enviar} />
    </>
  );
}
