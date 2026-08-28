import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AlertTriangle, ArrowLeft, Heart, Info, Loader2 } from "lucide-react";
import { DebugSupabasePanel } from "@/components/treino/DebugSupabasePanel";
import { ExerciseThumb } from "@/components/treino/ExerciseThumb";
import { Button } from "@/components/ui/button";
import { exerciseBySlugQueryOptions, type DbExercise } from "@/lib/exercises-api";
import { useTreino } from "@/lib/treino-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/exercicios/$slug")({
  head: ({ params }) => {
    const title = "Exercício — como fazer | TREINÔ";
    const description = `Execução passo a passo, músculos trabalhados e erros comuns do exercício ${params.slug.replace(/-/g, " ")}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => <Fallback />,
  notFoundComponent: () => <Fallback />,
  component: ExerciseDetail,
});

function Fallback({ message }: { message?: string }) {
  return (
    <div className="surface p-8 text-center">
      <p className="font-display font-bold">{message ?? "Exercício não encontrado."}</p>
      <Button asChild variant="secondary" className="mt-4">
        <Link to="/app/exercicios">Voltar para a biblioteca</Link>
      </Button>
    </div>
  );
}

function ExerciseDetail() {
  const { slug } = Route.useParams();
  const { data, isPending, isError, error, refetch, isFetching } = useQuery(
    exerciseBySlugQueryOptions(slug),
  );
  const { isFavorite, toggleFavorite } = useTreino();

  if (isPending) {
    return (
      <div className="space-y-5">
        <DebugSupabasePanel />
        <div className="h-5 w-32 animate-pulse rounded bg-secondary" />
        <div className="h-8 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="h-52 w-full animate-pulse rounded-2xl bg-secondary sm:h-72" />
        <div className="grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-5">
        <DebugSupabasePanel />
        <div className="rounded-2xl border border-flame/30 bg-flame/8 p-6 text-center">
        <AlertTriangle className="mx-auto size-6 text-flame" />
        <p className="mt-2 font-display font-bold">Erro ao carregar o exercício.</p>
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
    );
  }

  if (!data) return <Fallback />;

  const exercise = data;
  const fav = isFavorite(exercise.id);

  return (
    <div className="space-y-5">
      <DebugSupabasePanel />
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
          {exercise.muscle_group} · {exercise.difficulty}
        </p>
      </header>

      <ExerciseMedia exercise={exercise} />

      <div className="grid gap-3 sm:grid-cols-3">
        <InfoBlock title="Músculo principal" items={[exercise.target_muscle]} />
        <InfoBlock
          title="Músculos secundários"
          items={exercise.secondary_muscles?.length ? exercise.secondary_muscles : ["—"]}
        />
        <InfoBlock title="Equipamento" items={[exercise.equipment]} />
      </div>

      <section className="surface p-4">
        <h2 className="flex items-center gap-2 font-display text-sm font-extrabold">
          <Info className="size-4 text-primary" /> EXECUÇÃO
        </h2>
        <ol className="mt-3 space-y-2.5">
          {(exercise.instructions ?? []).map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-muted-foreground">
              <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {(exercise.common_mistakes?.length ?? 0) > 0 && (
        <section className="rounded-2xl border border-flame/30 bg-flame/8 p-4">
          <h2 className="flex items-center gap-2 font-display text-sm font-extrabold text-flame">
            <AlertTriangle className="size-4" /> ERROS COMUNS
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {(exercise.common_mistakes ?? []).map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-flame">•</span> {m}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function ExerciseMedia({ exercise }: { exercise: DbExercise }) {
  const frame = "h-52 w-full overflow-hidden rounded-2xl border border-border sm:h-72";
  const [failed, setFailed] = useState<string | null>(null);

  const videoUrl = exercise.video_url?.trim() || null;
  const gifUrl = exercise.gif_url?.trim() || null;
  const thumbUrl = exercise.thumbnail_url?.trim() || null;

  if (videoUrl && failed !== videoUrl) {
    return (
      <div className={cn(frame, "bg-secondary")}>
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(videoUrl)}
          aria-label={`Vídeo de execução do exercício ${exercise.name}`}
          className="size-full object-cover"
        />
      </div>
    );
  }

  if (gifUrl && failed !== gifUrl) {
    return (
      <div className={cn(frame, "bg-secondary")}>
        <img
          src={gifUrl}
          alt={exercise.name}
          onError={() => setFailed(gifUrl)}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <ExerciseThumb
      exercise={{
        name: exercise.name,
        muscleGroup: exercise.muscle_group,
        thumbnailUrl: thumbUrl,
      }}
      className={frame}
      iconClassName="size-14"
    />
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
