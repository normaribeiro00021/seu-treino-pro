import { Trophy } from "lucide-react";
import { formatKg } from "@/lib/format";

export function PersonalRecordCard({
  exercise,
  weight,
  date,
}: {
  exercise: string;
  weight: number;
  date?: string;
}) {
  return (
    <div className="surface surface-hover animate-rise-in flex items-center gap-3 p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
        <Trophy className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-muted-foreground">{exercise}</p>
        <p className="font-display text-xl font-extrabold tabular-nums">{formatKg(weight)}</p>
      </div>
      {date && <span className="ml-auto text-[0.65rem] text-muted-foreground">{date}</span>}
    </div>
  );
}
