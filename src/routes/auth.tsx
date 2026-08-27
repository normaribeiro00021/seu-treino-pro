import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Wordmark } from "@/components/treino/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTreino } from "@/lib/treino-store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar no TREINÔ — Bora treinar?" },
      {
        name: "description",
        content: "Acesse sua conta TREINÔ e continue seus treinos de onde parou.",
      },
      { property: "og:title", content: "Entrar no TREINÔ — Bora treinar?" },
      { property: "og:description", content: "Entre ou crie sua conta e comece a treinar hoje." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { profile } = useTreino();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bem-vindo de volta!");
    navigate({ to: profile.onboarded ? "/app/inicio" : "/onboarding" });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 size-80 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="animate-rise-in relative w-full max-w-sm">
        <Link to="/" className="text-3xl">
          <Wordmark />
        </Link>
        <h1 className="mt-8 text-3xl font-extrabold">Bora treinar?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Entre para ver seu treino de hoje e registrar suas cargas.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-card"
            />
          </div>

          <Button type="submit" size="lg" className="press w-full font-extrabold">
            Entrar
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="press w-full font-bold"
            onClick={() => navigate({ to: "/onboarding" })}
          >
            Criar minha conta
          </Button>
          <button
            type="button"
            onClick={() => toast("Enviamos um link de redefinição para seu e-mail.")}
            className="w-full text-center text-xs font-semibold text-muted-foreground underline-offset-4 hover:underline"
          >
            Esqueci minha senha
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[0.65rem] font-bold tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> OU <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          variant="outline"
          size="lg"
          className="press w-full font-bold"
          onClick={() => toast("Login com Google chega em breve.")}
        >
          Continuar com Google
        </Button>
      </div>
    </main>
  );
}
