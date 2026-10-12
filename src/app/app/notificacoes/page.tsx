import { AppShell } from "@/components/AppShell";
import { notifications } from "@/lib/data";

export default function NotificacoesPage() {
  return (
    <AppShell title="Notificações">
      <h1 className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight">
        Alertas
      </h1>
      <ul className="mt-8 space-y-2">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`rounded-xl border px-5 py-4 ${
              n.unread
                ? "border-gold/30 bg-gold/5"
                : "border-gold/10 bg-navy-2/40"
            }`}
          >
            <p className="font-medium">{n.text}</p>
            <p className="mt-1 text-xs text-cream/40">{n.time}</p>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
