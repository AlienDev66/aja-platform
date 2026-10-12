"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Megaphone,
  CalendarDays,
  Wallet,
  Banknote,
  GraduationCap,
  Landmark,
  Shield,
  Network,
  UserRound,
  Users,
  PenSquare,
  Settings2,
  MessageCircle,
  BarChart3,
  KeyRound,
  Vote,
  Menu,
  X,
  LogOut,
  Briefcase,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useSettings } from "@/lib/settings";
import type { Permission } from "@/lib/rbac";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  permission?: Permission;
};

const memberNav: NavItem[] = [
  { href: "/app", label: "Painel", icon: LayoutDashboard },
  { href: "/app/cartao", label: "O meu cartão", icon: CreditCard },
  { href: "/app/associados", label: "Associados", icon: Users },
  { href: "/app/comunicados", label: "Comunicados", icon: Megaphone },
  { href: "/app/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/app/votacoes", label: "Votações", icon: Vote },
  { href: "/app/financas", label: "Finanças", icon: Wallet },
  { href: "/app/quotas", label: "Quotas", icon: Banknote },
  { href: "/app/academy", label: "Academy", icon: GraduationCap },
  { href: "/app/governance", label: "Governação", icon: Landmark },
  { href: "/app/protect", label: "Protect", icon: Shield },
  { href: "/app/organigrama", label: "Organigrama", icon: Network },
  { href: "/app/perfil", label: "Perfil", icon: UserRound },
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, permission: "access_admin" },
  { href: "/admin/associados", label: "Associados", icon: Users, permission: "view_members" },
  { href: "/admin/comunicados/novo", label: "Publicar", icon: PenSquare, permission: "publish_comunicados" },
  { href: "/admin/eventos", label: "Eventos", icon: CalendarDays, permission: "manage_events" },
  { href: "/admin/votacoes", label: "Votações", icon: Vote, permission: "manage_governance" },
  { href: "/admin/financas", label: "Finanças", icon: Briefcase, permission: "manage_quotas" },
  { href: "/admin/quotas", label: "Tesouraria", icon: Wallet, permission: "manage_quotas" },
  { href: "/admin/protect", label: "Protect", icon: Shield, permission: "manage_protect" },
  { href: "/admin/organigrama", label: "Organigrama", icon: Network, permission: "edit_organigram" },
  { href: "/admin/acessos", label: "Níveis de acesso", icon: KeyRound, permission: "access_admin" },
  { href: "/admin/configuracoes", label: "Padronização", icon: Settings2, permission: "manage_settings" },
  { href: "/admin/whatsapp", label: "WhatsApp", icon: MessageCircle, permission: "manage_whatsapp" },
  { href: "/admin/intelligence", label: "Intelligence", icon: BarChart3, permission: "view_intelligence" },
];

export function AppShell({
  title,
  mode = "member",
  children,
}: {
  title: string;
  mode?: "member" | "admin";
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSettings();
  const { user, ready, can, logout, roleLabel } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/entrar");
    else if (mode === "admin" && !can("access_admin")) router.replace("/app");
  }, [ready, user, mode, can, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy text-sm text-cream/50">
        A validar acesso…
      </div>
    );
  }

  const nav = (mode === "admin" ? adminNav : memberNav).filter((item) => {
    if (item.permission && !can(item.permission)) return false;
    if (mode === "member") {
      if (item.href.includes("academy") && !settings.modules.academy) return false;
      if (item.href.includes("protect") && !settings.modules.protect) return false;
      if (item.href.includes("governance") && !settings.modules.governance) return false;
      if (item.href.includes("organigrama") && !settings.modules.organigram) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-navy lg:flex">
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gold/15 bg-navy-2/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-gold/25 px-3 py-1.5 text-sm font-semibold text-gold-bright"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
        <span className="text-sm font-semibold text-gold-bright">{settings.brandName}</span>
        <span className="max-w-[5.5rem] truncate text-[0.65rem] text-cream/45">{roleLabel}</span>
      </div>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Fechar"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-gold/15 bg-gradient-to-b from-navy-2 to-navy transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gold/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <Image src="/aja-logo.png" alt="AJA" width={164} height={152} className="h-10 w-auto object-contain" />
            <div>
              <p className="text-sm font-semibold text-gold-bright">{settings.brandName}</p>
              <p className="text-[0.65rem] text-cream/40">{roleLabel}</p>
            </div>
          </div>
          <button type="button" className="lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5 text-cream/50" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/app" || item.href === "/admin"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-gold/15 font-semibold text-gold-bright shadow-[inset_3px_0_0_0_var(--color-gold)]"
                    : "text-cream/55 hover:bg-white/[0.04] hover:text-cream"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                    active
                      ? "border-gold/35 bg-gold/10 text-gold-bright"
                      : "border-white/5 bg-white/[0.03] text-cream/45 group-hover:text-cream/70"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gold/10 p-4">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-cream/40">
            {user.province} · {user.memberId}
          </p>
          <div className="mt-3 flex gap-2">
            {can("access_admin") && mode === "member" && (
              <Link
                href="/admin"
                className="flex-1 rounded-lg border border-gold/25 py-2 text-center text-xs font-semibold text-gold-bright"
              >
                Admin
              </Link>
            )}
            {mode === "admin" && (
              <Link
                href="/app"
                className="flex-1 rounded-lg border border-gold/25 py-2 text-center text-xs font-semibold text-gold-bright"
              >
                Área
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/entrar");
              }}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-cream/15 py-2 text-xs text-cream/50"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="hidden items-center justify-between border-b border-gold/10 px-8 py-4 lg:flex">
          <div>
            <h1 className="font-[family-name:var(--font-syne)] text-xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="text-xs text-cream/40">
              Sessão: {roleLabel} · {user.email}
            </p>
          </div>
          <Link
            href="/app/cartao"
            className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm font-semibold text-gold-bright hover:bg-gold/25"
          >
            <CreditCard className="h-4 w-4" />
            Cartão digital
          </Link>
        </header>
        <div className="px-4 py-6 md:px-8 md:py-8">
          <p className="mb-4 text-lg font-semibold lg:hidden">{title}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
