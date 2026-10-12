"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";

export default function ComunicadosPage() {
  const { can } = useAuth();
  const { comunicados } = useStore();

  return (
    <AppShell title="Comunicados">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-xl text-sm text-cream/55">
          Fonte oficial. Tags mostram se também foi para WhatsApp.
        </p>
        {can("publish_comunicados") && (
          <Link
            href="/admin/comunicados/novo"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
          >
            Publicar
          </Link>
        )}
      </div>
      <ul className="space-y-3">
        {comunicados.map((p) => (
          <li key={p.id} className="rounded-2xl border border-gold/15 bg-navy-2/55 p-5">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-cream/40">{p.date}</span>
              {p.channels.map((c) => (
                <span
                  key={c}
                  className={`rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase ${
                    c === "whatsapp"
                      ? "bg-[#25D366]/15 text-[#25D366]"
                      : "bg-gold/15 text-gold-bright"
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
            <h2 className="mt-2 font-semibold">{p.title}</h2>
            <p className="mt-1.5 text-sm text-cream/55">{p.body}</p>
            <p className="mt-2 text-xs text-cream/35">Por {p.author}</p>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
