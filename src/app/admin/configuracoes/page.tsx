"use client";

import { AppShell } from "@/components/AppShell";
import { useSettings } from "@/lib/settings";
import type { AppSettings } from "@/lib/aja";

export default function ConfiguracoesPage() {
  const { settings, setSettings, reset } = useSettings();

  function toggleModule(key: keyof AppSettings["modules"]) {
    setSettings({
      ...settings,
      modules: { ...settings.modules, [key]: !settings.modules[key] },
    });
  }

  return (
    <AppShell title="Padronização" mode="admin">
      <p className="mb-8 max-w-2xl text-sm text-cream/55">
        Configure a plataforma à imagem da AJA: marca, módulos activos, quotas e política WhatsApp.
        Tudo é editável pela Direcção — sem depender de desenvolvimento extra.
      </p>

      <div className="grid max-w-3xl gap-6">
        <section className="rounded-2xl border border-gold/15 bg-navy-2/50 p-6">
          <h2 className="font-semibold">Identidade</h2>
          <label className="mt-4 block">
            <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
              Nome da plataforma
            </span>
            <input
              value={settings.brandName}
              onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/40"
            />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                Cor principal
              </span>
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="mt-1.5 h-11 w-full cursor-pointer rounded-lg border border-gold/20 bg-navy"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                Cor de destaque
              </span>
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                className="mt-1.5 h-11 w-full cursor-pointer rounded-lg border border-gold/20 bg-navy"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-gold/15 bg-navy-2/50 p-6">
          <h2 className="font-semibold">Módulos activos</h2>
          <ul className="mt-4 space-y-3">
            {(Object.keys(settings.modules) as (keyof AppSettings["modules"])[]).map((key) => (
              <li key={key} className="flex items-center justify-between">
                <span className="capitalize text-sm">{key}</span>
                <button
                  type="button"
                  onClick={() => toggleModule(key)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    settings.modules[key]
                      ? "bg-ok/20 text-ok"
                      : "bg-cream/10 text-cream/40"
                  }`}
                >
                  {settings.modules[key] ? "Activo" : "Off"}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gold/15 bg-navy-2/50 p-6">
          <h2 className="font-semibold">Quotas</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                Valor
              </span>
              <input
                value={settings.quotaAmount}
                onChange={(e) => setSettings({ ...settings, quotaAmount: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-cream/40">
                Periodicidade
              </span>
              <input
                value={settings.quotaPeriod}
                onChange={(e) => setSettings({ ...settings, quotaPeriod: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-gold/20 bg-navy px-4 py-3 text-sm"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-[#25D366]/25 bg-[#25D366]/5 p-6">
          <h2 className="font-semibold">WhatsApp</h2>
          <label className="mt-4 flex cursor-pointer items-center justify-between gap-4">
            <span className="text-sm text-cream/70">
              Permitir coexistência (replicar comunicados nos canais)
            </span>
            <button
              type="button"
              onClick={() =>
                setSettings({ ...settings, whatsappCoexist: !settings.whatsappCoexist })
              }
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                settings.whatsappCoexist ? "bg-[#25D366]/25 text-[#25D366]" : "bg-cream/10 text-cream/40"
              }`}
            >
              {settings.whatsappCoexist ? "Ligado" : "Off"}
            </button>
          </label>
          <label className="mt-4 flex cursor-pointer items-center justify-between gap-4">
            <span className="text-sm text-cream/70">MFA obrigatório</span>
            <button
              type="button"
              onClick={() => setSettings({ ...settings, mfaRequired: !settings.mfaRequired })}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                settings.mfaRequired ? "bg-ok/20 text-ok" : "bg-cream/10 text-cream/40"
              }`}
            >
              {settings.mfaRequired ? "Sim" : "Não"}
            </button>
          </label>
        </section>

        <button
          type="button"
          onClick={() => {
            if (confirm("Repor todas as definições?")) reset();
          }}
          className="justify-self-start rounded-full border border-gold/30 px-5 py-2.5 text-sm font-semibold text-gold-bright"
        >
          Repor predefinições
        </button>
      </div>
    </AppShell>
  );
}
