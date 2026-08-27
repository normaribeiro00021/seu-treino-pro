import { Link } from "@tanstack/react-router";
import { Clock, Flame, ListChecks } from "lucide-react";
import type { Workout } from "@/data/workouts";
import { Button } from "@/components/ui/button";

export function WorkoutCard({
  workout,
  label = "TREINO DO DIA",
}: {
  workout: Workout;
  label?: string;
}) {
  return (
    <section className="animate-rise-in relative overflow-hidden rounded-3xl border border-primary/25 bg-card p-5 shadow-glow">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-primary/14 blur-3xl"
      />
      <p className="text-[0.68rem] font-bold tracking-[0.2em] text-primary">{label}</p>
      <h2 className="mt-2 text-3xl font-extrabold">{workout.name}</h2>
      <p className="mt-1 text-base font-semibold text-muted-foreground">{workout.focus}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5">
          <ListChecks className="size-4" /> {workout.exercises.length} exercícios
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5">
          <Clock className="size-4" /> ~{workout.estimatedMinutes} min
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5">
          <Flame className="size-4" /> {workout.level}
        </span>
      </div>

      <Button asChild size="lg" className="press mt-5 w-full text-sm font-extrabold tracking-wide">
        <Link to="/app/sessao/$workoutId" params={{ workoutId: workout.id }}>
          INICIAR TREINO
        </Link>
      </Button>
    </section>
  );
}
