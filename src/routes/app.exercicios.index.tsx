import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ExerciseCard } from "@/components/treino/ExerciseCard";
import { MuscleFilter } from "@/components/treino/MuscleFilter";
import { PageHeader } from "@/components/treino/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DIFFICULTIES,
  EQUIPMENT_OPTIONS,
  MUSCLE_GROUPS,
  exercises,
  type Difficulty,
  type Equipment,
} from "@/data/exercises";
import { useTreino } from "@/lib/treino-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/exercicios/")({
  head: () => ({
    meta: [
      { title: "Biblioteca de exercícios — TREINÔ" },
      {
        name: "description",
        content:
          "Busque exercícios por grupo muscular, equipamento e dificuldade, com execução e erros comuns.",
      },
      { property: "og:title", content: "Biblioteca de exercícios — TREINÔ" },
      {
        property: "og:description",
        content: "Mais de 20 exercícios com execução passo a passo e erros comuns.",
      },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  const { favorites, toggleFavorite } = useTreino();
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty[]>([]);

  const filtered = useMemo(
    () =>
      exercises.filter((e) => {
        const matchQuery =
          !query ||
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.targetMuscle.toLowerCase().includes(query.toLowerCase());
        const matchMuscle = muscle === "Todos" || e.muscleGroup === muscle;
        const matchEquip = equipment.length === 0 || equipment.includes(e.equipment);
        const matchDiff = difficulty.length === 0 || difficulty.includes(e.difficulty);
        return matchQuery && matchMuscle && matchEquip && matchDiff;
      }),
    [query, muscle, equipment, difficulty],
  );

  const toggle = <T,>(list: T[], set: (v: T[]) => void, value: T) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="EXERCÍCIOS"
        title="Biblioteca"
        subtitle={`${filtered.length} exercícios disponíveis`}
      />

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque um exercício"
            className="h-12 rounded-xl bg-card pl-10"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "secondary"}
          className="press h-12 shrink-0 rounded-xl font-bold"
          onClick={() => setShowFilters((v) => !v)}
        >
          <SlidersHorizontal className="size-4" /> Filtros
        </Button>
      </div>

      <MuscleFilter
        options={["Todos", ...MUSCLE_GROUPS]}
        value={muscle}
        onChange={setMuscle}
      />

      {showFilters && (
        <section className="surface animate-scale-in space-y-4 p-4">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground">
              EQUIPAMENTO
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {EQUIPMENT_OPTIONS.map((eq) => (
                <Chip
                  key={eq}
                  label={eq}
                  active={equipment.includes(eq)}
                  onClick={() => toggle(equipment, setEquipment, eq)}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground">
              DIFICULDADE
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {DIFFICULTIES.map((d) => (
                <Chip
                  key={d}
                  label={d}
                  active={difficulty.includes(d)}
                  onClick={() => toggle(difficulty, setDifficulty, d)}
                />
              ))}
            </div>
          </div>
          {(equipment.length > 0 || difficulty.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setEquipment([]);
                setDifficulty([]);
              }}
              className="text-xs font-bold text-primary"
            >
              Limpar filtros
            </button>
          )}
        </section>
      )}

      {filtered.length === 0 ? (
        <div className="surface p-8 text-center">
          <p className="font-display font-bold">Nada por aqui.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tente outro termo ou remova alguns filtros.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              favorite={favorites.includes(exercise.id)}
              onToggleFavorite={() => toggleFavorite(exercise.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
        active
          ? "border-primary bg-primary/12 text-primary"
          : "border-border bg-secondary text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
