import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Flame, TrendingUp, Weight } from "lucide-react";
import { PageHeader } from "@/components/treino/PageHeader";
import { PersonalRecordCard } from "@/components/treino/PersonalRecordCard";
import { ProgressCard } from "@/components/treino/ProgressCard";
import { ProgressChart } from "@/components/treino/ProgressChart";
import {
  frequencyData,
  loadProgression,
  personalRecords,
  volumeData,
  weekSummary,
} from "@/data/workouts";

export const Route = createFileRoute("/app/evolucao")({
  head: () => ({
    meta: [
      { title: "Evolução — TREINÔ" },
      {
        name: "description",
        content:
          "Acompanhe frequência, volume de treino, progressão de carga e seus recordes pessoais no TREINÔ.",
      },
      { property: "og:title", content: "Evolução — TREINÔ" },
      {
        property: "og:description",
        content: "Frequência, volume, progressão de carga e recordes pessoais.",
      },
    ],
  }),
  component: Evolucao,
});

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="surface animate-rise-in p-4">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">{title}</h2>
        {hint && <span className="text-[0.68rem] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

function Evolucao() {
  const totalTreinos = frequencyData.reduce((acc, d) => acc + d.treinos, 0);
  const ultimaCarga = loadProgression[loadProgression.length - 1]?.carga ?? 0;
  const primeiraCarga = loadProgression[0]?.carga ?? 0;
  const ganho = ultimaCarga - primeiraCarga;

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="SEU PROGRESSO"
        title="Evolução"
        subtitle="Seus números das últimas 6 semanas."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <ProgressCard label="Treinos (6 sem.)" value={totalTreinos} icon={CalendarCheck} />
        <ProgressCard
          label="Volume da semana"
          value={weekSummary.volumeKg}
          suffix="kg"
          icon={Weight}
          accent="cool"
        />
        <ProgressCard
          label="Ganho de carga"
          value={ganho}
          suffix="kg"
          decimals={1}
          icon={TrendingUp}
        />
        <ProgressCard
          label="Sequência"
          value={weekSummary.streakDays}
          suffix="dias"
          icon={Flame}
          accent="flame"
        />
      </div>

      <Section title="FREQUÊNCIA SEMANAL" hint="treinos por semana">
        <ProgressChart data={frequencyData} xKey="week" yKey="treinos" type="bar" />
      </Section>

      <Section title="VOLUME TOTAL" hint="kg levantados">
        <ProgressChart data={volumeData} xKey="week" yKey="volume" type="area" unit="kg" />
      </Section>

      <Section title="PROGRESSÃO DE CARGA" hint="supino reto">
        <ProgressChart data={loadProgression} xKey="week" yKey="carga" type="line" unit="kg" />
      </Section>

      <section className="space-y-3">
        <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">
          RECORDES PESSOAIS
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {personalRecords.map((r) => (
            <PersonalRecordCard
              key={r.exercise}
              exercise={r.exercise}
              weight={r.weight}
              date={r.date}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
