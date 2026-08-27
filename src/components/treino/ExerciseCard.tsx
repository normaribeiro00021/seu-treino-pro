import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Exercise } from "@/data/exercises";
import { cn } from "@/lib/utils";
import { ExerciseThumb } from "./ExerciseThumb";

export function ExerciseCard({
  exercise,
  favorite,
  onToggleFavorite,
}: {
  exercise: Exercise;
  favorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <div className="surface surface-hover animate-rise-in relative overflow-hidden">
      <Link
        to="/app/exercicios/$slug"
        params={{ slug: exercise.slug }}
        className="flex items-center gap-3 p-3"
      >
        <ExerciseThumb exercise={exercise} className="size-20 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold">{exercise.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{exercise.targetMuscle}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
              {exercise.equipment}
            </span>
            <span className="rounded-md bg-primary/12 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
              {exercise.difficulty}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        onClick={onToggleFavorite}
        className="press absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-primary"
      >
        <Heart className={cn("size-4", favorite && "fill-primary text-primary")} />
      </button>
    </div>
  );
}
