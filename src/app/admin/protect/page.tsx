"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ExcelImport } from "@/components/ExcelImport";
import { useStore } from "@/lib/store";

const statuses = ["Recebido", "Em análise", "Encaminhado", "Concluído"];

export default function AdminProtectPage() {
  const { protect, updateProtectStatus, addProtect } = useStore();
  const [filter, setFilter] = useState("todos");
  const [note, setNote] = useState<Record<string, string>>({});

  const filtered =
    filter === "todos" ? protect : protect.filter((p) => p.status === filter);

  return (
    <AppShell title="Protect · gestão" mode="admin">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="max-w-xl text-sm text-cream/55">
            Triagem de pedidos confidenciais. Actualize o estado e deixe nota na linha temporal —
            o associado vê o progresso sem expor detalhes internos.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["todos", ...statuses].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                  filter === s
                    ? "bg-gold text-navy"
                    : "border border-gold/25 text-gold-bright"
                }`}
              >
                {s}
                {s !== "todos" && (
                  <span className="ml-1 opacity-60">
                    ({protect.filter((p) => p.status === s).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        <ExcelImport
          label="Importar registos Excel"
          expectedColumns={["assunto", "categoria", "urgencia", "corpo"]}
          onRows={(rows) => {
            rows.forEach((r) => {
              addProtect({
                subject: r.assunto || r.subject || "Pedido importado",
                body: r.corpo || r.body || "",
                category: r.categoria || r.category || "Geral",
                urgency: (r.urgencia || "normal") as "normal" | "alta" | "urgente",
              });
            });
          }}
        />
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {statuses.map((s) => (
          <div key={s} className="rounded-xl border border-gold/12 bg-navy-2/50 px-4 py-3">
            <p className="text-[0.6rem] uppercase tracking-wider text-cream/40">{s}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {protect.filter((p) => p.status === s).length}
            </p>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {filtered.map((c) => (
          <li key={c.id} className="rounded-2xl border border-gold/15 bg-navy-2/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-gold-bright">{c.ref}</p>
                <h2 className="mt-1 font-semibold">{c.subject}</h2>
                <p className="mt-1 text-xs text-cream/40">
                  {c.category} · urgência {c.urgency || "normal"}
                </p>
                {c.body && <p className="mt-2 text-sm text-cream/55">{c.body}</p>}
              </div>
              <select
                value={c.status}
                onChange={(e) =>
                  updateProtectStatus(c.id, e.target.value, note[c.id] || undefined)
                }
                className="rounded-xl border border-gold/25 bg-navy px-3 py-2 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                value={note[c.id] || ""}
                onChange={(e) => setNote({ ...note, [c.id]: e.target.value })}
                placeholder="Nota na linha temporal (opcional)"
                className="min-w-[200px] flex-1 rounded-xl border border-gold/15 bg-navy px-3 py-2 text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (note[c.id]) updateProtectStatus(c.id, c.status, note[c.id]);
                  setNote({ ...note, [c.id]: "" });
                }}
                className="rounded-full border border-gold/25 px-3 py-2 text-xs font-semibold text-gold-bright"
              >
                Registar nota
              </button>
            </div>
            {c.timeline && c.timeline.length > 0 && (
              <ul className="mt-4 space-y-1 border-t border-gold/10 pt-3">
                {c.timeline.slice(0, 4).map((t, i) => (
                  <li key={i} className="flex gap-3 text-xs text-cream/45">
                    <span className="font-mono">{t.at}</span>
                    <span>{t.note}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
