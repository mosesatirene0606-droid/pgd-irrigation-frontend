export default function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
      <div className="lg:col-span-2 space-y-4">
        <div className="h-32 rounded-2xl bg-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-200" />
      </div>
      <div className="space-y-4">
        <div className="h-32 rounded-2xl bg-slate-200" />
        <div className="h-48 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
