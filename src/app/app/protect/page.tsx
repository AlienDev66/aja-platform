"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Shield,
  FileWarning,
  Scale,
  Clock,
  ChevronRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

const categories = [
  "Apoio institucional",
  "Independência funcional",
  "Pressões / intimidações",
  "Condições de trabalho",
  "Ética e deontologia",
  "Outro",
];

export default function ProtectPage() {
  const { can } = useAuth();
  const { protect, addProtect } = useStore();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [urgency, setUrgency] = useState<"normal" | "alta" | "urgente">("normal");

  return (
    <AppShell title="Protect">
      <section className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-gold/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(94,200,216,0.12),transparent_50%),linear-gradient(135deg,#0c1a2e,#07111f)]" />
        <div className="relative grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
              <Lock className="h-3.5 w-3.5" />
              Canal confidencial
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight md:text-3xl">
              Defesa do magistrado — com rasto e responsabilidade
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/55">
              Pedidos de apoio institucional, pressão indevida ou defesa da independência. Cada caso
              recebe referência, triagem e linha temporal — só a Direcção autorizada vê o conteúdo.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-6 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
            >
              Novo pedido confidencial
            </button>
          </div>
          <div className="grid gap-3 self-center">
            {[
              { icon: Shield, t: "Confidencialidade", d: "Acesso restrito por cargo" },
              { icon: FileWarning, t: "Numeração", d: "Referência PROT-AAAA-NNN" },
              { icon: Scale, t: "Triagem", d: "Comissão de Defesa + Direcção" },
              { icon: Clock, t: "Linha temporal", d: "Cada mudança de estado fica registada" },
            ].map((x) => (
              <div
                key={x.t}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5"
              >
                <x.icon className="h-4 w-4 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold">{x.t}</p>
                  <p className="text-xs text-cream/45">{x.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <form
          className="mb-8 space-y-3 rounded-2xl border border-gold/25 bg-navy-2/60 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            addProtect({ subject, body, category, urgency });
            setSubject("");
            setBody("");
            setOpen(false);
          }}
        >
          <p className="text-sm font-semibold text-gold-bright">Novo pedido</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as typeof urgency)}
              className="rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
            >
              <option value="normal">Urgência normal</option>
              <option value="alta">Alta</option>
              <option value="urgente">Urgente</option>
            </select>
          </div>
          <input
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Assunto"
            className="w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
          />
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="Descrição (confidencial) — factos, datas, pedidos concretos"
            className="w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
          />
          <div className="flex gap-2">
            <button type="submit" className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy">
              Enviar pedido
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-gold/30 px-5 py-2 text-sm text-gold-bright"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <h3 className="mb-3 font-semibold">Os seus casos</h3>
      <ul className="space-y-3">
        {protect.map((c) => {
          const isOpen = expanded === c.id;
          return (
            <li key={c.id} className="rounded-2xl border border-gold/15 bg-navy-2/55 overflow-hidden">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="flex w-full items-start justify-between gap-3 p-5 text-left"
              >
                <div>
                  <p className="font-mono text-xs text-gold-bright">{c.ref}</p>
                  <h2 className="mt-1 font-semibold">{c.subject}</h2>
                  <p className="mt-1 text-sm text-cream/50">
                    {c.category || "Geral"} · {c.status} · {c.updated}
                    {c.urgency && c.urgency !== "normal" && (
                      <span className="ml-2 text-red-300">· {c.urgency}</span>
                    )}
                  </p>
                </div>
                <ChevronRight
                  className={`mt-1 h-4 w-4 shrink-0 text-cream/40 transition ${isOpen ? "rotate-90" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-gold/10 px-5 pb-5">
                  {c.body && <p className="mt-3 text-sm text-cream/60">{c.body}</p>}
                  <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-wider text-cream/40">
                    Linha temporal
                  </p>
                  <ul className="mt-2 space-y-2">
                    {(c.timeline || []).map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="font-mono text-xs text-cream/35">{t.at}</span>
                        <span className="text-cream/55">{t.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {can("manage_protect") && (
        <Link
          href="/admin/protect"
          className="mt-6 inline-block text-sm font-semibold text-gold-bright hover:underline"
        >
          Gerir pedidos (Admin) →
        </Link>
      )}
    </AppShell>
  );
}
