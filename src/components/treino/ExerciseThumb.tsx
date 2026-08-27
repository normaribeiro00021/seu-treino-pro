import { Dumbbell } from "lucide-react";
import type { Exercise } from "@/data/exercises";
import { cn } from "@/lib/utils";

const TONES: Record<string, string> = {
  Peito: "from-primary/28 to-primary/5",
  Costas: "from-flame/25 to-flame/5",
  Ombros: "from-chart-4/25 to-chart-4/5",
  Bíceps: "from-primary/22 to-flame/8",
  Tríceps: "from-chart-5/30 to-chart-5/5",
  Pernas: "from-primary/25 to-chart-5/10",
  Glúteos: "from-flame/28 to-primary/8",
  Abdômen: "from-chart-3/22 to-chart-3/5",
};

export function ExerciseThumb({
  exercise,
  className,
  iconClassName,
}: {
  exercise: Exercise;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden bg-gradient-to-br",
        TONES[exercise.muscleGroup] ?? "from-secondary to-secondary",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 10px, oklch(1 0 0 / 0.045) 10px 12px)",
        }}
      />
      <Dumbbell className={cn("relative size-7 text-foreground/70", iconClassName)} />
      <span className="absolute bottom-1 left-2 text-[0.6rem] font-bold tracking-widest text-foreground/50">
        {exercise.muscleGroup.toUpperCase()}
      </span>
    </div>
  );
}
