import ActionCard from "./ui/ActionCard";
import Card from "./ui/Card";
import { PlusCircle, CloudUpload, FileText } from "lucide-react";

export default function QuickActions({ setScreen }) {
  async function exportCsv() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/estimations/export", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "estimations.csv";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to export CSV");
      console.error(err);
    }
  }

  return (
    <Card title="Quick Actions">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard
          icon={PlusCircle}
          title="New Estimation"
          description=""
          onClick={() => setScreen("new-estimation")}
        />

        <ActionCard
          icon={CloudUpload}
          title="Upload Weather"
          description=""
          onClick={() => setScreen("weather")}
        />

        <ActionCard
          icon={FileText}
          title="Export Report"
          description=""
          onClick={exportCsv}
        />
      </div>
    </Card>
  );
}
