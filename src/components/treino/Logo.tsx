import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-baseline font-extrabold tracking-tight",
        animated && "animate-scale-in",
        className,
      )}
    >
      <span>TREIN</span>
      <span className="relative">
        <span>O</span>
        <span
          aria-hidden
          className={cn(
            "absolute -top-[0.42em] left-1/2 -translate-x-1/2 text-primary",
            animated && "animate-pop",
          )}
          style={animated ? { animationDelay: "0.25s" } : undefined}
        >
          ˆ
        </span>
      </span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "gradient-lime grid size-9 shrink-0 place-items-center rounded-xl font-display text-lg font-extrabold text-primary-foreground",
        className,
      )}
    >
      T
    </span>
  );
}
