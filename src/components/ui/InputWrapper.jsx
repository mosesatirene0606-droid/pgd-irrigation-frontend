export default function InputWrapper({ children }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 rounded-xl bg-emerald-400/10 opacity-0 group-focus-within:opacity-100 transition pointer-events-none" />
      {children}
    </div>
  );
}
