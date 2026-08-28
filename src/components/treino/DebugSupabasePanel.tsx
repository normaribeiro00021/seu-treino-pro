import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DebugState {
  loading: boolean;
  url: string;
  projectRef: string;
  count: number | null;
  countError: string | null;
  exercise: Record<string, unknown> | null;
  exerciseError: string | null;
}

function extractRef(url: string): string {
  const match = url.match(/^https?:\/\/([^.]+)\./);
  return match?.[1] ?? "(não extraído)";
}

export function DebugSupabasePanel() {
  const [state, setState] = useState<DebugState | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const url =
        import.meta.env["VITE_SUPABASE_URL"] ||
        (typeof process !== "undefined" ? process.env["SUPABASE_URL"] : undefined) ||
        "(vazio)";
      const projectRef = extractRef(url);

      const { data: all, error: allError } = await supabase.from("exercises").select("*");
      const { data: exercise, error: exError } = await supabase
        .from("exercises")
        .select("*")
        .eq("slug", "supino-reto-com-barra")
        .maybeSingle();

      if (cancelled) return;
      setState({
        loading: false,
        url: String(url),
        projectRef,
        count: allError ? null : (all?.length ?? 0),
        countError: allError ? `${allError.code ?? ""} ${allError.message}`.trim() : null,
        exercise: exError ? null : (exercise as Record<string, unknown> | null),
        exerciseError: exError ? `${exError.code ?? ""} ${exError.message}`.trim() : null,
      });
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-4 font-mono text-[0.7rem] leading-relaxed">
      <p className="mb-2 font-sans text-xs font-extrabold tracking-widest text-primary">
        DEBUG SUPABASE (TEMPORÁRIO)
      </p>
      {!state ? (
        <p>Consultando Supabase diretamente…</p>
      ) : (
        <div className="space-y-2 break-all">
          <p>
            <strong>VITE_SUPABASE_URL:</strong> {state.url}
          </p>
          <p>
            <strong>Project ref:</strong> {state.projectRef}{" "}
            {state.projectRef === "xfqhnstvlujdrzdfritu" ? "(ESPERADO)" : "(≠ esperado xfqhnstvlujdrzdfritu)"}
          </p>
          <p>
            <strong>Registros em exercises:</strong>{" "}
            {state.countError ? `ERRO: ${state.countError}` : state.count}
          </p>
          <div>
            <p>
              <strong>supino-reto-com-barra:</strong>
            </p>
            {state.exerciseError ? (
              <p>ERRO: {state.exerciseError}</p>
            ) : state.exercise ? (
              <ul className="ml-3 list-disc">
                <li>id: {String(state.exercise.id)}</li>
                <li>name: {String(state.exercise.name)}</li>
                <li>slug: {String(state.exercise.slug)}</li>
                <li>video_url: {String(state.exercise.video_url ?? "null")}</li>
                <li>gif_url: {String(state.exercise.gif_url ?? "null")}</li>
                <li>thumbnail_url: {String(state.exercise.thumbnail_url ?? "null")}</li>
              </ul>
            ) : (
              <p>Registro não encontrado (0 linhas para esse slug).</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
