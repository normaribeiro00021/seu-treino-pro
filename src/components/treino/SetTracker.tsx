import { useState } from "react";
import { Check, Minus, Plus, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SetLog } from "@/lib/treino-store";
import { cn } from "@/lib/utils";

export function SetTracker({
  totalSets,
  repsTarget,
  previousWeight,
  logs,
  onComplete,
  onUndo,
}: {
  totalSets: number;
  repsTarget: string;
  previousWeight: number;
  logs: SetLog[];
  onComplete: (set: SetLog) => void;
  onUndo: () => void;
}) {
  const done = logs.length;
  const currentSet = Math.min(done + 1, totalSets);
  const [weight, setWeight] = useState(previousWeight);
  const [reps, setReps] = useState(12);
  const finished = done >= totalSets;

  return (
    <section className="surface p-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-bold tracking-[0.18em] text-primary">
            REGISTRO DA SÉRIE
          </p>
          <h3 className="mt-1 font-display text-lg font-extrabold">
            {finished ? "Todas as séries feitas" : `Série ${currentSet}`}
            <span className="ml-2 text-sm font-semibold text-muted-foreground">
              de {totalSets} · {repsTarget} reps
            </span>
          </h3>
        </div>
        {done > 0 && (
          <button
            type="button"
            onClick={onUndo}
            className="press inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-semibold text-muted-foreground"
          >
            <Undo2 className="size-3.5" /> Desfazer
          </button>
        )}
      </header>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Stepper label="Carga" value={weight} suffix="kg" step={2.5} onChange={setWeight} />
        <Stepper label="Repetições" value={reps} step={1} onChange={setReps} />
      </div>

      <Button
        size="lg"
        disabled={finished}
        onClick={() => onComplete({ weight, reps })}
        className="press mt-4 w-full font-extrabold tracking-wide"
      >
        {finished ? "SÉRIES CONCLUÍDAS" : "CONCLUIR SÉRIE"}
      </Button>

      <ul className="mt-4 space-y-2">
        {Array.from({ length: totalSets }).map((_, index) => {
          const log = logs[index];
          const isCurrent = !log && index === done;
          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors",
                log && "border-primary/35 bg-primary/8",
                isCurrent && "border-primary/60 bg-secondary",
                !log && !isCurrent && "border-border bg-secondary/40 text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold",
                  log ? "gradient-lime animate-pop text-primary-foreground" : "bg-elevated",
                )}
              >
                {log ? <Check className="size-4" strokeWidth={3} /> : index + 1}
              </span>
              <span className="font-semibold">Série {index + 1}</span>
              <span className="ml-auto tabular-nums font-semibold">
                {log ? `${log.weight} kg × ${log.reps}` : `${previousWeight} kg × ${repsTarget}`}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Stepper({
  label,
  value,
  onChange,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label={`Diminuir ${label}`}
          onClick={() => onChange(Math.max(0, Number((value - step).toFixed(1))))}
          className="press grid size-10 place-items-center rounded-xl bg-elevated text-foreground"
        >
          <Minus className="size-4" />
        </button>
        <span className="font-display text-2xl font-extrabold tabular-nums">
          {value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
          {suffix && <span className="ml-1 text-sm text-muted-foreground">{suffix}</span>}
        </span>
        <button
          type="button"
          aria-label={`Aumentar ${label}`}
          onClick={() => onChange(Number((value + step).toFixed(1)))}
          className="press grid size-10 place-items-center rounded-xl bg-elevated text-foreground"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
