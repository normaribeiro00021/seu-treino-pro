export const formatSeconds = (total: number) => {
  const safe = Math.max(0, Math.round(total));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const formatKg = (value: number) =>
  `${value.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} kg`;

export const formatVolume = (value: number) =>
  value >= 1000
    ? `${(value / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} t`
    : `${value} kg`;

export const greeting = (date = new Date()) => {
  const h = date.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
};
