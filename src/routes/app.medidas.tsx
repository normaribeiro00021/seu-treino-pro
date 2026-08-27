import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/treino/PageHeader";
import { ProgressChart } from "@/components/treino/ProgressChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { measurementHistory } from "@/data/workouts";

export const Route = createFileRoute("/app/medidas")({
  head: () => ({
    meta: [
      { title: "Medidas — TREINÔ" },
      {
        name: "description",
        content:
          "Registre peso, cintura, abdômen, braço, coxa e quadril e acompanhe o histórico em gráficos.",
      },
      { property: "og:title", content: "Medidas — TREINÔ" },
      { property: "og:description", content: "Seu histórico corporal com gráficos de evolução." },
    ],
  }),
  component: Medidas,
});

type Measurement = (typeof measurementHistory)[number];

const FIELDS = [
  { key: "peso", label: "Peso", unit: "kg" },
  { key: "cintura", label: "Cintura", unit: "cm" },
  { key: "abdomen", label: "Abdômen", unit: "cm" },
  { key: "braco", label: "Braço", unit: "cm" },
  { key: "coxa", label: "Coxa", unit: "cm" },
  { key: "quadril", label: "Quadril", unit: "cm" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

function Medidas() {
  const [history, setHistory] = useState<Measurement[]>(measurementHistory);
  const [metric, setMetric] = useState<FieldKey>("peso");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<FieldKey, string>>({
    peso: "",
    cintura: "",
    abdomen: "",
    braco: "",
    coxa: "",
    quadril: "",
  });

  const latest = history[history.length - 1] as Measurement;
  const previous = history[history.length - 2];

  const chartData = useMemo(
    () => history.map((h) => ({ date: h.date, valor: h[metric] })),
    [history, metric],
  );

  const activeUnit = FIELDS.find((f) => f.key === metric)?.unit ?? "";

  const handleSave = () => {
    const entry = {
      date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
    } as Measurement;
    for (const f of FIELDS) {
      const parsed = Number(form[f.key].replace(",", "."));
      entry[f.key] = Number.isFinite(parsed) && form[f.key] !== "" ? parsed : latest[f.key];
    }
    setHistory((h) => [...h, entry]);
    setOpen(false);
    toast.success("Medidas registradas!");
  };

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="CORPO"
        title="Medidas"
        subtitle="Acompanhe suas mudanças ao longo do tempo."
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="press font-bold">
                <Plus className="size-4" /> Registrar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novas medidas</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3">
                {FIELDS.map((f) => (
                  <div key={f.key} className="space-y-1.5">
                    <Label htmlFor={f.key} className="text-xs">
                      {f.label} ({f.unit})
                    </Label>
                    <Input
                      id={f.key}
                      inputMode="decimal"
                      placeholder={String(latest[f.key])}
                      value={form[f.key]}
                      onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button className="press w-full font-bold" onClick={handleSave}>
                  Salvar medidas
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {FIELDS.map((f) => {
          const diff = previous ? latest[f.key] - previous[f.key] : 0;
          return (
            <button
              key={f.key}
              onClick={() => setMetric(f.key)}
              className={`surface surface-hover press animate-rise-in p-4 text-left ${
                metric === f.key ? "ring-2 ring-primary" : ""
              }`}
            >
              <p className="text-xs font-semibold text-muted-foreground">{f.label}</p>
              <p className="font-display mt-1 text-2xl font-extrabold tabular-nums">
                {latest[f.key].toLocaleString("pt-BR")}
                <span className="ml-1 text-sm font-bold text-muted-foreground">{f.unit}</span>
              </p>
              <p
                className={`mt-0.5 text-[0.7rem] font-semibold ${
                  diff === 0 ? "text-muted-foreground" : diff < 0 ? "text-primary" : "text-flame"
                }`}
              >
                {diff > 0 ? "+" : ""}
                {diff.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} {f.unit} vs. anterior
              </p>
            </button>
          );
        })}
      </div>

      <section className="surface animate-rise-in p-4">
        <h2 className="mb-3 text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">
          EVOLUÇÃO — {FIELDS.find((f) => f.key === metric)?.label.toUpperCase()}
        </h2>
        <ProgressChart data={chartData} xKey="date" yKey="valor" type="area" unit={activeUnit} />
      </section>

      <section className="space-y-3">
        <h2 className="text-[0.68rem] font-bold tracking-[0.2em] text-muted-foreground">
          HISTÓRICO
        </h2>
        <div className="surface animate-rise-in overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                <th className="p-3 text-left font-bold">Data</th>
                {FIELDS.map((f) => (
                  <th key={f.key} className="p-3 text-right font-bold">
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...history].reverse().map((row) => (
                <tr key={row.date} className="border-b border-border/60 last:border-0">
                  <td className="p-3 font-semibold">{row.date}</td>
                  {FIELDS.map((f) => (
                    <td key={f.key} className="p-3 text-right tabular-nums text-muted-foreground">
                      {row[f.key].toLocaleString("pt-BR")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
