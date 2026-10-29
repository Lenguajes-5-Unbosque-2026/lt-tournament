"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  LayoutGrid,
  List,
  MessageCircle,
  Plus,
  Search,
  Ticket,
  Trophy,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Mode = "player" | "org";

type Tab = { href: string; label: string; icon: LucideIcon; fab?: boolean };

// Pestañas por modo (design/ui kit.md §5.21).
const TABS: Record<Mode, Tab[]> = {
  player: [
    { href: "/inicio", label: "Inicio", icon: House },
    { href: "/explorar", label: "Explorar", icon: Search },
    { href: "/mis-torneos", label: "Mis torneos", icon: Ticket },
    { href: "/rankings", label: "Rankings", icon: Trophy },
    { href: "/perfil", label: "Perfil", icon: User },
  ],
  org: [
    { href: "/org/panel", label: "Panel", icon: LayoutGrid },
    { href: "/org/torneos", label: "Torneos", icon: List },
    { href: "/org/crear", label: "Crear torneo", icon: Plus, fab: true },
    { href: "/org/chat", label: "Chat", icon: MessageCircle },
    { href: "/org/perfil", label: "Perfil", icon: User },
  ],
};

/** Barra de navegación flotante. En organizador lleva el FAB «+» al centro. */
export function Navbar({ mode }: { mode: Mode }) {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-nav-bottom z-40 mx-auto w-full max-w-phone px-nav-x">
      <nav
        aria-label="Navegación principal"
        className="flex h-navbar items-center justify-between rounded-xl border border-line bg-surface/92 p-2 shadow-nav backdrop-blur-lg"
      >
        {TABS[mode].map(({ href, label, icon: Icon, fab }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          if (fab) {
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className="flex size-12 items-center justify-center rounded-md bg-primary text-on-primary transition-transform duration-(--dur-fast) ease-out active:scale-98"
              >
                <Icon className="size-icon-nav" strokeWidth={2} />
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-14 flex-1 flex-col items-center justify-center gap-1 rounded-md text-ink-3 transition-colors duration-(--dur-fast) ease-out",
                active && "bg-primary-soft text-primary",
              )}
            >
              <Icon className="size-icon-nav" strokeWidth={2} />
              {/* text-nav va aquí y no en cn(): cn no conoce los tamaños del kit
                  y lo descarta al verlo junto a text-ink-3. */}
              <span className="truncate text-nav">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
