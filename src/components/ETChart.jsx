// src/components/ETChart.jsx

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ETChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="weather_date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="et0_mm" stroke="#16a34a" name="ET₀" />
        <Line
          type="monotone"
          dataKey="water_need_lm2"
          stroke="#dc2626"
          name="Irrigation"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ETChart;
