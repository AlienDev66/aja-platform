"use client";

import { AppShell } from "@/components/AppShell";
import { OrganigramView } from "@/components/Organigram";
import { useSettings } from "@/lib/settings";

export default function OrganigramaAdminPage() {
  const { org, setOrg, reset } = useSettings();
  return (
    <AppShell title="Organigrama · edição" mode="admin">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-xl text-sm text-cream/55">
          Clique em <strong className="text-cream/80">Editar</strong> para actualizar nomes e cargos.
          Alterações ficam guardadas neste dispositivo (padronização local) — em produção sincronizam
          com a base da AJA.
        </p>
        <button
          type="button"
          onClick={() => {
            if (confirm("Repor organigrama e definições de fábrica?")) reset();
          }}
          className="rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-gold-bright"
        >
          Repor predefinição
        </button>
      </div>
      <OrganigramView root={org} editable onChange={setOrg} />
    </AppShell>
  );
}
