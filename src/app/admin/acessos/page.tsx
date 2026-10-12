"use client";

import { AppShell } from "@/components/AppShell";
import { permissionMatrix, roleLabels, type Permission } from "@/lib/rbac";
import { useAuth } from "@/lib/auth";

const labels: Record<Permission, string> = {
  view_own: "Ver dados próprios",
  view_members: "Ver associados",
  manage_members: "Gerir associados",
  publish_comunicados: "Publicar comunicados",
  manage_events: "Gerir eventos",
  manage_quotas: "Gerir quotas",
  view_quotas_all: "Ver quotas globais",
  manage_protect: "Gerir Protect",
  view_protect: "Ver Protect",
  edit_organigram: "Editar organigrama",
  manage_settings: "Padronização do sistema",
  manage_whatsapp: "Canais WhatsApp",
  view_intelligence: "Intelligence",
  manage_academy: "Academy",
  manage_governance: "Governação",
  access_admin: "Aceder ao Admin",
};

export default function AcessosPage() {
  const { roleLabel, user } = useAuth();
  const matrix = permissionMatrix();
  const allPerms = Object.keys(labels) as Permission[];

  return (
    <AppShell title="Níveis de acesso" mode="admin">
      <p className="mb-2 text-sm text-cream/55">
        Sessão actual: <strong className="text-gold-bright">{user?.name}</strong> · {roleLabel}
      </p>
      <p className="mb-8 max-w-2xl text-sm text-cream/45">
        O Presidente tem controlo total. Vice-Presidentes quase tudo (excepto padronização crítica).
        Secretário-Geral gere operação. Tesoureiro foca quotas. Associado vê a sua área e o cartão.
      </p>

      <div className="overflow-x-auto rounded-2xl border border-gold/15">
        <table className="w-full min-w-[800px] text-left text-xs">
          <thead className="bg-navy-2 text-cream/45">
            <tr>
              <th className="px-3 py-3 font-semibold">Permissão</th>
              {matrix.map((r) => (
                <th key={r.role} className="px-2 py-3 text-center font-semibold">
                  {roleLabels[r.role].split(" ")[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allPerms.map((p) => (
              <tr key={p} className="border-t border-gold/10">
                <td className="px-3 py-2.5 text-cream/70">{labels[p]}</td>
                {matrix.map((r) => (
                  <td key={r.role} className="px-2 py-2.5 text-center">
                    {r.permissions.includes(p) ? (
                      <span className="text-ok">●</span>
                    ) : (
                      <span className="text-cream/20">○</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
