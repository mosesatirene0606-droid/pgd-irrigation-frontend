import { useEffect, useState } from "react";
import API from "../api/client";
import Card from "../components/ui/Card";
import { motion } from "framer-motion";

export default function NewEstimationPage({ setScreen }) {
  const [crops, setCrops] = useState([]);
  const [weatherDates, setWeatherDates] = useState([]);
  const [cropId, setCropId] = useState("");
  const [weatherId, setWeatherId] = useState("");
  const [selectedWeather, setSelectedWeather] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const cropRes = await API.get("/api/crops");
    const weatherRes = await API.get("/api/weather");
    setCrops(cropRes.data || []);
    setWeatherDates(weatherRes.data || []);
  }

  async function submitEstimation(e) {
    e.preventDefault();
    await API.post("/api/estimations", {
      crop_id: Number(cropId),
      weather_id: Number(weatherId),
    });
    alert("Estimation created");
    setScreen("dashboard");
  }

  return (
    <Card title="Create New Estimation">
      <form onSubmit={submitEstimation} className="space-y-4">
        <select value={cropId} onChange={(e) => setCropId(e.target.value)}>
          <option value="">Select Crop</option>
          {crops.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={weatherId}
          onChange={(e) => {
            setWeatherId(e.target.value);
            setSelectedWeather(
              weatherDates.find((w) => String(w.id) === e.target.value)
            );
          }}>
          <option value="">Select Weather</option>
          {weatherDates.map((w) => (
            <option key={w.id} value={String(w.id)}>
              {new Date(w.date).toLocaleDateString()}
            </option>
          ))}
        </select>

        <motion.button
          type="submit"
          disabled={!cropId || !weatherId}
          whileHover={{ scale: 1.05 }}>
          Run Estimation
        </motion.button>
      </form>
    </Card>
  );
}
