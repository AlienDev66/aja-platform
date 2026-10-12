"use client";

import { useRef, useState } from "react";
import { FileSpreadsheet, Upload } from "lucide-react";
import * as XLSX from "xlsx";

type Props = {
  label?: string;
  expectedColumns?: string[];
  onRows: (rows: Record<string, string>[]) => void;
};

export function ExcelImport({
  label = "Importar Excel / CSV",
  expectedColumns,
  onRows,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleFile(file: File) {
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: "",
    });
    const rows = json.map((row) => {
      const out: Record<string, string> = {};
      Object.entries(row).forEach(([k, v]) => {
        out[k.trim().toLowerCase()] = String(v).trim();
      });
      return out;
    });
    onRows(rows);
    setMsg(`${rows.length} linhas importadas de “${file.name}”`);
    setTimeout(() => setMsg(null), 4000);
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-gold-bright transition hover:bg-gold/10"
      >
        <Upload className="h-3.5 w-3.5" />
        {label}
        <FileSpreadsheet className="h-3.5 w-3.5 opacity-60" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = "";
        }}
      />
      {expectedColumns && (
        <p className="text-[0.65rem] text-cream/35">
          Colunas: {expectedColumns.join(", ")}
        </p>
      )}
      {msg && <p className="text-[0.7rem] text-ok">{msg}</p>}
    </div>
  );
}
