"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ExcelImport } from "@/components/ExcelImport";
import { useStore } from "@/lib/store";

export default function AdminVotacoesPage() {
  const { votings, assembleias, addVoting, openVoting, closeVoting } = useStore();
  const [form, setForm] = useState({
    title: "",
    assembleiaTitle: assembleias[0]?.title || "Assembleia Geral",
    description: "",
    opensAt: "",
    closesAt: "",
    options: "Aprovar, Rejeitar, Abstenção",
    quorum: 50,
    eligible: 300,
  });

  return (
    <AppShell title="Votações · Assembleia" mode="admin">
      <p className="mb-6 max-w-2xl text-sm text-cream/55">
        Fluxo: convocar assembleia (Eventos) → criar votação aqui → abrir no dia → associados votam
        na área reservada → encerrar e arquivar resultado.
      </p>

      <form
        className="mb-8 space-y-3 rounded-2xl border border-gold/20 bg-navy-2/50 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.title || !form.opensAt) return;
          addVoting({
            title: form.title,
            assembleiaTitle: form.assembleiaTitle,
            description: form.description,
            status: "rascunho",
            opensAt: form.opensAt,
            closesAt: form.closesAt || form.opensAt,
            options: form.options.split(",").map((s) => s.trim()).filter(Boolean),
            quorum: form.quorum,
            eligible: form.eligible,
          });
          setForm({ ...form, title: "", description: "", opensAt: "", closesAt: "" });
        }}
      >
        <p className="text-sm font-semibold text-gold-bright">Nova votação (após convocatória)</p>
        <div className="grid gap-3 md:grid-cols-2">
          <input
            required
            placeholder="Título da deliberação"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm md:col-span-2"
          />
          <select
            value={form.assembleiaTitle}
            onChange={(e) => setForm({ ...form, assembleiaTitle: e.target.value })}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          >
            {assembleias.map((a) => (
              <option key={a.id}>{a.title}</option>
            ))}
            <option>Assembleia Extraordinária</option>
          </select>
          <input
            placeholder="Opções (separadas por vírgula)"
            value={form.options}
            onChange={(e) => setForm({ ...form, options: e.target.value })}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          />
          <input
            required
            type="datetime-local"
            value={form.opensAt}
            onChange={(e) => setForm({ ...form, opensAt: e.target.value })}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          />
          <input
            type="datetime-local"
            value={form.closesAt}
            onChange={(e) => setForm({ ...form, closesAt: e.target.value })}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
          />
          <textarea
            placeholder="Descrição / enquadramento estatutário"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm md:col-span-2"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy">
            Criar votação
          </button>
          <ExcelImport
            label="Importar deliberações Excel"
            expectedColumns={["titulo", "assembleia", "opcoes", "quorum"]}
            onRows={(rows) => {
              rows.forEach((r) => {
                addVoting({
                  title: r.titulo || r.title || "Deliberação",
                  assembleiaTitle: r.assembleia || form.assembleiaTitle,
                  description: r.descricao || "",
                  status: "rascunho",
                  opensAt: r.abre || new Date().toISOString().slice(0, 16),
                  closesAt: r.fecha || new Date().toISOString().slice(0, 16),
                  options: (r.opcoes || "Aprovar, Rejeitar, Abstenção")
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                  quorum: Number(r.quorum || 50) || 50,
                  eligible: Number(r.elegiveis || 300) || 300,
                });
              });
            }}
          />
        </div>
      </form>

      <ul className="space-y-3">
        {votings.map((v) => {
          const total = v.options.reduce((s, o) => s + o.votes, 0);
          return (
            <li
              key={v.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/15 bg-navy-2/50 px-5 py-4"
            >
              <div>
                <p className="font-semibold">{v.title}</p>
                <p className="text-sm text-cream/50">
                  {v.assembleiaTitle} · {v.status} · {total} votos
                </p>
              </div>
              <div className="flex gap-2">
                {v.status === "rascunho" && (
                  <button
                    type="button"
                    onClick={() => openVoting(v.id)}
                    className="rounded-full bg-ok/20 px-4 py-2 text-xs font-semibold text-ok"
                  >
                    Abrir votação
                  </button>
                )}
                {v.status === "aberta" && (
                  <button
                    type="button"
                    onClick={() => closeVoting(v.id)}
                    className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-navy"
                  >
                    Encerrar
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
