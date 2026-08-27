import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell, Flame, Layers, Timer, Trophy } from "lucide-react";
import { ProgressCard } from "@/components/treino/ProgressCard";
import { Button } from "@/components/ui/button";
import { getWorkout } from "@/data/workouts";
import { useTreino } from "@/lib/treino-store";

export const Route = createFileRoute("/app/concluido")({
  head: () => ({
    meta: [
      { title: "Treino feito — TREINÔ" },
      {
        name: "description",
        content: "Resumo do treino concluído: séries, minutos, volume total e novos recordes.",
      },
      { property: "og:title", content: "Treino feito — TREINÔ" },
      { property: "og:description", content: "Mais um treino na conta. Continue assim." },
    ],
  }),
  component: Concluido,
});

function Concluido() {
  const { lastFinished } = useTreino();
  const workout = lastFinished ? getWorkout(lastFinished.workoutId) : null;
  const summary = lastFinished ?? {
    exercises: 8,
    sets: 24,
    minutes: 52,
    volume: 6480,
    record: null as { exercise: string; weight: number } | null,
  };

  return (
    <div className="relative space-y-7 py-4 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary/14 blur-3xl"
      />
      <div className="relative">
        <span className="gradient-lime animate-pop mx-auto grid size-20 place-items-center rounded-3xl text-primary-foreground">
          <Flame className="size-10" />
        </span>
        <h1 className="animate-rise-in mt-6 text-3xl font-extrabold sm:text-4xl">Treino feito. 🔥</h1>
        {workout && (
          <p className="animate-fade-in mt-2 text-sm font-semibold text-muted-foreground">
            {workout.name} — {workout.focus}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-left lg:grid-cols-4">
        <ProgressCard label="Exercícios" value={summary.exercises} icon={Dumbbell} />
        <ProgressCard label="Séries" value={summary.sets} icon={Layers} accent="cool" />
        <ProgressCard label="Minutos" value={summary.minutes} icon={Timer} accent="flame" />
        <ProgressCard
          label="Volume total"
          value={summary.volume}
          suffix="kg"
          icon={Dumbbell}
        />
      </div>

      {summary.record && (
        <div className="surface animate-rise-in flex items-center gap-3 p-4 text-left">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
            <Trophy className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-primary">NOVO RECORDE</p>
            <p className="truncate font-display text-base font-bold">
              {summary.record.exercise} · {summary.record.weight} kg
            </p>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">Mais um treino na conta. Continue assim.</p>

      <div className="space-y-2">
        <Button asChild size="lg" className="press w-full font-extrabold tracking-wide">
          <Link to="/app/evolucao">VER MINHA EVOLUÇÃO</Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="press w-full font-bold">
          <Link to="/app/inicio">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  );
}
