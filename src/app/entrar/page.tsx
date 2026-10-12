"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { KeyRound, Shield, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { demoAccounts, roleLabels, type Role } from "@/lib/rbac";

export default function EntrarPage() {
  const { login, user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && user) router.replace("/app");
  }, [ready, user, router]);

  function enter(role: Role) {
    login(role);
    router.push(role === "associado" ? "/app" : "/admin");
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(94,200,216,0.14),transparent_45%),radial-gradient(ellipse_at_90%_70%,rgba(184,161,120,0.16),transparent_40%),#07111f]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-navy-3/80 to-transparent lg:block" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-20">
        <div className="lg:sticky lg:top-20">
          <Link href="/" className="mb-10 inline-flex items-center gap-3">
            <Image
              src="/aja-logo.png"
              alt="AJA"
              width={164}
              height={152}
              className="h-14 w-auto object-contain"
            />
            <span className="text-sm font-semibold text-gold-bright">AJA Digital</span>
          </Link>

          <p className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold">
            <KeyRound className="h-3.5 w-3.5" />
            Acesso reservado
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
            Entre pelo cargo que exerce
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/55">
            Esta demo usa perfis por nível de acesso — cada um vê e gere apenas o que lhe compete.
            Em produção: login institucional com MFA (e-mail / telemóvel).
          </p>

          <ul className="mt-8 space-y-3 text-sm text-cream/50">
            <li className="flex gap-3">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              RBAC real: Presidente, SG, Tesoureiro, Comissão, Associado…
            </li>
            <li className="flex gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Dados desta sessão ficam neste dispositivo (localStorage).
            </li>
          </ul>

          <p className="mt-10 text-xs text-cream/35">
            Produção ≠ esta grelha. Aqui é só para demonstrar permissões sem password.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-cream/40">
            Escolher perfil de demonstração
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {demoAccounts.map((a) => (
              <button
                key={a.role}
                type="button"
                onClick={() => enter(a.role)}
                className="group rounded-2xl border border-gold/20 bg-navy-2/70 p-5 text-left transition hover:border-gold/45 hover:bg-navy-3/90 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
                    {roleLabels[a.role]}
                  </p>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.55rem] text-cream/35 group-hover:border-gold/30 group-hover:text-gold-bright">
                    Entrar →
                  </span>
                </div>
                <p className="mt-2 text-lg font-semibold tracking-tight">{a.name}</p>
                <p className="mt-1 text-xs text-cream/45">
                  {a.title} · {a.province}
                </p>
                <p className="mt-3 font-mono text-[0.65rem] text-cream/30">{a.email}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
