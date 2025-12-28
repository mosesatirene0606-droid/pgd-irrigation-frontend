export default function AuthShell({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-950 via-green-900 to-black px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),_transparent_60%)]" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/20 shadow-2xl">
        <div className="p-8 sm:p-10">{children}</div>

        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-emerald-600 to-green-700">
          <div className="text-white text-center px-10">
            <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
              DSS
            </div>
            <p className="text-white/80 text-sm">
              Smart irrigation decisions, powered by data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
