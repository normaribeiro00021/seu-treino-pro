import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export function ProgressCard({
  label,
  value,
  suffix,
  icon: Icon,
  decimals = 0,
  accent = "lime",
  className,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon?: LucideIcon;
  decimals?: number;
  accent?: "lime" | "flame" | "cool";
  className?: string;
}) {
  const animated = useCountUp(value);
  const display = animated.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div className={cn("surface surface-hover animate-rise-in p-4", className)}>
      {Icon && (
        <span
          className={cn(
            "mb-3 grid size-9 place-items-center rounded-xl",
            accent === "lime" && "bg-primary/12 text-primary",
            accent === "flame" && "bg-flame/14 text-flame",
            accent === "cool" && "bg-secondary text-muted-foreground",
          )}
        >
          <Icon className="size-4.5" />
        </span>
      )}
      <p className="font-display text-2xl font-extrabold tabular-nums">
        {display}
        {suffix && <span className="ml-1 text-sm font-bold text-muted-foreground">{suffix}</span>}
      </p>
      <p className="mt-0.5 text-xs font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}
