"use client";

import { CheckCircle2, Vote } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

export default function VotacoesPage() {
  const { user } = useAuth();
  const { votings, castVote } = useStore();
  if (!user) return null;

  return (
    <AppShell title="Votações">
      <p className="mb-6 max-w-2xl text-sm text-cream/55">
        Quando a Direcção convoca assembleia e abre uma votação, aparece aqui. Um voto por associado
        — quórum e resultados em tempo real.
      </p>

      <ul className="space-y-4">
        {votings.map((v) => {
          const voted = v.votedBy.includes(user.memberId);
          const total = v.options.reduce((s, o) => s + o.votes, 0);
          const participation = Math.round((total / v.eligible) * 100);

          return (
            <li
              key={v.id}
              className="overflow-hidden rounded-2xl border border-gold/15 bg-navy-2/55"
            >
              <div className="border-b border-gold/10 px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-cream/40">
                      {v.assembleiaTitle}
                    </p>
                    <h2 className="mt-1 font-semibold">{v.title}</h2>
                    <p className="mt-1 text-sm text-cream/50">{v.description}</p>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
              </div>

              <div className="px-5 py-4">
                {v.status === "aberta" && !voted && (
                  <div className="mb-4 grid gap-2 sm:grid-cols-3">
                    {v.options.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => castVote(v.id, o.id, user.memberId)}
                        className="rounded-xl border border-gold/25 bg-navy px-4 py-3 text-sm font-semibold text-gold-bright transition hover:bg-gold hover:text-navy"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}

                {voted && (
                  <p className="mb-4 inline-flex items-center gap-2 text-sm text-ok">
                    <CheckCircle2 className="h-4 w-4" />
                    O seu voto foi registado
                  </p>
                )}

                {(v.status !== "rascunho" || voted) && (
                  <div className="space-y-2">
                    {v.options.map((o) => {
                      const pct = total ? Math.round((o.votes / total) * 100) : 0;
                      return (
                        <div key={o.id}>
                          <div className="mb-1 flex justify-between text-xs">
                            <span>{o.label}</span>
                            <span className="tabular-nums text-cream/45">
                              {o.votes} · {pct}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
                            <div
                              className="h-full rounded-full bg-gold transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <p className="pt-2 text-xs text-cream/40">
                      Participação {participation}% · quórum {v.quorum}% · {total}/{v.eligible} votos
                    </p>
                  </div>
                )}

                {v.status === "rascunho" && !voted && (
                  <p className="text-sm text-cream/45">
                    Aguarda abertura pela mesa da assembleia.
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {votings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gold/20 p-10 text-center">
          <Vote className="mx-auto h-8 w-8 text-cream/30" />
          <p className="mt-3 text-sm text-cream/45">Sem votações neste momento.</p>
        </div>
      )}
    </AppShell>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    aberta: "bg-ok/15 text-ok",
    encerrada: "bg-cream/10 text-cream/50",
    rascunho: "bg-gold/15 text-gold-bright",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase ${map[status] || ""}`}>
      {status}
    </span>
  );
}
