export default function UnitInput({ unit, ...props }) {
  return (
    <div className="relative">
      <input {...props} className="input pr-14 text-right relative z-10" />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-lg pointer-events-none">
        {unit}
      </span>
    </div>
  );
}
