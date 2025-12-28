import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ETChart({ data }) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          <XAxis
            dataKey="weather_date"
            tick={{ fontSize: 12 }}
            stroke="#64748b"
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#64748b"
            label={{
              value: "mm / day",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 12,
              border: "1px solid #e5e7eb",
            }}
          />

          <Line
            type="monotone"
            dataKey="et0_mm"
            name="ET₀"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />

          <Line
            type="monotone"
            dataKey="water_need_lm2"
            name="Water Need"
            stroke="#0ea5e9"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
