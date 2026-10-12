"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ExcelImport } from "@/components/ExcelImport";
import { formatKz, useStore } from "@/lib/store";

export default function AdminFinancasPage() {
  const { finances, addFinance, importFinances } = useStore();
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: "receita" as "receita" | "despesa",
    category: "Quotas",
    description: "",
    amount: "",
    method: "Transferência",
    ref: "",
  });

  const receita = finances.filter((f) => f.type === "receita").reduce((s, f) => s + f.amount, 0);
  const despesa = finances.filter((f) => f.type === "despesa").reduce((s, f) => s + f.amount, 0);

  return (
    <AppShell title="Área financeira" mode="admin">
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
          <p className="text-xs uppercase text-cream/40">Receitas</p>
          <p className="mt-2 text-xl font-semibold text-ok">{formatKz(receita)}</p>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
          <p className="text-xs uppercase text-cream/40">Despesas</p>
          <p className="mt-2 text-xl font-semibold text-red-300">{formatKz(despesa)}</p>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
          <p className="text-xs uppercase text-cream/40">Saldo</p>
          <p className="mt-2 text-xl font-semibold text-gold-bright">
            {formatKz(receita - despesa)}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold">Registar movimento</h2>
        <ExcelImport
          label="Importar planilha Excel"
          expectedColumns={["data", "tipo", "categoria", "descricao", "valor", "metodo"]}
          onRows={(rows) => {
            importFinances(
              rows.map((r) => ({
                date: r.data || r.date || new Date().toISOString().slice(0, 10),
                type: (r.tipo || r.type || "despesa").toLowerCase().includes("rec")
                  ? "receita"
                  : "despesa",
                category: r.categoria || r.category || "Geral",
                description: r.descricao || r.description || "Importado",
                amount: Number(String(r.valor || r.amount || "0").replace(/\D/g, "")) || 0,
                method: r.metodo || r.method || "Transferência",
                ref: r.ref || "",
              }))
            );
          }}
        />
      </div>

      <form
        className="mb-8 grid gap-3 rounded-2xl border border-gold/20 bg-navy-2/50 p-5 md:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.description || !form.amount) return;
          addFinance({
            date: form.date,
            type: form.type,
            category: form.category,
            description: form.description,
            amount: Number(form.amount),
            method: form.method,
            ref: form.ref,
          });
          setForm({ ...form, description: "", amount: "", ref: "" });
        }}
      >
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as "receita" | "despesa" })}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
        >
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
        >
          <option>Quotas</option>
          <option>Eventos</option>
          <option>Formação</option>
          <option>Institucional</option>
          <option>Outros</option>
        </select>
        <input
          required
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm md:col-span-2"
        />
        <input
          required
          type="number"
          placeholder="Valor (Kz)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
        />
        <input
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          placeholder="Método"
        />
        <input
          value={form.ref}
          onChange={(e) => setForm({ ...form, ref: e.target.value })}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          placeholder="Referência"
        />
        <button type="submit" className="rounded-xl bg-gold py-2.5 text-sm font-semibold text-navy">
          Registar
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-gold/15">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-navy-2 text-[0.65rem] uppercase tracking-wider text-cream/45">
            <tr>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Valor</th>
            </tr>
          </thead>
          <tbody>
            {finances.map((f) => (
              <tr key={f.id} className="border-t border-gold/10">
                <td className="px-4 py-3 text-cream/55">{f.date}</td>
                <td className="px-4 py-3">
                  {f.description}
                  {f.ref && <span className="ml-2 text-xs text-cream/35">{f.ref}</span>}
                </td>
                <td className="px-4 py-3 text-cream/55">{f.category}</td>
                <td
                  className={`px-4 py-3 font-semibold tabular-nums ${
                    f.type === "receita" ? "text-ok" : "text-red-300"
                  }`}
                >
                  {f.type === "receita" ? "+" : "−"}
                  {formatKz(f.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
