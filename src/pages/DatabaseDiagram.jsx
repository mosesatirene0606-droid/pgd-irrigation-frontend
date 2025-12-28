import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Download,
  ChevronDown,
  FileImage,
  FileText,
} from "lucide-react";
import API from "../api/client";
import Card from "../components/ui/Card";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export default function DatabaseDiagram() {
  const [schema, setSchema] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/admin/schema-relations")
      .then((res) => setSchema(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  function exportAsImage() {
    const node = document.getElementById("schema-capture");
    if (!node) return;

    htmlToImage.toPng(node).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "database_schema.png";
      link.href = dataUrl;
      link.click();
    });
  }

  function exportAsPDF() {
    const node = document.getElementById("schema-capture");
    if (!node) return;

    htmlToImage.toPng(node).then((img) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save("database_schema.pdf");
    });
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <Card title="Database Schema & Relationships">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-emerald-700">
            <Database className="size-5" />
            <span className="text-sm font-medium">
              Tables & Foreign Key Relationships
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportAsImage}
              className="
                flex items-center gap-2 px-3 py-2 rounded-xl
                bg-slate-100 hover:bg-slate-200
                text-slate-700 text-sm
              ">
              <FileImage className="size-4" />
              Image
            </button>

            <button
              onClick={exportAsPDF}
              className="
                flex items-center gap-2 px-3 py-2 rounded-xl
                bg-emerald-600 hover:bg-emerald-700
                text-white text-sm shadow
              ">
              <FileText className="size-4" />
              PDF
            </button>
          </div>
        </div>

        {/* Schema */}
        <div id="schema-capture" className="space-y-4">
          {loading && (
            <div className="text-sm text-slate-500">Loading schema…</div>
          )}

          {!loading && schema.length === 0 && (
            <div className="text-sm text-slate-500">
              No schema data available
            </div>
          )}

          {schema.map((table) => (
            <motion.div
              key={table.table}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="
                overflow-hidden rounded-2xl
                border border-slate-200
                bg-white/70 backdrop-blur
              ">
              {/* Table Header */}
              <button
                onClick={() =>
                  setExpanded(expanded === table.table ? null : table.table)
                }
                className="
                  w-full flex items-center justify-between
                  px-4 py-3
                  bg-gradient-to-r from-emerald-50 to-transparent
                  text-left
                ">
                <span className="font-semibold text-emerald-900">
                  {table.table}
                </span>

                <ChevronDown
                  className={`size-5 transition-transform ${
                    expanded === table.table ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Table Body */}
              <AnimatePresence>
                {expanded === table.table && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 pb-4 text-sm">
                    {/* Columns */}
                    <div className="mt-3 space-y-1">
                      <div className="text-xs uppercase text-slate-400 mb-1">
                        Columns
                      </div>

                      {table.columns.map((c) => (
                        <div
                          key={c.column_name}
                          className="flex justify-between font-mono">
                          <span>{c.column_name}</span>
                          <span className="text-slate-500">{c.data_type}</span>
                        </div>
                      ))}
                    </div>

                    {/* Relationships */}
                    {table.foreignKeys?.length > 0 && (
                      <div className="mt-4 rounded-xl bg-slate-50 p-3">
                        <div className="text-xs uppercase text-slate-400 mb-2">
                          Relationships
                        </div>

                        {table.foreignKeys.map((fk, i) => (
                          <div key={i} className="text-sm">
                            🔗{" "}
                            <span className="font-mono">{fk.column_name}</span>{" "}
                            →{" "}
                            <span className="font-mono">
                              {fk.referenced_table}.{fk.referenced_column}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
