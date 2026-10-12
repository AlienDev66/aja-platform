"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import type { Permission } from "@/lib/rbac";

export function RequireAuth({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission?: Permission;
}) {
  const { user, ready, can } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/entrar");
    else if (permission && !can(permission)) router.replace("/app");
  }, [ready, user, permission, can, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy text-sm text-cream/50">
        A carregar sessão…
      </div>
    );
  }

  if (permission && !can(permission)) return null;

  return <>{children}</>;
}
