import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/treino/PageHeader";
import { ProgramCard } from "@/components/treino/ProgramCard";
import { programs, type Program } from "@/data/workouts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/programas")({
  head: () => ({
    meta: [
      { title: "Programas — TREINÔ" },
      {
        name: "description",
        content:
          "Programas de treino prontos: glúteos, pernas, superiores, mobilidade, alongamento e treino em casa.",
      },
      { property: "og:title", content: "Programas — TREINÔ" },
      { property: "og:description", content: "Escolha um programa e siga um plano completo." },
    ],
  }),
  component: Programas,
});

const LEVELS = ["Todos", "Iniciante", "Intermediário", "Avançado"] as const;

function Programas() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("Todos");
  const filtered = programs.filter((p) => level === "Todos" || p.level === level);

  const handleStart = (program: Program) => {
    toast.success(`Programa "${program.name}" iniciado!`, {
      description: `${program.durationWeeks} semanas · ${program.workoutsCount} treinos`,
    });
  };

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="PLANOS PRONTOS"
        title="Programas"
        subtitle="Sequências completas montadas para o seu objetivo."
      />

      <div className="animate-rise-in flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={cn(
              "press rounded-xl px-3 py-1.5 text-xs font-bold transition-colors",
              level === l
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((program) => (
          <ProgramCard key={program.id} program={program} onStart={handleStart} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Nenhum programa nesse nível por enquanto.
        </p>
      )}
    </div>
  );
}
