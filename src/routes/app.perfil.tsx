import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Check,
  ChevronRight,
  Crown,
  Dumbbell,
  LogOut,
  Moon,
  Ruler,
  Target,
  Timer,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/treino/PageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { weekSummary } from "@/data/workouts";
import { useTreino } from "@/lib/treino-store";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — TREINÔ" },
      {
        name: "description",
        content: "Seus dados de treino, plano TREINÔ PRO, preferências do app e sair da conta.",
      },
      { property: "og:title", content: "Perfil — TREINÔ" },
      { property: "og:description", content: "Ajuste seu objetivo, preferências e plano." },
    ],
  }),
  component: Perfil,
});

const PRO_BENEFITS = [
  "Programas completos e ilimitados",
  "Histórico de cargas sem limite",
  "Gráficos avançados de evolução",
  "Treinos exportáveis em PDF",
];

function Perfil() {
  const { profile, favorites } = useTreino();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [autoRest, setAutoRest] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const infos = [
    { icon: Target, label: "Objetivo", value: profile.goal },
    { icon: Dumbbell, label: "Local", value: profile.location },
    { icon: Timer, label: "Duração", value: profile.duration },
    { icon: Ruler, label: "Nível", value: profile.level },
  ];

  const handleLogout = () => {
    toast.success("Você saiu da sua conta.");
    navigate({ to: "/auth" });
  };

  return (
    <div className="space-y-7">
      <PageHeader eyebrow="SUA CONTA" title="Perfil" />

      <section className="surface animate-rise-in flex items-center gap-4 p-5">
        <span className="font-display grid size-16 shrink-0 place-items-center rounded-2xl bg-primary/12 text-xl font-extrabold text-primary">
          {initials || <User className="size-6" />}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xl font-extrabold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            {profile.daysPerWeek} treinos por semana · {favorites.length} favoritos
          </p>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <div className="surface animate-rise-in p-4 text-center">
          <p className="font-display text-2xl font-extrabold tabular-nums">
            {weekSummary.workoutsDone}
          </p>
          <p className="mt-0.5 text-[0.68rem] font-semibold text-muted-foreground">Treinos</p>
        </div>
        <div className="surface animate-rise-in p-4 text-center">
          <p className="font-display text-2xl font-extrabold tabular-nums">{weekSummary.minutes}</p>
          <p className="mt-0.5 text-[0.68rem] font-semibold text-muted-foreground">Minutos</p>
        </div>
        <div className="surface animate-rise-in p-4 text-center">
          <p className="font-display text-2xl font-extrabold tabular-nums">
            {weekSummary.streakDays}
          </p>
          <p className="mt-0.5 text-[0.68rem] font-semibold text-muted-foreground">Sequência</p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">
          SEU TREINO
        </h2>
        <div className="surface animate-rise-in divide-y divide-border">
          {infos.map((i) => (
            <button
              key={i.label}
              onClick={() => navigate({ to: "/onboarding" })}
              className="press flex w-full items-center gap-3 p-4 text-left"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
                <i.icon className="size-4.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-muted-foreground">{i.label}</span>
                <span className="block truncate text-sm font-semibold">{i.value ?? "—"}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <section className="surface animate-rise-in overflow-hidden">
        <div className="bg-gradient-to-br from-primary/30 via-primary/8 to-transparent p-5">
          <span className="inline-flex items-center gap-2 rounded-lg bg-primary/15 px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.16em] text-primary">
            <Crown className="size-3.5" /> TREINÔ PRO
          </span>
          <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight">
            Treine sem limites
          </h2>
          <ul className="mt-4 space-y-2">
            {PRO_BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-4 shrink-0 text-primary" /> {b}
              </li>
            ))}
          </ul>
          <Button
            className="press mt-5 w-full font-bold"
            onClick={() => toast("Assinatura em breve!", { description: "R$ 19,90/mês" })}
          >
            Assinar por R$ 19,90/mês
          </Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">
          CONFIGURAÇÕES
        </h2>
        <div className="surface animate-rise-in divide-y divide-border">
          {[
            {
              icon: Bell,
              label: "Lembretes de treino",
              checked: notifications,
              onChange: setNotifications,
            },
            {
              icon: Timer,
              label: "Iniciar descanso automático",
              checked: autoRest,
              onChange: setAutoRest,
            },
            { icon: Moon, label: "Tema escuro", checked: darkMode, onChange: setDarkMode },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 p-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
                <row.icon className="size-4.5" />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold">{row.label}</span>
              <Switch checked={row.checked} onCheckedChange={row.onChange} />
            </div>
          ))}
        </div>
      </section>

      <Button
        variant="secondary"
        className="press w-full font-bold text-flame"
        onClick={handleLogout}
      >
        <LogOut className="size-4" /> Sair da conta
      </Button>
    </div>
  );
}
