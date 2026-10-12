"use client";

import { AppShell } from "@/components/AppShell";
import { ExcelImport } from "@/components/ExcelImport";
import { useSettings } from "@/lib/settings";
import { useStore } from "@/lib/store";

export default function AdminQuotasPage() {
  const { quotas, markQuotaPaid, importQuotas, members } = useStore();
  const { settings } = useSettings();
  const pending = members.filter((m) => m.quota !== "Em dia");

  return (
    <AppShell title="Tesouraria · Quotas" mode="admin">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-cream/55">
          Quotas e regularizações. Importe a planilha que a tesouraria já usa.
        </p>
        <ExcelImport
          label="Importar Excel de quotas"
          expectedColumns={["periodo", "estado", "valor", "pago_em", "membro"]}
          onRows={(rows) => {
            importQuotas(
              rows.map((r) => ({
                period: r.periodo || r.period || "Importado",
                status: r.estado || r.status || "Pendente",
                amount: r.valor || r.amount || settings.quotaAmount,
                paidAt: r.pago_em || r.paidat || "",
                memberId: r.membro || r.memberid || "",
              }))
            );
          }}
        />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
          <p className="text-xs uppercase tracking-wide text-cream/40">Valor padronizado</p>
          <p className="mt-2 text-xl font-semibold text-gold-bright">{settings.quotaAmount}</p>
          <p className="text-xs text-cream/40">{settings.quotaPeriod}</p>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
          <p className="text-xs uppercase tracking-wide text-cream/40">Pendentes</p>
          <p className="mt-2 text-xl font-semibold text-red-300">{pending.length}</p>
        </div>
        <div className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
          <p className="text-xs uppercase tracking-wide text-cream/40">Em dia</p>
          <p className="mt-2 text-xl font-semibold text-ok">
            {members.filter((m) => m.quota === "Em dia").length}
          </p>
        </div>
      </div>

      <h2 className="font-semibold">Histórico</h2>
      <ul className="mt-3 space-y-2">
        {quotas.map((q) => (
          <li
            key={q.period + (q.memberId || "")}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/12 bg-navy-2/40 px-4 py-3 text-sm"
          >
            <span>
              {q.period} · {q.amount}
              {q.memberId ? ` · ${q.memberId}` : ""}
            </span>
            <span className={q.status === "Pago" ? "text-ok" : "text-red-300"}>{q.status}</span>
            {q.status !== "Pago" && (
              <button
                type="button"
                onClick={() => markQuotaPaid(q.period)}
                className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy"
              >
                Marcar pago
              </button>
            )}
          </li>
        ))}
      </ul>

      <h2 className="mt-8 font-semibold">Associados com quota irregular</h2>
      <ul className="mt-3 space-y-2">
        {pending.length === 0 && (
          <li className="text-sm text-cream/45">Nenhum pendente na amostra actual.</li>
        )}
        {pending.map((m) => (
          <li key={m.id} className="rounded-xl border border-red-400/20 bg-red-500/5 px-4 py-3 text-sm">
            {m.name} · {m.province} · {m.quota}
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
