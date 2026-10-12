"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ExcelImport } from "@/components/ExcelImport";
import { useStore } from "@/lib/store";

export default function AdminEventosPage() {
  const { eventos, addEvento, importEventos } = useStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    date: "",
    place: "Luanda",
    time: "09h00",
    type: "Formação",
    seats: 100,
    description: "",
    isAssembleia: false,
    orderOfBusiness: "Abertura\nOrdem de trabalhos\nDeliberações\nEncerramento",
  });

  function create() {
    if (!form.title || !form.date) return;
    addEvento({
      title: form.title,
      date: form.date,
      place: form.place,
      time: form.time,
      type: form.isAssembleia ? "Governação" : form.type,
      seats: form.seats,
      description: form.description,
      isAssembleia: form.isAssembleia,
      orderOfBusiness: form.isAssembleia
        ? form.orderOfBusiness.split("\n").map((s) => s.trim()).filter(Boolean)
        : undefined,
    });
    setForm({
      title: "",
      date: "",
      place: "Luanda",
      time: "09h00",
      type: "Formação",
      seats: 100,
      description: "",
      isAssembleia: false,
      orderOfBusiness: "Abertura\nOrdem de trabalhos\nDeliberações\nEncerramento",
    });
    setStep(1);
  }

  return (
    <AppShell title="Gestão de eventos" mode="admin">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-cream/55">
          Crie formação, encontros ou assembleias. Em assembleia, defina a ordem de trabalhos e
          depois abra votações em{" "}
          <Link href="/admin/votacoes" className="text-gold-bright underline">
            Votações
          </Link>
          .
        </p>
        <ExcelImport
          label="Importar Excel de eventos"
          expectedColumns={["titulo", "data", "local", "hora", "tipo", "lugares"]}
          onRows={(rows) => {
            importEventos(
              rows.map((r) => ({
                title: r.titulo || r.title || "Evento",
                date: r.data || r.date || "",
                place: r.local || r.place || "Luanda",
                time: r.hora || r.time || "09h00",
                type: r.tipo || r.type || "Formação",
                seats: Number(r.lugares || r.seats || 50) || 50,
              }))
            );
          }}
        />
      </div>

      {/* Wizard */}
      <div className="mb-8 rounded-2xl border border-gold/20 bg-navy-2/50 p-5">
        <div className="mb-5 flex gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setStep(n)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                step === n ? "bg-gold text-navy" : "border border-gold/20 text-cream/45"
              }`}
            >
              {n}. {n === 1 ? "Tipo" : n === 2 ? "Detalhes" : "Confirmar"}
            </button>
          ))}
        </div>

        {step === 1 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Formação / Dialéctica", assembleia: false, type: "Formação" },
              { t: "Encontro provincial", assembleia: false, type: "Rede nacional" },
              { t: "Assembleia Geral", assembleia: true, type: "Governação" },
              { t: "Ética / Deontologia", assembleia: false, type: "Ética" },
            ].map((opt) => (
              <button
                key={opt.t}
                type="button"
                onClick={() => {
                  setForm({ ...form, type: opt.type, isAssembleia: opt.assembleia });
                  setStep(2);
                }}
                className="rounded-xl border border-gold/20 bg-navy px-4 py-4 text-left transition hover:border-gold/45"
              >
                <p className="font-semibold">{opt.t}</p>
                <p className="mt-1 text-xs text-cream/40">
                  {opt.assembleia
                    ? "Inclui ordem de trabalhos + ligação a votações"
                    : "Inscrições e lista de presença"}
                </p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3 md:grid-cols-3">
            <input
              required
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm md:col-span-2"
            />
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
            />
            <input
              value={form.place}
              onChange={(e) => setForm({ ...form, place: e.target.value })}
              className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
              placeholder="Local"
            />
            <input
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
            />
            <input
              type="number"
              value={form.seats}
              onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
              className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm"
              placeholder="Lugares"
            />
            <textarea
              placeholder="Descrição"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm md:col-span-3"
            />
            {form.isAssembleia && (
              <textarea
                placeholder="Ordem de trabalhos (uma linha por ponto)"
                value={form.orderOfBusiness}
                onChange={(e) => setForm({ ...form, orderOfBusiness: e.target.value })}
                rows={4}
                className="rounded-xl border border-gold/20 bg-navy px-3 py-2.5 text-sm md:col-span-3"
              />
            )}
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-xl bg-gold py-2.5 text-sm font-semibold text-navy md:col-span-3"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm text-cream/55">Confirme e publique:</p>
            <p className="mt-2 text-lg font-semibold">{form.title || "(sem título)"}</p>
            <p className="text-sm text-cream/50">
              {form.date} · {form.place} · {form.time} · {form.type}
              {form.isAssembleia ? " · Assembleia" : ""}
            </p>
            {form.isAssembleia && (
              <ul className="mt-3 list-inside list-decimal text-sm text-cream/55">
                {form.orderOfBusiness.split("\n").filter(Boolean).map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={create}
                className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy"
              >
                Publicar evento
              </button>
              {form.isAssembleia && (
                <Link
                  href="/admin/votacoes"
                  className="rounded-xl border border-gold/30 px-5 py-2.5 text-sm font-semibold text-gold-bright"
                >
                  Depois: criar votações →
                </Link>
              )}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-xl border border-cream/15 px-5 py-2.5 text-sm text-cream/50"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>

      <ul className="space-y-3">
        {eventos.map((e) => (
          <li
            key={e.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/15 bg-navy-2/50 px-5 py-4"
          >
            <div>
              <p className="text-[0.65rem] uppercase text-cream/40">{e.type}</p>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-cream/50">
                {e.date} · {e.place} · {e.time}
              </p>
              {e.orderOfBusiness && (
                <p className="mt-1 text-xs text-gold-bright">
                  OT: {e.orderOfBusiness.length} pontos
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gold-bright">
                {e.enrolled}/{e.seats} inscritos
              </p>
              {e.isAssembleia && (
                <Link href="/admin/votacoes" className="text-xs text-cream/40 hover:text-gold-bright">
                  Gerir votações →
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
