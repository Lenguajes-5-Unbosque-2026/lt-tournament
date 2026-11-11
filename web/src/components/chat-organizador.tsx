"use client";

import { useState } from "react";
import { Megaphone, Send, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ChatMessage } from "@/components/chat-message";
import { SwitchRow } from "@/components/switch-row";
import { Topbar } from "@/components/topbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { AHORA } from "@/lib/ahora";
import type { Chat, MensajeChat } from "@/lib/competir";

const MAX_ANUNCIO = 280;

/**
 * Chat · Anuncio (O14): el formulario «Anuncio para todos» del organizador
 * (mensaje de hasta 280 caracteres, fijarlo y avisar por notificación) y los
 * mensajes recientes del chat público. Lo publicado aparece en pantalla; se
 * guarda y se envía cuando se conecte Supabase.
 */
export function ChatOrganizador({
  chat,
  mencion,
}: {
  chat: Chat;
  /** Jugador al que se le escribe (desde O09): el mensaje arranca con «@nombre». */
  mencion?: string;
}) {
  const [texto, setTexto] = useState(mencion ? `@${mencion} ` : "");
  const [fijar, setFijar] = useState(true);
  const [push, setPush] = useState(true);
  const [mensajes, setMensajes] = useState<MensajeChat[]>(chat.mensajes);
  const vacio = texto.trim() === "";

  function publicar() {
    if (vacio) return;
    setMensajes((m) => [
      ...m,
      {
        id: `local_${m.length}`,
        autor: { ...chat.yo, esOrganizador: true },
        contenido: texto.trim(),
        creadoEn: AHORA,
        esPropio: true,
      },
    ]);
    toast.success("Anuncio publicado", {
      description: [fijar && "Quedó fijado en el chat", push && "Enviamos la notificación"]
        .filter(Boolean)
        .join(" · "),
    });
    setTexto("");
  }

  return (
    <>
      <Topbar
        title="Chat del torneo"
        subtitle={`${chat.torneoNombre.split(" ").slice(0, 2).join(" ")} · ${chat.inscritos} inscritos`}
        fallbackHref={`/org/torneos/${chat.torneoId}`}
        actions={
          <Link
            href={`/org/torneos/${chat.torneoId}/inscritos`}
            aria-label="Ver inscritos"
            className={buttonVariants({ variant: "glass", size: "icon" })}
          >
            <Users />
          </Link>
        }
      />

      <section
        aria-labelledby="anuncio-titulo"
        className="mt-4 rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-sm bg-primary-soft text-primary">
            <Megaphone className="size-icon-btn" aria-hidden />
          </span>
          <h2 id="anuncio-titulo" className="text-strong text-ink">
            Anuncio para todos
          </h2>
        </div>

        <label htmlFor="anuncio-mensaje" className="mt-4 block text-label text-ink-2">
          Mensaje
        </label>
        <textarea
          id="anuncio-mensaje"
          rows={2}
          value={texto}
          maxLength={MAX_ANUNCIO}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe el anuncio…"
          className="field-sizing-content mt-2 min-h-14 w-full resize-none rounded-md border border-line bg-surface px-4 py-3 text-body text-ink outline-none transition-colors duration-(--dur-fast) ease-out placeholder:text-ink-3 focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <p className="mt-2 text-caption text-ink-3">
          {texto.length}/{MAX_ANUNCIO}
        </p>

        <div className="mt-3 flex flex-col gap-3">
          <SwitchRow
            titulo="Fijar en el chat"
            descripcion="Queda arriba para todos los jugadores"
            checked={fijar}
            onCheckedChange={setFijar}
          />
          <SwitchRow
            titulo="Enviar notificación push"
            descripcion="Los jugadores reciben un aviso"
            checked={push}
            onCheckedChange={setPush}
          />
        </div>

        <Button className="mt-3 w-full" disabled={vacio} onClick={publicar}>
          <Send />
          Publicar anuncio
        </Button>
      </section>

      <section aria-labelledby="recientes-titulo" className="mt-6">
        <h2 id="recientes-titulo" className="text-h1 text-ink">
          Mensajes recientes
        </h2>
        <ul className="mt-4 flex flex-col gap-4 pb-4">
          {mensajes.length === 0 && (
            <li className="py-6 text-center text-small text-ink-3">Aún no hay mensajes.</li>
          )}
          {mensajes.slice(-4).map((m) => (
            <ChatMessage key={m.id} mensaje={m} />
          ))}
        </ul>
      </section>
    </>
  );
}
