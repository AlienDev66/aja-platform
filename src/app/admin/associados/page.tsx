"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, Trash2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ExcelImport } from "@/components/ExcelImport";
import { MemberCard } from "@/components/MemberCard";
import { useAuth } from "@/lib/auth";
import { provinces } from "@/lib/aja";
import { useStore } from "@/lib/store";

export default function AssociadosAdminPage() {
  const { can } = useAuth();
  const { members, addMember, importMembers, updateMember, removeMember } = useStore();
  const [q, setQ] = useState("");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [form, setForm] = useState({
    name: "",
    province: "Luanda",
    instance: "1.ª",
    quota: "Em dia",
    email: "",
    title: "Juiz de Direito",
  });

  const filtered = useMemo(
    () =>
      members.filter(
        (m) =>
          m.name.toLowerCase().includes(q.toLowerCase()) ||
          m.province.toLowerCase().includes(q.toLowerCase()) ||
          (m.memberId || "").toLowerCase().includes(q.toLowerCase())
      ),
    [members, q]
  );

  const manage = can("manage_members");

  return (
    <AppShell title="Gestão de associados" mode="admin">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/35" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pesquisar nome, província ou nº…"
            className="w-full rounded-xl border border-gold/20 bg-navy py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        <span className="text-xs text-cream/40">{filtered.length} registos</span>
        <div className="flex rounded-xl border border-gold/20 p-0.5">
          <button
            type="button"
            onClick={() => setView("cards")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
              view === "cards" ? "bg-gold text-navy" : "text-cream/45"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Cartões
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
              view === "table" ? "bg-gold text-navy" : "text-cream/45"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            Tabela
          </button>
        </div>
        {manage && (
          <ExcelImport
            label="Importar Excel"
            expectedColumns={["nome", "provincia", "instancia", "quota", "email", "titulo"]}
            onRows={(rows) => {
              importMembers(
                rows.map((r) => ({
                  name: r.nome || r.name || "Associado",
                  province: r.provincia || r.province || "Luanda",
                  instance: r.instancia || r.instance || "1.ª",
                  quota: r.quota || "Em dia",
                  email: r.email || "",
                  title: r.titulo || r.title || "Juiz de Direito",
                  active: true,
                }))
              );
            }}
          />
        )}
      </div>

      {manage && (
        <form
          className="mb-8 grid gap-3 rounded-2xl border border-gold/20 bg-navy-2/50 p-5 sm:grid-cols-2 lg:grid-cols-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.name.trim()) return;
            addMember({ ...form, active: true });
            setForm({
              name: "",
              province: "Luanda",
              instance: "1.ª",
              quota: "Em dia",
              email: "",
              title: "Juiz de Direito",
            });
          }}
        >
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nome completo"
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm lg:col-span-2"
          />
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Cargo / título"
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          />
          <select
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            value={form.instance}
            onChange={(e) => setForm({ ...form, instance: e.target.value })}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          >
            <option>1.ª</option>
            <option>Relação</option>
            <option>Supremo</option>
          </select>
          <button type="submit" className="rounded-xl bg-gold py-2.5 text-sm font-semibold text-navy">
            Adicionar
          </button>
        </form>
      )}

      {view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              actions={
                manage ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={m.quota}
                      onChange={(e) => updateMember(m.id, { quota: e.target.value })}
                      className="rounded-lg border border-gold/20 bg-navy px-2 py-1 text-[0.65rem]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option>Em dia</option>
                      <option>Pendente</option>
                      <option>Atraso</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remover ${m.name}?`)) removeMember(m.id);
                      }}
                      className="rounded-lg p-1.5 text-red-300 hover:bg-red-500/10"
                      aria-label="Remover"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gold/15">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-navy-2 text-[0.65rem] uppercase tracking-[0.1em] text-cream/45">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Província</th>
                <th className="px-4 py-3">Instância</th>
                <th className="px-4 py-3">Quota</th>
                {manage && <th className="px-4 py-3">Acções</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-t border-gold/10 bg-navy-2/30">
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-cream/55">{m.province}</td>
                  <td className="px-4 py-3 text-cream/55">{m.instance}</td>
                  <td className="px-4 py-3">
                    {manage ? (
                      <select
                        value={m.quota}
                        onChange={(e) => updateMember(m.id, { quota: e.target.value })}
                        className="rounded-lg border border-gold/20 bg-navy px-2 py-1 text-xs"
                      >
                        <option>Em dia</option>
                        <option>Pendente</option>
                        <option>Atraso</option>
                      </select>
                    ) : (
                      m.quota
                    )}
                  </td>
                  {manage && (
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remover ${m.name}?`)) removeMember(m.id);
                        }}
                        className="text-xs font-semibold text-red-300"
                      >
                        Remover
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!manage && (
        <p className="mt-4 text-xs text-cream/40">
          O seu cargo permite consultar associados, mas não alterar registos.
        </p>
      )}
    </AppShell>
  );
}
