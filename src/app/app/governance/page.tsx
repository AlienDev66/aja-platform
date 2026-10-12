import { AppShell } from "@/components/AppShell";
import { assembleias } from "@/lib/data";

export default function GovernancePage() {
  return (
    <AppShell title="Governação">
      <h1 className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight">
        Assembleias e deliberações
      </h1>
      <p className="mt-2 text-sm text-cream/50">
        Convocatórias, ordens de trabalhos, atas e documentos — com arquivo permanente.
      </p>

      <ul className="mt-8 space-y-4">
        {assembleias.map((a) => (
          <li key={a.id} className="rounded-2xl border border-gold/15 bg-navy-2/55 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{a.status}</p>
                <h2 className="mt-1 text-lg font-semibold">{a.title}</h2>
                <p className="mt-1 text-sm text-cream/45">{a.date}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {a.docs.map((d) => (
                <button
                  key={d}
                  type="button"
                  className="rounded-full border border-gold/20 px-3 py-1.5 text-xs font-semibold text-cream/70 transition hover:border-gold/40 hover:text-cream"
                >
                  {d}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-dashed border-gold/25 p-6">
        <h3 className="font-semibold">Votações associativas</h3>
        <p className="mt-2 text-sm text-cream/50">
          Quando os estatutos o permitirem — voto electrónico autenticado, com quorum e acta
          automática.
        </p>
      </div>
    </AppShell>
  );
}
