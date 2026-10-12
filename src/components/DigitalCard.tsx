"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, FlipHorizontal2, Printer, ShieldCheck } from "lucide-react";

export type CardData = {
  memberId: string;
  name: string;
  title: string;
  province: string;
  instance?: string;
  validFrom?: string;
  validTo?: string;
  quotaOk: boolean;
  roleLabel?: string;
};

export function DigitalCard({ data, compact }: { data: CardData; compact?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const path = `/verificar/${encodeURIComponent(data.memberId)}`;
  const [verifyUrl, setVerifyUrl] = useState(path);

  useEffect(() => {
    setVerifyUrl(`${window.location.origin}${path}`);
  }, [path]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert(verifyUrl);
    }
  }

  return (
    <div className={`mx-auto w-full ${compact ? "max-w-sm" : "max-w-lg"}`}>
      <div
        className="relative cursor-pointer [perspective:1400px]"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label="Virar cartão"
      >
        <div
          className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          style={{ height: compact ? 340 : 400 }}
        >
          {/* Frente */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.25rem] border border-gold/45 bg-gradient-to-br from-[#1e3a5f] via-[#0f2138] to-[#07111f] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] [backface-visibility:hidden]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,rgba(94,200,216,0.22),transparent_45%),radial-gradient(ellipse_at_10%_90%,rgba(184,161,120,0.2),transparent_40%)]" />
            <div className="relative flex items-start justify-between gap-3">
              <Image
                src="/aja-logo.png"
                alt="AJA"
                width={164}
                height={152}
                className="h-12 w-auto object-contain drop-shadow"
              />
              <div className="text-right">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">
                  Cartão de associado
                </p>
                <p className="mt-1 font-mono text-xs text-cream/55">{data.memberId}</p>
              </div>
            </div>

            <div className="relative mt-auto pt-8">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cream/40">
                Titular
              </p>
              <h2 className="mt-1.5 font-[family-name:var(--font-syne)] text-[1.65rem] font-semibold leading-tight tracking-tight">
                {data.name}
              </h2>
              <p className="mt-2 text-sm text-cream/65">
                {data.title}
                {data.instance ? ` · ${data.instance}` : ""}
              </p>
              <p className="mt-0.5 text-sm text-cream/45">{data.province}</p>
            </div>

            <div className="relative mt-6 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-cream/40">
                  Validade
                </p>
                <p className="mt-1 text-sm font-semibold tabular-nums">
                  {data.validFrom || "2025"} — {data.validTo || "2028"}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide ${
                  data.quotaOk ? "bg-ok/20 text-ok" : "bg-red-500/20 text-red-300"
                }`}
              >
                {data.quotaOk ? "Quota em dia" : "Quota pendente"}
              </span>
            </div>
          </div>

          {/* Verso */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.25rem] border border-gold/45 bg-[#0a1628] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="flex items-center gap-2 text-gold">
              <ShieldCheck className="h-4 w-4" />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
                Verificação
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cream/55">
              Apresente em assembleias, formação e actos da AJA. O QR confirma a filiação em tempo
              real.
            </p>
            <div
              className="mx-auto mt-auto flex h-40 w-40 items-center justify-center rounded-2xl border border-cream/15 bg-white p-2.5 shadow-inner"
              title={verifyUrl}
              onClick={(e) => e.stopPropagation()}
            >
              <QRCodeSVG
                value={verifyUrl}
                size={148}
                level="M"
                bgColor="#ffffff"
                fgColor="#07111f"
                marginSize={0}
                className="h-full w-full"
              />
            </div>
            <p className="mt-4 text-center font-mono text-xs text-cream/50">{data.memberId}</p>
            {data.roleLabel && (
              <p className="mt-1 text-center text-xs font-semibold text-gold-bright">
                {data.roleLabel}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 print:hidden sm:grid-cols-4">
        <Action icon={FlipHorizontal2} label="Virar" onClick={() => setFlipped((f) => !f)} />
        <Action icon={Copy} label={copied ? "Copiado" : "Copiar link"} onClick={copyLink} />
        <a
          href={`/verificar/${encodeURIComponent(data.memberId)}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gold/30 py-2.5 text-xs font-semibold text-gold-bright hover:bg-gold/10"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Verificar
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gold py-2.5 text-xs font-semibold text-navy"
        >
          <Printer className="h-3.5 w-3.5" />
          Imprimir
        </button>
      </div>
    </div>
  );
}

function Action({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-gold/30 py-2.5 text-xs font-semibold text-gold-bright hover:bg-gold/10"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
