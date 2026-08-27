import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatSeconds } from "@/lib/format";

export function RestTimer({
  seconds,
  onDone,
  onSkip,
}: {
  seconds: number;
  onDone?: () => void;
  onSkip: () => void;
}) {
  const [total, setTotal] = useState(seconds);
  const [left, setLeft] = useState(seconds);
  const doneRef = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => setLeft((v) => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (left === 0 && !doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }
  }, [left, onDone]);

  const pct = total > 0 ? left / total : 0;
  const radius = 78;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-background/85 backdrop-blur-md sm:items-center">
      <div className="animate-rise-in w-full max-w-sm rounded-t-3xl border border-border bg-card p-6 pb-8 text-center shadow-lift sm:rounded-3xl">
        <p className="text-[0.68rem] font-bold tracking-[0.2em] text-primary">
          {left === 0 ? "DESCANSO FINALIZADO" : "DESCANSO"}
        </p>

        <div className="relative mx-auto mt-5 size-48">
          <svg viewBox="0 0 180 180" className="size-full -rotate-90">
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="10"
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct)}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-4xl font-extrabold tabular-nums">
              {formatSeconds(left)}
            </span>
          </div>
        </div>

        <p className="mt-5 text-sm font-semibold text-muted-foreground">
          {left === 0 ? "Bora para a próxima?" : "Respira. Hidrata. Já volta."}
        </p>

        <div className="mt-5 flex gap-2">
          <Button
            variant="secondary"
            className="press flex-1 font-bold"
            onClick={() => {
              setTotal((t) => t + 15);
              setLeft((l) => l + 15);
              doneRef.current = false;
            }}
          >
            +15s
          </Button>
          <Button className="press flex-1 font-extrabold" onClick={onSkip}>
            {left === 0 ? "CONTINUAR" : "Pular descanso"}
          </Button>
        </div>
      </div>
    </div>
  );
}
