import { AppShell } from "@/components/AppShell";
import { courses, library } from "@/lib/data";

export default function AcademyPage() {
  return (
    <AppShell title="Academy">
      <h1 className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight">
        Formação contínua
      </h1>
      <p className="mt-2 max-w-xl text-sm text-cream/50">
        Ética, capacitação tecnológica, independência e imagem pública — com certificados digitais.
      </p>

      <div className="mt-8 space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-gold/15 bg-navy-2/55 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{c.title}</h2>
                <p className="mt-1 text-xs text-cream/45">{c.hours}h · formação AJA</p>
              </div>
              {c.cert ? (
                <span className="rounded-full bg-ok/15 px-3 py-1 text-xs font-semibold text-ok">
                  Certificado
                </span>
              ) : (
                <button
                  type="button"
                  className="rounded-full border border-gold/30 px-3 py-1 text-xs font-semibold text-gold-bright"
                >
                  {c.progress === 0 ? "Inscrever" : "Continuar"}
                </button>
              )}
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${c.progress}%` }} />
            </div>
            <p className="mt-1.5 text-xs text-cream/40">{c.progress}%</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-semibold">Biblioteca jurídica</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {library.map((doc) => (
          <li
            key={doc.title}
            className="flex items-center justify-between rounded-xl border border-gold/12 bg-navy-2/40 px-4 py-4"
          >
            <div>
              <p className="font-medium">{doc.title}</p>
              <p className="text-xs text-cream/40">
                {doc.type} · {doc.updated}
              </p>
            </div>
            <button type="button" className="text-xs font-semibold text-gold-bright">
              Abrir
            </button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
