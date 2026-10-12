"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { demoAccounts } from "@/lib/rbac";
import { useStore } from "@/lib/store";

export default function VerificarPage() {
  const params = useParams();
  const id = decodeURIComponent(String(params.id || ""));
  const { members, quotas } = useStore();

  const fromDemo = demoAccounts.find((a) => a.memberId === id);
  const fromMembers = members.find((m) => m.memberId === id || m.id === id);
  const found = fromDemo
    ? {
        name: fromDemo.name,
        title: fromDemo.title,
        province: fromDemo.province,
        memberId: fromDemo.memberId,
      }
    : fromMembers
      ? {
          name: fromMembers.name,
          title: `${fromMembers.instance}`,
          province: fromMembers.province,
          memberId: fromMembers.memberId || fromMembers.id,
        }
      : null;

  const quotaOk = quotas[0]?.status === "Pago";

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-navy px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-gold/25 bg-navy-2/90 p-8 text-center shadow-2xl">
        <Image
          src="/aja-logo.png"
          alt="AJA"
          width={164}
          height={152}
          className="mx-auto h-14 w-auto object-contain"
        />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Verificação de associado
        </p>
        {found ? (
          <>
            <p className="mt-4 text-sm text-ok">● Filiação válida na AJA Digital</p>
            <h1 className="mt-4 font-[family-name:var(--font-syne)] text-2xl font-semibold">
              {found.name}
            </h1>
            <p className="mt-1 text-sm text-cream/55">
              {found.title} · {found.province}
            </p>
            <p className="mt-4 font-mono text-sm text-gold-bright">{found.memberId}</p>
            <p className="mt-4 text-sm">
              Quota:{" "}
              <span className={quotaOk ? "text-ok" : "text-red-300"}>
                {quotaOk ? "Regularizada" : "Pendente"}
              </span>
            </p>
            <p className="mt-2 text-xs text-cream/35">Validade associativa 2025–2028</p>
          </>
        ) : (
          <>
            <p className="mt-6 text-red-300">Associado não encontrado</p>
            <p className="mt-2 text-sm text-cream/50">Nº {id}</p>
          </>
        )}
        <Link href="/" className="mt-8 inline-block text-sm text-gold-bright hover:underline">
          aja.org.ao · AJA Digital
        </Link>
      </div>
    </div>
  );
}
