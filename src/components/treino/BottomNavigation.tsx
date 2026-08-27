import { Link, useRouterState } from "@tanstack/react-router";
import { Dumbbell, House, LineChart, ListOrdered, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { label: "Início", to: "/app/inicio", icon: House },
  { label: "Treino", to: "/app/treino", icon: Dumbbell },
  { label: "Exercícios", to: "/app/exercicios", icon: ListOrdered },
  { label: "Evolução", to: "/app/evolucao", icon: LineChart },
  { label: "Perfil", to: "/app/perfil", icon: User },
] as const;

export function BottomNavigation() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 pt-1.5 backdrop-blur-xl lg:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.to);
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                className={cn(
                  "press flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[0.65rem] font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-xl transition-colors",
                    active && "bg-primary/12",
                  )}
                >
                  <item.icon className="size-5" strokeWidth={active ? 2.4 : 1.9} />
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
