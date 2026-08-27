import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Wordmark } from "@/components/treino/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TREINÔ — Treine certo. Evolua no seu ritmo." },
      {
        name: "description",
        content:
          "Comece agora no TREINÔ: treino do dia, registro de carga, timer de descanso e evolução em um só app.",
      },
      { property: "og:title", content: "TREINÔ — Treine certo. Evolua no seu ritmo." },
      {
        property: "og:description",
        content: "Você pode não ter um personal do seu lado. Mas não precisa mais treinar sozinho.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.setTimeout(() => navigate({ to: "/auth" }), 2400);
    return () => window.clearTimeout(id);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl"
      />
      <h1 className="relative text-6xl sm:text-7xl">
        <Wordmark animated />
      </h1>
      <p
        className="animate-rise-in mt-5 text-base font-semibold text-muted-foreground"
        style={{ animationDelay: "0.45s" }}
      >
        Treine certo. Evolua no seu ritmo.
      </p>
      <Link
        to="/auth"
        className="animate-fade-in mt-12 text-xs font-bold tracking-[0.2em] text-primary"
        style={{ animationDelay: "1s" }}
      >
        ENTRAR AGORA
      </Link>
      <div className="absolute bottom-10 h-1 w-28 overflow-hidden rounded-full bg-secondary">
        <div
          className="gradient-lime h-full w-full origin-left"
          style={{ animation: "rise-in 2.4s linear both", transformOrigin: "left" }}
        />
      </div>
    </main>
  );
}
