"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { whatsappChannels } from "@/lib/aja";
import { useAuth } from "@/lib/auth";
import { useSettings } from "@/lib/settings";
import { useStore } from "@/lib/store";

export default function NovoComunicadoPage() {
  const { user } = useAuth();
  const { settings } = useSettings();
  const { addComunicado } = useStore();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("Público");
  const [wa, setWa] = useState(settings.whatsappCoexist);

  return (
    <AppShell title="Publicar comunicado" mode="admin">
      <form
        className="max-w-2xl space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          const channels = wa ? ["portal", "whatsapp"] : ["portal"];
          addComunicado({
            title,
            body,
            audience,
            channels,
            author: user?.name || "Direcção",
          });
          router.push("/app/comunicados");
        }}
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase text-cream/45">Título</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase text-cream/45">Corpo</span>
          <textarea
            required
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
          />
        </label>
        <div className="flex gap-2">
          {["Público", "Associados"].map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAudience(a)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                audience === a ? "bg-gold text-navy" : "border border-gold/25 text-cream/60"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {settings.whatsappCoexist && (
          <label className="flex cursor-pointer gap-3 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-5">
            <input type="checkbox" checked={wa} onChange={(e) => setWa(e.target.checked)} />
            <span>
              <span className="block font-semibold text-[#25D366]">Replicar no WhatsApp</span>
              <span className="mt-1 block text-sm text-cream/55">
                Canais: {whatsappChannels.filter((c) => c.synced).map((c) => c.name).join(", ")}
              </span>
            </span>
          </label>
        )}

        <button type="submit" className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy">
          Publicar agora
        </button>
      </form>
    </AppShell>
  );
}
