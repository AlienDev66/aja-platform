"use client";

import { AppShell } from "@/components/AppShell";
import { OrganigramView } from "@/components/Organigram";
import { useSettings } from "@/lib/settings";

export default function OrganigramaMemberPage() {
  const { org } = useSettings();
  return (
    <AppShell title="Organigrama">
      <p className="mb-6 max-w-2xl text-sm text-cream/55">
        Estrutura da AJA: Assembleia Geral, Direcção 2025–2028, comissões e representantes nas 18
        províncias. A edição completa está no painel Admin.
      </p>
      <OrganigramView root={org} />
    </AppShell>
  );
}
