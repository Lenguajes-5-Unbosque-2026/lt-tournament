import { notFound } from "next/navigation";
import { ChatOrganizador } from "@/components/chat-organizador";

import { organizadorActualId } from "@/lib/sesion";
import { chatDelTorneo, torneoDetalle } from "@/lib/torneos-datos";

/**
 * Carga el chat de un torneo para su organizador (O14). Solo el dueño lo ve.
 * Lo usan `/org/chat` (el torneo activo) y `/org/torneos/[id]/chat`.
 */
export async function ChatOrganizadorCargado({
  torneoId,
  mencion,
}: {
  torneoId: string;
  mencion?: string;
}) {
  const yo = await organizadorActualId();
  if ((await torneoDetalle(torneoId))?.organizador.id !== yo) notFound();
  const chat = await chatDelTorneo(torneoId, yo);
  if (!chat) notFound();
  return <ChatOrganizador chat={chat} mencion={mencion} />;
}
