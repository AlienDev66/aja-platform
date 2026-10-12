import { AppShell } from "@/components/AppShell";
import { members, eventos, comunicados, provinces, courses } from "@/lib/aja";

export default function IntelligencePage() {
  const wa = comunicados.filter((c) => c.channels.includes("whatsapp")).length;
  const quotaOk = members.filter((m) => m.quota === "Em dia").length;

  return (
    <AppShell title="Intelligence" mode="admin">
      <p className="mb-8 text-sm text-cream/55">
        Indicadores agregados da vida associativa — zero dados processuais.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Associados (amostra)", v: String(members.length) },
          { l: "Quotas em dia", v: `${Math.round((quotaOk / members.length) * 100)}%` },
          { l: "Eventos activos", v: String(eventos.length) },
          { l: "Comunicados → WA", v: String(wa) },
          { l: "Províncias na rede", v: String(provinces.length) },
          { l: "Cursos Academy", v: String(courses.length) },
          { l: "Inscrições eventos", v: String(eventos.reduce((a, e) => a + e.enrolled, 0)) },
          { l: "Certificados emitidos", v: String(courses.filter((c) => c.cert).length) },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cream/40">
              {s.l}
            </p>
            <p className="mt-2 text-2xl font-semibold text-gold-bright">{s.v}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-semibold">Cobertura provincial (representantes)</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {provinces.map((p) => (
          <span
            key={p}
            className="rounded-full border border-gold/20 bg-navy-2/50 px-3 py-1.5 text-xs text-cream/70"
          >
            {p}
          </span>
        ))}
      </div>
    </AppShell>
  );
}
