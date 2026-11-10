"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Compositor del chat: botón «+», campo en píldora y enviar. Va fijo en la
 * parte baja (el dock) y deja de estar a la vista del teclado solo si el
 * navegador lo mueve.
 */
export function ChatComposer({ onSend }: { onSend: (texto: string) => void }) {
  const [texto, setTexto] = useState("");
  const vacio = texto.trim() === "";

  function enviar() {
    if (vacio) return;
    onSend(texto.trim());
    setTexto("");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        enviar();
      }}
      className="fixed inset-x-0 bottom-nav-bottom z-40 mx-auto w-full max-w-phone px-nav-x"
    >
      <div className="flex items-center gap-2 rounded-xl border border-line bg-surface/92 p-2 shadow-nav backdrop-blur-lg">
        <Button type="button" variant="glass" size="icon" aria-label="Adjuntar">
          <Plus />
        </Button>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={500}
          placeholder="Escribe un mensaje…"
          aria-label="Mensaje"
          className="min-w-0 flex-1 bg-transparent px-1 text-body text-ink outline-none placeholder:text-ink-3"
        />
        <Button type="submit" size="icon" aria-label="Enviar mensaje" disabled={vacio}>
          <Send />
        </Button>
      </div>
    </form>
  );
}
