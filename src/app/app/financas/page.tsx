"use client";

import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { formatKz, useStore } from "@/lib/store";

export default function FinancasPage() {
  const { can } = useAuth();
  const { finances, quotas } = useStore();

  const receita = finances.filter((f) => f.type === "receita").reduce((s, f) => s + f.amount, 0);
  const despesa = finances.filter((f) => f.type === "despesa").reduce((s, f) => s + f.amount, 0);
  const saldo = receita - despesa;
  const visible = can("view_quotas_all") || can("manage_quotas") ? finances : finances.slice(0, 3);

  return (
    <AppShell title="Finanças">
      <p className="mb-6 max-w-2xl text-sm text-cream/55">
        Visão da tesouraria associativa: quotas, receitas e despesas. Associados veem o essencial;
        Tesoureiro e Direcção gerem o detalhe no Admin.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Tile
          icon={ArrowDownLeft}
          label="Receitas"
          value={formatKz(receita)}
          tone="ok"
        />
        <Tile
          icon={ArrowUpRight}
          label="Despesas"
          value={formatKz(despesa)}
          tone="warn"
        />
        <Tile icon={Wallet} label="Saldo" value={formatKz(saldo)} tone="gold" />
      </div>

      <div className="mb-8 rounded-2xl border border-gold/15 bg-navy-2/50 p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-cream/40">
          As suas quotas
        </p>
        <ul className="mt-3 space-y-2">
          {quotas.slice(0, 4).map((q) => (
            <li key={q.period} className="flex justify-between text-sm">
              <span>
                {q.period} · {q.amount}
              </span>
              <span className={q.status === "Pago" ? "text-ok" : "text-red-300"}>{q.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="mb-3 font-semibold">Movimentos recentes</h3>
      <ul className="space-y-2">
        {visible.map((f) => (
          <li
            key={f.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/12 bg-navy-2/40 px-4 py-3 text-sm"
          >
            <div>
              <p className="font-medium">{f.description}</p>
              <p className="text-xs text-cream/40">
                {f.date} · {f.category} · {f.method}
              </p>
            </div>
            <p
              className={`font-semibold tabular-nums ${
                f.type === "receita" ? "text-ok" : "text-red-300"
              }`}
            >
              {f.type === "receita" ? "+" : "−"}
              {formatKz(f.amount)}
            </p>
          </li>
        ))}
      </ul>

      {can("manage_quotas") && (
        <a
          href="/admin/financas"
          className="mt-6 inline-block text-sm font-semibold text-gold-bright hover:underline"
        >
          Gerir finanças (Admin) →
        </a>
      )}
    </AppShell>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "ok" | "warn" | "gold";
}) {
  const colors = {
    ok: "text-ok",
    warn: "text-red-300",
    gold: "text-gold-bright",
  };
  return (
    <div className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5">
      <div className="flex items-center gap-2 text-cream/40">
        <Icon className="h-4 w-4" />
        <p className="text-[0.65rem] font-semibold uppercase">{label}</p>
      </div>
      <p className={`mt-3 text-xl font-semibold tabular-nums ${colors[tone]}`}>{value}</p>
    </div>
  );
}
