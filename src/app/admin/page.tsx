"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { provinces, news } from "@/lib/aja";
import { useStore } from "@/lib/store";

export default function AdminPage() {
  const { roleLabel, can } = useAuth();
  const { members, comunicados, eventos, protect, whatsapp } = useAdminStats();

  return (
    <AppShell title="Dashboard da Direcção" mode="admin">
      <p className="mb-6 text-sm text-cream/50">
        Sessão: <strong className="text-gold-bright">{roleLabel}</strong> · dados em tempo real neste
        dispositivo
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Associados", value: String(members), href: "/admin/associados", show: can("view_members") },
          { label: "Províncias", value: String(provinces.length), href: "/admin/organigrama", show: true },
          {
            label: "Comunicados",
            value: String(comunicados),
            href: "/admin/comunicados/novo",
            show: can("publish_comunicados"),
          },
          { label: "Eventos", value: String(eventos), href: "/admin/eventos", show: can("manage_events") },
        ]
          .filter((s) => s.show)
          .map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="rounded-2xl border border-gold/15 bg-navy-2/60 p-5 transition hover:border-gold/35"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cream/40">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-gold-bright">{s.value}</p>
            </Link>
          ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {can("manage_members") && (
          <Quick href="/admin/associados" title="Gerir associados" desc="Adicionar, quotas, remover" />
        )}
        {can("publish_comunicados") && (
          <Quick href="/admin/comunicados/novo" title="Publicar" desc="Portal + WhatsApp" />
        )}
        {can("manage_events") && (
          <Quick href="/admin/eventos" title="Criar evento" desc="Inscrições em tempo real" />
        )}
        {can("manage_quotas") && (
          <Quick href="/admin/quotas" title="Tesouraria" desc="Marcar quotas pagas" />
        )}
        {can("manage_quotas") && (
          <Quick href="/admin/financas" title="Finanças" desc="Receitas e despesas" />
        )}
        {can("manage_governance") && (
          <Quick href="/admin/votacoes" title="Votações" desc="Assembleia e deliberações" />
        )}
        {can("manage_protect") && (
          <Quick href="/admin/protect" title="Protect" desc={`${protect} pedidos`} />
        )}
        {can("edit_organigram") && (
          <Quick href="/admin/organigrama" title="Organigrama" desc="Editar cargos" />
        )}
        {can("manage_settings") && (
          <Quick href="/admin/configuracoes" title="Padronização" desc="Módulos e marca" />
        )}
        <Quick href="/admin/acessos" title="Níveis de acesso" desc="Quem pode o quê" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-semibold">Agenda institucional</h2>
          <ul className="mt-3 space-y-2">
            {news.slice(0, 4).map((n) => (
              <li key={n.id} className="rounded-xl border border-gold/12 bg-navy-2/40 px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase text-gold">{n.tag}</p>
                <p className="mt-1 text-sm font-medium">{n.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Atalhos WhatsApp</h2>
          <p className="mt-2 text-sm text-cream/50">
            {whatsapp} canais mapeados. Coexistência configurável em Padronização.
          </p>
          {can("manage_whatsapp") && (
            <Link href="/admin/whatsapp" className="mt-3 inline-block text-sm text-[#25D366]">
              Gerir canais →
            </Link>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function Quick({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-gold/20 bg-navy-2/50 p-5 transition hover:border-gold/40"
    >
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-cream/50">{desc}</p>
    </Link>
  );
}

function useAdminStats() {
  const { members, comunicados, eventos, protect } = useStore();
  return {
    members: members.length,
    comunicados: comunicados.length,
    eventos: eventos.length,
    protect: protect.length,
    whatsapp: 5,
  };
}
