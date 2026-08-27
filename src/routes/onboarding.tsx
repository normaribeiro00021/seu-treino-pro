import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Wordmark } from "@/components/treino/Logo";
import { Button } from "@/components/ui/button";
import { useTreino, type OnboardingAnswers } from "@/lib/treino-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Monte seu plano no TREINÔ" },
      {
        name: "description",
        content: "Responda 5 perguntas rápidas e receba um plano de treino no seu ritmo.",
      },
      { property: "og:title", content: "Monte seu plano no TREINÔ" },
      {
        property: "og:description",
        content: "Objetivo, local, frequência, tempo e nível: seu treino sob medida.",
      },
    ],
  }),
  component: Onboarding,
});

type Key = keyof OnboardingAnswers;

const STEPS: { key: Key; question: string; options: string[]; columns?: number }[] = [
  {
    key: "goal",
    question: "Qual é o seu principal objetivo?",
    options: [
      "Ganhar massa muscular",
      "Emagrecer",
      "Definir",
      "Ganhar força",
      "Melhorar condicionamento",
      "Criar hábito",
    ],
  },
  {
    key: "location",
    question: "Onde você costuma treinar?",
    options: ["Academia", "Em casa", "Os dois"],
  },
  {
    key: "daysPerWeek",
    question: "Quantos dias por semana você consegue treinar?",
    options: ["2", "3", "4", "5", "6"],
    columns: 3,
  },
  {
    key: "duration",
    question: "Quanto tempo você tem por treino?",
    options: ["até 30 minutos", "30–45 minutos", "45–60 minutos", "mais de 60 minutos"],
  },
  {
    key: "level",
    question: "Qual é seu nível atual?",
    options: ["Iniciante", "Intermediário", "Avançado"],
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const { setProfile } = useTreino();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  const finished = step >= STEPS.length;
  const current = STEPS[step];

  const select = (key: Key, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => setStep((s) => s + 1), 180);
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-6">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <button
          type="button"
          aria-label="Voltar"
          onClick={() => (step === 0 ? navigate({ to: "/auth" }) : setStep((s) => s - 1))}
          className="press grid size-10 place-items-center rounded-xl bg-card text-muted-foreground"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="text-center text-lg">
          <Wordmark />
        </div>
        <span className="text-xs font-bold tabular-nums text-muted-foreground">
          {Math.min(step + 1, STEPS.length)}/{STEPS.length}
        </span>
      </header>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="gradient-lime h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${((finished ? STEPS.length : step) / STEPS.length) * 100}%` }}
        />
      </div>

      {!finished && current ? (
        <section key={current.key} className="animate-rise-in mt-10 flex-1">
          <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">{current.question}</h1>
          <div
            className={cn(
              "mt-6 grid gap-3",
              current.columns === 3 ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
            )}
          >
            {current.options.map((option) => {
              const active = answers[current.key] === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => select(current.key, option)}
                  className={cn(
                    "press surface surface-hover flex items-center justify-between gap-2 px-4 py-4 text-left text-sm font-bold",
                    active && "border-primary bg-primary/10 text-primary",
                  )}
                >
                  <span>{option}</span>
                  {active && <Check className="size-4 shrink-0" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="animate-rise-in mt-16 flex flex-1 flex-col items-center text-center">
          <span className="gradient-lime animate-pop grid size-16 place-items-center rounded-2xl text-primary-foreground">
            <Sparkles className="size-8" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight">
            Tudo pronto. Agora você não precisa mais treinar sozinho.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Montamos sua semana com base nas suas respostas. Dá para ajustar depois.
          </p>
          <Button
            size="lg"
            className="press mt-10 w-full font-extrabold tracking-wide"
            onClick={() => {
              setProfile({ ...answers, onboarded: true });
              navigate({ to: "/app/inicio" });
            }}
          >
            COMEÇAR
          </Button>
        </section>
      )}
    </main>
  );
}
