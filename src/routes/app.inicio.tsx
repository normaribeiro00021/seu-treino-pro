import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ChevronRight, Clock, Dumbbell, Flame } from "lucide-react";
import { ProgressCard } from "@/components/treino/ProgressCard";
import { WorkoutCard } from "@/components/treino/WorkoutCard";
import { WorkoutProgress } from "@/components/treino/WorkoutProgress";
import { Wordmark } from "@/components/treino/Logo";
import { getWorkout, lastSession, weekSummary } from "@/data/workouts";
import { greeting } from "@/lib/format";
import { useTreino } from "@/lib/treino-store";

export const Route = createFileRoute("/app/inicio")({
  head: () => ({
    meta: [
      { title: "Início — TREINÔ" },
      {
        name: "description",
        content: "Seu treino do dia, resumo da semana e o último treino realizado no TREINÔ.",
      },
      { property: "og:title", content: "Início — TREINÔ" },
      { property: "og:description", content: "Bora treinar hoje? Seu treino está te esperando." },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const { profile } = useTreino();
  const today = getWorkout("w-b");
  const last = getWorkout(lastSession.workoutId);

  return (
    <div className="space-y-7">
      <header className="animate-rise-in grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-muted-foreground">
            {greeting()}, {profile.name} 👋
          </p>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">Bora treinar hoje?</h1>
        </div>
        <div className="text-xl lg:hidden">
          <Wordmark />
        </div>
      </header>

      {today && <WorkoutCard workout={today} />}

      <section className="surface animate-rise-in p-4">
        <WorkoutProgress
          current={weekSummary.workoutsDone}
          total={weekSummary.workoutsTarget}
          label={`${weekSummary.workoutsDone} de ${weekSummary.workoutsTarget} treinos concluídos esta semana`}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">
          RESUMO DA SEMANA
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ProgressCard
            label="Treinos realizados"
            value={weekSummary.workoutsDone}
            icon={CalendarCheck}
          />
          <ProgressCard
            label="Minutos treinados"
            value={weekSummary.minutes}
            icon={Clock}
            accent="cool"
          />
          <ProgressCard
            label="Volume total"
            value={weekSummary.volumeKg / 1000}
            suffix="t"
            decimals={1}
            icon={Dumbbell}
          />
          <ProgressCard
            label="Sequência de dias"
            value={weekSummary.streakDays}
            icon={Flame}
            accent="flame"
          />
        </div>
      </section>

      {last && (
        <section className="space-y-3">
          <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">
            CONTINUE DE ONDE PAROU
          </h2>
          <Link
            to="/app/sessao/$workoutId"
            params={{ workoutId: last.id }}
            className="surface surface-hover animate-rise-in flex items-center gap-3 p-4"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
              <Dumbbell className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold">
                {last.name} — {last.focus}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Último treino: {lastSession.date}
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-primary">
              Ver treino <ChevronRight className="size-4" />
            </span>
          </Link>
        </section>
      )}
    </div>
  );
}
