import { CalendarDays, Dumbbell, Signal } from "lucide-react";
import type { Program } from "@/data/workouts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COVERS: Record<Program["accent"], string> = {
  lime: "from-primary/35 via-primary/10 to-transparent",
  flame: "from-flame/35 via-flame/10 to-transparent",
  cool: "from-chart-5/40 via-chart-5/12 to-transparent",
};

export function ProgramCard({
  program,
  onStart,
}: {
  program: Program;
  onStart?: (program: Program) => void;
}) {
  return (
    <article className="surface surface-hover animate-rise-in overflow-hidden">
      <div
        className={cn(
          "relative flex h-36 items-end bg-gradient-to-br p-4 sm:h-44",
          COVERS[program.accent],
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              "repeating-linear-gradient(120deg, transparent 0 14px, oklch(1 0 0 / 0.05) 14px 16px)",
          }}
        />
        <h3 className="relative font-display text-2xl font-extrabold leading-tight">
          {program.name}
        </h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground">{program.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem] font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2 py-1">
            <CalendarDays className="size-3.5" /> {program.durationWeeks} semanas
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2 py-1">
            <Signal className="size-3.5" /> {program.level}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-2 py-1">
            <Dumbbell className="size-3.5" /> {program.workoutsCount} treinos
          </span>
        </div>
        <Button
          variant="secondary"
          className="press mt-4 w-full font-bold"
          onClick={() => onStart?.(program)}
        >
          Começar programa
        </Button>
      </div>
    </article>
  );
}
