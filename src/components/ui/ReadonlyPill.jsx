export default function ReadonlyPill({ value, unit }) {
  return (
    <div className="relative">
      <input
        readOnly
        value={value || ""}
        placeholder="Auto-calculated"
        className="input pr-16 bg-slate-100 text-right font-semibold text-emerald-700 cursor-not-allowed"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-lg">
        {unit}
      </span>
    </div>
  );
}
