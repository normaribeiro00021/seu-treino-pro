import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbExercise {
  id: string;
  name: string;
  slug: string;
  muscle_group: string;
  target_muscle: string;
  secondary_muscles: string[] | null;
  equipment: string;
  difficulty: string;
  instructions: string[] | null;
  common_mistakes: string[] | null;
  gif_url: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
}

export const exercisesQueryOptions = queryOptions({
  queryKey: ["exercises"],
  queryFn: async (): Promise<DbExercise[]> => {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as DbExercise[];
  },
});

export const exerciseBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["exercises", slug],
    queryFn: async (): Promise<DbExercise | null> => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return (data ?? null) as DbExercise | null;
    },
  });

/** Unique, sorted values of a column across the loaded exercises. */
export const uniqueValues = (list: DbExercise[], key: keyof DbExercise) =>
  Array.from(new Set(list.map((e) => String(e[key] ?? "")).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
