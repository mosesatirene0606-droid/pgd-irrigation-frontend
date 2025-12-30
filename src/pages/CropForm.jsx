import { useEffect, useState } from "react";
import API from "../api/client";
import Field from "../components/ui/Field";
import InputWrapper from "../components/ui/InputWrapper";
import ReadonlyPill from "../components/ui/ReadonlyPill";

export default function CropForm({ onSuccess }) {
  // Dropdown options
  const [states, setStates] = useState([]);
  const [crops, setCrops] = useState([]);
  const [stages, setStages] = useState([]);

  // Selected values
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [stage, setStage] = useState("");

  // Derived data
  const [kc, setKc] = useState("");
  const [loadingKc, setLoadingKc] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // Load dropdown options on mount
  // ===============================
  useEffect(() => {
    async function loadOptions() {
      try {
        const res = await API.get("/api/kc/options");
        setStates(res.data.states || []);
        setCrops(res.data.crops || []);
        setStages(res.data.stages || []);
      } catch (err) {
        console.error("Failed to load KC options", err);
        setError("Failed to load crop options");
      }
    }

    loadOptions();
  }, []);

  // ===============================
  // Fetch KC when selection changes
  // ===============================
  useEffect(() => {
    if (!state || !crop || !stage) {
      setKc("");
      return;
    }

    async function fetchKc() {
      try {
        setLoadingKc(true);
        setError("");

        const res = await API.get("/api/kc", {
          params: { state, crop, stage },
        });

        setKc(res.data.kc);
      } catch {
        setKc("");
        setError("Kc not found for this selection");
      } finally {
        setLoadingKc(false);
      }
    }

    fetchKc();
  }, [state, crop, stage]);

  // ===============================
  // Submit crop
  // ===============================
  async function submit(e) {
    e.preventDefault();

    try {
      await API.post("/api/crops", {
        state,
        name: crop,
        growth_stage: stage,
      });

      alert("Crop saved successfully");
      onSuccess?.();
    } catch (err) {
      alert(
        err.response?.data?.error || "Failed to save crop. Try again."
      );
    }
  }

  // ===============================
  // UI
  // ===============================
  return (
    <form
      onSubmit={submit}
      className="max-w-3xl mx-auto p-6 grid grid-cols-2 gap-5"
    >
      {/* State */}
      <Field label="State">
        <InputWrapper>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="input"
            required
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </InputWrapper>
      </Field>

      {/* Crop */}
      <Field label="Crop">
        <InputWrapper>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="input"
            required
          >
            <option value="">Select Crop</option>
            {crops.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </InputWrapper>
      </Field>

      {/* Growth Stage */}
      <Field label="Growth Stage">
        <InputWrapper>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="input"
            required
          >
            <option value="">Select Stage</option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </InputWrapper>
      </Field>

      {/* KC */}
      <Field label="Crop Coefficient (Kc)">
        <ReadonlyPill
          value={
            loadingKc ? "Loading..." : kc || "—"
          }
          unit="Kc"
        />
      </Field>

      {/* Error */}
      {error && (
        <div className="col-span-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="col-span-2">
        <button
          type="submit"
          disabled={!kc}
          className="btn-primary w-full"
        >
          Save Crop
        </button>
      </div>
    </form>
  );
}
