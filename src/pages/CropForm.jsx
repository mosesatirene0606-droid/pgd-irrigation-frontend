import { useEffect, useState } from "react";
import API from "../api/client";
import Field from "../components/ui/Field";
import InputWrapper from "../components/ui/InputWrapper";
import ReadonlyPill from "../components/ui/ReadonlyPill";

export default function CropForm({ onSuccess }) {
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [stage, setStage] = useState("");
  const [kc, setKc] = useState("");

  useEffect(() => {
    if (!state || !crop || !stage) return;

    API.get("/api/kc", { params: { state, crop, stage } })
      .then((res) => setKc(res.data.kc))
      .catch(() => setKc(""));
  }, [state, crop, stage]);

  async function submit(e) {
    e.preventDefault();
    await API.post("/api/crops", { state, name: crop, growth_stage: stage });
    alert("Crop saved");
    onSuccess?.();
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-3xl mx-auto p-6 grid grid-cols-2 gap-5">
      <Field label="State">
        <InputWrapper>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="input"
          />
        </InputWrapper>
      </Field>

      <Field label="Crop">
        <InputWrapper>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="input"
          />
        </InputWrapper>
      </Field>

      <Field label="Growth Stage">
        <InputWrapper>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="input"
          />
        </InputWrapper>
      </Field>

      <Field label="Crop Coefficient">
        <ReadonlyPill value={kc} unit="Kc" />
      </Field>

      <button type="submit" disabled={!kc}>
        Save Crop
      </button>
    </form>
  );
}
