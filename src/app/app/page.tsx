"use client";

import Link from "next/link";
import {
  CalendarDays,
  CreditCard,
  Megaphone,
  Shield,
  Vote,
  Wallet,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { formatKz, useStore } from "@/lib/store";

export default function AppHomePage() {
  const { user, roleLabel, can } = useAuth();
  const { comunicados, eventos, courses, quotas, votings, finances, protect } = useStore();
  if (!user) return null;

  const nextEvent = eventos[0];
  const course = courses.find((c) => c.progress > 0 && c.progress < 100) ?? courses[1];
  const quotaOk = quotas[0]?.status === "Pago";
  const openVotes = votings.filter((v) => v.status === "aberta");
  const myOpenVote = openVotes.find((v) => !v.votedBy.includes(user.memberId));
  const receita = finances.filter((f) => f.type === "receita").reduce((s, f) => s + f.amount, 0);
  const despesa = finances.filter((f) => f.type === "despesa").reduce((s, f) => s + f.amount, 0);
  const protectOpen = protect.filter((p) => p.status !== "Concluído").length;

  return (
    <AppShell title="Painel">
      {/* Hero operacional */}
      <section className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-gold/25 bg-gradient-to-br from-[#1a3355] via-navy-2 to-navy">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(94,200,216,0.18),transparent_40%),radial-gradient(ellipse_at_10%_90%,rgba(184,161,120,0.15),transparent_45%)]" />
        <div className="relative grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-bright">
              {roleLabel} · sessão activa
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
              Olá, {user.name.split(" ")[0]}
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/55">
              {user.title} · {user.province} · {user.memberId}. O que importa agora para a AJA e
              para si.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/app/cartao"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
              >
                <CreditCard className="h-4 w-4" />
                Cartão digital
              </Link>
              {myOpenVote && (
                <Link
                  href="/app/votacoes"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 py-2.5 text-sm font-semibold text-cyan"
                >
                  <Vote className="h-4 w-4" />
                  Votar agora
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-end">
            <Stat
              label="Quota"
              value={quotaOk ? "Em dia" : "Pendente"}
              tone={quotaOk ? "ok" : "warn"}
              href="/app/quotas"
            />
            <Stat
              label="Próximo evento"
              value={nextEvent?.date?.slice(5) || "—"}
              sub={nextEvent?.title}
              href="/app/eventos"
            />
            <Stat
              label="Votações abertas"
              value={String(openVotes.length)}
              href="/app/votacoes"
            />
            <Stat
              label="Protect activos"
              value={String(protectOpen)}
              href="/app/protect"
            />
          </div>
        </div>
      </section>

      {/* Acção urgente */}
      {(myOpenVote || !quotaOk) && (
        <section className="mb-8 grid gap-3 md:grid-cols-2">
          {myOpenVote && (
            <Link
              href="/app/votacoes"
              className="group flex items-start gap-4 rounded-2xl border border-cyan/30 bg-cyan/5 p-5 transition hover:bg-cyan/10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                <Vote className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-cyan">
                  Acção necessária
                </p>
                <p className="mt-1 font-semibold">{myOpenVote.title}</p>
                <p className="mt-1 text-sm text-cream/50">{myOpenVote.assembleiaTitle}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-cyan opacity-60 group-hover:opacity-100" />
            </Link>
          )}
          {!quotaOk && (
            <Link
              href="/app/quotas"
              className="group flex items-start gap-4 rounded-2xl border border-red-400/25 bg-red-500/5 p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-300">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-red-300">
                  Quota
                </p>
                <p className="mt-1 font-semibold">Regularize para manter o cartão activo</p>
                <p className="mt-1 text-sm text-cream/50">O selo do cartão reflecte a tesouraria.</p>
              </div>
            </Link>
          )}
        </section>
      )}

      <div className="grid gap-4 lg:grid-cols-12">
        {/* Cartão preview */}
        <Link
          href="/app/cartao"
          className="relative overflow-hidden rounded-[1.5rem] border border-gold/35 bg-gradient-to-br from-[#1e3a5f] to-[#07111f] p-6 lg:col-span-5"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
          <div className="flex items-center justify-between">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-bright">
              Cartão de associado
            </p>
            {quotaOk ? (
              <CheckCircle2 className="h-4 w-4 text-ok" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-300" />
            )}
          </div>
          <p className="mt-8 font-[family-name:var(--font-syne)] text-2xl font-semibold leading-tight">
            {user.name}
          </p>
          <p className="mt-2 font-mono text-sm text-cream/45">{user.memberId}</p>
          <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-4">
            <p className={`text-sm font-semibold ${quotaOk ? "text-ok" : "text-red-300"}`}>
              {quotaOk ? "Quota regularizada" : "Quota pendente"}
            </p>
            <span className="text-xs text-cream/35">Abrir →</span>
          </div>
        </Link>

        {/* Evento + Academy + Finanças snapshot */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <Link
            href="/app/eventos"
            className="rounded-2xl border border-gold/15 bg-navy-2/70 p-5 transition hover:border-gold/30"
          >
            <div className="flex items-center gap-2 text-cream/40">
              <CalendarDays className="h-4 w-4" />
              <p className="text-[0.65rem] font-semibold uppercase">Próximo evento</p>
            </div>
            <p className="mt-3 font-semibold">{nextEvent?.title}</p>
            <p className="mt-1 text-sm text-cream/50">
              {nextEvent?.place} · {nextEvent?.time} · {nextEvent?.enrolled}/{nextEvent?.seats}
            </p>
          </Link>

          <Link
            href="/app/academy"
            className="rounded-2xl border border-gold/15 bg-navy-2/70 p-5 transition hover:border-gold/30"
          >
            <p className="text-[0.65rem] font-semibold uppercase text-cream/40">Academy</p>
            <p className="mt-3 font-semibold line-clamp-2">{course.title}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cream/10">
              <div className="h-full rounded-full bg-gold" style={{ width: `${course.progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-cream/40">{course.progress}% concluído</p>
          </Link>

          <Link
            href="/app/financas"
            className="rounded-2xl border border-gold/15 bg-navy-2/70 p-5 sm:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cream/40">
                <Wallet className="h-4 w-4" />
                <p className="text-[0.65rem] font-semibold uppercase">Saldo associativo (visão)</p>
              </div>
              <span className="text-xs text-gold-bright">Área financeira →</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-cream/40">Receitas</p>
                <p className="mt-1 text-sm font-semibold text-ok">{formatKz(receita)}</p>
              </div>
              <div>
                <p className="text-xs text-cream/40">Despesas</p>
                <p className="mt-1 text-sm font-semibold text-red-300">{formatKz(despesa)}</p>
              </div>
              <div>
                <p className="text-xs text-cream/40">Saldo</p>
                <p className="mt-1 text-sm font-semibold text-gold-bright">
                  {formatKz(receita - despesa)}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Comunicados + Protect */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold">
              <Megaphone className="h-4 w-4 text-gold" />
              Comunicados
            </h3>
            <Link href="/app/comunicados" className="text-sm text-gold-bright">
              Ver todos
            </Link>
          </div>
          <ul className="space-y-2">
            {comunicados.slice(0, 3).map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-gold/12 bg-navy-2/40 px-4 py-3 transition hover:border-gold/25"
              >
                <p className="font-medium">{c.title}</p>
                <p className="mt-1 text-xs text-cream/40">
                  {c.date} · {c.channels.join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold">
              <Shield className="h-4 w-4 text-gold" />
              Protect
            </h3>
            <Link href="/app/protect" className="text-sm text-gold-bright">
              Abrir
            </Link>
          </div>
          <div className="rounded-2xl border border-gold/15 bg-navy-2/50 p-5">
            <p className="text-3xl font-semibold tabular-nums text-gold-bright">{protectOpen}</p>
            <p className="mt-1 text-sm text-cream/50">casos activos no canal confidencial</p>
            <Link
              href="/app/protect"
              className="mt-4 inline-flex text-xs font-semibold text-gold-bright"
            >
              Novo pedido ou acompanhar →
            </Link>
          </div>
        </div>
      </div>

      {can("access_admin") && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/25 bg-gold/5 p-5">
          <div>
            <p className="font-semibold text-gold-bright">Gestão · {roleLabel}</p>
            <p className="mt-1 text-sm text-cream/55">
              Eventos, votações, finanças, associados e Protect.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
          >
            Ir para o Admin
          </Link>
        </div>
      )}
    </AppShell>
  );
}

function Stat({
  label,
  value,
  sub,
  href,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  href: string;
  tone?: "ok" | "warn";
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 backdrop-blur transition hover:border-gold/30"
    >
      <p className="text-[0.6rem] font-semibold uppercase tracking-wider text-cream/40">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold tabular-nums ${
          tone === "ok" ? "text-ok" : tone === "warn" ? "text-red-300" : "text-cream"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 truncate text-[0.65rem] text-cream/40">{sub}</p>}
    </Link>
  );
}
