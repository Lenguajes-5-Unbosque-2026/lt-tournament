import { notFound } from "next/navigation";
import { ChatOrganizador } from "@/components/chat-organizador";
import { getTorneoDetalle } from "@/lib/mock";
import { getChat } from "@/lib/mock-competir";
import { organizadorActualId } from "@/lib/sesion";

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
  if (getTorneoDetalle(torneoId)?.organizador.id !== yo) notFound();
  const chat = getChat(torneoId, yo);
  if (!chat) notFound();
  return <ChatOrganizador chat={chat} mencion={mencion} />;
}
