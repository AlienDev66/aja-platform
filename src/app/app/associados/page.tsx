"use client";

import { useMemo, useState } from "react";
import { Search, Users, LayoutGrid, MapPin } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { MemberCard } from "@/components/MemberCard";
import { provinces } from "@/lib/aja";
import { useStore } from "@/lib/store";

export default function AssociadosDirectoryPage() {
  const { members } = useStore();
  const [q, setQ] = useState("");
  const [province, setProvince] = useState("Todas");
  const [instance, setInstance] = useState("Todas");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchQ =
        !q ||
        m.name.toLowerCase().includes(q.toLowerCase()) ||
        (m.title || "").toLowerCase().includes(q.toLowerCase()) ||
        (m.memberId || "").toLowerCase().includes(q.toLowerCase());
      const matchP = province === "Todas" || m.province === province;
      const matchI = instance === "Todas" || m.instance === instance;
      return matchQ && matchP && matchI;
    });
  }, [members, q, province, instance]);

  const byProvince = useMemo(() => {
    const map = new Map<string, number>();
    members.forEach((m) => map.set(m.province, (map.get(m.province) || 0) + 1));
    return map;
  }, [members]);

  return (
    <AppShell title="Associados">
      <section className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-gold/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(94,200,216,0.12),transparent_45%),linear-gradient(120deg,#12253f,#07111f)]" />
        <div className="relative flex flex-wrap items-end justify-between gap-6 p-6 md:p-8">
          <div>
            <p className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
              <Users className="h-3.5 w-3.5" />
              Rede nacional
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight">
              Associados da AJA
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/55">
              Directório interno — magistrados por província e instância. Em produção, a lista
              completa vem do cadastro oficial.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Na lista" value={String(members.length)} />
            <MiniStat label="Províncias" value={String(byProvince.size)} />
            <MiniStat
              label="Em dia"
              value={String(members.filter((m) => m.quota === "Em dia").length)}
            />
          </div>
        </div>
      </section>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/35" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pesquisar nome, cargo ou nº…"
            className="w-full rounded-xl border border-gold/20 bg-navy py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-gold/40"
          />
        </div>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
        >
          <option>Todas</option>
          {provinces.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select
          value={instance}
          onChange={(e) => setInstance(e.target.value)}
          className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
        >
          <option>Todas</option>
          <option>1.ª</option>
          <option>Relação</option>
          <option>Supremo</option>
        </select>
        <span className="inline-flex items-center gap-1.5 text-xs text-cream/40">
          <LayoutGrid className="h-3.5 w-3.5" />
          {filtered.length} cartões
        </span>
      </div>

      {/* Province chips */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setProvince("Todas")}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
            province === "Todas" ? "bg-gold text-navy" : "border border-gold/20 text-cream/50"
          }`}
        >
          Todas
        </button>
        {[...byProvince.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([p, n]) => (
            <button
              key={p}
              type="button"
              onClick={() => setProvince(p)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                province === p
                  ? "bg-gold text-navy"
                  : "border border-gold/20 text-cream/50 hover:border-gold/40"
              }`}
            >
              <MapPin className="h-3 w-3" />
              {p}
              <span className="opacity-60">{n}</span>
            </button>
          ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gold/20 py-16 text-center">
          <Users className="mx-auto h-8 w-8 text-cream/25" />
          <p className="mt-3 text-sm text-cream/45">Nenhum associado com estes filtros.</p>
        </div>
      )}
    </AppShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[4.5rem] rounded-xl border border-white/10 bg-black/25 px-3 py-2.5 text-center">
      <p className="text-lg font-semibold tabular-nums text-gold-bright">{value}</p>
      <p className="text-[0.58rem] uppercase tracking-wider text-cream/40">{label}</p>
    </div>
  );
}
