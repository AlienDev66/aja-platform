"use client";

import {
  MapPin,
  Scale,
  BadgeCheck,
  AlertCircle,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import type { Member } from "@/lib/store";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

const accents = [
  "from-[#1e3a5f] to-[#0a1628]",
  "from-[#1a3d4a] to-[#07111f]",
  "from-[#2a2f4a] to-[#0c1a2e]",
  "from-[#243447] to-[#07111f]",
];

export function MemberCard({
  member,
  featured,
  actions,
}: {
  member: Member;
  featured?: boolean;
  actions?: React.ReactNode;
}) {
  const hue = accents[Number(member.id.replace(/\D/g, "") || 0) % accents.length];
  const ok = member.quota === "Em dia";

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.35rem] border transition ${
        featured
          ? "border-gold/40 bg-gradient-to-br from-navy-3 to-navy"
          : "border-gold/15 bg-navy-2/55 hover:border-gold/35"
      }`}
    >
      <div className={`h-20 bg-gradient-to-br ${hue}`}>
        <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(ellipse_at_80%_20%,rgba(184,161,120,0.25),transparent_55%)]" />
      </div>

      <div className="relative px-5 pb-5">
        <div className="-mt-9 flex items-end justify-between gap-3">
          <div
            className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl border-2 border-navy bg-gradient-to-br from-gold/30 to-gold/5 font-[family-name:var(--font-syne)] text-lg font-semibold text-gold-bright shadow-lg"
            aria-hidden
          >
            {initials(member.name)}
          </div>
          <span
            className={`mb-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide ${
              ok ? "bg-ok/15 text-ok" : "bg-red-500/15 text-red-300"
            }`}
          >
            {ok ? <BadgeCheck className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
            {member.quota}
          </span>
        </div>

        <h3 className="mt-3 font-[family-name:var(--font-syne)] text-lg font-semibold leading-tight tracking-tight">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-cream/50">{member.title || "Magistrado associado"}</p>

        <div className="mt-4 space-y-2 text-xs text-cream/45">
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold/70" />
            {member.province}
          </p>
          <p className="flex items-center gap-2">
            <Scale className="h-3.5 w-3.5 text-gold/70" />
            {member.instance} instância
          </p>
          {member.email && (
            <p className="flex items-center gap-2 truncate">
              <Mail className="h-3.5 w-3.5 text-gold/70" />
              {member.email}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3">
          <p className="font-mono text-[0.65rem] text-cream/35">
            {member.memberId || `AJA-${member.id}`}
          </p>
          {actions || (
            <span className="rounded-full p-1.5 text-cream/25 opacity-0 transition group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
