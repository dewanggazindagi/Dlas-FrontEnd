import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps<T> {
  title?: string;
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  color?: string;
  height?: number;
  maxBarSize?: number;
  showTooltip?: boolean;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export default function BarChart<T extends Record<string, unknown>>({
  title,
  data,
  xKey,
  yKey,
  color = "#FE8507",
  height = 300,
  maxBarSize = 45.5,
  showTooltip = true,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
}: BarChartProps<T>) {
  return (
    <div className="rounded-xl bg-white">
      {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          {showGrid && <CartesianGrid vertical={false} stroke="#ECECEC" />}
          {showXAxis && (
            <XAxis dataKey={xKey as string} axisLine={false} tickLine={false} />
          )}
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                textAnchor: "start",
              }}
              dx={-55}
            />
          )}
          {showTooltip && <Tooltip />}
          <Bar
            dataKey={yKey as string}
            fill={color}
            radius={12}
            maxBarSize={maxBarSize}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
