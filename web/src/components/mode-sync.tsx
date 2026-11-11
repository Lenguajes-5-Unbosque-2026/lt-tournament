"use client";

import { useEffect } from "react";

/**
 * Los diálogos y las hojas se pintan en un portal, fuera del contenedor con
 * `data-mode`. Para que también lleven el acento del organizador, el modo se
 * copia al <body> mientras la pantalla está abierta.
 */
export function ModeSync({ org }: { org: boolean }) {
  useEffect(() => {
    if (!org) return;
    document.body.dataset.mode = "org";
    return () => {
      delete document.body.dataset.mode;
    };
  }, [org]);

  return null;
}
