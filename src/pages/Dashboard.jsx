import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api/client";
import StatCard from "../components/ui/StatCard";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";
import Card from "../components/ui/Card";
import QuickActions from "../components/QuickActions";
import { ThermometerSun, Droplets, CalendarClock } from "lucide-react";

export default function Dashboard({ setScreen }) {
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [sumRes, recentRes] = await Promise.all([
        API.get("/api/dashboard/summary"),
        API.get("/api/estimations/recent"),
      ]);

      setSummary(sumRes.data ?? {});
      setRecent(recentRes.data ?? []);
      setNotifications(sumRes.data?.notifications ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <DashboardSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={ThermometerSun}
            label="ET₀"
            value={summary.et0}
            unit="mm/day"
          />
          <StatCard
            icon={Droplets}
            label="Soil Moisture"
            value={summary.soilMoisture}
            unit="%"
          />
          <StatCard
            icon={CalendarClock}
            label="Next Irrigation"
            value={summary.nextIrrigation}
            unit=""
          />
        </div>

        <Card title="Recent Estimations">
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  <th>Date</th>
                  <th>Crop</th>
                  <th>ET₀</th>
                  <th>Water Need</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recent.map((row) => (
                  <tr key={row.id}>
                    <td>{new Date(row.weather_date).toLocaleDateString()}</td>
                    <td>{row.crop_name}</td>
                    <td>{row.et0_mm}</td>
                    <td>{row.water_need_lm2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <QuickActions setScreen={setScreen} />

        <Card title="Notifications">
          {notifications.length === 0 && <div>No notifications</div>}
          {notifications.map((n) => (
            <div key={n.id}>
              <div>{n.message}</div>
              <div className="text-xs">
                {new Date(n.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </motion.div>
  );
}
