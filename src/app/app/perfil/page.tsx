"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CreditCard,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  UserRound,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

export default function PerfilPage() {
  const { user, roleLabel } = useAuth();
  const { quotas } = useStore();
  const [phone, setPhone] = useState("+244 900 000 000");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const quotaOk = quotas[0]?.status === "Pago";
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <AppShell title="Perfil">
      {/* Identity hero */}
      <section className="relative mb-8 overflow-hidden rounded-[1.75rem] border border-gold/25">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(184,161,120,0.22),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(94,200,216,0.12),transparent_45%),linear-gradient(135deg,#1a3355,#0a1628)]" />
        <div className="relative grid gap-8 p-6 md:grid-cols-[auto_1fr_auto] md:items-end md:p-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-[1.35rem] border-2 border-gold/40 bg-gradient-to-br from-gold/25 to-transparent font-[family-name:var(--font-syne)] text-3xl font-semibold text-gold-bright shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            {initials}
          </div>

          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
              {roleLabel}
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight">
              {user.name}
            </h2>
            <p className="mt-2 text-sm text-cream/55">
              {user.title} · {user.province} · {user.memberId}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip
                icon={quotaOk ? BadgeCheck : Shield}
                label={quotaOk ? "Quota em dia" : "Quota pendente"}
                tone={quotaOk ? "ok" : "warn"}
              />
              <Chip icon={KeyRound} label="MFA activo" tone="ok" />
              <Chip icon={Scale} label="Sessão segura" tone="muted" />
            </div>
          </div>

          <Link
            href="/app/cartao"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
          >
            <CreditCard className="h-4 w-4" />
            Ver cartão
          </Link>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Editable contact */}
        <form
          className="rounded-[1.5rem] border border-gold/15 bg-navy-2/50 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
          }}
        >
          <div className="mb-5 flex items-center gap-2">
            <UserRound className="h-4 w-4 text-gold" />
            <h3 className="font-semibold">Contactos e preferências</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome" value={user.name} readOnly />
            <Field label="Categoria" value={user.title} readOnly />
            <Field label="Província" value={user.province} readOnly icon={MapPin} />
            <Field label="Nº associado" value={user.memberId} readOnly />
            <label className="block sm:col-span-2">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cream/45">
                <Mail className="h-3 w-3" />
                E-mail
              </span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/40"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cream/45">
                <Phone className="h-3 w-3" />
                Telefone
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/40"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy"
            >
              Guardar alterações
            </button>
            {saved && <span className="text-sm text-ok">Guardado neste dispositivo</span>}
          </div>
          <p className="mt-3 text-xs text-cream/35">
            Nome, cargo e nº de associado são geridos pela Secretaria — peça actualização se
            necessário.
          </p>
        </form>

        {/* Side panels */}
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-gold/15 bg-navy-2/50 p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-cream/40">
              Identidade digital
            </p>
            <p className="mt-2 text-sm text-cream/55">
              O cartão e o QR de verificação usam estes dados. Qualquer alteração de contactos
              reflecte-se na área reservada.
            </p>
            <Link
              href={`/verificar/${encodeURIComponent(user.memberId)}`}
              className="mt-4 inline-flex text-sm font-semibold text-gold-bright"
            >
              Página pública de verificação →
            </Link>
          </div>

          <div className="rounded-[1.5rem] border border-ok/20 bg-ok/5 p-5">
            <div className="flex items-center gap-2 text-ok">
              <Shield className="h-4 w-4" />
              <p className="font-semibold">Segurança</p>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-cream/55">
              <li>MFA activo em produção</li>
              <li>Sessão: {roleLabel}</li>
              <li>E-mail: {user.email}</li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-gold/15 bg-navy-2/50 p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-cream/40">
              Rede
            </p>
            <p className="mt-2 text-sm text-cream/55">
              Consulte a lista de associados da AJA — por província e instância.
            </p>
            <Link
              href="/app/associados"
              className="mt-4 inline-flex text-sm font-semibold text-gold-bright"
            >
              Ver associados →
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Chip({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: "ok" | "warn" | "muted";
}) {
  const styles = {
    ok: "border-ok/30 bg-ok/10 text-ok",
    warn: "border-red-400/30 bg-red-500/10 text-red-300",
    muted: "border-white/10 bg-black/20 text-cream/55",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.65rem] font-semibold ${styles[tone]}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function Field({
  label,
  value,
  readOnly,
  icon: Icon,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-cream/45">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </span>
      <input
        value={value}
        readOnly={readOnly}
        className={`w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm outline-none ${
          readOnly ? "cursor-default text-cream/70" : "focus:ring-2 focus:ring-gold/40"
        }`}
      />
    </label>
  );
}
