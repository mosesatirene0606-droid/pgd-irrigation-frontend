import { useState } from "react";
import { motion } from "framer-motion";
import API from "../api/client";
import Field from "../components/ui/Field";
import InputWrapper from "../components/ui/InputWrapper";
import UnitInput from "../components/ui/UnitInput";
import { CloudSun, Wind, Thermometer, Droplets } from "lucide-react";

export default function WeatherForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    site: "Maiduguri",
    date: "",
    temp_c: "",
    humidity_pct: "",
    rainfall_mm: "",
    wind_ms: "",
    radiation_wm2: "",
  });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/api/weather", {
        site: form.site,
        date: form.date,
        temp_c: Number(form.temp_c),
        humidity_pct: Number(form.humidity_pct),
        rainfall_mm: Number(form.rainfall_mm || 0),
        wind_ms: Number(form.wind_ms || 0),
        radiation_wm2: Number(form.radiation_wm2 || 0),
      });

      alert("Weather data saved successfully");
      setForm({ ...form, date: "" });
    } catch {
      alert("Failed to save weather data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-4xl mx-auto p-6 grid grid-cols-2 gap-5">
      <Field label="Date">
        <InputWrapper>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={update}
            required
            className="input"
          />
        </InputWrapper>
      </Field>

      <Field label="Temperature" icon={Thermometer}>
        <UnitInput
          name="temp_c"
          value={form.temp_c}
          onChange={update}
          unit="°C"
          required
        />
      </Field>

      <Field label="Humidity" icon={Droplets}>
        <UnitInput
          name="humidity_pct"
          value={form.humidity_pct}
          onChange={update}
          unit="%"
          required
        />
      </Field>

      <Field label="Wind Speed" icon={Wind}>
        <UnitInput
          name="wind_ms"
          value={form.wind_ms}
          onChange={update}
          unit="m/s"
        />
      </Field>

      <motion.button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit Weather Data"}
      </motion.button>
    </form>
  );
}
