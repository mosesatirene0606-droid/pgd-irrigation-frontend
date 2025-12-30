// src/pages/NewEstimationPage.jsx
import { useEffect, useState } from "react";
import API from "../api/client";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import { Leaf, CloudSun, Play } from "lucide-react";

export default function NewEstimationPage({ setScreen }) {
  const [crops, setCrops] = useState([]);
  const [weatherDates, setWeatherDates] = useState([]);
  const [cropId, setCropId] = useState("");
  const [weatherId, setWeatherId] = useState("");
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [cropRes, weatherRes] = await Promise.all([
        API.get("/api/crops"),
        API.get("/api/weather"),
      ]);

      setCrops(cropRes.data || []);
      setWeatherDates(weatherRes.data || []);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  }

  async function submitEstimation(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/api/estimations", {
        crop_id: Number(cropId),
        weather_id: Number(weatherId),
      });

      setScreen("dashboard");
    } catch (err) {
      alert("Failed to create estimation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        <Card title="Create New Estimation">
          <form onSubmit={submitEstimation} className="space-y-6">
            {/* Crop */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Select Crop
              </label>
              <div className="relative">
                <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 size-5" />
                <select
                  value={cropId}
                  onChange={(e) => setCropId(e.target.value)}
                  className="input pl-10"
                  required>
                  <option value="">Choose crop</option>
                  {crops.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weather */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1 block">
                Select Weather Date
              </label>
              <div className="relative">
                <CloudSun className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 size-5" />
                <select
                  value={weatherId}
                  onChange={(e) => {
                    setWeatherId(e.target.value);
                    setSelectedWeather(
                      weatherDates.find((w) => String(w.id) === e.target.value)
                    );
                  }}
                  className="input pl-10"
                  required>
                  <option value="">Choose weather record</option>
                  {weatherDates.map((w) => (
                    <option key={w.id} value={String(w.id)}>
                      {new Date(w.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weather preview */}
            {selectedWeather && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  rounded-xl p-4
                  bg-emerald-50/60
                  border border-emerald-200
                  text-sm text-emerald-900
                ">
                <div className="font-medium mb-1">Selected Weather</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>Temp: {selectedWeather.temp_c}°C</div>
                  <div>Humidity: {selectedWeather.humidity_pct}%</div>
                  <div>Rainfall: {selectedWeather.rainfall_mm} mm</div>
                  <div>Wind: {selectedWeather.wind_ms} m/s</div>
                </div>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!cropId || !weatherId || loading}
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              className="
                w-full rounded-xl py-3
                bg-gradient-to-r from-emerald-500 to-green-600
                text-white font-semibold
                shadow-lg hover:shadow-emerald-500/40
                transition-all
                disabled:opacity-60
              ">
              <div className="flex items-center justify-center gap-2">
                <Play size={18} />
                {loading ? "Running Estimation…" : "Run Estimation"}
              </div>
            </motion.button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
