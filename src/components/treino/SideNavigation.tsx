import { Link, useRouterState } from "@tanstack/react-router";
import { Layers, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./BottomNavigation";
import { Wordmark } from "./Logo";

const EXTRA_ITEMS = [
  { label: "Programas", to: "/app/programas", icon: Layers },
  { label: "Medidas", to: "/app/medidas", icon: Ruler },
] as const;

export function SideNavigation() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const renderItem = (item: { label: string; to: string; icon: typeof Layers }) => {
    const active = pathname.startsWith(item.to);
    return (
      <li key={item.to}>
        <Link
          to={item.to}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
            active
              ? "bg-primary/12 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
          )}
        >
          <item.icon className="size-5 shrink-0" strokeWidth={active ? 2.4 : 1.9} />
          <span className="truncate">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar px-4 py-6 lg:flex">
      <Link to="/app/inicio" className="px-2 text-2xl">
        <Wordmark />
      </Link>
      <ul className="mt-8 space-y-1">{NAV_ITEMS.map(renderItem)}</ul>
      <div className="mt-6 px-3 text-[0.65rem] font-bold tracking-[0.18em] text-muted-foreground">
        MAIS
      </div>
      <ul className="mt-2 space-y-1">{EXTRA_ITEMS.map(renderItem)}</ul>
      <div className="mt-auto surface p-4">
        <p className="text-xs font-semibold text-primary">TREINÔ PRO</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Programas completos e acompanhamento de carga sem limite.
        </p>
      </div>
    </aside>
  );
}
