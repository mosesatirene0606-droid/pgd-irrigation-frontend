// src/pages/ResultsPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/client";
import MetricPill from "../components/ui/MetricPill";
import Card from "../components/ui/Card";
import ETChart from "../components/ETChart";
import { BarChart3, Download } from "lucide-react";

export default function ResultsPage() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatestResult();
  }, []);

  async function loadLatestResult() {
    try {
      const res = await API.get("/api/estimations/recent");
      if (res.data?.length) {
        setLatest(res.data[0]);
        setHistory(res.data);
      }
    } catch (err) {
      console.error("Failed to load results", err);
    } finally {
      setLoading(false);
    }
  }

  async function exportCsv() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/estimations/export`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "estimations.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to export CSV");
    }
  }

  if (loading) return <div className="p-6">Loading results…</div>;
  if (!latest) return <div className="p-6">No estimation results found.</div>;

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto space-y-8">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BarChart3 /> Estimation Results
            </h2>
          </div>

          <motion.button
            onClick={exportCsv}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl">
            <Download size={16} /> Export CSV
          </motion.button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricPill
            label="ET₀"
            value={Number(latest.et0_mm).toFixed(2)}
            unit="mm/day"
          />
          <MetricPill label="Kc" value={Number(latest.kc).toFixed(2)} />
          <MetricPill
            label="ETc"
            value={Number(latest.etc_mm).toFixed(2)}
            unit="mm/day"
          />
          <MetricPill
            label="Net Irrigation"
            value={Number(latest.water_need_lm2).toFixed(2)}
            unit="L/m²"
          />
        </div>
      </Card>

      <Card>
        <ETChart
          data={history.map((e) => ({
            ...e,
            weather_date: new Date(e.weather_date).toLocaleDateString(),
          }))}
        />
      </Card>
    </div>
  );
}
