"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { whatsappChannels } from "@/lib/aja";
import { useSettings } from "@/lib/settings";

export default function WhatsAppAdminPage() {
  const { settings } = useSettings();
  const [channels, setChannels] = useState(whatsappChannels);

  return (
    <AppShell title="Canais WhatsApp" mode="admin">
      <p className="mb-6 max-w-2xl text-sm text-cream/55">
        Mapeie os grupos oficiais. Coexistência:{" "}
        <strong className="text-[#25D366]">
          {settings.whatsappCoexist ? "activa" : "desligada"}
        </strong>
        . A plataforma continua a ser a fonte oficial.
      </p>

      <ul className="space-y-3">
        {channels.map((ch, i) => (
          <li
            key={ch.name}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 px-5 py-4"
          >
            <div>
              <p className="font-semibold">{ch.name}</p>
              <p className="text-xs text-cream/45">
                {ch.kind} · {ch.members} membros
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setChannels((prev) =>
                  prev.map((c, idx) => (idx === i ? { ...c, synced: !c.synced } : c))
                )
              }
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                ch.synced ? "bg-ok/20 text-ok" : "bg-cream/10 text-cream/40"
              }`}
            >
              {ch.synced ? "Sincronizado" : "Desligado"}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() =>
          setChannels((p) => [
            ...p,
            {
              name: `Novo canal ${p.length + 1}`,
              kind: "Interno",
              members: "0",
              synced: false,
            },
          ])
        }
        className="mt-6 rounded-full border border-[#25D366]/40 px-5 py-2.5 text-sm font-semibold text-[#25D366]"
      >
        + Adicionar canal
      </button>
    </AppShell>
  );
}
