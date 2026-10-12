"use client";

import { AppShell } from "@/components/AppShell";
import { useSettings } from "@/lib/settings";
import { useStore } from "@/lib/store";

export default function QuotasPage() {
  const { quotas } = useStore();
  const { settings } = useSettings();
  const ok = quotas.every((q) => q.status === "Pago") || quotas[0]?.status === "Pago";

  return (
    <AppShell title="Quotas">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div
          className={`rounded-2xl border px-5 py-4 ${
            ok ? "border-ok/30 bg-ok/10" : "border-red-400/30 bg-red-500/10"
          }`}
        >
          <p className="text-xs uppercase tracking-wide opacity-70">Situação</p>
          <p className={`text-lg font-semibold ${ok ? "text-ok" : "text-red-300"}`}>
            {ok ? "Em dia" : "Pendente"}
          </p>
        </div>
        <div className="text-sm text-cream/50">
          Valor padronizado: <strong className="text-cream/80">{settings.quotaAmount}</strong> ·{" "}
          {settings.quotaPeriod}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gold/15">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-2 text-[0.65rem] uppercase tracking-[0.1em] text-cream/45">
            <tr>
              <th className="px-5 py-3">Período</th>
              <th className="px-5 py-3">Estado</th>
              <th className="px-5 py-3">Valor</th>
              <th className="px-5 py-3">Pago em</th>
            </tr>
          </thead>
          <tbody>
            {quotas.map((row) => (
              <tr key={row.period} className="border-t border-gold/10 bg-navy-2/40">
                <td className="px-5 py-3.5">{row.period}</td>
                <td className={`px-5 py-3.5 ${row.status === "Pago" ? "text-ok" : "text-red-300"}`}>
                  {row.status}
                </td>
                <td className="px-5 py-3.5">{row.amount}</td>
                <td className="px-5 py-3.5 text-cream/50">{row.paidAt || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-gold/15 bg-navy-2/50 p-6">
        <h2 className="font-semibold">Pagar quota</h2>
        <p className="mt-2 text-sm text-cream/50">
          Em produção: referência Multicaixa. Aqui a tesouraria marca como pago no Admin — e o seu
          cartão digital actualiza o selo.
        </p>
      </div>
    </AppShell>
  );
}
