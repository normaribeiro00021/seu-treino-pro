import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = Record<string, string | number>;

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  backgroundColor: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.75rem",
  fontSize: "0.75rem",
  color: "var(--color-foreground)",
};

export function ProgressChart({
  data,
  xKey,
  yKey,
  type = "line",
  unit,
  height = 200,
}: {
  data: Row[];
  xKey: string;
  yKey: string;
  type?: "line" | "bar" | "area";
  unit?: string;
  height?: number;
}) {
  const common = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
      <XAxis dataKey={xKey} {...axis} />
      <YAxis {...axis} width={38} />
      <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}${unit ? ` ${unit}` : ""}`, ""]} />
    </>
  );

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ? (
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            {common}
            <Bar dataKey={yKey} fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={28} />
          </BarChart>
        ) : type === "area" ? (
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            {common}
            <Area
              dataKey={yKey}
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="var(--color-primary)"
              fillOpacity={0.14}
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            {common}
            <Line
              dataKey={yKey}
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: "var(--color-primary)", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
