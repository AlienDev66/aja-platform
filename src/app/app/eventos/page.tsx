"use client";

import { CalendarDays, Landmark } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import Link from "next/link";

export default function EventosPage() {
  const { user } = useAuth();
  const { eventos, enrollEvento } = useStore();
  if (!user) return null;

  return (
    <AppShell title="Eventos">
      <p className="mb-6 text-sm text-cream/50">
        Inscreva-se com um clique. Assembleias mostram a ordem de trabalhos; as votações abrem em{" "}
        <Link href="/app/votacoes" className="text-gold-bright underline">
          Votações
        </Link>
        .
      </p>
      <ul className="space-y-3">
        {eventos.map((e) => {
          const inscrito = Boolean(e.enrolledIds?.includes(user.memberId));
          return (
            <li
              key={e.id}
              className="rounded-2xl border border-gold/15 bg-navy-2/55 p-5"
            >
              <div className="flex flex-wrap items-start gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-navy text-gold">
                  {e.isAssembleia ? (
                    <Landmark className="h-5 w-5" />
                  ) : (
                    <CalendarDays className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase text-cream/40">{e.type}</p>
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-cream/50">
                    {e.date} · {e.place} · {e.time} · {e.enrolled}/{e.seats}
                  </p>
                  {e.description && (
                    <p className="mt-2 text-sm text-cream/45">{e.description}</p>
                  )}
                  {e.orderOfBusiness && e.orderOfBusiness.length > 0 && (
                    <ol className="mt-3 list-inside list-decimal text-xs text-cream/45">
                      {e.orderOfBusiness.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ol>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => enrollEvento(e.id, user.memberId)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    inscrito ? "border border-ok/40 text-ok" : "bg-gold text-navy"
                  }`}
                >
                  {inscrito ? "Inscrito ✓" : "Inscrever-me"}
                </button>
              </div>
              {e.isAssembleia && (
                <Link
                  href="/app/votacoes"
                  className="mt-4 inline-flex text-xs font-semibold text-gold-bright"
                >
                  Ver votações desta assembleia →
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
