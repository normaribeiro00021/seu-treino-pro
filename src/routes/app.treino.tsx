import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Moon } from "lucide-react";
import { PageHeader } from "@/components/treino/PageHeader";
import { getWorkout, weekPlan, type DayStatus } from "@/data/workouts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/treino")({
  head: () => ({
    meta: [
      { title: "Meu treino da semana — TREINÔ" },
      {
        name: "description",
        content: "Veja a divisão da sua semana de treinos, com status de concluído, hoje e futuro.",
      },
      { property: "og:title", content: "Meu treino da semana — TREINÔ" },
      { property: "og:description", content: "Hoje tem treino. Preparado?" },
    ],
  }),
  component: MeuTreino,
});

const STATUS_LABEL: Record<DayStatus, string> = {
  concluido: "Concluído",
  hoje: "Hoje",
  futuro: "Futuro",
  descanso: "Descanso",
};

function MeuTreino() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="MEU TREINO"
        title="Sua semana"
        subtitle="Divisão ABCD com dois dias de descanso."
      />

      <ul className="space-y-3">
        {weekPlan.map((day) => {
          const workout = day.workoutId ? getWorkout(day.workoutId) : null;
          const rest = day.status === "descanso";

          const content = (
            <div
              className={cn(
                "surface animate-rise-in flex items-center gap-3 p-4",
                !rest && "surface-hover",
                day.status === "hoje" && "border-primary/50 shadow-glow",
                day.status === "concluido" && "border-primary/25",
              )}
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-xl text-xs font-extrabold",
                  day.status === "concluido" && "gradient-lime text-primary-foreground",
                  day.status === "hoje" && "bg-primary/14 text-primary",
                  day.status === "futuro" && "bg-secondary text-muted-foreground",
                  rest && "bg-secondary text-muted-foreground",
                )}
              >
                {day.status === "concluido" ? (
                  <Check className="size-5" strokeWidth={3} />
                ) : rest ? (
                  <Moon className="size-5" />
                ) : (
                  day.shortDay
                )}
              </span>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-muted-foreground">{day.day}</p>
                <p className="truncate font-display text-base font-bold">
                  {workout ? `${workout.name}` : "Descanso"}
                </p>
                {workout && (
                  <p className="truncate text-xs text-muted-foreground">{workout.focus}</p>
                )}
              </div>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <span
                  className={cn(
                    "rounded-md px-2 py-1 text-[0.65rem] font-bold",
                    day.status === "concluido" && "bg-primary/14 text-primary",
                    day.status === "hoje" && "bg-flame/16 text-flame",
                    (day.status === "futuro" || rest) && "bg-secondary text-muted-foreground",
                  )}
                >
                  {STATUS_LABEL[day.status]}
                </span>
                {!rest && <ChevronRight className="size-4 text-muted-foreground" />}
              </div>
            </div>
          );

          return (
            <li key={day.day}>
              {workout ? (
                <Link to="/app/sessao/$workoutId" params={{ workoutId: workout.id }}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
