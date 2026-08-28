import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AlertTriangle, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { ExerciseCard } from "@/components/treino/ExerciseCard";
import { MuscleFilter } from "@/components/treino/MuscleFilter";
import { PageHeader } from "@/components/treino/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exercisesQueryOptions, uniqueValues } from "@/lib/exercises-api";
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
        content: "Exercícios com execução passo a passo, vídeos e erros comuns.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  const { favorites, toggleFavorite } = useTreino();
  const { data, isPending, isError, error, refetch, isFetching } = useQuery(exercisesQueryOptions);
  const [query, setQuery] = useState("");
  const [muscle, setMuscle] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<string[]>([]);

  const list = useMemo(() => data ?? [], [data]);
  const muscleOptions = useMemo(() => uniqueValues(list, "muscle_group"), [list]);
  const equipmentOptions = useMemo(() => uniqueValues(list, "equipment"), [list]);
  const difficultyOptions = useMemo(() => uniqueValues(list, "difficulty"), [list]);

  const filtered = useMemo(
    () =>
      list.filter((e) => {
        const term = query.trim().toLowerCase();
        const matchQuery =
          !term ||
          e.name.toLowerCase().includes(term) ||
          e.target_muscle.toLowerCase().includes(term) ||
          e.muscle_group.toLowerCase().includes(term);
        const matchMuscle = muscle === "Todos" || e.muscle_group === muscle;
        const matchEquip = equipment.length === 0 || equipment.includes(e.equipment);
        const matchDiff = difficulty.length === 0 || difficulty.includes(e.difficulty);
        return matchQuery && matchMuscle && matchEquip && matchDiff;
      }),
    [list, query, muscle, equipment, difficulty],
  );

  const toggle = (values: string[], set: (v: string[]) => void, value: string) =>
    set(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);

  return (
    <div className="space-y-5">
      <DebugSupabasePanel />
      <PageHeader
        eyebrow="EXERCÍCIOS"
        title="Biblioteca"
        subtitle={
          isPending
            ? "Carregando exercícios…"
            : isError
              ? "Não foi possível carregar"
              : `${filtered.length} exercícios disponíveis`
        }
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

      {muscleOptions.length > 0 && (
        <MuscleFilter
          options={["Todos", ...muscleOptions]}
          value={muscle}
          onChange={setMuscle}
        />
      )}

      {showFilters && (
        <section className="surface animate-scale-in space-y-4 p-4">
          <div>
            <p className="text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground">
              EQUIPAMENTO
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {equipmentOptions.map((eq) => (
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
              {difficultyOptions.map((d) => (
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

      {isPending ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="surface flex items-center gap-3 p-3">
              <div className="size-20 shrink-0 animate-pulse rounded-lg bg-secondary" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-2/3 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-secondary" />
                <div className="h-5 w-24 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-flame/30 bg-flame/8 p-6 text-center">
          <AlertTriangle className="mx-auto size-6 text-flame" />
          <p className="mt-2 font-display font-bold">Erro ao carregar os exercícios.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Tente novamente em instantes."}
          </p>
          <Button
            variant="secondary"
            className="press mt-4 font-bold"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            {isFetching && <Loader2 className="size-4 animate-spin" />} Tentar novamente
          </Button>
        </div>
      ) : filtered.length === 0 ? (
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
