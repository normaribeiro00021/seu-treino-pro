import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Heart, Info } from "lucide-react";
import { ExerciseThumb } from "@/components/treino/ExerciseThumb";
import { Button } from "@/components/ui/button";
import { getExerciseBySlug } from "@/data/exercises";
import { useTreino } from "@/lib/treino-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/exercicios/$slug")({
  loader: ({ params }) => {
    const exercise = getExerciseBySlug(params.slug);
    if (!exercise) throw notFound();
    return { exercise };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Exercício não encontrado — TREINÔ" }, { name: "robots", content: "noindex" }],
      };
    }
    const { exercise } = loaderData;
    const title = `${exercise.name} — como fazer | TREINÔ`;
    const description = `Execução passo a passo de ${exercise.name}: músculo principal ${exercise.targetMuscle}, equipamento ${exercise.equipment} e erros comuns.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  errorComponent: () => <Fallback />,
  notFoundComponent: () => <Fallback />,
  component: ExerciseDetail,
});

function Fallback() {
  return (
    <div className="surface p-8 text-center">
      <p className="font-display font-bold">Exercício não encontrado.</p>
      <Button asChild variant="secondary" className="mt-4">
        <Link to="/app/exercicios">Voltar para a biblioteca</Link>
      </Button>
    </div>
  );
}

function ExerciseDetail() {
  const { exercise } = Route.useLoaderData();
  const { isFavorite, toggleFavorite } = useTreino();
  const fav = isFavorite(exercise.id);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/app/exercicios"
          className="press inline-flex items-center gap-2 text-sm font-bold text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Biblioteca
        </Link>
        <button
          type="button"
          onClick={() => toggleFavorite(exercise.id)}
          className="press inline-flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-xs font-bold text-muted-foreground"
        >
          <Heart className={cn("size-4", fav && "fill-primary text-primary")} />
          {fav ? "Favorito" : "Favoritar"}
        </button>
      </div>

      <header className="animate-rise-in">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{exercise.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {exercise.muscleGroup} · {exercise.difficulty}
        </p>
      </header>

      <ExerciseThumb
        exercise={exercise}
        className="h-52 w-full rounded-2xl border border-border sm:h-72"
        iconClassName="size-14"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <InfoBlock title="Músculo principal" items={[exercise.targetMuscle]} />
        <InfoBlock
          title="Músculos secundários"
          items={exercise.secondaryMuscles.length ? exercise.secondaryMuscles : ["—"]}
        />
        <InfoBlock title="Equipamento" items={[exercise.equipment]} />
      </div>

      <section className="surface p-4">
        <h2 className="flex items-center gap-2 font-display text-sm font-extrabold">
          <Info className="size-4 text-primary" /> EXECUÇÃO
        </h2>
        <ol className="mt-3 space-y-2.5">
          {exercise.instructions.map((step, i) => (
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
          {exercise.commonMistakes.map((m) => (
            <li key={m} className="flex gap-2">
              <span className="text-flame">•</span> {m}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="surface p-4">
      <p className="text-[0.68rem] font-bold tracking-[0.16em] text-muted-foreground">
        {title.toUpperCase()}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
