"use client";

import Link from "next/link";
import {
  Fingerprint,
  QrCode,
  ShieldCheck,
  Smartphone,
  WifiOff,
  BadgeCheck,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DigitalCard } from "@/components/DigitalCard";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

export default function CartaoPage() {
  const { user, roleLabel } = useAuth();
  const { quotas, members } = useStore();
  if (!user) return null;

  const quotaOk = quotas.every((q) => q.status === "Pago") || quotas[0]?.status === "Pago";
  const peers = members.filter((m) => m.province === user.province).length;

  return (
    <AppShell title="Cartão digital">
      <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(184,161,120,0.2),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(94,200,216,0.12),transparent_45%),#0a1628]" />
        <div className="relative grid items-center gap-10 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-10 lg:p-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
              <Fingerprint className="h-3.5 w-3.5" />
              Identidade digital AJA
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-syne)] text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              O seu cartão vive consigo —
              <span className="text-gold-bright"> não no WhatsApp.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/55">
              Mostre, vire, verifique ou imprima. O QR prova filiação em tempo real; o selo de quota
              vem da tesouraria.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <Mini label="Nº" value={user.memberId.split("-").pop() || "—"} />
              <Mini label="Província" value={user.province} />
              <Mini label="Pares" value={`${peers}+`} />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gold/5 blur-xl" />
            <DigitalCard
              data={{
                memberId: user.memberId,
                name: user.name,
                title: user.title,
                province: user.province,
                quotaOk,
                roleLabel,
                validFrom: "2025",
                validTo: "2028",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            t: "Prova de filiação",
            d: "Qualquer pessoa com o link confirma o nº de associado — assembleias, formação, actos.",
          },
          {
            icon: BadgeCheck,
            t: "Quota em tempo real",
            d: "O selo “em dia / pendente” actualiza com a tesouraria. Sem screenshots desactualizados.",
          },
          {
            icon: WifiOff,
            t: "Sem rede? Imprima",
            d: "PDF/impressão para eventos em zonas com fraca conectividade.",
          },
        ].map((x) => (
          <div
            key={x.t}
            className="rounded-2xl border border-gold/15 bg-navy-2/40 p-5 transition hover:border-gold/30"
          >
            <x.icon className="h-5 w-5 text-gold" />
            <p className="mt-3 font-semibold text-gold-bright">{x.t}</p>
            <p className="mt-2 text-sm text-cream/50">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-dashed border-gold/25 bg-navy-2/30 px-5 py-4">
        <QrCode className="h-5 w-5 text-gold" />
        <p className="flex-1 text-sm text-cream/55">
          Em produção o QR liga ao verificador público da AJA. Aqui pode testar já.
        </p>
        <Link
          href={`/verificar/${encodeURIComponent(user.memberId)}`}
          className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-gold-bright"
        >
          <Smartphone className="h-3.5 w-3.5" />
          Abrir verificação
        </Link>
      </div>
    </AppShell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5">
      <p className="text-[0.58rem] uppercase tracking-wider text-cream/40">{label}</p>
      <p className="mt-0.5 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}
