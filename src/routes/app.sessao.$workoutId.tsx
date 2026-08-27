import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, Check, ChevronRight, Info, Timer } from "lucide-react";
import { toast } from "sonner";
import { ExerciseThumb } from "@/components/treino/ExerciseThumb";
import { RestTimer } from "@/components/treino/RestTimer";
import { SetTracker } from "@/components/treino/SetTracker";
import { WorkoutProgress } from "@/components/treino/WorkoutProgress";
import { Button } from "@/components/ui/button";
import { getExerciseById } from "@/data/exercises";
import { getWorkout } from "@/data/workouts";
import { useTreino } from "@/lib/treino-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/sessao/$workoutId")({
  head: () => ({
    meta: [
      { title: "Treino em andamento — TREINÔ" },
      {
        name: "description",
        content: "Acompanhe seus exercícios, registre cargas e descanse no tempo certo.",
      },
      { property: "og:title", content: "Treino em andamento — TREINÔ" },
      { property: "og:description", content: "Faltam poucos exercícios. Bora?" },
    ],
  }),
  component: SessionPage,
});

function SessionPage() {
  const { workoutId } = Route.useParams();
  const navigate = useNavigate();
  const workout = getWorkout(workoutId);
  const { session, startSession, logSet, undoSet, finishSession } = useTreino();
  const [openExercise, setOpenExercise] = useState<string | null>(null);
  const [rest, setRest] = useState<number | null>(null);

  useEffect(() => {
    if (workout) startSession(workout.id);
  }, [workout, startSession]);

  const logs = session?.workoutId === workoutId ? session.logs : {};

  const completedIds = useMemo(() => {
    if (!workout) return new Set<string>();
    return new Set(
      workout.exercises
        .filter((we) => (logs[we.exerciseId]?.length ?? 0) >= we.sets)
        .map((we) => we.exerciseId),
    );
  }, [workout, logs]);

  if (!workout) {
    return (
      <div className="surface p-6 text-center">
        <p className="font-bold">Treino não encontrado.</p>
        <Button asChild variant="secondary" className="mt-4">
          <Link to="/app/treino">Voltar para minha semana</Link>
        </Button>
      </div>
    );
  }

  const currentIndex = workout.exercises.findIndex((we) => !completedIds.has(we.exerciseId));
  const done = completedIds.size;
  const total = workout.exercises.length;

  const finish = () => {
    const allLogs = Object.values(logs).flat();
    const volume = allLogs.reduce((sum, l) => sum + l.weight * l.reps, 0);
    const best = allLogs.reduce<{ exercise: string; weight: number } | null>((acc, log) => {
      if (!acc || log.weight > acc.weight) {
        const found = Object.entries(logs).find(([, sets]) => sets.includes(log));
        const ex = found ? getExerciseById(found[0]) : undefined;
        return { exercise: ex?.name ?? workout.focus, weight: log.weight };
      }
      return acc;
    }, null);

    finishSession({
      workoutId: workout.id,
      exercises: done || total,
      sets: allLogs.length,
      minutes: session ? Math.max(1, Math.round((Date.now() - session.startedAt) / 60000)) : 52,
      volume: Math.round(volume),
      record: best && best.weight > 0 ? best : null,
    });
    navigate({ to: "/app/concluido" });
  };

  const open = openExercise
    ? workout.exercises.find((we) => we.exerciseId === openExercise)
    : undefined;
  const openExerciseData = open ? getExerciseById(open.exerciseId) : undefined;

  if (open && openExerciseData) {
    const setLogs = logs[open.exerciseId] ?? [];
    return (
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => setOpenExercise(null)}
          className="press inline-flex items-center gap-2 text-sm font-bold text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Voltar ao treino
        </button>

        <header className="animate-rise-in">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{openExerciseData.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {open.sets} × {open.repsMin}–{open.repsMax} · descanso {open.restSeconds}s · carga
            anterior {open.previousWeight} kg
          </p>
        </header>

        <ExerciseThumb
          exercise={openExerciseData}
          className="h-44 w-full rounded-2xl border border-border sm:h-56"
          iconClassName="size-12"
        />

        <SetTracker
          totalSets={open.sets}
          repsTarget={`${open.repsMin}–${open.repsMax}`}
          previousWeight={open.previousWeight}
          logs={setLogs}
          onComplete={(set) => {
            logSet(open.exerciseId, set);
            toast.success(`Série salva: ${set.weight} kg × ${set.reps}`);
            if (setLogs.length + 1 < open.sets) setRest(open.restSeconds);
          }}
          onUndo={() => undoSet(open.exerciseId)}
        />

        <section className="surface p-4">
          <h2 className="flex items-center gap-2 font-display text-sm font-extrabold">
            <Info className="size-4 text-primary" /> EXECUÇÃO
          </h2>
          <ol className="mt-3 space-y-2.5">
            {openExerciseData.instructions.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-flame/30 bg-flame/8 p-4">
          <h2 className="flex items-center gap-2 font-display text-sm font-extrabold text-flame">
            <AlertTriangle className="size-4" /> ERROS COMUNS
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {openExerciseData.commonMistakes.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-flame">•</span> {m}
              </li>
            ))}
          </ul>
        </section>

        <Button
          variant="secondary"
          className="press w-full font-bold"
          onClick={() => setRest(open.restSeconds)}
        >
          <Timer className="size-4" /> Abrir timer de descanso
        </Button>

        {rest !== null && <RestTimer seconds={rest} onSkip={() => setRest(null)} />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/app/treino"
          className="press inline-flex items-center gap-2 text-sm font-bold text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Minha semana
        </Link>
        <button
          type="button"
          onClick={finish}
          className="press rounded-lg bg-secondary px-3 py-1.5 text-xs font-bold text-muted-foreground"
        >
          Finalizar treino
        </button>
      </div>

      <header className="animate-rise-in">
        <p className="text-[0.68rem] font-bold tracking-[0.2em] text-primary">EM ANDAMENTO</p>
        <h1 className="mt-1 text-3xl font-extrabold">{workout.name}</h1>
        <p className="mt-1 text-base font-semibold text-muted-foreground">{workout.focus}</p>
      </header>

      <div className="surface p-4">
        <WorkoutProgress current={done} total={total} label={`${done} de ${total} exercícios`} />
      </div>

      <ul className="space-y-3">
        {workout.exercises.map((we, index) => {
          const exercise = getExerciseById(we.exerciseId);
          if (!exercise) return null;
          const setLogs = logs[we.exerciseId] ?? [];
          const complete = completedIds.has(we.exerciseId);
          const isCurrent = index === currentIndex;

          return (
            <li key={we.id}>
              <button
                type="button"
                onClick={() => setOpenExercise(we.exerciseId)}
                className={cn(
                  "surface surface-hover animate-rise-in flex w-full items-center gap-3 p-3 text-left",
                  complete && "border-primary/30 bg-primary/6",
                  isCurrent && "border-primary/55 shadow-glow",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl text-sm font-extrabold",
                    complete && "gradient-lime text-primary-foreground",
                    isCurrent && !complete && "bg-primary/14 text-primary",
                    !complete && !isCurrent && "bg-secondary text-muted-foreground",
                  )}
                >
                  {complete ? <Check className="size-5" strokeWidth={3} /> : index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold">{exercise.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {we.sets} × {we.repsMin}–{we.repsMax} · descanso {we.restSeconds}s
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    Carga anterior: {we.previousWeight} kg
                    {setLogs.length > 0 && ` · ${setLogs.length}/${we.sets} séries feitas`}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </li>
          );
        })}
      </ul>

      <Button size="lg" className="press w-full font-extrabold tracking-wide" onClick={finish}>
        CONCLUIR TREINO
      </Button>
    </div>
  );
}
